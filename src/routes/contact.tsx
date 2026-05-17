import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Phone, Instagram, MapPin } from "lucide-react";
import { useState } from "react";
import { CONTACT, waLink } from "@/lib/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Amirfazel Moshrefi" },
      { name: "description", content: "Get in touch with our Dubai luxury real estate team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  return (
    <div className="bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl">{t("contact.title")}</h1>
              <p className="mt-3 text-muted-foreground">{t("contact.subtitle")}</p>
              <div className="mt-10 space-y-5">
                <Item
                  icon={
                    <svg viewBox="0 0 32 32" className="size-5 fill-current" aria-hidden="true">
                      <path d="M16 3C9.4 3 4 8.4 4 15c0 2.3.7 4.5 1.9 6.4L4 29l7.8-2.1c1.8 1 3.9 1.6 6.2 1.6 6.6 0 12-5.4 12-12S22.6 3 16 3z" />
                    </svg>
                  }
                  text={CONTACT.whatsapp}
                  href={waLink()}
                />
                <Item icon={<Phone />} text={CONTACT.phone} href={`tel:${CONTACT.phone}`} />
                <Item icon={<Instagram />} text={`@${CONTACT.instagram}`} href={CONTACT.instagramUrl} />
                <Item icon={<MapPin />} text={t("footer.address")} />
              </div>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-2xl border border-border bg-card p-8 space-y-4"
            >
              {sent ? (
                <div className="py-12 text-center font-serif text-xl text-primary">{t("contact.sent")}</div>
              ) : (
                <>
                  <Field label={t("contact.name")} type="text" />
                  <Field label={t("contact.whatsapp")} type="tel" />
                  <Field label={t("contact.phone")} type="tel" />
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">{t("contact.message")}</label>
                    <textarea rows={5} className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
                  </div>
                  <button className="w-full rounded-full bg-primary py-3 text-sm text-primary-foreground hover:opacity-90">{t("contact.send")}</button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Item({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">{icon}</div>
      <div className="pt-2 text-sm" dir={href?.startsWith("tel") || href?.includes("wa.me") ? "ltr" : undefined}>{text}</div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block hover:opacity-80">{content}</a>
  ) : content;
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input type={type} className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
    </div>
  );
}
