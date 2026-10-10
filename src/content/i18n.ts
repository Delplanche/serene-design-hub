import { nl, type Dict } from "./locales/nl";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import es from "./locales/es.json";

export const LANGS = ["nl", "en", "fr", "de", "es"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_NAMES: Record<Lang, string> = {
  nl: "Nederlands",
  en: "English",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
};

const dicts: Record<Lang, Dict> = { nl, en: en as Dict, fr: fr as Dict, de: de as Dict, es: es as Dict };

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export function getDict(lang: Lang): Dict {
  return dicts[lang];
}

/** Path to the web edition for a language ("/" for Dutch, "/en" etc.). */
export function homePath(lang: Lang) {
  return lang === "nl" ? "/" : `/${lang}`;
}

/** Path to the official printable edition for a language. */
export function reportPath(lang: Lang) {
  return lang === "nl" ? "/rapport" : `/${lang}/rapport`;
}

/** Absolute site URL, configured per deployment (Vercel) via VITE_SITE_URL. */
export const SITE_URL = (import.meta.env["VITE_SITE_URL"] as string | undefined)?.replace(/\/$/, "") ?? "";

export function pageHead(lang: Lang, kind: "home" | "report") {
  const t = getDict(lang);
  const title = kind === "home" ? t.meta.title : t.meta.reportTitle;
  const description = kind === "home" ? t.meta.description : t.meta.reportDescription;
  const path = kind === "home" ? homePath(lang) : reportPath(lang);
  const image = SITE_URL ? `${SITE_URL}/og-image.jpg` : undefined;
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: t.meta.locale },
    { property: "og:url", content: SITE_URL + path },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (image) {
    meta.push(
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: t.cover.title },
      { name: "twitter:image", content: image },
    );
  }
  const links = [
    { rel: "canonical", href: SITE_URL + path },
    ...LANGS.map((l) => ({ rel: "alternate", hrefLang: l, href: SITE_URL + (kind === "home" ? homePath(l) : reportPath(l)) })),
    { rel: "alternate", hrefLang: "x-default", href: SITE_URL + (kind === "home" ? "/" : "/rapport") },
  ];
  return { meta, links };
}
