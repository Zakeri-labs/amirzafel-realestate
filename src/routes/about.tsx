import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import about from "@/assets/about-marina.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Amirfazel Moshrefi" },
      { name: "description", content: "Over a decade of expertise in Dubai's luxury real estate market." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();
  const stats = t("about.stats", { returnObjects: true }) as { value: string; label: string }[];
  return (
    <div className="bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="eyebrow">{t("about.eyebrow")}</div>
              <h1 className="mt-3 font-serif text-4xl md:text-5xl">{t("about.title")}</h1>
              <div className="my-6 h-px w-16 bg-gold" />
              <p className="text-muted-foreground leading-relaxed">{t("about.p1")}</p>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t("about.p2")}</p>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <img src={about} alt="" className="size-full object-cover" />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 rounded-2xl bg-secondary p-8 md:grid-cols-4 md:p-12">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-3xl text-primary md:text-4xl">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
