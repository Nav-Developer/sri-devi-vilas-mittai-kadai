import assets from "@/assets";
import { L } from "@/il8n/ui";

export type Featured = {
  image: typeof assets.images.store1;
  tag: L;
  title: L;
  text: L;
};

export const featured: Featured[] = [
  {
    image: assets.images.store1,
    tag: { en: "Our signature", ta: "எங்கள் சிறப்பு" },
    title: { en: "Pure Ghee Laddu", ta: "தூய நெய் லட்டு" },
    text: {
      en: "Rolled fresh every day with pure ghee. Rich, soft and full of the aroma that regulars come back for.",
      ta: "தினமும் தூய நெய்யில் புதிதாக உருட்டப்படும் லட்டு. மென்மையான, மணமான சுவை.",
    },
  },
  {
    image: assets.images.store2,
    tag: { en: "Hard to find", ta: "அரிதாக கிடைப்பது" },
    title: { en: "Kadalai Oil Mixture", ta: "கடலை எண்ணெய் மிக்சர்" },
    text: {
      en: "A rare mixture made in kadalai (groundnut) oil with healthy ingredients. Crisp, light and not available in most shops.",
      ta: "ஆரோக்கியமான பொருட்களுடன் கடலை எண்ணெயில் செய்யப்படும் அரிய மிக்சர். மொறுமொறுப்பு, இலகு.",
    },
  },
  {
    image: assets.images.store3,
    tag: { en: "Slow-cooked", ta: "மெதுவாக கிளறியது" },
    title: { en: "Traditional Halwa", ta: "பாரம்பரிய அல்வா" },
    text: {
      en: "Stirred slowly in small batches the old way. A festival-table classic you won't find elsewhere.",
      ta: "பழைய முறையில் சிறு தொகுதிகளாக மெதுவாக கிளறி செய்யப்படும் அல்வா.",
    },
  },
];
