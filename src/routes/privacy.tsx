import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/haira/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | HAIRA Collections" },
      {
        name: "description",
        content:
          "How HAIRA Collections collects, uses and protects the personal information you share while shopping with us.",
      },
      { property: "og:title", content: "Privacy Policy | HAIRA Collections" },
      { property: "og:description", content: "How we handle your personal information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Your data"
      title="Privacy Policy"
      subtitle="What we collect and how we use it."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "We collect the name, phone number, delivery address and order details you provide when placing an order or contacting us.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "Your information is used solely to process, pack and deliver orders, to respond to enquiries, and to share order updates.",
          ],
        },
        {
          heading: "Sharing",
          body: [
            "We share delivery details with our courier partners only. We never sell your information.",
          ],
        },
        {
          heading: "Local storage",
          body: [
            "Your shopping bag and wishlist are stored in your own browser so they persist between visits. They are not uploaded anywhere.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "For any privacy request, including deletion of your details, message us on WhatsApp.",
          ],
        },
      ]}
    />
  ),
});
