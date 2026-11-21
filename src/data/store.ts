import { L } from "@/il8n/ui";
export const towns = ["Periyakulam", "Theni", "Andipatti"] as const;
export const store = {
  fullName: "Sri Devi Vilas Mittai Kadai",
  tamilName: "ஸ்ரீ தேவி விலாஸ் மிட்டாய் கடை",
  tagline: {
    en: "Traditional taste. Finest quality.",
    ta: "பாரம்பரியமிக்க.. சிறந்த தரத்துடன்...",
  } as L,
  since: 1962,

  address: {
    line: {
      en: "Sri Devi Vilas Mittai Kadai,No. 41, Road No. 18, Moondranthal (near Gandhi Statue), Bazaar Street",
      ta: "ஸ்ரீ தேவி விலாஸ் மிட்டாய் கடை,எண் 41, சாலை எண் 18, மூன்றாந்தல் (காந்தி சிலை அருகில்), பஜார் தெரு",
    } as L,
    city: { en: "Periyakulam", ta: "பெரியகுளம்" } as L,
    // Secondcity: { en: "Andipatti", ta: "ஆண்டிப்பட்டி" } as L,
    // district: { en: "Theni", ta: "தேனி" } as L,
    state: { en: "Tamil Nadu", ta: "தமிழ்நாடு" } as L,
    pin: "625601",
  },

  phones: [{ label: "+91 6379765853", href: "tel:+916379765853" }],

  whatsapp: { label: "+91 6379765853", href: "https://wa.me/916379765853" },

  // openMin / closeMin = minutes from midnight, used for the "Open now" badge
  hours: {
    open: { en: "6:00 AM", ta: "காலை 6:00" } as L,
    close: { en: "10:30 PM", ta: "இரவு 10:30" } as L,
    openMin: 6 * 60,
    closeMin: 22 * 60 + 30,
  },

  branches: [
    { en: "Periyakulam", ta: "பெரியகுளம்" },
    // { en: "Theni", ta: "தேனி" },
    // { en: "Andipatti", ta: "ஆண்டிப்பட்டி" },
  ] as L[],

  instagram: {
    handle: "@sridevivilasmittaikadai",
    url: "https://www.instagram.com/sridevivilasmittaikadai",
  },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Sri+Devi+Vilas+Sweets+and+Bakery+Periyakulam",

  highlights: [
    {
      en: "District's First Self-Pickup Outlet - Periyakulam!",
      ta: "பெரியகுளத்தின் முதல் சுயமாகப் பொருட்களைப் பெற்றுக்கொள்ளும் கடை!",
    },
    { en: "Since 1962", ta: "1962 முதல்" },
    {
      en: "In-store, takeout & festive bulk orders",
      ta: "கடையில், பார்சல் மற்றும் பண்டிகை மொத்த ஆர்டர்கள்",
    },
  ] as L[],

  specialties: [
    {
      name: { en: "Ghee Laddu", ta: "நெய் லட்டு" },
      desc: {
        en: "The one regulars rate highest. Rolled fresh, rich with ghee.",
        ta: "வாடிக்கையாளர்கள் மிகவும் விரும்புவது. நெய் மணத்துடன் புதிதாக பிடித்தது.",
      },
    },
    {
      name: { en: "Milk Sweets & Halwa", ta: "பால் பண்டம் & அல்வா" },
      desc: {
        en: "Slow-cooked milk sweets and halwa, the festival-table classics.",
        ta: "மெதுவாக காய்ச்சிய பால் இனிப்புகளும் அல்வாவும். பண்டிகை மேசையின் பாரம்பரியம்.",
      },
    },
    {
      name: { en: "Gulab Jamun & Rasgulla", ta: "குலாப் ஜாமூன் & ரசகுல்லா" },
      desc: {
        en: "Soft, syrup-soaked and made in small batches through the day.",
        ta: "மென்மையான, பாகில் ஊறிய இனிப்புகள். நாள் முழுவதும் சிறு சிறு அளவில் தயாரிப்பு.",
      },
    },
    {
      name: { en: "Hot Savouries & Chaat", ta: "சூடான காரம் & சாட்" },
      desc: {
        en: "Fresh, hot evening snacks. The reason the shop fills up at 5 PM.",
        ta: "புதிதாக சூடான மாலை நேர சிற்றுண்டிகள். மாலை 5 மணிக்கு கடை நிரம்புவதற்கு காரணம்.",
      },
    },
    {
      name: { en: "Tea & Filter Coffee", ta: "டீ & ஃபில்டர் காபி" },
      desc: {
        en: "Evening tea and filter coffee to go with the savouries.",
        ta: "காரத்துடன் சுவைக்க மாலை டீயும் ஃபில்டர் காபியும்.",
      },
    },
    {
      name: { en: "Cakes & Black Forest", ta: "கேக் & பிளாக் பாரஸ்ட்" },
      desc: {
        en: "Soft ice cakes, fresh pastries and custom-ordered gateaux.",
        ta: "மென்மையான ஐஸ் கேக், புதிய பேஸ்ட்ரி, விருப்பப்படி ஆர்டர் கேக்குகள்.",
      },
    },
  ] as { name: L; desc: L }[],

  offers: [
    // TODO: swap with the real current offer from the shop
    {
      title: { en: "Sweet Combo Offer", ta: "இனிப்பு காம்போ சலுகை" },
      note: {
        en: "Festive combo boxes. Ask at the counter.",
        ta: "பண்டிகை காம்போ பாக்ஸ்கள். கவுண்டரில் கேளுங்கள்.",
      },
    },
  ] as { title: L; note: L }[],
};

export type Store = typeof store;
