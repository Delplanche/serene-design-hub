import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowDown, ArrowUpRight, FileText, LoaderCircle, MessageCircle, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import marbleBoardUrl from "@/assets/marmeren-schaakbord.webp";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Lang } from "@/content/i18n";
import type { Dict } from "@/content/locales/nl";
import { askReportQuestion } from "@/lib/report-assistant.functions";
import { Preferences, langLinkProps } from "./preferences";

const IDS = ["context", "standaard", "toepassing", "uitvoering"] as const;
const num = (i: number) => String(i + 1).padStart(2, "0");

function useReadingState() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      const threshold = window.innerHeight * 0.34;
      let current = "";
      for (const id of IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return { progress, active };
}

function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-inview"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-inview");
          observer.unobserve(entry.target);
        }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export function OcaMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span aria-hidden="true" className={`grid size-7 shrink-0 grid-cols-2 grid-rows-2 overflow-hidden border ${inverse ? "border-chalk/35" : "border-ink/30"}`}>
      <span className={inverse ? "bg-chalk" : "bg-ink"} />
      <span />
      <span />
      <span className={inverse ? "bg-chalk" : "bg-ink"} />
    </span>
  );
}

function ReportHeader({ t, lang }: { t: Dict; lang: Lang }) {
  const { progress, active } = useReadingState();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const activeIndex = IDS.findIndex((id) => id === active);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-border bg-paper/95 backdrop-blur-md print:hidden">
      <nav aria-label={t.ui.nav} className="mx-auto grid h-16 max-w-[88rem] grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-1 px-5 lg:px-10">
        <a href="#top" onClick={() => setOpen(false)} className="flex shrink-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <OcaMark />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink">OCA</span>
        </a>

        <p className="min-w-0 truncate text-center font-mono text-[10px] uppercase tracking-[0.1em] text-soft lg:hidden" aria-live="polite">
          {activeIndex >= 0 ? <><span className="text-primary">{num(activeIndex)}</span><span> / {t.chapters[activeIndex]}</span></> : t.ui.strategic}
        </p>

        <div className="ml-auto hidden items-stretch lg:flex">
          {IDS.map((id, i) => {
            const selected = active === id;
            return (
              <a key={id} href={`#${id}`} aria-current={selected ? "location" : undefined} className={`flex min-h-16 items-center gap-2 border-l border-border px-4 text-[13px] transition-colors last:border-r ${selected ? "bg-linen text-ink" : "text-soft hover:bg-linen/60 hover:text-ink"}`}>
                <span className={`font-mono text-[10px] ${selected ? "text-primary" : "text-mist"}`}>{num(i)}</span>
                <span className="font-medium">{t.chapters[i]}</span>
              </a>
            );
          })}
        </div>

        <div className="ml-auto flex items-center lg:border-l lg:border-border">
          <a href="#vraag" className="hidden px-4 text-[13px] font-medium text-soft hover:text-ink xl:block">{t.ui.ask}</a>
          <Preferences t={t} lang={lang} page="home" />
        </div>

        <Button type="button" variant="outline" size="icon" aria-expanded={open} aria-controls="mobile-contents" aria-label={open ? t.ui.closeMenu : t.ui.openMenu} onClick={() => setOpen((v) => !v)} className="relative size-11 rounded-none border-ink/20 bg-transparent shadow-none lg:hidden">
          <span aria-hidden="true" className={`absolute h-px w-5 bg-ink transition-transform ${open ? "rotate-45" : "-translate-y-1"}`} />
          <span aria-hidden="true" className={`absolute h-px w-5 bg-ink transition-transform ${open ? "-rotate-45" : "translate-y-1"}`} />
        </Button>
      </nav>

      <div id="mobile-contents" hidden={!open} className="border-t border-border bg-paper lg:hidden">
        <div className="mx-auto max-w-xl px-5 py-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist">{t.ui.contents}</p>
          <ol className="mt-4 border-t border-border">
            {IDS.map((id, i) => {
              const selected = active === id;
              return (
                <li key={id} className="border-b border-border">
                  <a href={`#${id}`} onClick={() => setOpen(false)} aria-current={selected ? "location" : undefined} className="grid min-h-14 grid-cols-[2rem_1fr_auto] items-center gap-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    <span className={`font-mono text-[11px] ${selected ? "text-primary" : "text-mist"}`}>{num(i)}</span>
                    <span className={`text-[16px] font-medium ${selected ? "text-ink" : "text-soft"}`}>{t.chapters[i]}</span>
                    <ArrowDown aria-hidden="true" className="size-4 text-mist" />
                  </a>
                </li>
              );
            })}
          </ol>
          <a href="#vraag" onClick={() => setOpen(false)} className="mt-5 flex min-h-12 items-center justify-between border-b border-border py-3 text-[15px] font-medium text-ink">{t.ui.ask} <MessageCircle aria-hidden="true" className="size-4 text-primary" /></a>
          <Link {...langLinkProps(lang, "report")} className="flex min-h-12 items-center justify-between border-b border-border py-3 text-[15px] font-medium text-ink">{t.ui.officialReport} <FileText aria-hidden="true" className="size-4 text-primary" /></Link>
        </div>
      </div>

      <div aria-hidden="true" className="h-0.5 bg-border"><div className="h-full origin-left bg-primary" style={{ transform: `scaleX(${progress})` }} /></div>
    </header>
  );
}

function ChapterIntro({ index, t, title, children }: { index: number; t: Dict; title: string; children?: ReactNode }) {
  return (
    <header className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{num(index)} / {t.chapters[index]}</p>
        <p aria-hidden="true" className="mt-5 font-serif text-7xl leading-none text-stone lg:text-8xl">{num(index)}</p>
      </div>
      <div className="lg:col-span-8">
        <h2 className="max-w-[21ch] font-serif text-[2.5rem] font-semibold leading-[1.02] text-ink sm:text-5xl lg:text-6xl">{title}</h2>
        {children}
      </div>
    </header>
  );
}

function ReportAssistant({ t, lang }: { t: Dict; lang: Lang }) {
  const askQuestion = useServerFn(askReportQuestion);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const a = t.assistant;

  async function ask(text: string) {
    const q = text.trim();
    if (q.length < 3 || isAsking) return;
    setIsAsking(true);
    setAnswer(null);
    setError(null);
    try {
      const result = await askQuestion({ data: { question: q, lang } });
      setAnswer(result.answer);
      setError(result.error);
    } catch {
      setError(a.sendError);
    } finally {
      setIsAsking(false);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void ask(question);
  }

  return (
    <section id="vraag" data-reveal className="scroll-mt-20 border-y border-border bg-linen text-ink print:hidden">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-5 py-20 md:px-8 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-28">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{a.kicker}</p>
          <h2 className="mt-5 max-w-[11ch] font-serif text-4xl font-semibold leading-[1.03] lg:text-6xl">{a.title}</h2>
          <p className="mt-6 max-w-[35ch] text-[16px] leading-7 text-soft">{a.text}</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <form onSubmit={handleSubmit} className="border-t border-ink/25 pt-6">
            <label htmlFor="report-question" className="font-mono text-[11px] uppercase tracking-[0.14em] text-soft">{a.label}</label>
            <Textarea id="report-question" suppressHydrationWarning value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={a.placeholder} maxLength={500} rows={4} disabled={isAsking} className="mt-4 min-h-36 resize-y rounded-none border-input bg-paper px-4 py-4 text-[17px] leading-7 text-ink shadow-none placeholder:text-mist focus-visible:ring-primary" />
            <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-4">
              <span className="font-mono text-[10px] text-mist">{question.length} / 500</span>
              <Button type="submit" disabled={question.trim().length < 3 || isAsking} className="h-11 rounded-none bg-primary px-5 text-primary-foreground shadow-none hover:bg-primary/90">
                {isAsking ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : <Send aria-hidden="true" />}
                {isAsking ? a.asking : a.submit}
              </Button>
            </div>
          </form>
          <div className="mt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">{a.suggestionsLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {a.suggestions.map((s) => (
                <li key={s}><button type="button" disabled={isAsking} onClick={() => { setQuestion(s); void ask(s); }} className="min-h-10 border border-border bg-paper px-3 py-2 text-left text-[14px] text-soft hover:border-primary hover:text-ink disabled:opacity-50">{s}</button></li>
              ))}
            </ul>
          </div>
          <div aria-live="polite" aria-busy={isAsking} className={isAsking || error || answer ? "mt-8 border-t border-border pt-8" : ""}>
            {isAsking && <p className="flex items-center gap-3 text-[15px] text-soft"><LoaderCircle aria-hidden="true" className="size-4 animate-spin text-primary" />{a.consulting}</p>}
            {error && <p role="alert" className="border-l-2 border-destructive pl-4 text-[15px] leading-7 text-ink">{error}</p>}
            {answer && (
              <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
                <MessageCircle aria-hidden="true" className="mt-1 size-5 text-primary" />
                <div className="max-w-[62ch] space-y-4 font-serif text-xl leading-relaxed text-ink">
                  {answer.split(/\n\s*\n/).map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Report({ t, lang }: { t: Dict; lang: Lang }) {
  useScrollReveal();
  const s = t.standard;

  return (
    <div id="top" lang={lang} className="min-h-screen overflow-x-hidden bg-paper font-sans text-ink antialiased">
      <a href="#samenvatting" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">{t.ui.skip}</a>
      <ReportHeader t={t} lang={lang} />

      <section className="relative min-h-[min(650px,calc(100svh-4rem))] overflow-hidden bg-night text-chalk sm:min-h-[min(680px,calc(100svh-4rem))]">
        <img src={marbleBoardUrl} alt={t.cover.imageAlt} className="report-cover-img absolute inset-0 size-full object-cover object-[58%_60%] sm:object-[center_58%]" fetchPriority="high" />
        <div aria-hidden="true" className="absolute inset-0 bg-cover-shade" />
        <div className="relative mx-auto grid min-h-[min(650px,calc(100svh-4rem))] max-w-[88rem] grid-rows-[auto_1fr_auto] px-5 py-7 sm:min-h-[min(680px,calc(100svh-4rem))] md:px-8 lg:px-10 lg:py-10">
          <div className="grid grid-cols-[1fr_auto] gap-6 border-b border-chalk/25 pb-5 font-mono text-[10px] uppercase tracking-[0.14em] text-chalk/70">
            <span>{t.cover.meta1}</span><span>{t.cover.meta2}</span>
          </div>
          <div className="flex items-end py-10 lg:py-14">
            <div className="max-w-5xl">
              <p className="report-reveal font-mono text-[11px] uppercase tracking-[0.18em] text-chalk/85">{t.cover.org}</p>
              <h1 className="report-reveal mt-5 max-w-[15ch] font-serif text-[3.1rem] font-semibold leading-[0.98] sm:text-7xl lg:text-[6.4rem]">{t.cover.title}</h1>
              <p className="report-reveal mt-7 max-w-[55ch] text-[17px] leading-7 text-chalk/80 sm:text-xl sm:leading-8">{t.cover.lead}</p>
            </div>
          </div>
          <div className="grid gap-3 border-t border-chalk/25 pt-5 sm:grid-cols-2">
            <a href="#samenvatting" className="group flex min-h-12 items-center justify-between text-[14px] font-medium text-chalk focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal sm:justify-start sm:gap-3">
              <span>{t.ui.readSummary}</span><ArrowDown aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-1" />
            </a>
            <Link {...langLinkProps(lang, "report")} className="group flex min-h-12 items-center justify-between border-t border-chalk/15 pt-3 text-[14px] font-medium text-chalk sm:justify-end sm:gap-3 sm:border-t-0 sm:pt-0">
              <span>{t.ui.officialReport} · PDF</span><FileText aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <main>
        <section id="samenvatting" data-reveal className="scroll-mt-20 border-b border-border bg-linen">
          <div className="mx-auto grid max-w-[88rem] gap-10 px-5 py-16 md:px-8 lg:grid-cols-12 lg:px-10 lg:py-24">
            <div className="lg:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{t.ui.summaryLabel}</p>
              <h2 className="mt-5 max-w-[13ch] font-serif text-4xl font-semibold leading-[1.06] lg:text-5xl">{t.summary.title}</h2>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <p className="max-w-[52ch] font-serif text-2xl leading-snug text-ink lg:text-3xl">{t.summary.lead}</p>
              <ol className="mt-10 border-t border-ink/25">
                {t.summary.items.map(([title, text], i) => <li key={i} className="grid gap-3 border-b border-ink/15 py-5 sm:grid-cols-[3rem_8rem_1fr]"><span className="font-mono text-[10px] text-primary">{num(i)}</span><h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink">{title}</h3><p className="text-[15px] leading-6 text-soft">{text}</p></li>)}
              </ol>
            </div>
          </div>
        </section>

        <section id="context" data-reveal className="scroll-mt-20 border-b border-border">
          <div className="mx-auto max-w-[88rem] px-5 py-20 md:px-8 lg:px-10 lg:py-28">
            <ChapterIntro index={0} t={t} title={t.context.title}>
              <p className="mt-7 max-w-[58ch] text-[17px] leading-7 text-soft">{t.context.intro}</p>
            </ChapterIntro>
            <dl className="mt-14 grid border-y border-ink/25 lg:ml-[calc(33.333%+0.833rem)] lg:grid-cols-3">
              {t.context.stats.map(([label, value]) => <div key={label} className="border-b border-ink/15 py-6 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0"><dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">{label}</dt><dd className="mt-3 font-serif text-3xl font-semibold lg:text-4xl">{value}</dd></div>)}
            </dl>
            <div className="mt-14 border-t border-ink/25 lg:ml-[calc(33.333%+0.833rem)]">
              {t.context.problems.map(([title, text], i) => <article key={i} className="grid gap-3 border-b border-ink/15 py-7 sm:grid-cols-[3rem_11rem_1fr]"><span className="font-mono text-[11px] text-primary">{num(i)}</span><h3 className="font-serif text-2xl font-semibold">{title}</h3><p className="text-[15px] leading-7 text-soft">{text}</p></article>)}
            </div>
            <blockquote className="report-bleed mt-20 border-y border-border bg-linen px-5 py-12 md:px-8 lg:px-10 lg:py-16">
              <div className="mx-auto grid max-w-[88rem] lg:grid-cols-12"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary lg:col-span-3">{t.context.conclusionKicker}</p>
                <p className="mt-5 max-w-[34ch] font-serif text-3xl font-semibold leading-tight lg:col-span-8 lg:col-start-5 lg:mt-0 lg:text-4xl">{t.context.conclusion}</p>
              </div>
            </blockquote>
          </div>
        </section>

        <section id="standaard" data-reveal className="scroll-mt-20 border-b border-border bg-linen/50">
          <div className="mx-auto max-w-[88rem] px-5 py-20 md:px-8 lg:px-10 lg:py-28">
            <ChapterIntro index={1} t={t} title={s.title}>
              <p className="mt-7 max-w-[58ch] text-[17px] leading-7 text-soft">{s.intro}</p>
            </ChapterIntro>

            <div className="mt-16 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4"><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{s.rolesKicker}</p><h3 className="mt-4 max-w-[16ch] font-serif text-3xl font-semibold">{s.rolesTitle}</h3></div>
              <div className="overflow-hidden border-t border-ink/30 lg:col-span-8">
                {s.roles.map(([name, role, text]) => <div key={name} className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[8rem_11rem_1fr] sm:gap-5"><p className="font-serif text-xl font-semibold">{name}</p><p className="font-mono text-[10px] uppercase tracking-[0.1em] text-primary sm:pt-1.5">{role}</p><p className="text-[15px] leading-6 text-soft">{text}</p></div>)}
              </div>
            </div>

            <div className="mt-20 grid gap-10 border-t border-ink/25 pt-14 lg:grid-cols-12">
              <div className="lg:col-span-4"><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{s.identityKicker}</p><h3 className="mt-4 max-w-[16ch] font-serif text-3xl font-semibold">{s.identityTitle}</h3><p className="mt-5 max-w-[38ch] text-[16px] leading-7 text-soft">{s.identityText}</p></div>
              <div className="lg:col-span-8">
                <ol className="relative border-y border-ink/25 before:absolute before:bottom-7 before:left-[0.28rem] before:top-7 before:w-px before:bg-primary">
                  {s.flow.map((label, i) => <li key={i} className="relative grid min-h-16 grid-cols-[2.5rem_1fr] items-center border-b border-ink/15 py-4 last:border-b-0"><span aria-hidden="true" className="z-10 size-2.5 rounded-full bg-primary" /><div><span className="font-mono text-[9px] text-mist">{num(i)}</span><p className="font-serif text-xl font-semibold">{label}</p></div></li>)}
                </ol>
                <blockquote className="mt-8 border-l border-primary pl-6"><p className="max-w-[30ch] font-serif text-3xl font-semibold leading-tight">{s.quote}</p><footer className="mt-3 text-[15px] text-soft">{s.quoteNote}</footer></blockquote>
              </div>
            </div>

            <div className="mt-20 grid gap-10 border-t border-ink/25 pt-14 lg:grid-cols-12">
              <div className="lg:col-span-4"><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{s.ratingKicker}</p><h3 className="mt-4 max-w-[17ch] font-serif text-3xl font-semibold">{s.ratingTitle}</h3></div>
              <div className="lg:col-span-8">
                <div className="border-y border-ink/25 py-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">{s.flowLabel}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
                    {s.ratingFlow.map((label, i) => <div key={i} className="contents"><div className="border border-ink/20 bg-paper p-4 font-mono text-[11px] text-ink">{label}</div>{i < s.ratingFlow.length - 1 && <span aria-hidden="true" className="hidden text-center text-primary sm:block">→</span>}</div>)}
                  </div>
                </div>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div><h4 className="font-serif text-2xl font-semibold">{s.ratingTitleA}</h4><p className="mt-3 text-[15px] leading-7 text-soft">{s.ratingTextA}</p></div>
                  <div><h4 className="font-serif text-2xl font-semibold">{s.ratingTitleB}</h4><p className="mt-3 text-[15px] leading-7 text-soft">{s.ratingTextB}</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="toepassing" data-reveal className="scroll-mt-20 border-b border-border">
          <div className="mx-auto max-w-[88rem] px-5 py-20 md:px-8 lg:px-10 lg:py-28">
            <ChapterIntro index={2} t={t} title={t.application.title}>
              <p className="mt-7 max-w-[58ch] text-[17px] leading-7 text-soft">{t.application.intro}</p>
            </ChapterIntro>
            <div className="mt-14 lg:ml-[calc(33.333%+0.833rem)]">
              {t.application.items.map(([title, label, text], i) => <article key={i} className="grid gap-3 border-t border-ink/25 py-7 sm:grid-cols-[3rem_10rem_1fr] sm:gap-5"><span className="font-mono text-[11px] text-primary">{num(i)}</span><div><h3 className="font-serif text-2xl font-semibold">{title}</h3><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-mist">{label}</p></div><p className="max-w-[42ch] text-[15px] leading-7 text-soft">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="uitvoering" data-reveal className="scroll-mt-20 border-b border-border bg-paper text-ink">
          <div className="mx-auto max-w-[88rem] px-5 py-20 md:px-8 lg:px-10 lg:py-28">
            <ChapterIntro index={3} t={t} title={t.execution.title}>
              <p className="mt-7 max-w-[56ch] text-[17px] leading-7 text-soft">{t.execution.intro}</p>
            </ChapterIntro>
            <ol className="relative mt-16 border-t border-ink/25 before:absolute before:bottom-0 before:left-[0.28rem] before:top-0 before:w-px before:bg-primary lg:ml-[calc(33.333%+0.833rem)]">
              {t.execution.phases.map(([timing, title, text], i) => <li key={i} className="relative grid gap-3 border-b border-ink/15 py-7 pl-10 sm:grid-cols-[8rem_13rem_1fr] sm:gap-5"><span aria-hidden="true" className="absolute left-0 top-8 size-2.5 rounded-full bg-primary" /><span className="font-mono text-[10px] uppercase tracking-[0.1em] text-primary">{num(i)} · {timing}</span><h3 className="font-serif text-xl font-semibold">{title}</h3><p className="max-w-[42ch] text-[15px] leading-6 text-soft">{text}</p></li>)}
            </ol>

            <div className="mt-20 grid gap-6 border-y border-ink/25 py-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-4"><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{t.ui.officialReport}</p></div>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between lg:col-span-8">
                <p className="max-w-[40ch] font-serif text-2xl leading-snug">{t.ui.officialReportLead}</p>
                <Link {...langLinkProps(lang, "report")} className="inline-flex h-12 shrink-0 items-center gap-3 bg-primary px-5 text-[14px] font-medium text-primary-foreground hover:bg-primary/90"><FileText aria-hidden="true" className="size-4" />{t.ui.downloadPdf}</Link>
              </div>
            </div>
          </div>
        </section>

        <ReportAssistant t={t} lang={lang} />
      </main>

      <SiteFooter t={t} />
    </div>
  );
}

export function SiteFooter({ t }: { t: Dict }) {
  return (
    <footer className="border-t border-chalk/20 bg-night text-chalk print:hidden">
      <div className="mx-auto grid max-w-[88rem] gap-8 px-5 py-9 md:px-8 sm:grid-cols-[1fr_auto] sm:items-center lg:px-10">
        <div className="flex min-w-0 items-center gap-3"><OcaMark inverse /><p className="min-w-0 font-mono text-[10px] uppercase tracking-[0.13em] text-chalk/65">{t.ui.footerLine}</p></div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:justify-end"><p className="text-[12px] text-chalk/65">{t.ui.builtBy} <a href="https://delplanche.cloud" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-chalk underline decoration-chalk/30 underline-offset-4 hover:decoration-chalk">Delplanche <ArrowUpRight aria-hidden="true" className="size-3" /></a></p><a href="#top" className="font-mono text-[10px] uppercase tracking-[0.12em] text-chalk/65 hover:text-chalk">{t.ui.backToTop}</a></div>
      </div>
    </footer>
  );
}
