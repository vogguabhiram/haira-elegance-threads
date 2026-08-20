import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/haira-logo.png";
import { BRAND, waMessages, whatsappLink } from "@/lib/brand";

const shopLinks = [
  { to: "/sarees", label: "Sarees" },
  { to: "/dresses", label: "Dresses" },
  { to: "/kurtis", label: "Kurtis" },
  { to: "/ethnic-wear", label: "Ethnic Wear" },
  { to: "/new-arrivals", label: "New Arrivals" },
] as const;

const careLinks = [
  { to: "/contact", label: "Contact Us" },
  { to: "/shipping", label: "Shipping Information" },
  { to: "/returns", label: "Returns & Exchange" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms & Conditions" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-secondary/50">
      <div className="container-haira grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={logo}
            alt="HAIRA Collections logo"
            width={816}
            height={816}
            loading="lazy"
            className="h-14 w-14 object-contain"
          />
          <h3 className="mt-3 font-serif text-xl tracking-[0.14em] text-primary">
            HAIRA Collections
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{BRAND.tagline}.</p>
          <p className="mt-4 text-sm text-muted-foreground">{BRAND.shipping}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium tracking-[0.2em] uppercase">Shop</h3>
          <ul className="mt-4 space-y-2.5">
            {shopLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium tracking-[0.2em] uppercase">Customer Care</h3>
          <ul className="mt-4 space-y-2.5">
            {careLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium tracking-[0.2em] uppercase">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                href={whatsappLink(waMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <MessageCircle className="h-4 w-4 shrink-0" /> {BRAND.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Instagram className="h-4 w-4 shrink-0" /> @{BRAND.instagram}
              </a>
            </li>
            <li>
              <a
                href={BRAND.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <MapPin className="h-4 w-4 shrink-0" /> Find us on Google Maps
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <p className="container-haira py-5 text-center text-xs text-muted-foreground">
          © 2026 HAIRA Collections. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}