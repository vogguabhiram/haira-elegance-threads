import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductGrid } from "./ProductGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  allColors,
  allSizes,
  categories,
  formatINR,
  searchProducts,
  type CategorySlug,
  type Product,
} from "@/data/products";
import { cn } from "@/lib/utils";

type Sort = "featured" | "new" | "price-asc" | "price-desc" | "best";

const sortLabels: Record<Sort, string> = {
  featured: "Featured",
  new: "New Arrivals",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  best: "Best Selling",
};

const MAX_PRICE = 12000;

export function CatalogueBrowser({
  products,
  initialQuery = "",
  lockedCategory,
}: {
  products: Product[];
  initialQuery?: string;
  lockedCategory?: CategorySlug;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<CategorySlug | "all">(lockedCategory ?? "all");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    let list = searchProducts(query, products);
    if (category !== "all") list = list.filter((p) => p.category === category);
    list = list.filter((p) => p.price <= maxPrice);
    if (size) list = list.filter((p) => p.sizes.includes(size));
    if (color) list = list.filter((p) => p.colors.includes(color));
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "new":
        sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
        break;
      case "best":
        sorted.sort(
          (a, b) => Number(b.bestSeller) - Number(a.bestSeller) || b.reviewCount - a.reviewCount,
        );
        break;
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
    }
    return sorted;
  }, [products, query, category, maxPrice, size, color, sort]);

  const reset = () => {
    setQuery("");
    if (!lockedCategory) setCategory("all");
    setMaxPrice(MAX_PRICE);
    setSize(null);
    setColor(null);
  };

  const filters = (
    <div className="space-y-7">
      {!lockedCategory && (
        <FilterBlock label="Category">
          <div className="flex flex-wrap gap-2">
            <Chip active={category === "all"} onClick={() => setCategory("all")}>
              All
            </Chip>
            {categories.map((c) => (
              <Chip key={c.slug} active={category === c.slug} onClick={() => setCategory(c.slug)}>
                {c.name}
              </Chip>
            ))}
          </div>
        </FilterBlock>
      )}

      <FilterBlock label={`Price — up to ${formatINR(maxPrice)}`}>
        <Slider
          value={[maxPrice]}
          min={1000}
          max={MAX_PRICE}
          step={500}
          onValueChange={(v) => setMaxPrice(v[0] ?? MAX_PRICE)}
          aria-label="Maximum price"
        />
      </FilterBlock>

      <FilterBlock label="Size">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <Chip key={s} active={size === s} onClick={() => setSize(size === s ? null : s)}>
              {s}
            </Chip>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock label="Colour">
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => (
            <Chip key={c} active={color === c} onClick={() => setColor(color === c ? null : c)}>
              {c}
            </Chip>
          ))}
        </div>
      </FilterBlock>

      <Button variant="ghost" className="w-full rounded-full" onClick={reset}>
        Clear all filters
      </Button>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-2xl border border-border/70 bg-card p-6 shadow-[var(--shadow-soft)]">
          {filters}
        </div>
      </aside>

      <div className="min-w-0">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sarees, silk saree, banarasi, kurtis…"
            aria-label="Search products"
            className="h-11 rounded-full"
          />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-11 shrink-0 rounded-full lg:hidden"
              onClick={() => setFiltersOpen((v) => !v)}
            >
              {filtersOpen ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
              Filters
            </Button>
            <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
              <SelectTrigger className="h-11 min-w-40 rounded-full" aria-label="Sort products">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(sortLabels) as Sort[]).map((k) => (
                  <SelectItem key={k} value={k}>
                    {sortLabels[k]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtersOpen && (
          <div className="mt-4 rounded-2xl border border-border/70 bg-card p-6 lg:hidden">
            {filters}
          </div>
        )}

        <p className="mt-5 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "product" : "products"}
        </p>

        <div className="mt-5">
          {results.length > 0 ? (
            <ProductGrid products={results} />
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-20 text-center">
              <h2 className="text-2xl">No products found</h2>
              <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
                We couldn't find anything matching that. Try a different word, or clear your filters
                to browse the full collection.
              </p>
              <Button className="mt-6 rounded-full px-8" onClick={reset}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs tracking-[0.2em] uppercase text-muted-foreground">{label}</h3>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background hover:border-primary/50 hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}
