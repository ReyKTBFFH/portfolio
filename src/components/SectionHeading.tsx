import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="eyebrow mb-3">
        <span className="mr-1.5 text-cyan">$</span>
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-muted">{intro}</p>}
    </Reveal>
  );
}
