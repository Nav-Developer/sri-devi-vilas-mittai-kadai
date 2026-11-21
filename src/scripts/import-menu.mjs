import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const CSV = process.argv[2] || "sri-devi-vilas-menu.csv";
const PHOTOS = "photos";
const EXTS = ["jpg", "jpeg", "png", "webp"];

// CSV category -> Sanity category value
const CATEGORY = {
  sweets: "sweets",
  savouries: "savouries",
  bakery: "cakes",
  cakes: "cakes",
  drinks: "drinks",
};

const slug = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function findPhoto(row, s) {
  const named = row["Photo"]?.trim();
  if (named) {
    const p = path.join(PHOTOS, named);
    if (fs.existsSync(p)) return p;
  }
  for (const ext of EXTS) {
    const p = path.join(PHOTOS, `${s}.${ext}`);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

const text = fs.readFileSync(CSV, "utf8").replace(/^\uFEFF/, "");
const { data } = Papa.parse(text, { header: true, skipEmptyLines: true });

for (const r of data) {
  const nameEn = r["Name (English)"]?.trim();
  if (!nameEn) continue;
  const s = slug(nameEn);

  // reuse an existing item with the same name, so no duplicates
  const existing = await client.fetch(
    `*[_type=="menuItem" && lower(nameEn)==$n][0]._id`,
    { n: nameEn.toLowerCase() },
  );
  const _id = existing || `menu-${s}`;

  const price = r["Price (₹)"]?.trim();
  const fields = {
    nameEn,
    nameTa: r["Name (Tamil)"]?.trim(),
    descEn: r["Description (English)"]?.trim(),
    descTa: r["Description (Tamil)"]?.trim(),
    category: CATEGORY[r["Category"]?.trim().toLowerCase()],
    unit: r["Per"]?.trim(),
    price: price ? Number(price) : undefined,
  };

  const photo = findPhoto(r, s);
  if (photo) {
    const asset = await client.assets.upload(
      "image",
      fs.createReadStream(photo),
    );
    fields.image = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
  }

  // drop empty values so re-running never wipes what you added in Studio
  const clean = Object.fromEntries(
    Object.entries(fields).filter(([, v]) => v !== undefined && v !== ""),
  );

  await client
    .transaction()
    .createIfNotExists({ _id, _type: "menuItem", nameEn, available: true })
    .patch(_id, (p) => p.set(clean))
    .commit();

  console.log(
    existing ? "updated" : "created",
    "·",
    nameEn,
    photo ? "· photo" : "",
  );
}
