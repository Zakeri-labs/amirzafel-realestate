import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Heart, MapPin, Bed, Bath, Car } from "lucide-react";
import type { Property } from "@/lib/properties";

export function PropertyCard({ p }: { p: Property }) {
  const { t, i18n } = useTranslation();
  const lng = (i18n.language as "en" | "fa" | "ar") in p.title ? (i18n.language as "en" | "fa" | "ar") : "en";
  return (
    <Link
      to="/properties/$id"
      params={{ id: p.id }}
      className="group block overflow-hidden rounded-xl bg-card shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.title[lng]} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {p.badge && (
          <span className="absolute start-3 top-3 rounded bg-white/95 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
            {t(`featured.${p.badge}`)}
          </span>
        )}
        <button className="absolute end-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/95 text-primary hover:text-destructive">
          <Heart className="size-4" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground/80 uppercase tracking-wider">
          <MapPin className="size-3.5" /> {p.location[lng]}
        </div>
        <h3 className="mt-3 font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors md:text-3xl">{p.title[lng]}</h3>
        <div className="mt-2 font-serif text-xl font-bold text-primary tracking-tight md:text-2xl">{p.price}</div>
        <div className="mt-5 flex items-center justify-between text-xs font-bold text-muted-foreground/90 border-t border-border/50 pt-4">
          <div>{p.area.toLocaleString()} sqft · {p.type[lng]}</div>
          <div className="flex gap-3">
            <span className="flex items-center gap-1"><Bed className="size-3.5" />{p.beds}</span>
            <span className="flex items-center gap-1"><Bath className="size-3.5" />{p.baths}</span>
            <span className="flex items-center gap-1"><Car className="size-3.5" />{p.parking}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
