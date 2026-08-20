import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { QuickViewDialog } from "./QuickViewDialog";
import { Reveal } from "./Reveal";
import type { Product } from "@/data/products";

export function ProductGrid({ products }: { products: Product[] }) {
  const [quickView, setQuickView] = useState<Product | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={Math.min(i, 6) * 60}>
            <ProductCard product={product} onQuickView={setQuickView} />
          </Reveal>
        ))}
      </div>
      <QuickViewDialog product={quickView} onOpenChange={(o) => !o && setQuickView(null)} />
    </>
  );
}