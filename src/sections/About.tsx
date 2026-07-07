import { Cpu, Shield, Terminal } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { about, principles } from "../data/portfolio";

const principleIcons = { shield: Shield, terminal: Terminal, cpu: Cpu };

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading eyebrow="cat about.txt" title="Infrastructure that stays secure while it scales" />

        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
            {about.summary.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="grid grid-cols-2 gap-4 self-start">
            {about.highlights.map((h) => (
              <div key={h.label} className="card p-5">
                <div className="font-mono text-2xl font-semibold text-accent">{h.value}</div>
                <div className="mt-1 text-sm text-muted">{h.label}</div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Guiding principles */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {principles.map((p, i) => {
            const Icon = principleIcons[p.icon];
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="card h-full p-6 transition-colors hover:border-accent/30">
                  <span className="inline-flex rounded-lg bg-accent/10 p-2.5 text-accent">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted">{p.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
