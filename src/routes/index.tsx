import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/lib/properties";
import { communities } from "@/lib/communities";
import { Search, MapPin, Building2, Wallet, Diamond, UserCheck, Handshake, ShieldCheck, Play, ArrowRight, ChevronLeft, ChevronRight, X, Maximize, Star, CheckCircle2, Award, Users2, Trophy, Target, Volume2, VolumeX } from "lucide-react";
import { WhatsAppForm } from "@/components/WhatsAppForm";
import { useState, useRef, useEffect } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isCardExpanded, setIsCardExpanded] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCardExpanded(false);
    }, 1500); // 1.5s delay as requested

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.muted = false;
            setIsMuted(false);
            videoRef.current.play().catch(err => console.log("Video play failed:", err));
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      });
    }, { threshold: 0.2 });

    if (videoRef.current) {
      videoObserver.observe(videoRef.current);
    }

    return () => videoObserver.disconnect();
  }, []);

  const handlePlayVideo = () => {
    const section = document.getElementById("video-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.play().catch(err => console.log("Video play failed:", err));
        setIsPlaying(true);
      }
    }
  };

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
        
        <div className={`relative mx-auto max-w-7xl px-4 pt-20 pb-0 md:pb-20 md:px-8 w-full flex flex-col items-start text-start`} dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="max-w-3xl text-white">
            <div className={`eyebrow text-white/90 mb-6 tracking-[0.4em] text-sm uppercase`}>{t("hero.eyebrow")}</div>
            <h1 className="font-serif text-4xl leading-[1.2] md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl mb-8">
              {t("hero.title1")} <br />
              <span className="text-gold italic font-light">{t("hero.title2")}</span> <br />
              {t("hero.title3")}
            </h1>
            <div className="mt-8 flex items-center gap-3 md:gap-4 text-xs md:text-2xl text-white drop-shadow-lg font-serif whitespace-nowrap">
              <span className="font-bold">{t("hero.name")}</span>
              <div className="w-px h-4 md:h-6 bg-gold/50" />
              <span className="text-gold italic font-light">{t("hero.tagline")}</span>
            </div>
          </div>

          {/* filter panel & Profile Card Container */}
          <div className="mt-16 mb-[105px] md:mb-0 flex flex-col md:flex-row items-center md:items-end gap-[25px] w-full">
            {/* Search Bar */}
            <div className="flex-1 w-full max-w-4xl h-auto md:h-[95px] rounded-[2rem] md:rounded-[3rem] bg-black/40 p-3 md:p-1.5 backdrop-blur-2xl border border-white/10 shadow-2xl flex items-center">
              <div className="grid grid-cols-1 gap-1 md:grid-cols-[1.2fr_1fr_1fr_auto] w-full items-center">
                <FilterField icon={<MapPin className="size-4 text-gold" />} label={t("hero.location")} options={locations} />
                <FilterField icon={<Building2 className="size-4 text-gold" />} label={t("hero.type")} options={types} />
                <FilterField icon={<Wallet className="size-4 text-gold" />} label={t("hero.price")} options={prices} />
                <Link to="/properties" className="flex items-center justify-center size-14 rounded-full bg-gold text-black transition-all hover:bg-white hover:scale-[1.1] active:scale-95 shadow-xl mx-2">
                  <Search className="size-5" />
                </Link>
              </div>
            </div>

            {/* Independent Expandable Profile Card */}
            <div className="relative h-[95px] w-full md:w-80 flex justify-center md:justify-end">
              <div className={`absolute bottom-0 md:bottom-0 left-1/2 md:left-auto md:right-0 -translate-x-1/2 md:translate-x-0 group w-[90%] md:w-80 rounded-[2rem] md:rounded-[3rem] bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isCardExpanded ? 'h-[440px] z-50' : 'h-[95px]'} hover:h-[440px] hover:z-50`}>
                {/* Profile Card Content Wrapper for consistent padding */}
                <div className={`flex flex-col h-full transition-all duration-1000 ${isCardExpanded ? 'p-10' : 'p-4 group-hover:p-10'}`}>
                  
                  {/* Header/Identity Section */}
                  <div className={`flex items-center transition-all duration-1000 ${isCardExpanded ? 'flex-col text-center mb-6 h-auto' : 'flex-row gap-5 h-full group-hover:flex-col group-hover:text-center group-hover:mb-6 group-hover:h-auto'}`}>
                    <div className={`rounded-full overflow-hidden border-2 border-gold/50 flex-shrink-0 transition-all duration-1000 ${isCardExpanded ? 'size-28 mb-4' : 'size-16 group-hover:size-28 group-hover:mb-4'}`}>
                      <img src="/Images/jalili.webp" alt="Amir Moshrefi" className="size-full object-cover" />
                    </div>
                    <div className={`flex flex-col transition-all duration-1000 ${isCardExpanded ? 'items-center justify-center' : 'items-start justify-center mt-2.5 group-hover:items-center group-hover:mt-0'}`}>
                      <div className={`font-bold text-white leading-tight transition-all duration-1000 ${isCardExpanded ? 'text-xl mb-1' : 'text-lg group-hover:text-xl group-hover:mb-1'}`}>{t("jalili.founder")}</div>
                      <div className={`text-gold uppercase tracking-[0.2em] font-black transition-all duration-1000 ${isCardExpanded ? 'text-[0.6rem] opacity-100' : 'text-[0.5rem] opacity-0 group-hover:opacity-100 group-hover:text-[0.6rem]'}`}>{t("jalili.role")}</div>
                    </div>
                  </div>

                  {/* Expandable Body Content */}
                  <div className={`transition-all duration-700 delay-200 ${isCardExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                    <p className={`text-xs text-white/90 leading-relaxed italic mb-8 border-gold/30 ${isRtl ? 'text-right border-r-2 pr-4' : 'text-left border-l-2 pl-4'}`}>
                      "{t("jalili.quote")}"
                    </p>
                    
                    <div className={`flex items-center gap-3`}>
                      <Link to="/contact" className="flex-1 flex items-center justify-center py-4 bg-gold hover:bg-white text-black border border-gold hover:border-white text-[0.7rem] font-black uppercase tracking-widest rounded-full transition-all duration-500 shadow-xl group/btn">
                        {t("property.contact")} <ArrowRight className={`size-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform rtl:rotate-180 rtl:mr-1.5 rtl:ml-0`} />
                      </Link>
                      <button 
                        onClick={handlePlayVideo}
                        className="size-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 transition-all duration-500 shadow-lg group/vbtn"
                      >
                        <Play className="size-5 fill-current ml-1 rtl:mr-1 rtl:ml-0" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Marquee */}
        <div className="absolute bottom-0 inset-x-0 bg-white/5 backdrop-blur-lg border-t border-white/5 py-6 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-12 md:gap-24 px-6 md:px-12">
            {[
              "EMAAR", "DAMAC", "NAKHEEL", "SOBHA", 
              "EMAAR", "DAMAC", "NAKHEEL", "SOBHA",
              "EMAAR", "DAMAC", "NAKHEEL", "SOBHA",
              "EMAAR", "DAMAC", "NAKHEEL", "SOBHA"
            ].map((brand, i) => (
              <span key={`b1-${i}`} className="text-white/40 font-serif font-bold text-xl md:text-2xl tracking-[0.2em]">{brand}</span>
            ))}
            {/* Duplicate for seamless infinite loop */}
            {[
              "EMAAR", "DAMAC", "NAKHEEL", "SOBHA", 
              "EMAAR", "DAMAC", "NAKHEEL", "SOBHA",
              "EMAAR", "DAMAC", "NAKHEEL", "SOBHA",
              "EMAAR", "DAMAC", "NAKHEEL", "SOBHA"
            ].map((brand, i) => (
              <span key={`b2-${i}`} className="text-white/40 font-serif font-bold text-xl md:text-2xl tracking-[0.2em]">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM WHY CHOOSE US SECTION */}
      <section className="py-24 md:py-32 overflow-hidden bg-[#fdfbf7] reveal">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className={`flex flex-col lg:grid lg:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start ${isRtl ? 'rtl' : 'ltr'}`}>
            
            {/* VIDEO SECTION (First on Mobile) */}
            <div id="video-section" className="relative group w-full scroll-mt-32 order-1 lg:order-2">
              <div className="relative aspect-[3/4] md:aspect-[4/6] lg:h-[850px] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-black">
                <video 
                  ref={videoRef}
                  src="/Videos/55.mp4" 
                  className="size-full object-cover opacity-80 transition-all duration-1000"
                  muted={isMuted} loop playsInline autoPlay
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                
                {/* Header elements in card */}
                <div className={`absolute top-4 md:top-12 inset-x-4 md:inset-x-12 flex justify-between items-center z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="text-gold font-serif text-lg md:text-5xl font-bold">JR</div>
                  <Link to="/about" className="px-3 py-1.5 md:px-8 md:py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[0.45rem] md:text-[0.7rem] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    {t("why.aboutAmirfazel")} <ChevronRight className={`inline-block size-2.5 md:size-4 ml-1 ${isRtl ? 'rotate-180 mr-1 ml-0' : ''}`} />
                  </Link>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  {/* Click overlay for play/pause toggle */}
                  <div 
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => {
                      if (videoRef.current) {
                        if (videoRef.current.paused) {
                          videoRef.current.play().catch(err => console.log("Video play failed:", err));
                          setIsPlaying(true);
                        } else {
                          videoRef.current.pause();
                          setIsPlaying(false);
                        }
                      }
                    }}
                  />

                  {/* Play icon when paused */}
                  {!isPlaying && (
                    <div className="pointer-events-none relative size-12 md:size-32 flex items-center justify-center rounded-full bg-gold/90 text-black shadow-2xl transition-all duration-500">
                      <Play className="size-4 md:size-12 fill-current ml-1" />
                    </div>
                  )}

                  {/* Volume control button (stays clickable) */}
                   <div className={`absolute bottom-4 md:bottom-12 flex gap-3 md:gap-4 ${isRtl ? 'left-4 md:left-12' : 'right-4 md:right-12'}`}>
                    {isMuted ? (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (videoRef.current) {
                            videoRef.current.muted = false;
                            setIsMuted(false);
                          }
                        }}
                        className="size-7 md:size-14 flex items-center justify-center rounded-full bg-gold/90 text-black shadow-lg hover:scale-110 transition-all duration-500"
                      >
                        <VolumeX className="size-3 md:size-6" />
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (videoRef.current) {
                            videoRef.current.muted = true;
                            setIsMuted(true);
                          }
                        }}
                        className="size-7 md:size-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 transition-all duration-500 shadow-lg"
                      >
                        <Volume2 className="size-3 md:size-6" />
                      </button>
                    )}
                  </div>
                </div>

                <div className={`absolute bottom-4 md:bottom-12 inset-x-4 md:inset-x-12 z-10 ${isRtl ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-lg md:text-5xl font-serif font-bold text-white inline-block w-full leading-tight">{t("why.videoTitle")}</h3>
                </div>

                {/* Dotted pattern decoration */}
                <div className={`absolute top-1/2 -translate-y-1/2 grid grid-cols-4 gap-2 md:gap-3 opacity-30 ${isRtl ? 'right-4 md:right-12' : 'left-4 md:left-12'}`}>
                  {[...Array(16)].map((_, i) => <div key={i} className="size-1 md:size-1.5 bg-white rounded-full" />)}
                </div>
              </div>
            </div>

            {/* CONTENT SIDE: Text & Gallery (Second on Mobile) */}
            <div className={`space-y-12 md:space-y-16 order-2 lg:order-1 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div>
                <div className={`flex items-center gap-4 mb-6 md:mb-8 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span className="text-gold font-bold text-[0.65rem] uppercase tracking-[0.3em]">{t("why.eyebrow")}</span>
                  <div className="h-px w-12 bg-gold/30" />
                </div>
                <h2 className="font-serif text-4xl md:text-7xl font-bold text-black leading-[1.1] mb-6 md:mb-10">
                  {t("why.title1")} <br />
                  <span className="italic font-normal text-gold">{t("why.title2")}</span>
                </h2>
                <p className="text-base md:text-lg text-black/70 leading-relaxed max-w-xl font-medium">
                  {t("why.items.0.desc")}
                </p>
              </div>

              {/* IRREGULAR MODERN GALLERY */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 h-auto md:h-[500px]">
                <div className="space-y-4 md:space-y-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="h-[180px] md:h-[280px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group relative cursor-pointer">
                        <img src="/Images/1.webp" alt="" className="size-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Maximize className="text-white size-6 md:size-8" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="md:max-w-2xl max-w-[90vw] max-h-[80vh] p-0 overflow-hidden bg-transparent border-none flex items-center justify-center">
                      <DialogTitle className="sr-only">Gallery Image</DialogTitle>
                      <img src="/Images/1.webp" alt="" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="h-[120px] md:h-[180px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group relative cursor-pointer">
                        <img src="/Images/2.webp" alt="" className="size-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Maximize className="text-white size-6 md:size-8" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="md:max-w-2xl max-w-[90vw] max-h-[80vh] p-0 overflow-hidden bg-transparent border-none flex items-center justify-center">
                      <DialogTitle className="sr-only">Gallery Image</DialogTitle>
                      <img src="/Images/2.webp" alt="" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="pt-8 md:pt-12 space-y-4 md:space-y-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="h-[120px] md:h-[180px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group relative cursor-pointer">
                        <img src="/Images/4.webp" alt="" className="size-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Maximize className="text-white size-6 md:size-8" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="md:max-w-2xl max-w-[90vw] max-h-[80vh] p-0 overflow-hidden bg-transparent border-none flex items-center justify-center">
                      <DialogTitle className="sr-only">Gallery Image</DialogTitle>
                      <img src="/Images/4.webp" alt="" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="h-[180px] md:h-[280px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group relative cursor-pointer">
                        <img src="/Images/5.webp" alt="" className="size-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Maximize className="text-white size-6 md:size-8" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="md:max-w-2xl max-w-[90vw] max-h-[80vh] p-0 overflow-hidden bg-transparent border-none flex items-center justify-center">
                      <DialogTitle className="sr-only">Gallery Image</DialogTitle>
                      <img src="/Images/5.webp" alt="" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section id="properties" className="pt-8 pb-24 md:pt-12 md:pb-32 reveal">
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
      <section className="overflow-hidden bg-black py-24 md:py-32 text-white reveal">
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
      <section className="py-24 md:py-32 overflow-hidden bg-[#fdfbf7] reveal">
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
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  return (
    <div className={`flex items-center gap-4 rounded-[2.5rem] px-6 py-2 h-16 hover:bg-white/5 transition-colors group ${isRtl ? 'text-right' : 'text-left'}`}>
      <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10 group-hover:bg-gold/20 transition-all duration-500 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
        <div className="text-[0.6rem] text-white uppercase tracking-[0.2em] font-black mb-0.5 opacity-100">{label}</div>
        <Select>
          <SelectTrigger className={`h-auto p-0 border-none bg-transparent text-white font-bold text-base focus:ring-0 focus:ring-offset-0 shadow-none cursor-pointer ${isRtl ? 'text-right' : 'text-left'}`}>
            <SelectValue placeholder={options[0]} />
          </SelectTrigger>
          <SelectContent className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] text-white shadow-2xl">
            {options.map((o) => (
              <SelectItem key={o} value={o} className={`focus:bg-gold focus:text-black cursor-pointer rounded-lg mx-1 my-1 font-bold text-sm ${isRtl ? 'text-right' : 'text-left'}`}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
