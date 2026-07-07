import { useEffect, useRef, useState } from "react";
import { skillCategories, profile } from "../data/portfolio";

type Line = { text: string; tone?: "prompt" | "error" | "accent" };

const allSkills = skillCategories.flatMap((c) =>
  c.skills.map((s) => ({ ...s, category: c.title }))
);

function band(level: number): string {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 60) return "Working";
  return "Learning";
}

const HELP: Line[] = [
  { text: "Available commands:" },
  { text: "  whoami          — who am I" },
  { text: "  ls [category]   — list skills (or all categories)" },
  { text: "  cat <skill>     — show a skill's proficiency" },
  { text: "  levels          — proficiency scale" },
  { text: "  contact         — how to reach me" },
  { text: "  clear           — clear the screen" },
  { text: "  help            — this message" },
];

const LEVELS: Line[] = [
  { text: "Proficiency scale:" },
  { text: "  Learning  (<60%)   — actively ramping up" },
  { text: "  Working   (60–79%) — practical, hands-on experience" },
  { text: "  Advanced  (80–89%) — production usage at scale" },
  { text: "  Expert    (90%+)   — deep, day-to-day expertise" },
];

const QUICK = ["help", "whoami", "ls", "cat kubernetes", "contact"];

export default function SkillTerminal() {
  const [history, setHistory] = useState<Line[]>([
    { text: "Skills explorer — type 'help' to get started.", tone: "accent" },
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
    const [main, ...rest] = cmd.toLowerCase().split(/\s+/);
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
          { text: "…or just scroll down to the contact section. 📬" },
        ];
        break;
      case "sudo":
        out = [
          { text: "[sudo] password for guest:" },
          { text: "Sorry, guest is not in the sudoers file.", tone: "error" },
          { text: "This incident will be reported. 🚨", tone: "error" },
          { text: "" },
          { text: "(psst — you don't need root to hire me. try 'contact')", tone: "accent" },
        ];
        break;
      case "ls": {
        const cat = skillCategories.find((c) => c.id === arg);
        if (cat) {
          out = [
            { text: `${cat.title}:`, tone: "accent" },
            ...cat.skills.map((s) => ({ text: `  ${s.name.padEnd(20)} ${s.level}%` })),
          ];
        } else if (arg) {
          out = [{ text: `No category '${arg}'. Try: ls`, tone: "error" }];
        } else {
          out = [
            { text: "Categories:", tone: "accent" },
            ...skillCategories.map((c) => ({ text: `  ${c.id.padEnd(14)} ${c.title}` })),
            { text: "" },
            { text: "Tip: ls <category>  ·  cat <skill>" },
          ];
        }
        break;
      }
      case "cat": {
        const s = allSkills.find((x) => x.name.toLowerCase() === arg);
        if (s) {
          out = [
            { text: `${s.name}`, tone: "accent" },
            { text: `  category:    ${s.category}` },
            { text: `  proficiency: ${s.level}%  (${band(s.level)})` },
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
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-accent/80" />
          </div>
          <span className="font-mono text-xs text-faint">shreyansh@skills — zsh</span>
          <span className="w-10" />
        </div>

        {/* Output */}
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
              placeholder="enter command…"
              className="flex-1 bg-transparent font-mono text-ink outline-none placeholder:text-faint"
              aria-label="Skills terminal input"
            />
          </div>
        </div>
      </div>

      {/* Quick commands */}
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
