import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Heart, Minus, MessageCircle, Plus, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/haira/ProductCard";
import { SectionHeading } from "@/components/haira/SectionHeading";
import { StarRating } from "@/components/haira/StarRating";
import { StockMeter } from "@/components/haira/StockMeter";
import { TrustBadges } from "@/components/haira/TrustBadges";
import { Button } from "@/components/ui/button";
import { discountPercent, formatINR, getProductBySlug, products } from "@/data/products";
import { BRAND, waMessages, whatsappLink } from "@/lib/brand";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable | HAIRA Collections" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} | HAIRA Collections` },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: `${product.name} | HAIRA Collections` },
        { property: "og:description", content: product.description.slice(0, 155) },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/product/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            sku: product.sku,
            description: product.description,
            brand: { "@type": "Brand", name: "HAIRA Collections" },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "INR",
              availability:
                product.stock > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  const discount = discountPercent(product);
  const wished = isWishlisted(product.id);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const add = () => addToCart(product.id, { quantity, size, color });

  return (
    <>
      <div className="container-haira py-8 md:py-12">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/shop" search={{}} className="hover:text-primary">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <div className="group overflow-hidden rounded-2xl border border-border/70 bg-secondary">
              <img
                src={product.images[activeImage]}
                alt={`${product.name} — view ${activeImage + 1}`}
                width={900}
                height={1200}
                className="aspect-3/4 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="mt-4 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "overflow-hidden rounded-xl border-2 transition-colors",
                    i === activeImage ? "border-primary" : "border-transparent hover:border-border",
                  )}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    width={900}
                    height={1200}
                    loading="lazy"
                    className="h-20 w-16 object-cover sm:h-24 sm:w-20"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <p className="eyebrow">{product.category.replace("-", " ")}</p>
            <h1 className="mt-3 text-3xl md:text-4xl">{product.name}</h1>
            <div className="mt-3">
              <StarRating rating={product.rating} count={product.reviewCount} size={16} />
            </div>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl text-primary">{formatINR(product.price)}</span>
              {product.mrp > product.price && (
                <>
                  <span className="text-base text-muted-foreground line-through">
                    {formatINR(product.mrp)}
                  </span>
                  <span className="rounded-full bg-gold px-3 py-1 text-xs text-gold-foreground">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-7 space-y-5">
              <div>
                <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Colour</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      aria-pressed={color === c}
                      className={cn(
                        "rounded-full border px-4 py-2 text-xs transition-colors",
                        color === c
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Size</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      aria-pressed={size === s}
                      className={cn(
                        "min-w-12 rounded-full border px-4 py-2 text-xs transition-colors",
                        size === s
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  Quantity
                </h2>
                <div className="mt-3 inline-flex items-center rounded-full border border-border">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="grid h-11 w-11 place-items-center rounded-l-full hover:bg-secondary"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    aria-label="Increase quantity"
                    className="grid h-11 w-11 place-items-center rounded-r-full hover:bg-secondary"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="ml-3 text-xs text-muted-foreground">
                  {product.stock} in stock · SKU {product.sku}
                </span>
                <StockMeter stock={product.stock} className="mt-3 max-w-xs" />
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button
                size="lg"
                className="rounded-full"
                onClick={() => {
                  add();
                  toast.success("Added to bag", { description: product.name });
                }}
              >
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full"
                onClick={() => {
                  add();
                  navigate({ to: "/checkout" });
                }}
              >
                Buy Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  toggleWishlist(product.id);
                  toast(wished ? "Removed from wishlist" : "Saved to wishlist");
                }}
              >
                <Heart className={cn("h-4 w-4", wished && "fill-primary text-primary")} />
                {wished ? "In Wishlist" : "Add to Wishlist"}
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[#25D366] text-white hover:bg-[#1eb355]"
              >
                <a
                  href={whatsappLink(waMessages.order(product.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" /> Order via WhatsApp
                </a>
              </Button>
            </div>

            <p className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Truck className="h-4 w-4" /> {BRAND.shipping} · Free delivery on orders above ₹999
            </p>

            <TrustBadges compact className="mt-6" />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-secondary/40 py-16">
          <div className="container-haira">
            <SectionHeading eyebrow="You may also like" title="Complete the Look" />
            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
