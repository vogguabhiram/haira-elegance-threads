import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/haira-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/sarees", label: "Sarees" },
  { to: "/dresses", label: "Dresses" },
  { to: "/kurtis", label: "Kurtis" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count, wishlist, lastAddedAt } = useStore();
  const [bump, setBump] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!lastAddedAt) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [lastAddedAt]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/shop", search: { q: query || undefined } });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur transition-all duration-300",
        scrolled ? "bg-background/95 shadow-[var(--shadow-soft)]" : "bg-background/80",
      )}
    >
      <div
        className={cn(
          "container-haira grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 transition-all duration-300 lg:flex lg:justify-between",
          scrolled ? "py-2" : "py-3 md:py-4",
        )}
      >
        <button
          type="button"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <Menu className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link
          to="/"
          className="flex min-w-0 items-center justify-center gap-2 lg:justify-start"
          aria-label="HAIRA Collections home"
        >
          <img
            src={logo}
            alt="HAIRA Collections logo"
            width={816}
            height={816}
            className={cn(
              "shrink-0 object-contain transition-all duration-300",
              scrolled ? "h-9 w-9" : "h-11 w-11",
            )}
          />
          <span className="hidden truncate font-serif text-lg tracking-[0.18em] text-primary sm:inline md:text-xl">
            HAIRA <span className="text-foreground/70">Collections</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary after:w-full" }}
              className="relative py-1 text-sm tracking-wide text-foreground/80 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:text-primary hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search products"
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Link
            to="/account"
            aria-label="Account"
            className="hidden h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary sm:grid"
          >
            <User className="h-[18px] w-[18px]" />
          </Link>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative hidden h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary sm:grid"
          >
            <Heart className="h-[18px] w-[18px]" />
            {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
          </Link>
          <Link
            to="/cart"
            aria-label="Shopping bag"
            className={cn(
              "relative grid h-10 w-10 place-items-center rounded-full transition-all hover:bg-secondary",
              bump && "scale-115",
            )}
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && <Badge>{count}</Badge>}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border/60 bg-background">
          <form onSubmit={submitSearch} className="container-haira flex items-center gap-2 py-3">
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sarees, kurtis, dresses…"
              aria-label="Search products"
              className="h-11 rounded-full"
            />
            <Button type="submit" className="h-11 rounded-full px-6">
              Search
            </Button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full hover:bg-secondary"
            >
              <X className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <nav
          className="border-t border-border/60 bg-background lg:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="container-haira flex flex-col py-2">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-primary" }}
                  className="block border-b border-border/40 py-3 text-sm tracking-wide"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex gap-4 py-3">
              <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="text-sm">
                Wishlist ({wishlist.length})
              </Link>
              <Link to="/account" onClick={() => setMenuOpen(false)} className="text-sm">
                Account
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] leading-none text-primary-foreground">
      {children}
    </span>
  );
}