import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { PageHeader } from "@/components/haira/PageHeader";
import { ProductGrid } from "@/components/haira/ProductGrid";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/data/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist | HAIRA Collections" },
      {
        name: "description",
        content: "The HAIRA Collections pieces you've saved for later.",
      },
      { property: "og:title", content: "Wishlist | HAIRA Collections" },
      { property: "og:description", content: "Pieces you've saved from HAIRA Collections." },
      { property: "og:url", content: "/wishlist" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/wishlist" }],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const items = wishlist.flatMap((id) => {
    const p = getProductById(id);
    return p ? [p] : [];
  });

  return (
    <>
      <PageHeader eyebrow="Saved for later" title="Your Wishlist" />
      <div className="container-haira py-12 md:py-16">
        {items.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-border/70 bg-card px-8 py-16 text-center shadow-[var(--shadow-soft)]">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blush/60 text-primary">
              <Heart className="h-6 w-6" />
            </span>
            <h2 className="mt-6 text-2xl">Nothing saved yet</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Tap the heart on any piece to keep it here while you decide.
            </p>
            <Button asChild className="mt-7 rounded-full px-8">
              <Link to="/shop" search={{}}>
                Browse the Collection
              </Link>
            </Button>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </>
  );
}
