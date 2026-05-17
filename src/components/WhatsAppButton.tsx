import { useTranslation } from "react-i18next";
import { waLink } from "@/lib/contact";

export function WhatsAppButton() {
  const { t } = useTranslation();
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 end-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-2xl shadow-[#25D366]/30 transition-transform hover:scale-105 active:scale-95"
    >
      <span className="relative flex size-6 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
        <svg viewBox="0 0 32 32" className="size-6 fill-current" aria-hidden="true">
          <path d="M16 3C9.4 3 4 8.4 4 15c0 2.3.7 4.5 1.9 6.4L4 29l7.8-2.1c1.8 1 3.9 1.6 6.2 1.6 6.6 0 12-5.4 12-12S22.6 3 16 3zm6.9 17c-.3.8-1.7 1.6-2.4 1.7-.6.1-1.4.1-2.2-.1-.5-.2-1.2-.4-2-.8-3.5-1.5-5.8-5.1-6-5.3-.2-.2-1.5-2-1.5-3.8s.9-2.7 1.3-3.1c.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .8.6.3.7 1 2.4 1.1 2.6.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.4-.5.6-.2.2-.4.4-.2.7.2.4.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.4.2.6.1.8-.1.2-.2.9-1.1 1.2-1.5.2-.4.5-.3.8-.2.3.1 2 .9 2.3 1.1.3.1.6.2.7.4.1.2.1 1-.2 1.8z" />
        </svg>
      </span>
      <span className="hidden text-sm font-medium sm:inline">{t("wa.chat")}</span>
    </a>
  );
}
