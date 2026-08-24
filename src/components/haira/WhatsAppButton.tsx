import { useRouterState } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { waMessages, whatsappLink } from "@/lib/brand";

export function WhatsAppButton() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const message = pathname.startsWith("/cart") || pathname.startsWith("/checkout")
    ? waMessages.cart
    : waMessages.general;

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order via WhatsApp"
      className="group fixed bottom-5 right-4 z-50 flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-primary px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-primary-foreground opacity-0 shadow-[var(--shadow-lift)] ring-1 ring-gold/30 transition-all duration-500 ease-out group-hover:max-w-[14rem] group-hover:opacity-100 sm:inline">
        Order on WhatsApp
      </span>
      <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-gold shadow-[var(--shadow-lift)] ring-1 ring-gold/50 transition-transform duration-300 group-hover:scale-105 active:scale-95">
        <MessageCircle className="h-5 w-5" />
      </span>
    </a>
  );
}
