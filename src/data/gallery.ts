// Gallery items. Gallery reads this file.
// Edit the text to match each real photo.

import assets from "@/assets";
import { L } from "@/il8n/ui";

export type GalleryItem = {
  key: keyof typeof assets.gallery;
  tag: L;
  title: L;
  text: L;
};

export const galleryItems: GalleryItem[] = [
  {
    key: "store1",
    tag: { en: "Our Store", ta: "எங்கள் கடை" },
    title: { en: "Bazaar Street, since 1962", ta: "பஜார் தெரு, 1962 முதல்" },
    text: {
      en: "The corner of Periyakulam where families have picked up their sweets for generations.",
      ta: "தலைமுறைகளாக குடும்பங்கள் இனிப்பு வாங்கும் பெரியகுளத்தின் பழகிய இடம்.",
    },
  },
  {
    key: "box1",
    tag: { en: "Gift Boxes", ta: "பரிசுப் பெட்டிகள்" },
    title: { en: "Packed with care", ta: "அன்புடன் பேக் செய்தது" },
    text: {
      en: "Festival and wedding boxes packed fresh the way you like.",
      ta: "பண்டிகை, திருமணப் பெட்டிகள் உங்கள் விருப்பப்படி புதிதாக பேக் செய்யப்படும்.",
    },
  },
  {
    key: "store2",
    tag: { en: "Fresh Daily", ta: "தினமும் புதியது" },
    title: { en: "Made fresh every morning", ta: "தினமும் காலை புதிதாக" },
    text: {
      en: "Ghee laddu, halwa and milk sweets made in small batches.",
      ta: "நெய் லட்டு, அல்வா, பால் இனிப்புகள் சிறு தொகுதிகளாக தயாராகின்றன.",
    },
  },
  {
    key: "employee",
    tag: { en: "Our Team", ta: "எங்கள் குழு" },
    title: {
      en: "The hands behind the sweets",
      ta: "இனிப்புகளின் பின்னால் உள்ள கைகள்",
    },
    text: {
      en: "Our team keeps the same taste and service every single day.",
      ta: "எங்கள் குழு தினமும் அதே சுவை, அதே சேவையை தருகிறது.",
    },
  },
  {
    key: "box2",
    tag: { en: "Gift Boxes", ta: "பரிசுப் பெட்டிகள்" },
    title: {
      en: "Boxes for every occasion",
      ta: "ஒவ்வொரு விழாவுக்கும் பெட்டிகள்",
    },
    text: {
      en: "Choose your mix of sweets and savouries, ready to gift.",
      ta: "இனிப்பு, காரம் கலவையை தேர்வு செய்யுங்கள், பரிசளிக்கத் தயார்.",
    },
  },
  {
    key: "store3",
    tag: { en: "Festival Rush", ta: "பண்டிகை கூட்டம்" },
    title: { en: "Busy when it matters", ta: "விசேஷ நாட்களில் கூட்டம்" },
    text: {
      en: "Festival days fill the shop, and the self pick-up counter keeps the line moving.",
      ta: "பண்டிகை நாட்களில் கடை நிரம்பும். சுயமாக எடுக்கும் கவுண்டர் வரிசையை நகர்த்தும்.",
    },
  },
  {
    key: "gallery1",
    tag: { en: "From the Counter", ta: "கவுண்டரில் இருந்து" },
    title: { en: "Fresh on the counter", ta: "கவுண்டரில் புதியது" },
    text: {
      en: "Traditional sweets and bakery, laid out fresh through the day.",
      ta: "பாரம்பரிய இனிப்புகள், பேக்கரி நாள் முழுவதும் புதிதாக.",
    },
  },
  {
    key: "box3",
    tag: { en: "Gift Boxes", ta: "பரிசுப் பெட்டிகள்" },
    title: { en: "Ready to carry home", ta: "வீட்டிற்கு எடுத்துச் செல்ல" },
    text: {
      en: "Neatly boxed and ready for family, friends and guests.",
      ta: "குடும்பம், நண்பர்கள், விருந்தினர்களுக்கு நேர்த்தியாக பேக் செய்தது.",
    },
  },
  {
    key: "store4",
    tag: { en: "Evening", ta: "மாலை" },
    title: {
      en: "Hot savouries, hotter tea",
      ta: "சூடான காரம், அதைவிட சூடான டீ",
    },
    text: {
      en: "The evening rush: fresh savouries, chaat and filter coffee.",
      ta: "மாலை கூட்டம்: புதிய காரம், சாட், ஃபில்டர் காபி.",
    },
  },
];
