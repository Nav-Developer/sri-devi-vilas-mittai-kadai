"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { storeSlides } from "@/data/storySlides";
import { useLang } from "@/il8n/LanguageProvider";

const INTERVAL = 5000;

export default function StoreCarouselCinema() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const total = storeSlides.length;
  const slide = storeSlides[active];

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % total), INTERVAL);
    return () => clearInterval(id);
  }, [active, total]);

  return (
    <section className="px-6 py-24">
      <div className="relative mx-auto h-[70vh] min-h-[460px] max-w-7xl overflow-hidden rounded-[2.5rem] border-8 border-maroon-800 bg-maroon-800 shadow-[0_16px_0_#f4b942]">
        <AnimatePresence>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Image
              src={slide.image}
              alt={t(slide.title)}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-maroon-800 via-maroon-800/40 to-transparent" />

        {/* progress bar */}
        <div className="absolute inset-x-0 top-0 z-20 h-1.5 bg-white/20">
          <motion.div
            key={active}
            className="h-full bg-gold-400"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: INTERVAL / 1000, ease: "linear" }}
          />
        </div>

        {/* text */}
        <div className="absolute bottom-0 left-0 z-10 max-w-xl p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
                {t(slide.tag)}
              </p>
              <h2 className="text-4xl font-black leading-tight text-cream-200 md:text-5xl">
                {t(slide.title)}
              </h2>
              <p className="mt-4 text-lg text-cream-200/80">{t(slide.text)}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* thumbnails */}
        <div className="absolute bottom-8 right-8 z-20 hidden gap-3 md:flex">
          {storeSlides.map((s, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`relative h-16 w-24 overflow-hidden rounded-xl border-2 transition ${
                i === active
                  ? "border-gold-400 opacity-100"
                  : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <Image
                src={s.image}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
