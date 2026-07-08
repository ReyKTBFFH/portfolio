import Reveal from "./Reveal";

export default function SectionHeading({
  section,
  label,
  title,
  intro,
}: {
  section: string;
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="eyebrow mb-3">
        <span className="mr-2 text-cyan">{section}</span>
        <span className="text-faint">/</span>
        <span className="ml-2 text-muted normal-case tracking-normal">{label}</span>
      </p>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-muted">{intro}</p>}
    </Reveal>
  );
}
