# Infrastructure

Static hosting for the portfolio: **private S3 bucket → CloudFront (OAC) → Route 53**,
with an ACM cert and a GitHub Actions OIDC deploy role. Cost is ~**$1/mo + domain**.

## One-time setup

1. **Register the domain in Route 53** (AWS console → Route 53 → Registered domains).
   This automatically creates the hosted zone the Terraform reads via a data source.
2. **Configure variables:**
   ```bash
   cd infra
   cp terraform.tfvars.example terraform.tfvars   # edit domain_name + github_repo
   ```
3. **Apply:**
   ```bash
   terraform init
   terraform plan
   terraform apply
   ```
   ACM DNS validation + CloudFront rollout can take 5–30 min on first apply.

## Wire up GitHub Actions

After `terraform apply`, read the outputs and add them to the GitHub repo
(**Settings → Secrets and variables → Actions**):

| Secret                        | From `terraform output`         |
| ----------------------------- | ------------------------------- |
| `AWS_ROLE_ARN`                | `github_actions_role_arn`       |
| `S3_BUCKET`                   | `s3_bucket`                     |
| `CLOUDFRONT_DISTRIBUTION_ID`  | `cloudfront_distribution_id`    |

Push to `main` → the workflow builds, syncs to S3, and invalidates CloudFront.

## First manual deploy (optional, before CI is wired)

```bash
npm run build
aws s3 sync dist/ "s3://$(terraform -chdir=infra output -raw s3_bucket)" --delete
aws cloudfront create-invalidation \
  --distribution-id "$(terraform -chdir=infra output -raw cloudfront_distribution_id)" \
  --paths "/*"
```

## Notes

- CloudFront + ACM are pinned to **us-east-1** (AWS requirement); everything else
  uses `var.aws_region`.
- SPA deep links work via CloudFront `custom_error_response` (403/404 → `/index.html`).
- If the account already has a GitHub OIDC provider, import it instead of creating
  a duplicate: `terraform import aws_iam_openid_connect_provider.github <arn>`.
