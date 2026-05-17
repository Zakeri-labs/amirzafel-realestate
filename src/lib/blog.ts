export type BlogPost = {
  slug: string;
  date: string;
  category: { en: string; fa: string; ar: string };
  title: { en: string; fa: string; ar: string };
  excerpt: { en: string; fa: string; ar: string };
  content: { en: string; fa: string; ar: string };
  image: string;
  readTime: number;
};

import a from "@/assets/comm-downtown.jpg";
import b from "@/assets/comm-marina.jpg";
import c from "@/assets/comm-palm.jpg";
import d from "@/assets/comm-hills.jpg";
import e from "@/assets/comm-emirates.jpg";
import f from "@/assets/comm-jumeirah.jpg";

export const posts: BlogPost[] = [
  {
    slug: "dubai-luxury-market-2026",
    date: "2026-05-10",
    category: { en: "Market Insights", fa: "تحلیل بازار", ar: "رؤى السوق" },
    title: {
      en: "Dubai Luxury Market Outlook 2026",
      fa: "چشم‌انداز بازار لوکس دبی در ۲۰۲۶",
      ar: "آفاق سوق دبي الفاخر 2026",
    },
    excerpt: {
      en: "Why ultra-prime Dubai continues to outperform global luxury hubs and where smart capital is moving.",
      fa: "چرا بازار فوق‌لوکس دبی همچنان از سایر مراکز جهانی پیشی می‌گیرد و سرمایه‌های هوشمند به کدام سو می‌روند.",
      ar: "لماذا تتفوق دبي الفاخرة على المراكز العالمية وأين تتجه رؤوس الأموال الذكية.",
    },
    content: {
      en: "Dubai's ultra-prime segment posted another record year, driven by limited supply on Palm Jumeirah and Emirates Hills, and continued demand from European and Asian HNWIs. Price growth in branded residences exceeded 18%.",
      fa: "بخش فوق‌لوکس دبی سالی رکوردشکن دیگر را پشت سر گذاشت؛ عرضه محدود در نخل جمیرا و امارات هیلز و تقاضای پیوسته خریداران ثروتمند اروپایی و آسیایی محرک اصلی بود. رشد قیمت در پروژه‌های برندشده از ۱۸٪ گذشت.",
      ar: "سجل قطاع فوق الفاخر في دبي عاماً قياسياً جديداً، مدفوعاً بمحدودية المعروض في نخلة جميرا وتلال الإمارات وطلب مستمر من أصحاب الثروات.",
    },
    image: a,
    readTime: 6,
  },
  {
    slug: "buying-off-plan-guide",
    date: "2026-04-22",
    category: { en: "Guide", fa: "راهنما", ar: "دليل" },
    title: {
      en: "Buying Off-Plan in Dubai: A Complete Guide",
      fa: "راهنمای کامل خرید پیش‌فروش در دبی",
      ar: "دليل شامل لشراء العقارات على الخارطة في دبي",
    },
    excerpt: {
      en: "Payment plans, escrow protection, developer track record — everything you need before signing.",
      fa: "شرایط اقساط، حساب امانی، سابقه سازنده — هرآنچه پیش از امضا باید بدانید.",
      ar: "خطط الدفع، حساب الضمان، سجل المطور — كل ما تحتاجه قبل التوقيع.",
    },
    content: {
      en: "Off-plan remains the most accessible entry point into Dubai real estate, with flexible payment plans up to 60/40 post-handover. Always verify RERA escrow and check the developer's delivery history.",
      fa: "خرید پیش‌فروش همچنان قابل‌دسترس‌ترین راه ورود به بازار املاک دبی است؛ با شرایط پرداخت انعطاف‌پذیر تا ۶۰/۴۰ پس از تحویل. همیشه حساب امانی RERA و سابقه تحویل سازنده را بررسی کنید.",
      ar: "تظل العقارات على الخارطة المدخل الأكثر سهولة إلى سوق دبي، مع خطط دفع مرنة تصل إلى 60/40 بعد التسليم.",
    },
    image: b,
    readTime: 8,
  },
  {
    slug: "palm-jumeirah-villas",
    date: "2026-03-18",
    category: { en: "Neighborhoods", fa: "محله‌ها", ar: "الأحياء" },
    title: {
      en: "Inside Palm Jumeirah's Most Coveted Villas",
      fa: "نگاهی به مطلوب‌ترین ویلاهای نخل جمیرا",
      ar: "داخل أرقى فلل نخلة جميرا",
    },
    excerpt: {
      en: "Signature Villas, Frond G, and the new Beach Collection — a tour of the icons.",
      fa: "ویلاهای سیگنیچر، فروند G و کلکسیون جدید ساحلی — تور آیکن‌ها.",
      ar: "فلل سيغنتشر وفروند G ومجموعة الشاطئ الجديدة — جولة في الأيقونات.",
    },
    content: {
      en: "Frond G remains the most exclusive address on Palm Jumeirah, with only 22 signature villas. The new Beach Collection launched at AED 110M and sold out within weeks.",
      fa: "فروند G همچنان منحصربه‌فردترین آدرس نخل جمیراست با تنها ۲۲ ویلای سیگنیچر. کلکسیون جدید ساحلی با قیمت ۱۱۰ میلیون درهم عرضه و در چند هفته به‌فروش رفت.",
      ar: "تبقى فروند G أكثر العناوين حصرية في نخلة جميرا بعدد 22 فيلا فقط.",
    },
    image: c,
    readTime: 5,
  },
  {
    slug: "golden-visa-real-estate",
    date: "2026-02-14",
    category: { en: "Investment", fa: "سرمایه‌گذاری", ar: "الاستثمار" },
    title: {
      en: "Golden Visa Through Real Estate: 2026 Update",
      fa: "ویزای طلایی از طریق ملک: به‌روزرسانی ۲۰۲۶",
      ar: "الإقامة الذهبية عبر العقارات: تحديث 2026",
    },
    excerpt: {
      en: "AED 2M property investment unlocks 10-year residency. Here is the latest process.",
      fa: "سرمایه‌گذاری ۲ میلیون درهمی در ملک، اقامت ۱۰ ساله را فعال می‌کند. آخرین فرآیند را بخوانید.",
      ar: "استثمار عقاري بقيمة 2 مليون درهم يفتح إقامة 10 سنوات. إليك أحدث الإجراءات.",
    },
    content: {
      en: "Buyers can now combine multiple completed properties to reach the AED 2M threshold. Off-plan also qualifies after 50% payment to the developer.",
      fa: "خریداران می‌توانند چندین ملک تکمیل‌شده را برای رسیدن به حد ۲ میلیون درهم ترکیب کنند. پیش‌فروش نیز پس از ۵۰٪ پرداخت به سازنده واجد شرایط است.",
      ar: "يمكن للمشترين الآن دمج عدة عقارات مكتملة للوصول إلى عتبة 2 مليون درهم.",
    },
    image: d,
    readTime: 4,
  },
  {
    slug: "downtown-vs-marina",
    date: "2026-01-30",
    category: { en: "Neighborhoods", fa: "محله‌ها", ar: "الأحياء" },
    title: {
      en: "Downtown vs Marina: Where Should You Buy?",
      fa: "داون‌تاون یا مارینا؟ کجا بخریم؟",
      ar: "وسط المدينة أم المارينا: أين تشتري؟",
    },
    excerpt: {
      en: "ROI, lifestyle, and capital appreciation compared across Dubai's two flagship districts.",
      fa: "بازده، سبک زندگی و رشد ارزش در دو محله شاخص دبی مقایسه می‌شود.",
      ar: "العائد ونمط الحياة ونمو رأس المال في أبرز منطقتين بدبي.",
    },
    content: {
      en: "Downtown delivers stronger capital appreciation; Marina edges ahead on rental yield, currently averaging 7.2% gross.",
      fa: "داون‌تاون رشد سرمایه‌ای قوی‌تری دارد؛ مارینا در بازدهی اجاره با میانگین ناخالص ۷.۲٪ پیشتاز است.",
      ar: "تحقق وسط المدينة نمواً رأسمالياً أقوى، بينما تتقدم المارينا في عائد الإيجار بمتوسط 7.2٪.",
    },
    image: e,
    readTime: 7,
  },
  {
    slug: "branded-residences-rise",
    date: "2025-12-12",
    category: { en: "Trends", fa: "روندها", ar: "اتجاهات" },
    title: {
      en: "The Rise of Branded Residences in Dubai",
      fa: "ظهور رزیدنس‌های برنددار در دبی",
      ar: "صعود الإقامات ذات العلامات التجارية في دبي",
    },
    excerpt: {
      en: "Bulgari, Armani, Bentley — why brand-name addresses command 30–60% premiums.",
      fa: "بولگاری، آرمانی، بنتلی — چرا آدرس‌های برنددار ۳۰ تا ۶۰ درصد بیشتر می‌ارزند.",
      ar: "بولغاري وأرماني وبنتلي — لماذا تطلب الإقامات الفاخرة علاوة 30-60٪.",
    },
    content: {
      en: "Branded residences in Dubai are projected to grow 120% by 2030. Service, security, and resale stability make them the new safe haven.",
      fa: "پیش‌بینی می‌شود رزیدنس‌های برنددار دبی تا ۲۰۳۰ صد و بیست درصد رشد کنند. خدمات، امنیت و ثبات فروش، آن‌ها را به پناهگاه امن جدید بدل کرده است.",
      ar: "يُتوقع نمو الإقامات ذات العلامات التجارية في دبي بنسبة 120٪ بحلول 2030.",
    },
    image: f,
    readTime: 6,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
