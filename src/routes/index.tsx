import { createFileRoute, Link } from "@tanstack/react-router";
import { Gem, Instagram, Sparkles, Truck, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import heroImg from "@/assets/hero.jpg";
import logo from "@/assets/haira-logo.png";
import { ProductCard } from "@/components/haira/ProductCard";
import { QuickViewDialog } from "@/components/haira/QuickViewDialog";
import { Reveal } from "@/components/haira/Reveal";
import { SectionHeading } from "@/components/haira/SectionHeading";
import { StarRating } from "@/components/haira/StarRating";
import { TrustBadges } from "@/components/haira/TrustBadges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, products, type Product } from "@/data/products";
import { BRAND } from "@/lib/brand";
import { testimonials } from "@/data/testimonials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HAIRA Collections | Women's Sarees, Dresses & Ethnic Wear" },
      {
        name: "description",
        content:
          "Shop elegant sarees, dresses, kurtis and women's ethnic wear from HAIRA Collections. Premium styles with shipping across India.",
      },
      {
        property: "og:title",
        content: "HAIRA Collections | Women's Sarees, Dresses & Ethnic Wear",
      },
      {
        property: "og:description",
        content:
          "Elegance in Every Thread — premium sarees, dresses and kurtis with shipping across India.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const benefits = [
  { icon: Gem, title: "Quality Fabrics", text: "Carefully selected fabrics and designs." },
  { icon: Sparkles, title: "Elegant Designs", text: "Styles created for modern Indian women." },
  { icon: Truck, title: "Shipping Across India", text: "Convenient delivery across India." },
  {
    icon: MessageCircle,
    title: "Easy WhatsApp Ordering",
    text: "Order directly through WhatsApp.",
  },
];

function Home() {
  const [quickView, setQuickView] = useState<Product | null>(null);
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Woman wearing a burgundy and gold Banarasi silk saree from HAIRA Collections"
          width={1920}
          height={1280}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[30%_center]"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden="true"
        />
        {/* Soft bottom blend into the cream page — removes the hard cut */}
        <div
          className="absolute inset-x-0 bottom-0 z-[1] h-32 bg-linear-to-t from-background to-transparent"
          aria-hidden="true"
        />
        <div className="container-haira relative flex min-h-[78dvh] items-center py-20 md:min-h-[86dvh]">
          <div className="max-w-xl text-primary-foreground [text-shadow:0_2px_18px_oklch(0.2_0.04_40/0.45)]">
            <p className="eyebrow text-gold">{BRAND.shipping}</p>
            <h1 className="mt-4 text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
              Elegance in Every Thread
            </h1>
            <div className="gold-rule mt-5" />
            <p className="mt-5 max-w-md text-base leading-relaxed text-primary-foreground/90 md:text-lg">
              Discover timeless ethnic wear designed to make every occasion special.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/shop">Shop Collection</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary-foreground/40 bg-primary-foreground/5 px-8 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/sarees">Explore Sarees</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="container-haira pt-10 md:pt-14">
        <Reveal>
          <TrustBadges />
        </Reveal>
      </section>

      {/* CATEGORIES */}
      <section className="container-haira py-16 md:py-24">
        <SectionHeading
          eyebrow="Curated for you"
          title="Shop by Category"
          subtitle="Four edits, each built around a different kind of occasion."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 80}>
              <Link
                to={`/${c.slug}` as "/sarees"}
                className="group relative block overflow-hidden rounded-2xl"
              >
                <img
                  src={c.image}
                  alt={`${c.name} collection`}
                  width={900}
                  height={1200}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-background">
                  <h3 className="text-2xl text-background">{c.name}</h3>
                  <p className="mt-1 text-sm text-background/80">{c.description}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase">
                    Shop Now
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="container-haira">
          <SectionHeading
            eyebrow="Handpicked"
            title="Featured Collection"
            subtitle="Pieces our customers keep coming back to, from festive silks to everyday cottons."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i, 6) * 60}>
                <ProductCard product={p} onQuickView={setQuickView} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="container-haira py-16 md:py-24">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <SectionHeading eyebrow="Just in" title="New Arrivals" align="left" />
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/new-arrivals">View All</Link>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {newArrivals.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <ProductCard product={p} onQuickView={setQuickView} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="container-haira">
          <SectionHeading eyebrow="Loved most" title="Our Best Sellers" />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {bestSellers.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ProductCard product={p} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="container-haira py-16 md:py-24">
        <SectionHeading eyebrow="The HAIRA promise" title="Why Choose HAIRA" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border/70 bg-card p-7 text-center shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blush/60 text-primary">
                  <b.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container-haira grid items-center gap-10 md:grid-cols-[auto_minmax(0,1fr)]">
          <Reveal>
            <div className="grid h-40 w-40 place-items-center rounded-full bg-primary-foreground/95 p-6">
              <img
                src={logo}
                alt="HAIRA Collections logo"
                width={816}
                height={816}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow text-primary-foreground/70">About HAIRA</p>
            <h2 className="mt-3 text-3xl text-primary-foreground md:text-4xl">Our Story</h2>
            <div className="gold-rule mt-4" />
            <p className="mt-5 max-w-2xl leading-relaxed text-primary-foreground/85">
              HAIRA Collections brings together timeless Indian elegance and contemporary fashion.
              From graceful sarees to stylish dresses and kurtis, we curate women's ethnic and
              fashion wear designed to make every occasion special.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-7 rounded-full border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/about">Read more</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-haira py-16 md:py-24">
        <SectionHeading eyebrow="Kind words" title="What Our Customers Say" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <figure className="h-full rounded-2xl border border-border/70 bg-card p-6 shadow-[var(--shadow-soft)]">
                <StarRating rating={t.rating} />
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  “{t.review}”
                </blockquote>
                <figcaption className="mt-5 text-sm font-medium">
                  {t.name}
                  <span className="ml-2 text-xs text-muted-foreground">{t.city}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="container-haira">
          <SectionHeading
            eyebrow={`@${BRAND.instagram}`}
            title="Follow HAIRA on Instagram"
            subtitle="Styling ideas, new drops and behind-the-scenes from the studio."
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {products.map((p, i) => (
              <a
                key={p.id}
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl"
                aria-label={`HAIRA Collections on Instagram — ${p.name}`}
              >
                <img
                  src={p.images[i % p.images.length]}
                  alt={`${p.name} styled by HAIRA Collections`}
                  width={900}
                  height={1200}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 grid place-items-center bg-foreground/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Instagram className="h-5 w-5 text-background" />
                </span>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild className="rounded-full px-8">
              <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4" /> Follow Us on Instagram
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-haira py-16 md:py-24">
        <Reveal className="mx-auto max-w-2xl rounded-3xl border border-border/70 bg-card p-8 text-center shadow-[var(--shadow-soft)] md:p-12">
          <h2 className="text-3xl">Stay in Style</h2>
          <div className="gold-rule mx-auto mt-4" />
          <p className="mt-4 text-sm text-muted-foreground">
            Get updates on new arrivals, exclusive collections and special offers.
          </p>
          <form
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget as HTMLFormElement).reset();
              toast.success("You're on the list", {
                description: "We'll be in touch with new arrivals.",
              });
            }}
          >
            <Input
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              className="h-12 rounded-full"
            />
            <Button type="submit" className="h-12 rounded-full px-8">
              Subscribe
            </Button>
          </form>
        </Reveal>
      </section>

      <QuickViewDialog product={quickView} onOpenChange={(o) => !o && setQuickView(null)} />
    </>
  );
}