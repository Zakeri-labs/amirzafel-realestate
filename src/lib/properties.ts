import penthouse from "@/assets/prop-penthouse.jpg";
import villa from "@/assets/prop-villa.jpg";
import burj from "@/assets/prop-burj.jpg";

export type Property = {
  id: string;
  titleKey: "penthouse" | "villa" | "burj";
  title: { en: string; fa: string; ar: string };
  location: { en: string; fa: string; ar: string };
  type: { en: string; fa: string; ar: string };
  price: string;
  area: number;
  beds: number;
  baths: number;
  parking: number;
  image: string;
  gallery: string[];
  badge?: "featured" | "new" | "exclusive";
  reference: string;
  description: { en: string; fa: string; ar: string };
};

export const properties: Property[] = [
  {
    id: "beachfront-penthouse",
    titleKey: "penthouse",
    title: {
      en: "Beachfront Penthouse",
      fa: "پنت‌هاوس ساحلی",
      ar: "بنتهاوس على الشاطئ",
    },
    location: { en: "Palm Jumeirah", fa: "نخل جمیرا", ar: "نخلة جميرا" },
    type: { en: "Penthouse", fa: "پنت‌هاوس", ar: "بنتهاوس" },
    price: "AED 32,500,000",
    area: 6458,
    beds: 4,
    baths: 5,
    parking: 2,
    image: penthouse,
    gallery: [penthouse, burj, villa],
    badge: "featured",
    reference: "AM-2401",
    description: {
      en: "A statement penthouse perched above Palm Jumeirah with uninterrupted sea and skyline views, private terrace, infinity pool and bespoke interiors crafted by a leading Milanese atelier.",
      fa: "پنت‌هاوسی نمادین در ارتفاع نخل جمیرا با ویوی بی‌نظیر دریا و آسمان شهر، تراس خصوصی، استخر بی‌نهایت و دکوراسیون اختصاصی توسط آتلیه‌ای پیشرو در میلان.",
      ar: "بنتهاوس مميز يطل على نخلة جميرا بإطلالات بحرية بانورامية، تراس خاص، مسبح لا متناهي وتصاميم داخلية فاخرة من أتيليه ميلاني رائد.",
    },
  },
  {
    id: "modern-signature-villa",
    titleKey: "villa",
    title: {
      en: "Modern Signature Villa",
      fa: "ویلای مدرن سیگنیچر",
      ar: "فيلا حديثة مميزة",
    },
    location: { en: "Dubai Hills Estate", fa: "دبی هیلز استیت", ar: "دبي هيلز إستيت" },
    type: { en: "Villa", fa: "ویلا", ar: "فيلا" },
    price: "AED 18,900,000",
    area: 7102,
    beds: 5,
    baths: 6,
    parking: 3,
    image: villa,
    gallery: [villa, penthouse, burj],
    badge: "new",
    reference: "AM-2402",
    description: {
      en: "Contemporary architecture meets resort-style living in this six-bedroom villa, set on a generous plot with landscaped gardens, infinity pool and a private wellness suite.",
      fa: "ترکیب معماری معاصر و سبک زندگی استراحتگاهی در این ویلای شش‌خوابه، با باغ‌بندی شده، استخر بی‌نهایت و سوئیت سلامت خصوصی.",
      ar: "عمارة معاصرة وحياة بأسلوب المنتجعات في هذه الفيلا، مع حدائق منسقة ومسبح لا متناهي وجناح صحي خاص.",
    },
  },
  {
    id: "burj-khalifa-view-residence",
    titleKey: "burj",
    title: {
      en: "Burj Khalifa View Residence",
      fa: "آپارتمان با ویوی برج خلیفه",
      ar: "إقامة بإطلالة برج خليفة",
    },
    location: { en: "Downtown Dubai", fa: "داون‌تاون دبی", ar: "وسط مدينة دبي" },
    type: { en: "Apartment", fa: "آپارتمان", ar: "شقة" },
    price: "AED 7,850,000",
    area: 2186,
    beds: 3,
    baths: 4,
    parking: 2,
    image: burj,
    gallery: [burj, penthouse, villa],
    badge: "exclusive",
    reference: "AM-2403",
    description: {
      en: "A serene residence on a high floor overlooking Burj Khalifa and the Dubai Fountain, featuring premium European finishes and an open-plan layout designed for entertaining.",
      fa: "آپارتمانی آرام در طبقه‌ای بلند رو به برج خلیفه و فواره دبی، با متریال درجه یک اروپایی و چیدمان باز برای پذیرایی.",
      ar: "إقامة هادئة في طابق مرتفع تطل على برج خليفة ونافورة دبي، بتشطيبات أوروبية فاخرة وتصميم مفتوح للاستضافة.",
    },
  },
];

export const getProperty = (id: string) => properties.find((p) => p.id === id);
