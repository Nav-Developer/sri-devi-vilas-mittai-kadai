"use client";

import { motion } from "framer-motion";
import { store } from "@/data/store";
import { useLang } from "@/il8n/LanguageProvider";
import { branchList, mapsLink } from "@/data/branchlist";

export default function BranchesGrid() {
  const { t } = useLang();

  return (
    <section className="px-6 pb-20 pt-4">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-maroon-900">
          <span className="h-px w-10 bg-maroon-900" />
          {t({ en: "Our branches", ta: "எங்கள் கிளைகள்" })}
        </p>
        <h2 className="mb-10 text-4xl font-black leading-tight text-maroon-900 md:text-5xl">
          {t({
            en: "Find us near you.",
            ta: "உங்கள் அருகில் எங்களைக் காணுங்கள்.",
          })}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {branchList.map((b, i) => {
            const town = store.branches.find((x) => x.en === b.town);
            return (
              <motion.a
                key={i}
                href={mapsLink(b)}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col justify-between rounded-3xl border-2 border-gold-400 bg-maroon-900 p-6 text-cream-200 shadow-[0_10px_30px_rgba(43,10,12,0.2)]"
              >
                <div>
                  <span className="inline-block rounded-full bg-gold-400 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-maroon-900">
                    {town ? t(town) : b.town}
                  </span>
                  <p className="mt-4 text-lg font-bold leading-snug">
                    <span className="mr-2">📍</span>
                    {t(b.address)}
                  </p>
                </div>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-gold-400 transition-transform group-hover:translate-x-1">
                  {t({ en: "Get directions", ta: "வழி காட்டு" })} →
                </p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
