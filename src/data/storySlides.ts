import assets from "@/assets";
import { L } from "@/il8n/ui";

export type StoreSlide = {
  image: typeof assets.images.store1;
  tag: L;
  title: L;
  text: L;
};

export const storeSlides: StoreSlide[] = [
  {
    image: assets.images.store1,
    tag: { en: "Our Store", ta: "எங்கள் கடை" },
    title: { en: "Bazaar Street, since 1962.", ta: "பஜார் தெரு, 1962 முதல்." },
    text: {
      en: "A familiar corner of Periyakulam where families have picked up their sweets for generations.",
      ta: "தலைமுறைகளாக குடும்பங்கள் இனிப்பு வாங்கும் பெரியகுளத்தின் பழகிய இடம்.",
    },
  },
  {
    image: assets.images.store2,
    tag: { en: "Fresh Sweets", ta: "புதிய இனிப்புகள்" },
    title: {
      en: "Made fresh, made with ghee.",
      ta: "நெய்யில் செய்த புதிய இனிப்பு.",
    },
    text: {
      en: "Ghee laddu, halwa and milk sweets prepared in small batches every morning.",
      ta: "நெய் லட்டு, அல்வா, பால் இனிப்புகள் தினமும் காலை சிறு சிறு தொகுதிகளாக தயாராகின்றன.",
    },
  },
  {
    image: assets.images.store3,
    tag: { en: "Festival Boxes", ta: "பண்டிகைப் பெட்டிகள்" },
    title: {
      en: "Boxes for every occasion.",
      ta: "ஒவ்வொரு விழாவுக்கும் பெட்டிகள்.",
    },
    text: {
      en: "Gift boxes for festivals, weddings and family gatherings, packed the way you like.",
      ta: "பண்டிகை, திருமணம், குடும்ப விழாக்களுக்கு உங்கள் விருப்பப்படி பேக் செய்யப்பட்ட பெட்டிகள்.",
    },
  },
  {
    image: assets.images.store4,
    tag: { en: "Hot Savouries", ta: "சூடான காரம்" },
    title: {
      en: "Evening rush, hot savouries.",
      ta: "மாலை கூட்டம், சூடான காரம்.",
    },
    text: {
      en: "Fresh savouries, bakery items and filter coffee, served hot till late evening.",
      ta: "புதிய காரம், பேக்கரி, ஃபில்டர் காபி மாலை வரை சூடாக கிடைக்கும்.",
    },
  },
  {
    image: assets.images.employee,
    tag: { en: "Our Team", ta: "எங்கள் குழு" },
    title: {
      en: "Hard-working hands, every day.",
      ta: "தினமும் உழைக்கும் கைகள்.",
    },
    text: {
      en: "From the first batch in the morning to the last order at night, our dedicated team keeps the taste and service the same, every single day.",
      ta: "காலை முதல் தொகுதி முதல் இரவு கடைசி ஆர்டர் வரை, எங்கள் அர்ப்பணிப்புள்ள குழு தினமும் அதே சுவை, அதே சேவையை தருகிறது.",
    },
  },
];
