"use client";

// The terminal look of the portfolio. Rendering, keyboard (including vim motions in
// NORMAL mode), the first-visit question, the contact prompt, the vim screen and
// animations live here; what commands do lives in ./terminal/shell.
import { Component, createRef, useEffect, useRef, useState } from "react";
import { getMode, setMode, UI_PATH } from "@/lib/mode";
import { EMAIL } from "./terminal/data";
import { a, C, d, echoLine, g, L, type Line, ok, r, type Seg, T, type TextLine, U } from "./terminal/lines";
import { ask, complete, type Ctx, exec, newCtx, SECRETS, tilde, welcome } from "./terminal/shell";

const FLOW = ["your name", "email", "message"];
const CHIPS = ["help", "ls -a", "projects", "about", "work", "secrets", "contact", "resume", "clear"];
const SECRETS_KEY = "nasi-secrets";
const MAX_BLOCKS = 80;

// Image that shows a dashed "loading..." box (dots blinking in turn) until it has
// arrived, and says so if it fails. `box` sizes the placeholder; `img` styles the image.
const DOTS_CSS =
  "@keyframes term-dot{0%,20%{opacity:0}40%,80%{opacity:1}100%{opacity:0}}" +
  ".term-dot{animation:term-dot 1.2s infinite}" +
  "@media (prefers-reduced-motion:reduce){.term-dot{animation:none}}";

const LoadingImg = ({ src, alt, img, box }: { src: string; alt: string; img: React.CSSProperties; box: React.CSSProperties }) => {
  const [state, setState] = useState<"loading" | "done" | "error">("loading");
  const ref = useRef<HTMLImageElement>(null);
  // Cached images can finish before React attaches onLoad.
  useEffect(() => {
    const el = ref.current;
    if (el?.complete) setTimeout(() => setState(el.naturalWidth ? "done" : "error"), 0);
  }, []);
  return (
    <>
      <style>{DOTS_CSS}</style>
      {state !== "done" && (
        <div
          role="status"
          style={{ border: `1px dashed ${C.edge}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontSize: 12, textAlign: "center", ...box }}
        >
          {state === "loading" ? (
            <span>
              loading
              {[0, 0.2, 0.4].map((delay) => (
                <span key={delay} className="term-dot" style={{ animationDelay: `${delay}s` }}>
                  .
                </span>
              ))}
            </span>
          ) : (
            "[ image failed to load ]"
          )}
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={src}
        alt={alt}
        onLoad={() => setState("done")}
        onError={() => setState("error")}
        style={{ ...img, display: state === "done" ? img.display ?? "block" : "none" }}
      />
    </>
  );
};

interface Flow {
  step: number;
  data: Record<string, string>;
}
interface Block {
  id: number;
  lines: Line[];
}
interface State {
  blocks: Block[];
  mode: "insert" | "normal";
  sel: number;
  input: string;
  // Caret position, for drawing the block cursor.
  caret: number;
  hist: string[];
  hIdx: number;
  flow: Flow | null;
  cwd: string; // as shown (~/projects/…)
  // Asking first-time visitors whether a terminal suits them.
  gate: boolean;
  // Inside the pretend vim: the prompt takes ex commands until :q.
  vim: { tries: number } | null;
  closing: boolean;
}

export default class Terminal extends Component<{ showChips?: boolean }, State> {
  state: State = { blocks: [], mode: "insert", sel: 0, input: "", caret: 0, hist: [], hIdx: -1, flow: null, cwd: "~", gate: false, vim: null, closing: false };
  ctx: Ctx = newCtx();
  scrollEl = createRef<HTMLDivElement>();
  inputEl = createRef<HTMLInputElement>();
  // Focused in NORMAL mode. Vim-style browser extensions grab j/k unless a text field has
  // focus, so this invisible field keeps them out of the way; it never takes input.
  catcherEl = createRef<HTMLTextAreaElement>();
  uid = 0;
  lastKey = "";
  // Selectable items in NORMAL mode: the newest output's links, then the command chips.
  links: Seg[] = [];
  outLinks = 0;
  // A press inside the terminal is in progress; its click decides focus itself.
  pressing = false;
  anim: ReturnType<typeof setInterval> | null = null;

  componentDidMount() {
    const mode = getMode();
    if (mode === "ui") {
      window.location.replace(UI_PATH);
      return;
    }
    try {
      (JSON.parse(localStorage.getItem(SECRETS_KEY) ?? "[]") as string[]).forEach((x) => this.ctx.found.add(x));
    } catch {}
    if (mode === "terminal") this.push(welcome());
    else this.push(ask(), { gate: true });
    // Capture phase, so nothing else on the page can swallow the vim keys first.
    window.addEventListener("keydown", this.handleKey, true);
    window.addEventListener("pointerup", this.endPress);
    setTimeout(() => this.inputEl.current?.focus(), 60);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKey, true);
    window.removeEventListener("pointerup", this.endPress);
    this.stopAnim();
  }
  // After a press settles (its click has run), re-check where focus ended up: dragging the
  // scrollbar or selecting text leaves the prompt unfocused, which means NORMAL.
  endPress = () =>
    setTimeout(() => {
      this.pressing = false;
      this.syncMode();
      if (this.state.mode === "normal") this.focusCatcher();
    }, 0);
  focusCatcher() {
    const el = document.activeElement;
    if (el === this.catcherEl.current || el === this.inputEl.current) return;
    // Leave a text selection alone so it can still be copied.
    if (window.getSelection?.()?.toString()) return;
    this.catcherEl.current?.focus({ preventScroll: true });
  }

  // Like a real terminal: follow the output, but if a block is taller than the
  // window, start at its top so it reads from the beginning.
  reveal(id: number) {
    requestAnimationFrame(() => {
      const el = this.scrollEl.current;
      const blk = el?.querySelector<HTMLElement>(`[data-block="${id}"]`);
      if (!el) return;
      if (blk && blk.offsetHeight > el.clientHeight - 60) el.scrollTop = blk.offsetTop - 8;
      else el.scrollTop = el.scrollHeight;
    });
  }
  revealSel() {
    requestAnimationFrame(() => {
      const el = this.scrollEl.current;
      if (!el) return;
      const s = el.querySelector('[data-sel="1"]');
      if (!s) return;
      const rect = s.getBoundingClientRect();
      const c = el.getBoundingClientRect();
      if (rect.top < c.top + 12) el.scrollTop -= c.top + 12 - rect.top;
      else if (rect.bottom > c.bottom - 12) el.scrollTop += rect.bottom - c.bottom + 12;
    });
  }

  push(lines: Line[], extra: Partial<State> = {}) {
    const id = ++this.uid;
    this.setState(
      (s) => ({ ...s, blocks: [...s.blocks, { id, lines }].slice(-MAX_BLOCKS), sel: 0, ...extra }) as State,
      () => this.reveal(id),
    );
    return id;
  }

  stopAnim() {
    if (this.anim) clearInterval(this.anim);
    this.anim = null;
  }
  // Plays frames under a block's existing lines (htop, sl, npm install…).
  animate(id: number, base: Line[], frames: Line[][], ms: number) {
    this.stopAnim();
    let k = 0;
    const step = () => {
      const lines = [...base, ...frames[k]];
      this.setState((s) => ({ blocks: s.blocks.map((bk) => (bk.id === id ? { ...bk, lines } : bk)) }), () => {
        const el = this.scrollEl.current;
        if (el) el.scrollTop = el.scrollHeight;
      });
      if (++k >= frames.length) this.stopAnim();
    };
    step();
    if (frames.length > 1) this.anim = setInterval(step, ms);
  }

  // New secrets get a star line and are remembered in this browser.
  unlock(ids: string[] | undefined): Line[] {
    const fresh = [...new Set(ids ?? [])].filter((x) => !this.ctx.found.has(x));
    if (!fresh.length) return [];
    fresh.forEach((x) => this.ctx.found.add(x));
    try {
      localStorage.setItem(SECRETS_KEY, JSON.stringify([...this.ctx.found]));
    } catch {}
    return fresh.map((x) => {
      const s = SECRETS.find(([id]) => id === x);
      return T(a("★ secret unlocked: "), { text: s?.[1] ?? x, color: C.bright, weight: 700 }, d(`  (${this.ctx.found.size}/${SECRETS.length}) · `), L("secrets", "secrets"));
    });
  }

  // Answer to the first-visit question.
  answer(raw: string) {
    const v = raw.trim().toLowerCase();
    const echo = T({ text: "? technical [y/n] › ", color: C.prompt }, raw.trim());
    if (/^y(es)?$/.test(v)) {
      setMode("terminal");
      this.push(welcome(), { gate: false });
    } else if (/^no?$/.test(v)) this.leave([echo]);
    else this.push([echo, T(d("please answer "), L("y", "y"), d(" or "), L("n", "n"))]);
  }
  // Close the terminal like an app window, then go to the regular site.
  leave(out: Line[]) {
    setMode("ui");
    this.stopAnim();
    this.push([...out, T(d("closing terminal…"))], { closing: true });
    setTimeout(() => window.location.assign(UI_PATH), 420);
  }

  vimScreen(path: string, body: string[]): Line[] {
    const shown = body.slice(0, 18);
    return [
      ...shown.map((l, i) => T(d(String(i + 1).padStart(3) + " "), l)),
      ...Array.from({ length: Math.max(3, 8 - shown.length) }, () => T({ text: "~", color: C.accent })),
      T({ text: " NORMAL ", color: C.ink, bg: C.live, weight: 700 }, " ", { text: `"${path}" ${body.length}L`, color: C.fg }, d("   [readonly]")),
      T(d("you're in vim now. type an ex command (like :q) and press enter.")),
    ];
  }
  vimCmd(raw: string) {
    const v = raw.trim().replace(/^:/, "");
    const echo = T({ text: ":", color: C.prompt, weight: 700 }, v);
    const tries = (this.state.vim?.tries ?? 0) + 1;
    if (/^(q|q!|wq|wq!|x|qa|qa!|wqa)$/.test(v)) {
      this.push([echo, T(ok("you escaped vim. "), d("most people never do.")), ...this.unlock(["vim"])], { vim: null });
      return;
    }
    const msg = v === "help" ? "E478: Don't panic!" : v === "w" ? "E45: 'readonly' option is set (add ! to override)" : v === "" ? "" : `E492: Not an editor command: ${v}`;
    const lines: Line[] = [echo];
    if (msg) lines.push(T(r(msg)));
    if (tries >= 2) lines.push(T(d("psst: type "), g("q"), d(" and press enter.")));
    this.push(lines, { vim: { tries } });
  }

  run(raw: string) {
    if (this.state.gate) {
      this.answer(raw);
      return;
    }
    if (this.state.vim) {
      this.vimCmd(raw);
      return;
    }
    this.stopAnim();
    const cmd = raw.trim();
    const echo: Line[] = [T({ text: tilde(this.ctx.cwd), color: C.teal, weight: 700 }), echoLine(cmd)];
    if (!cmd) {
      this.push(echo);
      return;
    }
    this.ctx.hist.push(cmd);
    this.setState((s) => ({ hist: [...s.hist, cmd], hIdx: -1 }));
    const res = exec(cmd, this.ctx);
    // Store `!!` as what it expanded to, the way shells do.
    if (res.expanded && res.expanded !== cmd) {
      this.ctx.hist[this.ctx.hist.length - 1] = res.expanded;
      this.setState((s) => ({ hist: [...s.hist.slice(0, -1), res.expanded!] }));
      echo[1] = echoLine(res.expanded);
    }
    if (res.clear) {
      this.setState({ blocks: [], sel: 0 });
      return;
    }
    if (res.open) window.open(res.open, "_blank");
    if (res.copy) navigator.clipboard?.writeText(res.copy).catch(() => {});
    const lines = [...echo, ...res.lines];
    const stars = this.unlock(res.secrets);
    const extra: Partial<State> = { cwd: tilde(this.ctx.cwd) };
    if (res.flow === "contact") extra.flow = { step: 0, data: {} };
    if (res.vim) {
      lines.push(...this.vimScreen(res.vim.path, res.vim.lines));
      extra.vim = { tries: 0 };
    }
    if (res.leave) {
      this.leave(lines);
      return;
    }
    if (res.frames?.length) {
      const id = this.push(lines, extra);
      this.animate(id, lines, [...res.frames.slice(0, -1), [...res.frames[res.frames.length - 1], ...stars]], res.frameMs ?? 120);
    } else this.push([...lines, ...stars], extra);
  }

  flowStep(val: string) {
    const { flow } = this.state;
    if (!flow) return;
    const key = FLOW[flow.step];
    const line = T(ok("✔ "), d(key + " › "), val || d("(empty)"));
    const data = { ...flow.data, [key]: val };
    if (flow.step < FLOW.length - 1) {
      this.push([line], { flow: { step: flow.step + 1, data } });
      return;
    }
    const url = `mailto:${EMAIL}?subject=${encodeURIComponent("Hello from " + (data["your name"] || "nasi.work"))}&body=${encodeURIComponent(
      (data.message || "") + "\n\n— " + (data["your name"] || "") + " (" + (data.email || "") + ")",
    )}`;
    this.push([line, T(""), T(ok("✔ message ready. "), "I read every message."), T(U("send via mail app ↗", url), d("   ·   "), L("copy email", "email"), d("   ·   "), L("socials", "socials"))], { flow: null });
  }

  submit() {
    const v = this.state.input;
    this.setState({ input: "", caret: 0 });
    if (this.state.flow) this.flowStep(v.trim());
    else this.run(v);
  }
  complete() {
    const v = this.state.input;
    if (!v || this.state.gate || this.state.flow || this.state.vim) return;
    const res = complete(v, this.ctx);
    if (res.value) this.setState({ input: res.value, caret: res.value.length });
    if (res.options && res.options.length > 1)
      this.push([T({ text: tilde(this.ctx.cwd), color: C.teal, weight: 700 }), echoLine(v), T(d(res.options.slice(0, 60).join("   ")))]);
  }
  toInsert(prefill?: string) {
    const focus = () => this.inputEl.current?.focus();
    if (prefill != null) this.setState({ mode: "insert", input: prefill, caret: prefill.length }, focus);
    else this.setState({ mode: "insert" }, focus);
  }
  toNormal() {
    if (this.state.flow) this.push([T(d("contact cancelled"))], { flow: null });
    this.inputEl.current?.blur();
    this.setState({ mode: "normal", sel: 0 }, () => {
      this.revealSel();
      this.focusCatcher();
    });
  }

  onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const k = e.key;
    if (k === "Enter") {
      e.preventDefault();
      this.submit();
    } else if (k === "Escape") {
      e.preventDefault();
      this.toNormal();
    } else if (k === "Tab") {
      e.preventDefault();
      this.complete();
    } else if (e.ctrlKey && k.toLowerCase() === "l") {
      e.preventDefault();
      this.setState({ blocks: [] });
    } else if (e.ctrlKey && k.toLowerCase() === "c") {
      // ^C: drop the line (or stop an animation), like a shell.
      if (window.getSelection?.()?.toString()) return;
      e.preventDefault();
      this.stopAnim();
      this.push([T({ text: tilde(this.ctx.cwd), color: C.teal, weight: 700 }), T(echoLine(this.state.input).segs[0], { text: this.state.input + "^C", color: C.dim })], { input: "", caret: 0, flow: null });
    } else if (k === "ArrowUp" || k === "ArrowDown") {
      e.preventDefault();
      const h = this.state.hist;
      if (!h.length) return;
      let i = this.state.hIdx < 0 ? h.length : this.state.hIdx;
      i += k === "ArrowUp" ? -1 : 1;
      if (i >= h.length) {
        this.setState({ hIdx: -1, input: "", caret: 0 });
        return;
      }
      i = Math.max(0, i);
      this.setState({ hIdx: i, input: h[i], caret: h[i].length });
    }
  };

  // Mode badge stays truthful: clicking or tabbing away from the prompt drops into
  // NORMAL; clicks inside the terminal (words, chips) hand focus straight back.
  onInputBlur = () => {
    requestAnimationFrame(() => {
      if (!this.pressing) this.syncMode();
    });
  };
  // INSERT only while the prompt actually has focus.
  syncMode() {
    if (this.state.mode !== "insert" || !document.hasFocus()) return;
    if (document.activeElement === this.inputEl.current) return;
    if (this.state.flow) this.push([T(d("contact cancelled"))], { flow: null });
    this.setState({ mode: "normal", sel: 0 }, () => {
      this.revealSel();
      this.focusCatcher();
    });
  }

  handleKey = (e: KeyboardEvent) => {
    if (document.activeElement === this.inputEl.current) return;
    if (this.state.mode === "insert") {
      if (e.key === "Escape") {
        e.preventDefault();
        this.toNormal();
      } else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) this.inputEl.current?.focus();
      return;
    }
    const el = this.scrollEl.current;
    const k = e.key;
    const n = this.links.length;
    let handled = true;
    if (e.ctrlKey && (k === "d" || k === "u")) {
      if (el) el.scrollTop += ((k === "d" ? 1 : -1) * el.clientHeight) / 2;
    } else if (k === "j" || k === "ArrowDown") {
      if (n) this.setState((s) => ({ sel: Math.min(s.sel + 1, n - 1) }), () => this.revealSel());
      else if (el) el.scrollTop += 40;
    } else if (k === "k" || k === "ArrowUp") {
      if (n) this.setState((s) => ({ sel: Math.max(s.sel - 1, 0) }), () => this.revealSel());
      else if (el) el.scrollTop -= 40;
    } else if (k === "g") {
      if (this.lastKey === "g" && el) {
        el.scrollTop = 0;
        this.setState({ sel: 0 });
        this.lastKey = "";
        e.preventDefault();
        return;
      }
    } else if (k === "G") {
      if (el) el.scrollTop = el.scrollHeight;
      if (n) this.setState({ sel: Math.max(this.outLinks - 1, 0) }, () => this.revealSel());
    } else if (k === "Enter" || k === "o") {
      const s = this.links[this.state.sel];
      if (s) this.activate(s);
    } else if (this.state.sel >= this.outLinks && (k === "l" || k === "ArrowRight" || k === "h" || k === "ArrowLeft")) {
      // On the chip row, h/l walk left and right along it.
      const right = k === "l" || k === "ArrowRight";
      this.setState((s) => ({ sel: Math.min(Math.max(s.sel + (right ? 1 : -1), this.outLinks), n - 1) }));
    } else if (k === "l" || k === "ArrowRight") this.run("next");
    else if (k === "h" || k === "ArrowLeft") {
      if (this.ctx.cur >= 0) this.run("prev");
    } else if (k === "i" || k === "a" || k === ":") this.toInsert();
    else if (k === "/") this.toInsert("find ~ -name ");
    else if (k === "q") this.setState({ blocks: [], sel: 0 });
    else if (k === "?") this.run("help");
    else handled = false;
    this.lastKey = k;
    if (handled) e.preventDefault();
  };

  activate(s: Seg) {
    if (s.url) window.open(s.url, "_blank");
    else if (s.cmd) this.run(s.cmd);
  }
  focusInput = () => {
    const s = window.getSelection && window.getSelection()?.toString();
    if (!s) this.toInsert();
  };

  render() {
    const { blocks, mode, sel, flow, cwd, input, caret, gate, vim, closing } = this.state;
    const chips = this.props.showChips !== false && !gate;
    const normal = mode === "normal";
    const lastI = blocks.length - 1;
    const links: Seg[] = [];

    const seg = (s: Seg, isLast: boolean, key: number) => {
      const isLink = !!(s.cmd || s.url);
      const idx = isLast && isLink ? links.push(s) - 1 : -1;
      const on = normal && idx === sel;
      return (
        <span
          key={key}
          data-sel={on ? "1" : "0"}
          onClick={
            isLink
              ? (e) => {
                  e.stopPropagation();
                  // Keep typing where you were: a click in INSERT returns focus to the prompt.
                  if (!normal) this.toInsert();
                  this.activate(s);
                }
              : undefined
          }
          style={{
            color: on ? C.ink : s.color || C.fg,
            background: on ? C.accent : s.bg || "transparent",
            fontWeight: s.weight || "inherit",
            textDecoration: isLink ? "underline" : "none",
            textDecorationColor: isLink ? "color-mix(in srgb, currentColor 45%, transparent)" : undefined,
            textUnderlineOffset: 3,
            cursor: isLink ? "pointer" : "inherit",
          }}
        >
          {s.text}
        </span>
      );
    };
    const textLine = (l: TextLine, isLast: boolean, key: number) => (
      <div
        key={key}
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          minHeight: "1.4em",
          fontSize: l.size || "13px",
          lineHeight: l.lh || "1.55",
          fontWeight: l.weight || 400,
          letterSpacing: l.ls || "normal",
        }}
      >
        {l.segs.map((s, i) => seg(s, isLast, i))}
      </div>
    );

    const body = blocks.map((bk, bi) => {
      const last = bi === lastI;
      return (
        <div key={bk.id} data-block={bk.id} style={{ marginBottom: 14 }}>
          {bk.lines.map((l, i) => {
            if (l.kind === "box" && l.src)
              return (
                <LoadingImg
                  key={l.src + i}
                  src={l.src}
                  alt={l.label}
                  box={{ margin: "6px 0", maxWidth: 520, height: l.h || "150px" }}
                  img={{ display: "block", margin: "6px 0", width: "100%", maxWidth: 520, height: "auto", border: `1px solid ${C.line}`, borderRadius: 8, background: C.panel }}
                />
              );
            if (l.kind === "box")
              return (
                <div
                  key={i}
                  style={{ margin: "6px 0", maxWidth: 520, height: l.h || "120px", border: `1px dashed ${C.edge}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontSize: 12 }}
                >
                  [ {l.label} ]
                </div>
              );
            if (l.kind === "row")
              return (
                <div key={i} style={{ display: "flex", gap: 18, margin: "4px 0", flexWrap: "wrap" }}>
                  {l.src && (
                    <LoadingImg
                      key={l.src}
                      src={l.src}
                      alt="Natnael Sisay"
                      box={{ width: 120, height: 140, flex: "none" }}
                      img={{ width: 120, height: 140, flex: "none", objectFit: "cover", border: `1px solid ${C.edge}`, borderRadius: 8 }}
                    />
                  )}
                  <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                    {l.sub.map((x, j) => (
                      <div key={j} style={{ whiteSpace: "pre-wrap" }}>
                        {x.segs.map((s, k) => seg(s, last, k))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            return textLine(l, last, i);
          })}
        </div>
      );
    });
    this.outLinks = links.length;
    const chipBase = links.length;
    if (chips) CHIPS.forEach((c) => links.push({ text: c, cmd: c }));
    this.links = links;

    const promptText = gate ? "? technical [y/n] › " : flow ? `? ${FLOW[flow.step]} › ` : vim ? ":" : "❯ ";
    const at = Math.min(caret, input.length);

    return (
      <div
        onClick={this.focusInput}
        onPointerDown={() => {
          this.pressing = true;
        }}
        style={{
          width: "100%",
          height: "100dvh",
          background: C.ink,
          borderLeft: `2px solid ${C.teal}`,
          color: C.fg,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          font: "400 13px/1.55 var(--font-term), ui-monospace, monospace",
          animation: closing ? "term-close .42s cubic-bezier(.4,0,1,1) forwards" : undefined,
          transformOrigin: "50% 60%",
        }}
      >
        {/* Pane border, like a tmux/zellij split: accent along the top. */}
        <div style={{ height: 2, flex: "none", background: `linear-gradient(90deg, ${C.line} 0 50%, ${C.accent} 50% 100%)` }} />

        <textarea
          ref={this.catcherEl}
          aria-hidden
          tabIndex={-1}
          inputMode="none"
          value=""
          onChange={() => {}}
          style={{ position: "fixed", left: -9999, top: 0, width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
        />
        <div ref={this.scrollEl} style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "14px 20px 8px" }}>
          {body}
          {/* Starship-style prompt: the folder on its own line, then ❯ and the input. */}
          {!gate && !flow && !vim && <div style={{ color: C.teal, fontWeight: 700 }}>{cwd}</div>}
          <div style={{ display: "flex", alignItems: "baseline", gap: 0, whiteSpace: "pre" }}>
            <span style={{ color: C.prompt, fontWeight: 700 }}>{promptText}</span>
            <span style={{ position: "relative", flex: 1, minWidth: 0, display: "flex" }}>
              <input
                ref={this.inputEl}
                aria-label="Terminal command"
                value={input}
                onChange={(e) => this.setState({ input: e.target.value, caret: e.target.selectionStart ?? e.target.value.length, hIdx: -1 })}
                onSelect={(e) => this.setState({ caret: e.currentTarget.selectionStart ?? input.length })}
                onKeyDown={this.onInputKey}
                onFocus={() => {
                  if (this.state.mode !== "insert") this.setState({ mode: "insert" });
                }}
                onBlur={this.onInputBlur}
                placeholder={gate ? "y or n" : flow ? "" : vim ? "q to quit" : normal ? "NORMAL mode, press i to type" : "type a command… (try help, ls -a, cd projects)"}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                className="term-input"
                // The block cursor below replaces the browser's thin caret; while empty, the
                // hint starts after the block instead of under it.
                style={{ caretColor: "transparent", textIndent: input ? undefined : "1.5ch" }}
              />
              {/* Block cursor drawn over the input: solid while typing, hollow in NORMAL. */}
              <span aria-hidden style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", whiteSpace: "pre" }}>
                <span style={{ visibility: "hidden" }}>{input.slice(0, at)}</span>
                <span style={normal ? { boxShadow: `inset 0 0 0 1px ${C.cursor}`, color: "transparent" } : { background: C.cursor, color: C.ink }}>{input[at] ?? " "}</span>
              </span>
            </span>
          </div>
        </div>

        {chips && (
          <div style={{ flex: "none", display: "flex", flexWrap: "wrap", gap: 6, padding: "8px 14px", borderTop: `1px solid ${C.line}` }}>
            {CHIPS.map((c, i) => {
              const on = normal && sel === chipBase + i;
              return (
                <span
                  key={c}
                  data-chip-sel={on ? "1" : "0"}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!normal) this.toInsert();
                    this.run(c);
                  }}
                  className="term-chip"
                  style={on ? { background: C.accent, borderColor: C.accent, color: C.ink, fontWeight: 700 } : undefined}
                >
                  {c}
                </span>
              );
            })}
          </div>
        )}

        {/* tmux/zellij-style tab bar: active tab is the mode, then the folder. */}
        <div style={{ height: 26, flex: "none", display: "flex", alignItems: "center", gap: 2, padding: "0 6px 4px", fontSize: 12, fontWeight: 700 }}>
          <span style={{ height: "100%", display: "flex", alignItems: "center", gap: 6, padding: "0 10px", background: normal ? C.prompt : vim ? C.live : C.accent, color: C.ink }}>
            ○ {normal ? "normal" : vim ? "vim" : flow ? "prompt" : "insert"}
          </span>
          <span style={{ height: "100%", display: "flex", alignItems: "center", gap: 6, padding: "0 10px", background: C.panel, color: C.fg, fontWeight: 500, minWidth: 0, overflow: "hidden", whiteSpace: "nowrap" }}>
            <span style={{ color: C.teal }}>▣</span> 1 nasi <span style={{ color: C.dim, overflow: "hidden", textOverflow: "ellipsis" }}>{cwd}</span>
          </span>
          <span style={{ marginLeft: "auto", padding: "0 10px", color: C.dim, fontWeight: 400, fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {normal ? "j/k move · ⏎ open · gg/G top/bottom · h/l prev/next · / find · i type" : "tab complete · ↑↓ history · ctrl+c cancel · ctrl+l clear · esc vim mode"}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              this.leave([]);
            }}
            title="Close the terminal and go to the regular site"
            className="term-exit"
          >
            exit ↗ regular site
          </button>
        </div>
      </div>
    );
  }
}

