import SectionHeading from "../components/SectionHeading";
import { caseStudies } from "../data/portfolio";

export default function CaseStudies() {
  return (
    <section id="impact" className="scroll-mt-20 py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          section="CHANGES"
          label="incidents.resolved"
          title="Changes shipped, impact measured"
          intro="Production changes with measurable outcomes — not slide decks."
        />

        <div className="status-panel overflow-x-auto">
          <div className="status-panel-header">kubectl get changes --field-selector=status=Resolved</div>
          <table className="kubectl-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>CHALLENGE</th>
                <th>SOLUTION</th>
                <th>IMPACT</th>
              </tr>
            </thead>
            <tbody>
              {caseStudies.map((cs) => (
                <tr key={cs.id}>
                  <td className="font-mono text-xs text-cyan">{cs.id}</td>
                  <td className="font-medium text-ink">{cs.title}</td>
                  <td>{cs.challenge}</td>
                  <td>{cs.solution}</td>
                  <td className="text-ink">{cs.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <div key={cs.id} className="card flex h-full flex-col p-7">
              <p className="font-mono text-xs text-cyan">{cs.id}</p>
              <h3 className="mt-1 text-lg font-semibold">{cs.title}</h3>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-faint">Challenge</dt>
                  <dd className="mt-1 text-muted">{cs.challenge}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-faint">Solution</dt>
                  <dd className="mt-1 text-muted">{cs.solution}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-accent">Impact</dt>
                  <dd className="mt-1 text-ink">{cs.impact}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
