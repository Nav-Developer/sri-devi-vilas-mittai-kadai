"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Lang, L } from "./ui";

const KEY = "sdv-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (x: L) => string };
const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default is Tamil (village shop). A saved choice overrides it.
  const [lang, setLangState] = useState<Lang>("ta");

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s === "en" || s === "ta") setLangState(s);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  // const t = useCallback((x: L) => x[lang], [lang]);
  const t = useCallback((x?: L) => x?.[lang] ?? x?.en ?? "", [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const c = useContext(LangContext);
  if (!c) throw new Error("useLang must be used inside <LanguageProvider>");
  return c;
}
