"use client";

import { useLang } from "@/il8n/LanguageProvider";

export default function LangToggle() {
  const { lang, setLang } = useLang();

  const base =
    "w-14 cursor-pointer rounded-full py-2 text-center text-xs font-extrabold transition-colors";

  return (
    <div
      role="group"
      aria-label="Language"
      className="fixed bottom-5 right-5 z-[60] flex items-center rounded-full border-2 border-gold-400 bg-maroon-900 p-1 shadow-[0_6px_0_#a8171f]"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`${base} ${
          lang === "en"
            ? "bg-gold-400 text-maroon-900"
            : "text-cream-200 hover:text-gold-400"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ta")}
        aria-pressed={lang === "ta"}
        className={`${base} ${
          lang === "ta"
            ? "bg-gold-400 text-maroon-900"
            : "text-cream-200 hover:text-gold-400"
        }`}
      >
        தமிழ்
      </button>
    </div>
  );
}
