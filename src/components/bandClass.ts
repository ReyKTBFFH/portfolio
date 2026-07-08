import type { ProficiencyBand } from "../data/portfolio";

function bandClass(band: ProficiencyBand): string {
  switch (band) {
    case "Expert":
      return "status-badge-healthy";
    case "Advanced":
      return "status-badge-info";
    case "Working":
      return "status-badge-neutral";
    case "Learning":
      return "status-badge-warning";
    default: {
      const _exhaustive: never = band;
      return _exhaustive;
    }
  }
}

export { bandClass };
