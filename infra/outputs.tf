output "route53_nameservers" {
  description = "Set these 4 as the domain's nameservers at Hostinger to delegate DNS."
  value       = aws_route53_zone.zone.name_servers
}

output "s3_bucket" {
  description = "Sync the built site here (aws s3 sync dist/ s3://<bucket>)."
  value       = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  description = "Used for cache invalidation after deploy."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "Default CloudFront URL (works before DNS propagates)."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "site_url" {
  value = "https://${var.domain_name}"
}

output "github_actions_role_arn" {
  description = "Set this as the AWS_ROLE_ARN secret/variable in GitHub."
  value       = aws_iam_role.gha_deploy.arn
}
