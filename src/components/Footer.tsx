import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Instagram, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { CONTACT, waLink } from "@/lib/contact";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Logo light />
            <p className="mt-4 max-w-xs text-sm text-white/70">{t("footer.desc")}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex size-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
              >
                <svg viewBox="0 0 32 32" className="size-4 fill-current" aria-hidden="true">
                  <path d="M16 3C9.4 3 4 8.4 4 15c0 2.3.7 4.5 1.9 6.4L4 29l7.8-2.1c1.8 1 3.9 1.6 6.2 1.6 6.6 0 12-5.4 12-12S22.6 3 16 3z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 col-span-1 md:col-span-2 lg:col-span-3">
            <FooterCol title={t("footer.quickLinks")}>
              <Link to="/" className="footer-link">{t("nav.home")}</Link>
              <Link to="/properties" className="footer-link">{t("nav.properties")}</Link>
              <Link to="/blog" className="footer-link">{t("nav.blog")}</Link>
              <Link to="/about" className="footer-link">{t("nav.about")}</Link>
              <Link to="/contact" className="footer-link">{t("nav.contact")}</Link>
            </FooterCol>

            <FooterCol title={t("footer.contact")}>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="footer-link flex items-start gap-2">
                <svg viewBox="0 0 32 32" className="size-4 mt-0.5 shrink-0 fill-current" aria-hidden="true">
                  <path d="M16 3C9.4 3 4 8.4 4 15c0 2.3.7 4.5 1.9 6.4L4 29l7.8-2.1c1.8 1 3.9 1.6 6.2 1.6 6.6 0 12-5.4 12-12S22.6 3 16 3z" />
                </svg>
                <span dir="ltr" className="truncate">{CONTACT.whatsapp}</span>
              </a>
              <a href={`tel:${CONTACT.phone}`} className="footer-link flex items-start gap-2">
                <Phone className="size-4 mt-0.5 shrink-0" />
                <span dir="ltr">{CONTACT.phone}</span>
              </a>
              <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer-link flex items-start gap-2">
                <Instagram className="size-4 mt-0.5 shrink-0" />
                <span dir="ltr">@{CONTACT.instagram}</span>
              </a>
            </FooterCol>

            <div className="hidden lg:block">
              <FooterCol title={t("footer.follow")}>
                <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer-link">@{CONTACT.instagram}</a>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="footer-link">{t("footer.whatsapp")}</a>
              </FooterCol>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-white/60 md:flex-row md:px-8">
          <div>© {new Date().getFullYear()} {t("brand.name")}. {t("footer.rights")}</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-white">{t("footer.terms")}</a>
            <a href="#" className="hover:text-white">{t("footer.sitemap")}</a>
          </div>
        </div>
      </div>
      <style>{`.footer-link{color:rgba(255,255,255,.7);font-size:.875rem;display:block;}.footer-link:hover{color:#fff;}`}</style>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-serif text-base mb-4">{title}</h4>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}
