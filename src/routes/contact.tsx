import { createFileRoute } from "@tanstack/react-router";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/haira/PageHeader";
import { BRAND, waMessages, whatsappLink } from "@/lib/brand";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | HAIRA Collections" },
      {
        name: "description",
        content:
          "Reach HAIRA Collections on WhatsApp +91 89783 63552 or Instagram @haira_collections_. Find our store location on Google Maps.",
      },
      { property: "og:title", content: "Contact HAIRA Collections" },
      {
        property: "og:description",
        content: "WhatsApp, Instagram and store location for HAIRA Collections.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="We'd love to hear from you"
        title="Contact Us"
        subtitle="Questions about sizing, fabric or an order? Message us and we'll reply quickly."
      />
      <div className="container-haira grid gap-8 py-12 md:py-16 lg:grid-cols-2">
        <ul className="space-y-4">
          <li>
            <a
              href={whatsappLink(waMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-lg border border-border/60 bg-secondary/40 p-5 transition-colors hover:border-primary/50"
            >
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                <span className="block font-medium">WhatsApp</span>
                <span className="text-sm text-muted-foreground">{BRAND.whatsappDisplay}</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-lg border border-border/60 bg-secondary/40 p-5 transition-colors hover:border-primary/50"
            >
              <Instagram className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                <span className="block font-medium">Instagram</span>
                <span className="text-sm text-muted-foreground">@{BRAND.instagram}</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href={BRAND.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-lg border border-border/60 bg-secondary/40 p-5 transition-colors hover:border-primary/50"
            >
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                <span className="block font-medium">Visit us</span>
                <span className="text-sm text-muted-foreground">Find us on Google Maps</span>
              </span>
            </a>
          </li>
        </ul>

        <div className="overflow-hidden rounded-lg border border-border/60">
          <iframe
            title="HAIRA Collections location map"
            src="https://www.google.com/maps?q=HAIRA%20Collections&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full border-0 lg:h-full"
          />
        </div>
      </div>
    </>
  );
}
