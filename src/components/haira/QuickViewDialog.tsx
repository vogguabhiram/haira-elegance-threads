import { Link } from "@tanstack/react-router";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StarRating } from "./StarRating";
import { discountPercent, formatINR, type Product } from "@/data/products";
import { waMessages, whatsappLink } from "@/lib/brand";
import { useStore } from "@/lib/store";

export function QuickViewDialog({
  product,
  onOpenChange,
}: {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { addToCart } = useStore();

  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-3xl">
        {product && (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">{product.name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 sm:grid-cols-2">
              <img
                src={product.images[0]}
                alt={product.name}
                width={900}
                height={1200}
                loading="lazy"
                className="aspect-3/4 w-full rounded-xl object-cover"
              />
              <div className="flex min-w-0 flex-col gap-4">
                <StarRating rating={product.rating} count={product.reviewCount} />
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-2xl text-primary">{formatINR(product.price)}</span>
                  {product.mrp > product.price && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        {formatINR(product.mrp)}
                      </span>
                      <span className="text-sm text-gold-foreground">
                        {discountPercent(product)}% off
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                <div className="mt-auto flex flex-col gap-2">
                  <Button
                    className="rounded-full"
                    onClick={() => {
                      addToCart(product.id, {
                        size: product.sizes[0],
                        color: product.colors[0],
                      });
                      toast.success("Added to bag", { description: product.name });
                      onOpenChange(false);
                    }}
                  >
                    <ShoppingBag className="h-4 w-4" /> Add to Cart
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <a
                      href={whatsappLink(waMessages.product(product.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" /> Order via WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="ghost" className="rounded-full">
                    <Link
                      to="/product/$slug"
                      params={{ slug: product.slug }}
                      onClick={() => onOpenChange(false)}
                    >
                      View full details
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}