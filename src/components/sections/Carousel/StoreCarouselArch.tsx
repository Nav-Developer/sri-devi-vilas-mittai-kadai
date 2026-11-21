"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { storeSlides } from "@/data/storySlides";
import { useLang } from "@/il8n/LanguageProvider";

const INTERVAL = 5500;

export default function StoreCarouselArch() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const total = storeSlides.length;
  const slide = storeSlides[active];

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % total), INTERVAL);
    return () => clearInterval(id);
  }, [active, total]);

  return (
    <section className="relative overflow-hidden bg-maroon-800 px-6 py-28">
      {/* ghost number */}
      <AnimatePresence mode="wait">
        <motion.span
          key={active}
          aria-hidden
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute -right-6 -top-10 select-none text-[28vw] font-black leading-none text-transparent"
          style={{ WebkitTextStroke: "2px rgba(244,185,66,0.25)" }}
        >
          {String(active + 1).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[0.8fr_1.2fr]">
        {/* ARCH IMAGE */}
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-t-[999px] rounded-b-3xl border-8 border-gold-400 bg-black shadow-[0_16px_0_#a8171f]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-30%", opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            >
              <Image
                src={slide.image}
                alt={t(slide.title)}
                fill
                sizes="(min-width: 768px) 30vw, 90vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* TEXT */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
                <span className="h-px w-10 bg-gold-400" />
                {t(slide.tag)}
              </p>
              <h2 className="font-serif text-4xl italic leading-tight text-cream-200 md:text-6xl">
                {t(slide.title)}
              </h2>
              <p className="mt-6 max-w-lg text-lg text-cream-200/75">
                {t(slide.text)}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-3">
            {storeSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-14 bg-gold-400" : "w-6 bg-cream-200/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
