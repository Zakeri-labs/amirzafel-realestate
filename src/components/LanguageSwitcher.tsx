import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const langs = [
  { code: "en", label: "English" },
  { code: "fa", label: "فارسی" },
  { code: "ar", label: "العربية" },
];

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  const current = langs.find((l) => l.code === i18n.language) ?? langs[0];
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70 ${light ? "text-white/90" : "text-foreground"}`}
      >
        <Globe className="size-4" />
        <span>{current.label}</span>
      </button>
      {open && (
        <div className="absolute end-0 mt-3 min-w-36 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl py-2 text-white shadow-2xl z-50 overflow-hidden">
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => { i18n.changeLanguage(l.code); setOpen(false); }}
              className={`block w-full px-5 py-2.5 text-start text-sm transition-all hover:bg-white/10 ${i18n.language === l.code ? "font-bold text-gold bg-white/5" : "text-white/80"}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
