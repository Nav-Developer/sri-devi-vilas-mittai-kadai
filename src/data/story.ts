// Story chapters, one per time of day. StoryScroll reads this file.
// bg/fg shift as the user scrolls, so keep fg readable on bg.

import { L } from "@/il8n/ui";

export type Chapter = {
  tag: L;
  title: L;
  text: L;
  time: string;
  period: string;
  bg: string;
  fg: string;
  stats?: { value: number; suffix: L; label: L }[];
};

export const chapters: Chapter[] = [
  {
    tag: { en: "Morning", ta: "காலை" },
    title: { en: "The shutters go up.", ta: "கடை திறக்கிறது." },
    text: {
      en: "By seven the trays are out and the ghee is warm. First batch of sweets, first filter coffee, first familiar faces at Bazaar Street.",
      ta: "ஏழு மணிக்கே தட்டுகள் தயார், நெய் மணக்கிறது. முதல் இனிப்பு, முதல் காபி, பஜார் தெருவின் பழகிய முகங்கள்.",
    },
    time: "7",
    period: "AM",
    bg: "#fbe3a8",
    fg: "#5c0f14",
  },
  {
    tag: { en: "Noon", ta: "மதியம்" },
    title: {
      en: "Boxes for every occasion.",
      ta: "ஒவ்வொரு விழாவுக்கும் பெட்டிகள்.",
    },
    text: {
      en: "Ghee laddu, milk sweets, halwa. Families pick up festival boxes, and the district's first self pick-up counter keeps the line moving.",
      ta: "நெய் லட்டு, பால் இனிப்பு, அல்வா. குடும்பங்கள் பண்டிகைப் பெட்டிகளை எடுத்துச் செல்கின்றன. சுயமாக எடுக்கும் கவுண்டர் வரிசையை நகர்த்துகிறது.",
    },
    time: "12",
    period: "PM",
    bg: "#f4b942",
    fg: "#2e0a0c",
  },
  {
    tag: { en: "Evening", ta: "மாலை" },
    title: {
      en: "Hot savouries, hotter tea.",
      ta: "சூடான காரம், அதைவிட சூடான டீ.",
    },
    text: {
      en: "This is the rush. Fresh savouries, chaat, evening tea and filter coffee. Half of Periyakulam seems to drop in on the way home.",
      ta: "இதுதான் கூட்ட நேரம். புதிய காரம், சாட், மாலை டீ, ஃபில்டர் காபி. வீட்டுக்குப் போகும் வழியில் பாதி பெரியகுளமும் இங்கே வருகிறது.",
    },
    time: "5",
    period: "PM",
    bg: "#a8171f",
    fg: "#fff1d6",
  },
  {
    tag: { en: "Night", ta: "இரவு" },
    title: {
      en: "Still open till 10:30.",
      ta: "இரவு 10:30 வரை திறந்திருக்கும்.",
    },
    text: {
      en: "Cakes, pastries and last-minute custom orders. Three branches now, one standard of taste, carried since 1962.",
      ta: "கேக், பேஸ்ட்ரி, கடைசி நிமிட ஆர்டர்கள். இப்போது மூன்று கிளைகள், ஒரே சுவை, 1962 முதல்.",
    },
    time: "10",
    period: "PM",
    bg: "#2e0a0c",
    fg: "#f7c873",
    stats: [
      {
        value: 1962,
        suffix: { en: "", ta: "" },
        label: { en: "Since", ta: "தொடக்கம்" },
      },
      {
        value: 8,
        suffix: { en: "", ta: "" },
        label: { en: "Branches", ta: "கிளைகள்" },
      },
      {
        value: 15,
        suffix: { en: "½ hrs", ta: "½ மணி" },
        label: { en: "Open daily", ta: "தினமும் திறப்பு" },
      },
    ],
  },
];
