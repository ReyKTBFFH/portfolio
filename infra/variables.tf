variable "aws_region" {
  description = "Region for S3, Route 53 record management, and IAM."
  type        = string
  default     = "ap-south-1"
}

variable "domain_name" {
  description = "Apex domain for the portfolio, e.g. shreyansh.dev"
  type        = string
}

variable "include_www" {
  description = "Also serve www.<domain_name> and redirect it to the apex."
  type        = bool
  default     = true
}

variable "github_repo" {
  description = "GitHub repo allowed to deploy, in 'owner/name' form (for OIDC trust)."
  type        = string
}

variable "github_branch" {
  description = "Branch allowed to deploy."
  type        = string
  default     = "main"
}

variable "tags" {
  description = "Tags applied to all resources."
  type        = map(string)
  default = {
    Project   = "portfolio"
    ManagedBy = "terraform"
  }
}
