import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n, { isRTL } from "@/i18n";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const { i18n: i } = useTranslation();
  useEffect(() => {
    const apply = (lng: string) => {
      if (typeof document === "undefined") return;
      document.documentElement.lang = lng;
      document.documentElement.dir = isRTL(lng) ? "rtl" : "ltr";
    };
    apply(i.language);
    i.on("languageChanged", apply);
    return () => { i.off("languageChanged", apply); };
  }, [i]);
  return <>{children}</>;
}

export { i18n };
