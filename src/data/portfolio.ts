// Single source of truth for all portfolio content.
// Edit this file to update the site — components read from here.

export const profile = {
  name: "Shreyansh Mishra",
  role: "DevSecOps & Kubernetes Engineer",
  tagline: "Building secure, scalable cloud infrastructure — and AI-native tooling on top of it.",
  location: "Gurugram, Haryana, India",
  email: "shreyansh.mishra.pe@gmail.com",
  resumeUrl: "/Shreyansh-Mishra-Resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/shreyansh-mishra-891563327",
    github: "https://github.com/ReyKTBFFH",
  },
};

export const about = {
  summary: [
    "I'm a Senior Associate Consultant at Infosys specializing in DevSecOps and cloud automation. Much of my work centers on Kubernetes — orchestrating containerized workloads, managing deployments, and building resilient, self-healing infrastructure — alongside Docker, Terraform, and AWS, all with a strong focus on security-by-design.",
    "I design secure CI/CD pipelines, embed vulnerability scanning and automated patching into delivery, and help teams ship faster without compromising security. Lately I'm exploring the intersection of AI and infrastructure — agentic systems, LLM-powered tooling, and what it takes to make software genuinely AI-native.",
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
    description: "Bake scanning, patching, and least-privilege into the pipeline — not bolt them on after.",
  },
  {
    icon: "terminal" as const,
    title: "Automate everything",
    description: "If it's done twice by hand, it becomes a playbook. Reproducible beats heroic.",
  },
  {
    icon: "cpu" as const,
    title: "AI-native ops",
    description: "Bring agentic, LLM-powered tooling to monitoring and operations — with humans in the loop.",
  },
];

// Headline career numbers for the stats band.
export const stats = [
  { value: "4+", label: "Years in production infra" },
  { value: "8000+", label: "Servers automated" },
  { value: "2", label: "Clouds — AWS · Azure" },
  { value: "20+", label: "Tools & technologies" },
];

export type Skill = { name: string; level: number };
export type SkillCategory = {
  id: string;
  title: string;
  icon: "cloud" | "container" | "terminal" | "shield" | "activity" | "cpu";
  skills: Skill[];
};

// Proficiency is a self-assessment used by both the bars and the terminal explorer.
export const skillCategories: SkillCategory[] = [
  {
    id: "containers",
    title: "Containers & Orchestration",
    icon: "container",
    skills: [
      { name: "Kubernetes", level: 90 },
      { name: "Docker", level: 90 },
      { name: "Helm", level: 75 },
    ],
  },
  {
    id: "iac",
    title: "IaC & Automation",
    icon: "terminal",
    skills: [
      { name: "Ansible", level: 92 },
      { name: "Terraform", level: 88 },
      { name: "Azure DevOps", level: 88 },
      { name: "CI/CD", level: 90 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Platforms",
    icon: "cloud",
    skills: [
      { name: "Linux", level: 90 },
      { name: "Azure", level: 85 },
      { name: "AWS", level: 82 },
    ],
  },
  {
    id: "security",
    title: "DevSecOps",
    icon: "shield",
    skills: [
      { name: "Automated Patching", level: 88 },
      { name: "CIS Hardening", level: 85 },
      { name: "SAST/DAST/VA", level: 85 },
    ],
  },
  {
    id: "observability",
    title: "Observability",
    icon: "activity",
    skills: [
      { name: "Azure Monitor", level: 82 },
      { name: "Grafana", level: 80 },
      { name: "Nagios", level: 78 },
    ],
  },
  {
    id: "ai",
    title: "AI & Emerging",
    icon: "cpu",
    skills: [
      { name: "LLM Tooling", level: 70 },
      { name: "Agentic AI", level: 65 },
    ],
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Infosys",
    role: "Senior Associate Consultant",
    period: "Mar 2025 — Present",
    points: [
      "Built end-to-end CI/CD workflows in Azure DevOps that cut failed production deployments ~60% and lead time for changes ~70% via automated testing and gated releases.",
      "Embedded DevSecOps (SAST/DAST/VA + automated patching) into pipelines, decreasing high-severity findings ~70% before release.",
      "Managed IaC with Terraform and Ansible across Azure and hybrid cloud, achieving >95% staging/production parity with reproducible, auditable deployments.",
      "Engineered observability with Azure Monitor, AMA and KQL — cut MTTD/MTTR ~40% and noisy alerts ~50%.",
      "Automated Active Directory integration for Linux (SSSD/realmd/PAM + Kerberos), reducing user onboarding from days to under an hour.",
    ],
  },
  {
    company: "Kyndryl",
    role: "Automation Engineer",
    period: "Oct 2023 — Mar 2025",
    points: [
      "Automated Linux admin tasks across 8000+ servers with Ansible — patch management, pre-checks, and storage snapshots — significantly reducing manual toil.",
      "Developed Ansible playbooks for CentOS→RHEL migrations, user management, and security tool integrations (CrowdStrike, QRadar).",
      "Monitored production systems with Nagios and Grafana and drove disaster-recovery automation for business continuity.",
    ],
  },
  {
    company: "Career Break",
    role: "Upskilling & Learning",
    period: "May 2023 — Oct 2023",
    points: [
      "Took an intentional break to go deep on cloud-native and DevSecOps — Kubernetes, Terraform, CI/CD, and Linux hardening.",
      "Built hands-on labs and pipelines that led directly into automation-focused roles.",
    ],
  },
  {
    company: "Paytm",
    role: "Software Engineer",
    period: "Jan 2021 — May 2023",
    points: [
      "Gained foundational container experience deploying and managing applications with Docker and Kubernetes.",
      "Managed Linux environments (CentOS, Ubuntu, RHEL) and VMware vSphere infrastructure, including HA and vSAN.",
      "Administered access control and implemented data backup and recovery systems.",
    ],
  },
];

export type Project = {
  name: string;
  category: string;
  description: string;
  tags: string[];
  url?: string;
  status?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "1Aarambh",
    category: "Recruitment Platform",
    description:
      "A hiring platform for startups and SMBs — connecting fast-growing teams with talent. Built and deployed on containerized, Kubernetes-backed infrastructure with automated CI/CD on AWS.",
    tags: ["Kubernetes", "Docker", "CI/CD", "AWS"],
    url: "https://1aarambh.com",
    status: "Live",
    featured: true,
  },
  {
    name: "Vaacha",
    category: "Applied AI",
    description:
      "A customer-service AI agent for restaurants and food businesses — handling guest queries and support conversations. An LLM-powered, agentic product built under Nivaara Consulting.",
    tags: ["LLM", "Agentic AI", "Customer Support", "Cloud"],
    url: "https://vaacha.nivaaraconsulting.com",
    status: "In progress",
    featured: true,
  },
];

export type CaseStudy = {
  title: string;
  challenge: string;
  solution: string;
  impact: string;
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Hardening the delivery pipeline",
    challenge:
      "Frequent failed production deployments and slow, risky releases were eroding delivery confidence.",
    solution:
      "Rebuilt CI/CD in Azure DevOps with automated testing, gated releases, and DevSecOps controls (SAST/DAST/VA + automated patching).",
    impact:
      "~60% fewer failed deployments, ~70% shorter lead time, and ~70% fewer high-severity findings before release.",
  },
  {
    title: "Automation at fleet scale",
    challenge:
      "Manual administration across 8000+ Linux servers created enormous toil and inconsistency.",
    solution:
      "Built reusable Ansible playbooks for patching, pre-checks, storage snapshots, and CentOS→RHEL migrations.",
    impact:
      "Dramatically reduced manual effort, standardized fleet operations, and enabled auditable, repeatable changes.",
  },
  {
    title: "Identity & access, automated",
    challenge:
      "Linux user onboarding took days and generated a steady stream of password-related helpdesk tickets.",
    solution:
      "Automated Active Directory integration (SSSD/realmd/PAM + Kerberos) with reusable Ansible playbooks.",
    impact:
      "Onboarding dropped from days to under an hour and password-related tickets fell ~70%.",
  },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];
