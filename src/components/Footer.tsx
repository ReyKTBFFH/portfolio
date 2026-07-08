import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="section-shell flex flex-col items-center justify-between gap-3 text-sm text-faint sm:flex-row">
        <p className="font-mono">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs">
          <a href="#platform" className="text-muted transition-colors hover:text-accent">
            Platform details
          </a>
          <span className="mx-2 text-border">·</span>
          AWS S3 + CloudFront · Terraform · OIDC
        </p>
      </div>
    </footer>
  );
}
