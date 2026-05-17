import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/lib/properties";
import { communities } from "@/lib/communities";
import { Search, MapPin, Building2, Wallet, Diamond, UserCheck, Handshake, ShieldCheck, Play, ArrowRight, ChevronLeft, ChevronRight, X, Maximize2, Star, CheckCircle2, Award, Users2, Trophy, Target } from "lucide-react";
import { WhatsAppForm } from "@/components/WhatsAppForm";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amirfazel Moshrefi — Luxury Real Estate in Dubai" },
      { name: "description", content: "Find your dream property in Dubai. Exclusive luxury homes in the most prestigious communities." },
      { property: "og:title", content: "Amirfazel Moshrefi — Luxury Real Estate in Dubai" },
      { property: "og:description", content: "Find your dream property in Dubai." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const locations = t("filters.locations", { returnObjects: true }) as string[];
  const types = t("filters.types", { returnObjects: true }) as string[];
  const prices = t("filters.prices", { returnObjects: true }) as string[];
  const communityNames = t("filters.locations", { returnObjects: true }) as string[];

  const features = (t("why.items", { returnObjects: true }) as any[]).map((item, idx) => ({
    ...item,
    icon: [Diamond, UserCheck, ShieldCheck, Handshake][idx] || Diamond
  }));

  const achievements = [
    { id: "01", image: "/Images/1.webp", title: t("why.items.0.title") },
    { id: "02", image: "/Images/2.webp", title: t("why.items.1.title") },
    { id: "03", image: "/Images/4.webp", title: t("why.items.2.title") },
    { id: "04", image: "/Images/5.webp", title: t("why.items.3.title") },
    { id: "05", image: "/Images/33.webp", title: t("blog.title") }
  ];

  return (
    <div className="bg-[#fdfbf7] selection:bg-gold/30">
      <Header transparent />

      {/* HERO */}
      <section className="relative min-h-[850px] overflow-hidden flex items-center justify-center">
        <img src="/Images/hiro.webp" alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20" />
        
        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-20 md:px-8 w-full flex flex-col items-center text-center">
          <div className="max-w-4xl text-white">
            <div className="eyebrow text-white/90 mb-6 tracking-[0.4em] text-sm uppercase">{t("hero.eyebrow")}</div>
            <h1 className="font-serif text-5xl leading-[1.1] md:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl">
              {t("hero.title1")}<br />
              {t("hero.title2")}<br />
              {t("hero.title3")}
            </h1>
            <p className="mt-8 mx-auto max-w-2xl text-lg md:text-xl text-white/95 font-medium drop-shadow-lg">{t("hero.subtitle")}</p>
          </div>

          {/* filter panel */}
          <div className="mt-16 w-full max-w-5xl rounded-3xl bg-black/30 p-4 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
              <FilterField icon={<MapPin className="size-5 text-white" />} label={t("hero.location")} options={locations} />
              <FilterField icon={<Building2 className="size-5 text-white" />} label={t("hero.type")} options={types} />
              <FilterField icon={<Wallet className="size-5 text-white" />} label={t("hero.price")} options={prices} />
              <Link to="/properties" className="flex items-center justify-center gap-3 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/10 px-8 py-5 text-base font-extralight text-white transition-all hover:bg-black/60 hover:scale-[1.02] active:scale-95 shadow-2xl">
                <Search className="size-5" /> {t("hero.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM WHY CHOOSE US SECTION (Moved under Hero) */}
      <section className="py-24 md:py-32 overflow-hidden bg-[#fdfbf7]">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className={`grid lg:grid-cols-[1.2fr_1fr] gap-20 items-start ${isRtl ? 'rtl' : 'ltr'}`}>
            {/* LEFT SIDE: Content */}
            <div className={`space-y-16 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div>
                <div className={`flex items-center gap-4 mb-8 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span className="text-gold font-bold text-[0.65rem] uppercase tracking-[0.3em]">{t("why.eyebrow")}</span>
                  <div className="h-px w-12 bg-gold/30" />
                </div>
                <h2 className="font-serif text-5xl md:text-7xl font-bold text-black leading-[1.1] mb-10">
                  {t("why.title1")} <br />
                  {isRtl ? (
                    <span className="italic font-normal text-gold">{t("why.title2")}</span>
                  ) : (
                    <span className="italic font-normal text-gold">{t("why.title2")}</span>
                  )}
                </h2>
                <p className="text-lg text-black/70 leading-relaxed max-w-xl font-medium">
                  {t("why.items.0.desc")}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-10">
                {features.slice(0, 3).map((f, i) => (
                  <div key={i} className="group">
                    <div className={`size-16 rounded-full bg-white border border-black/5 flex items-center justify-center mb-8 shadow-sm group-hover:bg-gold group-hover:text-white transition-all duration-500 ${isRtl ? 'mr-0' : ''}`}>
                      <f.icon className="size-6 text-gold group-hover:text-white" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-black mb-3">{f.title}</h3>
                    <p className="text-xs text-black/50 leading-relaxed font-medium">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* Developer Logos */}
              <div className="pt-10 grid grid-cols-4 gap-12 w-full opacity-10 grayscale hover:opacity-50 hover:grayscale-0 transition-all duration-700">
                <div className="flex items-center justify-center">
                  <span className="font-serif font-bold text-2xl tracking-tighter">EMAAR</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="font-serif font-bold text-2xl tracking-tighter">DAMAC</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="font-serif font-bold text-2xl tracking-tighter">NAKHEEL</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="font-serif font-bold text-2xl tracking-tighter">SOBHA</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Video Preview */}
            <div className="relative group w-full">
              <div className="relative aspect-[3/4] md:aspect-[4/6] lg:h-[850px] overflow-hidden rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-black">
                <video 
                  src="/Videos/55.mp4" 
                  className="size-full object-cover opacity-70 scale-105 group-hover:scale-100 transition-transform duration-1000"
                  muted loop playsInline autoPlay
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                
                {/* Header elements in card */}
                <div className={`absolute top-12 inset-x-12 flex justify-between items-center z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="text-gold font-serif text-5xl font-bold">JR</div>
                  <Link to="/about" className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[0.7rem] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    {t("why.aboutAmirfazel")} <ChevronRight className={`inline-block size-4 ml-1 ${isRtl ? 'rotate-180 mr-1 ml-0' : ''}`} />
                  </Link>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="relative size-32 flex items-center justify-center rounded-full bg-gold text-white shadow-2xl hover:scale-110 transition-all duration-500">
                        <Play className="size-12 fill-current ml-1.5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black border-none rounded-3xl">
                      <DialogTitle className="sr-only">{t("why.videoTitle")}</DialogTitle>
                      <video src="/Videos/55.mp4" controls autoPlay className="w-full aspect-video" />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className={`absolute bottom-12 inset-x-12 z-10 ${isRtl ? 'text-right' : 'text-left'}`}>
                  <div className="space-y-6">
                    <div className="text-gold text-[0.7rem] font-bold uppercase tracking-[0.4em]">{t("why.videoTitle")}</div>
                    <h3 className="text-5xl font-serif font-bold text-white inline-block w-full">{t("why.videoTitle")}</h3>
                  </div>
                </div>

                {/* Dotted pattern decoration */}
                <div className={`absolute top-1/2 -translate-y-1/2 grid grid-cols-4 gap-3 opacity-30 ${isRtl ? 'right-12' : 'left-12'}`}>
                  {[...Array(16)].map((_, i) => <div key={i} className="size-1.5 bg-white rounded-full" />)}
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: Modern Gallery */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-5 gap-4">
            {achievements.map((a, i) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <div 
                    className={`group relative overflow-hidden rounded-[2.5rem] transition-all duration-700 hover:shadow-2xl cursor-pointer ${
                      i === 0 || i === 4 ? "md:aspect-[3/4]" : "md:aspect-[3/4.5] md:-translate-y-8"
                    }`}
                  >
                    <img src={a.image} alt="" className="size-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Maximize2 className="text-white size-10" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="md:max-w-2xl max-w-[90vw] max-h-[80vh] p-0 overflow-hidden bg-transparent border-none flex items-center justify-center">
                  <DialogTitle className="sr-only">Gallery Image</DialogTitle>
                  <img src={a.image} alt="" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className={isRtl ? "text-right" : "text-left"}>
              <div className="eyebrow eyebrow-divider">{t("featured.eyebrow")}</div>
              <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl text-black">{t("featured.title")}</h2>
              <p className="mt-3 text-black/60">{t("featured.subtitle")}</p>
            </div>
          </div>

          <div className="mt-12">
            <Carousel
              opts={{
                align: "start",
                direction: isRtl ? "rtl" : "ltr",
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-6">
                {properties.map((p) => (
                  <CarouselItem key={p.id} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
                    <PropertyCard p={p} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-10 flex items-center justify-center gap-4">
                <CarouselPrevious className="static translate-y-0 bg-white border-border/50 shadow-sm" />
                <CarouselNext className="static translate-y-0 bg-white border-border/50 shadow-sm" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* JALILI REAL ESTATE (Formerly Story) */}
      <section className="overflow-hidden bg-black py-24 md:py-32 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className={`grid items-center gap-16 lg:grid-cols-2 ${isRtl ? 'rtl' : 'ltr'}`}>
            <div className={`relative ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className="absolute -top-20 -left-20 size-64 bg-gold/10 blur-[100px] rounded-full" />
              <div className="eyebrow mb-6 text-gold tracking-[0.4em] uppercase text-sm font-bold">{t("jalili.eyebrow")}</div>
              <h2 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-8">
                {isRtl ? (
                  <>تعریف دوباره <span className="italic font-normal">املاک لوکس</span>.</>
                ) : (
                  <>Defining <span className="italic font-normal">Luxury</span> <br /> Real Estate.</>
                )}
              </h2>
              <p className="text-lg font-medium leading-relaxed text-white/60 max-w-xl">
                {t("jalili.desc")}
              </p>
              
              <div className={`mt-12 flex items-center gap-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <Link to="/about" className="px-10 py-5 bg-gold text-black font-bold rounded-2xl hover:bg-white transition-all duration-500 hover:scale-105 active:scale-95">
                  {t("jalili.cta")}
                </Link>
                <div className={`flex ${isRtl ? 'space-x-reverse -space-x-4' : '-space-x-4'}`}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="size-12 rounded-full border-2 border-black bg-white/10 backdrop-blur-md overflow-hidden">
                      <img src={`/Images/${i === 3 ? '4' : i}.webp`} alt="" className="size-full object-cover" />
                    </div>
                  ))}
                  <div className="size-12 rounded-full border-2 border-black bg-gold text-black flex items-center justify-center text-xs font-bold">
                    +5k
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="aspect-[4/5] overflow-hidden rounded-[3.5rem] border border-white/10 shadow-2xl relative">
                <img src="/Images/to.webp" alt="Jalili Real Estate" className="size-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>
              
              {/* Floating Quote */}
              <div className={`absolute -bottom-8 w-80 p-10 rounded-[2.5rem] bg-white/10 backdrop-blur-3xl border border-white/10 shadow-2xl hidden md:block ${isRtl ? '-left-8' : '-right-8'}`}>
                <Star className={`size-8 text-gold fill-gold mb-6 ${isRtl ? 'mr-0 ml-auto' : ''}`} />
                <p className={`text-lg font-medium italic text-white/90 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                  "{t("jalili.quote")}"
                </p>
                <div className={`mt-8 flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="size-12 rounded-full bg-gold flex items-center justify-center font-bold text-black text-sm">AJ</div>
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <div className="text-sm font-bold">{t("jalili.founder")}</div>
                    <div className="text-[0.65rem] text-white/40 uppercase tracking-widest">{t("jalili.role")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITIES */}
      <section className="py-24 md:py-32 overflow-hidden bg-[#fdfbf7]">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
            <div className={isRtl ? "text-right" : "text-left"}>
              <div className="eyebrow eyebrow-divider">{t("communities.eyebrow") || "Explore"}</div>
              <h2 className="mt-4 font-serif text-5xl md:text-6xl font-bold text-black">{t("communities.title")}</h2>
            </div>
            <Link to="/communities" className="inline-flex items-center gap-3 text-base font-bold text-black hover:text-gold transition-colors">
              {t("communities.viewAll")} <ArrowRight className="size-5 rtl:rotate-180" />
            </Link>
          </div>
          
          <div className="mt-8">
            <Carousel
              opts={{
                align: "start",
                direction: isRtl ? "rtl" : "ltr",
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-8">
                {communities.slice(0, 5).map((c) => (
                  <CarouselItem key={c.id} className="pl-8 basis-full sm:basis-1/2 lg:basis-1/3">
                    <Link
                      to="/properties"
                      search={{ location: communityNames[c.idx] }}
                      className="group relative aspect-[4/5] block overflow-hidden rounded-[2.5rem] shadow-xl"
                    >
                      <img src={c.image} alt={communityNames[c.idx]} className="size-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-x-0 bottom-0 p-10">
                        <div className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/60">Dubai Area</div>
                        <div className="text-4xl font-serif font-bold text-white">{communityNames[c.idx]}</div>
                        <div className="mt-6 flex translate-y-4 items-center gap-2 text-sm font-bold text-white/90 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          Explore Properties <ArrowRight className="size-4 rtl:rotate-180" />
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-16 flex items-center justify-center gap-6">
                <CarouselPrevious className="static translate-y-0 size-14 bg-white border-border/50" />
                <CarouselNext className="static translate-y-0 size-14 bg-white border-border/50" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* WHATSAPP CONTACT */}
      <WhatsAppForm />

      <Footer />
    </div>
  );
}

function FilterField({ icon, label, options }: { icon: React.ReactNode; label: string; options: string[] }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl px-5 py-4 hover:bg-white/10 transition-colors group">
      <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="eyebrow text-xs text-white uppercase tracking-wider font-extralight mb-1">{label}</div>
        <Select>
          <SelectTrigger className="h-auto p-0 border-none bg-transparent text-white font-extralight text-lg focus:ring-0 focus:ring-offset-0 shadow-none cursor-pointer">
            <SelectValue placeholder={options[0]} />
          </SelectTrigger>
          <SelectContent className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-[18px] text-white shadow-2xl">
            {options.map((o) => (
              <SelectItem key={o} value={o} className="focus:bg-white/10 focus:text-white cursor-pointer rounded-lg mx-1 font-extralight text-base">
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
