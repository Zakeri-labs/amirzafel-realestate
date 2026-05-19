import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect, useState, useRef } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Amirfazel Moshrefi" },
      { name: "description", content: "Over a decade of expertise in Dubai's luxury real estate market." },
    ],
  }),
  component: AboutPage,
});

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  
  // Extract number and suffix (e.g., "+500" -> {num: 500, prefix: "+", suffix: ""})
  const match = value.match(/([^\d]*)([\d,.]+)([^\d]*)/);
  const prefix = match?.[1] || "";
  const targetStr = match?.[2] || "0";
  const suffix = match?.[3] || "";
  const target = parseFloat(targetStr.replace(/,/g, ''));

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (countRef.current) observer.observe(countRef.current);

    function animate(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (outQuad)
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={countRef} className="text-center group">
      <div className="font-serif text-3xl text-primary md:text-5xl lg:text-5xl transition-transform duration-500 group-hover:scale-110">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="mt-3 text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground font-black">
        {label}
      </div>
    </div>
  );
}

function AboutPage() {
  const { t } = useTranslation();
  const stats = t("about.stats", { returnObjects: true }) as { value: string; label: string }[];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="reveal">
              <div className="eyebrow">{t("about.eyebrow")}</div>
              <h1 className="mt-3 font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {t("about.title")}
              </h1>
              <div className="my-8 h-1 w-20 bg-gold rounded-full" />
              <p className="text-xl text-muted-foreground/80 leading-relaxed font-medium">
                {t("about.p1")}
              </p>
              <p className="mt-6 text-lg text-muted-foreground/60 leading-relaxed">
                {t("about.p2")}
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-[3rem] shadow-2xl reveal delay-200">
              <img src="/Images/hiro.webp" alt="" className="size-full object-cover" />
            </div>
          </div>

          <div className="mt-24 grid grid-cols-2 gap-8 rounded-[4rem] bg-secondary/30 backdrop-blur-sm p-12 md:grid-cols-4 md:p-20 reveal">
            {stats.map((s) => (
              <AnimatedCounter key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
