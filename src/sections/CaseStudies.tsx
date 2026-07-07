import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { caseStudies } from "../data/portfolio";

export default function CaseStudies() {
  return (
    <section id="impact" className="scroll-mt-20 py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="cat impact.md"
          title="Selected case studies"
          intro="Challenge → solution → measurable outcome."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.title} delay={i * 0.06}>
              <div className="card flex h-full flex-col p-7">
                <h3 className="text-lg font-semibold">{cs.title}</h3>
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
