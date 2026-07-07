import { useEffect, useState } from "react";

// Types out `text` character by character, then shows a steady caret.
export default function Typewriter({
  text,
  delay = 55,
  startDelay = 0,
  className,
  showCaret = true,
  onDone,
}: {
  text: string;
  delay?: number;
  startDelay?: number;
  className?: string;
  showCaret?: boolean;
  onDone?: () => void;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(startDelay === 0);

  useEffect(() => {
    if (started) return;
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [started, startDelay]);

  useEffect(() => {
    if (!started || count >= text.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [started, count, text.length, delay]);

  const done = count >= text.length;

  useEffect(() => {
    if (done) onDone?.();
  }, [done, onDone]);

  return (
    <span className={className}>
      {text.slice(0, count)}
      {showCaret && (
        <span
          className={`ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[1px] bg-accent align-middle ${
            done ? "animate-blink" : ""
          }`}
        />
      )}
    </span>
  );
}
