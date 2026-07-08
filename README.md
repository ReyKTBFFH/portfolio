# Shreyansh Mishra · Portfolio

Personal portfolio for a DevSecOps & Kubernetes engineer. A static React SPA
hosted on AWS S3 + CloudFront, provisioned with Terraform and deployed via
GitHub Actions.

**Live:** https://shreyanshmishra.cloud

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · Lucide / react-icons.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build locally
```

## Edit content

Almost all copy lives in one file:
[`src/data/portfolio.ts`](src/data/portfolio.ts): profile, skills, experience,
projects, and case studies. Components read from it, so most updates are
data-only: edit, commit, push, and CI deploys it.

The résumé PDF is served from
[`public/Shreyansh-Mishra-Resume.pdf`](public/Shreyansh-Mishra-Resume.pdf).

## Deploy

Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site, assumes an AWS role via OIDC (no stored keys), syncs
`dist/` to S3, and invalidates CloudFront. A run takes ~30s.

Infrastructure is Terraform in [`infra/`](infra/) (private S3 + CloudFront + ACM
+ Route 53 + the OIDC deploy role); see [`infra/README.md`](infra/README.md) for
provisioning steps.

## Learn more

See [`ARCHITECTURE.md`](ARCHITECTURE.md) for the full architecture: request/deploy
flows, the frontend model, hosting, DNS/TLS, security, and cost.
