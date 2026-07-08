import { useEffect, useRef, useState } from "react";
import { skillCategories, projects, profile } from "../data/portfolio";

type Line = { text: string; tone?: "prompt" | "error" | "accent" };

const allSkills = skillCategories.flatMap((c) =>
  c.skills.map((s) => ({ ...s, category: c.title }))
);

const HELP: Line[] = [
  { text: "Available commands:" },
  { text: "  kubectl get pods  - list projects as running pods" },
  { text: "  kubectl get skills - list toolchain (alias: get skills)" },
  { text: "  whoami            - operator profile" },
  { text: "  ls [category]     - list skills by category" },
  { text: "  cat <skill>       - show skill details" },
  { text: "  levels            - proficiency scale" },
  { text: "  contact           - how to reach me" },
  { text: "  clear             - clear the screen" },
  { text: "  help              - this message" },
];

const LEVELS: Line[] = [
  { text: "Proficiency scale:" },
  { text: "  Learning  - actively ramping up" },
  { text: "  Working   - practical, hands-on experience" },
  { text: "  Advanced  - production usage at scale" },
  { text: "  Expert    - deep, day-to-day expertise" },
];

const QUICK = ["kubectl get pods", "kubectl get skills", "whoami", "cat kubernetes", "contact"];

export default function SkillTerminal() {
  const [history, setHistory] = useState<Line[]>([
    { text: "Skills console ready. Try: kubectl get pods", tone: "accent" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    const parts = cmd.toLowerCase().split(/\s+/);
    const [main, ...rest] = parts;
    const arg = rest.join(" ");
    let out: Line[] = [];

    switch (main) {
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "help":
        out = HELP;
        break;
      case "levels":
        out = LEVELS;
        break;
      case "whoami":
        out = [
          { text: profile.name, tone: "accent" },
          { text: profile.role },
          { text: profile.location },
        ];
        break;
      case "contact":
        out = [
          { text: "Reach me at:", tone: "accent" },
          { text: `  email     ${profile.email}` },
          { text: `  linkedin  ${profile.socials.linkedin}` },
          { text: `  github    ${profile.socials.github}` },
          { text: "" },
          { text: "…or scroll to the contact section." },
        ];
        break;
      case "sudo":
        out = [
          { text: "[sudo] password for guest:" },
          { text: "Sorry, guest is not in the sudoers file.", tone: "error" },
          { text: "This incident will be reported.", tone: "error" },
          { text: "" },
          { text: "(you don't need root to hire me. try 'contact')", tone: "accent" },
        ];
        break;
      case "kubectl":
      case "k": {
        const sub = rest.map((r) => r.toLowerCase());
        const res = sub[1];
        if (sub[0] === "get" && ["skills", "skill"].includes(res)) {
          const w = Math.max(...allSkills.map((s) => s.name.length), 4) + 3;
          out = [
            { text: 'namespace "portfolio"', tone: "accent" },
            {
              text:
                "NAME".padEnd(w) +
                "CATEGORY".padEnd(28) +
                "LEVEL".padEnd(12) +
                "CONTEXT",
            },
            ...allSkills.map((s) => ({
              text:
                s.name.padEnd(w) +
                s.category.padEnd(28) +
                s.band.padEnd(12) +
                s.context,
            })),
          ];
        } else if (sub[0] === "get" && ["pods", "pod", "po", "all"].includes(res)) {
          const rows = projects.map((p) => {
            const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            const h = Math.abs(
              [...p.name].reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0)
            );
            return {
              name: `${slug}-${h.toString(36).padStart(9, "x").slice(0, 9)}`,
              ready: p.ready,
              status: p.status,
              restarts: "0",
              age: `${(h % 160) + 20}d`,
            };
          });
          const w = Math.max(...rows.map((r) => r.name.length), 4) + 3;
          out = [
            { text: 'namespace "portfolio"', tone: "accent" },
            {
              text:
                "NAME".padEnd(w) +
                "READY".padEnd(8) +
                "STATUS".padEnd(20) +
                "RESTARTS".padEnd(11) +
                "AGE",
            },
            ...rows.map((r) => ({
              text:
                r.name.padEnd(w) +
                r.ready.padEnd(8) +
                r.status.padEnd(20) +
                r.restarts.padEnd(11) +
                r.age,
            })),
          ];
        } else if (sub[0] === "get" && res) {
          out = [
            { text: `No resources of type "${res}" in namespace "portfolio".`, tone: "error" },
            { text: "Try: kubectl get pods | kubectl get skills", tone: "accent" },
          ];
        } else {
          out = [
            { text: "usage: kubectl get pods | kubectl get skills", tone: "accent" },
          ];
        }
        break;
      }
      case "get":
        if (rest[0] === "skills" || rest[0] === "skill") {
          run(`kubectl get skills`);
          return;
        }
        if (rest[0] === "pods" || rest[0] === "pod") {
          run(`kubectl get pods`);
          return;
        }
        out = [{ text: `get: unknown resource. Try: kubectl get pods`, tone: "error" }];
        break;
      case "ls": {
        const cat = skillCategories.find((c) => c.id === arg);
        if (cat) {
          out = [
            { text: `${cat.title}:`, tone: "accent" },
            ...cat.skills.map((s) => ({
              text: `  ${s.name.padEnd(20)} ${s.band.padEnd(10)} ${s.context}`,
            })),
          ];
        } else if (arg) {
          out = [{ text: `No category '${arg}'. Try: ls`, tone: "error" }];
        } else {
          out = [
            { text: "Categories:", tone: "accent" },
            ...skillCategories.map((c) => ({ text: `  ${c.id.padEnd(14)} ${c.title}` })),
            { text: "" },
            { text: "Tip: ls <category>  |  cat <skill>" },
          ];
        }
        break;
      }
      case "cat": {
        const s = allSkills.find((x) => x.name.toLowerCase() === arg);
        if (s) {
          out = [
            { text: `${s.name}`, tone: "accent" },
            { text: `  category: ${s.category}` },
            { text: `  level:    ${s.band}` },
            { text: `  context:  ${s.context}` },
          ];
        } else {
          out = [{ text: `cat: ${arg || "?"}: no such skill. Try: ls`, tone: "error" }];
        }
        break;
      }
      default:
        out = [{ text: `command not found: ${main}. Type 'help'.`, tone: "error" }];
    }

    setHistory((h) => [...h, { text: `$ ${cmd}`, tone: "prompt" }, ...out, { text: "" }]);
    setInput("");
  };

  const toneClass = (tone?: Line["tone"]) =>
    tone === "prompt"
      ? "text-cyan"
      : tone === "error"
        ? "text-red-400"
        : tone === "accent"
          ? "text-accent"
          : "text-muted";

  return (
    <div className="mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-xl border border-border bg-base shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-accent/80" />
          </div>
          <span className="font-mono text-xs text-faint">kubectl --context=portfolio</span>
          <span className="w-10" />
        </div>

        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="h-80 overflow-y-auto p-5 font-mono text-sm leading-relaxed"
        >
          {history.map((line, i) => (
            <div key={i} className={`whitespace-pre-wrap ${toneClass(line.tone)}`}>
              {line.text}
            </div>
          ))}
          <div className="flex items-center">
            <span className="mr-2 text-accent">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run(input)}
              spellCheck={false}
              autoComplete="off"
              placeholder="kubectl get pods"
              className="flex-1 bg-transparent font-mono text-ink outline-none placeholder:text-faint"
              aria-label="Skills terminal input"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {QUICK.map((q) => (
          <button
            key={q}
            onClick={() => {
              run(q);
              inputRef.current?.focus();
            }}
            className="rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-ink"
          >
            $ {q}
          </button>
        ))}
      </div>
    </div>
  );
}
