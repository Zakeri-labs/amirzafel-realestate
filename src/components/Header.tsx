import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

const nav = [
  { to: "/", key: "home" },
  { to: "/properties", key: "properties" },
  { to: "/blog", key: "blog" },
  { to: "/about", key: "about" },
  { to: "/contact", key: "contact" },
] as const;

export function Header({ transparent = false }: { transparent?: boolean }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 500); // match duration-500
  };

  const light = transparent && !scrolled;
  const bgClass = light
    ? "bg-transparent"
    : "bg-black/80 backdrop-blur-xl shadow-2xl";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${bgClass}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:px-8">
          <Link to="/" className="flex items-center">
            <Logo light={true} />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`text-sm transition-all hover:opacity-70 ${light ? "text-white/90" : "text-white"} ${active ? "font-bold" : "font-medium"}`}
                >
                  {t(`nav.${n.key}`)}
                  {active && (
                    <span className="mt-1 block h-px bg-white" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher light={true} />
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center rounded-full px-6 py-2.5 text-sm font-bold transition-all bg-gold text-black hover:bg-white hover:scale-[1.02] active:scale-95 shadow-lg shadow-black/20"
            >
              {t("nav.book")}
            </Link>
            <button className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors" onClick={() => setOpen(true)}>
              <Menu className="text-white size-7" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className={`fixed inset-0 z-[100] bg-black lg:hidden transition-all duration-500 ease-in-out ${isClosing ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0 animate-in fade-in slide-in-from-top duration-700'}`}>
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
            <Logo light={true} />
            <button onClick={handleClose} className="text-white p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90">
              <X className="size-9" />
            </button>
          </div>
          <nav className="flex flex-col p-8 gap-6 items-center justify-center h-[calc(100vh-120px)]">
            {nav.map((n, i) => (
              <Link 
                key={n.to} 
                to={n.to} 
                onClick={handleClose} 
                className="text-4xl font-serif font-bold text-white hover:text-gold transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {t(`nav.${n.key}`)}
              </Link>
            ))}
            <Link 
              to="/contact" 
              onClick={handleClose} 
              className="mt-12 w-full max-w-xs rounded-full bg-gold px-8 py-5 text-center text-xl font-black text-black transition-all hover:bg-white active:scale-95 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500 shadow-[0_20px_50px_-15px_rgba(212,175,55,0.3)]"
            >
              {t("nav.book")}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
