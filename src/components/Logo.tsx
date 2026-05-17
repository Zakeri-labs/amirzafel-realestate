import { useTranslation } from "react-i18next";

export function Logo({ light = false }: { light?: boolean }) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center">
      <img 
        src="/Images/logo.webp" 
        alt="Amirfazel Moshrefi" 
        className={`h-16 w-auto object-contain transition-all ${light ? "brightness-0 invert" : ""}`}
      />
    </div>
  );
}
