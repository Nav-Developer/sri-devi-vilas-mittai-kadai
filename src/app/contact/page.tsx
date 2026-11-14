import { client } from "@/sanity/lib/client";
import ContactForm, {
  type ContactItem,
} from "@/components/sections/Contact/ContactForm";
import BranchesMap from "@/components/sections/Branches/BranchesMap";
import { store } from "@/data/store";
import BranchesGrid from "@/components/sections/Branches/BranchesGrid";

const ITEMS = `*[_type == "menuItem" && available != false]
  | order(nameEn asc) { _id, nameEn, nameTa, price, unit }`;
const SETTINGS = `*[_type == "shopSettings"][0]{ whatsapp, phones }`;

export default async function ContactPage() {
  let items: ContactItem[] = [];
  let settings: { whatsapp?: string; phones?: string[] } | null = {
    whatsapp: store.whatsapp.label,
    phones: store.phones.map((a) => a.label),
  };

  try {
    const opts = { next: { revalidate: 30 } };
    [items, settings] = await Promise.all([
      client.fetch<ContactItem[]>(ITEMS, {}, opts),
      client.fetch<typeof settings>(SETTINGS, {}, opts),
    ]);
  } catch (e) {
    console.error("Could not load contact data from Sanity", e);
  }

  return (
    <>
      <ContactForm
        items={items ?? []}
        branches={[]}
        phones={settings?.phones ?? []}
        whatsapp={settings?.whatsapp ?? ""}
      />
      <BranchesGrid />
    </>
  );
}
