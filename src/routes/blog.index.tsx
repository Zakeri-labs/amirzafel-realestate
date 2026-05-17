import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { posts } from "@/lib/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog & Insights — Amirfazel Moshrefi" },
      { name: "description", content: "Articles, market insights and neighbourhood guides for Dubai luxury real estate." },
      { property: "og:title", content: "Blog & Insights — Amirfazel Moshrefi" },
      { property: "og:description", content: "Dubai luxury real estate articles and market analysis." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { t, i18n } = useTranslation();
  const lng = (i18n.language as "en" | "fa" | "ar") || "en";
  const safeLng = (["en", "fa", "ar"] as const).includes(lng as any) ? (lng as "en" | "fa" | "ar") : "en";

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => set.add(p.category[safeLng]));
    return ["all", ...Array.from(set)];
  }, [safeLng]);

  const [active, setActive] = useState<string>("all");
  const filtered = active === "all" ? posts : posts.filter((p) => p.category[safeLng] === active);
  const [featured, ...rest] = filtered;

  return (
    <div className="bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="eyebrow eyebrow-divider">{t("blog.eyebrow")}</div>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl font-bold">{t("blog.title")}</h1>
          <p className="mt-4 max-w-2xl text-lg font-medium text-muted-foreground/90">{t("blog.intro")}</p>

          {/* Categories */}
          <div className="mt-12 flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  active === c
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40"
                }`}
              >
                {c === "all" ? t("blog.all") : c}
              </button>
            ))}
          </div>

          {/* Featured */}
          {featured && (
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group mt-12 grid overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-xl transition-all hover:shadow-2xl md:grid-cols-2"
            >
              <div className="aspect-[16/10] overflow-hidden md:aspect-auto">
                <img src={featured.image} alt="" className="size-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-16">
                <div className="eyebrow text-primary font-bold">{featured.category[safeLng]}</div>
                <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl font-bold text-foreground">{featured.title[safeLng]}</h2>
                <p className="mt-6 text-base font-medium text-muted-foreground/90 leading-relaxed">{featured.excerpt[safeLng]}</p>
                <div className="mt-8 flex items-center gap-6 text-sm font-bold text-muted-foreground/70">
                  <span className="flex items-center gap-2"><Calendar className="size-4" /> {featured.date}</span>
                  <span className="flex items-center gap-2"><Clock className="size-4" /> {featured.readTime} {t("blog.min")}</span>
                </div>
                <span className="mt-10 inline-flex items-center gap-2 text-base font-bold text-primary group-hover:gap-3 transition-all">
                  {t("blog.read")} <ArrowRight className="size-5 rtl:rotate-180" />
                </span>
              </div>
            </Link>
          )}

          {/* Archive */}
          <div className="mt-24">
            <h2 className="font-serif text-3xl font-bold">{t("blog.archive")}</h2>
            <div className="mt-6 h-1 w-12 bg-gold rounded-full" />
            <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group block overflow-hidden rounded-3xl bg-card shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt="" className="size-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  </div>
                  <div className="p-8">
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">{p.category[safeLng]}</div>
                    <h3 className="mt-4 font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">{p.title[safeLng]}</h3>
                    <p className="mt-4 text-sm font-medium text-muted-foreground/80 line-clamp-3 leading-relaxed">{p.excerpt[safeLng]}</p>
                    <div className="mt-8 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-[0.7rem] font-bold text-muted-foreground/60">
                        <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> {p.date}</span>
                      </div>
                      <span className="text-primary font-bold flex items-center gap-1 text-sm">
                        {t("blog.read")} <ArrowRight className="size-4 rtl:rotate-180" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
