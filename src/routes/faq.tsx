import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/haira/PageHeader";
import { BRAND } from "@/lib/brand";

const faqs = [
  {
    q: "How do I place an order?",
    a: "Add items to your bag and check out on the website, or send us the product on WhatsApp and we'll confirm your order there.",
  },
  {
    q: "Do you ship across India?",
    a: "Yes. We ship pan-India. Shipping is free on orders above ₹2,999; otherwise a flat ₹99 applies.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders are dispatched within 1–2 business days and usually arrive in 3–7 business days depending on your location.",
  },
  {
    q: "Can I exchange or return a piece?",
    a: "Yes, within 7 days of delivery for unused items with tags intact. See our Returns & Exchange page for details.",
  },
  {
    q: "How do I choose the right size?",
    a: `Each product page lists available sizes. If you're between sizes, message us on WhatsApp at ${BRAND.whatsappDisplay} and we'll help.`,
  },
  {
    q: "Are the colours accurate?",
    a: "We photograph in natural light, but slight variation can occur across screens.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | HAIRA Collections" },
      {
        name: "description",
        content:
          "Answers about ordering, shipping across India, delivery times, sizing, returns and exchanges at HAIRA Collections.",
      },
      { property: "og:title", content: "Frequently Asked Questions | HAIRA Collections" },
      { property: "og:description", content: "Ordering, shipping, sizing and returns explained." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="Help centre" title="FAQ" subtitle="Everything you might want to ask." />
      <div className="container-haira max-w-3xl py-12 md:py-16">
        <dl className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-lg border border-border/60 bg-secondary/40 p-5">
              <dt className="font-serif text-lg text-primary">{f.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
