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
        <div className="absolute end-0 mt-2 min-w-32 rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-lg z-50">
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => { i18n.changeLanguage(l.code); setOpen(false); }}
              className={`block w-full px-3 py-1.5 text-start text-sm hover:bg-accent ${i18n.language === l.code ? "font-semibold" : ""}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
