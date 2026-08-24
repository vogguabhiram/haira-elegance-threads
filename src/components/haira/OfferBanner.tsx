import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Rolling "ends at midnight" festive offer bar. Time is client-only to avoid hydration mismatch. */
export function OfferBanner() {
  const [left, setLeft] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1000);
      setLeft(`${pad(h)}:${pad(m)}:${pad(s)}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container-haira flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-[11px] tracking-[0.12em] uppercase sm:text-xs">
        <span className="inline-flex items-center gap-1.5 text-gold">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Festive Offer
        </span>
        <span className="opacity-90">Flat 10% off your first order · Code HAIRA10</span>
        <span className="hidden opacity-50 sm:inline" aria-hidden="true">
          |
        </span>
        <span className="font-medium tabular-nums text-gold">
          {left ? `Ends in ${left}` : "Ends tonight"}
        </span>
      </div>
    </div>
  );
}
