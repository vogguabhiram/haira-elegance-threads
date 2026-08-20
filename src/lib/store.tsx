import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getProductById, type Product } from "@/data/products";

export interface CartLine {
  productId: string;
  quantity: number;
  size?: string | undefined;
  color?: string | undefined;
}

export interface CartEntry extends CartLine {
  key: string;
  product: Product;
  lineTotal: number;
}

interface StoreValue {
  lines: CartLine[];
  entries: CartEntry[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  wishlist: string[];
  addToCart: (
    productId: string,
    opts?: {
      quantity?: number | undefined;
      size?: string | undefined;
      color?: string | undefined;
    },
  ) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  lastAddedAt: number;
}

const FREE_SHIPPING_ABOVE = 2999;
const SHIPPING_FEE = 99;

const StoreContext = createContext<StoreValue | null>(null);

const lineKey = (l: CartLine) => `${l.productId}::${l.size ?? ""}::${l.color ?? ""}`;

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [lastAddedAt, setLastAddedAt] = useState(0);

  useEffect(() => {
    setLines(readLS<CartLine[]>("haira.cart", []));
    setWishlist(readLS<string[]>("haira.wishlist", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("haira.cart", JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("haira.wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = useCallback<StoreValue["addToCart"]>((productId, opts) => {
    const next: CartLine = {
      productId,
      quantity: opts?.quantity ?? 1,
      size: opts?.size,
      color: opts?.color,
    };
    setLines((prev) => {
      const key = lineKey(next);
      const existing = prev.find((l) => lineKey(l) === key);
      if (existing) {
        return prev.map((l) =>
          lineKey(l) === key ? { ...l, quantity: l.quantity + next.quantity } : l,
        );
      }
      return [...prev, next];
    });
    setLastAddedAt(Date.now());
  }, []);

  const setQuantity = useCallback<StoreValue["setQuantity"]>((key, quantity) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => lineKey(l) !== key)
        : prev.map((l) => (lineKey(l) === key ? { ...l, quantity } : l)),
    );
  }, []);

  const removeLine = useCallback<StoreValue["removeLine"]>((key) => {
    setLines((prev) => prev.filter((l) => lineKey(l) !== key));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const toggleWishlist = useCallback<StoreValue["toggleWishlist"]>((productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  }, []);

  const value = useMemo<StoreValue>(() => {
    const entries: CartEntry[] = lines.flatMap((l) => {
      const product = getProductById(l.productId);
      if (!product) return [];
      return [{ ...l, key: lineKey(l), product, lineTotal: product.price * l.quantity }];
    });
    const subtotal = entries.reduce((sum, e) => sum + e.lineTotal, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;
    return {
      lines,
      entries,
      count: entries.reduce((sum, e) => sum + e.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      wishlist,
      addToCart,
      setQuantity,
      removeLine,
      clearCart,
      toggleWishlist,
      isWishlisted: (id: string) => wishlist.includes(id),
      lastAddedAt,
    };
  }, [lines, wishlist, addToCart, setQuantity, removeLine, clearCart, toggleWishlist, lastAddedAt]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}