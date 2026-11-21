"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { storeSlides } from "@/data/storySlides";
import { useLang } from "@/il8n/LanguageProvider";

const INTERVAL = 5000;

export default function StoreCarouselPanels() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const total = storeSlides.length;

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % total), INTERVAL);
    return () => clearInterval(id);
  }, [active, total]);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto flex h-[640px] max-w-7xl flex-col gap-3 md:h-[520px] md:flex-row">
        {storeSlides.map((s, i) => {
          const open = i === active;
          return (
            <motion.div
              key={i}
              layout
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              animate={{ flexGrow: open ? 4 : 1 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="relative min-h-0 min-w-0 basis-0 cursor-pointer overflow-hidden rounded-3xl border-4 border-maroon-800 bg-maroon-800"
            >
              <Image
                src={s.image}
                alt={t(s.title)}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className={`object-cover transition duration-700 ${
                  open ? "scale-100" : "scale-110 brightness-50"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-800/90 via-transparent to-transparent" />

              <span className="absolute left-5 top-4 text-5xl font-black text-gold-400/90">
                {String(i + 1).padStart(2, "0")}
              </span>

              <motion.div
                animate={{ opacity: open ? 1 : 0, y: open ? 0 : 20 }}
                transition={{ duration: 0.4, delay: open ? 0.3 : 0 }}
                className="absolute inset-x-0 bottom-0 p-6 md:p-8"
              >
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
                  {t(s.tag)}
                </p>
                <h3 className="text-2xl font-black leading-tight text-cream-200 md:text-4xl">
                  {t(s.title)}
                </h3>
                <p className="mt-3 max-w-md text-cream-200/80">{t(s.text)}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
