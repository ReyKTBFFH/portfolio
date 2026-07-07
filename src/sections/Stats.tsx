import { motion } from "framer-motion";
import { stats } from "../data/portfolio";

export default function Stats() {
  return (
    <section className="border-y border-border bg-surface/40 py-14">
      <div className="section-shell">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="font-mono text-3xl font-semibold text-accent md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
