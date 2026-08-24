import { BadgeCheck, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { icon: Truck, title: "Free shipping over ₹999", note: "Delivered across India" },
  { icon: RefreshCcw, title: "7-day easy returns", note: "Hassle-free exchange" },
  { icon: ShieldCheck, title: "Secure checkout", note: "Cash on delivery available" },
  { icon: BadgeCheck, title: "Handpicked quality", note: "Checked before dispatch" },
];

export function TrustBadges({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <ul
      className={cn(
        "grid gap-3 sm:grid-cols-2",
        compact ? "lg:grid-cols-2" : "lg:grid-cols-4",
        className,
      )}
    >
      {items.map(({ icon: Icon, title, note }) => (
        <li
          key={title}
          className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-3 shadow-[var(--shadow-soft)]"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-primary">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">{title}</span>
            <span className="block truncate text-xs text-muted-foreground">{note}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
