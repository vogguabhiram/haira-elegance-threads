import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/haira/LegalPage";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Exchange | HAIRA Collections" },
      {
        name: "description",
        content:
          "7-day returns and exchanges on unused HAIRA Collections pieces with tags intact. How to raise a request.",
      },
      { property: "og:title", content: "Returns & Exchange | HAIRA Collections" },
      { property: "og:description", content: "Our 7-day return and exchange policy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Peace of mind"
      title="Returns & Exchange"
      subtitle="Something not right? We'll make it easy."
      sections={[
        {
          heading: "Eligibility",
          body: [
            "Returns and exchanges are accepted within 7 days of delivery for unused, unwashed items with original tags and packaging intact.",
          ],
        },
        {
          heading: "How to raise a request",
          body: [
            "Message us on WhatsApp with your order details and a photo of the item. We'll confirm the request and arrange a pickup where available.",
          ],
        },
        {
          heading: "Refunds",
          body: [
            "Once the returned item passes a quality check, refunds are processed to the original payment method within 5–7 business days. Shipping fees are non-refundable.",
          ],
        },
        {
          heading: "Not eligible",
          body: [
            "Items marked final sale, custom-stitched pieces, and products damaged through use cannot be returned.",
          ],
        },
      ]}
    />
  ),
});
