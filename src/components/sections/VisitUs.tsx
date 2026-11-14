"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { store, towns } from "@/data/store";

import { useLang } from "@/il8n/LanguageProvider";
import { ui } from "@/il8n/ui";
import { branchList, mapsLink } from "@/data/branchlist";

function useOpenNow() {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => {
      // Shop time is IST regardless of the visitor's timezone.
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).formatToParts(new Date());
      const h = Number(parts.find((p) => p.type === "hour")?.value);
      const m = Number(parts.find((p) => p.type === "minute")?.value);
      const now = h * 60 + m;
      setOpen(now >= store.hours.openMin && now < store.hours.closeMin);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return open;
}

const btnGold =
  "rounded-full border-2 border-gold-400 px-8 py-3 text-sm font-black uppercase tracking-wider text-gold-400 transition hover:bg-gold-400 hover:text-maroon-900";

export default function VisitUs() {
  const open = useOpenNow();
  const { t } = useLang();
  const a = store.address;
  const [openTown, setOpenTown] = useState<string | null>("Periyakulam");

  // Only towns that really have a branch AND a label (no blank rows)
  const activeTowns = towns.filter(
    (town) =>
      branchList.some((b) => b.town === town) &&
      store.branches.some((x) => x.en === town),
  );

  const singleBranch = branchList.length === 1 ? branchList[0] : null;

  return (
    <section className="bg-maroon-900 px-6 py-24 text-cream-200">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
            <span className="h-px w-10 bg-gold-400" />
            {t(ui.visit.kicker)}
          </p>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            {t(ui.visit.h2a)}{" "}
            <span className="font-serif italic text-gold-400">
              {t(ui.visit.h2b)}
            </span>
          </h2>

          {open !== null && (
            <p
              className={`mt-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] ${
                open
                  ? "bg-gold-400 text-maroon-900"
                  : "bg-cream-200/15 text-cream-200"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${open ? "bg-green-700" : "bg-red-400"}`}
              />
              {open ? t(ui.visit.open) : t(ui.visit.closed)}
            </p>
          )}

          <address className="mt-8 not-italic text-lg leading-relaxed text-cream-200/85">
            {t(a.line)}
            <br />
            {t(a.city)},{/* //{t(a.district)} */}
            <br />
            {t(a.state)} {a.pin}
          </address>

          <div className="mt-6 space-y-1 text-lg">
            <p>
              <span className="text-gold-400">{t(ui.visit.daily)}</span> ·{" "}
              {t(store.hours.open)} {t(ui.visit.to)} {t(store.hours.close)}
            </p>
            {store.phones.map((p) => (
              <p key={p.href}>
                <a
                  href={p.href}
                  className="underline decoration-gold-400 underline-offset-4"
                >
                  {p.label}
                </a>
              </p>
            ))}
            <p>
              <span className="text-gold-400">{t(ui.visit.whatsapp)}</span> ·{" "}
              <a
                href={store.whatsapp.href}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-gold-400 underline-offset-4"
              >
                {store.whatsapp.label}
              </a>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={store.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gold-400 px-8 py-3 text-sm font-black uppercase tracking-wider text-maroon-900 transition hover:-translate-y-1 hover:shadow-[0_8px_0_#a8171f]"
            >
              {t(ui.visit.directions)}
            </a>
            <a
              href={store.whatsapp.href}
              target="_blank"
              rel="noreferrer"
              className={btnGold}
            >
              {t(ui.visit.whatsapp)}
            </a>
            <a
              href={store.instagram.url}
              target="_blank"
              rel="noreferrer"
              className={btnGold}
            >
              {t(ui.visit.instagram)}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl border-2 border-gold-400/60 p-8"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
            {t(ui.visit.branches)}
          </p>

          {singleBranch ? (
            /* Only one branch: show it directly, no accordion */
            <div className="mt-6">
              {store.branches.find((x) => x.en === singleBranch.town) && (
                <p className="text-2xl font-black">
                  {t(store.branches.find((x) => x.en === singleBranch.town)!)}
                </p>
              )}
              <a
                href={mapsLink(singleBranch)}
                target="_blank"
                rel="noreferrer"
                className="group mt-3 flex gap-3 text-base text-cream-200/85 transition hover:text-gold-400"
              >
                <span>📍</span>
                <span className="underline decoration-gold-400/40 underline-offset-4 group-hover:decoration-gold-400">
                  {t(singleBranch.address)}
                </span>
              </a>
            </div>
          ) : (
            /* Several branches: tap a town, then tap an address for directions */
            <ul className="mt-6 divide-y divide-cream-200/15">
              {activeTowns.map((town) => {
                const isOpen = openTown === town;
                const townLabel = store.branches.find((b) => b.en === town)!;
                const items = branchList.filter((b) => b.town === town);

                return (
                  <li key={town}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenTown(isOpen ? null : town)}
                      className="flex w-full items-center justify-between py-5 text-left text-2xl font-black"
                    >
                      {t(townLabel)}
                      <span
                        className={`text-gold-400 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        ✦
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          {items.map((b, i) => (
                            <li key={i} className="pb-3">
                              <a
                                href={mapsLink(b)}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex gap-3 text-base text-cream-200/85 transition hover:text-gold-400"
                              >
                                <span>📍</span>
                                <span className="underline decoration-gold-400/40 underline-offset-4 group-hover:decoration-gold-400">
                                  {t(b.address)}
                                </span>
                              </a>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          )}

          <ul className="mt-6 space-y-2 text-cream-200/80">
            {store.highlights.map((h) => (
              <li key={h.en} className="flex gap-3">
                <span className="text-gold-400">→</span>
                {t(h)}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
