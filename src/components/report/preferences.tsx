import { Link } from "@tanstack/react-router";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LANGS, LANG_NAMES, type Lang } from "@/content/i18n";
import type { Dict } from "@/content/locales/nl";

export type ThemePref = "system" | "light" | "dark";

function applyTheme(pref: ThemePref) {
  const dark = pref === "dark" || (pref === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  const root = document.documentElement;
  root.dataset["theme"] = dark ? "dark" : "light";
  root.classList.toggle("dark", dark);
  document.querySelector('meta[name="theme-color"]:not([media])')?.setAttribute("content", dark ? "#111418" : "#F6F7F4");
}

export function useThemePref() {
  const [pref, setPref] = useState<ThemePref>("system");
  useEffect(() => {
    const saved = localStorage.getItem("oca-theme");
    setPref(saved === "light" || saved === "dark" ? saved : "system");
  }, []);
  useEffect(() => {
    if (pref !== "system") return;
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [pref]);
  const choose = (next: ThemePref) => {
    if (next === "system") localStorage.removeItem("oca-theme");
    else localStorage.setItem("oca-theme", next);
    applyTheme(next);
    setPref(next);
  };
  return { pref, choose };
}

export function Preferences({ t, lang, page }: { t: Dict; lang: Lang; page: "home" | "report" }) {
  const { pref, choose } = useThemePref();
  const Icon = pref === "dark" ? Moon : pref === "light" ? Sun : Monitor;
  const options: Array<[ThemePref, string, typeof Sun]> = [
    ["system", t.ui.system, Monitor],
    ["light", t.ui.light, Sun],
    ["dark", t.ui.dark, Moon],
  ];
  return (
    <Popover>
      <PopoverTrigger aria-label={t.ui.settings} className="flex h-11 items-center gap-2 px-3 text-ink hover:bg-linen focus-visible:outline-2 focus-visible:outline-primary">
        <Icon aria-hidden="true" className="size-4" />
        <span className="font-mono text-[11px] uppercase tracking-[0.12em]">{lang}</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 rounded-none border-border bg-linen p-0 text-ink shadow-lg">
        <div className="p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist">{t.ui.theme}</p>
          <div role="radiogroup" aria-label={t.ui.theme} className="mt-3 grid grid-cols-3 border border-border">
            {options.map(([value, label, OptIcon]) => (
              <button key={value} type="button" role="radio" aria-checked={pref === value} onClick={() => choose(value)} className={`flex min-h-14 flex-col items-center justify-center gap-1 border-r border-border text-[12px] last:border-r-0 ${pref === value ? "bg-paper text-ink" : "text-soft hover:text-ink"}`}>
                <OptIcon aria-hidden="true" className={`size-4 ${pref === value ? "text-primary" : ""}`} />
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-border p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist">{t.ui.language}</p>
          <ul className="mt-2">
            {LANGS.map((l) => (
              <li key={l}>
                <Link {...langLinkProps(l, page)} hrefLang={l} lang={l} className="flex min-h-10 items-center justify-between text-[14px] text-soft hover:text-ink aria-[current=page]:text-ink" aria-current={l === lang ? "page" : undefined}>
                  <span><span className="mr-3 font-mono text-[10px] uppercase text-mist">{l}</span>{LANG_NAMES[l]}</span>
                  {l === lang && <Check aria-hidden="true" className="size-4 text-primary" />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function langLinkProps(l: Lang, page: "home" | "report") {
  if (page === "home") return l === "nl" ? ({ to: "/" } as const) : ({ to: "/$lang", params: { lang: l } } as const);
  return l === "nl" ? ({ to: "/rapport" } as const) : ({ to: "/$lang/rapport", params: { lang: l } } as const);
}
