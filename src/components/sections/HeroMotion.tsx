"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import assets from "@/assets";
import { store } from "@/data/store";
import { useLang } from "@/il8n/LanguageProvider";
import { ui } from "@/il8n/ui";

const MARQUEE = [
  "நெய் லட்டு · Ghee Laddu",
  "அல்வா · Halwa",
  "குலாப் ஜாமூன் · Gulab Jamun",
  "காரம் · Savouries",
  "கேக் · Cakes",
  "காபி · Filter Coffee",
];

export default function HeroMotion() {
  const { lang, t } = useLang();
  const lines = ui.hero.lines[lang];

  return (
    <>
      <section className="relative min-h-screen overflow-hidden px-6 pb-20 pt-40">
        {/* ghost year */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -left-6 select-none text-[30vw] font-black leading-none text-transparent"
          style={{ WebkitTextStroke: "2px rgba(168,23,31,0.2)" }}
        >
          {store.since}
        </span>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-crimson-600"
            >
              <span className="h-px w-10 bg-crimson-600" />
              {t(store.address.city)}
              {/* · {t(store.address.Secondcity)} ·{" "}
              {t(store.address.district)} */}
            </motion.p>

            <h1
              key={lang}
              className="text-5xl font-black leading-[0.98] tracking-tight text-maroon-800 md:text-7xl"
            >
              {lines.map((l, k) => (
                <span key={l} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className={`block ${
                      k === 1 ? "font-serif italic text-crimson-600" : ""
                    }`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.15 * k + 0.1,
                      duration: 0.7,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 max-w-md text-lg text-maroon-800/75"
            >
              {t(store.tagline)} {t(ui.hero.sub)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/menu"
                className="rounded-full bg-maroon-800 px-8 py-3 text-sm font-black uppercase tracking-wider text-cream-200 transition hover:-translate-y-1 hover:shadow-[0_8px_0_#f4b942]"
              >
                {t(ui.hero.sweets)}
              </Link>
              <a
                href={store.whatsapp.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border-2 border-maroon-800 px-8 py-3 text-sm font-black uppercase tracking-wider text-maroon-800 transition hover:bg-maroon-800 hover:text-cream-200"
              >
                {t(ui.hero.whatsapp)}
              </a>
              <a
                href={store.phones[0].href}
                className="rounded-full border-2 border-maroon-800 px-8 py-3 text-sm font-black uppercase tracking-wider text-maroon-800 transition hover:bg-maroon-800 hover:text-cream-200"
              >
                {t(ui.hero.call)}
              </a>
              <Link
                href="/contact"
                className="group flex items-center gap-2 text-sm font-black uppercase tracking-wider text-maroon-800"
              >
                {t(ui.hero.find)}
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>

          {/* LOGO MEDALLION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <div className="absolute inset-0 rounded-full bg-gold-400/40 blur-3xl" />
            <motion.div
              className="absolute inset-4 rounded-full border-2 border-dashed border-crimson-600/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-10 overflow-hidden rounded-full border-8 border-maroon-800 bg-white shadow-[0_20px_0_#f4b942]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={assets.images.logo}
                alt={store.fullName}
                fill
                priority
                sizes="400px"
                className="object-contain p-3"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-maroon-800 py-4">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-25%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1, 2, 3].map((c) => (
            <div key={c} className="flex shrink-0">
              {MARQUEE.map((w) => (
                <span
                  key={w + c}
                  className="mx-8 whitespace-nowrap text-xl font-black uppercase tracking-wider text-gold-400"
                >
                  {w}
                  <span className="ml-16 text-saffron">✦</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
