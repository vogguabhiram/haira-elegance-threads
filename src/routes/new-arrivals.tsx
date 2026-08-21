import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/haira/PageHeader";
import { ProductGrid } from "@/components/haira/ProductGrid";
import { products } from "@/data/products";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals | HAIRA Collections" },
      {
        name: "description",
        content:
          "The latest sarees, kurtis and ethnic wear to land at HAIRA Collections. Fresh drops, shipped across India.",
      },
      { property: "og:title", content: "New Arrivals | HAIRA Collections" },
      {
        property: "og:description",
        content: "The newest pieces in the HAIRA Collections catalogue.",
      },
      { property: "og:url", content: "/new-arrivals" },
    ],
    links: [{ rel: "canonical", href: "/new-arrivals" }],
  }),
  component: NewArrivalsPage,
});

function NewArrivalsPage() {
  const list = products.filter((p) => p.newArrival);

  return (
    <>
      <PageHeader
        eyebrow="Just in"
        title="New Arrivals"
        subtitle="Freshly added to the studio rail — the newest weaves, prints and silhouettes."
      />
      <div className="container-haira py-12 md:py-16">
        <ProductGrid products={list} />
      </div>
    </>
  );
}
