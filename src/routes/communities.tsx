import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { communities } from "@/lib/communities";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/communities")({
  head: () => ({
    meta: [
      { title: "Communities — Amirfazel Moshrefi" },
      { name: "description", content: "Discover Dubai's most prestigious residential communities." },
    ],
  }),
  component: CommunitiesPage,
});

function CommunitiesPage() {
  const { t } = useTranslation();
  const names = t("filters.locations", { returnObjects: true }) as string[];
  return (
    <div className="bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="eyebrow eyebrow-divider">{t("communities.eyebrow") || "The Neighbourhoods"}</div>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl font-bold">{t("communities.title")}</h1>
          <p className="mt-4 max-w-2xl text-lg font-medium text-muted-foreground/90 leading-relaxed">{t("communities.intro")}</p>
          
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {communities.map((c) => (
              <Link 
                key={c.id} 
                to="/properties" 
                search={{ location: names[c.idx] }}
                className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all"
              >
                <img src={c.image} alt={names[c.idx]} className="size-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Exclusive Area</div>
                  <h3 className="font-serif text-3xl font-bold text-white">{names[c.idx]}</h3>
                  <div className="mt-6 flex items-center gap-2 text-white/90 text-sm font-bold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    View Properties <ArrowRight className="size-4 rtl:rotate-180" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
