"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { storeSlides } from "@/data/storySlides";
import { useLang } from "@/il8n/LanguageProvider";

const INTERVAL = 5000;

export default function StoreCarousel() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const slide = storeSlides[active];
  const total = storeSlides.length;

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % total), INTERVAL);
    return () => clearInterval(id);
  }, [active, total]);

  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        {/* IMAGE */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-8 border-maroon-800 bg-maroon-800 shadow-[0_16px_0_#f4b942]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            >
              <Image
                src={slide.image}
                alt={t(slide.title)}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <span className="absolute left-4 top-4 z-10 rounded-full bg-gold-400 px-4 py-1 text-xs font-black uppercase tracking-widest text-maroon-800">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* TEXT */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-crimson-600">
                <span className="h-px w-10 bg-crimson-600" />
                {t(slide.tag)}
              </p>
              <h2 className="text-4xl font-black leading-tight tracking-tight text-maroon-800 md:text-5xl">
                {t(slide.title)}
              </h2>
              <p className="mt-5 max-w-md text-lg text-maroon-800/75">
                {t(slide.text)}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CONTROLS */}
          <div className="mt-8 flex items-center gap-6">
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous"
                onClick={prev}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-maroon-800 text-maroon-800 transition hover:bg-maroon-800 hover:text-cream-200"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={next}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-maroon-800 text-maroon-800 transition hover:bg-maroon-800 hover:text-cream-200"
              >
                →
              </button>
            </div>

            <div className="flex gap-2">
              {storeSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === active
                      ? "w-8 bg-maroon-800"
                      : "w-2.5 bg-maroon-800/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
