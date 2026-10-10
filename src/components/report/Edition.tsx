import { Link } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";
import type { Lang } from "@/content/i18n";
import type { Dict } from "@/content/locales/nl";
import { Preferences, langLinkProps } from "./preferences";
import { OcaMark, SiteFooter } from "./Report";

const num = (i: number) => String(i + 1).padStart(2, "0");

function Chapter({ id, index, t, title, children }: { id: string; index: number; t: Dict; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="edition-chapter mt-16 border-t-2 border-ink pt-8 print:mt-0">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{num(index)} / {t.chapters[index]}</p>
      <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight">{title}</h2>
      <div className="mt-6 space-y-5 text-[16px] leading-7 text-soft">{children}</div>
    </section>
  );
}

const H3 = ({ children }: { children: React.ReactNode }) => <h3 className="pt-4 font-serif text-2xl font-semibold text-ink">{children}</h3>;

export function Edition({ t, lang }: { t: Dict; lang: Lang }) {
  const s = t.standard;
  const toc: Array<[string, string]> = [["samenvatting", t.ui.summaryLabel], ...(["context", "standaard", "toepassing", "uitvoering"].map((id, i) => [id, `${num(i)} ${t.chapters[i]}`]) as Array<[string, string]>), ["colofon", t.ui.colophonTitle]];

  return (
    <div lang={lang} className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-50 border-b border-border bg-paper/95 backdrop-blur-md print:hidden">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between gap-3 px-5">
          <Link {...langLinkProps(lang, "home")} className="flex items-center gap-2 text-[13px] font-medium text-soft hover:text-ink"><ArrowLeft aria-hidden="true" className="size-4" /><span className="hidden sm:inline">{t.ui.backToSite}</span><span className="sm:hidden">OCA</span></Link>
          <div className="flex items-center gap-1">
            <Preferences t={t} lang={lang} page="report" />
            <button type="button" onClick={() => window.print()} className="inline-flex h-11 items-center gap-2 bg-primary px-4 text-[13px] font-medium text-primary-foreground hover:bg-primary/90"><Printer aria-hidden="true" className="size-4" />{t.ui.downloadPdf}</button>
          </div>
        </div>
      </header>

      <article className="edition mx-auto max-w-4xl px-5 pb-24 pt-12 print:p-0">
        <section className="edition-cover flex min-h-[70vh] flex-col justify-between border-b border-border pb-10 print:min-h-[250mm] print:border-0">
          <div className="flex items-center gap-3"><OcaMark /><span className="font-mono text-[11px] uppercase tracking-[0.18em]">{t.cover.org}</span></div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{t.cover.meta1}</p>
            <h1 className="mt-5 max-w-[16ch] font-serif text-5xl font-semibold leading-[1.02] sm:text-6xl">{t.cover.title}</h1>
            <p className="mt-6 max-w-[52ch] text-xl leading-8 text-soft">{t.cover.lead}</p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist">{t.ui.edition}</p>
        </section>

        <nav aria-label={t.ui.contentsTitle} className="edition-toc mt-12 print:mt-0">
          <h2 className="font-serif text-3xl font-semibold">{t.ui.contentsTitle}</h2>
          <ol className="mt-6 border-t border-ink/25">
            {toc.map(([id, label]) => <li key={id} className="border-b border-ink/15"><a href={`#${id}`} className="flex min-h-12 items-center justify-between gap-4 py-2 text-[16px] hover:text-primary"><span>{label}</span><span aria-hidden="true" className="toc-dots flex-1 border-b border-dotted border-ink/25" /></a></li>)}
          </ol>
          <p className="mt-6 text-[14px] text-mist print:hidden">{t.ui.printHint}</p>
        </nav>

        <section id="samenvatting" className="edition-chapter mt-16 border-t-2 border-ink pt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{t.ui.summaryLabel}</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight">{t.summary.title}</h2>
          <p className="mt-6 font-serif text-2xl leading-snug">{t.summary.lead}</p>
          <dl className="mt-6 border-t border-ink/25">{t.summary.items.map(([k, v]) => <div key={k} className="grid gap-2 border-b border-ink/15 py-4 sm:grid-cols-[10rem_1fr]"><dt className="font-mono text-[11px] uppercase tracking-[0.12em]">{k}</dt><dd className="text-soft">{v}</dd></div>)}</dl>
        </section>

        <Chapter id="context" index={0} t={t} title={t.context.title}>
          <p>{t.context.intro}</p>
          <table className="w-full border-collapse text-left"><tbody>{t.context.stats.map(([k, v]) => <tr key={k} className="border-b border-ink/15"><th className="py-3 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-mist">{k}</th><td className="py-3 text-right font-serif text-2xl font-semibold text-ink">{v}</td></tr>)}</tbody></table>
          {t.context.problems.map(([k, v]) => <p key={k}><strong className="text-ink">{k}.</strong> {v}</p>)}
          <p className="border-l-2 border-primary pl-5 font-serif text-2xl text-ink">{t.context.conclusion}</p>
        </Chapter>

        <Chapter id="standaard" index={1} t={t} title={s.title}>
          <p>{s.intro}</p>
          <H3>{s.rolesKicker} — {s.rolesTitle}</H3>
          <table className="w-full border-collapse text-left text-[15px]"><tbody>{s.roles.map(([n, r, d]) => <tr key={n} className="border-b border-ink/15 align-top"><th className="py-3 pr-4 font-serif text-lg text-ink">{n}</th><td className="py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.08em] text-primary">{r}</td><td className="py-3">{d}</td></tr>)}</tbody></table>
          <H3>{s.identityKicker} — {s.identityTitle}</H3>
          <p>{s.identityText}</p>
          <ol className="list-decimal space-y-1 pl-6">{s.flow.map((f) => <li key={f}>{f}</li>)}</ol>
          <p className="font-serif text-2xl text-ink">{s.quote} <span className="text-[16px] text-soft">{s.quoteNote}</span></p>
          <H3>{s.ratingKicker} — {s.ratingTitle}</H3>
          <p className="font-mono text-[12px] text-ink">{s.ratingFlow.join("  →  ")}</p>
          <p><strong className="text-ink">{s.ratingTitleA}.</strong> {s.ratingTextA}</p>
          <p><strong className="text-ink">{s.ratingTitleB}.</strong> {s.ratingTextB}</p>
        </Chapter>

        <Chapter id="toepassing" index={2} t={t} title={t.application.title}>
          <p>{t.application.intro}</p>
          {t.application.items.map(([a, b, c]) => <p key={a}><strong className="text-ink">{a}</strong> <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-mist">· {b}</span><br />{c}</p>)}
        </Chapter>

        <Chapter id="uitvoering" index={3} t={t} title={t.execution.title}>
          <p>{t.execution.intro}</p>
          <table className="w-full border-collapse text-left text-[15px]"><tbody>{t.execution.phases.map(([when, what, how], i) => <tr key={i} className="border-b border-ink/15 align-top"><td className="py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.08em] text-primary">{num(i)} · {when}</td><th className="py-3 pr-4 font-serif text-lg text-ink">{what}</th><td className="py-3">{how}</td></tr>)}</tbody></table>
        </Chapter>

        <section id="colofon" className="edition-chapter mt-16 border-t border-ink/25 pt-8 text-[14px] leading-6 text-soft">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">{t.ui.colophonTitle}</h2>
          <p className="mt-3 max-w-[60ch]">{t.ui.colophonText}</p>
          <p className="mt-3">{t.ui.builtBy} Delplanche — delplanche.cloud</p>
        </section>
      </article>
      <SiteFooter t={t} />
    </div>
  );
}
