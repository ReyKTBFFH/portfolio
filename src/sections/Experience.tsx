import SectionHeading from "../components/SectionHeading";
import CompanyLogo from "../components/CompanyLogo";
import { experience } from "../data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          section="HISTORY"
          label="deployments.log"
          title="Where I've shipped"
        />

        <div className="relative border-l border-border pl-8 md:pl-10">
          {experience.map((job) => (
            <div key={job.company + job.period} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-base md:-left-[49px]" />
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <div className="flex items-center gap-3">
                  <CompanyLogo companyId={job.companyId} />
                  <div>
                    <h3 className="text-xl font-semibold">{job.role}</h3>
                    <p className="font-mono text-sm text-accent">{job.company}</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-faint">{job.period}</span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {job.points.map((p, j) => (
                  <li key={j} className="flex gap-3 text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
