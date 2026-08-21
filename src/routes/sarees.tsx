import { createFileRoute } from "@tanstack/react-router";
import { CatalogueBrowser } from "@/components/haira/CatalogueBrowser";
import { PageHeader } from "@/components/haira/PageHeader";
import { products } from "@/data/products";

export const Route = createFileRoute("/sarees")({
  head: () => ({
    meta: [
      { title: "Sarees | Banarasi, Silk & Georgette — HAIRA Collections" },
      {
        name: "description",
        content:
          "Shop handwoven Banarasi, festive silk and light georgette sarees from HAIRA Collections. Premium drapes with shipping across India.",
      },
      { property: "og:title", content: "Sarees | HAIRA Collections" },
      {
        property: "og:description",
        content: "Banarasi, silk and georgette sarees for weddings, festivals and daytime events.",
      },
      { property: "og:url", content: "/sarees" },
    ],
    links: [{ rel: "canonical", href: "/sarees" }],
  }),
  component: SareesPage,
});

function SareesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Traditional elegance"
        title="Sarees"
        subtitle="Handwoven silks, festive zari and airy georgettes — traditional elegance for every occasion."
      />
      <div className="container-haira py-12 md:py-16">
        <CatalogueBrowser
          products={products.filter((p) => p.category === "sarees")}
          lockedCategory="sarees"
        />
      </div>
    </>
  );
}
