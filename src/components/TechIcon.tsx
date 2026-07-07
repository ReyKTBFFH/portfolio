import {
  SiKubernetes,
  SiDocker,
  SiHelm,
  SiAnsible,
  SiTerraform,
  SiLinux,
  SiGrafana,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";
import {
  Activity,
  Bot,
  Bug,
  Cloud,
  Cpu,
  Gauge,
  Headset,
  Infinity as InfinityIcon,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type IconCmp = React.ComponentType<{ size?: number | string; className?: string }>;

// Maps a technology/tag name (lowercased) to a self-contained inline-SVG logo.
// Real brand marks where they exist; a fitting Lucide glyph for concepts.
const MAP: Record<string, IconCmp> = {
  kubernetes: SiKubernetes,
  docker: SiDocker,
  helm: SiHelm,
  ansible: SiAnsible,
  terraform: SiTerraform,
  linux: SiLinux,
  grafana: SiGrafana,
  aws: FaAws,
  azure: VscAzure,
  "azure devops": VscAzureDevops,
  "azure monitor": Activity,
  nagios: Gauge,
  "ci/cd": InfinityIcon,
  "automated patching": RefreshCw,
  "cis hardening": ShieldCheck,
  "sast/dast/va": Bug,
  "llm tooling": Sparkles,
  llm: Sparkles,
  "agentic ai": Bot,
  "customer support": Headset,
  cloud: Cloud,
};

export default function TechIcon({
  name,
  size = 16,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = MAP[name.toLowerCase()] ?? Cpu;
  return <Icon size={size} className={className} />;
}
