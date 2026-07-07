import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, profile } from "../data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? "border-b border-border bg-base/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="section-shell flex h-16 items-center justify-between">
        <a href="#top" className="font-mono text-sm font-medium tracking-tight">
          <span className="text-accent">~/</span>shreyansh
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-underline text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            download
            className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-accent/20"
          >
            Résumé
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-base/95 md:hidden">
          <div className="section-shell flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-muted hover:bg-surface hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              download
              className="mt-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-center text-sm font-medium"
            >
              Download Résumé
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
