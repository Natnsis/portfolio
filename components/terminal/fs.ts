// The terminal's pretend file system. The portfolio lives under ~ (projects, work,
// paperwork…), dotfiles and a few system folders make it feel like a real box, and
// visitors can touch/mkdir/rm their own files for the session.
import { BIO, CERTS, EMAIL, EXP, P, SITE, SOCIALS, STACK } from "./data";

export const HOME = "/home/nasi";

export interface FFile {
  kind: "file";
  body?: string;
  url?: string; // opens in a new tab (pdfs)
  img?: string; // shown as an image (screenshots)
  exec?: string; // runs a command (contact.sh)
  secret?: string; // reading it unlocks this secret
  denied?: boolean;
  mine?: boolean; // made by the visitor this session, so they may rm it
}
export interface FDir {
  kind: "dir";
  kids: Record<string, FNode>;
  denied?: boolean;
  mine?: boolean;
}
export type FNode = FFile | FDir;

const dir = (kids: Record<string, FNode> = {}, extra: Partial<FDir> = {}): FDir => ({ kind: "dir", kids, ...extra });
const file = (body: string, extra: Partial<FFile> = {}): FFile => ({ kind: "file", body, ...extra });

const md = (lines: string[]) => lines.join("\n");

const projectDir = (i: number): FDir => {
  const p = P[i];
  return dir({
    "README.md": file(
      md([
        `# ${p.name}`,
        `${p.kind} · ${p.year} · ${p.role}`,
        "",
        p.desc,
        "",
        "## the story",
        p.story,
        "",
        "## how it was built",
        p.built,
      ]),
    ),
    "stack.txt": file(p.tags.join("\n")),
    "links.txt": file(md([`live:   ${p.live || "(not deployed)"}`, `source: ${p.repo || "(private)"}`])),
    ...(p.shot ? { "screenshot.png": { kind: "file", img: p.shot } as FFile } : {}),
    ".git": dir({
      HEAD: file("ref: refs/heads/main"),
      config: file(md(["[core]", "\trepositoryformatversion = 0", '[remote "origin"]', `\turl = ${p.repo || "git@github.com:Natnsis/private.git"}`, '[branch "main"]', "\tremote = origin"])),
    }),
  });
};

export const buildFs = (commands: string[]): FDir => {
  const projects: Record<string, FNode> = {};
  P.forEach((p, i) => (projects[p.slug] = projectDir(i)));

  const work: Record<string, FNode> = {};
  EXP.forEach((e) => (work[e.file] = file(md([`# ${e.title}`, `${e.org} · ${e.when}`, "", e.desc + (e.link ? ` ${e.link[0]}` : "")]))));

  const paperwork: Record<string, FNode> = {};
  CERTS.forEach(([, f]) => (paperwork[f + ".pdf"] = { kind: "file", url: `${SITE}/credentials/${f}.pdf` }));

  const bin: Record<string, FNode> = {};
  commands.forEach((c) => (bin[c] = file(`ELF 64-bit executable · try: ${c}`, { exec: c })));

  const home = dir({
    "README.md": file(
      md([
        "# welcome to nasi's box",
        "",
        "Make yourself at home. Everything here is real-ish:",
        "  cd projects   →  one folder per thing I've built",
        "  cat about.md  →  who I am",
        "  ./contact.sh  →  say hi",
        "",
        "Some things are hidden. Real terminal people know how to find them.",
        "(type `secrets` to see how many you've found)",
      ]),
    ),
    "about.md": file(md(["# Natnael Sisay", "full-stack developer · go + typescript · ethiopia", "", BIO, "", "## stack", ...STACK.map(([k, v]) => `${k.padEnd(10)} ${v}`)])),
    "contact.sh": file(md(["#!/usr/bin/env bash", "# run me: ./contact.sh", `echo "say hi → ${EMAIL}"`]), { exec: "contact" }),
    "resume.pdf": { kind: "file", url: `${SITE}/resume.pdf` },
    projects: dir(projects),
    work: dir(work),
    paperwork: dir(paperwork),
    ".bashrc": file(
      md([
        "# ~/.bashrc",
        "export EDITOR=nvim",
        "export GOPATH=$HOME/go",
        'export MEANING_OF_LIFE=42',
        "",
        "alias ll='ls -la'",
        "alias la='ls -a'",
        "alias ..='cd ..'",
        "alias gs='git status'",
        "alias gl='git log'",
        "alias vi='nvim'",
        "alias please='sudo'",
        "alias cls='clear'",
        "alias weather='curl wttr.in/addis'",
        "",
        "eval \"$(starship init bash)\"",
        "eval \"$(zoxide init bash)\"",
      ]),
    ),
    ".bash_history": file(
      md([
        "git push --force   # it was a friday",
        "npm install left-pad",
        "rm -rf node_modules && npm install   # the classic",
        "how do i exit vim",
        "git commit -m 'final final v2 (real)'",
        "docker system prune -a   # 40GB later",
        "go mod tidy",
        "sudo !!",
        "z portfolio",
        "nvim ~/.config/nvim/init.lua   # 'just one tweak' — 3 hours",
        "cat ~/.secrets/todo.txt",
      ]),
    ),
    ".config": dir({
      nvim: dir({
        "init.lua": file(
          md([
            "-- Nati-Vim: LazyVim, tuned. see `open nati-vim`",
            'require("config.lazy")',
            "vim.g.mapleader = ' '",
            "vim.opt.relativenumber = true",
            "vim.opt.scrolloff = 8",
            "-- the colorscheme follows the OS theme (Omarchy hot-reload)",
          ]),
        ),
      }),
      "starship.toml": file(md(['format = "$directory$line_break$character"', "", "[character]", 'success_symbol = "[❯](bold yellow)"', "", "[directory]", 'style = "bold cyan"'])),
      hypr: dir({ "hyprland.conf": file(md(["# Omarchy · Arch btw", "general {", "  gaps_in = 5", "  gaps_out = 10", "  border_size = 2", "}", "bind = SUPER, RETURN, exec, ghostty"])) }),
    }),
    ".ssh": dir({
      id_rsa: file(md(["-----BEGIN OPENSSH PRIVATE KEY-----", "bmljZSB0cnkuIHRoaXMgaXMgbm90IGEgcmVhbCBrZXkgOik=", "-----END OPENSSH PRIVATE KEY-----", "", "(decode it: echo <that line> | base64 -d)"]), { secret: "ssh" }),
      "known_hosts": file("github.com ssh-ed25519 AAAAC3Nza…"),
    }),
    ".secrets": dir({
      "flag.txt": file(md(["FLAG{y0u_r34d_th3_d0cs}", "", "You found the flag. That's exactly the kind of curiosity I like.", `Tell me you found it: ${EMAIL}`]), { secret: "flag" }),
      "todo.txt": file(md(["[x] ship the portfolio", "[x] make it a terminal", "[ ] learn rust (again)", "[ ] touch grass", "[ ] stop rewriting my nvim config", "[ ] reply to your email ← do this one first"])),
      "ideas.md": file(md(["# ideas I haven't built yet", "- a CLI that roasts your git commit messages", "- amharic keyboard for the terminal", "- coffee-driven CI: builds only run after ☕"])),
      ".env": file(md(["API_KEY=sk-nice-try-but-no", "DB_PASSWORD=hunter2", "# relax. none of these are real."]), { secret: "env" }),
    }),
  });

  return dir({
    bin: dir(bin),
    etc: dir({
      motd: file("Welcome to nasi.work · Omarchy (Arch Linux, btw) · be nice, have fun"),
      hostname: file("nasi-work"),
      "os-release": file(md(['NAME="Omarchy"', 'ID_LIKE="arch"', 'PRETTY_NAME="Omarchy (Arch Linux btw)"', 'HOME_URL="https://nasi.work"'])),
      hosts: file(md(["127.0.0.1   localhost", "127.0.1.1   nasi-work", ...SOCIALS.map(([n, u]) => `# ${n.padEnd(9)} ${u}`)])),
      shadow: file("", { denied: true }),
    }),
    home: dir({ nasi: home }),
    root: dir({}, { denied: true }),
    tmp: dir({}),
    dev: dir({ null: file(""), random: file("4 // chosen by fair dice roll. guaranteed to be random.") }),
    proc: dir({
      cpuinfo: file(md(["model name : human brain v1 (coffee-cooled)", "cores      : 2 (focus, procrastination)", "cache      : one good idea per shower", "flags      : reads_docs ships_things asks_questions"])),
      meminfo: file(md(["MemTotal:     ∞ kB (for good problems)", "MemFree:      12 kB (browser tabs)", "Cached:       every stack overflow answer, ever"])),
      uptime: file("since 2026, still compiling"),
    }),
    var: dir({
      log: dir({
        syslog: file(
          md([
            "Oct 19 06:00:01 nasi-work kernel: coffee level low, throttling",
            "Oct 19 06:05:12 nasi-work systemd[1]: Started brain.service",
            "Oct 19 09:41:03 nasi-work nvim[1337]: config changed again",
            "Oct 19 13:12:44 nasi-work go[2048]: build ok (first try, suspicious)",
            "Oct 19 23:59:59 nasi-work git[4096]: pushed to main. on a sunday. bold.",
          ]),
        ),
      }),
    }),
  });
};

/* ---------- paths ---------- */

export const tilde = (abs: string) => (abs === HOME ? "~" : abs.startsWith(HOME + "/") ? "~" + abs.slice(HOME.length) : abs || "/");

// Turns what someone typed (relative, ~, .., absolute) into an absolute path.
export const resolve = (cwd: string, arg = ""): string => {
  let raw = arg.trim();
  if (!raw || raw === "~") return HOME;
  if (raw.startsWith("~/")) raw = HOME + raw.slice(1);
  const base = raw.startsWith("/") ? [] : cwd.split("/").filter(Boolean);
  for (const part of raw.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") base.pop();
    else base.push(part);
  }
  return "/" + base.join("/");
};

export const lookup = (root: FDir, abs: string): FNode | null => {
  let node: FNode = root;
  for (const part of abs.split("/").filter(Boolean)) {
    if (node.kind !== "dir" || !(part in node.kids)) return null;
    node = node.kids[part];
  }
  return node;
};

export const parentOf = (abs: string) => {
  const parts = abs.split("/").filter(Boolean);
  const name = parts.pop() ?? "";
  return { parent: "/" + parts.join("/"), name };
};

// Every directory path in the tree, for `z` jumps and tab completion.
export const allDirs = (root: FDir, base = ""): string[] =>
  Object.entries(root.kids).flatMap(([name, n]) => (n.kind === "dir" && !n.denied ? [base + "/" + name, ...allDirs(n, base + "/" + name)] : []));

export const allFiles = (root: FDir, base = ""): string[] =>
  Object.entries(root.kids).flatMap(([name, n]) => (n.kind === "dir" ? (n.denied ? [] : allFiles(n, base + "/" + name)) : [base + "/" + name]));

// Rough size for ls -l / du, from the file's text.
export const sizeOf = (n: FNode): number =>
  n.kind === "dir" ? Object.values(n.kids).reduce((s, k) => s + sizeOf(k), 4096) : n.body ? new TextEncoder().encode(n.body).length : n.url ? 182_000 : n.img ? 96_000 : 0;
