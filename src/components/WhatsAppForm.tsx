import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { waLink, CONTACT } from "@/lib/contact";

export function WhatsAppForm() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `${t("wa.greeting")} ${name ? `(${name})` : ""}\n\n${message}`;
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="pb-20 md:pb-28 reveal">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-[#0a1f3d] p-8 md:p-12">
          <div className="absolute -end-20 -top-20 size-72 rounded-full bg-[#25D366]/20 blur-3xl" />
          <div className="absolute -start-16 -bottom-16 size-64 rounded-full bg-gold/15 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-white/70 backdrop-blur">
                <span className="size-1.5 rounded-full bg-[#25D366] animate-pulse" />
                {t("wa.online")}
              </div>
              <h3 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">{t("wa.title")}</h3>
              <p className="mt-3 max-w-md text-sm text-white/70">{t("wa.desc")}</p>
              <div className="mt-6 flex items-center gap-3 text-sm text-white/80">
                <svg viewBox="0 0 32 32" className="size-5 fill-[#25D366]" aria-hidden="true">
                  <path d="M16 3C9.4 3 4 8.4 4 15c0 2.3.7 4.5 1.9 6.4L4 29l7.8-2.1c1.8 1 3.9 1.6 6.2 1.6 6.6 0 12-5.4 12-12S22.6 3 16 3z" />
                </svg>
                <span dir="ltr">{CONTACT.whatsapp}</span>
              </div>
            </div>

            <form onSubmit={onSubmit} className="rounded-3xl bg-black/40 p-4 md:p-10 backdrop-blur-2xl border border-white/10 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <label className="text-[0.7rem] uppercase tracking-[0.2em] text-white/60 font-bold">{t("wa.name")}</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/30"
                    placeholder={t("wa.namePh")}
                  />
                </div>
                <div>
                  <label className="text-[0.7rem] uppercase tracking-[0.2em] text-white/60 font-bold">{t("wa.msg")}</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/30"
                    placeholder={t("wa.msgPh")}
                  />
                </div>
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-base font-bold text-white transition-all hover:bg-[#1ebe5d] hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#25D366]/20"
                >
                  {t("wa.send")}
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
