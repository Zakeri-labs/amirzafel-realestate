export const CONTACT = {
  brand: "Amirfazel Moshrefi",
  phone: "+971589302051",
  whatsapp: "+971509122524",
  whatsappDigits: "971509122524",
  instagram: "amirfazel_dubai",
  instagramUrl: "https://instagram.com/amirfazel_dubai",
  address: "Dubai, United Arab Emirates",
};

export const waLink = (text?: string) =>
  `https://wa.me/${CONTACT.whatsappDigits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
