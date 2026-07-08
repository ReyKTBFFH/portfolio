import SectionHeading from "../components/SectionHeading";
import SkillTerminal from "../components/SkillTerminal";
import TechIcon from "../components/TechIcon";
import { bandClass } from "../components/bandClass";
import { skillCategories } from "../data/portfolio";

const allSkills = skillCategories.flatMap((c) =>
  c.skills.map((s) => ({ ...s, category: c.title }))
);

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-y border-border bg-surface/30 py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          section="WORKLOADS"
          label="toolchain.list"
          title="Toolchain in production"
          intro="A DevSecOps toolchain centered on Kubernetes, infrastructure-as-code, and applied AI."
        />

        <div className="status-panel overflow-x-auto">
          <div className="status-panel-header">kubectl get skills --all-namespaces</div>
          <table className="kubectl-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>LEVEL</th>
                <th>CONTEXT</th>
              </tr>
            </thead>
            <tbody>
              {allSkills.map((skill) => (
                <tr key={skill.name}>
                  <td className="text-ink">
                    <span className="inline-flex items-center gap-2">
                      <TechIcon name={skill.name} size={16} className="text-muted" />
                      {skill.name}
                    </span>
                  </td>
                  <td>{skill.category}</td>
                  <td>
                    <span className={bandClass(skill.band)}>{skill.band}</span>
                  </td>
                  <td>{skill.context}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-semibold tracking-tight">Skills console</h3>
            <p className="mt-2 text-muted">
              Try <code className="font-mono text-cyan">kubectl get pods</code> or{" "}
              <code className="font-mono text-cyan">cat kubernetes</code> to explore.
            </p>
          </div>
          <SkillTerminal />
        </div>
      </div>
    </section>
  );
}
