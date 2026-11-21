"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import assets from "@/assets";
import { galleryItems } from "@/data/gallery";
import { store } from "@/data/store";
import { ui, L } from "@/il8n/ui";
import { useLang } from "@/il8n/LanguageProvider";

const LAYOUTS = [
  "coverflow",
  "ring",
  "helix",
  "sphere",
  "grid",
  "stack",
] as const;
type Layout = (typeof LAYOUTS)[number];

const LAYOUT_LABEL: Record<Layout, L> = {
  coverflow: { en: "Coverflow", ta: "கவர்ஃப்ளோ" },
  ring: { en: "Ring", ta: "வளையம்" },
  helix: { en: "Helix", ta: "சுருள்" },
  sphere: { en: "Sphere", ta: "கோளம்" },
  grid: { en: "Grid", ta: "கட்டம்" },
  stack: { en: "Stack", ta: "அடுக்கு" },
};

const T = {
  kicker: { en: "Gallery", ta: "படத்தொகுப்பு" },
  h2a: { en: "Our", ta: "எங்கள்" },
  h2b: { en: "gallery.", ta: "படங்கள்." },
  sub: {
    en: "Tap any photo to see the story behind it.",
    ta: "எந்த படத்தையும் தொட்டு கதையை பாருங்கள்.",
  },
};

const W = 320;
const H = 440;
const rad = (d: number) => (d * Math.PI) / 180;

function pose(
  layout: Layout,
  i: number,
  active: number,
  n: number,
  s: number,
  cols: number,
  rows: number,
) {
  let d = i - active;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  const a = Math.abs(d);
  const sg = Math.sign(d);
  const p = {
    x: 0,
    y: 0,
    z: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    opacity: 1,
  };

  switch (layout) {
    case "coverflow":
      p.x = d * 110 * s + sg * 180 * s;
      p.z = -a * 40 * s;
      p.rotateY = -sg * 50;
      p.scale = d === 0 ? 1.1 : 1;
      p.opacity = a > 6 ? 0 : 1;
      break;
    case "ring": {
      const ang = d * 24;
      const R = 700 * s;
      p.x = Math.sin(rad(ang)) * R;
      p.y = (1 - Math.cos(rad(ang))) * R - 240 * s;
      p.rotateZ = ang;
      p.opacity = a > 3 ? 0 : 1;
      break;
    }
    case "helix": {
      const ang = d * 30;
      const R = 560 * s;
      p.x = Math.sin(rad(ang)) * R;
      p.z = Math.cos(rad(ang)) * R - R;
      p.y = d * 36 * s;
      p.rotateY = ang;
      p.scale = 0.9;
      p.opacity = a > 5 ? 0 : 1;
      break;
    }
    case "sphere": {
      const R = 520 * s;
      const yy = 1 - (2 * (i + 0.5)) / n;
      const r = Math.sqrt(1 - yy * yy);
      const th = i * 2.399963;
      const x = Math.cos(th) * r;
      const z = Math.sin(th) * r;
      p.x = x * R;
      p.y = yy * R;
      p.z = z * R;
      p.rotateY = (Math.atan2(x, z) * 180) / Math.PI;
      p.rotateX = (-Math.asin(yy) * 180) / Math.PI;
      p.scale = 0.5;
      break;
    }
    case "grid":
      p.x = ((i % cols) - (cols - 1) / 2) * 170 * s;
      p.y = (Math.floor(i / cols) - (rows - 1) / 2) * 225 * s;
      p.scale = 0.5;
      break;
    case "stack":
      p.x = d * 42 * s;
      p.y = a * 8 * s;
      p.z = -a * 30 * s;
      p.rotateZ = d * 6;
      p.scale = d === 0 ? 1.08 : 1 - a * 0.05;
      p.opacity = a > 5 ? 0 : 1;
      break;
  }
  return p;
}

export default function Gallery() {
  const { t } = useLang();
  const items = galleryItems;
  const n = items.length;

  const [layout, setLayout] = useState<Layout>("coverflow");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [s, setS] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setS(w < 640 ? 0.6 : w < 1024 ? 0.8 : 1);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const go = (dir: number) => setActive((v) => (v + dir + n) % n);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const cols = s === 1 ? 5 : s > 0.7 ? 4 : 3;
  const rows = Math.ceil(n / cols);
  const stageH =
    layout === "grid"
      ? rows * 225 * s + 120
      : layout === "ring"
        ? 1040 * s
        : 700 * s;

  const cur = items[active];

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-4"
        >
          <motion.div
            key={cur.key}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border-2 border-gold-400 bg-maroon-800 shadow-[0_30px_100px_rgba(0,0,0,0.8)] sm:rounded-3xl md:grid md:h-[min(86dvh,560px)] md:grid-cols-[1fr_1.1fr]"
          >
            {/* photo */}
            <div className="relative h-52 shrink-0 sm:h-64 md:h-full">
              <Image
                src={assets.gallery[cur.key]}
                alt={t(cur.title)}
                fill
                sizes="(min-width:768px) 480px, 100vw"
                className="object-cover"
              />
            </div>

            {/* text */}
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex-1 overflow-y-auto p-5 md:p-10">
                <span className="inline-block rounded-full bg-gold-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-maroon-800">
                  {t(cur.tag)}
                </span>
                <h3 className="mt-4 text-2xl font-black text-cream-200 md:text-4xl">
                  {t(cur.title)}
                </h3>
                <p className="mt-4 border-l-4 border-gold-400 pl-4 text-base leading-relaxed text-cream-200/80 md:text-lg">
                  {t(cur.text)}
                </p>
              </div>

              {/* pinned footer */}
              <div className="flex shrink-0 items-center justify-between gap-3 border-t border-gold-400/30 bg-maroon-800 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-10">
                <a
                  href={store.whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-gold-400 px-5 py-3 text-xs font-black uppercase tracking-wider text-maroon-800 transition hover:-translate-y-0.5 md:text-sm"
                >
                  {t(ui.hero.whatsapp)}
                </a>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => go(-1)}
                    aria-label="Previous"
                    className="rounded-full border-2 border-gold-400/60 px-3 py-1.5 font-bold text-gold-400 transition hover:bg-gold-400 hover:text-maroon-800"
                  >
                    ←
                  </button>
                  <span className="min-w-10 text-center text-sm font-bold text-cream-200/70">
                    {active + 1}/{n}
                  </span>
                  <button
                    onClick={() => go(1)}
                    aria-label="Next"
                    className="rounded-full border-2 border-gold-400/60 px-3 py-1.5 font-bold text-gold-400 transition hover:bg-gold-400 hover:text-maroon-800"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-xl text-white transition hover:bg-gold-400 hover:text-maroon-800"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section className="relative overflow-x-clip bg-maroon-800 py-24">
      {/* ghost word */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-6 top-6 select-none text-[18vw] font-black leading-none text-transparent"
        style={{ WebkitTextStroke: "2px rgba(244,185,66,0.15)" }}
      >
        {store.since}
      </span>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
          <span className="h-px w-10 bg-gold-400" />
          {t(T.kicker)}
        </p>
        <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-cream-200 md:text-6xl">
          {t(T.h2a)}{" "}
          <span className="font-serif italic text-gold-400">{t(T.h2b)}</span>
        </h2>
        <p className="mt-4 max-w-md text-lg text-cream-200/75">{t(T.sub)}</p>

        {/* layout tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {LAYOUTS.map((l) => (
            <button
              key={l}
              onClick={() => setLayout(l)}
              className={`rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0.2em] transition ${
                layout === l
                  ? "bg-gold-400 text-maroon-800"
                  : "border-2 border-gold-400/40 text-cream-200/80 hover:border-gold-400 hover:text-gold-400"
              }`}
            >
              {t(LAYOUT_LABEL[l])}
            </button>
          ))}
        </div>
      </div>

      {/* stage: full width */}
      <div
        className="relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden transition-[height] duration-500"
        style={{ height: stageH, perspective: 1600 }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 60% at 50% 45%, rgba(244,185,66,0.25), transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-[50%] blur-2xl"
          style={{ background: "rgba(168,23,31,0.5)" }}
        />

        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: layout === "sphere" ? 360 : 0 }}
          transition={
            layout === "sphere"
              ? { duration: 50, ease: "linear", repeat: Infinity }
              : { duration: 0.6 }
          }
        >
          {items.map((it, i) => {
            const p = pose(layout, i, active, n, s, cols, rows);
            return (
              <motion.button
                key={it.key}
                onClick={() => {
                  setActive(i);
                  setOpen(true);
                }}
                aria-label={t(it.title)}
                animate={p}
                transition={{ type: "spring", stiffness: 110, damping: 18 }}
                className="absolute left-1/2 top-1/2 overflow-hidden rounded-xl border-2 border-gold-400/60 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
                style={{
                  width: W * s,
                  height: H * s,
                  marginLeft: -(W * s) / 2,
                  marginTop: -(H * s) / 2,
                  backfaceVisibility: "hidden",
                  pointerEvents: p.opacity === 0 ? "none" : "auto",
                  zIndex: layout === "stack" ? n - Math.abs(i - active) : 0,
                }}
              >
                <Image
                  src={assets.gallery[it.key]}
                  alt={t(it.title)}
                  fill
                  sizes="320px"
                  draggable={false}
                  className="object-cover"
                />
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* controls */}
      <div className="relative z-10 mt-6 flex items-center justify-center gap-6 px-6">
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="rounded-full border-2 border-gold-400/60 px-5 py-2 font-bold text-gold-400 transition hover:bg-gold-400 hover:text-maroon-800"
        >
          ←
        </button>
        <p className="min-w-48 text-center text-sm font-black uppercase tracking-[0.25em] text-cream-200/80">
          {t(cur.tag)}
          <span className="ml-2 text-gold-400">
            {active + 1}/{n}
          </span>
        </p>
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="rounded-full border-2 border-gold-400/60 px-5 py-2 font-bold text-gold-400 transition hover:bg-gold-400 hover:text-maroon-800"
        >
          →
        </button>
      </div>

      {mounted && createPortal(modal, document.body)}
    </section>
  );
}
