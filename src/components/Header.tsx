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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = transparent && !scrolled;
  const bgClass = light
    ? "bg-transparent"
    : "bg-black/55 backdrop-blur-xl shadow-2xl";

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${bgClass}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/"><Logo light={true} /></Link>

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
            className={`hidden md:inline-flex items-center rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
              light
                ? "bg-white text-primary hover:bg-white/90"
                : "bg-white text-primary hover:bg-white/90 hover:scale-[1.02] active:scale-95 shadow-lg shadow-black/20"
            }`}
          >
            {t("nav.book")}
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(true)}>
            <Menu className={light || scrolled ? "text-white" : "text-foreground"} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="flex items-center justify-between px-4 py-4 border-b border-border">
            <Logo />
            <button onClick={() => setOpen(false)}><X /></button>
          </div>
          <nav className="flex flex-col p-6 gap-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-lg">
                {t(`nav.${n.key}`)}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-4 rounded-full bg-primary px-5 py-3 text-center text-primary-foreground">
              {t("nav.book")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
