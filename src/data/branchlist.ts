import type { L } from "@/il8n/ui";
import { towns } from "@/data/store";

export type BranchItem = {
  town: (typeof towns)[number];
  address: L;
  /** optional: exact Google Maps share link for this branch */
  maps?: string;
};

export const EMAIL = "sridevivilasmittaikadai@gmail.com";

export const mapsLink = (b: BranchItem) =>
  b.maps ??
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `Sri Devi Vilas Mittai Kadai Mittai Kadai, ${b.address.en}, Tamil Nadu`,
  )}`;
// export const embedUrl = (b: BranchItem) =>
//   b.latlng
//     ? `https://www.google.com/maps?q=${b.latlng[0]},${b.latlng[1]}(${encodeURIComponent(
//         "Sri Devi Vilas Mittai Kadai",
//       )})&z=17&output=embed`
//     : `https://www.google.com/maps?q=${encodeURIComponent(
//         nameQuery(b),
//       )}&z=17&output=embed`;

export const branchList: BranchItem[] = [
  {
    town: "Periyakulam",
    address: {
      en: "Moondranthal Bazaar Street, Periyakulam",
      ta: "மூன்றாந்தல் பஜார் வீதி, பெரியகுளம்",
    },
  },
  // {
  //   town: "Periyakulam",
  //   address: {
  //     en: "39, Kadaiveedhi, Thenkarai, Periyakulam",
  //     ta: "39, கடைவீதி, தென்கரை, பெரியகுளம்",
  //   },
  // },
  // {
  //   town: "Periyakulam",
  //   address: {
  //     en: "Opposite Mariamman Temple, Periyakulam",
  //     ta: "மாரியம்மன் கோவில் எதிர்புறம், பெரியகுளம்",
  //   },
  // },
  // {
  //   town: "Periyakulam",
  //   address: {
  //     en: "Aranmanai Street, Vadakarai, Periyakulam",
  //     ta: "அரண்மனைத்தெரு, வடகரை, பெரியகுளம்",
  //   },
  // },
  // {
  //   town: "Periyakulam",
  //   address: {
  //     en: "Old Bus Stand, Vadakarai, Periyakulam",
  //     ta: "பழைய பஸ்நிலையம், வடகரை, பெரியகுளம்",
  //   },
  // },

  // {
  //   town: "Theni",
  //   address: {
  //     en: "Near Convent, Periyakulam Road, Theni",
  //     ta: "கான்வென்ட் அருகில், பெரியகுளம் ரோடு, தேனி",
  //   },
  // },
  // {
  //   town: "Andipatti",
  //   address: {
  //     en: "Near Bus Stand, Andipatti",
  //     ta: "பஸ்நிலையம் அருகில், ஆண்டிபட்டி",
  //   },
  // },
  // {
  //   town: "Andipatti",
  //   address: {
  //     en: "Near Hindu School, Jakkampatti, Andipatti",
  //     ta: "இந்து ஸ்கூல் அருகில், ஜக்கம்பட்டி, ஆண்டிபட்டி",
  //   },
  // },
];
