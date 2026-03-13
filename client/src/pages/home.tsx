import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  GraduationCap,
  HandHeart,
  Leaf,
  MapPin,
  Recycle,
  ShieldCheck,
  ShoppingBag,
  Sun,
  Moon,
  Instagram,
  Linkedin,
  Facebook,
} from "lucide-react";

import heroTexture from "@/assets/images/rsq-hero-texture.png";
import binPhoto from "@/assets/images/rsq-bin-attached.png";
import logoMark from "@/assets/images/rsq-logo.png";
import mapPlaceholder from "@/assets/images/rsq-map-placeholder.png";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function useThemeMode() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("rsq-theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;

    const initial = (stored === "dark" || stored === "light")
      ? (stored as "light" | "dark")
      : prefersDark
        ? "dark"
        : "light";

    setMode(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  function toggle() {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      window.localStorage.setItem("rsq-theme", next);
      return next;
    });
  }

  return { mode, toggle };
}

const partners = [
  {
    title: "Municipalities",
    icon: Building2,
    points: [
      "Reduce waste collection costs by diverting textiles from landfill.",
      "Show residents a meaningful commitment to sustainability.",
      "No upfront or ongoing cost; minimal municipal resources required.",
    ],
  },
  {
    title: "Retail Businesses",
    icon: ShoppingBag,
    points: [
      "Well-maintained bins can drive incremental retail traffic.",
      "Recycling programs signal sustainability to customers.",
      "Donors often shop in a replacement mindset after donating.",
    ],
  },
  {
    title: "Educational Institutions",
    icon: GraduationCap,
    points: [
      "Support school fundraising initiatives through community programs.",
      "Engage students around a circular economy mindset.",
      "Make sustainability visible and actionable on campus.",
    ],
  },
  {
    title: "Non‑Profit Organizations",
    icon: HandHeart,
    points: [
      "Partner on community-driven collection initiatives.",
      "Increase reuse and responsible recycling outcomes.",
      "Strengthen local impact with practical sustainability infrastructure.",
    ],
  },
] as const;

const acceptedItems = [
  "Clean used clothing (shirts, pants, skirts, dresses)",
  "Jackets, coats, sweaters",
  "Hats, scarves, gloves",
  "Shoes, boots, sandals (wearable)",
  "Belts, ties, handbags",
  "Socks, pajamas, swimwear",
  "Baby, children, teen, adult clothing",
  "Uniforms, workwear, activewear",
  "Blankets, towels, bed linens",
  "Curtains, drapes, tablecloths",
  "Fabric scraps & sewing materials",
  "Even imperfect items (one sock, small holes, rips)",
] as const;

const notAccepted = [
  "Wet, mouldy, or soiled items",
  "Single shoes",
  "Electronics",
  "Food, beverages, medication",
  "Furniture, appliances, household goods",
  "Books, magazines, printed materials",
  "Hazardous materials",
  "Toys or non-textile items",
] as const;

function Nav() {
  const { mode, toggle } = useThemeMode();

  return (
    <header
      className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur"
      data-testid="header-site"
    >
      <div className="rsq-container flex h-16 items-center justify-between">
        <a
          href="#top"
          className="rsq-focus flex items-center gap-2"
          data-testid="link-home"
        >
          <div
            className="grid h-9 w-9 place-items-center rounded-xl border bg-card shadow-xs"
            data-testid="logo-mark"
          >
            <img
              src={logoMark}
              alt="Renewal Squared logo"
              className="h-6 w-6"
              data-testid="img-logo"
            />
          </div>
          <div className="leading-tight">
            <div className="font-serif text-[15px] font-semibold" data-testid="text-brand">
              renewal squared
            </div>
            <div
              className="text-xs text-muted-foreground"
              data-testid="text-brand-tagline"
            >
              clothing reuse + recycling
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex" data-testid="nav-links">
          <a className="rsq-focus text-sm text-foreground/80 hover:text-foreground" href="#what" data-testid="link-what">
            What we do
          </a>
          <a className="rsq-focus text-sm text-foreground/80 hover:text-foreground" href="#partners" data-testid="link-partners">
            Partnerships
          </a>
          <a className="rsq-focus text-sm text-foreground/80 hover:text-foreground" href="#how" data-testid="link-how">
            Where it goes
          </a>
          <a className="rsq-focus text-sm text-foreground/80 hover:text-foreground" href="#accepted" data-testid="link-accepted">
            Accepted items
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex" data-testid="header-social">
            <a
              className="rsq-focus inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-card shadow-xs hover-elevate"
              href="https://www.instagram.com/wix"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              data-testid="link-header-instagram"
            >
              <Instagram className="h-5 w-5" strokeWidth={2} />
            </a>
            <a
              className="rsq-focus inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-card shadow-xs hover-elevate"
              href="https://www.linkedin.com/company/wix-com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              data-testid="link-header-linkedin"
            >
              <Linkedin className="h-5 w-5" strokeWidth={2} />
            </a>
            <a
              className="rsq-focus inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-card shadow-xs hover-elevate"
              href="https://www.facebook.com/wix"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              data-testid="link-header-facebook"
            >
              <Facebook className="h-5 w-5" strokeWidth={2} />
            </a>
          </div>

          <button
            type="button"
            onClick={toggle}
            className="rsq-focus inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-card shadow-xs hover-elevate"
            data-testid="button-theme-toggle"
            aria-label="Toggle theme"
          >
            {mode === "dark" ? (
              <Sun className="h-5 w-5" strokeWidth={2} />
            ) : (
              <Moon className="h-5 w-5" strokeWidth={2} />
            )}
          </button>
          <a href="#contact" data-testid="button-contact-cta">
            <Button className="rounded-xl" data-testid="button-contact">
              Contact
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="rsq-card hover-elevate rounded-2xl px-5 py-4"
      data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="font-serif text-2xl font-semibold" data-testid={`stat-value-${label}`}
      >
        {value}
      </div>
      <div className="mt-1 text-sm text-muted-foreground" data-testid={`stat-label-${label}`}
      >
        {label}
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : ""
      )}
      data-testid={`section-${eyebrow.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div
        className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground shadow-2xs"
        data-testid="pill-eyebrow"
      >
        <Leaf className="h-3.5 w-3.5 text-primary" strokeWidth={2.25} />
        <span data-testid="text-eyebrow">{eyebrow}</span>
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl" data-testid="text-title">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base text-muted-foreground" data-testid="text-description">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="rsq-gradient rsq-noise relative overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 opacity-70" aria-hidden="true">
        <img
          src={heroTexture}
          alt=""
          className="h-full w-full object-cover"
          data-testid="img-hero-texture"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/65 to-background" />
      </div>

      <div className="rsq-container relative z-10 pt-16 pb-12 sm:pt-24 sm:pb-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            data-testid="hero-left"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1 text-xs text-foreground/80 shadow-xs"
              data-testid="pill-impact"
            >
              <BadgeCheck className="h-4 w-4 text-primary" strokeWidth={2.25} />
              <span data-testid="text-impact">
                Renewal Squared has diverted <strong>2.1 million pounds</strong> of clothing and textiles from landfills.
              </span>
            </div>

            <h1
              className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl"
              data-testid="text-hero-title"
            >
              Clothing reuse and recycling, built around communities.
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground" data-testid="text-hero-subtitle">
              We partner with municipalities, retail businesses, educational institutions, and non-profit organizations to implement
              community-driven clothing collection initiatives—and to help grow a circular economy mindset.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" data-testid="hero-cta">
              <a href="#what" data-testid="button-learn-more">
                <Button className="h-11 rounded-xl px-5" data-testid="button-learn">
                  Learn what we do
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a
                href="#contact"
                className="rsq-focus inline-flex h-11 items-center justify-center rounded-xl border bg-card px-5 text-sm shadow-xs hover-elevate"
                data-testid="button-contact-secondary"
              >
                Get in touch
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3" data-testid="grid-stats">
              <StatPill value="85%" label="Textiles currently landfilled" />
              <StatPill value="10%" label="Global carbon emissions" />
              <StatPill value="#2" label="Water consumer industry" />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            data-testid="hero-right"
          >
            <Card className="rsq-card overflow-hidden rounded-3xl" data-testid="card-mission">
              <div className="relative">
                <div className="absolute inset-0" aria-hidden="true">
                  <img
                    src={binPhoto}
                    alt="Clothing and textile recycling bin"
                    className="h-56 w-full object-cover"
                    data-testid="img-bin-hero"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/98 via-background/65 to-background/20" />
                </div>

                <div className="relative p-6 pt-40 sm:p-7 sm:pt-44">
                  <div
                    className="rounded-3xl border bg-card/55 p-5 shadow-sm backdrop-blur-md sm:p-6"
                    data-testid="panel-mission-frost"
                  >
                    <div className="flex items-center gap-3" data-testid="mission-header">
                      <div
                        className="grid h-11 w-11 place-items-center rounded-2xl bg-card/80 text-foreground shadow-xs ring-1 ring-border backdrop-blur"
                        data-testid="icon-mission"
                      >
                        <Leaf className="h-5 w-5 text-primary" strokeWidth={2.25} />
                      </div>
                      <div>
                        <div className="font-serif text-xl font-semibold" data-testid="text-mission-title">
                          Mission
                        </div>
                        <div className="text-sm text-muted-foreground" data-testid="text-mission-kicker">
                          Better systems, less waste.
                        </div>
                      </div>
                    </div>

                    <p className="mt-5 text-sm text-muted-foreground" data-testid="text-mission-body">
                      Reducing the amount of clothing and textiles ending up in landfills. We will leave the world a better place than we inherited it.
                    </p>

                    <div className="mt-6 grid gap-3" data-testid="mission-bullets">
                      {["Community-first programs", "No-cost implementation", "Circular economy outcomes"].map((t) => (
                        <div
                          key={t}
                          className="flex items-start gap-3 rounded-2xl border bg-background/50 p-4 backdrop-blur"
                          data-testid={`row-mission-${t.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" strokeWidth={2.25} />
                          <div className="text-sm" data-testid={`text-mission-${t}`}>
                            {t}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhatWeDo() {
  return (
    <section id="what" className="rsq-container py-14 sm:py-20" data-testid="section-what">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="What we do"
            title="A simple way to divert textiles from landfill."
            description="We implement convenient, well-maintained clothing and textile recycling bins and community collection programs—so reuse becomes the default."
          />
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2" data-testid="grid-what-cards">
            {[{
              title: "Community-driven collection",
              icon: Recycle,
              body: "We collaborate with partners to implement collection initiatives that fit real places and real people.",
            }, {
              title: "Lower environmental impact",
              icon: Leaf,
              body: "The fashion industry accounts for 10% of global carbon emissions—and textiles are often unnecessarily landfilled.",
            }, {
              title: "Clear, practical programs",
              icon: BadgeCheck,
              body: "No-cost implementation options and minimal burden on municipal or partner resources.",
            }, {
              title: "Circular economy mindset",
              icon: HandHeart,
              body: "We help communities shift from disposal to reuse and responsible recycling—one garment at a time.",
            }].map((c) => (
              <Card
                key={c.title}
                className="rsq-card rounded-3xl p-6 hover-elevate"
                data-testid={`card-what-${c.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-center gap-3" data-testid="what-card-header">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-muted" data-testid="what-card-icon">
                    <c.icon className="h-5 w-5 text-primary" strokeWidth={2.25} />
                  </div>
                  <div className="font-serif text-lg font-semibold" data-testid="what-card-title">
                    {c.title}
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground" data-testid="what-card-body">
                  {c.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Partnerships() {
  return (
    <section id="partners" className="border-t bg-card/40" data-testid="section-partners">
      <div className="rsq-container py-14 sm:py-20">
        <SectionHeading
          eyebrow="Partnerships"
          title="Designed to work with the people doing the work."
          description="A flexible program for municipalities, retail, schools, and non-profits—built to be easy to adopt and easy to maintain."
          align="center"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2" data-testid="grid-partners">
          {partners.map((p) => (
            <Card key={p.title} className="rsq-card rounded-3xl p-6 hover-elevate" data-testid={`card-partner-${p.title}`}>
              <div className="flex items-center gap-3" data-testid="partner-header">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-accent-foreground" data-testid="partner-icon">
                  <p.icon className="h-5 w-5" strokeWidth={2.25} />
                </div>
                <div className="font-serif text-lg font-semibold" data-testid="partner-title">
                  {p.title}
                </div>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground" data-testid={`list-partner-${p.title}`}>
                {p.points.map((pt, idx) => (
                  <li key={idx} className="flex gap-3" data-testid={`item-partner-${p.title}-${idx}`}>
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary/70" aria-hidden="true" />
                    <span data-testid={`text-partner-point-${p.title}-${idx}`}>{pt}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border bg-background/60 p-6 shadow-xs" data-testid="panel-locations">
          <div className="flex flex-col gap-6" data-testid="locations-wrap">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between" data-testid="locations-header">
              <div>
                <div className="flex items-center gap-2" data-testid="locations-title">
                  <MapPin className="h-4 w-4 text-primary" strokeWidth={2.25} />
                  <div className="font-serif text-lg font-semibold" data-testid="text-locations-title">
                    Our bin locations
                  </div>
                </div>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground" data-testid="text-locations-desc">
                  Placeholder for the dynamic map. This will become an interactive map with pins + a location drawer.
                </p>
              </div>
              <Button variant="secondary" className="h-11 rounded-xl" data-testid="button-locations">
                View map
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="rsq-card overflow-hidden rounded-3xl" data-testid="map-placeholder">
              <div className="relative" data-testid="map-placeholder-inner">
                <img
                  src={mapPlaceholder}
                  alt="Map preview placeholder"
                  className="h-[360px] w-full object-cover sm:h-[420px]"
                  data-testid="img-map-placeholder"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute left-4 top-4 flex items-center gap-2" data-testid="map-badges">
                  <div className="rounded-full border bg-card/70 px-3 py-1 text-xs text-foreground shadow-xs backdrop-blur" data-testid="badge-map-status">
                    Map (placeholder)
                  </div>
                  <div className="rounded-full border bg-card/70 px-3 py-1 text-xs text-muted-foreground shadow-xs backdrop-blur" data-testid="badge-map-note">
                    Dynamic pins coming next
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="rsq-container py-14 sm:py-20" data-testid="section-how">
      <SectionHeading
        eyebrow="Where it goes"
        title="Two pathways, one goal: maximize reuse."
        description="After collection, items follow a destination based on condition and market demand—with the aim of keeping textiles in use and out of the waste stream."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2" data-testid="grid-pathways">
        {[{
          title: "Domestic pathway",
          icon: Building2,
          body: "Items are sent to a processing facility in Ontario for sorting and grading. When feasible, they are sold within the domestic market to support local businesses and reduce the carbon footprint associated with exporting.",
        }, {
          title: "International pathway",
          icon: Recycle,
          body: "When domestic demand is limited, items may go to international buyers in regions with robust circular economies that can effectively resell, upcycle, or repurpose textiles.",
        }].map((c) => (
          <Card
            key={c.title}
            className="rsq-card rounded-3xl p-6 hover-elevate"
            data-testid={`card-pathway-${c.title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="flex items-center gap-3" data-testid="pathway-header">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-muted" data-testid="pathway-icon">
                <c.icon className="h-5 w-5 text-primary" strokeWidth={2.25} />
              </div>
              <div className="font-serif text-lg font-semibold" data-testid="pathway-title">
                {c.title}
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground" data-testid="pathway-body">
              {c.body}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border bg-card p-6 shadow-xs" data-testid="panel-market">
        <div className="flex items-start gap-3" data-testid="market-row">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-accent-foreground" data-testid="market-icon">
            <Leaf className="h-5 w-5" strokeWidth={2.25} />
          </div>
          <div>
            <div className="font-serif text-lg font-semibold" data-testid="market-title">
              Market conditions matter
            </div>
            <p className="mt-1 text-sm text-muted-foreground" data-testid="market-body">
              Destinations fluctuate based on demand, item quality, seasonal trends, and worldwide economic influences. The focus stays the same: keep textiles in use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AcceptedItems() {
  const [tab, setTab] = useState<"accepted" | "not">("accepted");

  const list = useMemo(() => (tab === "accepted" ? acceptedItems : notAccepted), [tab]);

  return (
    <section id="accepted" className="border-t bg-card/40" data-testid="section-accepted">
      <div className="rsq-container py-14 sm:py-20">
        <SectionHeading
          eyebrow="Accepted items"
          title="Clear guidance for cleaner collection."
          description="Help donors donate well. Here’s what can (and can’t) go into the clothing and textile recycling bins."
        />

        <div className="mt-8 flex flex-wrap items-center gap-2" data-testid="accepted-tabs">
          <button
            type="button"
            onClick={() => setTab("accepted")}
            className={cn(
              "rsq-focus inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm shadow-xs hover-elevate",
              tab === "accepted" ? "bg-primary text-primary-foreground border-primary/30" : "bg-card"
            )}
            data-testid="button-tab-accepted"
          >
            <BadgeCheck className="h-4 w-4" strokeWidth={2.25} />
            Accepted
          </button>
          <button
            type="button"
            onClick={() => setTab("not")}
            className={cn(
              "rsq-focus inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm shadow-xs hover-elevate",
              tab === "not" ? "bg-primary text-primary-foreground border-primary/30" : "bg-card"
            )}
            data-testid="button-tab-not-accepted"
          >
            <ShieldCheck className="h-4 w-4" strokeWidth={2.25} />
            Not accepted
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2" data-testid="grid-items">
          {list.map((t, idx) => (
            <div
              key={idx}
              className="rsq-card hover-elevate flex items-start gap-3 rounded-2xl px-5 py-4"
              data-testid={`row-item-${tab}-${idx}`}
            >
              <div
                className={cn(
                  "mt-0.5 grid h-9 w-9 place-items-center rounded-2xl",
                  tab === "accepted" ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
                )}
                data-testid={`icon-item-${tab}-${idx}`}
              >
                {tab === "accepted" ? (
                  <Leaf className="h-4 w-4" strokeWidth={2.25} />
                ) : (
                  <ShieldCheck className="h-4 w-4" strokeWidth={2.25} />
                )}
              </div>
              <div className="text-sm" data-testid={`text-item-${tab}-${idx}`}>{t}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3" data-testid="download-printable">
          <a
            className="rsq-link text-sm"
            href="#"
            onClick={(e) => e.preventDefault()}
            data-testid="link-download-printable"
          >
            Download a printable copy (add your PDF link)
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="rsq-container py-14 sm:py-20" data-testid="section-about">
      <SectionHeading
        eyebrow="About"
        title="We leave the world better than we inherited it."
        description="Renewal Squared partners with municipalities and private businesses to increase clothing reuse and recycling through community-based programs."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-3" data-testid="grid-about">
        <Card className="rsq-card rounded-3xl p-6 hover-elevate" data-testid="card-mission-long">
          <div className="font-serif text-lg font-semibold" data-testid="about-mission-title">Mission</div>
          <p className="mt-2 text-sm text-muted-foreground" data-testid="about-mission-body">
            Reducing the amount of clothing and textiles ending up in landfills. We will leave the world a better place than we inherited it.
          </p>
        </Card>
        <Card className="rsq-card rounded-3xl p-6 hover-elevate" data-testid="card-vision">
          <div className="font-serif text-lg font-semibold" data-testid="about-vision-title">Vision</div>
          <p className="mt-2 text-sm text-muted-foreground" data-testid="about-vision-body">
            Becoming Canada’s largest textile re-use and recycling company—diverting five million pounds from landfills while supporting school fund-raising initiatives and municipal reuse programs.
          </p>
        </Card>
        <Card className="rsq-card rounded-3xl p-6 hover-elevate" data-testid="card-values">
          <div className="font-serif text-lg font-semibold" data-testid="about-values-title">Principles</div>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground" data-testid="about-values-list">
            {["Transparent operations", "Community benefit", "Practical sustainability"].map((v, i) => (
              <li key={i} className="flex items-center gap-2" data-testid={`about-value-${i}`}>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/70" aria-hidden="true" />
                {v}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-10 rounded-3xl border bg-card p-6 shadow-xs" data-testid="team">
        <div className="flex items-center gap-2" data-testid="team-title">
          <HandHeart className="h-4 w-4 text-primary" strokeWidth={2.25} />
          <div className="font-serif text-lg font-semibold" data-testid="text-team-title">Meet the team</div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2" data-testid="grid-team">
          {[{
            name: "Trevor McCaw",
            role: "CEO",
            bio: "Founder of Frogbox, a sustainability-focused alternative to cardboard moving boxes, featured on Dragon’s Den. Has removed more than five million cardboard boxes from municipal waste streams across 20 cities in North America.",
          }, {
            name: "Darryl McCaw",
            role: "Head of Operations",
            bio: "Former Certified Financial Planner (CFP) and Sr. Financial Advisor. Brings deep experience in customer service, planning, community outreach, and operations.",
          }].map((p) => (
            <div key={p.name} className="rounded-3xl border bg-background/50 p-6" data-testid={`card-team-${p.name}`}>
              <div className="flex items-start justify-between gap-4" data-testid="team-header">
                <div>
                  <div className="font-serif text-xl font-semibold" data-testid="team-name">{p.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground" data-testid="team-role">{p.role}</div>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-muted" data-testid="team-avatar">
                  <Leaf className="h-5 w-5 text-primary" strokeWidth={2.25} />
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground" data-testid="team-bio">{p.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t" data-testid="section-contact">
      <div className="rsq-container py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contact"
              title="Let’s bring textile reuse to your community."
              description="Send a message and we’ll follow up. (This mockup doesn’t send email yet—just a polished UI for now.)"
            />

            <div className="mt-8 grid gap-4" data-testid="contact-details">
              <div className="rsq-card rounded-3xl p-5" data-testid="contact-card-details">
                <div className="flex items-center gap-2 text-sm" data-testid="contact-location">
                  <MapPin className="h-4 w-4 text-primary" strokeWidth={2.25} />
                  <span data-testid="text-location">Ontario, Canada</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm" data-testid="contact-note">
                  <Leaf className="h-4 w-4 text-primary" strokeWidth={2.25} />
                  <span data-testid="text-note">Community-driven programs for partners across Canada.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Card className="rsq-card rounded-3xl p-6 sm:p-7" data-testid="card-contact-form">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="grid gap-4"
                data-testid="form-contact"
              >
                <div className="grid gap-4 sm:grid-cols-2" data-testid="grid-name">
                  <div data-testid="field-first-name">
                    <label className="text-sm text-foreground/80" data-testid="label-first-name">First name</label>
                    <Input className="mt-2 h-11 rounded-xl" placeholder="First" data-testid="input-first-name" />
                  </div>
                  <div data-testid="field-last-name">
                    <label className="text-sm text-foreground/80" data-testid="label-last-name">Last name</label>
                    <Input className="mt-2 h-11 rounded-xl" placeholder="Last" data-testid="input-last-name" />
                  </div>
                </div>

                <div data-testid="field-email">
                  <label className="text-sm text-foreground/80" data-testid="label-email">Email</label>
                  <Input className="mt-2 h-11 rounded-xl" placeholder="you@organization.org" type="email" data-testid="input-email" />
                </div>

                <div data-testid="field-message">
                  <label className="text-sm text-foreground/80" data-testid="label-message">Message</label>
                  <Textarea className="mt-2 min-h-[120px] rounded-xl" placeholder="Tell us about your community or organization…" data-testid="input-message" />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" data-testid="row-submit">
                  <Button className="h-11 rounded-xl px-5" type="submit" data-testid="button-submit">
                    Submit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <div className="text-sm text-muted-foreground" data-testid="status-form">
                    Thanks for submitting! (mock)
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t" data-testid="footer-site">
      <div className="rsq-container py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground" data-testid="text-footer">
            © {new Date().getFullYear()} Renewal Squared. All rights reserved.
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6" data-testid="footer-links">
            <div className="flex items-center gap-4" data-testid="footer-nav">
              <a className="rsq-link text-sm" href="#what" data-testid="link-footer-what">What we do</a>
              <a className="rsq-link text-sm" href="#partners" data-testid="link-footer-partners">Partnerships</a>
              <a className="rsq-link text-sm" href="#contact" data-testid="link-footer-contact">Contact</a>
            </div>

            <div className="flex items-center gap-2" data-testid="footer-social">
              <a
                className="rsq-focus inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-card shadow-xs hover-elevate"
                href="https://www.instagram.com/wix"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                data-testid="link-social-instagram"
              >
                <Instagram className="h-5 w-5" strokeWidth={2} />
              </a>
              <a
                className="rsq-focus inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-card shadow-xs hover-elevate"
                href="https://www.linkedin.com/company/wix-com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                data-testid="link-social-linkedin"
              >
                <Linkedin className="h-5 w-5" strokeWidth={2} />
              </a>
              <a
                className="rsq-focus inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-card shadow-xs hover-elevate"
                href="https://www.facebook.com/wix"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                data-testid="link-social-facebook"
              >
                <Facebook className="h-5 w-5" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main data-testid="page-home">
      <Nav />
      <Hero />
      <WhatWeDo />
      <Partnerships />
      <HowItWorks />
      <AcceptedItems />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
