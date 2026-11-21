import { NextResponse } from "next/server";

export const revalidate = 86400;

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const id = process.env.GOOGLE_PLACE_ID;

  if (!key || !id) {
    return NextResponse.json({ error: "Missing env" }, { status: 500 });
  }

  const res = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask":
        "displayName,rating,userRatingCount,googleMapsUri,reviews",
    },
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Google error" }, { status: 502 });
  }

  const d = await res.json();

  return NextResponse.json({
    rating: d.rating ?? 0,
    count: d.userRatingCount ?? 0,
    url: d.googleMapsUri ?? "",
    reviews: (d.reviews ?? []).map((r: any) => ({
      name: r.authorAttribution?.displayName ?? "",
      photo: r.authorAttribution?.photoUri ?? "",
      rating: r.rating ?? 5,
      text: r.text?.text ?? r.originalText?.text ?? "",
      when: r.relativePublishTimeDescription ?? "",
    })),
  });
}
