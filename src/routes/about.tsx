import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/haira/PageHeader";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | HAIRA Collections" },
      {
        name: "description",
        content:
          "HAIRA Collections curates women's ethnic and fashion wear — sarees, kurtis and dresses — with elegance in every thread. Shipping across India.",
      },
      { property: "og:title", content: "About HAIRA Collections" },
      {
        property: "og:description",
        content: "Our story: curated women's ethnic wear, crafted for everyday elegance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="About HAIRA Collections"
        subtitle={`${BRAND.tagline} — curated ethnic and fashion wear for the modern Indian woman.`}
      />
      <div className="container-haira grid gap-10 py-12 md:py-16 lg:grid-cols-2">
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          <p>
            HAIRA Collections began with a simple belief — that everyday clothing can feel
            special. We hand-pick sarees, kurtis and dresses from weavers and ateliers across
            India, choosing fabrics that drape beautifully and details that last.
          </p>
          <p>
            Every piece in our catalogue is checked for finish, fall and comfort before it reaches
            you. From breathable cottons for the everyday to embroidered festive silhouettes, our
            edit is small, deliberate and refreshed often.
          </p>
          <p>
            We ship across India and take orders over WhatsApp as well as through the website, so
            you always have a person to talk to about sizing, fabric or styling.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { t: "Curated, not mass produced", d: "A tight edit refreshed with new arrivals." },
            { t: "Quality checked", d: "Every order inspected before dispatch." },
            { t: "Shipping across India", d: "Free shipping on orders above ₹2,999." },
            { t: "Personal service", d: `Order or ask on WhatsApp: ${BRAND.whatsappDisplay}` },
          ].map((i) => (
            <div key={i.t} className="rounded-lg border border-border/60 bg-secondary/40 p-5">
              <h2 className="font-serif text-lg text-primary">{i.t}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
            </div>
          ))}
          <Link to="/shop" className="inline-block text-sm text-primary underline">
            Browse the collection
          </Link>
        </div>
      </div>
    </>
  );
}
