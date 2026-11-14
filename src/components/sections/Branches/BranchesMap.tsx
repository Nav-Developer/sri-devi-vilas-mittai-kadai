"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { store } from "@/data/store";
import { useLang } from "@/il8n/LanguageProvider";
import { branchList, mapsLink } from "@/data/branchlist";

const embedSrc = (en: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(
    `Sri Devi Vilas Mittai Kadai MITTAI KADAI, ${en}, Tamil Nadu`,
  )}&output=embed`;

export default function BranchesMap() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const current = branchList[active];

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

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* MAP (on top for mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 lg:sticky lg:top-32 lg:self-start"
          >
            <div className="overflow-hidden rounded-3xl border-2 border-gold-400 shadow-[0_10px_30px_rgba(43,10,12,0.2)]">
              <iframe
                key={active}
                title={current.address.en}
                src={embedSrc(current.address.en)}
                className="h-[320px] w-full md:h-[480px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={mapsLink(current)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-full bg-maroon-900 px-8 py-3 text-sm font-black uppercase tracking-wider text-gold-400 transition hover:-translate-y-1"
            >
              {t({ en: "Get directions", ta: "வழி காட்டு" })} →
            </a>
          </motion.div>

          {/* LIST */}
          <ul className="order-2 grid gap-3 lg:order-1">
            {branchList.map((b, i) => {
              const town = store.branches.find((x) => x.en === b.town);
              const on = i === active;
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition ${
                      on
                        ? "border-gold-400 bg-maroon-900 text-cream-200"
                        : "border-maroon-900/20 bg-white/60 text-maroon-900 hover:border-maroon-900"
                    }`}
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-black ${
                        on
                          ? "bg-gold-400 text-maroon-900"
                          : "bg-maroon-900 text-gold-400"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block text-[11px] font-black uppercase tracking-[0.14em] ${
                          on ? "text-gold-400" : "opacity-70"
                        }`}
                      >
                        {town ? t(town) : b.town}
                      </span>
                      <span className="block text-base font-bold leading-snug">
                        {t(b.address)}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
