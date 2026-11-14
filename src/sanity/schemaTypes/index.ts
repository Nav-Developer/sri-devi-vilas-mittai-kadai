import { defineField, defineType } from "sanity";

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    defineField({
      name: "nameEn",
      title: "Name (English)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "nameTa",
      title: "Name (தமிழ்)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "descEn",
      title: "Description (English)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "descTa",
      title: "Description (தமிழ்)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Sweets", value: "sweets" },
          { title: "Savouries", value: "savouries" },
          { title: "Cakes", value: "cakes" },
          { title: "Drinks", value: "drinks" },
        ],
      },
    }),
    defineField({
      name: "price",
      title: "Price (₹)",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "unit",
      title: "Per",
      type: "string",
      description: "Example: 250 g, 1 kg, 1 piece",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "available",
      title: "Available today",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "nameEn", subtitle: "price", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle ? `₹${subtitle}` : "",
      media,
    }),
  },
});

/* ---------- Offer ---------- */
export const offer = defineType({
  name: "offer",
  title: "Offer",
  type: "document",
  fields: [
    defineField({ name: "titleEn", title: "Title (English)", type: "string" }),
    defineField({ name: "titleTa", title: "Title (தமிழ்)", type: "string" }),
    defineField({ name: "noteEn", title: "Note (English)", type: "string" }),
    defineField({ name: "noteTa", title: "Note (தமிழ்)", type: "string" }),
    defineField({
      name: "image",
      title: "Banner image (optional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "active",
      title: "Show on website",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "titleEn", subtitle: "noteEn", media: "image" },
  },
});

/* ---------- Branch ---------- */
export const branch = defineType({
  name: "branch",
  title: "Branch",
  type: "document",
  fields: [
    defineField({
      name: "town",
      title: "Town",
      type: "string",
      options: {
        list: [
          { title: "Periyakulam", value: "Periyakulam" },
          // { title: "Theni", value: "Theni" },
          // { title: "Andipatti", value: "Andipatti" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "addressEn",
      title: "Address (English)",
      type: "string",
    }),
    defineField({
      name: "addressTa",
      title: "Address (தமிழ்)",
      type: "string",
    }),
  ],
  preview: { select: { title: "addressEn", subtitle: "town" } },
});

/* ---------- Shop settings (create only ONE) ---------- */
export const shopSettings = defineType({
  name: "shopSettings",
  title: "Shop Settings",
  type: "document",
  fields: [
    defineField({
      name: "closedToday",
      title: "Closed today",
      type: "boolean",
      description: "Turn on for holidays. The website will show Closed.",
      initialValue: false,
    }),
    defineField({
      name: "openTime",
      title: "Opening time",
      type: "string",
      description: "24-hour format, e.g. 07:00",
      initialValue: "07:00",
    }),
    defineField({
      name: "closeTime",
      title: "Closing time",
      type: "string",
      description: "24-hour format, e.g. 22:30",
      initialValue: "22:30",
    }),
    defineField({
      name: "phones",
      title: "Phone numbers",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp number (with 91, no +)",
      type: "string",
      description: "Example: 916379765853",
    }),
  ],
  preview: { prepare: () => ({ title: "Shop Settings" }) },
});

export const schemaTypes = [menuItem, offer, branch, shopSettings];
export const schema = { types: schemaTypes };
