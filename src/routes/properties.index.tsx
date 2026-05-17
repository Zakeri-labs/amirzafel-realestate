import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/lib/properties";
import { Search, MapPin, Building2, Wallet, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useSearch } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/properties/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      location: (search.location as string) || undefined,
      type: (search.type as string) || undefined,
      price: (search.price as string) || undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Properties — Amirfazel Moshrefi" },
      { name: "description", content: "Browse exclusive luxury properties for sale in Dubai." },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const { t } = useTranslation();
  const search = Route.useSearch();
  const [location, setLocation] = useState(search.location || "all");
  const [type, setType] = useState(search.type || "all");
  const [price, setPrice] = useState(search.price || "all");

  const locations = ["all", ...(t("filters.locations", { returnObjects: true }) as string[])];
  const types = ["all", ...(t("filters.types", { returnObjects: true }) as string[])];
  const prices = ["all", ...(t("filters.prices", { returnObjects: true }) as string[])];

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchLoc = location === "all" || p.location.en === location || p.location.fa === location || p.location.ar === location;
      const matchType = type === "all" || p.type.en === type || p.type.fa === type || p.type.ar === type;
      // Simple price match for now, could be improved
      const matchPrice = price === "all" || p.price.includes(price);
      return matchLoc && matchType && matchPrice;
    });
  }, [location, type, price]);

  const clearFilters = () => {
    setLocation("all");
    setType("all");
    setPrice("all");
  };

  return (
    <div className="bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="eyebrow eyebrow-divider">{t("featured.eyebrow")}</div>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl font-bold">{t("nav.properties")}</h1>
          <p className="mt-4 max-w-xl text-lg font-medium text-muted-foreground/90">{t("featured.subtitle")}</p>

          {/* Filter Bar */}
          <div className="mt-12 rounded-3xl bg-card p-4 shadow-xl border border-border">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_1fr_auto]">
              <div className="flex flex-col gap-1 px-4 py-2">
                <label className="text-xs font-extralight uppercase tracking-wider text-foreground flex items-center gap-2 mb-1">
                  <MapPin className="size-3 text-primary" /> {t("hero.location")}
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="h-auto p-0 border-none bg-transparent text-foreground font-extralight text-base focus:ring-0 focus:ring-offset-0 shadow-none cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-[18px] text-white shadow-2xl">
                    {locations.map((l) => (
                      <SelectItem key={l} value={l} className="focus:bg-white/10 focus:text-white cursor-pointer rounded-lg mx-1 font-extralight text-sm">
                        {l === "all" ? t("blog.all") : l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1 px-4 py-2 border-t md:border-t-0 md:border-l border-border">
                <label className="text-xs font-extralight uppercase tracking-wider text-foreground flex items-center gap-2 mb-1">
                  <Building2 className="size-3 text-primary" /> {t("hero.type")}
                </label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="h-auto p-0 border-none bg-transparent text-foreground font-extralight text-base focus:ring-0 focus:ring-offset-0 shadow-none cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-[18px] text-white shadow-2xl">
                    {types.map((t_opt) => (
                      <SelectItem key={t_opt} value={t_opt} className="focus:bg-white/10 focus:text-white cursor-pointer rounded-lg mx-1 font-extralight text-sm">
                        {t_opt === "all" ? t("blog.all") : t_opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1 px-4 py-2 border-t md:border-t-0 md:border-l border-border">
                <label className="text-xs font-extralight uppercase tracking-wider text-foreground flex items-center gap-2 mb-1">
                  <Wallet className="size-3 text-primary" /> {t("hero.price")}
                </label>
                <Select value={price} onValueChange={setPrice}>
                  <SelectTrigger className="h-auto p-0 border-none bg-transparent text-foreground font-extralight text-base focus:ring-0 focus:ring-offset-0 shadow-none cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-[18px] text-white shadow-2xl">
                    {prices.map((p_opt) => (
                      <SelectItem key={p_opt} value={p_opt} className="focus:bg-white/10 focus:text-white cursor-pointer rounded-lg mx-1 font-extralight text-sm">
                        {p_opt === "all" ? t("blog.all") : p_opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                {(location !== "all" || type !== "all" || price !== "all") && (
                  <button 
                    onClick={clearFilters}
                    className="flex items-center justify-center size-12 rounded-2xl bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="size-5" />
                  </button>
                )}
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-extralight text-primary-foreground">
                  <Search className="size-4" /> {filteredProperties.length} {t("nav.properties")}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((p) => <PropertyCard key={p.id} p={p} />)
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="text-muted-foreground">{t("search.noResults") || "No properties found matching your criteria."}</div>
                <button onClick={clearFilters} className="mt-4 text-primary font-bold underline">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
