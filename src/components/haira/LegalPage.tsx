import { PageHeader } from "@/components/haira/PageHeader";

export interface LegalSection {
  heading: string;
  body: string[];
}

export function LegalPage({
  eyebrow,
  title,
  subtitle,
  sections,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader {...(eyebrow ? { eyebrow } : {})} title={title} {...(subtitle ? { subtitle } : {})} />
      <div className="container-haira max-w-3xl py-12 md:py-16">
        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-serif text-xl text-primary">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
