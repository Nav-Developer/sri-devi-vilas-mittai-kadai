"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { storeSlides } from "@/data/storySlides";
import { useLang } from "@/il8n/LanguageProvider";

const INTERVAL = 5000;

export default function StoreBanner() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = storeSlides.length;

  const go = (i: number) => setActive((i + total) % total);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % total), INTERVAL);
    return () => clearInterval(id);
  }, [active, paused, total]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) go(active + 1);
    else if (info.offset.x > 80) go(active - 1);
  };

  return (
    <section
      className="relative h-[85vh] min-h-[520px] w-full overflow-hidden bg-maroon-800"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* SLIDING TRACK */}
      <motion.div
        className="flex h-full cursor-grab active:cursor-grabbing"
        animate={{ x: `-${active * 100}%` }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={onDragEnd}
      >
        {storeSlides.map((s, i) => (
          <div key={i} className="relative h-full w-full shrink-0">
            <Image
              src={s.image}
              alt={t(s.title)}
              fill
              priority={i === 0}
              sizes="100vw"
              draggable={false}
              className="pointer-events-none select-none object-cover"
            />
          </div>
        ))}
      </motion.div>

      {/* GRADIENT */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon-800/90 via-maroon-800/20 to-transparent" />

      {/* BIG GHOST NUMBER */}
      <AnimatePresence mode="wait">
        <motion.span
          key={active}
          aria-hidden
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute right-6 top-4 select-none text-[22vw] font-black leading-none text-transparent md:right-12"
          style={{ WebkitTextStroke: "2px rgba(244,185,66,0.5)" }}
        >
          {String(active + 1).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>

      {/* TEXT */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-24 md:px-16">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
                <span className="h-px w-10 bg-gold-400" />
                {t(slideTag(active))}
              </p>
              <h2 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight text-cream-200 md:text-7xl">
                {t(storeSlides[active].title)}
              </h2>
              <p className="mt-5 max-w-lg text-lg text-cream-200/80">
                {t(storeSlides[active].text)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ARROWS */}
      <button
        type="button"
        aria-label="Previous"
        onClick={() => go(active - 1)}
        className="absolute left-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cream-200/60 text-2xl text-cream-200 backdrop-blur transition hover:bg-gold-400 hover:text-maroon-800 md:left-8"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => go(active + 1)}
        className="absolute right-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cream-200/60 text-2xl text-cream-200 backdrop-blur transition hover:bg-gold-400 hover:text-maroon-800 md:right-8"
      >
        →
      </button>

      {/* PROGRESS DOTS */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {storeSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => go(i)}
            className="relative h-1.5 w-16 overflow-hidden rounded-full bg-cream-200/30"
          >
            {i === active && (
              <motion.span
                key={`${active}-${paused}`}
                className="absolute inset-y-0 left-0 bg-gold-400"
                initial={{ width: paused ? "100%" : 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: paused ? 0 : INTERVAL / 1000,
                  ease: "linear",
                }}
              />
            )}
            {i < active && <span className="absolute inset-0 bg-gold-400" />}
          </button>
        ))}
      </div>
    </section>
  );
}

function slideTag(i: number) {
  return storeSlides[i].tag;
}
