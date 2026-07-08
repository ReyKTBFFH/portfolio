import { stats } from "../data/portfolio";

export default function Stats() {
  return (
    <section className="border-y border-border bg-surface/40 py-14">
      <div className="section-shell">
        <div className="status-panel overflow-x-auto">
          <div className="status-panel-header">Cluster health — career metrics</div>
          <table className="kubectl-table">
            <thead>
              <tr>
                <th>METRIC</th>
                <th>VALUE</th>
                <th>SOURCE</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat) => (
                <tr key={stat.label}>
                  <td className="text-ink">{stat.label}</td>
                  <td className="font-mono text-lg font-semibold text-accent">{stat.value}</td>
                  <td className="font-mono text-xs">{stat.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
