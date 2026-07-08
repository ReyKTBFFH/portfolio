import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="section-shell flex flex-col items-center justify-between gap-3 text-sm text-faint sm:flex-row">
        <p className="font-mono">© {new Date().getFullYear()} {profile.name}</p>
        <p className="font-mono text-xs">Built with React · Vite · Tailwind, hosted on AWS S3 + CloudFront</p>
      </div>
    </footer>
  );
}
