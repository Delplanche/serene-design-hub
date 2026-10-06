import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowDown, ArrowUpRight, LoaderCircle, MessageCircle, Moon, Send, Sun } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import marbleBoardUrl from "@/assets/marmeren-schaakbord.webp";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { askReportQuestion } from "@/lib/report-assistant.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Strategisch Rapport — Open Chess Alliance" },
      { name: "description", content: "Een blauwdruk voor digitale soevereiniteit via open standaarden voor identiteit, rating en integriteit in digitaal schaken." },
      { property: "og:title", content: "Strategisch Rapport — Open Chess Alliance" },
      { property: "og:description", content: "De open standaard voor identiteit, ratings en integriteit in digitaal schaken." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OpenChessReport,
});

const chapters = [
  ["01", "Waarom ingrijpen", "context"],
  ["02", "De open standaard", "standaard"],
  ["03", "Publieke toepassing", "toepassing"],
  ["04", "Uitvoering", "uitvoering"],
] as const;

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("oca-theme", next);
    setTheme(next);
  };

  return (
    <Button type="button" variant="ghost" size="icon" onClick={toggleTheme} aria-label={theme === "dark" ? "Licht thema gebruiken" : "Donker thema gebruiken"} className="size-11 rounded-none text-ink shadow-none hover:bg-linen">
      {theme === "dark" ? <Sun aria-hidden="true" className="size-4" /> : <Moon aria-hidden="true" className="size-4" />}
    </Button>
  );
}

const roles = [
  ["OCA", "Neutrale regie", "Beheert de standaard, toetst conformiteit en bewaakt het gemeenschappelijk belang."],
  ["Lichess", "Technische ruggengraat", "Brengt open-source infrastructuur en ervaring met publieke API’s in."],
  ["ChessBase", "Professioneel bereik", "Verbindt professionele gebruikers, partijenarchieven en commerciële toepassingen."],
  ["FIDE", "Institutionele legitimiteit", "Verbindt de standaard met georganiseerde sport en officiële erkenning."],
] as const;

const phases = [
  ["01", "Maanden 1–3", "Oprichting", "Belgische VZW registreren en het Founding Charter met kernpartners tekenen."],
  ["02", "Maanden 4–9", "Protocolontwikkeling", "API-standaarden en de open referentie-implementatie definiëren."],
  ["03", "Maanden 10–15", "Institutionele pilots", "Pilots starten in bibliotheken en woonzorgcentra in Vlaanderen en Nederland."],
  ["04", "Maand 16+", "Publieke lancering", "De OCA Rating wereldwijd lanceren en de markt uitnodigen tot conformiteit."],
] as const;

function useReadingState() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      const threshold = window.innerHeight * 0.34;
      let current = "";
      for (const [, , id] of chapters) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= threshold) current = id;
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
      elements.forEach((element) => element.classList.add("is-inview"));
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
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function OcaMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span aria-hidden="true" className={`grid size-7 shrink-0 grid-cols-2 grid-rows-2 overflow-hidden border ${inverse ? "border-paper/35" : "border-ink/30"}`}>
      <span className={inverse ? "bg-paper" : "bg-ink"} />
      <span />
      <span />
      <span className={inverse ? "bg-paper" : "bg-ink"} />
    </span>
  );
}

function ReportHeader() {
  const { progress, active } = useReadingState();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const activeChapter = chapters.find(([, , id]) => id === active);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const onPointer = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-border bg-paper/95 backdrop-blur-md">
      <nav aria-label="Rapportnavigatie" className="mx-auto grid h-16 max-w-[88rem] grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-1 px-5 lg:px-10">
        <a href="#top" onClick={() => setOpen(false)} className="flex shrink-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <OcaMark />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink">OCA</span>
        </a>

        <p className="min-w-0 truncate text-center font-mono text-[10px] uppercase tracking-[0.1em] text-soft lg:hidden" aria-live="polite">
          {activeChapter ? <><span className="text-primary">{activeChapter[0]}</span><span> / {activeChapter[1]}</span></> : "Strategisch rapport"}
        </p>

        <div className="ml-auto hidden items-stretch lg:flex">
          {chapters.map(([number, label, id]) => {
            const selected = active === id;
            return (
              <a key={id} href={`#${id}`} aria-current={selected ? "location" : undefined} className={`flex min-h-16 items-center gap-2 border-l border-border px-4 text-[13px] transition-colors last:border-r ${selected ? "bg-linen text-ink" : "text-soft hover:bg-linen/60 hover:text-ink"}`}>
                <span className={`font-mono text-[10px] ${selected ? "text-primary" : "text-mist"}`}>{number}</span>
                <span className="font-medium">{label}</span>
              </a>
            );
          })}
        </div>

        <div className="ml-auto hidden items-center border-l border-border lg:flex">
          <a href="#vraag" className="px-4 text-[13px] font-medium text-soft hover:text-ink">Vraag het rapport</a>
          <ThemeToggle />
        </div>

        <ThemeToggle />
        <Button type="button" variant="outline" size="icon" aria-expanded={open} aria-controls="mobile-contents" aria-label={open ? "Inhoudsopgave sluiten" : "Inhoudsopgave openen"} onClick={() => setOpen((value) => !value)} className="relative size-11 rounded-none border-ink/20 bg-transparent shadow-none lg:hidden">
          <span aria-hidden="true" className={`absolute h-px w-5 bg-ink transition-transform ${open ? "rotate-45" : "-translate-y-1"}`} />
          <span aria-hidden="true" className={`absolute h-px w-5 bg-ink transition-transform ${open ? "-rotate-45" : "translate-y-1"}`} />
        </Button>
      </nav>

      <div id="mobile-contents" hidden={!open} className="border-t border-border bg-paper lg:hidden">
        <div className="mx-auto max-w-xl px-5 py-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist">Inhoud van het rapport</p>
          <ol className="mt-4 border-t border-border">
            {chapters.map(([number, label, id]) => {
              const selected = active === id;
              return (
                <li key={id} className="border-b border-border">
                  <a href={`#${id}`} onClick={() => setOpen(false)} aria-current={selected ? "location" : undefined} className="grid min-h-14 grid-cols-[2rem_1fr_auto] items-center gap-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    <span className={`font-mono text-[11px] ${selected ? "text-primary" : "text-mist"}`}>{number}</span>
                    <span className={`text-[16px] font-medium ${selected ? "text-ink" : "text-soft"}`}>{label}</span>
                    <ArrowDown aria-hidden="true" className="size-4 text-mist" />
                  </a>
                </li>
              );
            })}
          </ol>
          <a href="#vraag" onClick={() => setOpen(false)} className="mt-5 flex min-h-12 items-center justify-between border-b border-border py-3 text-[15px] font-medium text-ink">Vraag het rapport <MessageCircle aria-hidden="true" className="size-4 text-primary" /></a>
        </div>
      </div>

      <div aria-hidden="true" className="h-0.5 bg-border"><div className="h-full origin-left bg-primary" style={{ transform: `scaleX(${progress})` }} /></div>
    </header>
  );
}

function ChapterIntro({ number, kicker, title, children }: { number: string; kicker: string; title: string; children?: ReactNode }) {
  return (
    <header className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{number} / {kicker}</p>
        <p aria-hidden="true" className="mt-5 font-serif text-7xl leading-none text-stone lg:text-8xl">{number}</p>
      </div>
      <div className="lg:col-span-8">
        <h2 className="max-w-[21ch] font-serif text-[2.5rem] font-semibold leading-[1.02] text-ink sm:text-5xl lg:text-6xl">{title}</h2>
        {children}
      </div>
    </header>
  );
}

function ReportAssistant() {
  const askQuestion = useServerFn(askReportQuestion);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedQuestion = question.trim();
    if (normalizedQuestion.length < 3 || isAsking) return;
    setIsAsking(true);
    setAnswer(null);
    setError(null);
    try {
      const result = await askQuestion({ data: { question: normalizedQuestion } });
      setAnswer(result.answer);
      setError(result.error);
    } catch {
      setError("De vraag kon niet worden verzonden. Probeer het later opnieuw.");
    } finally {
      setIsAsking(false);
    }
  }

  return (
    <section id="vraag" data-reveal className="scroll-mt-20 border-y border-border bg-linen text-ink">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-5 py-20 md:px-8 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-28">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">Interactieve leeshulp</p>
          <h2 className="mt-5 max-w-[11ch] font-serif text-4xl font-semibold leading-[1.03] lg:text-6xl">Vraag het rapport</h2>
          <p className="mt-6 max-w-[35ch] text-[16px] leading-7 text-soft">Stel een vrije vraag. Het antwoord gebruikt uitsluitend de inhoud van deze publicatie en benoemt wat niet wordt gespecificeerd.</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <form onSubmit={handleSubmit} className="border-t border-ink/25 pt-6">
            <label htmlFor="report-question" className="font-mono text-[11px] uppercase tracking-[0.14em] text-soft">Uw vraag aan het rapport</label>
            <Textarea id="report-question" suppressHydrationWarning value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Hoe bewaart OCA het eigenaarschap van spelersdata?" maxLength={500} rows={4} disabled={isAsking} className="mt-4 min-h-36 resize-y rounded-none border-input bg-paper px-4 py-4 text-[17px] leading-7 text-ink shadow-none placeholder:text-mist focus-visible:ring-primary" />
            <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-4">
              <span className="font-mono text-[10px] text-mist">{question.length} / 500</span>
              <Button type="submit" disabled={question.trim().length < 3 || isAsking} className="h-11 rounded-none bg-primary px-5 text-primary-foreground shadow-none hover:bg-primary/90">
                {isAsking ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : <Send aria-hidden="true" />}
                {isAsking ? "Rapport raadplegen" : "Vraag stellen"}
              </Button>
            </div>
          </form>
          <div aria-live="polite" aria-busy={isAsking} className={isAsking || error || answer ? "mt-8 border-t border-border pt-8" : ""}>
            {isAsking && <p className="flex items-center gap-3 text-[15px] text-soft"><LoaderCircle aria-hidden="true" className="size-4 animate-spin text-primary" />Het rapport wordt geraadpleegd…</p>}
            {error && <p role="alert" className="border-l-2 border-destructive pl-4 text-[15px] leading-7 text-ink">{error}</p>}
            {answer && <div className="grid gap-4 sm:grid-cols-[auto_1fr]"><MessageCircle aria-hidden="true" className="mt-1 size-5 text-primary" /><p className="max-w-[58ch] whitespace-pre-wrap font-serif text-xl leading-relaxed text-ink sm:text-2xl">{answer}</p></div>}
          </div>
        </div>
      </div>
    </section>
  );
}

function OpenChessReport() {
  useScrollReveal();

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-paper font-sans text-ink antialiased">
      <ReportHeader />

      <section className="relative min-h-[650px] overflow-hidden bg-ink text-paper sm:min-h-[680px]">
        <img src={marbleBoardUrl} alt="Marmeren schaakbord met klassieke schaakstukken" className="report-cover-img absolute inset-0 size-full object-cover object-[58%_60%] sm:object-[center_58%]" fetchPriority="high" />
        <div aria-hidden="true" className="absolute inset-0 bg-cover-shade" />
        <div className="relative mx-auto grid min-h-[650px] max-w-[88rem] grid-rows-[auto_1fr_auto] px-5 py-7 sm:min-h-[680px] md:px-8 lg:px-10 lg:py-10">
          <div className="grid grid-cols-[1fr_auto] gap-6 border-b border-paper/25 pb-5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/68">
            <span>Strategisch rapport / OCA–01</span><span>Brussel · 2025</span>
          </div>
          <div className="flex items-end py-10 lg:py-14">
            <div className="max-w-5xl">
              <p className="report-reveal font-mono text-[11px] uppercase tracking-[0.18em] text-paper/85">Open Chess Alliance</p>
              <h1 className="report-reveal mt-5 max-w-[15ch] font-serif text-[3.25rem] font-semibold leading-[0.96] sm:text-7xl lg:text-[6.6rem]">Een open standaard voor het digitale schaakspel</h1>
              <p className="report-reveal mt-7 max-w-[55ch] text-[17px] leading-7 text-paper/78 sm:text-xl sm:leading-8">Een strategische blauwdruk voor draagbare identiteit, vergelijkbare ratings en gedeelde integriteit — zonder een nieuw platform op te leggen.</p>
            </div>
          </div>
          <a href="#samenvatting" className="group flex min-h-12 items-center justify-between border-t border-paper/25 pt-5 text-[13px] font-medium text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal">
            <span>Lees de managementsamenvatting</span><ArrowDown aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-1" />
          </a>
        </div>
      </section>

      <main>
        <section id="samenvatting" data-reveal className="scroll-mt-20 border-b border-border bg-linen">
          <div className="mx-auto grid max-w-[88rem] gap-10 px-5 py-16 md:px-8 lg:grid-cols-12 lg:px-10 lg:py-24">
            <div className="lg:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">Managementsamenvatting</p>
              <h2 className="mt-5 max-w-[13ch] font-serif text-4xl font-semibold leading-[1.06] lg:text-5xl">Niet nóg een platform. Wel één gedeelde onderlaag.</h2>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <p className="max-w-[52ch] font-serif text-2xl leading-snug text-ink lg:text-3xl">De digitale schaakwereld groeit, maar identiteit, reputatie en speldata blijven opgesloten in afzonderlijke systemen.</p>
              <div className="mt-10 grid border-t border-ink/25 sm:grid-cols-3">
                {[
                  ["Probleem", "Gescheiden identiteiten, ratings en integriteitsbesluiten beperken vertrouwen en keuze."],
                  ["Voorstel", "Een neutrale standaard verbindt bestaande platforms zonder hun eigenheid te vervangen."],
                  ["Uitkomst", "De speler houdt controle; marktpartijen concurreren op kwaliteit bovenop gedeelde rails."],
                ].map(([title, text]) => <div key={title} className="border-b border-ink/15 py-5 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"><h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">{title}</h3><p className="mt-3 text-[15px] leading-6 text-soft">{text}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="context" data-reveal className="scroll-mt-20 border-b border-border">
          <div className="mx-auto max-w-[88rem] px-5 py-20 md:px-8 lg:px-10 lg:py-28">
            <ChapterIntro number="01" kicker="Waarom ingrijpen" title="De markt groeit. Het vertrouwen groeit niet mee.">
              <p className="mt-7 max-w-[58ch] text-[17px] leading-7 text-soft">De schaakeconomie beweegt richting een verdubbeling, terwijl spelersprofielen, ratings en reputatie verdeeld blijven over gesloten ecosystemen. Groei zonder interoperabiliteit versterkt bestaande poortwachters.</p>
            </ChapterIntro>

            <div className="mt-14 grid border-y border-ink/25 lg:ml-[calc(33.333%+0.833rem)] lg:grid-cols-3">
              {[["Markt 2025", "$3,70 mld"], ["Prognose 2032", "$7,64 mld"], ["Jaarlijkse groei", "10,91% CAGR"]].map(([label, value]) => <dl key={label} className="border-b border-ink/15 py-6 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0"><dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">{label}</dt><dd className="mt-3 font-serif text-3xl font-semibold lg:text-4xl">{value}</dd></dl>)}
            </div>

            <div className="mt-14 grid gap-px border border-border bg-border lg:grid-cols-3">
              {[
                ["01", "Fragmentatie", "Lichess, ChessBase en FIDE beheren gescheiden identiteiten, ratings en infrastructuur."],
                ["02", "Platformbezit", "Spelgeschiedenis, connecties en reputatie bewegen vandaag niet vanzelf met de speler mee."],
                ["03", "Marktmacht", "Netwerkeffecten beperken keuze, innovatie en een gezonde digitale schaakcultuur."],
              ].map(([number, title, text]) => <article key={number} className="bg-paper p-6 lg:min-h-64 lg:p-8"><span className="font-mono text-[11px] text-primary">{number}</span><h3 className="mt-10 font-serif text-2xl font-semibold">{title}</h3><p className="mt-4 text-[15px] leading-7 text-soft">{text}</p></article>)}
            </div>

            <blockquote className="mt-14 grid border-l-4 border-primary bg-petrol px-6 py-10 text-paper lg:grid-cols-12 lg:px-10 lg:py-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/60 lg:col-span-3">Strategische conclusie</p>
              <p className="mt-5 max-w-[34ch] font-serif text-3xl font-semibold leading-tight lg:col-span-8 lg:col-start-5 lg:mt-0 lg:text-4xl">OCA wordt geen vierde platform. Het wordt de neutrale laag die bestaande sterktes verbindt.</p>
            </blockquote>
          </div>
        </section>

        <section id="standaard" data-reveal className="scroll-mt-20 border-b border-border bg-linen/50">
          <div className="mx-auto max-w-[88rem] px-5 py-20 md:px-8 lg:px-10 lg:py-28">
            <ChapterIntro number="02" kicker="De open standaard" title="Van losse ecosystemen naar één federatief protocol">
              <p className="mt-7 max-w-[58ch] text-[17px] leading-7 text-soft">OCA organiseert geen overname van functies. Het definieert de afspraken waarmee bestaande partijen identiteit, resultaten en integriteit betrouwbaar kunnen uitwisselen.</p>
            </ChapterIntro>

            <div className="mt-16 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4"><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">2.1 / Rollen en regie</p><h3 className="mt-4 max-w-[16ch] font-serif text-3xl font-semibold">Iedere partij brengt een eigen sterkte in.</h3></div>
              <div className="overflow-hidden border-t border-ink/30 lg:col-span-8">
                {roles.map(([name, role, text]) => <div key={name} className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[8rem_11rem_1fr] sm:gap-5"><p className="font-serif text-xl font-semibold">{name}</p><p className="font-mono text-[10px] uppercase tracking-[0.1em] text-primary sm:pt-1.5">{role}</p><p className="text-[15px] leading-6 text-soft">{text}</p></div>)}
              </div>
            </div>

            <div className="mt-20 grid gap-10 border-t border-ink/25 pt-14 lg:grid-cols-12">
              <div className="lg:col-span-4"><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">2.2 / Identiteit en data</p><h3 className="mt-4 max-w-[16ch] font-serif text-3xl font-semibold">De speler blijft de bron van vertrouwen.</h3><p className="mt-5 max-w-[38ch] text-[16px] leading-7 text-soft">Een Global_ID verbindt het vertrouwde account met deelnemende diensten. Persoonlijke datakluizen bewaren geschiedenis en toestemming onder controle van de speler.</p></div>
              <div className="lg:col-span-8">
                <ol className="grid gap-px border border-border bg-border sm:grid-cols-4">
                  {[["01", "Vertrouwd account"], ["02", "Global_ID"], ["03", "Gerichte toestemming"], ["04", "Draagbare historie"]].map(([number, label]) => <li key={number} className="relative min-h-36 bg-paper p-5"><span className="font-mono text-[10px] text-primary">{number}</span><p className="mt-10 font-serif text-xl font-semibold">{label}</p></li>)}
                </ol>
                <blockquote className="mt-8 border-l border-primary pl-6"><p className="max-w-[30ch] font-serif text-3xl font-semibold leading-tight">“Wie de identiteit bezit, bezit de markt.”</p><footer className="mt-3 text-[15px] text-soft">Daarom hoort ze bij de speler.</footer></blockquote>
              </div>
            </div>

            <div className="mt-20 grid gap-10 border-t border-ink/25 pt-14 lg:grid-cols-12">
              <div className="lg:col-span-4"><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">2.3 / Rating en integriteit</p><h3 className="mt-4 max-w-[17ch] font-serif text-3xl font-semibold">Vergelijkbare resultaten, controleerbare besluiten.</h3></div>
              <div className="lg:col-span-8">
                <div className="border-y border-ink/25 py-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">Protocolstroom</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
                    {["Geverifieerd resultaat", "OCA Rating", "Fair-playbesluit"].map((label, index) => <div key={label} className="contents"><div className="border border-ink/20 bg-paper p-4 font-mono text-[11px] text-ink">{label}</div>{index < 2 && <span aria-hidden="true" className="hidden text-center text-primary sm:block">→</span>}</div>)}
                  </div>
                </div>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div><h4 className="font-serif text-2xl font-semibold">Universele OCA Rating</h4><p className="mt-3 text-[15px] leading-7 text-soft">Bestaande cijfers worden niet cosmetisch vertaald. De standaard berekent een vergelijkbare rating uit geverifieerde resultaten binnen het federatieve netwerk.</p></div>
                  <div><h4 className="font-serif text-2xl font-semibold">Collectieve integriteit</h4><p className="mt-3 text-[15px] leading-7 text-soft">Onafhankelijke modules delen signalen. Een netwerkbrede maatregel volgt pas na consensus, met transparant beroep bij een Fair Play Commissie.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="toepassing" data-reveal className="scroll-mt-20 border-b border-border">
          <div className="mx-auto max-w-[88rem] px-5 py-20 md:px-8 lg:px-10 lg:py-28">
            <ChapterIntro number="03" kicker="Publieke toepassing" title="Een digitaal protocol wordt pas publiek wanneer mensen het kunnen gebruiken.">
              <p className="mt-7 max-w-[58ch] text-[17px] leading-7 text-soft">De standaard krijgt betekenis in omgevingen waar toegang, gezondheid en publieke digitale infrastructuur samenkomen.</p>
            </ChapterIntro>
            <div className="mt-14 lg:ml-[calc(33.333%+0.833rem)]">
              {[
                ["Bibliotheken", "Digitale inclusie", "Schaakclub in een Doos brengt online spel en lokale ontmoeting samen."],
                ["Zorg", "Cognitieve gezondheid", "Toegankelijke schaakprogramma’s ondersteunen verbinding en mentale activiteit."],
                ["Europa", "Digitale soevereiniteit", "Open standaarden sluiten aan bij publieke R&D, interoperabiliteit en de doelen van de DMA."],
              ].map(([title, label, text], index) => <article key={title} className="grid gap-3 border-t border-ink/25 py-7 sm:grid-cols-[3rem_10rem_1fr] sm:gap-5"><span className="font-mono text-[11px] text-primary">0{index + 1}</span><div><h3 className="font-serif text-2xl font-semibold">{title}</h3><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-mist">{label}</p></div><p className="max-w-[42ch] text-[15px] leading-7 text-soft">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="uitvoering" data-reveal className="scroll-mt-20 bg-petrol text-paper">
          <div className="mx-auto max-w-[88rem] px-5 py-20 md:px-8 lg:px-10 lg:py-28">
            <header className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4"><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">04 / Uitvoering</p><p aria-hidden="true" className="mt-5 font-serif text-7xl leading-none text-paper/12 lg:text-8xl">04</p></div>
              <div className="lg:col-span-8"><h2 className="max-w-[18ch] font-serif text-[2.5rem] font-semibold leading-[1.02] sm:text-5xl lg:text-6xl">Van oprichting naar een wereldwijde standaard</h2><p className="mt-7 max-w-[56ch] text-[17px] leading-7 text-paper/72">Vier opeenvolgende fasen bouwen juridische legitimiteit, technische werking en publieke toepassing gecontroleerd op.</p></div>
            </header>
            <ol className="mt-16 border-t border-paper/30 lg:ml-[calc(33.333%+0.833rem)]">
              {phases.map(([number, timing, title, text], index) => <li key={number} className="grid gap-4 border-b border-paper/20 py-7 sm:grid-cols-[3rem_9rem_13rem_1fr] sm:gap-5"><span className={`font-mono text-[11px] ${index === phases.length - 1 ? "text-signal" : "text-paper/50"}`}>{number}</span><span className="font-mono text-[10px] uppercase tracking-[0.1em] text-paper/55">{timing}</span><h3 className="font-serif text-xl font-semibold">{title}</h3><p className="max-w-[42ch] text-[15px] leading-6 text-paper/70">{text}</p></li>)}
            </ol>
          </div>
        </section>

        <ReportAssistant />
      </main>

      <footer className="border-t border-paper/20 bg-ink text-paper">
        <div className="mx-auto grid max-w-[88rem] gap-8 px-5 py-9 md:px-8 sm:grid-cols-[1fr_auto] sm:items-center lg:px-10">
          <div className="flex min-w-0 items-center gap-3"><OcaMark inverse /><p className="min-w-0 font-mono text-[10px] uppercase tracking-[0.13em] text-paper/60">Open Chess Alliance · Brussel · Strategisch rapport 2025</p></div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:justify-end"><p className="text-[12px] text-paper/60">Architectuur &amp; Platform door <a href="https://delplanche.cloud" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-paper">Delplanche <ArrowUpRight aria-hidden="true" className="size-3" /></a></p><a href="#top" className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper/60 hover:text-paper">Naar boven ↑</a></div>
        </div>
      </footer>
    </div>
  );
}
