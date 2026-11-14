"use client";

import { motion } from "framer-motion";
import { store } from "@/data/store";
import { ui } from "@/il8n/ui";
import { useLang } from "@/il8n/LanguageProvider";

export default function Specialties() {
  const { t } = useLang();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-crimson-600">
          <span className="h-px w-10 bg-crimson-600" />
          {t(ui.spec.kicker)}
        </p>
        <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-maroon-800 md:text-6xl">
          {t(ui.spec.h2a)}{" "}
          <span className="font-serif italic text-crimson-600">
            {t(ui.spec.h2b)}
          </span>
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {store.specialties.map((s, i) => (
            <motion.article
              key={s.name.en}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border-2 border-maroon-800 bg-cream-200 p-7 shadow-[6px_6px_0_#5c0f14] transition-shadow hover:shadow-[10px_10px_0_#a8171f]"
            >
              <span
                aria-hidden
                className="absolute -right-3 -top-6 select-none font-serif text-8xl font-black italic text-crimson-600/15"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl font-black text-maroon-800">
                {t(s.name)}
              </h3>
              <p className="mt-3 text-maroon-800/75">{t(s.desc)}</p>
            </motion.article>
          ))}
        </div>

        {store.offers.length > 0 && (
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-crimson-600 px-8 py-6 text-cream-200">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
                {t(ui.spec.offer)}
              </p>
              <p className="text-2xl font-black">{t(store.offers[0].title)}</p>
              <p className="text-cream-200/85">{t(store.offers[0].note)}</p>
            </div>
            <a
              href={store.phones[0].href}
              className="rounded-full bg-maroon-800 px-6 py-3 text-sm font-black uppercase tracking-wider text-gold-400 transition hover:-translate-y-1"
            >
              {t(ui.spec.call)} {store.phones[0].label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
