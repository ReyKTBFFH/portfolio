import { ArrowRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import PlatformTopology from "../components/PlatformTopology";
import { platform } from "../data/portfolio";

export default function Platform() {
  return (
    <section id="platform" className="scroll-mt-20 py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          section="PLATFORM"
          label="this-site.infra"
          title="This site runs on what I build"
          intro="Not a template host. A static SPA on AWS, deployed via OIDC — the same patterns I use in production."
        />

        <div className="mb-10 hidden md:block">
          <PlatformTopology />
        </div>

        <div className="status-panel mb-8 overflow-x-auto">
          <div className="status-panel-header">Deploy pipeline</div>
          <div className="flex flex-wrap items-center gap-2 px-4 py-4 font-mono text-xs">
            {platform.pipeline.map((step, i) => (
              <span key={step} className="inline-flex items-center gap-2">
                <span className="rounded border border-border bg-base/60 px-2.5 py-1 text-muted">
                  {step}
                </span>
                {i < platform.pipeline.length - 1 && (
                  <ArrowRight size={14} className="text-faint" aria-hidden="true" />
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="status-panel overflow-x-auto">
          <div className="status-panel-header">kubectl get resources -n portfolio-site</div>
          <table className="kubectl-table">
            <thead>
              <tr>
                <th>RESOURCE</th>
                <th>TYPE</th>
                <th>DETAIL</th>
              </tr>
            </thead>
            <tbody>
              {platform.resources.map((r) => (
                <tr key={r.resource}>
                  <td className="font-medium text-ink">{r.resource}</td>
                  <td>{r.type}</td>
                  <td>{r.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
