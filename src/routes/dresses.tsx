import { createFileRoute } from "@tanstack/react-router";
import { CatalogueBrowser } from "@/components/haira/CatalogueBrowser";
import { PageHeader } from "@/components/haira/PageHeader";
import { products } from "@/data/products";

export const Route = createFileRoute("/dresses")({
  head: () => ({
    meta: [
      { title: "Dresses | Party & Festive Wear — HAIRA Collections" },
      {
        name: "description",
        content:
          "Embroidered party dresses and festive gowns with an Indian touch, from HAIRA Collections. Shipping across India.",
      },
      { property: "og:title", content: "Dresses | HAIRA Collections" },
      {
        property: "og:description",
        content: "Modern silhouettes with ethnic detailing for parties and celebrations.",
      },
      { property: "og:url", content: "/dresses" },
    ],
    links: [{ rel: "canonical", href: "/dresses" }],
  }),
  component: DressesPage,
});

function DressesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Modern silhouettes"
        title="Dresses"
        subtitle="Modern styles with an Indian touch — embroidery, flow and detail made for celebrations."
      />
      <div className="container-haira py-12 md:py-16">
        <CatalogueBrowser
          products={products.filter((p) => p.category === "dresses")}
          lockedCategory="dresses"
        />
      </div>
    </>
  );
}
