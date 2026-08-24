import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/haira/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | HAIRA Collections" },
      {
        name: "description",
        content:
          "The terms that apply when you browse, order or receive products from HAIRA Collections.",
      },
      { property: "og:title", content: "Terms & Conditions | HAIRA Collections" },
      { property: "og:description", content: "Terms of use for the HAIRA Collections store." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="The fine print"
      title="Terms & Conditions"
      subtitle="Please read these before placing an order."
      sections={[
        {
          heading: "Orders",
          body: [
            "An order is confirmed only once we acknowledge it over WhatsApp or email. We may cancel an order if a product is out of stock, with a full refund.",
          ],
        },
        {
          heading: "Pricing",
          body: [
            "All prices are in Indian Rupees and inclusive of applicable taxes. Prices may change without notice, but never after an order is confirmed.",
          ],
        },
        {
          heading: "Product representation",
          body: [
            "Handloom and hand-embroidered pieces carry small natural variations. Screen colours may differ slightly from the actual fabric.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "All imagery, text and branding on this site belong to HAIRA Collections and may not be reused without permission.",
          ],
        },
      ]}
    />
  ),
});
