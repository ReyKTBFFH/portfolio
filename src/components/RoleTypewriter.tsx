import { useEffect, useState } from "react";

type Phase = "typing" | "deleting";

export default function RoleTypewriter({
  terms,
  typingDelay = 55,
  deletingDelay = 35,
  pauseMs = 2200,
  startDelay = 400,
  className,
}: {
  terms: readonly string[];
  typingDelay?: number;
  deletingDelay?: number;
  pauseMs?: number;
  startDelay?: number;
  className?: string;
}) {
  const [termIndex, setTermIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [started, setStarted] = useState(false);

  const current = terms[termIndex] ?? "";

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || terms.length === 0) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (count < current.length) {
        timeout = setTimeout(() => setCount((c) => c + 1), typingDelay);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), pauseMs);
      }
    } else if (count > 0) {
      timeout = setTimeout(() => setCount((c) => c - 1), deletingDelay);
    } else {
      setTermIndex((i) => (i + 1) % terms.length);
      setPhase("typing");
    }

    return () => clearTimeout(timeout);
  }, [started, phase, count, current.length, terms.length, typingDelay, deletingDelay, pauseMs]);

  return (
    <span className={className} aria-live="polite" aria-atomic="true">
      <span className="text-cyan">{current.slice(0, count)}</span>
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[1px] bg-accent align-middle animate-blink" />
    </span>
  );
}
