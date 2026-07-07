import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, MapPin } from "lucide-react";
import { profile } from "../data/portfolio";
import KubeAIBackground from "../components/KubeAIBackground";

export default function Hero() {
  // Hold the animated backdrop until the hero entrance settles, so the canvas
  // loop never contends with the mount-time entrance animation.
  const [entered, setEntered] = useState(false);

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(50,108,229,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(50,108,229,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 100%)",
        }}
      />
      {entered && <KubeAIBackground />}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />

      <div className="section-shell relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-mono text-sm text-muted"
        >
          <span className="mr-2 text-accent">$</span>
          <span className="text-cyan">whoami</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          onAnimationComplete={() => setEntered(true)}
          className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl"
        >
          {profile.name}
          <span className="mt-3 block bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">
            {profile.role}
          </span>
        </motion.h1>

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
            View projects
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
    </section>
  );
}
