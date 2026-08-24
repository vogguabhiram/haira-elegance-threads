import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const ASSUMED_BATCH = 20;

/** Shows scarcity when stock is low, so shoppers act instead of postponing. */
export function StockMeter({ stock, className }: { stock: number; className?: string }) {
  if (stock <= 0) {
    return (
      <p className={cn("text-xs font-medium text-muted-foreground", className)}>Sold out</p>
    );
  }
  if (stock > 8) return null;

  const pct = Math.max(8, Math.round((stock / ASSUMED_BATCH) * 100));

  return (
    <div className={cn("space-y-1.5", className)}>
      <p className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
        <Flame className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
        {stock <= 3 ? `Only ${stock} left — almost gone` : `Selling fast · ${stock} left`}
      </p>
      <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gold transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
