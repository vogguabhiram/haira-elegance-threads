export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-b border-border/60 bg-secondary/40">
      <div className="container-haira py-12 text-center md:py-16">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 text-4xl md:text-5xl">{title}</h1>
        <div className="gold-rule mx-auto mt-4" />
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
