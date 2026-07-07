# Shreyansh Mishra — Portfolio

Personal portfolio for a DevSecOps & Kubernetes engineer. Static React SPA,
hosted on AWS S3 + CloudFront.

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · Lucide.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build locally
```

## Edit content

All copy lives in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts) —
profile, skills, experience, projects, and case studies. Components read from it,
so most updates are data-only.

**Before going live, update:**
- `profile.socials.github` — your GitHub URL (placeholder in `portfolio.ts`).
- Project blurbs for **1aarambh** and **Vaacha** (marked with `[Add ...]`).

The résumé PDF is served from [`public/Shreyansh-Mishra-Resume.pdf`](public/).

## Deploy

Infrastructure and CI/CD are documented in [`infra/README.md`](infra/README.md):
Terraform provisions S3 + CloudFront + Route 53 + an OIDC deploy role, and
`.github/workflows/deploy.yml` builds and ships on every push to `main`.
