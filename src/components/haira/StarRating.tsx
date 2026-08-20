import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  count,
  className,
  size = 14,
}: {
  rating: number;
  count?: number;
  className?: string;
  size?: number;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={cn(
              "shrink-0",
              i < Math.round(rating) ? "fill-gold text-gold" : "text-border",
            )}
          />
        ))}
      </span>
      <span className="text-xs text-muted-foreground">
        {rating.toFixed(1)}
        {count !== undefined ? ` (${count})` : ""}
      </span>
      <span className="sr-only">{`Rated ${rating} out of 5`}</span>
    </div>
  );
}