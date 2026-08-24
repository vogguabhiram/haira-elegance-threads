import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, MessageCircle, ShoppingBag } from "lucide-react";
import { PageHeader } from "@/components/haira/PageHeader";
import { Button } from "@/components/ui/button";
import { BRAND, waMessages, whatsappLink } from "@/lib/brand";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account | HAIRA Collections" },
      {
        name: "description",
        content:
          "Your HAIRA Collections bag, wishlist and order help. Track an order or ask about sizing on WhatsApp.",
      },
      { property: "og:title", content: "My Account | HAIRA Collections" },
      { property: "og:description", content: "Your bag, wishlist and order support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { count, wishlist } = useStore();

  return (
    <>
      <PageHeader
        eyebrow="Your space"
        title="My Account"
        subtitle="Everything saved on this device, plus a direct line to us for order help."
      />
      <div className="container-haira grid gap-6 py-12 md:py-16 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-border/60 bg-secondary/40 p-6">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <h2 className="mt-3 font-serif text-xl text-primary">Shopping bag</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {count} {count === 1 ? "item" : "items"} in your bag.
          </p>
          <Button asChild variant="outline" className="mt-4 rounded-full">
            <Link to="/cart">View bag</Link>
          </Button>
        </div>

        <div className="rounded-lg border border-border/60 bg-secondary/40 p-6">
          <Heart className="h-5 w-5 text-primary" />
          <h2 className="mt-3 font-serif text-xl text-primary">Wishlist</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {wishlist.length} saved {wishlist.length === 1 ? "piece" : "pieces"}.
          </p>
          <Button asChild variant="outline" className="mt-4 rounded-full">
            <Link to="/wishlist">View wishlist</Link>
          </Button>
        </div>

        <div className="rounded-lg border border-border/60 bg-secondary/40 p-6">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h2 className="mt-3 font-serif text-xl text-primary">Order help</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Track an order or ask about sizing on {BRAND.whatsappDisplay}.
          </p>
          <Button asChild className="mt-4 rounded-full">
            <a href={whatsappLink(waMessages.general)} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}
