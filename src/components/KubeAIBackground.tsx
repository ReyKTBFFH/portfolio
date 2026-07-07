import { useEffect, useRef } from "react";

// A Kubernetes × AI backdrop: a drifting node graph (cluster topology / neural
// net) with signal pulses flowing along edges, plus a faint rotating Kubernetes
// helm wheel. Rendered on a single canvas; honors prefers-reduced-motion.

const BLUE = "50,108,229"; // accent — Kubernetes blue
const CYAN = "56,189,248"; // cyan — AI signal

type Node = { x: number; y: number; vx: number; vy: number; r: number; hex: boolean };
type Pulse = { a: number; b: number; t: number; speed: number };

export default function KubeAIBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let rot = 0;
    let lastPulse = 0;
    let last = 0; // timestamp of previous frame, for delta-time normalization
    const LINK = 150; // edge distance threshold

    const hexPath = (x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + Math.cos(a) * r;
        const py = y + Math.sin(a) * r;
        i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.closePath();
    };

    const drawHelm = (cx: number, cy: number, R: number, a: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(a);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `rgba(${BLUE},0.10)`;
      ctx.beginPath();
      ctx.arc(0, 0, R, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.6, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 7; i++) {
        const ang = (i / 7) * Math.PI * 2;
        const cxu = Math.cos(ang);
        const cyu = Math.sin(ang);
        ctx.beginPath();
        ctx.moveTo(cxu * R * 0.6, cyu * R * 0.6);
        ctx.lineTo(cxu * R, cyu * R);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cxu * R, cyu * R, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CYAN},0.16)`;
        ctx.fill();
      }
      ctx.restore();
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(46, Math.max(22, Math.round((w * h) / 26000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 1.2,
        hex: Math.random() < 0.28, // ~a quarter render as k8s "pods"
      }));
      pulses = [];
    };

    const step = (now: number) => {
      // Delta-time factor (1 = a 60fps frame). Clamped so a long first/stalled
      // frame nudges motion instead of teleporting it — keeps load smooth.
      const f = last ? Math.min(now - last, 48) / 16.667 : 1;
      last = now;
      if (canvas.style.opacity !== "1") canvas.style.opacity = "1"; // fade in once drawing

      ctx.clearRect(0, 0, w, h);
      rot += 0.0006 * f;
      drawHelm(w * 0.72, h * 0.42, Math.min(w, h) * 0.34, rot);

      // move nodes
      for (const n of nodes) {
        n.x += n.vx * f;
        n.y += n.vy * f;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${BLUE},${0.14 * (1 - d / LINK)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // spawn a signal pulse along a near pair
      if (now - lastPulse > 620 && nodes.length > 1) {
        lastPulse = now;
        const a = (Math.random() * nodes.length) | 0;
        let b = -1;
        let best = LINK;
        for (let j = 0; j < nodes.length; j++) {
          if (j === a) continue;
          const d = Math.hypot(nodes[a].x - nodes[j].x, nodes[a].y - nodes[j].y);
          if (d < best) {
            best = d;
            b = j;
          }
        }
        if (b >= 0) pulses.push({ a, b, t: 0, speed: 0.012 + Math.random() * 0.014 });
      }

      // draw + advance pulses
      pulses = pulses.filter((p) => p.t <= 1);
      for (const p of pulses) {
        p.t += p.speed * f;
        const na = nodes[p.a];
        const nb = nodes[p.b];
        const x = na.x + (nb.x - na.x) * p.t;
        const y = na.y + (nb.y - na.y) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CYAN},0.9)`;
        ctx.shadowColor = `rgba(${CYAN},0.9)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // nodes
      for (const n of nodes) {
        if (n.hex) {
          hexPath(n.x, n.y, n.r * 2.4);
          ctx.strokeStyle = `rgba(${BLUE},0.7)`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${CYAN},0.7)`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);

    let timer = 0;
    if (reduce) {
      step(0);
      cancelAnimationFrame(raf); // one static frame only
    } else {
      // This component is mounted only once the hero title finishes typing, so
      // there's no contention to wait out — a short settle keeps the fade-in
      // graceful. The static grid/glow cover the brief gap.
      timer = window.setTimeout(() => {
        last = 0; // reset so the first drawn frame doesn't inherit a stale delta
        raf = requestAnimationFrame(step);
      }, 150);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ opacity: 0 }}
      className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-1000 ease-out"
    />
  );
}
