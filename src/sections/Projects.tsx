import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import TechIcon from "../components/TechIcon";
import { projects } from "../data/portfolio";

function statusBadge(status: string) {
  if (status === "Running") return "status-badge-healthy";
  return "status-badge-warning";
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 border-y border-border bg-surface/30 py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          section="DEPLOYMENTS"
          label="kubectl get deployments"
          title="What I'm building now"
          intro="Production Kubernetes platforms and applied, agentic AI — tracked like workloads."
        />

        <div className="status-panel overflow-x-auto">
          <div className="status-panel-header">kubectl get deployments -n portfolio</div>
          <table className="kubectl-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>READY</th>
                <th>STATUS</th>
                <th>STACK</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.name}>
                  <td>
                    <div>
                      <span className="font-medium text-ink">{project.name}</span>
                      <p className="mt-0.5 font-mono text-[11px] text-faint">{project.category}</p>
                    </div>
                  </td>
                  <td className="font-mono text-ink">{project.ready}</td>
                  <td>
                    <span className={statusBadge(project.status)}>{project.status}</span>
                  </td>
                  <td>
                    <span className="font-mono text-xs">{project.stack.join(" · ")}</span>
                  </td>
                  <td>
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-accent hover:text-accent-soft"
                      >
                        Open <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.name}
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
                  <span className="font-mono text-xs text-muted">{project.ready}</span>
                  <span className={statusBadge(project.status)}>{project.status}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
}
