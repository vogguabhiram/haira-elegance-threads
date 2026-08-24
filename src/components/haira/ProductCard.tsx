import { Link } from "@tanstack/react-router";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StarRating } from "./StarRating";
import { discountPercent, formatINR, type Product } from "@/data/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  onQuickView,
  compact = false,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
  compact?: boolean;
}) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const discount = discountPercent(product);
  const wished = isWishlisted(product.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <div className="relative overflow-hidden bg-secondary">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          aria-label={product.name}
          className="block"
        >
          <img
            src={product.images[0]}
            alt={`${product.name} — ${product.category.replace("-", " ")} by HAIRA Collections`}
            width={900}
            height={1200}
            loading="lazy"
            className="aspect-3/4 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {product.newArrival && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] text-primary-foreground">
              NEW
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-gold-foreground">
              {discount}% OFF
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            toggleWishlist(product.id);
            toast(wished ? "Removed from wishlist" : "Saved to wishlist");
          }}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-foreground backdrop-blur transition-colors hover:bg-card"
        >
          <Heart className={cn("h-4 w-4", wished && "fill-primary text-primary")} />
        </button>

        {onQuickView && (
          <div className="absolute inset-x-3 bottom-3 hidden translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
            <Button
              variant="secondary"
              size="sm"
              className="w-full rounded-full bg-card/95 backdrop-blur hover:bg-card"
              onClick={() => onQuickView(product)}
            >
              <Eye className="h-4 w-4" /> Quick View
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <p className="eyebrow truncate">{product.category.replace("-", " ")}</p>
        <h3 className="min-w-0 text-base leading-snug sm:text-lg">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="line-clamp-2 transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>
        {!compact && <StarRating rating={product.rating} count={product.reviewCount} />}
        <div className="mt-auto pt-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-base font-medium text-primary sm:text-lg">
              {formatINR(product.price)}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-muted-foreground line-through">
                {formatINR(product.mrp)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="mt-2 w-full rounded-full ring-1 ring-transparent transition-all duration-300 hover:ring-gold/40"
            onClick={() => {
              addToCart(product.id, {
                size: product.sizes[0],
                color: product.colors[0],
              });
              toast.success("Added to bag", { description: product.name });
            }}
          >
            <ShoppingBag className="h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}