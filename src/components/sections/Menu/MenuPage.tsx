import { Container } from "@mui/material";
import { client } from "@/sanity/lib/client";
import MenuGrid, { type MenuItem } from "@/components/sections/Menu/Menugrid";

const QUERY = `*[_type == "menuItem" && available != false]
  | order(category asc, nameEn asc) {
    _id, nameEn, nameTa, descEn, descTa, category, price, unit, image
  }`;

export default async function MenuPage() {
  let items: MenuItem[] = [];
  try {
    items = await client.fetch<MenuItem[]>(
      QUERY,
      {},
      { next: { revalidate: 30 } },
    );
  } catch (e) {
    console.error("Could not load menu from Sanity", e);
  }

  return (
    <Container sx={{ pt: 14, pb: 8 }}>
      <MenuGrid items={items} />
    </Container>
  );
}
