import { createFileRoute } from "@tanstack/react-router";
import { CatalogueBrowser } from "@/components/haira/CatalogueBrowser";
import { PageHeader } from "@/components/haira/PageHeader";
import { products } from "@/data/products";

export const Route = createFileRoute("/ethnic-wear")({
  head: () => ({
    meta: [
      { title: "Ethnic Wear | Anarkalis & Festive Sets — HAIRA Collections" },
      {
        name: "description",
        content:
          "Curated ethnic wear for weddings and festivals — Anarkalis, embellished sets and occasion pieces from HAIRA Collections.",
      },
      { property: "og:title", content: "Ethnic Wear | HAIRA Collections" },
      {
        property: "og:description",
        content: "Curated styles for celebrations and special occasions.",
      },
      { property: "og:url", content: "/ethnic-wear" },
    ],
    links: [{ rel: "canonical", href: "/ethnic-wear" }],
  }),
  component: EthnicWearPage,
});

function EthnicWearPage() {
  return (
    <>
      <PageHeader
        eyebrow="For the big days"
        title="Ethnic Wear"
        subtitle="Curated styles for celebrations and special occasions, from zari Anarkalis to embellished sets."
      />
      <div className="container-haira py-12 md:py-16">
        <CatalogueBrowser
          products={products.filter((p) => p.category === "ethnic-wear")}
          lockedCategory="ethnic-wear"
        />
      </div>
    </>
  );
}
