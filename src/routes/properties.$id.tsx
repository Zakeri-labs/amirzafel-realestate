import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getProperty, properties } from "@/lib/properties";
import { Bed, Bath, Car, Maximize, MapPin, ArrowLeft, Phone, Check } from "lucide-react";
import { useState } from "react";
import { CONTACT, waLink } from "@/lib/contact";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const property = getProperty(params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.property.title.en ?? "Property"} — Amirfazel Moshrefi` },
      { name: "description", content: loaderData?.property.description.en ?? "" },
      { property: "og:image", content: loaderData?.property.image ?? "" },
    ],
  }),
  errorComponent: ({ error }) => <div className="p-10">{error.message}</div>,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Link to="/properties" className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">Back</Link>
    </div>
  ),
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property } = Route.useLoaderData();
  const { t, i18n } = useTranslation();
  const lng = (i18n.language as "en" | "fa" | "ar") in property.title ? (i18n.language as "en" | "fa" | "ar") : "en";
  const [active, setActive] = useState(property.gallery[0]);
  const amenities = t("property.amenities", { returnObjects: true }) as string[];
  const related = properties.filter((p) => p.id !== property.id).slice(0, 3);

  const specs = [
    { icon: Bed, label: t("property.bedrooms"), value: property.beds },
    { icon: Bath, label: t("property.bathrooms"), value: property.baths },
    { icon: Car, label: t("property.parking"), value: property.parking },
    { icon: Maximize, label: t("property.area"), value: `${property.area.toLocaleString()} sqft` },
  ];

  return (
    <div className="bg-background">
      <Header />
      <div className="pt-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Link to="/properties" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4 rtl:rotate-180" /> {t("property.back")}
          </Link>

          {/* Gallery */}
          <div className="mt-6 grid gap-3 md:grid-cols-[3fr_1fr]">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl">
              <img src={active} alt={property.title[lng]} className="size-full object-cover" />
            </div>
            <div className="flex gap-3 md:flex-col">
              {property.gallery.map((g: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActive(g)}
                  className={`aspect-[4/3] flex-1 overflow-hidden rounded-xl ${active === g ? "ring-2 ring-primary" : ""}`}
                >
                  <img src={g} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Header info */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground/90">
                <MapPin className="size-4" /> {property.location[lng]}
                <span className="mx-2">·</span>
                <span>{t("property.reference")} {property.reference}</span>
              </div>
              <h1 className="mt-2 font-serif text-4xl md:text-5xl font-bold text-foreground">{property.title[lng]}</h1>
              <div className="mt-3 font-serif text-3xl font-bold text-primary">{property.price}</div>

              <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-6 md:grid-cols-4 shadow-sm">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="text-center">
                    <Icon className="mx-auto size-6 text-primary" />
                    <div className="mt-2 font-serif text-lg font-bold">{value}</div>
                    <div className="text-xs font-medium text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>

              <Section title={t("property.overview")}>
                <p className="leading-relaxed text-base font-medium text-muted-foreground/90">{property.description[lng]}</p>
              </Section>

              <Section title={t("property.details")}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Detail label={t("property.type")} value={property.type[lng]} />
                  <Detail label={t("property.area")} value={`${property.area.toLocaleString()} sqft`} />
                  <Detail label={t("property.bedrooms")} value={property.beds} />
                  <Detail label={t("property.bathrooms")} value={property.baths} />
                  <Detail label={t("property.parking")} value={property.parking} />
                  <Detail label={t("property.reference")} value={property.reference} />
                </div>
              </Section>

              <Section title={t("property.features")}>
                <div className="grid gap-2 sm:grid-cols-2">
                  {amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm">
                      <Check className="size-4 text-gold" /> {a}
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* Contact sidebar */}
            <aside className="self-start rounded-3xl border border-border bg-card p-8 lg:sticky lg:top-28 shadow-xl">
              <h3 className="font-serif text-2xl font-bold">{t("property.inquireTitle")}</h3>
              <p className="mt-2 text-sm font-medium text-muted-foreground">{t("property.inquireDesc")}</p>
              <form
                className="mt-8 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const name = fd.get("name");
                  const msg = fd.get("message");
                  const text = `${t("wa.greeting")} ${name ? `(${name})` : ""}\n\n${t("property.inquireTitle")}: ${property.title[lng]}\n${msg ?? ""}`;
                  window.open(waLink(text), "_blank", "noopener,noreferrer");
                }}
              >
                <input name="name" className="w-full rounded-xl border border-border bg-background px-4 py-4 text-sm font-medium outline-none focus:border-primary transition-all" placeholder={t("property.name")} />
                <input name="whatsapp" className="w-full rounded-xl border border-border bg-background px-4 py-4 text-sm font-medium outline-none focus:border-primary transition-all" placeholder={t("property.whatsapp")} />
                <input name="phone" className="w-full rounded-xl border border-border bg-background px-4 py-4 text-sm font-medium outline-none focus:border-primary transition-all" placeholder={t("property.phone")} />
                <textarea name="message" rows={4} className="w-full resize-none rounded-xl border border-border bg-background px-4 py-4 text-sm font-medium outline-none focus:border-primary transition-all" placeholder={t("property.message")} />
                <button className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-base font-bold text-white transition-all hover:bg-[#1ebe5d] hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#25D366]/20">
                  {t("property.send")}
                </button>
              </form>
              <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm font-bold text-muted-foreground">
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                  <svg viewBox="0 0 32 32" className="size-5 fill-[#25D366]" aria-hidden="true">
                    <path d="M16 3C9.4 3 4 8.4 4 15c0 2.3.7 4.5 1.9 6.4L4 29l7.8-2.1c1.8 1 3.9 1.6 6.2 1.6 6.6 0 12-5.4 12-12S22.6 3 16 3z" />
                  </svg>
                  <span dir="ltr" className="text-foreground">{CONTACT.whatsapp}</span>
                </a>
                <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                  <Phone className="size-5 text-primary" /> <span dir="ltr" className="text-foreground">{CONTACT.phone}</span>
                </a>
              </div>
            </aside>
          </div>

          {/* Related */}
          <div className="mt-20">
            <h2 className="font-serif text-3xl">{t("featured.title")}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((p) => <PropertyCardLite key={p.id} p={p} />)}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20"><Footer /></div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-12">
      <h2 className="font-serif text-2xl font-bold text-foreground">{title}</h2>
      <div className="my-5 h-1 w-12 bg-gold rounded-full" />
      {children}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between border-b border-border py-3 text-sm">
      <span className="text-muted-foreground font-medium">{label}</span>
      <span className="font-bold text-foreground">{value}</span>
    </div>
  );
}

function PropertyCardLite({ p }: { p: ReturnType<typeof getProperty> & {} }) {
  const { i18n } = useTranslation();
  const lng = (i18n.language as "en" | "fa" | "ar") in p.title ? (i18n.language as "en" | "fa" | "ar") : "en";
  return (
    <Link to="/properties/$id" params={{ id: p.id }} className="group block overflow-hidden rounded-xl bg-card shadow-sm hover:shadow-xl transition-all">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={p.image} alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-foreground">{p.title[lng]}</h3>
        <div className="mt-1 text-sm font-bold text-primary">{p.price}</div>
      </div>
    </Link>
  );
}
