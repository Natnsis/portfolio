"use client";

// Port of "Terminal Portfolio.dc.html" (claude.ai/design). Content, layout and
// behavior follow the design file, with these changes: the mode badge also switches
// when the prompt gains or loses focus, the window runs edge to edge, and project
// screenshots and the profile photo are shown instead of placeholder boxes, the project
// list is all of data/projects.json, and NORMAL mode parks focus on a hidden key catcher
// so vim-style browser extensions (Vimium, Surfingkeys) let j/k through.
import { Component, createRef, useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/lib/projects";

const G = "#2ea44f";
const DIM = "#888";
const FG = "#f0eee9";
const INK = "#1d1d1b";
const EMAIL = "nsisay49@gmail.com";

interface Proj {
  slug: string;
  name: string;
  tag: string;
  kind: string;
  year: string;
  role: string;
  stack: string;
  desc: string;
  shot?: string;
  live: string;
  repo: string;
}

// Every project in data/projects.json, in file order. Slug is what you type (`open linksy`),
// tag is what `projects --tag=` filters on.
const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const tagOf = (cats: string[]) => {
  if (cats.includes("Mobile Apps")) return "mobile";
  if (cats.includes("Bots")) return "bot";
  if (cats.includes("Tools") && !cats.some((c) => c === "Web Apps" || c === "Landing Pages")) return "tool";
  return "web";
};
// A missing (or example.com placeholder) URL shows 'not set yet'.
const realUrl = (u?: string) => (u && !/example\.com/.test(u) ? u : "");
const P: Proj[] = PROJECTS.map((x) => {
  const [kind = "", year = "", role = ""] = x.meta.split(" · ");
  return {
    slug: slugify(x.title),
    name: x.title,
    tag: tagOf(x.categories),
    kind: kind.toLowerCase(),
    year,
    role: role.toLowerCase(),
    stack: x.tags.join(" · "),
    desc: x.summary,
    // Cloudinary serves a 1100px-wide, auto-compressed copy instead of the full-size original.
    shot: x.image?.replace("/upload/", "/upload/w_1100,c_limit,q_auto,f_auto/"),
    live: realUrl(x.liveUrl),
    repo: realUrl(x.githubUrl),
  };
});
const PHOTO = "/avatar.png";

// Image that shows a dashed "loading..." box (dots blinking in turn) until it has
// arrived, and says so if it fails. `box` sizes the placeholder; `img` styles the image.
// Each dot blinks in turn; kept with the component so it never depends on stylesheet caching.
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
          style={{ border: "1.5px dashed #777", display: "flex", alignItems: "center", justifyContent: "center", color: "#888", fontSize: 12, textAlign: "center", ...box }}
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

const EXP: { title: string; org: string; when: string; desc: string; link?: [string, string]; url?: [string, string] }[] = [
  { title: "Software Engineer", org: "fintech team", when: "present · full-time", desc: "Backend microservices in Go, plus frontend work in TypeScript." },
  { title: "Freelance Full-Stack Developer", org: "independent", when: "2026 · freelance", desc: "Client sites and tools, e.g.", link: ["mereb-landing", "open mereb-landing"] },
  { title: "Software Development Intern", org: "Commercial Bank of Ethiopia", when: "internship", desc: "Software development internship.", url: ["internship letter ↗", "https://nasi.work/credentials/cbe-internship-letter.pdf"] },
];
const CERTS = [
  ["B.Sc. in Computer Science", "cs-degree"],
  ["Best Final Year Project Winner", "final-year-project-award"],
  ["Internship at CBE", "cbe-internship-letter"],
  ["Cisco Networking Certified", "cisco-certificate"],
  ["AI Certified", "ai-certificate"],
  ["Android Development Certified", "android-certificate"],
  ["Data Analysis Certified", "data-analysis-certificate"],
];
const SOCIALS = [
  ["github", "https://github.com/Natnsis"],
  ["linkedin", "https://www.linkedin.com/in/natnael-sisay-orcadev/"],
  ["telegram", "https://t.me/Flawless_22_4"],
  ["x", "https://x.com/NatnaelSis24858"],
];
const HELP = [
  ["help", "show every command", "help"],
  ["whoami", "who is this?", "whoami"],
  ["ls", "list home directory", "ls"],
  ["work", "work experience", "work"],
  ["projects", "list all projects  [--tag=web|mobile|bot|tool]", "projects"],
  ["open <project>", "read a case study  (alias: cat, cd, or a number)", "open mereb-landing"],
  ["visit / source", "open live site / github repo of current project", "source"],
  ["next / prev", "step through projects", "next"],
  ["find <text>", "search projects by name, tag or stack", "find flutter"],
  ["about", "bio, neofetch style", "about"],
  ["stack", "tools I reach for", "stack"],
  ["certs", "the paperwork (7 pdfs)", "certs"],
  ["resume", "open resume.pdf", "resume"],
  ["contact", "send me a message", "contact"],
  ["email", "copy my email", "email"],
  ["socials", "github · linkedin · telegram · x", "socials"],
  ["history", "commands you ran", "history"],
  ["clear", "clear the screen  (ctrl+l)", "clear"],
];
const VIM = [
  ["j / k", "select next / prev link"],
  ["enter / o", "open selected link"],
  ["gg / G", "jump to top / bottom"],
  ["ctrl+d / u", "half-page down / up"],
  ["h / l", "prev / next project"],
  ["/", "find a project"],
  ["i  a  :", "back to typing"],
  ["q", "clear screen"],
  ["?", "help"],
];
const CMDS = ["help", "whoami", "ls", "work", "projects", "visit", "source", "open", "cat", "cd", "next", "prev", "find", "about", "stack", "certs", "resume", "contact", "email", "socials", "history", "clear", "sudo", "exit"];
const FLOW = ["your name", "email", "message"];
const CHIPS = ["help", "work", "projects", "about", "stack", "certs", "contact", "resume", "clear"];

/* ---------- line model ---------- */

interface Seg {
  text: string;
  color?: string;
  weight?: number;
  cmd?: string;
  url?: string;
}
interface TextLine {
  kind: "text";
  segs: Seg[];
  size?: string;
  lh?: string;
  weight?: number;
  ls?: string;
}
interface BoxLine {
  kind: "box";
  label: string;
  h?: string;
  src?: string;
}
interface RowLine {
  kind: "row";
  label: string;
  src?: string;
  sub: TextLine[];
}
type Line = TextLine | BoxLine | RowLine;

const T = (...segs: (string | Seg)[]): TextLine => ({ kind: "text", segs: segs.map((s) => (typeof s === "string" ? { text: s } : s)) });
const g = (text: string): Seg => ({ text, color: G });
const d = (text: string): Seg => ({ text, color: DIM });
const b = (text: string): Seg => ({ text, weight: 700 });
const L = (text: string, cmd: string): Seg => ({ text, cmd });
const U = (text: string, url: string): Seg => ({ text, url });
const pad = (s: string, n: number): Seg => ({ text: " ".repeat(Math.max(1, n - s.length)) });

interface Flow {
  step: number;
  data: Record<string, string>;
}
interface State {
  blocks: { id: number; lines: Line[] }[];
  mode: "insert" | "normal";
  sel: number;
  input: string;
  hist: string[];
  hIdx: number;
  flow: Flow | null;
  cur: number;
  cwd: string;
}

export default class Terminal extends Component<{ showChips?: boolean }, State> {
  state: State = { blocks: [], mode: "insert", sel: 0, input: "", hist: [], hIdx: -1, flow: null, cur: -1, cwd: "~" };
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

  componentDidMount() {
    this.push(this.welcome());
    // Capture phase, so nothing else on the page can swallow the vim keys first.
    window.addEventListener("keydown", this.handleKey, true);
    window.addEventListener("pointerup", this.endPress);
    setTimeout(() => this.inputEl.current?.focus(), 60);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKey, true);
    window.removeEventListener("pointerup", this.endPress);
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
    const a = document.activeElement;
    if (a === this.catcherEl.current || a === this.inputEl.current) return;
    // Leave a text selection alone so it can still be copied.
    if (window.getSelection?.()?.toString()) return;
    this.catcherEl.current?.focus({ preventScroll: true });
  }

  toTop() {
    requestAnimationFrame(() => {
      if (this.scrollEl.current) this.scrollEl.current.scrollTop = 0;
    });
  }
  toBottom() {
    requestAnimationFrame(() => {
      const el = this.scrollEl.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }
  revealSel() {
    requestAnimationFrame(() => {
      const el = this.scrollEl.current;
      if (!el) return;
      const s = el.querySelector('[data-sel="1"]');
      if (!s) return;
      const r = s.getBoundingClientRect();
      const c = el.getBoundingClientRect();
      if (r.top < c.top + 12) el.scrollTop -= c.top + 12 - r.top;
      else if (r.bottom > c.bottom - 12) el.scrollTop += r.bottom - c.bottom + 12;
    });
  }

  push(lines: Line[], extra: Partial<State> = {}, append = false) {
    this.setState(
      (s) =>
        ({
          ...s,
          blocks: append ? [...s.blocks, { id: ++this.uid, lines }] : [{ id: ++this.uid, lines }],
          sel: 0,
          ...extra,
        }) as State,
      () => (append ? this.toBottom() : this.toTop()),
    );
  }

  whoami(): Line[] {
    return [
      { kind: "text", size: "38px", lh: "1.1", weight: 700, ls: "-0.02em", segs: [{ text: "NATNAEL SISAY" }] },
      T(d("full-stack developer · go + typescript · based in ethiopia")),
      T('"I read the docs and ship things that work."'),
      T(d("status: "), g("● open to new work and good problems")),
    ];
  }
  welcome(): Line[] {
    return [
      T(d("nasi.work · terminal v1 · last login: today")),
      T(""),
      ...this.whoami(),
      T(""),
      T(d("type "), L("help", "help"), d(" to see every command, or click one below.")),
      T(d("press "), g("esc"), d(" for vim motions: j/k to move, enter to open, / to find.")),
    ];
  }
  help(): Line[] {
    const out: Line[] = [T(b("COMMANDS"), d("   (click any to run)"))];
    HELP.forEach(([n, desc, run]) => out.push(T("  ", L(n, run), pad(n, 18), d(desc))));
    out.push(T(""), T(b("VIM MOTIONS"), d("   (press esc first)")));
    for (let i = 0; i < VIM.length; i += 2) {
      const a = VIM[i];
      const c = VIM[i + 1];
      const segs: Seg[] = [{ text: "  " }, g(a[0]), pad(a[0], 12), d(a[1].padEnd(28))];
      if (c) segs.push(g(c[0]), pad(c[0], 12), d(c[1]));
      out.push(T(...segs));
    }
    out.push(T(""), T(b("MOUSE"), d("   click any underlined word · chips below run commands")));
    return out;
  }
  lsWork(list: Proj[], title: string): Line[] {
    const out: Line[] = [T(d(title))];
    list.forEach((p) => {
      const i = P.indexOf(p);
      out.push(
        T(
          d("drwx  "),
          d(String(i + 1).padStart(2, "0") + "  "),
          L(p.slug + "/", "open " + p.slug),
          pad(p.slug + "/", 22),
          p.tag.padEnd(8),
          d(p.stack),
        ),
      );
    });
    out.push(
      T(
        d(`${list.length} item${list.length === 1 ? "" : "s"} · filter: `),
        L("web", "projects --tag=web"),
        d(" · "),
        L("mobile", "projects --tag=mobile"),
        d(" · "),
        L("bot", "projects --tag=bot"),
        d(" · "),
        L("tool", "projects --tag=tool"),
        d(" · "),
        L("all", "projects"),
      ),
    );
    return out;
  }
  project(i: number): Line[] {
    const p = P[i];
    const prev = P[(i + P.length - 1) % P.length];
    const next = P[(i + 1) % P.length];
    return [
      { kind: "text", size: "26px", lh: "1.2", weight: 700, segs: [{ text: "# " + p.name }] },
      T(d(`${p.kind} · ${p.year} · ${p.role} · ${p.tag}`)),
      { kind: "box", label: p.slug + " / screenshot.png", h: "150px", src: p.shot },
      T(g("## what")),
      T(p.desc),
      T(""),
      T(g("## stack")),
      T(p.stack),
      T(""),
      T(g("## links")),
      T(L("visit ↗", "visit " + p.slug), d("   live site     ·   "), L("source ↗", "source " + p.slug), d("   github repo")),
      T(""),
      T(L("← " + prev.slug, "prev"), d("   ·   "), L("all projects", "projects"), d("   ·   "), L(next.slug + " →", "next")),
    ];
  }
  experience(): Line[] {
    const out: Line[] = [T(d("~/work · experience"))];
    EXP.forEach((e) => {
      out.push(
        T(""),
        { kind: "text", size: "17px", lh: "1.4", weight: 700, segs: [{ text: e.title }, { text: "  · " + e.org, color: DIM, weight: 400 }] },
        T(d(e.when)),
      );
      const segs: (string | Seg)[] = [e.desc];
      if (e.link) segs.push(" ", L(e.link[0], e.link[1]));
      if (e.url) segs.push("  ", U(e.url[0], e.url[1]));
      out.push(T(...segs));
    });
    out.push(T(""), T(d("see also: "), L("projects", "projects"), d(" · "), L("resume", "resume"), d(" · "), L("certs", "certs")));
    return out;
  }
  about(): Line[] {
    return [
      {
        kind: "row",
        label: "photo",
        src: PHOTO,
        sub: [
          T(g("natnael@nasi")),
          T(d("────────────────")),
          T(g("role    "), "full-stack developer"),
          T(g("os      "), "ethiopia"),
          T(g("shell   "), "go · typescript"),
          T(g("mobile  "), "flutter · react native"),
          T(g("editor  "), L("nati-vim", "open nati-vim")),
          T(g("status  "), "open to work"),
        ],
      },
      T(
        "I'm a full-stack developer who researches before building, communicates openly, and adapts fast to whatever the project throws at me. Solo or with a team, I bring ideas, honest feedback, and a real drive to ship quality software.",
      ),
      T(""),
      T(d("more: "), L("stack", "stack"), d(" · "), L("certs", "certs"), d(" · "), L("resume", "resume"), d(" · "), L("contact", "contact")),
    ];
  }
  stack(): Line[] {
    const rows = [
      ["languages", "ts/js · golang"],
      ["frontend", "react/next · svelte · shadcn/ui · zustand · tanstack query"],
      ["backend", "node/express · gin · prisma · gorm · zod"],
      ["mobile", "react native · flutter"],
      ["editor", "neovim"],
    ];
    return [T(d("~/tools")), ...rows.map(([k, v]) => T(g(k), pad(k, 12), v))];
  }
  certs(): Line[] {
    return [T(d("ls ~/paperwork  (click to open pdf)")), ...CERTS.map(([n, f]) => T(d("-r--  "), U(n, `https://nasi.work/credentials/${f}.pdf`), d(" ↗")))];
  }

  listProjects(out: Line[], arg: string) {
    const m = (arg || "").match(/--tag=(\w+)/);
    const list = m ? P.filter((p) => p.tag === m[1]) : P;
    this.push([...out, ...this.lsWork(list, m ? `~/projects --tag=${m[1]}` : "~/projects --sort=year")], { cwd: "~/projects", cur: -1 });
  }
  activate(s: Seg) {
    if (s.url) window.open(s.url, "_blank");
    else if (s.cmd) this.run(s.cmd);
  }

  run(raw: string) {
    const cmd = raw.trim();
    const echo = T(g(`nasi@work:${this.state.cwd}$ `), cmd);
    if (!cmd) {
      this.push([echo]);
      return;
    }
    this.setState((s) => ({ hist: [...s.hist, cmd], hIdx: -1 }));
    const [c0, ...args] = cmd.split(/\s+/);
    const c = c0.toLowerCase();
    const arg = args.join(" ");
    const out: Line[] = [echo];
    const openIdx = (q: string) => {
      const n = parseInt(q, 10);
      if (!isNaN(n) && n >= 1 && n <= P.length) return n - 1;
      const k = q.replace(/\/$/, "").replace(/^(projects|work)\//, "").toLowerCase();
      return P.findIndex((p) => p.slug === k || p.slug.startsWith(k));
    };
    const open = () => {
      if (/^about(\.md)?$/.test(arg)) {
        this.push([...out, ...this.about()]);
        return;
      }
      const i = openIdx(arg || "");
      if (!arg || i < 0) {
        this.push([...out, T(`${c}: ${arg || "missing project"}: no such project`), T(d("try "), L("projects", "projects"))]);
        return;
      }
      this.push([...out, ...this.project(i)], { cur: i, cwd: "~/projects/" + P[i].slug });
    };

    switch (c) {
      case "help":
      case "man":
      case "?":
        this.push([...out, ...this.help()]);
        return;
      case "whoami":
        this.push([...out, ...this.whoami()]);
        return;
      case "ls": {
        if (!arg || arg === "~") {
          this.push([
            ...out,
            T(L("work/", "work"), "   ", L("projects/", "projects"), "   ", L("about.md", "about"), "   ", L("contact.sh", "contact"), "   ", L("resume.pdf", "resume"), "   ", L("paperwork/", "certs")),
          ]);
          return;
        }
        if (/^work\/?$/.test(arg)) {
          this.push([...out, ...this.experience()], { cwd: "~/work", cur: -1 });
          return;
        }
        this.listProjects(out, arg);
        return;
      }
      case "projects":
        this.listProjects(out, arg);
        return;
      case "work":
      case "experience":
        this.push([...out, ...this.experience()], { cwd: "~/work", cur: -1 });
        return;
      case "visit":
      case "source": {
        const i = arg ? openIdx(arg) : this.state.cur;
        if (i < 0) {
          this.push([...out, T(`${c}: open a project first`), T(d("try "), L("projects", "projects"))]);
          return;
        }
        const p = P[i];
        const url = c === "visit" ? p.live : p.repo;
        if (url) {
          window.open(url, "_blank");
          this.push([...out, T(d("opening "), U(url.replace("https://", ""), url), d(" …"))]);
        } else this.push([...out, T(d(`${c === "visit" ? "live url" : "github repo"} for `), b(p.slug), d(" not set yet")), T(L("← back to " + p.slug, "open " + p.slug))]);
        return;
      }
      case "cd": {
        if (!arg || arg === "~" || arg === "..") {
          this.push(out, { cwd: "~", cur: -1 });
          return;
        }
        if (arg.replace(/\/$/, "") === "work") {
          this.push([...out, ...this.experience()], { cwd: "~/work", cur: -1 });
          return;
        }
        if (arg.replace(/\/$/, "") === "projects") {
          this.listProjects(out, "");
          return;
        }
        open();
        return;
      }
      case "open":
      case "cat":
      case "vim":
        open();
        return;
      case "next":
      case "prev": {
        const cur = this.state.cur;
        const i = cur < 0 ? 0 : (cur + (c === "next" ? 1 : P.length - 1)) % P.length;
        this.push([...out, ...this.project(i)], { cur: i, cwd: "~/projects/" + P[i].slug });
        return;
      }
      case "find":
      case "grep": {
        const q = arg.toLowerCase();
        const list = P.filter((p) => (p.slug + p.name + p.tag + p.stack + p.desc).toLowerCase().includes(q));
        this.push(list.length ? [...out, ...this.lsWork(list, `find "${arg}"`)] : [...out, T(d(`no projects match "${arg}"`))]);
        return;
      }
      case "about":
        this.push([...out, ...this.about()]);
        return;
      case "stack":
      case "tools":
        this.push([...out, ...this.stack()]);
        return;
      case "certs":
      case "paperwork":
        this.push([...out, ...this.certs()]);
        return;
      case "resume":
        window.open("https://nasi.work/resume.pdf", "_blank");
        this.push([...out, T(d("opening "), U("resume.pdf", "https://nasi.work/resume.pdf"), d(" in a new tab…"))]);
        return;
      case "email":
      case "mail":
        try {
          navigator.clipboard.writeText(EMAIL).catch(() => {});
        } catch {}
        this.push([...out, T(g("✔ "), "copied ", b(EMAIL), d(" to clipboard"))]);
        return;
      case "socials":
        this.push([...out, ...SOCIALS.map(([n, u]) => T(g(n.padEnd(10)), U(u.replace("https://", ""), u)))]);
        return;
      case "history": {
        const h = [...this.state.hist];
        this.push([...out, ...(h.length ? h.map((x, i) => T(d(String(i + 1).padStart(3) + "  "), L(x, x))) : [T(d("no history yet"))])]);
        return;
      }
      case "clear":
        this.setState({ blocks: [], sel: 0 });
        return;
      case "contact":
        this.push([...out, T("Got a project in mind, a hard problem, or just want to say hi? I read every message."), T(d("3 quick questions · esc to cancel"))], {
          flow: { step: 0, data: {} },
        });
        return;
      case "sudo":
        this.push([...out, T("natnael is not in the sudoers file. This incident will be reported… to his inbox."), T(d("try "), L("contact", "contact"))]);
        return;
      case "exit":
      case "quit":
      case ":q":
        this.push([...out, T(d("there is no exit. there is, however, "), L("contact", "contact"))]);
        return;
      default: {
        const guess = CMDS.find((x) => x.startsWith(c.slice(0, 2))) || "help";
        this.push([...out, T(`command not found: ${c0}`), T(d("did you mean "), L(guess, guess), d("?  ·  type "), L("help", "help"))]);
      }
    }
  }

  flowStep(val: string) {
    const { flow } = this.state;
    if (!flow) return;
    const key = FLOW[flow.step];
    const line = T(g("✔ "), d(key + " › "), val || d("(empty)"));
    const data = { ...flow.data, [key]: val };
    if (flow.step < FLOW.length - 1) {
      this.push([line], { flow: { step: flow.step + 1, data } }, true);
      return;
    }
    const url = `mailto:${EMAIL}?subject=${encodeURIComponent("Hello from " + (data["your name"] || "nasi.work"))}&body=${encodeURIComponent(
      (data.message || "") + "\n\n— " + (data["your name"] || "") + " (" + (data.email || "") + ")",
    )}`;
    this.push(
      [line, T(""), T(g("✔ message ready. "), "I read every message."), T(U("send via mail app ↗", url), d("   ·   "), L("copy email", "email"), d("   ·   "), L("socials", "socials"))],
      { flow: null },
      true,
    );
  }

  submit() {
    const v = this.state.input;
    this.setState({ input: "" });
    if (this.state.flow) this.flowStep(v.trim());
    else this.run(v);
  }
  complete() {
    const v = this.state.input;
    if (!v) return;
    const m = v.match(/^(open|cat|cd|vim)\s+(.*)$/);
    const pool = m ? P.map((p) => m[1] + " " + p.slug) : CMDS;
    const hits = pool.filter((x) => x.startsWith(v));
    if (hits.length === 1) this.setState({ input: hits[0] + (m ? "" : " ") });
    else if (hits.length > 1) this.push([T(g(`nasi@work:${this.state.cwd}$ `), v), T(d(hits.map((h) => h.split(" ").pop()).join("   ")))], {}, true);
  }
  toInsert(prefill?: string) {
    this.setState(
      (s) => ({ mode: "insert", input: prefill != null ? prefill : s.input }),
      () => this.inputEl.current?.focus(),
    );
  }
  toNormal() {
    if (this.state.flow) this.push([T(d("contact cancelled"))], { flow: null }, true);
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
    } else if (k === "ArrowUp" || k === "ArrowDown") {
      e.preventDefault();
      const h = this.state.hist;
      if (!h.length) return;
      let i = this.state.hIdx < 0 ? h.length : this.state.hIdx;
      i += k === "ArrowUp" ? -1 : 1;
      if (i >= h.length) {
        this.setState({ hIdx: -1, input: "" });
        return;
      }
      i = Math.max(0, i);
      this.setState({ hIdx: i, input: h[i] });
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
    if (this.state.flow) this.push([T(d("contact cancelled"))], { flow: null }, true);
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
      if (this.state.cur >= 0) this.run("prev");
    } else if (k === "i" || k === "a" || k === ":") this.toInsert();
    else if (k === "/") this.toInsert("find ");
    else if (k === "q") this.setState({ blocks: [], sel: 0 });
    else if (k === "?") this.run("help");
    else handled = false;
    this.lastKey = k;
    if (handled) e.preventDefault();
  };

  focusInput = () => {
    const s = window.getSelection && window.getSelection()?.toString();
    if (!s) this.toInsert();
  };

  render() {
    const { blocks, mode, sel, flow, cwd, input } = this.state;
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
            color: on ? INK : s.color || FG,
            background: on ? G : "transparent",
            fontWeight: s.weight || "inherit",
            textDecoration: isLink ? "underline" : "none",
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
        <div key={bk.id} style={{ marginBottom: 14 }}>
          {bk.lines.map((l, i) => {
            if (l.kind === "box" && l.src)
              return (
                <LoadingImg
                  key={l.src}
                  src={l.src}
                  alt={l.label}
                  box={{ margin: "6px 0", maxWidth: 520, height: l.h || "150px" }}
                  img={{ display: "block", margin: "6px 0", width: "100%", maxWidth: 520, height: "auto", border: "1.5px solid #444", background: "#2a2a28" }}
                />
              );
            if (l.kind === "box")
              return (
                <div
                  key={i}
                  style={{ margin: "6px 0", maxWidth: 520, height: l.h || "120px", border: "1.5px dashed #777", display: "flex", alignItems: "center", justifyContent: "center", color: "#888", fontSize: 12 }}
                >
                  [ {l.label} ]
                </div>
              );
            if (l.kind === "row")
              return (
                <div key={i} style={{ display: "flex", gap: 18, margin: "4px 0", flexWrap: "wrap" }}>
                  {l.src ? (
                    <LoadingImg
                      key={l.src}
                      src={l.src}
                      alt="Natnael Sisay"
                      box={{ width: 120, height: 140, flex: "none" }}
                      img={{ width: 120, height: 140, flex: "none", objectFit: "cover", border: "1.5px solid #777" }}
                    />
                  ) : (
                  <div
                    style={{ width: 120, height: 140, flex: "none", border: "1.5px dashed #777", display: "flex", alignItems: "center", justifyContent: "center", color: "#888", fontSize: 12, textAlign: "center" }}
                  >
                    [ {l.label} ]
                  </div>
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
    if (this.props.showChips !== false) CHIPS.forEach((c) => links.push({ text: c, cmd: c }));
    this.links = links;

    return (
      <div
        onClick={this.focusInput}
        onPointerDown={() => {
          this.pressing = true;
        }}
        style={{
          width: "100%",
          height: "100dvh",
          background: INK,
          color: FG,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          font: "400 13px/1.55 var(--font-space-mono), 'Space Mono', monospace",
        }}
      >
        <div style={{ height: 24, flex: "none", borderBottom: "1.5px solid #444", display: "flex", alignItems: "center", gap: 6, padding: "0 10px" }}>
          <i style={{ width: 9, height: 9, border: "1.5px solid #888", borderRadius: "50%" }} />
          <i style={{ width: 9, height: 9, border: "1.5px solid #888", borderRadius: "50%" }} />
          <i style={{ width: 9, height: 9, border: "1.5px solid #888", borderRadius: "50%" }} />
          <span style={{ marginLeft: "auto", color: "#888", fontSize: 11 }}>nasi@work: {cwd}</span>
        </div>

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
          <div style={{ display: "flex", alignItems: "baseline", gap: 0, whiteSpace: "pre" }}>
            <span style={{ color: G }}>{flow ? `? ${FLOW[flow.step]} › ` : `nasi@work:${cwd}$ `}</span>
            <input
              ref={this.inputEl}
              aria-label="Terminal command"
              value={input}
              onChange={(e) => this.setState({ input: e.target.value, hIdx: -1 })}
              onKeyDown={this.onInputKey}
              onFocus={() => {
                if (this.state.mode !== "insert") this.setState({ mode: "insert" });
              }}
              onBlur={this.onInputBlur}
              placeholder={flow ? "" : normal ? "NORMAL mode, press i to type" : "type a command… (try help)"}
              spellCheck={false}
              autoComplete="off"
              className="term-input"
            />
          </div>
        </div>

        {this.props.showChips !== false && (
          <div style={{ flex: "none", display: "flex", flexWrap: "wrap", gap: 6, padding: "8px 14px", borderTop: "1.5px solid #444" }}>
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
                  style={on ? { background: G, borderColor: G, color: INK, fontWeight: 700 } : undefined}
                >
                  {c}
                </span>
              );
            })}
          </div>
        )}

        <div style={{ height: 22, flex: "none", borderTop: "1.5px solid #444", display: "flex", alignItems: "center", fontSize: 11 }}>
          <span style={{ height: "100%", display: "flex", alignItems: "center", padding: "0 10px", fontWeight: 700, background: normal ? G : FG, color: INK }}>
            {normal ? "NORMAL" : flow ? "PROMPT" : "INSERT"}
          </span>
          <span style={{ padding: "0 10px", color: "#aaa" }}>{cwd}</span>
          <span style={{ marginLeft: "auto", padding: "0 10px", color: "#888", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {normal ? "j/k move (down into chips) · ⏎ open · gg/G top/bottom · h/l prev/next · / find · i type" : "tab complete · ↑↓ history · ctrl+l clear · esc vim mode"}
          </span>
        </div>
      </div>
    );
  }
}
