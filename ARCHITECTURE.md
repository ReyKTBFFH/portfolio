# Architecture

This document describes how the portfolio is built, hosted, and deployed.

- **Live site:** https://shreyanshmishra.cloud (and `www.`)
- **Type:** static single-page application (client-rendered React), no backend
- **Hosting:** private Amazon S3 origin behind Amazon CloudFront
- **IaC:** Terraform (`infra/`)
- **CI/CD:** GitHub Actions with OIDC (no long-lived AWS keys)

---

## 1. High-level overview

```
                        git push origin main
                                 │
                                 ▼
                   ┌──────────────────────────┐
                   │      GitHub Actions       │
                   │  npm ci → npm run build   │
                   │  (assumes AWS role via    │
                   │   short-lived OIDC token) │
                   └────────────┬──────────────┘
                                │ aws s3 sync dist/ + invalidation
                                ▼
   visitor                ┌───────────┐        origin fetch       ┌──────────────┐
   ───────► Route 53 ───► │ CloudFront │ ─────(OAC, SigV4)──────► │  S3 (private) │
    HTTPS   (DNS alias)   │   (CDN)    │ ◄────  cached assets ──── │   static site │
                          └───────────┘                           └──────────────┘
                               ▲
                               │ TLS
                          ACM certificate
                        (us-east-1, DNS-validated)
```

Two independent flows:

- **Serve path (read):** a visitor resolves the domain via Route 53 to CloudFront,
  which serves cached content over HTTPS and, on cache miss, fetches from the
  private S3 bucket using Origin Access Control (OAC).
- **Deploy path (write):** a push to `main` triggers GitHub Actions, which builds
  the site and syncs it to S3, then invalidates the CDN cache.

The two paths never share credentials: the deploy role can write to S3 and
invalidate CloudFront but cannot serve traffic; CloudFront can read S3 but has no
deploy rights.

---

## 2. Frontend application

Client-rendered React SPA built by Vite. There is no router library and no server
component; navigation is in-page anchor scrolling between sections.

**Stack:** React 18 · TypeScript · Vite 5 · Tailwind CSS 3 · Framer Motion · Lucide / react-icons.

### Content model

All site copy lives in a single source of truth: [`src/data/portfolio.ts`](src/data/portfolio.ts).
It exports typed objects (`profile`, `about`, `skillCategories`, `experience`,
`projects`, `caseStudies`, `nav`, …). Section components are presentational and
read from this module, so most content edits are data-only.

### Structure

```
src/
  main.tsx              App entry; self-hosted font imports (@fontsource)
  App.tsx               Composes the page sections in order
  data/portfolio.ts     Single source of truth for all content
  sections/             Page sections (Hero, Stats, About, Skills,
                        Experience, Projects, CaseStudies, Contact, Footer)
  components/           Reusable UI:
    Navbar.tsx            Sticky header with iconed nav links
    KubeAIBackground.tsx  Canvas Kubernetes/AI node-graph backdrop
    SkillTerminal.tsx     Interactive terminal (ls/cat/kubectl/… commands)
    TechIcon.tsx          Tech-name → inline-SVG logo mapper
    Reveal / SectionHeading / Typewriter / Footer
```

### Notable pieces

- **`KubeAIBackground`** — an HTML5 Canvas animation (drifting node graph +
  signal pulses + a faint Kubernetes helm wheel). It is DPR-aware, uses
  delta-time motion so uneven frames do not stutter, honors
  `prefers-reduced-motion`, and mounts only after the hero entrance completes so
  it never contends with first paint.
- **`SkillTerminal`** — a fake but interactive shell rendered in the Skills
  section. Commands: `help`, `whoami`, `ls [category]`, `cat <skill>`, `levels`,
  `kubectl get pods` (lists projects as pods), `contact`, `sudo` (easter egg),
  `clear`. It is purely client-side; there is no real shell behind it.
- **`TechIcon`** — maps technology names to inline brand SVGs (react-icons)
  with Lucide fallbacks for non-brand concepts.

### Zero-external-asset constraint

Everything the browser loads is served from our own origin — no third-party CDNs,
fonts, or scripts:

- **Fonts** are self-hosted via `@fontsource` (Inter + JetBrains Mono) and bundled.
- **Icons/logos** are inline SVG (`lucide-react`, `react-icons`), not remote images.

This keeps the site fully self-contained, avoids third-party requests, and is
compatible with a strict Content-Security-Policy on CloudFront.

---

## 3. Hosting & infrastructure (Terraform)

Provisioned by `infra/*.tf`. Two AWS providers are configured: the default region
(`ap-south-1`, Mumbai) for S3/Route 53/IAM, and a `us-east-1` alias required for
the CloudFront ACM certificate.

| Resource | File | Purpose |
|---|---|---|
| `aws_s3_bucket` (+ public-access-block, versioning, policy) | `s3.tf` | Private origin bucket. Public access fully blocked; readable only by this CloudFront distribution. |
| `aws_cloudfront_distribution` + `origin_access_control` | `cloudfront.tf` | CDN with OAC (SigV4) to S3, HTTPS redirect, compression, `PriceClass_100`. SPA fallback: 403/404 → `/index.html` (200). |
| `aws_acm_certificate` (+ validation) | `acm.tf` | TLS cert for apex + `www`, in `us-east-1`, DNS-validated. |
| `aws_route53_zone` + alias records | `route53.tf` | Hosted zone; A/AAAA alias records for apex and `www` → CloudFront. |
| `aws_iam_role` + policy, `data` OIDC provider | `iam-oidc.tf` | Least-privilege GitHub Actions deploy role. |

### Networking, DNS & TLS

- The domain is **registered at Hostinger**; DNS is **delegated to Route 53** by
  pointing the domain's nameservers at the four `awsdns` hosts output by
  Terraform (`route53_nameservers`).
- Route 53 serves **alias A/AAAA** records for both the apex and `www`, pointing
  at the CloudFront distribution.
- ACM issues a single certificate covering the apex and `www`, validated by DNS
  records that Terraform writes into the hosted zone. CloudFront terminates TLS
  (min TLS 1.2) and redirects HTTP → HTTPS.

### SPA routing on a static origin

CloudFront maps origin `403`/`404` responses to `/index.html` with a `200`. This
lets client-side/deep-link paths resolve to the app shell instead of an S3 error.

---

## 4. Security model

- **Private origin.** S3 Block Public Access is fully on. The bucket policy grants
  `s3:GetObject` **only** to the CloudFront distribution (matched by its ARN via
  `AWS:SourceArn`) using OAC. The bucket is never directly reachable.
- **No long-lived cloud keys.** GitHub Actions authenticates to AWS with a
  short-lived **OIDC** token. The trust policy restricts assumption to this repo
  and the `main` branch (`repo:ReyKTBFFH/portfolio:ref:refs/heads/main`).
- **Least-privilege deploy role.** The role can only sync objects to this bucket
  and create/read invalidations on this distribution — nothing else.
- **Shared account resource.** The GitHub OIDC provider is an account-level
  singleton, so it is referenced as a Terraform `data` source (not managed here);
  destroying this stack cannot delete a provider other stacks may rely on.
- **Self-contained frontend.** No third-party asset requests (see §2), which
  shrinks the attack surface and is CSP-friendly.

---

## 5. CI/CD

Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

Trigger: push to `main` (or manual `workflow_dispatch`).

```
checkout → setup-node (22, npm cache) → npm ci → npm run build
        → configure-aws-credentials (OIDC, assume deploy role)
        → aws s3 sync dist/ s3://<bucket> --delete
        → aws cloudfront create-invalidation --paths "/*"
```

- **Concurrency:** a `deploy-portfolio` group with `cancel-in-progress` ensures
  only the latest push deploys; superseded runs are cancelled.
- **Secrets/config** (repo settings): `AWS_ROLE_ARN`, `S3_BUCKET`,
  `CLOUDFRONT_DISTRIBUTION_ID`. No AWS access keys are stored.
- A typical run takes ~30s end to end.

---

## 6. Cost

Roughly **~$1/month** plus domain registration:

| Item | Approx. cost |
|---|---|
| Route 53 hosted zone | $0.50/mo |
| S3 storage + requests | pennies (site is a few MB) |
| CloudFront | within free tier for typical portfolio traffic (1 TB / 10M req) |
| ACM certificate | free |
| Domain (Hostinger, `.cloud`) | annual registration |

---

## 7. Local development

```bash
npm install
npm run dev      # http://localhost:5173 (hot reload)
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build locally
```

Terraform (only when changing infrastructure):

```bash
cd infra
terraform init
terraform plan -out=tfplan
terraform apply tfplan
```

State is local by default; see the commented S3 backend block in
`infra/versions.tf` to move it remote.
```
