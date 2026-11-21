"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { store } from "@/data/store";
import { featured } from "@/data/featured";
import { ui } from "@/il8n/ui";
import { useLang } from "@/il8n/LanguageProvider";

export default function Specialties() {
  const { t } = useLang();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* FEATURED RARE ITEMS */}
        <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-crimson-600">
          <span className="h-px w-10 bg-crimson-600" />
          {t(ui.spec.featured.kicker)}
        </p>
        <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-maroon-800 md:text-6xl">
          {t(ui.spec.featured.h2a)}{" "}
          <span className="font-serif italic text-crimson-600">
            {t(ui.spec.featured.h2b)}
          </span>
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:grid-rows-2">
          {featured.map((f, i) => {
            const big = i === 0;
            return (
              <motion.article
                key={f.title.en}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className={`group relative overflow-hidden rounded-3xl border-2 border-maroon-800 bg-maroon-800 shadow-[8px_8px_0_#f4b942] transition-shadow hover:shadow-[12px_12px_0_#a8171f] ${
                  big ? "min-h-[420px] lg:row-span-2" : "min-h-[260px]"
                }`}
              >
                <Image
                  src={f.image}
                  alt={t(f.title)}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-800 via-maroon-800/50 to-transparent" />

                <span className="absolute left-5 top-5 rounded-full bg-gold-400 px-4 py-1 text-xs font-black uppercase tracking-widest text-maroon-800">
                  {t(ui.spec.featured.badge)}
                </span>
                <span
                  aria-hidden
                  className="absolute right-4 top-0 select-none font-serif text-8xl font-black italic text-gold-400/30"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
                    {t(f.tag)}
                  </p>
                  <h3
                    className={`font-black leading-tight text-cream-200 ${
                      big ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
                    }`}
                  >
                    {t(f.title)}
                  </h3>
                  <p className="mt-3 max-w-md text-cream-200/85">{t(f.text)}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* REST OF THE LIST */}
        <p className="mb-3 mt-28 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-crimson-600">
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
