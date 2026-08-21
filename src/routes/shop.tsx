import { createFileRoute } from "@tanstack/react-router";
import { CatalogueBrowser } from "@/components/haira/CatalogueBrowser";
import { PageHeader } from "@/components/haira/PageHeader";
import { products } from "@/data/products";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? (search["q"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All | HAIRA Collections" },
      {
        name: "description",
        content:
          "Browse the full HAIRA Collections catalogue — sarees, dresses, kurtis and ethnic wear. Filter by category, price, size and colour.",
      },
      { property: "og:title", content: "Shop All | HAIRA Collections" },
      {
        property: "og:description",
        content: "Sarees, dresses, kurtis and ethnic wear with shipping across India.",
      },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { q } = Route.useSearch();

  return (
    <>
      <PageHeader
        eyebrow="The full collection"
        title="Shop All"
        subtitle="Every HAIRA piece in one place. Filter, sort and find the one that suits your occasion."
      />
      <div className="container-haira py-12 md:py-16">
        <CatalogueBrowser products={products} initialQuery={q ?? ""} />
      </div>
    </>
  );
}
