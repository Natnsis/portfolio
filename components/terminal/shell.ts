// The shell behind the terminal: parses a command line (aliases, $VARS, !!, &&, pipes),
// runs it against the pretend file system, and returns what to print plus any side
// effects for the terminal to carry out (change folder, open a tab, animate, leave…).
import { BIO, CERTS, EMAIL, EXP, P, PHOTO, SITE, SOCIALS, STACK, type Proj } from "./data";
import { allDirs, allFiles, buildFs, type FDir, type FNode, HOME, lookup, parentOf, resolve, sizeOf, tilde } from "./fs";
import { a, b, C, d, g, L, type Line, ok, p, pad, plain, r, type Seg, T, t, type TextLine, U } from "./lines";

/* ---------- context & results ---------- */

export interface Ctx {
  cwd: string; // absolute
  prev: string; // for `cd -`
  cur: number; // project being read, for next/prev/visit/source
  hist: string[];
  fs: FDir;
  env: Record<string, string>;
  aliases: Record<string, string>;
  zdb: Record<string, number>; // how often each folder was visited, for `z`
  found: Set<string>;
  startedAt: number;
}

export interface Result {
  lines: Line[];
  cwd?: string;
  cur?: number;
  clear?: boolean;
  open?: string;
  leave?: boolean;
  flow?: "contact";
  vim?: { path: string; lines: string[] };
  frames?: Line[][];
  frameMs?: number;
  secrets?: string[];
  copy?: string;
  fail?: boolean;
  expanded?: string; // the line after !! / !n, for history
}

const out = (...lines: Line[]): Result => ({ lines });
const fail = (...lines: Line[]): Result => ({ lines, fail: true });

/* ---------- secrets ---------- */

export const SECRETS: [string, string, string][] = [
  ["hidden", "found the dotfiles", "some files start with a dot…"],
  ["flag", "captured the flag", "somewhere in a hidden folder"],
  ["ssh", "peeked at a private key", "where do keys live?"],
  ["env", "read a .env file", "secrets love .env files"],
  ["vim", "escaped vim", "open vim. then leave. good luck."],
  ["sudo", "tried sudo", "ask for more power"],
  ["rmrf", "tried rm -rf /", "the most dangerous command"],
  ["root", "knocked on /root", "some doors are locked"],
  ["coffee", "brewed coffee", "devs run on it (brew …)"],
  ["answer", "found the meaning of life", "ask the deep thought computer"],
  ["matrix", "entered the matrix", "follow the white rabbit"],
];

/* ---------- command catalog (help, man, /bin, completion) ---------- */

type Group = "portfolio" | "files" | "system" | "dev" | "fun";
export const CATALOG: [string, Group, string, string?][] = [
  ["help", "portfolio", "show every command"],
  ["about", "portfolio", "bio, neofetch style"],
  ["projects", "portfolio", "list projects  [--tag=web|mobile|bot|tool]", "projects"],
  ["open", "portfolio", "read a project or open a file", "open solaris"],
  ["next", "portfolio", "next project  (prev for previous)"],
  ["visit", "portfolio", "open the current project's live site"],
  ["source", "portfolio", "open the current project's github repo"],
  ["work", "portfolio", "work experience"],
  ["stack", "portfolio", "tools I reach for"],
  ["certs", "portfolio", "the paperwork (7 pdfs)"],
  ["resume", "portfolio", "open resume.pdf"],
  ["contact", "portfolio", "send me a message"],
  ["email", "portfolio", "copy my email"],
  ["socials", "portfolio", "github · linkedin · telegram · x"],
  ["secrets", "portfolio", "hidden achievements you've found"],
  ["exit", "portfolio", "close the terminal, go to the regular site"],
  ["ls", "files", "list a folder  [-a hidden, -l long]", "ls -la"],
  ["cd", "files", "change folder  (.. ~ - /)", "cd projects"],
  ["z", "files", "jump to a folder by part of its name", "z sol"],
  ["pwd", "files", "where am I"],
  ["tree", "files", "folder tree  [-a, -L depth]", "tree -L 2"],
  ["cat", "files", "print a file", "cat about.md"],
  ["bat", "files", "cat with wings (line numbers)", "bat about.md"],
  ["head", "files", "first lines  [-n N]"],
  ["tail", "files", "last lines  [-n N]"],
  ["less", "files", "page through a file"],
  ["wc", "files", "count lines, words, bytes"],
  ["file", "files", "what kind of file is it"],
  ["stat", "files", "file details"],
  ["du", "files", "disk usage  [-sh]"],
  ["find", "files", "find files  [-name pattern]", "find ~ -name '*.md'"],
  ["grep", "files", "search text  [-r -i]", "grep -r go ~/projects"],
  ["touch", "files", "create an empty file"],
  ["mkdir", "files", "create a folder"],
  ["rm", "files", "remove what you created  [-r]"],
  ["echo", "files", "print text  (> file to write)", "echo hi > note.txt"],
  ["history", "system", "commands you ran  (!! and !n work too)"],
  ["clear", "system", "clear the screen  (ctrl+l)"],
  ["alias", "system", "list or add aliases"],
  ["env", "system", "environment variables  (export K=V)"],
  ["which", "system", "where a command lives"],
  ["man", "system", "manual page for a command", "man ls"],
  ["neofetch", "system", "system info, the classic way"],
  ["htop", "system", "process viewer"],
  ["ps", "system", "running processes"],
  ["kill", "system", "stop a process", "kill -9 1337"],
  ["uname", "system", "kernel info  [-a]"],
  ["uptime", "system", "how long this box has been up"],
  ["date", "system", "today"],
  ["cal", "system", "this month"],
  ["free", "system", "memory  [-h]"],
  ["df", "system", "disk space  [-h]"],
  ["whoami", "system", "current user"],
  ["id", "system", "user and groups"],
  ["hostname", "system", "this machine's name"],
  ["git", "dev", "status · log · blame · push…", "git log"],
  ["docker", "dev", "ps · run · compose up"],
  ["npm", "dev", "install · run dev  (pnpm/bun too)", "npm install"],
  ["go", "dev", "version · build · test", "go test ./..."],
  ["make", "dev", "build the thing"],
  ["curl", "dev", "fetch a url", "curl wttr.in"],
  ["ping", "dev", "is it up?", "ping nasi.work"],
  ["ssh", "dev", "connect somewhere", "ssh git@github.com"],
  ["vim", "dev", "edit a file (good luck leaving)", "vim about.md"],
  ["tmux", "dev", "terminal multiplexer"],
  ["base64", "dev", "encode, or decode with -d"],
  ["sudo", "dev", "power, denied"],
  ["pacman", "dev", "package manager (arch btw)", "pacman -Syu"],
  ["cowsay", "fun", "a cow says your thing", "cowsay moo"],
  ["fortune", "fun", "dev wisdom  (try: fortune | cowsay)"],
  ["sl", "fun", "you meant ls. here's a train."],
  ["cmatrix", "fun", "follow the white rabbit"],
  ["figlet", "fun", "BIG text", "figlet hi"],
  ["yes", "fun", "y y y y y"],
  ["joke", "fun", "a programmer joke"],
  ["weather", "fun", "weather in addis"],
  ["brew", "fun", "brew something", "brew coffee"],
  ["hack", "fun", "hackerman mode"],
];
const COMMANDS = CATALOG.map(([n]) => n);
const EXTRA = ["vi", "nvim", "nano", "emacs", "code", "cls", "ll", "la", "fastfetch", "top", "pnpm", "bun", "yarn", "yay", "apt", "lolcat", "printenv", "export", "type", "cd..", "42", "matrix", "btw", "xkcd", "reboot", "shutdown", "logout", "quit", "prev", "please", "zi"];
export const ALL_COMMANDS = [...COMMANDS, ...EXTRA];

export const newCtx = (): Ctx => ({
  cwd: HOME,
  prev: HOME,
  cur: -1,
  hist: [],
  fs: buildFs(COMMANDS),
  env: {
    USER: "nasi",
    HOME,
    SHELL: "/usr/bin/fish",
    EDITOR: "nvim",
    TERM: "xterm-ghostty",
    LANG: "en_US.UTF-8",
    PATH: "/usr/local/bin:/usr/bin:/bin:" + HOME + "/go/bin",
    MEANING_OF_LIFE: "42",
    COFFEE_LEVEL: "low",
  },
  aliases: {
    ll: "ls -la",
    la: "ls -a",
    l: "ls",
    "..": "cd ..",
    "cd..": "cd ..",
    gs: "git status",
    gl: "git log",
    vi: "vim",
    nvim: "vim",
    please: "sudo",
    cls: "clear",
    weather: "curl wttr.in/addis",
    top: "htop",
    fastfetch: "neofetch",
    printenv: "env",
    quit: "exit",
    logout: "exit",
    matrix: "cmatrix",
    pnpm: "npm",
    bun: "npm",
    yarn: "npm",
    yay: "pacman",
  },
  zdb: {},
  found: new Set(),
  startedAt: Date.now(),
});

/* ---------- portfolio pages ---------- */

export const whoamiBig = (): Line[] => [
  { kind: "text", size: "38px", lh: "1.1", weight: 700, ls: "-0.02em", segs: [{ text: "NATNAEL SISAY", color: C.bright }] },
  T(d("full-stack developer · go + typescript · based in ethiopia")),
  T('"I read the docs and ship things that work."'),
  T(d("status: "), ok("● open to new work and good problems")),
];

export const ask = (): Line[] => [
  T(d("nasi.work · terminal v2")),
  T(""),
  T("Hi! This portfolio is built to look like a terminal."),
  T("Are you technical, and fine browsing it this way?"),
  T(""),
  T("  ", L("yes", "y"), d("   keep the terminal")),
  T("  ", L("no", "n"), d("    take me to the regular site")),
  T(""),
  T(d("type y or n, then press enter")),
];

export const welcome = (): Line[] => [
  T(d(`nasi.work · terminal v2 · last login: ${new Date().toDateString().toLowerCase()} on ttys001`)),
  T(""),
  ...whoamiBig(),
  T(""),
  T(d("this is a real(ish) shell. "), L("ls", "ls"), d(", "), L("cd projects", "cd projects"), d(", "), L("cat README.md", "cat README.md"), d(", pipes, tab-complete…")),
  T(d("new here? "), L("help", "help"), d(" lists every command. some things are hidden: "), L("secrets", "secrets")),
  T(d("vim motions: press "), g("esc"), d(" then j/k + enter. rather not? "), L("exit", "exit"), d(" for the regular site.")),
];

const help = (): Line[] => {
  const lines: Line[] = [T(b("COMMANDS"), d("   click any to run · tab completes · ↑↓ history"))];
  const groups: [Group, string][] = [
    ["portfolio", "portfolio"],
    ["files", "files & folders"],
    ["system", "system"],
    ["dev", "dev tools"],
    ["fun", "just for fun"],
  ];
  for (const [grp, title] of groups) {
    lines.push(T(""), T(t(title)));
    CATALOG.filter((c) => c[1] === grp).forEach(([n, , desc, run]) => lines.push(T("  ", L(n, run ?? n), pad(n, 12), d(desc))));
  }
  lines.push(
    T(""),
    T(t("shell")),
    T("  ", d("pipes      "), L("fortune | cowsay", "fortune | cowsay"), d("  ·  "), L("cat about.md | grep go", "cat about.md | grep go"), d("  ·  grep head tail wc sort uniq rev lolcat base64")),
    T("  ", d("chaining   "), L("cd projects && ls", "cd projects && ls")),
    T("  ", d("history    "), d("!! repeats the last command, !3 runs number 3")),
    T("  ", d("vim keys   "), d("esc, then j/k move · enter open · gg/G · / find · i type")),
  );
  return lines;
};

const lsWork = (list: Proj[], title: string): Line[] => {
  const lines: Line[] = [T(d(title))];
  list.forEach((pr) => {
    const i = P.indexOf(pr);
    lines.push(T(d("drwx  "), d(String(i + 1).padStart(2, "0") + "  "), L(pr.slug + "/", "open " + pr.slug), pad(pr.slug + "/", 22), pr.tag.padEnd(8), d(pr.stack)));
  });
  lines.push(
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
  return lines;
};

const project = (i: number): Line[] => {
  const pr = P[i];
  const prev = P[(i + P.length - 1) % P.length];
  const next = P[(i + 1) % P.length];
  return [
    { kind: "text", size: "26px", lh: "1.2", weight: 700, segs: [{ text: "# " + pr.name, color: C.bright }] },
    T(d(`${pr.kind} · ${pr.year} · ${pr.role} · ${pr.tag}`)),
    { kind: "box", label: pr.slug + " / screenshot.png", h: "150px", src: pr.shot },
    T(g("## what")),
    T(pr.desc),
    T(""),
    T(g("## stack")),
    T(pr.stack),
    T(""),
    T(g("## links")),
    T(L("visit ↗", "visit " + pr.slug), d("   live site     ·   "), L("source ↗", "source " + pr.slug), d("   github repo")),
    T(""),
    T(d("more: "), L("cat README.md", "cat README.md"), d(" (the full story) · "), L("ls -a", "ls -a")),
    T(L("← " + prev.slug, "prev"), d("   ·   "), L("all projects", "projects"), d("   ·   "), L(next.slug + " →", "next")),
  ];
};

const experience = (): Line[] => {
  const lines: Line[] = [T(d("~/work · experience"))];
  EXP.forEach((e) => {
    lines.push(T(""), { kind: "text", size: "17px", lh: "1.4", weight: 700, segs: [{ text: e.title, color: C.bright }, { text: "  · " + e.org, color: C.dim, weight: 400 }] }, T(d(e.when)));
    const segs: (string | Seg)[] = [e.desc];
    if (e.link) segs.push(" ", L(e.link[0], e.link[1]));
    if (e.url) segs.push("  ", U(e.url[0], e.url[1]));
    lines.push(T(...segs));
  });
  lines.push(T(""), T(d("see also: "), L("projects", "projects"), d(" · "), L("resume", "resume"), d(" · "), L("certs", "certs")));
  return lines;
};

const about = (): Line[] => [
  {
    kind: "row",
    label: "photo",
    src: PHOTO,
    sub: [
      T(g("nasi"), d("@"), g("work")),
      T(d("────────────────")),
      T(g("role    "), "full-stack developer"),
      T(g("os      "), "ethiopia"),
      T(g("shell   "), "go · typescript"),
      T(g("mobile  "), "flutter · react native"),
      T(g("editor  "), L("nati-vim", "open nati-vim")),
      T(g("status  "), ok("open to work")),
    ],
  },
  T(BIO),
  T(""),
  T(d("more: "), L("stack", "stack"), d(" · "), L("certs", "certs"), d(" · "), L("resume", "resume"), d(" · "), L("contact", "contact")),
];

/* ---------- small helpers ---------- */

const rand = <X,>(xs: X[]) => xs[Math.floor(Math.random() * xs.length)];
const flags = (args: string[]) => {
  const f = new Set<string>();
  const rest: string[] = [];
  for (const x of args) {
    if (/^-[a-zA-Z]+$/.test(x)) [...x.slice(1)].forEach((c) => f.add(c));
    else if (x.startsWith("--")) f.add(x);
    else rest.push(x);
  }
  return { f, rest };
};
const human = (n: number) => (n < 1024 ? `${n}B` : n < 1024 ** 2 ? `${(n / 1024).toFixed(1)}K` : `${(n / 1024 ** 2).toFixed(1)}M`);
const projectAt = (abs: string) => {
  const m = abs.match(new RegExp(`^${HOME}/projects/([^/]+)`));
  return m ? P.findIndex((x) => x.slug === m[1]) : -1;
};
const findProject = (q: string) => {
  const n = parseInt(q, 10);
  if (!isNaN(n) && n >= 1 && n <= P.length) return n - 1;
  const k = q.replace(/\/$/, "").replace(/^(~\/)?(projects|work)\//, "").toLowerCase();
  return P.findIndex((x) => x.slug === k || x.slug.startsWith(k));
};

// Colour and click target for an entry in ls/tree.
const entry = (name: string, n: FNode, abs: string): Seg => {
  if (n.kind === "dir") return { text: name + "/", color: name.startsWith(".") ? C.purple : C.accent, weight: 700, cmd: `cd ${tilde(abs)} && ls` };
  if (n.exec && !abs.startsWith("/bin")) return { text: name + "*", color: C.live, cmd: tilde(abs) };
  if (n.url) return { text: name, color: C.amber, cmd: `open ${tilde(abs)}` };
  if (n.img) return { text: name, color: C.purple, cmd: `open ${tilde(abs)}` };
  return { text: name, color: name.startsWith(".") ? C.dim : C.fg, cmd: `cat ${tilde(abs)}` };
};

const sortedKids = (dir: FDir, all: boolean) =>
  Object.entries(dir.kids)
    .filter(([n]) => all || !n.startsWith("."))
    .sort(([x], [y]) => x.replace(/^\./, "").localeCompare(y.replace(/^\./, "")));

const COW = (text: string): Line[] => {
  const words = text.split(/\s+/);
  const rows: string[] = [];
  let row = "";
  for (const w of words) {
    if ((row + " " + w).trim().length > 38) {
      rows.push(row);
      row = w;
    } else row = (row + " " + w).trim();
  }
  if (row) rows.push(row);
  const w = Math.max(...rows.map((x) => x.length), 1);
  const lines = [" " + "_".repeat(w + 2)];
  rows.forEach((x, i) => {
    const [l, rr] = rows.length === 1 ? ["<", ">"] : i === 0 ? ["/", "\\"] : i === rows.length - 1 ? ["\\", "/"] : ["|", "|"];
    lines.push(`${l} ${x.padEnd(w)} ${rr}`);
  });
  lines.push(" " + "-".repeat(w + 2), "        \\   ^__^", "         \\  (oo)\\_______", "            (__)\\       )\\/\\", "                ||----w |", "                ||     ||");
  return lines.map((x) => T(x));
};

const FORTUNES = [
  "There are only two hard things in computer science: cache invalidation, naming things, and off-by-one errors.",
  "It works on my machine. — every developer, ever",
  "Weeks of coding can save you hours of planning.",
  "Read the docs. Then read them again. Then ship.",
  "The best code is no code at all.",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Programs must be written for people to read, and only incidentally for machines to execute. — Abelson & Sussman",
  "Debugging is twice as hard as writing the code in the first place.",
  "git commit -m 'fix' — a story in 4 words.",
  "Simplicity is prerequisite for reliability. — Dijkstra",
];
const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "A SQL query walks into a bar, walks up to two tables and asks: 'can I join you?'",
  "I would tell you a UDP joke, but you might not get it.",
  "There are 10 kinds of people: those who understand binary and those who don't.",
  "!false — it's funny because it's true.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "Why did the Go developer break up? Too many unhandled errors in the relationship. if err != nil { leave() }",
];

/* ---------- animations ---------- */

const trainFrames = (): Line[][] => {
  const art = [
    "      ====        ________                ___________ ",
    "  _D _|  |_______/        \\__I_I_____===__|_________| ",
    "   |(_)---  |   H\\________/ |   |        =|___ ___|   ",
    "   /     |  |   H  |  |     |   |         ||_| |_||   ",
    "  |      |  |   H  |__--------------------| [___] |   ",
    "  | ________|___H__/__|_____/[][]~\\_______|       |   ",
    "  |/ |   |-----------I_____I [][] []  D   |=======|__ ",
    "__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__ ",
    " |/-=|___|=    ||    ||    ||    |_____/~\\___/        ",
    "  \\_/      \\O=====O=====O=====O_/      \\_/            ",
  ];
  const frames: Line[][] = [];
  for (let off = 60; off >= -60; off -= 6) frames.push(art.map((l) => T(off >= 0 ? " ".repeat(off) + l : l.slice(-off))));
  frames.push([T(d("(you typed sl. you meant ls. the train has left.)"))]);
  return frames;
};

const matrixFrames = (): Line[][] => {
  const glyphs = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ0123456789$#@";
  const frame = () =>
    Array.from({ length: 12 }, () => T({ text: Array.from({ length: 64 }, () => (Math.random() < 0.55 ? " " : rand([...glyphs]))).join(""), color: C.live }));
  const frames = Array.from({ length: 14 }, frame);
  frames.push([T(ok("wake up, neo…")), T(d("the matrix has you. (and so does this portfolio)"))]);
  return frames;
};

const progress = (label: string, steps: string[], done: Line[]): Line[][] => {
  const frames: Line[][] = [];
  const n = 24;
  for (let i = 0; i <= n; i += 3) {
    const pct = Math.round((i / n) * 100);
    frames.push([T(d(steps[Math.min(steps.length - 1, Math.floor((i / n) * steps.length))])), T(g(label + " "), "[" + "█".repeat(i) + "░".repeat(n - i) + "] ", d(pct + "%"))]);
  }
  frames.push(done);
  return frames;
};

const htopFrames = (ctx: Ctx): Line[][] => {
  const bar = (v: number) => "|".repeat(Math.round(v / 4)).padEnd(25);
  const procs: [number, string, string][] = [
    [1337, "nvim", "~/.config/nvim/init.lua"],
    [2048, "go", "build ./..."],
    [3000, "node", "next dev --turbopack"],
    [4096, "chrome", "--tabs=47"],
    [4242, "coffee", "--strength=max"],
    [5432, "postgres", "-D /var/lib/postgres"],
    [8080, "spotify", "lofi beats to code to"],
  ];
  const frames = Array.from({ length: 6 }, (_, k) => {
    const cpu = [30 + Math.random() * 60, 20 + Math.random() * 70, 50 + Math.random() * 50, 10 + Math.random() * 40];
    return [
      ...cpu.map((v, i) => T(g(`  ${i} `), "[", { text: bar(v), color: v > 80 ? C.red : v > 50 ? C.amber : C.live }, `${v.toFixed(1).padStart(5)}%]`)),
      T(g("  Mem"), "[", ok("||||||||||||"), a("||||"), "         ", "3.1G/16G]   ", d(`uptime ${uptimeStr(ctx)} · load 0.42 0.37 0.29`)),
      T(""),
      T({ text: "    PID USER      CPU%  MEM%  COMMAND".padEnd(70), color: C.ink, bg: C.live, weight: 700 }),
      ...procs.map(([pid, cmd, arg], i) =>
        T(String(pid).padStart(7), "  nasi   ", ((i === k % procs.length ? 70 : 3) + Math.random() * 20).toFixed(1).padStart(5), "  ", (Math.random() * 9).toFixed(1).padStart(4), "  ", ok(cmd), " ", d(arg)),
      ),
    ];
    });
  // Leave the last view on screen, like quitting htop leaves your scrollback.
  return [...frames, [...frames[frames.length - 1], T(""), T(d("htop: pretend you pressed q. (it closed itself, you're welcome)"))]];
};

const uptimeStr = (ctx: Ctx) => {
  const s = Math.floor((Date.now() - ctx.startedAt) / 1000);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
};

const pingFrames = (host: string): Line[][] => {
  const frames: Line[][] = [];
  const lines: Line[] = [T(`PING ${host} (104.21.42.42) 56(84) bytes of data.`)];
  const times: number[] = [];
  for (let i = 1; i <= 5; i++) {
    const ms = 12 + Math.random() * 20;
    times.push(ms);
    lines.push(T(`64 bytes from ${host}: icmp_seq=${i} ttl=57 time=`, ok(ms.toFixed(1) + " ms")));
    frames.push([...lines]);
  }
  const avg = times.reduce((x, y) => x + y) / times.length;
  frames.push([...lines, T(""), T(d(`--- ${host} ping statistics ---`)), T(`5 packets transmitted, 5 received, 0% packet loss · avg ${avg.toFixed(1)} ms`)]);
  return frames;
};

/* ---------- the commands ---------- */

type Cmd = (args: string[], ctx: Ctx, raw: string) => Result;

const ls: Cmd = (args, ctx) => {
  const { f, rest } = flags(args);
  const all = f.has("a") || f.has("A");
  const long = f.has("l");
  const targets = rest.length ? rest : ["."];
  const lines: Line[] = [];
  const secrets: string[] = [];
  for (const tg of targets) {
    const abs = resolve(ctx.cwd, tg);
    const n = lookup(ctx.fs, abs);
    if (!n) return fail(T(`ls: cannot access '${tg}': No such file or directory`));
    if (n.denied) return { ...fail(T(r(`ls: cannot open directory '${tg}': Permission denied`))), secrets: ["root"] };
    if (targets.length > 1) lines.push(T(t(tilde(abs) + ":")));
    if (n.kind === "file") {
      lines.push(T(entry(parentOf(abs).name, n, abs)));
      continue;
    }
    const kids = sortedKids(n, all);
    if (all && abs === HOME) secrets.push("hidden");
    if (long) {
      lines.push(T(d(`total ${kids.length}`)));
      const rows: [string, FNode][] = all ? [[".", n], ["..", lookup(ctx.fs, resolve(abs, "..")) ?? n], ...kids] : kids;
      rows.forEach(([name, k]) => {
        const perm = k.kind === "dir" ? "drwxr-xr-x" : k.exec ? "-rwxr-xr-x" : k.denied ? "----------" : "-rw-r--r--";
        const seg = name === "." || name === ".." ? { text: name, color: C.accent, weight: 700 } : entry(name, k, abs + "/" + name);
        lines.push(T(d(perm + "  "), d(k.denied ? "root " : "nasi "), d(human(sizeOf(k)).padStart(6) + "  "), d("oct 19 13:37  "), seg));
      });
    } else {
      if (!kids.length && !all) lines.push(T(d("(empty)")));
      const segs: Seg[] = [];
      if (all) segs.push({ text: ".", color: C.accent, weight: 700 }, { text: "  " }, { text: "..", color: C.accent, weight: 700 }, { text: "  " });
      kids.forEach(([name, k]) => segs.push(entry(name, k, abs === "/" ? "/" + name : abs + "/" + name), { text: "  " }));
      if (segs.length) lines.push(T(...segs));
    }
  }
  return { lines, secrets };
};

const cd: Cmd = (args, ctx) => {
  const arg = args[0];
  if (arg === "-") return { lines: [T(d(tilde(ctx.prev)))], cwd: ctx.prev };
  const abs = resolve(ctx.cwd, arg);
  const n = lookup(ctx.fs, abs);
  if (!n) {
    // `cd solaris` from anywhere still finds the project.
    const i = arg ? findProject(arg) : -1;
    if (i >= 0) return { lines: [], cwd: `${HOME}/projects/${P[i].slug}`, cur: i };
    return fail(T(`cd: no such file or directory: ${arg}`), T(d("try "), L("ls", "ls"), d(" or "), L(`z ${arg}`, `z ${arg}`)));
  }
  if (n.kind !== "dir") return fail(T(`cd: not a directory: ${arg}`));
  if (n.denied) return { ...fail(T(r(`cd: permission denied: ${arg}`)), T(d("only root lives there. and root is asleep."))), secrets: ["root"] };
  const i = projectAt(abs);
  const lines = i >= 0 && abs.split("/").length === 5 ? [T(d(`${P[i].name} · `), L("cat README.md", "cat README.md"), d(" · "), L("ls -a", "ls -a"), d(" · "), L("open " + P[i].slug, "open " + P[i].slug))] : [];
  return { lines, cwd: abs, cur: i >= 0 ? i : undefined };
};

const z: Cmd = (args, ctx) => {
  const q = args.join(" ").toLowerCase();
  const dirs = allDirs(ctx.fs).filter((x) => !x.startsWith("/bin"));
  if (!q) {
    const rows = Object.entries(ctx.zdb).sort((x, y) => y[1] - x[1]);
    if (!rows.length) return out(T(d("z: no history yet. cd around first, then z <part of a name> jumps there.")));
    return out(...rows.map(([dir, n]) => T(d(String(n).padStart(5) + "  "), L(tilde(dir), `cd ${tilde(dir)}`))));
  }
  const hits = dirs.filter((x) => x.toLowerCase().includes(q));
  if (!hits.length) return fail(T(`z: no match found for '${q}'`));
  // Most visited first, then the shortest (closest) path.
  hits.sort((x, y) => (ctx.zdb[y] ?? 0) - (ctx.zdb[x] ?? 0) || x.length - y.length);
  return cd([hits[0]], ctx, "");
};

const tree: Cmd = (args, ctx) => {
  const { f, rest } = flags(args.filter((x, i) => args[i - 1] !== "-L"));
  const li = args.indexOf("-L");
  const depth = li >= 0 ? parseInt(args[li + 1], 10) || 2 : 3;
  const all = f.has("a");
  const root = resolve(ctx.cwd, rest[0]);
  const n = lookup(ctx.fs, root);
  if (!n || n.kind !== "dir") return fail(T(`tree: ${rest[0] ?? "."}: not a directory`));
  const lines: Line[] = [T({ text: tilde(root), color: C.accent, weight: 700 })];
  let dirs = 0;
  let files = 0;
  const walk = (dir: FDir, abs: string, prefix: string, lvl: number) => {
    const kids = sortedKids(dir, all);
    kids.forEach(([name, k], i) => {
      const last = i === kids.length - 1;
      lines.push(T(d(prefix + (last ? "└── " : "├── ")), entry(name, k, abs + "/" + name)));
      if (k.kind === "dir") {
        dirs++;
        if (lvl < depth && !k.denied) walk(k, abs + "/" + name, prefix + (last ? "    " : "│   "), lvl + 1);
      } else files++;
    });
  };
  walk(n, root, "", 1);
  lines.push(T(""), T(d(`${dirs} directories, ${files} files`)));
  return { lines, secrets: all && root === HOME ? ["hidden"] : [] };
};

// Reads a file for cat/bat/less/head/tail, or explains why it can't.
const readFile = (cmd: string, arg: string | undefined, ctx: Ctx): { text?: string[]; res?: Result; secret?: string } => {
  if (!arg) return { res: fail(T(`${cmd}: missing file operand`), T(d("try "), L(`${cmd} README.md`, `${cmd} README.md`))) };
  const abs = resolve(ctx.cwd, arg);
  const n = lookup(ctx.fs, abs);
  if (!n) {
    const i = findProject(arg);
    if (i >= 0) return { res: { lines: project(i), cur: i, cwd: `${HOME}/projects/${P[i].slug}` } };
    return { res: fail(T(`${cmd}: ${arg}: No such file or directory`)) };
  }
  if (n.denied) return { res: { ...fail(T(r(`${cmd}: ${arg}: Permission denied`))), secrets: ["root"] } };
  if (n.kind === "dir") return { res: fail(T(`${cmd}: ${arg}: Is a directory`), T(d("try "), L(`ls ${arg}`, `ls ${arg}`))) };
  if (n.url) return { res: { lines: [T(d("opening "), U(parentOf(abs).name, n.url), d(" in a new tab…"))], open: n.url } };
  if (n.img) return { res: out({ kind: "box", label: parentOf(abs).name, h: "150px", src: n.img }) };
  return { text: (n.body ?? "").split("\n"), secret: n.secret };
};

const cat: Cmd = (args, ctx) => {
  const { f, rest } = flags(args);
  if (!rest.length) return readFile("cat", undefined, ctx).res!;
  const lines: Line[] = [];
  const secrets: string[] = [];
  for (const x of rest) {
    const rf = readFile("cat", x, ctx);
    if (rf.res) return rf.res;
    if (rf.secret) secrets.push(rf.secret);
    rf.text!.forEach((l, i) => lines.push(f.has("n") ? T(d(String(i + 1).padStart(4) + "  "), l) : mdLine(l)));
  }
  return { lines, secrets };
};

// A touch of markdown colour in cat output.
const mdLine = (l: string): TextLine =>
  /^#{1,3} /.test(l) ? T({ text: l, color: C.accent, weight: 700 }) : /^(-|\[.\]) /.test(l) ? T(d(l.slice(0, 2)), l.slice(2)) : /^(alias|export|eval) /.test(l) ? T(p(l.split(" ")[0]), " " + l.split(" ").slice(1).join(" ")) : /^\s*(#|--)/.test(l) ? T(d(l)) : T(l);

const bat: Cmd = (args, ctx) => {
  const x = args.find((y) => !y.startsWith("-"));
  const rf = readFile("bat", x, ctx);
  if (rf.res) return rf.res;
  const w = 7;
  const bar = "─".repeat(w);
  return {
    lines: [
      T(d(bar + "┬" + "─".repeat(50))),
      T(d(" ".repeat(w) + "│ "), "File: ", b(x!)),
      T(d(bar + "┼" + "─".repeat(50))),
      ...rf.text!.map((l, i) => {
        const m = mdLine(l);
        return T(d(String(i + 1).padStart(w - 2) + "  │ "), ...m.segs);
      }),
      T(d(bar + "┴" + "─".repeat(50))),
    ],
    secrets: rf.secret ? [rf.secret] : [],
  };
};

const headTail =
  (which: "head" | "tail"): Cmd =>
  (args, ctx) => {
    const ni = args.indexOf("-n");
    const n = ni >= 0 ? parseInt(args[ni + 1], 10) || 10 : parseInt((args.find((x) => /^-\d+$/.test(x)) ?? "-10").slice(1), 10);
    const x = args.filter((y, i) => !y.startsWith("-") && args[i - 1] !== "-n")[0];
    const rf = readFile(which, x, ctx);
    if (rf.res) return rf.res;
    const text = which === "head" ? rf.text!.slice(0, n) : rf.text!.slice(-n);
    return { lines: text.map(mdLine), secrets: rf.secret ? [rf.secret] : [] };
  };

const wc: Cmd = (args, ctx) => {
  const x = args.find((y) => !y.startsWith("-"));
  const rf = readFile("wc", x, ctx);
  if (rf.res) return rf.res;
  const body = rf.text!.join("\n");
  return out(T(`${String(rf.text!.length).padStart(4)} ${String(body.split(/\s+/).filter(Boolean).length).padStart(5)} ${String(new TextEncoder().encode(body).length).padStart(6)} ${x}`));
};

const fileCmd: Cmd = (args, ctx) => {
  if (!args[0]) return fail(T("Usage: file <path>"));
  const abs = resolve(ctx.cwd, args[0]);
  const n = lookup(ctx.fs, abs);
  if (!n) return fail(T(`${args[0]}: cannot open (No such file or directory)`));
  const kind =
    n.kind === "dir"
      ? "directory"
      : n.url
        ? "PDF document, version 1.7"
        : n.img
          ? "PNG image data, 1920 x 1080, 8-bit/color RGBA"
          : n.exec && !abs.startsWith("/bin")
            ? "Bourne-Again shell script, ASCII text executable"
            : abs.startsWith("/bin")
              ? "ELF 64-bit LSB pie executable, x86-64, dynamically linked, not stripped"
              : abs.endsWith(".md")
                ? "Markdown document, UTF-8 Unicode text"
                : "ASCII text";
  return out(T(t(args[0]) , ": " + kind));
};

const stat: Cmd = (args, ctx) => {
  if (!args[0]) return fail(T("stat: missing operand"));
  const abs = resolve(ctx.cwd, args[0]);
  const n = lookup(ctx.fs, abs);
  if (!n) return fail(T(`stat: cannot statx '${args[0]}': No such file or directory`));
  return out(
    T(d("  File: "), tilde(abs)),
    T(d("  Size: "), String(sizeOf(n)), d("        Blocks: 8      "), n.kind === "dir" ? "directory" : "regular file"),
    T(d("Access: "), n.kind === "dir" ? "(0755/drwxr-xr-x)" : "(0644/-rw-r--r--)", d("  Uid: ( 1000/ nasi)   Gid: ( 1000/ nasi)")),
    T(d("Modify: "), "2026-10-19 13:37:00.000000000 +0300"),
    T(d(" Birth: "), "the day I decided to ship"),
  );
};

const du: Cmd = (args, ctx) => {
  const x = args.find((y) => !y.startsWith("-"));
  const abs = resolve(ctx.cwd, x);
  const n = lookup(ctx.fs, abs);
  if (!n) return fail(T(`du: cannot access '${x}': No such file or directory`));
  if (args.some((y) => y.includes("s")) || n.kind === "file") return out(T(human(sizeOf(n)).padEnd(8), tilde(abs)));
  return out(...sortedKids(n as FDir, true).map(([name, k]) => T(human(sizeOf(k)).padEnd(8), entry(name, k, abs + "/" + name))), T(b(human(sizeOf(n)).padEnd(8)), tilde(abs)));
};

const find: Cmd = (args, ctx) => {
  const ni = args.indexOf("-name");
  const pat = ni >= 0 ? (args[ni + 1] ?? "").replace(/^['"]|['"]$/g, "") : "";
  const start = resolve(ctx.cwd, args[0] && !args[0].startsWith("-") ? args[0] : ".");
  const node = lookup(ctx.fs, start);
  if (!node || node.kind !== "dir") return fail(T(`find: '${args[0]}': No such file or directory`));
  const rx = new RegExp("^" + pat.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".") + "$", "i");
  const base = start === "/" ? "" : start;
  const hits = [...allDirs(node, base), ...allFiles(node, base)].filter((x) => !pat || rx.test(parentOf(x).name)).sort();
  if (!hits.length) return out(T(d("(nothing found)")));
  return out(...hits.slice(0, 200).map((x) => T(entry(tilde(x), lookup(ctx.fs, x)!, x))));
};

const grep: Cmd = (args, ctx) => {
  const { f, rest } = flags(args);
  const [pat, where] = rest;
  if (!pat) return fail(T("usage: grep [-ri] pattern [path]"));
  if (!where && !f.has("r")) return fail(T(d("grep: needs something to read. try "), L(`grep -r ${pat} ~`, `grep -r ${pat} ~`), d(" or pipe into it: "), L(`cat about.md | grep ${pat}`, `cat about.md | grep ${pat}`)));
  const start = resolve(ctx.cwd, where ?? ".");
  const node = lookup(ctx.fs, start);
  if (!node) return fail(T(`grep: ${where}: No such file or directory`));
  // Like ripgrep: skip hidden files and folders unless you're already searching inside one.
  const hiddenStart = /\/\./.test(start);
  const files = node.kind === "dir" ? allFiles(node, start === "/" ? "" : start).filter((x) => hiddenStart || !/\/\./.test(x.slice(start.length))) : [start];
  const rx = new RegExp(pat.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*"), f.has("i") ? "i" : "");
  const lines: Line[] = [];
  for (const fp of files) {
    const fn = lookup(ctx.fs, fp);
    if (!fn || fn.kind !== "file" || !fn.body || fn.denied) continue;
    fn.body.split("\n").forEach((l) => {
      if (rx.test(l)) lines.push(T({ text: tilde(fp), color: C.purple, cmd: `cat ${tilde(fp)}` }, d(":"), ...highlight(l, rx)));
    });
  }
  return lines.length ? { lines: lines.slice(0, 120) } : fail(T(d("(no matches)")));
};

const highlight = (l: string, rx: RegExp): Seg[] => {
  const m = l.match(rx);
  if (!m || m.index === undefined) return [{ text: l }];
  return [{ text: l.slice(0, m.index) }, { text: m[0], color: C.red, weight: 700 }, { text: l.slice(m.index + m[0].length) }];
};

// Visitors may create things under ~ and /tmp, and remove only what they made.
const writable = (abs: string) => abs.startsWith(HOME + "/") || abs.startsWith("/tmp/");
const touch: Cmd = (args, ctx) => {
  if (!args.length) return fail(T("touch: missing file operand"));
  for (const x of args) {
    const abs = resolve(ctx.cwd, x);
    if (lookup(ctx.fs, abs)) continue;
    const { parent, name } = parentOf(abs);
    const dir = lookup(ctx.fs, parent);
    if (!dir || dir.kind !== "dir") return fail(T(`touch: cannot touch '${x}': No such file or directory`));
    if (!writable(abs)) return fail(T(r(`touch: cannot touch '${x}': Permission denied`)));
    dir.kids[name] = { kind: "file", body: "", mine: true };
  }
  return out();
};
const mkdir: Cmd = (args, ctx) => {
  const { f, rest } = flags(args);
  if (!rest.length) return fail(T("mkdir: missing operand"));
  for (const x of rest) {
    const abs = resolve(ctx.cwd, x);
    if (!writable(abs + "/")) return fail(T(r(`mkdir: cannot create directory '${x}': Permission denied`)));
    let node: FDir = ctx.fs;
    const parts = abs.split("/").filter(Boolean);
    for (let i = 0; i < parts.length; i++) {
      const k = node.kids[parts[i]];
      if (k && k.kind === "dir") {
        node = k;
        continue;
      }
      if (k) return fail(T(`mkdir: cannot create directory '${x}': File exists`));
      if (i < parts.length - 1 && !f.has("p")) return fail(T(`mkdir: cannot create directory '${x}': No such file or directory`));
      node = node.kids[parts[i]] = { kind: "dir", kids: {}, mine: true };
    }
  }
  return out();
};
const rm: Cmd = (args, ctx) => {
  const { f, rest } = flags(args);
  if (rest.some((x) => x === "/" || x === "/*" || x === "~" || x === "~/" || x === "*") && f.has("r")) {
    return {
      lines: [],
      secrets: ["rmrf"],
      frames: [
        ...["/bin", "/etc", "/home/nasi/projects", "/home/nasi/.config", "/home/nasi/.secrets", "/var/log"].map((x, i, arr) => arr.slice(0, i + 1).map((y) => T(r("removed "), `'${y}'`))),
        [T(r("rm: it's all gone.")), T("")],
        [T(r("rm: it's all gone.")), T(""), T(ok("…just kidding. this portfolio is read-only. but I admire the confidence.")), T(d("(never run that on a real machine)"))],
      ],
      frameMs: 260,
    };
  }
  if (!rest.length) return fail(T("rm: missing operand"));
  for (const x of rest) {
    const abs = resolve(ctx.cwd, x);
    const n = lookup(ctx.fs, abs);
    if (!n) return fail(T(`rm: cannot remove '${x}': No such file or directory`));
    if (n.kind === "dir" && !f.has("r")) return fail(T(`rm: cannot remove '${x}': Is a directory`));
    if (!n.mine) return fail(T(r(`rm: refusing to remove '${x}': `), "I spent weeks on that. make your own with ", L("touch", "touch notes.txt"), "."));
    const { parent, name } = parentOf(abs);
    delete (lookup(ctx.fs, parent) as FDir).kids[name];
  }
  return out();
};

const echo: Cmd = (_args, ctx, raw) => {
  const body = raw.replace(/^\s*echo\s?/, "");
  const m = body.match(/^(.*?)\s*(>>?)\s*(\S+)\s*$/);
  const strip = (s: string) => s.replace(/^(["'])(.*)\1$/, "$2");
  if (!m) return out(T(strip(body)));
  const [, text, op, target] = m;
  const abs = resolve(ctx.cwd, target);
  const existing = lookup(ctx.fs, abs);
  if (existing && (existing.kind === "dir" || !existing.mine)) return fail(T(r(`echo: ${target}: Permission denied`)), T(d("(you can write to files you created)")));
  const { parent, name } = parentOf(abs);
  const dir = lookup(ctx.fs, parent);
  if (!dir || dir.kind !== "dir" || !writable(abs)) return fail(T(r(`echo: ${target}: Permission denied`)));
  const prev = existing && existing.kind === "file" && op === ">>" ? (existing.body ?? "") + "\n" : "";
  dir.kids[name] = { kind: "file", body: prev + strip(text), mine: true };
  return out();
};

const man: Cmd = (args) => {
  const c = args[0];
  if (!c) return fail(T("What manual page do you want?"), T(d("For example, try "), L("man ls", "man ls"), d(".")));
  if (c === "man") return out(T(b("MAN(1)")), T(""), T(g("NAME")), T("       man - an interface to the system reference manuals"), T(""), T(d("       you're reading the manual for the manual. very meta.")));
  const e = CATALOG.find((x) => x[0] === c);
  if (!e) return fail(T(`No manual entry for ${c}`));
  return out(
    T(b(`${c.toUpperCase()}(1)`), d("                    nasi.work manual                    "), b(`${c.toUpperCase()}(1)`)),
    T(""),
    T(g("NAME")),
    T(`       ${c} - ${e[2]}`),
    T(""),
    T(g("SYNOPSIS")),
    T("       ", L(e[3] ?? c, e[3] ?? c)),
    T(""),
    T(g("SEE ALSO")),
    T("       ", L("help", "help"), d(", "), L("tldr", "help")),
  );
};

const neofetch: Cmd = (_a, ctx) => {
  const logo = [
    "                   -`",
    "                  .o+`",
    "                 `ooo/",
    "                `+oooo:",
    "               `+oooooo:",
    "               -+oooooo+:",
    "             `/:-:++oooo+:",
    "            `/++++/+++++++:",
    "           `/++++++++++++++:",
    "          `/+++ooooooooooooo/`",
    "         ./ooosssso++osssssso+`",
    "        .oossssso-````/ossssss+`",
    "       -osssssso.      :ssssssso.",
    "      :osssssss/        osssso+++.",
  ];
  const info: (string | Seg)[][] = [
    [g("nasi"), "@", g("nasi-work")],
    [d("-------------------")],
    [g("OS"), ": Omarchy (Arch Linux btw) x86_64"],
    [g("Host"), ": nasi.work"],
    [g("Kernel"), ": 6.12.0-omarchy"],
    [g("Uptime"), ": " + uptimeStr(ctx)],
    [g("Packages"), `: ${P.length} projects, ${CERTS.length} certs`],
    [g("Shell"), ": fish 4.0 (+ starship)"],
    [g("WM"), ": Hyprland"],
    [g("Terminal"), ": ghostty"],
    [g("Editor"), ": nvim (nati-vim)"],
    [g("CPU"), ": brain v1 (2) @ coffee GHz"],
    [g("Memory"), ": 3.1GiB / ∞ (for good problems)"],
    [],
    [{ text: "███", color: C.red }, { text: "███", color: C.amber }, { text: "███", color: C.live }, { text: "███", color: C.teal }, { text: "███", color: C.accent }, { text: "███", color: C.purple }],
  ];
  return out(...logo.map((l, i) => T({ text: l.padEnd(36), color: C.accent }, ...(info[i] ?? []).map((x) => (typeof x === "string" ? { text: x } : x)))));
};

const ps: Cmd = () =>
  out(
    T(b("USER       PID %CPU %MEM COMMAND")),
    ...(
      [
        ["root", 1, 0.0, 0.1, "/sbin/init (systemd, probably)"],
        ["nasi", 1337, 12.4, 3.2, "nvim ~/.config/nvim/init.lua"],
        ["nasi", 2048, 31.0, 2.1, "go build ./..."],
        ["nasi", 3000, 18.7, 6.4, "node next dev --turbopack"],
        ["nasi", 4096, 44.2, 38.9, "chrome --tabs=47"],
        ["nasi", 4242, 99.9, 0.1, "coffee --strength=max"],
        ["nasi", 6666, 0.0, 0.0, "imposter-syndrome --quiet"],
      ] as [string, number, number, number, string][]
    ).map(([u, pid, c, m, cmd]) => T(u.padEnd(8), String(pid).padStart(6), c.toFixed(1).padStart(5), m.toFixed(1).padStart(5), " ", ok(cmd))),
  );

const kill: Cmd = (args) => {
  const pid = args.find((x) => /^\d+$/.test(x));
  const msgs: Record<string, string> = {
    "1": "kill: (1) - Operation not permitted. that's systemd. we don't do that here.",
    "1337": "nvim refused to die. it never closes. it only gets new plugins.",
    "2048": "go build: killed. the gopher is disappointed.",
    "4096": "chrome closed 47 tabs. 46 of them were stack overflow.",
    "4242": "kill: you can't kill coffee. coffee kills you (slowly).",
    "6666": "imposter-syndrome restarted itself. it always does. ship anyway.",
  };
  if (!pid) return fail(T("kill: usage: kill [-9] pid · see ", L("ps", "ps")));
  return out(T(msgs[pid] ?? `kill: (${pid}) - No such process`));
};

const git: Cmd = (args, ctx) => {
  const sub = args[0];
  const i = projectAt(ctx.cwd);
  const inRepo = i >= 0 || ctx.cwd === HOME;
  if (!inRepo && sub !== "clone" && sub !== "gud" && sub !== "--version") return fail(T(r("fatal: not a git repository (or any of the parent directories): .git")), T(d("try "), L("cd ~/projects/solaris", "cd ~/projects/solaris")));
  const repo = i >= 0 ? P[i] : null;
  switch (sub) {
    case "status":
      return out(
        T("On branch ", ok("main")),
        T("Your branch is up to date with 'origin/main'."),
        T(""),
        ...(repo ? [T("Changes not staged for commit:"), T(r("        modified:   README.md")), T(d("        (it's never really finished)"))] : [T("nothing to commit, working tree clean"), T(d("(suspiciously clean)"))]),
      );
    case "log": {
      const commits = repo
        ? [`feat: ${repo.name} goes live`, "fix: the thing that broke when I fixed the other thing", "style: move a div 2px to the left", "chore: bump deps (pray)", "feat: initial commit, big dreams"]
        : ["feat: make the portfolio a terminal", "fix: vim mode now actually lets you leave", "feat: add secrets (go find them)", "chore: rewrite nvim config (again)", "docs: read the docs, then wrote some"];
      const oneline = args.includes("--oneline");
      return out(
        ...commits.flatMap((m, k) => {
          const hash = (0x9f3a2b1 + k * 0x1f2e3d).toString(16).slice(0, 7);
          return oneline ? [T(a(hash), " ", m)] : [T(a("commit " + hash + "c0ffee")), T(d("Author: Natnael Sisay <" + EMAIL + ">")), T(d(`Date:   ${k + 1} day${k ? "s" : ""} ago`)), T(""), T("    " + m), T("")];
        }),
      );
    }
    case "blame":
      return out(T(a("^c0ffee "), d("(Natnael Sisay 2026-10-19) "), "every single line"), T(d("yes, all of it. including the bugs.")));
    case "push":
      return fail(T(r("! [rejected]        main -> main (permission denied)")), T("visitors can't push to main. but you can open an issue: ", U("github.com/Natnsis", "https://github.com/Natnsis")));
    case "pull":
      return out(T("Already up to date."));
    case "commit":
      return out(T("On branch main"), T("nothing to commit, you're a visitor ;)"));
    case "diff":
      return out(T(b("diff --git a/README.md b/README.md")), T(r("-it works")), T(ok("+it works (on my machine)")));
    case "clone":
      return {
        lines: [],
        frames: progress("Receiving objects", [`Cloning into '${(args[1] ?? "repo").split("/").pop()?.replace(".git", "")}'...`, "remote: Enumerating objects: 1337, done.", "remote: Counting objects: 100% (1337/1337)"], [T(ok("done. "), d("(it's a pretend clone, but the real ones are on "), U("github", "https://github.com/Natnsis"), d(")"))]),
        frameMs: 90,
      };
    case "gud":
      return out(T("you are already gud."));
    case "--version":
      return out(T("git version 2.47.0"));
    default:
      return out(T("usage: git <command>   ·   try ", L("git status", "git status"), d(" · "), L("git log --oneline", "git log --oneline"), d(" · "), L("git blame", "git blame"), d(" · "), L("git push", "git push")));
  }
};

const docker: Cmd = (args) => {
  const sub = args.join(" ");
  if (sub.startsWith("ps"))
    return out(
      T(b("CONTAINER ID   IMAGE              STATUS                  PORTS                NAMES")),
      T("c0ffee42beef   nasi/portfolio     ", ok("Up 3 weeks"), "              0.0.0.0:443->443     portfolio"),
      T("d00dfeed1337   postgres:17        ", ok("Up 3 weeks"), "              5432/tcp             db"),
      T("baddcafe0007   redis:7            ", ok("Up 3 weeks"), "              6379/tcp             cache"),
      T("deadbeef0000   coffee-machine     ", r("Exited (137) 2h ago"), "     -                    out-of-beans"),
    );
  if (sub.startsWith("run") || sub.startsWith("compose up") || sub.startsWith("pull"))
    return {
      lines: [],
      frames: progress("Pulling", ["Unable to find image locally", "latest: Pulling from nasi/portfolio", "Digest: sha256:c0ffee…"], [T(ok("✔ Container portfolio  Started")), T(d("(you're looking at it)"))]),
      frameMs: 90,
    };
  return out(T("Usage:  docker [OPTIONS] COMMAND   ·   try ", L("docker ps", "docker ps"), d(" · "), L("docker compose up", "docker compose up")));
};

const npm: Cmd = (args) => {
  const sub = args[0];
  if (sub === "install" || sub === "i" || sub === "add" || !sub)
    return {
      lines: [],
      frames: progress(
        "installing",
        ["resolving dependencies…", "fetching left-pad (critical infrastructure)…", "downloading half the internet…", "linking node_modules (now heavier than the sun)…"],
        [T(ok("added 1,337 packages"), ", and audited 1,338 packages in 4s"), T(""), T(a("7 vulnerabilities"), d(" (1 moderate, 6 high)")), T(d("run `npm audit fix` to pretend you'll fix them"))],
      ),
      frameMs: 110,
    };
  if (sub === "run" && (args[1] === "dev" || args[1] === "start") || sub === "dev")
    return out(T(b("▲ Next.js 16.2"), d(" (turbopack)")), T("- Local:        ", U(SITE, SITE)), T(ok("✓ Ready in 412ms")), T(d("(you're already on it)")));
  if (sub === "run" && args[1] === "build") return out(T(ok("✓ Compiled successfully")), T(d("Route (app)   ○ /   ○ /ui   ○ /ui/projects")));
  if (sub === "test") return out(T(ok("PASS"), " src/portfolio.test.ts"), T("  ✓ hires the developer (1ms)"), T(d("Tests: 1 passed, 1 total")));
  if (sub === "-v" || sub === "--version") return out(T("10.9.0"));
  return out(T("try ", L("npm install", "npm install"), d(" · "), L("npm run dev", "npm run dev"), d(" · "), L("npm test", "npm test")));
};

const go: Cmd = (args) => {
  const sub = args[0];
  if (sub === "version") return out(T("go version go1.26.0 linux/amd64"));
  if (sub === "build" || sub === "run")
    return { lines: [], frames: progress("compiling", ["go: downloading modules…", "go: building…"], [T(ok("build ok"), d(" (first try. suspicious.)"))]), frameMs: 70 };
  if (sub === "test")
    return out(T(ok("ok  "), "  github.com/natnsis/portfolio/ships     0.042s"), T(ok("ok  "), "  github.com/natnsis/portfolio/reads-docs 0.013s"), T(ok("PASS")));
  if (sub === "fmt") return out(T(d("(everything was already gofmt'd. obviously.)")));
  return out(T("Go is a tool for managing Go source code.  try ", L("go version", "go version"), d(" · "), L("go test ./...", "go test ./..."), d(" · "), L("go build", "go build")));
};

const curl: Cmd = (args) => {
  const url = args.find((x) => !x.startsWith("-")) ?? "";
  if (/wttr\.in/.test(url))
    return out(
      T("Weather report: Addis Ababa, Ethiopia"),
      T(""),
      T(a("    \\   /    "), "Sunny"),
      T(a("     .-.     "), "22 °C"),
      T(a("  ― (   ) ―  "), "↗ 9 km/h"),
      T(a("     `-'     "), "10 km"),
      T(a("    /   \\    "), "0.0 mm"),
      T(""),
      T(d("perfect coding weather. (it's always perfect coding weather.)")),
    );
  if (/nasi\.work/.test(url)) {
    if (args.includes("-I")) return out(T("HTTP/2 200"), T("server: cloudflare"), T("content-type: text/html; charset=utf-8"), T("x-powered-by: coffee"), T("x-developer: open-to-work"));
    return out(T(d("<!doctype html>")), T(d('<html lang="en">')), T(d("  <title>Natnael Sisay — Full-Stack Developer</title>")), T(d("  <!-- hi, fellow view-source enjoyer. try `secrets` -->")), T(d("…")));
  }
  if (!url) return fail(T("curl: try 'curl --help' or ", L("curl wttr.in", "curl wttr.in")));
  return fail(T(`curl: (6) Could not resolve host: ${url.replace(/^https?:\/\//, "")}`), T(d("(this box is offline. try "), L("curl nasi.work", "curl nasi.work"), d(")")));
};

const ssh: Cmd = (args) => {
  const host = args.find((x) => !x.startsWith("-")) ?? "";
  if (!host) return fail(T("usage: ssh destination"));
  if (/github\.com/.test(host)) return out(T("Hi visitor! You've successfully authenticated, but GitHub does not provide shell access."));
  if (/nasi/.test(host)) return out(T("you're already here. this is the box."));
  return fail(T(r(`${host}: Permission denied (publickey).`)));
};

const sudo: Cmd = (args, ctx, raw) => {
  const rest = args.join(" ");
  if (rest === "make me a sandwich") return { lines: [T("okay.")], secrets: ["sudo"] };
  if (/^rm\s+-[a-z]*r/.test(rest)) return { ...rm(args.slice(1), ctx, raw), secrets: ["rmrf", "sudo"] };
  return {
    lines: [T(d("[sudo] password for visitor: "), "********"), T(r("visitor is not in the sudoers file. This incident will be reported.")), T(d("(reported to my inbox. "), L("contact", "contact"), d(" me instead?)"))],
    secrets: ["sudo"],
    fail: true,
  };
};

const pacman: Cmd = (args) => {
  if (args.some((x) => /^-S.*u/.test(x)))
    return {
      lines: [],
      frames: progress("upgrading", [":: Synchronizing package databases...", ":: Starting full system upgrade...", ":: Proceed with installation? [Y/n] Y"], [T(ok(" there is nothing to do")), T(d("(it's arch. it was updated 5 minutes ago. btw.)"))]),
      frameMs: 90,
    };
  return out(T("error: no operation specified (use -h for help)  ·  try ", L("pacman -Syu", "pacman -Syu")));
};

const figlet: Cmd = (args) => ({
  lines: [{ kind: "text", size: "44px", lh: "1.05", weight: 800, ls: "0.06em", segs: [{ text: (args.join(" ") || "nasi").toUpperCase(), color: C.accent }] }],
});

const secrets: Cmd = (_a, ctx) => {
  const n = SECRETS.filter(([id]) => ctx.found.has(id)).length;
  return out(
    T(b(`secrets found: ${n}/${SECRETS.length}`), n === SECRETS.length ? ok("   ★ all of them. you're hired. (well, I'd like to be.)") : d("   keep exploring")),
    T(""),
    ...SECRETS.map(([id, title, hint]) => (ctx.found.has(id) ? T(ok("  ✓ "), title) : T(d("  · ??? "), d(`(${hint})`)))),
  );
};

const date: Cmd = () => out(T(new Date().toString()));
const cal: Cmd = () => {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const title = now.toLocaleString("en-US", { month: "long", year: "numeric" });
  const lines: Line[] = [T(" ".repeat(Math.max(0, Math.floor((20 - title.length) / 2))) + title), T(d("Su Mo Tu We Th Fr Sa"))];
  let row: Seg[] = [{ text: "   ".repeat(first) }];
  for (let day = 1; day <= days; day++) {
    const s = String(day).padStart(2) + " ";
    row.push(day === now.getDate() ? { text: s, color: C.accent, weight: 700 } : { text: s });
    if ((first + day) % 7 === 0) {
      lines.push(T(...row));
      row = [];
    }
  }
  if (row.length) lines.push(T(...row));
  return { lines };
};

const hack: Cmd = () => ({
  lines: [],
  frames: [
    [T(ok("[*] initializing hackerman protocol…"))],
    [T(ok("[*] initializing hackerman protocol…")), T(ok("[*] bypassing mainframe firewall (it was a div)…"))],
    [T(ok("[*] initializing hackerman protocol…")), T(ok("[*] bypassing mainframe firewall (it was a div)…")), T(ok("[*] downloading more RAM… 100%"))],
    [
      T(ok("[*] initializing hackerman protocol…")),
      T(ok("[*] bypassing mainframe firewall (it was a div)…")),
      T(ok("[*] downloading more RAM… 100%")),
      T(""),
      T({ text: "ACCESS GRANTED", color: C.live, weight: 700 }),
      T(d("you now have full access to… a portfolio. "), L("open something", "projects")),
    ],
  ],
  frameMs: 450,
});

const COMMAND_TABLE: Record<string, Cmd> = {
  help: () => out(...help()),
  "?": () => out(...help()),
  about: () => out(...about()),
  whoami: () => out(T("nasi"), T(d("(the long version: "), L("about", "about"), d(")"))),
  projects: (args) => {
    const m = args.join(" ").match(/--tag=(\w+)/);
    const list = m ? P.filter((x) => x.tag === m[1]) : P;
    return { lines: lsWork(list, m ? `~/projects --tag=${m[1]}` : "~/projects"), cwd: `${HOME}/projects`, cur: -1 };
  },
  open: (args, ctx) => {
    const arg = args[0];
    if (!arg) return fail(T("open: what should I open? try ", L("open solaris", "open solaris")));
    if (/^about(\.md)?$/.test(arg)) return out(...about());
    const abs = resolve(ctx.cwd, arg);
    const n = lookup(ctx.fs, abs);
    if (n && n.kind === "file") return readFile("open", arg, ctx).res ?? cat([arg], ctx, "");
    const i = findProject(arg);
    if (i < 0) return fail(T(`open: ${arg}: no such project or file`), T(d("try "), L("projects", "projects")));
    return { lines: project(i), cur: i, cwd: `${HOME}/projects/${P[i].slug}` };
  },
  next: (_a, ctx) => {
    const i = ctx.cur < 0 ? 0 : (ctx.cur + 1) % P.length;
    return { lines: project(i), cur: i, cwd: `${HOME}/projects/${P[i].slug}` };
  },
  prev: (_a, ctx) => {
    const i = ctx.cur < 0 ? P.length - 1 : (ctx.cur + P.length - 1) % P.length;
    return { lines: project(i), cur: i, cwd: `${HOME}/projects/${P[i].slug}` };
  },
  visit: (args, ctx) => linkOut("visit", args, ctx),
  source: (args, ctx) => linkOut("source", args, ctx),
  work: () => ({ lines: experience(), cwd: `${HOME}/work`, cur: -1 }),
  experience: () => ({ lines: experience(), cwd: `${HOME}/work`, cur: -1 }),
  stack: () => out(T(d("~/tools")), ...STACK.map(([k, v]) => T(g(k), pad(k, 12), v))),
  tools: () => out(T(d("~/tools")), ...STACK.map(([k, v]) => T(g(k), pad(k, 12), v))),
  certs: () => out(T(d("ls ~/paperwork  (click to open pdf)")), ...CERTS.map(([n, f]) => T(d("-r--  "), U(n, `${SITE}/credentials/${f}.pdf`), d(" ↗")))),
  resume: () => ({ lines: [T(d("opening "), U("resume.pdf", `${SITE}/resume.pdf`), d(" in a new tab…"))], open: `${SITE}/resume.pdf` }),
  email: () => ({ lines: [T(ok("✔ "), "copied ", b(EMAIL), d(" to clipboard"))], copy: EMAIL }),
  socials: () => out(...SOCIALS.map(([n, u]) => T(g(n.padEnd(10)), U(u.replace("https://", ""), u)))),
  contact: () => ({ lines: [T("Got a project in mind, a hard problem, or just want to say hi? I read every message."), T(d("3 quick questions · esc to cancel"))], flow: "contact" }),
  secrets,
  achievements: secrets,
  exit: () => ({ lines: [T(d("logout"))], leave: true }),
  gui: () => ({ lines: [T(d("logout"))], leave: true }),
  ":q": () => ({ lines: [T(d("we're not in vim. but okay, bye."))], leave: true }),

  ls,
  dir: ls,
  cd,
  z,
  zi: z,
  pwd: (_a, ctx) => out(T(ctx.cwd)),
  tree,
  cat,
  bat,
  less: cat,
  more: cat,
  head: headTail("head"),
  tail: headTail("tail"),
  wc,
  file: fileCmd,
  stat,
  du,
  find,
  grep,
  rg: grep,
  touch,
  mkdir,
  rm,
  rmdir: (args, ctx, raw) => rm(["-r", ...args], ctx, raw),
  echo,

  clear: () => ({ lines: [], clear: true }),
  history: (_a, ctx) => out(...(ctx.hist.length ? ctx.hist.map((x, i) => T(d(String(i + 1).padStart(4) + "  "), L(x, x))) : [T(d("no history yet"))])),
  alias: (args, ctx) => {
    const def = args.join(" ").match(/^([\w.-]+)=['"]?(.*?)['"]?$/);
    if (def) {
      ctx.aliases[def[1]] = def[2];
      return out(T(d(`alias ${def[1]}='${def[2]}' added for this session`)));
    }
    return out(...Object.entries(ctx.aliases).map(([k, v]) => T(p("alias "), k, d("="), t(`'${v}'`))));
  },
  unalias: (args, ctx) => {
    args.forEach((x) => delete ctx.aliases[x]);
    return out();
  },
  env: (_a, ctx) => out(...Object.entries(ctx.env).map(([k, v]) => T(g(k), d("="), v))),
  export: (args, ctx) => {
    const m = args.join(" ").match(/^(\w+)=(.*)$/);
    if (!m) return out(...Object.entries(ctx.env).map(([k, v]) => T(d("declare -x "), g(k), d("="), `"${v}"`)));
    ctx.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    return out();
  },
  unset: (args, ctx) => {
    args.forEach((x) => delete ctx.env[x]);
    return out();
  },
  which: (args, ctx) =>
    out(
      ...args.map((x) =>
        ctx.aliases[x] ? T(`${x}: aliased to ${ctx.aliases[x]}`) : COMMAND_TABLE[x] ? T(`/usr/bin/${x}`) : T(r(`${x} not found`)),
      ),
    ),
  type: (args, ctx) => out(...args.map((x) => (ctx.aliases[x] ? T(`${x} is aliased to \`${ctx.aliases[x]}'`) : COMMAND_TABLE[x] ? T(`${x} is /usr/bin/${x}`) : T(r(`type: ${x}: not found`))))),
  man,
  tldr: man,
  neofetch,
  htop: (_a, ctx) => ({ lines: [], frames: htopFrames(ctx), frameMs: 550 }),
  btop: (_a, ctx) => ({ lines: [], frames: htopFrames(ctx), frameMs: 550 }),
  ps,
  kill,
  pkill: kill,
  uname: (args) => out(T(args.includes("-a") ? "Linux nasi-work 6.12.0-omarchy #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux" : "Linux")),
  uptime: (_a, ctx) => out(T(` ${new Date().toTimeString().slice(0, 8)} up ${uptimeStr(ctx)},  1 user,  load average: 0.42, 0.37, 0.29 (mostly coffee)`)),
  date,
  cal,
  free: () =>
    out(
      T(b("               total        used        free      shared  buff/cache   available")),
      T("Mem:            16Gi       3.1Gi       1.2Gi       420Mi        11Gi        12Gi"),
      T("Swap:          8.0Gi          0B       8.0Gi"),
      T(d("(11Gi of cache is just chrome tabs)")),
    ),
  df: () =>
    out(
      T(b("Filesystem      Size  Used Avail Use% Mounted on")),
      T("/dev/nvme0n1p2  1.0T  420G  580G  42% /"),
      T("/dev/nvme0n1p1  1.0G  128M  896M  13% /boot"),
      T("node_modules    ∞     ∞     0     100% /home/nasi/projects"),
    ),
  id: () => out(T("uid=1000(nasi) gid=1000(nasi) groups=1000(nasi),998(wheel),969(docker),42(coffee)")),
  hostname: () => out(T("nasi-work")),

  git,
  docker,
  npm,
  go,
  make: (_a, ctx) =>
    projectAt(ctx.cwd) >= 0
      ? { lines: [], frames: progress("make", ["cc -O2 -o ship main.c", "linking…"], [T(ok("make: 'ship' is up to date."))]), frameMs: 80 }
      : fail(T("make: *** No targets specified and no makefile found.  Stop.")),
  curl,
  wget: curl,
  ping: (args) => ({ lines: [], frames: pingFrames(args.find((x) => !x.startsWith("-")) ?? "nasi.work"), frameMs: 420 }),
  ssh,
  vim: (args, ctx) => {
    const x = args.find((y) => !y.startsWith("-"));
    if (x) {
      const abs = resolve(ctx.cwd, x);
      const n = lookup(ctx.fs, abs);
      if (!n) {
        const i = findProject(x);
        if (i >= 0) return { lines: project(i), cur: i, cwd: `${HOME}/projects/${P[i].slug}` };
      }
      if (n && n.kind === "dir") return { lines: [], vim: { path: tilde(abs) + "/", lines: Object.keys(n.kids).map((k) => k + (n.kids[k].kind === "dir" ? "/" : "")) } };
      if (n && n.kind === "file" && n.body !== undefined) return { lines: [], vim: { path: tilde(abs), lines: n.body.split("\n") }, secrets: n.secret ? [n.secret] : [] };
      return { lines: [], vim: { path: x, lines: [] } };
    }
    return { lines: [], vim: { path: "[No Name]", lines: [] } };
  },
  nano: (args, ctx, raw) => ({ ...COMMAND_TABLE.vim(args, ctx, raw), lines: [T(d("nano? in this house we use nvim. opening that instead…"))] }),
  emacs: () => fail(T("emacs: command not found"), T(d("(this is a vim household)"))),
  code: () => out(T(d("opening VS Code… just kidding. "), L("vim", "vim"), d(" is right there."))),
  tmux: () => out(T("sessions should be nested with care, unset $TMUX to force")),
  base64: (args) => {
    const dec = args.includes("-d") || args.includes("--decode");
    const s = args.filter((x) => !x.startsWith("-")).join(" ");
    if (!s) return fail(T("base64: pipe something in: ", L("echo hi | base64", "echo hi | base64")));
    try {
      return out(T(dec ? atob(s) : btoa(s)));
    } catch {
      return fail(T("base64: invalid input"));
    }
  },
  sudo,
  su: () => fail(T(r("su: Authentication failure")), T(d("nice try."))),
  pacman,
  apt: () => out(T("apt: this is arch. btw. try ", L("pacman -Syu", "pacman -Syu"))),
  "apt-get": () => out(T("apt-get: this is arch. btw.")),
  brew: (args) =>
    /coffee|cofee|espresso/.test(args.join(" "))
      ? {
          lines: [],
          frames: [
            [T(d("==> Brewing coffee…"))],
            [T(d("==> Brewing coffee…")), T(a("      ( (")), T(a("       ) )"))],
            [T(d("==> Brewing coffee…")), T(a("      ( (")), T(a("       ) )")), T(a("    ........")), T(a("    |      |]")), T(a("    \\      /")), T(a("     `----'")), T(ok("☕ coffee ready. productivity +42%"))],
          ],
          frameMs: 500,
          secrets: ["coffee"],
        }
      : out(T("brew: this is arch, not macOS. but I'll brew ", L("coffee", "brew coffee"), " for you.")),
  coffee: (_a, ctx, raw) => COMMAND_TABLE.brew(["coffee"], ctx, raw),

  cowsay: (args) => out(...COW(args.join(" ") || "moo. try: fortune | cowsay")),
  fortune: () => out(T(rand(FORTUNES))),
  joke: () => out(T(rand(JOKES))),
  sl: () => ({ lines: [], frames: trainFrames(), frameMs: 70 }),
  cmatrix: () => ({ lines: [], frames: matrixFrames(), frameMs: 110, secrets: ["matrix"] }),
  figlet,
  banner: figlet,
  toilet: figlet,
  yes: (args) => out(...Array.from({ length: 24 }, () => T(args.join(" ") || "y")), T(d("^C"))),
  "42": () => ({ lines: [T("The Answer to the Ultimate Question of Life, the Universe, and Everything."), T(d("(the question is still being computed)"))], secrets: ["answer"] }),
  "deep-thought": () => ({ lines: [T("42.")], secrets: ["answer"] }),
  btw: () => out(T("I use Arch btw.")),
  xkcd: () => out(T("relevant: ", U("xkcd.com/378 — Real Programmers", "https://xkcd.com/378/"))),
  hack,
  hackerman: hack,
  reboot: () => fail(T(r("reboot: Operation not permitted")), T(d("(have you tried turning it off and on again? me neither.)"))),
  shutdown: () => fail(T(r("shutdown: Operation not permitted")), T(d("this box never sleeps."))),
  lolcat: () => out(T("pipe something into me: ", L("fortune | lolcat", "fortune | lolcat"))),
  rev: (args) => out(T([...args.join(" ")].reverse().join(""))),
};

const linkOut = (which: "visit" | "source", args: string[], ctx: Ctx): Result => {
  const i = args[0] ? findProject(args[0]) : ctx.cur >= 0 ? ctx.cur : projectAt(ctx.cwd);
  if (i < 0) return fail(T(`${which}: open a project first`), T(d("try "), L("projects", "projects")));
  const pr = P[i];
  const url = which === "visit" ? pr.live : pr.repo;
  if (!url) return fail(T(d(`${which === "visit" ? "live url" : "github repo"} for `), b(pr.slug), d(" not set yet")));
  return { lines: [T(d("opening "), U(url.replace("https://", ""), url), d(" …"))], open: url };
};

/* ---------- pipes ---------- */

const RAINBOW = [C.red, C.amber, C.live, C.teal, C.accent, C.purple];
const FILTERS: Record<string, (lines: Line[], args: string[]) => Line[] | string> = {
  grep: (lines, args) => {
    const { f, rest } = flags(args);
    if (!rest[0]) return "usage: grep pattern";
    const rx = new RegExp(rest[0].replace(/[.+^${}()|[\]\\]/g, "\\$&"), f.has("i") ? "i" : "");
    return lines.filter((l) => rx.test(plain(l)) !== f.has("v")).map((l) => (f.has("v") ? l : T(...highlight(plain(l), rx))));
  },
  head: (lines, args) => lines.slice(0, parseInt(args[args.indexOf("-n") + 1] ?? "", 10) || 10),
  tail: (lines, args) => lines.slice(-(parseInt(args[args.indexOf("-n") + 1] ?? "", 10) || 10)),
  wc: (lines, args) => {
    const text = lines.map(plain);
    if (args.includes("-l")) return [T(String(text.length))];
    return [T(`${String(text.length).padStart(4)} ${String(text.join(" ").split(/\s+/).filter(Boolean).length).padStart(5)} ${String(text.join("\n").length).padStart(6)}`)];
  },
  sort: (lines, args) => {
    const s = [...lines].sort((x, y) => plain(x).localeCompare(plain(y)));
    return args.includes("-r") ? s.reverse() : s;
  },
  uniq: (lines) => lines.filter((l, i) => i === 0 || plain(l) !== plain(lines[i - 1])),
  rev: (lines) => lines.map((l) => T([...plain(l)].reverse().join(""))),
  lolcat: (lines) => lines.map((l, i) => T(...[...plain(l)].map((ch, k) => ({ text: ch, color: RAINBOW[(i + Math.floor(k / 3)) % RAINBOW.length] })))),
  cowsay: (lines) => COW(lines.map(plain).join(" ")),
  base64: (lines, args) => {
    const s = lines.map(plain).join("\n").trim();
    try {
      return [T(args.includes("-d") ? atob(s) : btoa(s))];
    } catch {
      return "base64: invalid input";
    }
  },
  cat: (lines) => lines,
  less: (lines) => lines,
  tee: (lines) => lines,
  "tr": (lines, args) => (args[0] === "a-z" && args[1] === "A-Z" ? lines.map((l) => T(plain(l).toUpperCase())) : lines),
};

/* ---------- parsing & running ---------- */

const split = (s: string) => (s.match(/"[^"]*"|'[^']*'|\S+/g) ?? []).map((x) => x.replace(/^(["'])(.*)\1$/, "$2"));

const runOne = (raw: string, ctx: Ctx, depth = 0): Result => {
  let line = raw.trim();
  if (!line) return out();
  // $VARS (single-quoted text stays literal, close enough)
  line = line.replace(/\$\{?(\w+)\}?/g, (_m, k: string) => ctx.env[k] ?? "");
  const [c0, ...args] = split(line);
  // Aliases (one level deep is plenty, guard against loops).
  if (ctx.aliases[c0] && depth < 3) return runOne(ctx.aliases[c0] + (args.length ? " " + line.slice(line.indexOf(c0) + c0.length).trim() : ""), ctx, depth + 1);
  // ./script runs it; a bare path to a folder cd's into it, like fish.
  if (c0.startsWith("./") || c0.startsWith("~/") || c0.startsWith("/")) {
    const abs = resolve(ctx.cwd, c0);
    const n = lookup(ctx.fs, abs);
    if (n?.kind === "file" && n.exec) return runOne(n.exec, ctx, depth + 1);
    if (n?.kind === "dir") return cd([c0], ctx, line);
    if (n) return fail(T(r(`fish: ${c0}: Permission denied`)), T(d("(not executable. try "), L(`cat ${c0}`, `cat ${c0}`), d(")")));
    return fail(T(`fish: Unknown command: ${c0}`));
  }
  const lc = c0.toLowerCase();
  if (lc === "rm" && args.some((x) => /^-\w*r/.test(x)) && args.some((x) => x === "/" || x === "/*" || x === "~")) return rm(args, ctx, line);
  const fn = COMMAND_TABLE[lc];
  if (fn) return fn(args, ctx, line);
  // A project name on its own opens it.
  const i = findProject(c0);
  if (i >= 0 && c0.length > 2) return { lines: project(i), cur: i, cwd: `${HOME}/projects/${P[i].slug}` };
  const guess = ALL_COMMANDS.find((x) => x.startsWith(lc.slice(0, 2))) ?? "help";
  return fail(T(`fish: Unknown command: `, r(c0)), T(d("did you mean "), L(guess, guess), d("?  ·  "), L("help", "help")));
};

// Pipes: run the first command, then feed its text through each filter.
const runPipeline = (seg: string, ctx: Ctx): Result => {
  const parts = seg.split(/\s\|\s|\|(?!\|)/).map((x) => x.trim());
  const first = runOne(parts[0], ctx);
  if (parts.length === 1) return first;
  let lines = first.lines;
  for (const part of parts.slice(1)) {
    const [f0, ...fargs] = split(part);
    const filter = FILTERS[f0];
    if (!filter) return fail(T(`fish: Unknown command in pipe: ${f0}`), T(d("pipes support: " + Object.keys(FILTERS).join(" "))));
    const res = filter(lines, fargs);
    if (typeof res === "string") return fail(T(res));
    lines = res;
  }
  return { ...first, lines };
};

// The whole line: !! / !n history, then `a && b` chains (stop at the first failure).
export const exec = (raw: string, ctx: Ctx): Result => {
  // History as it was before this line (the terminal records the line before running it).
  const before = ctx.hist[ctx.hist.length - 1] === raw.trim() ? ctx.hist.slice(0, -1) : ctx.hist;
  const line = raw
    .trim()
    .replace(/!!/g, before[before.length - 1] ?? "")
    .replace(/(^|\s)!(\d+)/g, (_m, sp: string, n: string) => sp + (before[parseInt(n, 10) - 1] ?? ""));
  const chain = line.split(/\s*&&\s*/);
  const total: Result = { lines: [], expanded: line };
  for (const part of chain) {
    const res = runPipeline(part, ctx);
    const { lines, ...effects } = res;
    total.lines.push(...lines);
    Object.assign(total, { ...effects, secrets: [...(total.secrets ?? []), ...(res.secrets ?? [])] });
    if (res.cwd) {
      ctx.prev = ctx.cwd;
      ctx.cwd = res.cwd;
      ctx.zdb[res.cwd] = (ctx.zdb[res.cwd] ?? 0) + 1;
    }
    if (res.cur !== undefined) ctx.cur = res.cur;
    if (res.fail) break;
  }
  return total;
};

/* ---------- tab completion ---------- */

export const complete = (input: string, ctx: Ctx): { value?: string; options?: string[] } => {
  const m = input.match(/^(.*?)(\S*)$/);
  if (!m) return {};
  const [, before, word] = m;
  // First word: commands, aliases and ./scripts.
  if (!before.trim()) {
    const pool = [...new Set([...ALL_COMMANDS, ...Object.keys(ctx.aliases), ...P.map((x) => x.slug)])];
    const hits = pool.filter((x) => x.startsWith(word)).sort();
    if (hits.length === 1) return { value: hits[0] + " " };
    return hits.length ? { value: commonPrefix(hits) !== word ? commonPrefix(hits) : undefined, options: hits } : {};
  }
  // Later words: paths relative to cwd, plus project slugs for open/vim/visit/source.
  const slash = word.lastIndexOf("/");
  const dirPart = slash >= 0 ? word.slice(0, slash + 1) : "";
  const namePart = word.slice(slash + 1);
  const dirAbs = resolve(ctx.cwd, dirPart || ".");
  const dir = lookup(ctx.fs, dirAbs);
  const cmd = before.trim().split(/\s+/)[0];
  let pool: string[] = [];
  if (dir && dir.kind === "dir")
    pool = Object.entries(dir.kids)
      .filter(([n]) => n.startsWith(namePart) && (namePart.startsWith(".") || !n.startsWith(".")))
      .filter(([, n]) => cmd !== "cd" && cmd !== "z" || n.kind === "dir")
      .map(([n, k]) => dirPart + n + (k.kind === "dir" ? "/" : ""));
  if (["open", "vim", "visit", "source"].includes(cmd) && !dirPart) pool.push(...P.map((x) => x.slug).filter((x) => x.startsWith(word)));
  pool = [...new Set(pool)].sort();
  if (pool.length === 1) return { value: before + pool[0] + (pool[0].endsWith("/") ? "" : " ") };
  if (!pool.length) return {};
  const cp = commonPrefix(pool);
  return { value: cp.length > word.length ? before + cp : undefined, options: pool.map((x) => x.split("/").filter(Boolean).pop() + (x.endsWith("/") ? "/" : "")) };
};

const commonPrefix = (xs: string[]) => xs.reduce((acc, x) => {
  let i = 0;
  while (i < acc.length && acc[i] === x[i]) i++;
  return acc.slice(0, i);
});

export { tilde, HOME };
