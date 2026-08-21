import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/haira/PageHeader";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/data/products";
import { waMessages, whatsappLink } from "@/lib/brand";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag | HAIRA Collections" },
      {
        name: "description",
        content:
          "Review the sarees, dresses and kurtis in your HAIRA Collections bag and check out, or place your order on WhatsApp.",
      },
      { property: "og:title", content: "Your Bag | HAIRA Collections" },
      { property: "og:description", content: "Review your HAIRA Collections order." },
      { property: "og:url", content: "/cart" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { entries, subtotal, shipping, total, setQuantity, removeLine } = useStore();

  return (
    <>
      <PageHeader eyebrow="Almost yours" title="Shopping Bag" />

      <div className="container-haira py-12 md:py-16">
        {entries.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-border/70 bg-card px-8 py-16 text-center shadow-[var(--shadow-soft)]">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blush/60 text-primary">
              <ShoppingBag className="h-6 w-6" />
            </span>
            <h2 className="mt-6 text-2xl">Your bag is waiting</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Nothing here yet. Browse the collection and add the pieces that catch your eye —
              they'll be saved for you.
            </p>
            <Button asChild className="mt-7 rounded-full px-8">
              <Link to="/shop" search={{}}>
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <ul className="space-y-4">
              {entries.map((e) => (
                <li
                  key={e.key}
                  className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-[var(--shadow-soft)] sm:grid-cols-[110px_minmax(0,1fr)]"
                >
                  <Link to="/product/$slug" params={{ slug: e.product.slug }} className="shrink-0">
                    <img
                      src={e.product.images[0]}
                      alt={e.product.name}
                      width={900}
                      height={1200}
                      loading="lazy"
                      className="aspect-3/4 w-full rounded-xl object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-col">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                      <div className="min-w-0">
                        <h2 className="truncate text-lg">
                          <Link
                            to="/product/$slug"
                            params={{ slug: e.product.slug }}
                            className="hover:text-primary"
                          >
                            {e.product.name}
                          </Link>
                        </h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {[e.color, e.size].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(e.key)}
                        aria-label={`Remove ${e.product.name}`}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button
                          type="button"
                          onClick={() => setQuantity(e.key, e.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="grid h-9 w-9 place-items-center rounded-l-full hover:bg-secondary"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm">{e.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(e.key, e.quantity + 1)}
                          aria-label="Increase quantity"
                          className="grid h-9 w-9 place-items-center rounded-r-full hover:bg-secondary"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-lg text-primary">{formatINR(e.lineTotal)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-[var(--shadow-soft)]">
                <h2 className="text-xl">Order Summary</h2>
                <dl className="mt-5 space-y-3 text-sm">
                  <Row label="Subtotal" value={formatINR(subtotal)} />
                  <Row label="Shipping" value={shipping === 0 ? "Free" : formatINR(shipping)} />
                  <div className="border-t border-border pt-3">
                    <Row label="Total" value={formatINR(total)} strong />
                  </div>
                </dl>
                <Button asChild size="lg" className="mt-6 w-full rounded-full">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="mt-3 w-full rounded-full bg-[#25D366] text-white hover:bg-[#1eb355]"
                >
                  <a
                    href={whatsappLink(waMessages.cart)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" /> Order via WhatsApp
                  </a>
                </Button>
                <Button asChild variant="ghost" className="mt-2 w-full rounded-full">
                  <Link to="/shop" search={{}}>
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={strong ? "text-base" : "text-muted-foreground"}>{label}</dt>
      <dd className={strong ? "text-lg text-primary" : ""}>{value}</dd>
    </div>
  );
}
