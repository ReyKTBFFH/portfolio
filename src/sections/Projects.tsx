import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import TechIcon from "../components/TechIcon";
import { projects } from "../data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 border-y border-border bg-surface/30 py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="cd ~/projects"
          title="What I'm building now"
          intro="Two focuses: production Kubernetes platforms and applied, agentic AI."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.08}>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-xl border border-border bg-base/60 p-7 transition-all hover:border-accent/40 hover:bg-surface"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-xs text-cyan">{project.category}</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight">{project.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.status && (
                      <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted">
                        {project.status}
                      </span>
                    )}
                    <ArrowUpRight
                      size={20}
                      className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </div>
                </div>

                <p className="mt-4 flex-1 text-muted">{project.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      <TechIcon name={tag} size={13} />
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
