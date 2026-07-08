import { motion } from "framer-motion";
import { Activity, Cloud, Container, Cpu, Shield, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import SkillTerminal from "../components/SkillTerminal";
import TechIcon from "../components/TechIcon";
import { skillCategories } from "../data/portfolio";

const icons: Record<string, LucideIcon> = {
  cloud: Cloud,
  container: Container,
  terminal: Terminal,
  shield: Shield,
  activity: Activity,
  cpu: Cpu,
};

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-y border-border bg-surface/30 py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="ls -la skills/"
          title="What I build with"
          intro="A DevSecOps toolchain centered on Kubernetes, infrastructure-as-code, and, increasingly, applied AI."
        />

        {/* Proficiency cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((group, i) => {
            const Icon = icons[group.icon];
            return (
              <Reveal key={group.id} delay={i * 0.05}>
                <div className="card h-full p-6 transition-colors hover:border-accent/30">
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="rounded-lg border border-border bg-base/60 p-2 text-accent">
                      <Icon size={18} />
                    </span>
                    <h3 className="font-mono text-sm text-cyan">{group.title}</h3>
                  </div>
                  <ul className="space-y-3.5">
                    {group.skills.map((skill) => (
                      <li key={skill.name}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-ink">
                            <TechIcon name={skill.name} size={16} className="text-muted" />
                            {skill.name}
                          </span>
                          <span className="font-mono text-xs text-muted">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-accent to-cyan"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Interactive terminal explorer */}
        <div className="mt-16">
          <Reveal className="mb-8 text-center">
            <h3 className="text-2xl font-semibold tracking-tight">Interactive skill explorer</h3>
            <p className="mt-2 text-muted">
              Prefer the command line? Type <code className="font-mono text-cyan">cat kubernetes</code> or{" "}
              <code className="font-mono text-cyan">ls</code> to poke around.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <SkillTerminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
