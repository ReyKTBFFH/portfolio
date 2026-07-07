import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { experience } from "../data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading eyebrow="cat experience.log" title="Where I've shipped" />

        <div className="relative border-l border-border pl-8 md:pl-10">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.05}>
              <div className="relative pb-12 last:pb-0">
                <span className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-base md:-left-[49px]" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-xl font-semibold">
                    {job.role} <span className="text-accent">· {job.company}</span>
                  </h3>
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
