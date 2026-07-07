terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40"
    }
  }

  # Optional: uncomment to store state remotely (recommended once bootstrapped).
  # backend "s3" {
  #   bucket = "your-tfstate-bucket"
  #   key    = "portfolio/terraform.tfstate"
  #   region = "ap-south-1"
  # }
}

# Default provider — S3 bucket, Route 53, IAM live here.
provider "aws" {
  region = var.aws_region
}

# CloudFront + its ACM certificate MUST be in us-east-1.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
