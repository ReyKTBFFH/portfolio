// Single source of truth for all portfolio content.
// Edit this file to update the site. Components read from here.

export const profile = {
  name: "Shreyansh Mishra",
  role: "DevSecOps & Kubernetes Engineer",
  roleTerms: ["Kubernetes", "DevOps", "Cloud", "Platform"] as const,
  tagline:
    "I run Kubernetes fleets, harden CI/CD, and ship AI workloads on infrastructure that doesn't wake me at 3am.",
  location: "Gurugram, Haryana, India",
  node: "gurugram-in",
  context: "production",
  availability: "Available",
  email: "shreyansh.mishra.pe@gmail.com",
  resumeUrl: "/Shreyansh-Mishra-Resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/shreyansh-mishra-891563327",
    github: "https://github.com/ReyKTBFFH",
  },
};

export const about = {
  summary: [
    "I'm a Senior Associate Consultant at Infosys specializing in DevSecOps and cloud automation. I design secure, scalable CI/CD pipelines with Azure DevOps and Terraform, enabling reliable cloud infrastructure provisioning while reducing manual effort and deployment risk.",
    "Much of my work centers on Kubernetes and Red Hat OpenShift — orchestrating containerized workloads, managing deployments, and building resilient infrastructure — alongside Docker, IaC, and AWS, all with a strong focus on security-by-design. I collaborate with cross-functional teams on vulnerability scanning, automated patch management, and secure pipeline integrations.",
    "Beyond core DevOps, I'm exploring the intersection of AI and infrastructure: agentic systems, LLM-powered tooling, and what it takes to make software genuinely AI-native.",
  ],
  highlights: [
    { value: "~60%", label: "Fewer failed production deployments" },
    { value: "~70%", label: "Shorter lead time for changes" },
    { value: "~40%", label: "Lower MTTD / MTTR" },
    { value: "99.9%", label: "Availability for critical services" },
  ],
};

// Guiding principles, shown as cards under the bio.
export const principles = [
  {
    icon: "shield" as const,
    title: "Security by design",
    description: "Bake scanning, patching, and least-privilege into the pipeline, not bolt them on after.",
  },
  {
    icon: "terminal" as const,
    title: "Automate everything",
    description: "If it's done twice by hand, it becomes a playbook. Reproducible beats heroic.",
  },
  {
    icon: "cpu" as const,
    title: "AI-native ops",
    description: "Bring agentic, LLM-powered tooling to monitoring and operations, with humans in the loop.",
  },
];

// Headline career numbers for the cluster health panel.
export const stats = [
  { value: "4+", label: "Years in production infra", source: "Infosys · Kyndryl · Paytm" },
  { value: "8000+", label: "Servers automated", source: "Kyndryl fleet automation" },
  { value: "2", label: "Clouds: AWS · Azure", source: "Multi-cloud production workloads" },
  { value: "20+", label: "Tools in daily use", source: "K8s · Terraform · Ansible · CI/CD" },
];

export type ProficiencyBand = "Expert" | "Advanced" | "Working" | "Learning";

export type Skill = {
  name: string;
  band: ProficiencyBand;
  context: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  icon: "cloud" | "container" | "terminal" | "shield" | "activity" | "cpu";
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "containers",
    title: "Containers & Orchestration",
    icon: "container",
    skills: [
      { name: "OpenShift", band: "Expert", context: "Cluster ops, RBAC, SCCs, Routes" },
      { name: "Kubernetes", band: "Expert", context: "Production fleets, Helm, GitOps" },
      { name: "Docker", band: "Expert", context: "Multi-stage builds, registry ops" },
      { name: "Helm", band: "Advanced", context: "Chart authoring, release management" },
    ],
  },
  {
    id: "iac",
    title: "IaC & Automation",
    icon: "terminal",
    skills: [
      { name: "Ansible", band: "Expert", context: "8000+ server fleet playbooks" },
      { name: "Terraform", band: "Advanced", context: "AWS/Azure multi-env provisioning" },
      { name: "Azure DevOps", band: "Advanced", context: "Gated CI/CD pipelines" },
      { name: "CI/CD", band: "Expert", context: "DevSecOps-integrated delivery" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Platforms",
    icon: "cloud",
    skills: [
      { name: "Linux", band: "Expert", context: "RHEL, CentOS, Ubuntu at scale" },
      { name: "Azure", band: "Advanced", context: "Hybrid cloud, AD integration" },
      { name: "AWS", band: "Advanced", context: "S3, CloudFront, IAM OIDC" },
    ],
  },
  {
    id: "security",
    title: "DevSecOps",
    icon: "shield",
    skills: [
      { name: "Automated Patching", band: "Advanced", context: "Fleet-wide patch orchestration" },
      { name: "CIS Hardening", band: "Advanced", context: "Baseline compliance automation" },
      { name: "SAST/DAST/VA", band: "Advanced", context: "Pipeline-embedded scanning" },
    ],
  },
  {
    id: "observability",
    title: "Observability",
    icon: "activity",
    skills: [
      { name: "Azure Monitor", band: "Advanced", context: "KQL alerting, AMA agents" },
      { name: "Grafana", band: "Advanced", context: "Dashboards, SLO tracking" },
      { name: "Nagios", band: "Working", context: "Production monitoring at scale" },
    ],
  },
  {
    id: "ai",
    title: "AI & Emerging",
    icon: "cpu",
    skills: [
      { name: "LLM Tooling", band: "Working", context: "Applied AI product builds" },
      { name: "Agentic AI", band: "Working", context: "Customer-service agents on cloud" },
    ],
  },
];

export type CompanyId = "infosys" | "kyndryl" | "paytm" | "break";

export type Experience = {
  company: string;
  companyId: CompanyId;
  role: string;
  period: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Infosys",
    companyId: "infosys",
    role: "Senior Associate Consultant",
    period: "Mar 2025 - Present",
    points: [
      "Administer and scale Red Hat OpenShift clusters supporting enterprise containerized workloads, managing projects, deployments, RBAC, and pod/node lifecycle to deliver resilient production environments.",
      "Managed application deployments and rolling updates on OpenShift using Deployments, Routes, and Helm charts, reducing failed production releases by ~60% and shortening lead time for changes by ~70% through automated rollout and rollback strategies.",
      "Enforced DevSecOps practices on OpenShift and Azure, including image vulnerability scanning, Security Context Constraints (SCCs), and automated patch management, decreasing security regressions and high-severity findings by ~70% before release.",
      "Managed IaC and configuration orchestration with Terraform and Ansible across OpenShift, Azure, and hybrid cloud environments, achieving >95% environment parity between staging and production and enabling reproducible, auditable deployments.",
      "Engineered observability and alerting for OpenShift and Azure workloads using Azure Monitor, Azure Monitor Agent (AMA), and KQL, reducing MTTD/MTTR by ~40% and cutting noisy alerts by ~50%.",
      "Automated Active Directory integration for Linux nodes underpinning the OpenShift platform (SSSD/realmd/PAM + Kerberos) using Ansible playbooks, reducing user onboarding from days to under an hour and lowering password-related helpdesk tickets by ~70%.",
      "Hardened and tuned the underlying Linux infrastructure (RHEL, Ubuntu, CentOS) supporting OpenShift and other production services, applying CIS-based hardening and kernel/security configs to achieve 99.9% availability for critical workloads.",
      "Improved incident outcomes and platform reliability by instituting runbooks, automated health checks, and post-incident RCA for OpenShift and cloud services, reducing recurrence of similar incidents by ~60% and shortening resolution time by ~45%.",
    ],
  },
  {
    company: "Kyndryl",
    companyId: "kyndryl",
    role: "Automation Engineer",
    period: "Oct 2023 - Mar 2025",
    points: [
      "Automated Linux admin tasks across 8000+ servers with Ansible (patch management, pre-checks, and storage snapshots), significantly reducing manual toil.",
      "Developed Ansible playbooks for CentOS→RHEL migrations, user management, and security tool integrations (CrowdStrike, QRadar).",
      "Monitored production systems with Nagios and Grafana and drove disaster-recovery automation for business continuity.",
    ],
  },
  {
    company: "Career Break",
    companyId: "break",
    role: "Upskilling & Learning",
    period: "May 2023 - Oct 2023",
    points: [
      "Took an intentional break to go deep on cloud-native and DevSecOps: Kubernetes, Terraform, CI/CD, and Linux hardening.",
      "Built hands-on labs and pipelines that led directly into automation-focused roles.",
    ],
  },
  {
    company: "Paytm",
    companyId: "paytm",
    role: "Software Engineer",
    period: "Jan 2021 - May 2023",
    points: [
      "Gained foundational container experience deploying and managing applications with Docker and Kubernetes.",
      "Managed Linux environments (CentOS, Ubuntu, RHEL) and VMware vSphere infrastructure, including HA and vSAN.",
      "Administered access control and implemented data backup and recovery systems.",
    ],
  },
];

export type DeploymentStatus = "Running" | "ContainerCreating";

export type Project = {
  name: string;
  category: string;
  description: string;
  tags: string[];
  stack: string[];
  url?: string;
  status: DeploymentStatus;
  ready: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "1Aarambh",
    category: "Recruitment Platform",
    description:
      "A hiring platform for startups and SMBs, connecting fast-growing teams with talent. Built and deployed on containerized, Kubernetes-backed infrastructure with automated CI/CD on AWS.",
    tags: ["Kubernetes", "Docker", "CI/CD", "AWS"],
    stack: ["K8s", "Docker", "AWS", "CI/CD"],
    url: "https://1aarambh.com",
    status: "Running",
    ready: "2/2",
    featured: true,
  },
  {
    name: "Vaacha",
    category: "Applied AI",
    description:
      "A customer-service AI agent for restaurants and food businesses, handling guest queries and support conversations. An LLM-powered, agentic product built under Nivaara Consulting.",
    tags: ["LLM", "Agentic AI", "Customer Support", "Cloud"],
    stack: ["LLM", "Agentic AI", "Cloud"],
    url: "https://vaacha.nivaaraconsulting.com",
    status: "ContainerCreating",
    ready: "1/2",
    featured: true,
  },
];

export type CaseStudy = {
  id: string;
  title: string;
  challenge: string;
  solution: string;
  impact: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "CHANGE-001",
    title: "Hardening the delivery pipeline",
    challenge:
      "Frequent failed production deployments and slow, risky releases were eroding delivery confidence.",
    solution:
      "Managed OpenShift deployments with Helm, Routes, and rolling updates, and enforced DevSecOps controls including image scanning, SCCs, and automated patch management.",
    impact:
      "~60% fewer failed releases, ~70% shorter lead time, and ~70% fewer high-severity findings before release.",
  },
  {
    id: "CHANGE-002",
    title: "Automation at fleet scale",
    challenge:
      "Manual administration across 8000+ Linux servers created enormous toil and inconsistency.",
    solution:
      "Built reusable Ansible playbooks for patching, pre-checks, storage snapshots, and CentOS→RHEL migrations.",
    impact:
      "Dramatically reduced manual effort, standardized fleet operations, and enabled auditable, repeatable changes.",
  },
  {
    id: "CHANGE-003",
    title: "Identity & access, automated",
    challenge:
      "Linux user onboarding took days and generated a steady stream of password-related helpdesk tickets.",
    solution:
      "Automated Active Directory integration for OpenShift platform nodes (SSSD/realmd/PAM + Kerberos) with reusable Ansible playbooks.",
    impact:
      "Onboarding dropped from days to under an hour and password-related tickets fell ~70%.",
  },
];

export type PlatformResource = {
  resource: string;
  type: string;
  detail: string;
};

export const platform = {
  pipeline: [
    "git push main",
    "GitHub Actions",
    "OIDC assume-role",
    "S3 sync",
    "CloudFront invalidation",
  ],
  resources: [
    {
      resource: "shreyanshmishra.cloud",
      type: "CloudFront + ACM",
      detail: "HTTPS, OAC, Route53 alias",
    },
    {
      resource: "origin bucket",
      type: "S3 (private)",
      detail: "Static SPA, no public access",
    },
    {
      resource: "deploy role",
      type: "IAM OIDC",
      detail: "No long-lived AWS keys",
    },
    {
      resource: "IaC",
      type: "Terraform",
      detail: "infra/ — S3, CloudFront, ACM, Route53",
    },
    {
      resource: "CI/CD",
      type: "GitHub Actions",
      detail: "npm ci → build → deploy on push to main",
    },
  ] satisfies PlatformResource[],
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Platform", href: "#platform" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];
