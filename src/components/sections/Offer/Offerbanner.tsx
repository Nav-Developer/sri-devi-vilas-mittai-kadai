import { client } from "@/sanity/lib/client";
import OfferBannerView, { type Offer } from "./Offerbannerview";

const QUERY = `*[_type == "offer" && active != false]
  | order(_updatedAt desc)[0] {
    _id, titleEn, titleTa, noteEn, noteTa, image
  }`;

export default async function OfferBanner() {
  let offer: Offer | null = null;
  try {
    offer = await client.fetch<Offer | null>(QUERY, {}, { cache: "no-store" });
  } catch (e) {
    console.error("Could not load offer from Sanity", e);
  }

  if (!offer) return null;
  return <OfferBannerView offer={offer} />;
}
