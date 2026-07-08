import { motion } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, MapPin } from "lucide-react";
import { profile } from "../data/portfolio";
import PlatformTopology from "../components/PlatformTopology";
import RoleTypewriter from "../components/RoleTypewriter";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="section-shell relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="status-panel mb-8 inline-flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5 font-mono text-xs"
        >
          <span>
            <span className="text-faint">NODE</span>{" "}
            <span className="text-ink">{profile.node}</span>
          </span>
          <span className="text-border">·</span>
          <span>
            <span className="text-faint">CONTEXT</span>{" "}
            <span className="text-ink">{profile.context}</span>
          </span>
          <span className="text-border">·</span>
          <span>
            <span className="text-faint">ROLE</span>{" "}
            <span className="text-cyan">DevSecOps/K8s</span>
          </span>
          <span className="text-border">·</span>
          <span>
            <span className="text-faint">STATUS</span>{" "}
            <span className="status-badge-healthy">{profile.availability}</span>
          </span>
        </motion.div>

        <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-3 font-mono text-base text-accent md:text-lg"
              aria-label={profile.role}
            >
              DevSecOps &{" "}
              <RoleTypewriter terms={profile.roleTerms} className="inline" /> Engineer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 max-w-xl text-lg text-muted"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-soft"
              >
                View deployments
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/40"
              >
                <Download size={16} /> Résumé
              </a>
              <div className="ml-1 flex items-center gap-1">
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="rounded-lg border border-border p-2.5 text-muted transition-colors hover:text-ink"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="rounded-lg border border-border p-2.5 text-muted transition-colors hover:text-ink"
                >
                  <Github size={16} />
                </a>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex items-center gap-1.5 font-mono text-xs text-faint"
            >
              <MapPin size={13} /> {profile.location}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
            aria-hidden="true"
          >
            <PlatformTopology />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
