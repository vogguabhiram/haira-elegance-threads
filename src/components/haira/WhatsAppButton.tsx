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
      className="fixed bottom-5 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-[var(--shadow-lift)] transition-transform duration-300 hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Order on WhatsApp</span>
    </a>
  );
}