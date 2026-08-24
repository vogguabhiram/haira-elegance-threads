import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/haira/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatINR } from "@/data/products";
import { BRAND, whatsappLink } from "@/lib/brand";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | HAIRA Collections" },
      {
        name: "description",
        content:
          "Confirm your HAIRA Collections order and place it over WhatsApp. Shipping across India, free above ₹2,999.",
      },
      { property: "og:title", content: "Checkout | HAIRA Collections" },
      { property: "og:description", content: "Review your bag and confirm your order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { entries, subtotal, shipping, total, clearCart } = useStore();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
  });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (entries.length === 0) return;
    const items = entries
      .map(
        (en) =>
          `• ${en.product.name}${en.size ? ` (${en.size})` : ""}${
            en.color ? ` / ${en.color}` : ""
          } × ${en.quantity} — ${formatINR(en.lineTotal)}`,
      )
      .join("\n");
    const message = [
      `Hello ${BRAND.name}, I'd like to place an order.`,
      "",
      items,
      "",
      `Subtotal: ${formatINR(subtotal)}`,
      `Shipping: ${shipping === 0 ? "Free" : formatINR(shipping)}`,
      `Total: ${formatINR(total)}`,
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}, ${form.city} - ${form.pincode}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    clearCart();
    toast.success("Order sent on WhatsApp — we'll confirm shortly.");
  };

  if (entries.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Almost there" title="Checkout" />
        <div className="container-haira py-16 text-center">
          <p className="text-muted-foreground">Your bag is empty.</p>
          <Button asChild className="mt-6 rounded-full px-8">
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Almost there"
        title="Checkout"
        subtitle="Share your delivery details — we confirm every order personally on WhatsApp."
      />
      <div className="container-haira grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_360px]">
        <form onSubmit={placeOrder} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" required value={form.name} onChange={set("name")} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                required
                inputMode="tel"
                value={form.phone}
                onChange={set("phone")}
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Delivery address</Label>
            <Textarea
              id="address"
              required
              value={form.address}
              onChange={set("address")}
              className="mt-2"
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="city">City / State</Label>
              <Input id="city" required value={form.city} onChange={set("city")} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="pincode">PIN code</Label>
              <Input
                id="pincode"
                required
                inputMode="numeric"
                value={form.pincode}
                onChange={set("pincode")}
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="notes">Order notes (optional)</Label>
            <Textarea id="notes" value={form.notes} onChange={set("notes")} className="mt-2" />
          </div>
          <Button type="submit" size="lg" className="w-full rounded-full">
            Place order on WhatsApp
          </Button>
          <p className="text-xs text-muted-foreground">
            We'll confirm availability, sizing and payment on {BRAND.whatsappDisplay}.
          </p>
        </form>

        <aside className="h-fit rounded-lg border border-border/60 bg-secondary/40 p-6">
          <h2 className="font-serif text-xl text-primary">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {entries.map((en) => (
              <li key={en.key} className="flex justify-between gap-3 text-sm">
                <span className="text-muted-foreground">
                  {en.product.name}
                  {en.size ? ` · ${en.size}` : ""} × {en.quantity}
                </span>
                <span>{formatINR(en.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 border-t border-border/60 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : formatINR(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-border/60 pt-3 text-base font-medium">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
