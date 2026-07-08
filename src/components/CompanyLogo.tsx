import { Calendar } from "lucide-react";
import type { CompanyId } from "../data/portfolio";

const logos: Record<Exclude<CompanyId, "break">, { label: string; color: string }> = {
  infosys: { label: "Infosys", color: "#007CC3" },
  kyndryl: { label: "Kyndryl", color: "#FF462D" },
  paytm: { label: "Paytm", color: "#00BAF2" },
};

export default function CompanyLogo({
  companyId,
  size = 40,
}: {
  companyId: CompanyId;
  size?: number;
}) {
  if (companyId === "break") {
    return (
      <span
        className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border bg-base/60 text-muted"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <Calendar size={size * 0.45} />
      </span>
    );
  }

  const { label, color } = logos[companyId];

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border bg-base/60 font-mono text-[10px] font-semibold uppercase tracking-tight"
      style={{ width: size, height: size, color }}
      aria-hidden="true"
      title={label}
    >
      {label.slice(0, 3)}
    </span>
  );
}
