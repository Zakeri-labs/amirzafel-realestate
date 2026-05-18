import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Heart, MapPin, Bed, Bath, Maximize, ArrowRight } from "lucide-react";
import type { Property } from "@/lib/properties";

export function PropertyCard({ p }: { p: Property }) {
  const { t, i18n } = useTranslation();
  const lng = (i18n.language as "en" | "fa" | "ar") in p.title ? (i18n.language as "en" | "fa" | "ar") : "en";
  const isRtl = i18n.dir() === "rtl";

  return (
    <Link
      to="/properties/$id"
      params={{ id: p.id }}
      className="group relative aspect-[4/5] block overflow-hidden rounded-[2.5rem] shadow-xl"
    >
      <img 
        src={p.image} 
        alt={p.title[lng]} 
        className="size-full object-cover transition-transform duration-1000 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 transition-opacity duration-500" />
      
      {p.badge && (
        <span className="absolute start-8 top-8 rounded-full bg-gold px-4 py-1.5 text-[0.6rem] font-black uppercase tracking-[0.1em] text-black shadow-lg z-10">
          {t(`featured.${p.badge}`)}
        </span>
      )}
      
      <button className="absolute end-8 top-8 flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-gold hover:text-black z-10">
        <Heart className="size-5" />
      </button>

      <div className="absolute inset-x-0 bottom-0 px-10 pb-6 pt-10 text-white">
        <div className="flex items-center gap-2 text-[0.7rem] font-bold text-gold uppercase tracking-[0.3em] mb-4">
          <MapPin className="size-3.5" /> {p.location[lng]}
        </div>
        <h3 className="font-serif text-4xl font-bold leading-tight mb-3 transition-colors">{p.title[lng]}</h3>
        <div className="text-2xl font-serif font-medium text-white/90 mb-4">{p.price}</div>
        
        <div className="flex items-center gap-6 opacity-80">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Bed className="size-4 text-gold" /> {p.beds}
          </div>
          <div className="flex items-center gap-2 text-sm font-bold">
            <Bath className="size-4 text-gold" /> {p.baths}
          </div>
          <div className="flex items-center gap-2 text-sm font-bold">
            <Maximize className="size-4 text-gold" /> {p.area.toLocaleString()} <span className="text-[10px] opacity-60">SQFT</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
