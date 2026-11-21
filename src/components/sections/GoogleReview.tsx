"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/il8n/LanguageProvider";

type Review = {
  name: string;
  photo: string;
  rating: number;
  text: string;
  when: string;
};

type Data = {
  rating: number;
  count: number;
  url: string;
  reviews: Review[];
};

const T = {
  kicker: { en: "Google reviews", ta: "கூகுள் மதிப்புரைகள்" },
  h2a: { en: "What people", ta: "மக்கள்" },
  h2b: { en: "say.", ta: "சொல்வது." },
  based: { en: "reviews on Google", ta: "கூகுள் மதிப்புரைகள்" },
  all: { en: "See all reviews", ta: "அனைத்து மதிப்புரைகள்" },
};

function Stars({ n }: { n: number }) {
  return (
    <span className="text-gold-400" aria-label={`${n} stars`}>
      {"★".repeat(Math.round(n))}
      <span className="text-maroon-800/20">
        {"★".repeat(5 - Math.round(n))}
      </span>
    </span>
  );
}

export default function GoogleReviews() {
  const { t } = useLang();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data || data.reviews.length === 0) return null;

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-crimson-600">
          <span className="h-px w-10 bg-crimson-600" />
          {t(T.kicker)}
        </p>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-maroon-800 md:text-6xl">
            {t(T.h2a)}{" "}
            <span className="font-serif italic text-crimson-600">
              {t(T.h2b)}
            </span>
          </h2>

          <div className="rounded-3xl border-2 border-maroon-800 bg-cream-200 px-6 py-4 shadow-[6px_6px_0_#5c0f14]">
            <p className="text-5xl font-black text-maroon-800">
              {data.rating.toFixed(1)}
            </p>
            <Stars n={data.rating} />
            <p className="mt-1 text-sm text-maroon-800/75">
              {data.count} {t(T.based)}
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.reviews.map((r, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="relative flex flex-col overflow-hidden rounded-3xl border-2 border-maroon-800 bg-cream-200 p-7 shadow-[6px_6px_0_#5c0f14] transition-shadow hover:shadow-[10px_10px_0_#a8171f]"
            >
              <span
                aria-hidden
                className="absolute -right-2 -top-6 select-none font-serif text-9xl font-black italic text-crimson-600/15"
              >
                “
              </span>

              <div className="flex items-center gap-3">
                {r.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.photo}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-12 w-12 rounded-full border-2 border-maroon-800 object-cover"
                  />
                )}
                <div>
                  <p className="font-black text-maroon-800">{r.name}</p>
                  <p className="text-xs text-maroon-800/60">{r.when}</p>
                </div>
              </div>

              <div className="mt-3">
                <Stars n={r.rating} />
              </div>
              <p className="mt-3 line-clamp-6 text-maroon-800/80">{r.text}</p>
            </motion.article>
          ))}
        </div>

        {data.url && (
          <a
            href={data.url}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block rounded-full border-2 border-maroon-800 px-8 py-3 text-sm font-black uppercase tracking-wider text-maroon-800 transition hover:bg-maroon-800 hover:text-cream-200"
          >
            {t(T.all)} →
          </a>
        )}
      </div>
    </section>
  );
}
