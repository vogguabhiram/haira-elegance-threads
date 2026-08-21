import { createFileRoute } from "@tanstack/react-router";
import { CatalogueBrowser } from "@/components/haira/CatalogueBrowser";
import { PageHeader } from "@/components/haira/PageHeader";
import { products } from "@/data/products";

export const Route = createFileRoute("/kurtis")({
  head: () => ({
    meta: [
      { title: "Kurtis | Cotton & Designer Sets — HAIRA Collections" },
      {
        name: "description",
        content:
          "Everyday cotton kurtis and designer kurti sets with palazzo and dupatta, from HAIRA Collections. Shipping across India.",
      },
      { property: "og:title", content: "Kurtis | HAIRA Collections" },
      {
        property: "og:description",
        content: "Elegant everyday and festive kurtis in breathable fabrics.",
      },
      { property: "og:url", content: "/kurtis" },
    ],
    links: [{ rel: "canonical", href: "/kurtis" }],
  }),
  component: KurtisPage,
});

function KurtisPage() {
  return (
    <>
      <PageHeader
        eyebrow="Everyday ease"
        title="Kurtis"
        subtitle="Elegant everyday and festive wear in breathable cottons and soft embroidered sets."
      />
      <div className="container-haira py-12 md:py-16">
        <CatalogueBrowser
          products={products.filter((p) => p.category === "kurtis")}
          lockedCategory="kurtis"
        />
      </div>
    </>
  );
}
