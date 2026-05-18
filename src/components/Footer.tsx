import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Instagram, Phone, Mail, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { CONTACT, waLink } from "@/lib/contact";

export function Footer() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  return (
    <footer className="bg-black text-white border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-x-4 gap-y-16 lg:gap-16">
          {/* Brand Column */}
          <div className={`space-y-8 col-span-2 lg:col-span-1 ${isRtl ? 'text-right' : 'text-left'} md:text-start`}>
            <div className={`flex scale-125 origin-left ${isRtl ? 'justify-end' : 'justify-start'} md:justify-start`}>
              <Logo light />
            </div>
            <p className={`max-w-xs text-lg text-white/50 leading-relaxed font-medium ${isRtl ? 'text-right mr-0 ml-auto' : 'text-left ml-0 mr-auto'} md:text-start md:mx-0`}>
              {t("footer.desc")}
            </p>
            <div className={`flex gap-4 ${isRtl ? 'justify-end' : 'justify-start'} md:justify-start`}>
              <SocialLink href={CONTACT.instagramUrl} icon={<Instagram className="size-5" />} label="Instagram" />
              <SocialLink href={waLink()} icon={
                <svg viewBox="0 0 32 32" className="size-5 fill-current">
                  <path d="M16 3C9.4 3 4 8.4 4 15c0 2.3.7 4.5 1.9 6.4L4 29l7.8-2.1c1.8 1 3.9 1.6 6.2 1.6 6.6 0 12-5.4 12-12S22.6 3 16 3z" />
                </svg>
              } label="WhatsApp" />
            </div>
          </div>

          {/* Links Columns */}
          <FooterCol title={t("footer.quickLinks")}>
            <FooterLink to="/">{t("nav.home")}</FooterLink>
            <FooterLink to="/properties">{t("nav.properties")}</FooterLink>
            <FooterLink to="/blog">{t("nav.blog")}</FooterLink>
            <FooterLink to="/about">{t("nav.about")}</FooterLink>
            <FooterLink to="/contact">{t("nav.contact")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("footer.contact")}>
            <ContactItem 
              href={waLink()} 
              label={CONTACT.whatsapp} 
              icon={<svg viewBox="0 0 32 32" className="size-4 fill-current"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.3.7 4.5 1.9 6.4L4 29l7.8-2.1c1.8 1 3.9 1.6 6.2 1.6 6.6 0 12-5.4 12-12S22.6 3 16 3z" /></svg>} 
            />
            <ContactItem 
              href={`tel:${CONTACT.phone}`} 
              label={CONTACT.phone} 
              icon={<Phone className="size-4" />} 
            />
            <ContactItem 
              href={CONTACT.instagramUrl} 
              label={`@${CONTACT.instagram}`} 
              icon={<Instagram className="size-4" />} 
            />
          </FooterCol>

          <div className="col-span-2 lg:col-span-1">
            <FooterCol title={t("footer.follow")}>
              <div className="col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <p className="text-sm text-white/40 leading-relaxed">
                  Stay updated with the latest luxury property listings in Dubai.
                </p>
                <Link 
                  to="/properties" 
                  className="flex items-center justify-between group/btn text-gold font-bold text-sm uppercase tracking-widest"
                >
                  View Catalog 
                  <ArrowUpRight className="size-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </FooterCol>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/30 font-medium">
          <div className={isRtl ? "text-right" : "text-left"}>
            © {new Date().getFullYear()} <span className="text-white/60">{t("brand.name")}</span>. {t("footer.rights")}
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gold transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-gold transition-colors">{t("footer.terms")}</a>
            <a href="#" className="hover:text-gold transition-colors">{t("footer.sitemap")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6 md:space-y-8">
      <h4 className="text-xs uppercase tracking-[0.3em] text-gold font-black">{title}</h4>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="text-lg text-white/50 hover:text-white transition-all hover:translate-x-1 inline-flex items-center gap-2 group"
    >
      <div className="size-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-all shrink-0" />
      {children}
    </Link>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="size-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-gold hover:text-black hover:border-gold transition-all duration-500 group"
    >
      <div className="group-hover:scale-110 transition-transform">{icon}</div>
    </a>
  );
}

function ContactItem({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="flex items-center gap-4 text-lg text-white/50 hover:text-white transition-all group"
    >
      <div className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/30 transition-all shrink-0">
        <div className="text-gold">{icon}</div>
      </div>
      <span dir="ltr" className="truncate">{label}</span>
    </a>
  );
}
