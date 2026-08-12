"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "ja";

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
}>({ locale: "en", setLocale: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  // Restore saved choice, else follow the browser language
  useEffect(() => {
    const saved = localStorage.getItem("locale");
    if (saved === "ja" || saved === "en") setLocale(saved);
    else if (navigator.language.toLowerCase().startsWith("ja"))
      setLocale("ja");
  }, []);

  useEffect(() => {
    localStorage.setItem("locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex rounded-full border border-slate-200 bg-white/70 p-0.5 text-xs shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/70"
    >
      {(
        [
          ["en", "EN"],
          ["ja", "日本語"],
        ] as const
      ).map(([l, label]) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`rounded-full px-3 py-1 font-medium transition-colors ${
            locale === l
              ? "bg-indigo-600 text-white"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
