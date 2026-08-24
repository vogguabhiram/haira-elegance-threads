import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/haira/LegalPage";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping Information | HAIRA Collections" },
      {
        name: "description",
        content:
          "Shipping across India: dispatch in 1–2 business days, delivery in 3–7 days, free shipping above ₹2,999.",
      },
      { property: "og:title", content: "Shipping Information | HAIRA Collections" },
      { property: "og:description", content: "Delivery timelines and charges for orders in India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Delivery"
      title="Shipping Information"
      subtitle="How and when your order reaches you."
      sections={[
        {
          heading: "Where we ship",
          body: ["We ship to all serviceable pin codes across India."],
        },
        {
          heading: "Charges",
          body: [
            "Free shipping on orders above ₹2,999. A flat ₹99 shipping fee applies to orders below that value.",
          ],
        },
        {
          heading: "Dispatch & delivery",
          body: [
            "Orders are packed and dispatched within 1–2 business days.",
            "Delivery typically takes 3–7 business days depending on your location. Festive periods may add a day or two.",
          ],
        },
        {
          heading: "Tracking",
          body: [
            "Once dispatched, we share your tracking details on WhatsApp along with the courier name.",
          ],
        },
      ]}
    />
  ),
});
