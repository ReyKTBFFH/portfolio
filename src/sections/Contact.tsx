import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border bg-surface/30 py-24 md:py-32">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">
            <span className="text-cyan">CONTACT</span>
            <span className="mx-2 text-faint">/</span>
            <span className="normal-case tracking-normal text-muted">reach.operator</span>
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Need someone to harden your platform or ship AI on real infra?
          </h2>
          <p className="mt-4 text-muted">
            Open to platform, DevOps/DevSecOps, and applied-AI infrastructure roles. Email or
            LinkedIn is fastest.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-soft"
            >
              <Mail size={16} /> {profile.email}
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-base px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/40"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-base px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/40"
            >
              <Github size={16} /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
