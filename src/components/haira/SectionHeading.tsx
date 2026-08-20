import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl md:text-4xl">{title}</h2>
      <div className={`gold-rule mt-4 ${align === "center" ? "mx-auto" : ""}`} />
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}