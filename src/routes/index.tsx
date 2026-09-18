import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import marbleBoardAsset from "@/assets/marmeren-schaakbord.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Strategisch Rapport — Open Chess Alliance" },
      { name: "description", content: "Een blauwdruk voor digitale soevereiniteit en marktcorrectie via federatieve schaakstandaarden." },
      { property: "og:title", content: "Strategisch Rapport — Open Chess Alliance" },
      { property: "og:description", content: "De open standaard voor identiteit, ratings en integriteit in digitaal schaken." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OpenChessReport,
});

const chapters = [
  ["01", "Diagnose", "diagnose"],
  ["02", "Protocol", "protocol"],
  ["03", "Identiteit", "identiteit"],
  ["04", "Rating", "rating"],
  ["05", "Integriteit", "integriteit"],
  ["06", "Uitrol", "uitrol"],
  ["07", "Roadmap", "roadmap"],
] as const;

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
      <span aria-hidden="true" className="inline-block size-1.5 bg-primary" />
      {number} — {children}
    </p>
  );
}

function useReadingState() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      const mid = window.innerHeight * 0.35;
      let current = "";
      for (const [, , id] of chapters) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = id;
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

function ReportHeader() {
  const { progress, active } = useReadingState();

  return (
    <header className="sticky top-0 z-40">
      <nav aria-label="Hoofdstukken" className="report-frost border-b border-border">
        <div className="mx-auto flex h-[3.75rem] max-w-6xl items-center gap-4 px-5 sm:gap-7 sm:px-8">
          <a
            href="#top"
            className="flex shrink-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <span aria-hidden="true" className="grid size-6 grid-cols-2 grid-rows-2 overflow-hidden rounded-[2px] ring-1 ring-inset ring-ink/20">
              <span className="bg-ink" />
              <span className="bg-transparent" />
              <span className="bg-transparent" />
              <span className="bg-ink" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink">OCA</span>
              <span className="mt-1 hidden font-mono text-[9px] uppercase tracking-[0.16em] text-mist sm:inline">Strategisch rapport</span>
            </span>
          </a>
          <div className="no-scrollbar ml-auto flex items-center gap-4 overflow-x-auto sm:gap-5">
            {chapters.map(([number, label, id]) => {
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative flex shrink-0 items-baseline gap-1.5 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <span className={`font-mono text-[10px] transition-colors ${isActive ? "text-primary" : "text-mist"}`}>{number}</span>
                  <span className={`text-[12px] font-medium transition-colors ${isActive ? "text-ink" : "text-soft group-hover:text-ink"}`}>{label}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-primary transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </nav>
      <div aria-hidden="true" className="h-px w-full bg-border">
        <div className="h-px origin-left bg-primary transition-transform duration-150" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  );
}

function OpenChessReport() {
  return (
    <div id="top" className="relative min-h-screen overflow-hidden bg-paper font-sans text-ink antialiased">
      <div aria-hidden="true" className="report-grid pointer-events-none fixed inset-0 opacity-60" />
      <ReportHeader />


      <section className="relative h-[calc(100svh-5.5rem)] min-h-[500px] max-h-[720px] overflow-hidden bg-ink">
        <img
          src={marbleBoardAsset.url}
          alt="Marmeren schaakbord met klassieke schaakstukken"
          className="absolute inset-0 size-full object-cover object-[58%_center] sm:object-center"
          fetchPriority="high"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-5 pb-8 sm:px-8 sm:pb-14">
          <div className="w-full max-w-4xl text-paper">
            <div className="report-reveal flex items-center gap-3">
              <span className="size-1.5 bg-primary" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/70 sm:text-[11px]">00 — Open Chess Alliance</span>
              <span className="h-px flex-1 bg-paper/20" />
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-paper/60 sm:inline sm:text-[11px]">Brussel · 2025</span>
            </div>
            <h1 className="report-reveal mt-6 max-w-[17ch] font-serif text-[clamp(2.4rem,7vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.01em]" style={{ animationDelay: "60ms" }}>
              Strategisch rapport: <em className="font-light italic">de Open Chess Alliance</em>
            </h1>
            <p className="report-reveal mt-6 max-w-[48ch] text-[14px] leading-relaxed text-paper/70 sm:text-[16px]" style={{ animationDelay: "120ms" }}>
              Een blauwdruk voor digitale soevereiniteit en marktcorrectie via federatieve schaakstandaarden.
            </p>
            <div className="report-reveal mt-7 border-t border-paper/20 pt-5" style={{ animationDelay: "180ms" }}>
              <div className="flex flex-wrap items-end gap-y-4">
                <dl className="grid flex-1 grid-cols-3 gap-x-4">
                  {[["Markt 2025", "$3,70 mld"], ["Prognose 2032", "$7,64 mld"], ["Groei CAGR", "10,91%"]].map(([label, value]) => (
                    <div key={label} className="border-l border-paper/15 pl-3 first:border-l-0 first:pl-0">
                      <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper/45">{label}</dt>
                      <dd className="mt-1.5 font-serif text-lg font-medium leading-none sm:text-2xl">{value}</dd>
                    </div>
                  ))}
                </dl>
                <a href="#diagnose" className="group ml-auto hidden items-center gap-2 border border-paper/25 px-4 py-2.5 text-[12px] font-medium text-paper transition-colors hover:border-paper/70 hover:bg-paper/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:inline-flex">
                  Start lezen <span aria-hidden="true" className="font-mono transition-transform group-hover:translate-y-0.5">↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="relative mx-auto max-w-6xl px-5 sm:px-8">

        <section id="diagnose" className="scroll-mt-20 border-t border-border py-16 sm:py-24">
          <div className="grid gap-8 sm:grid-cols-12">
            <div className="sm:col-span-4">
              <SectionLabel number="01">Diagnose</SectionLabel>
              <h2 className="mt-4 max-w-[20ch] font-serif text-3xl font-medium leading-tight sm:text-4xl">De markt groeit. Het vertrouwen niet.</h2>
            </div>
            <div className="report-frost rounded-[3px] p-5 sm:col-span-8 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  ["Fragmentatie", "Drie silo’s", "Lichess, ChessBase en FIDE beheren gescheiden identiteiten, ratings en infrastructuur."],
                  ["Walled garden", "Platformbezit", "Spelgeschiedenis, connecties en reputatie bewegen niet mee met de speler."],
                  ["Marktmacht", "Eén poortwachter", "Netwerkeffecten beperken keuze, innovatie en een gezonde digitale schaakcultuur."],
                ].map(([label, title, text]) => (
                  <div key={label}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">{label}</p>
                    <h3 className="mt-2 font-serif text-xl font-medium">{title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-soft">{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-border pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-soft">Strategisch inzicht</p>
                <p className="mt-3 max-w-[42ch] font-serif text-lg leading-snug sm:text-xl">OCA wordt geen vierde platform. Het wordt de neutrale laag die bestaande sterktes verbindt.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="protocol" className="scroll-mt-20 border-t border-border py-16 sm:py-24">
          <SectionLabel number="02">Alliantieprotocol</SectionLabel>
          <h2 className="mt-4 max-w-[24ch] font-serif text-3xl font-medium leading-tight sm:text-4xl">Een gemeenschappelijke standaard tussen bestaande spelers</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ["Technische ruggengraat", "Lichess", "Open-source infrastructuur en API-expertise."],
              ["Neutrale kern", "OCA-standaard", "Identiteit, rating en integriteit zonder lock-in."],
              ["Commercie & legitimiteit", "ChessBase + FIDE", "Professionele gebruikers, historische data en officiële erkenning."],
            ].map(([label, title, text], index) => (
              <article key={title} className={`report-frost rounded-[3px] p-5 ${index === 1 ? "ring-1 ring-inset ring-primary/25" : ""}`}>
                <p className={`font-mono text-[10px] uppercase tracking-[0.14em] ${index === 1 ? "text-primary" : "text-mist"}`}>{label}</p>
                <h3 className="mt-2 font-serif text-xl font-medium">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-soft">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 rounded-[3px] border border-border px-4 py-3 font-mono text-[11px] text-soft">
            <span className="uppercase text-primary">Schema</span><span>global_id → portable_identity</span><span className="text-mist">|</span><span>result → oca_rating</span><span className="text-mist">|</span><span>signal → fair_play</span>
          </div>
        </section>

        <section id="identiteit" className="scroll-mt-20 border-t border-border py-16 sm:py-24">
          <div className="grid items-start gap-8 sm:grid-cols-2">
            <div>
              <SectionLabel number="03">Digitale soevereiniteit</SectionLabel>
              <h2 className="mt-4 max-w-[22ch] font-serif text-3xl font-medium leading-tight sm:text-4xl">Identiteit en data blijven bij de speler</h2>
              <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-soft">Spelers gebruiken hun vertrouwde account. Een universele Global_ID verbindt dat profiel veilig met elk deelnemend platform, terwijl persoonlijke datakluizen geschiedenis en toestemming onder eigen controle houden.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[["Identiteit", "Federatief en verifieerbaar."], ["Historie", "Vrij exporteerbaar en synchroniseerbaar."], ["Toestemming", "Specifiek, inzichtelijk en intrekbaar."], ["Eigenaarschap", "De speler is de bron van vertrouwen."]].map(([title, text], index) => (
                <div key={title} className={`report-frost rounded-[3px] p-4 sm:p-5 ${index === 3 ? "ring-1 ring-inset ring-primary/25" : ""}`}>
                  <p className={`font-mono text-[9px] uppercase tracking-[0.14em] ${index === 3 ? "text-primary" : "text-mist"}`}>{title}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-soft">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="relative -mx-5 bg-ink px-5 py-14 text-paper sm:-mx-8 sm:px-8 sm:py-20">
          <div className="grid gap-6 sm:grid-cols-12 sm:items-end">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45 sm:col-span-3">Uitgangspunt</p>
            <blockquote className="sm:col-span-9">
              <p className="max-w-[26ch] font-serif text-[clamp(1.6rem,3.6vw,2.6rem)] font-medium leading-[1.12]">
                Wie de identiteit bezit, bezit de markt. <em className="font-light italic text-paper/70">Daarom hoort ze bij de speler.</em>
              </p>
            </blockquote>
          </div>
        </aside>

        <section className="grid scroll-mt-20 gap-10 border-t border-border py-16 md:grid-cols-2 md:gap-8 sm:py-24">
          <div id="rating" className="scroll-mt-20">
            <SectionLabel number="04">Universele rating</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight">Eén nieuwe, vergelijkbare waarheid</h2>
            <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-soft">De OCA Rating probeert bestaande cijfers niet cosmetisch te vertalen. Ze bouwt een transparante standaard uit resultaten binnen het federatieve netwerk.</p>
            <div className="mt-6 space-y-2">
              {[["Lokaal resultaat", "geverifieerd"], ["Federatieve update", "gesynchroniseerd"], ["OCA Rating", "universeel"]].map(([label, value], index) => (
                <div key={label} className={`report-frost flex items-center justify-between rounded-[3px] px-4 py-3 ${index === 2 ? "ring-1 ring-inset ring-primary/25" : ""}`}>
                  <span className="font-mono text-[11px] text-soft">{label}</span><span className={`font-mono text-[11px] ${index === 2 ? "text-primary" : "text-mist"}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div id="integriteit" className="scroll-mt-16 md:border-l md:border-border md:pl-8">
            <SectionLabel number="05">Collectieve integriteit</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight">Gedeelde signalen. Onafhankelijk beroep.</h2>
            <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-soft">Onafhankelijke detectiemodules delen signalen. Pas na consensus volgt een netwerkbrede maatregel, met een Fair Play Commissie voor transparant beroep.</p>
            <div className="report-frost mt-6 rounded-[3px] p-5">
              <div className="flex items-end justify-between gap-4"><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">Besluitvorming</span><span className="font-serif text-2xl text-primary">2+ signalen</span></div>
              <div className="mt-4 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 font-mono text-[9px] text-soft"><span>detectie</span><span>→</span><span>consensus</span><span>→</span><span>beroep</span></div>
            </div>
          </div>
        </section>

        <section id="uitrol" className="scroll-mt-20 border-t border-border py-16 sm:py-24">
          <SectionLabel number="06">Institutionele uitrol</SectionLabel>
          <div className="mt-4 grid gap-8 sm:grid-cols-12">
            <h2 className="max-w-[20ch] font-serif text-3xl font-medium leading-tight sm:col-span-5 sm:text-4xl">Van digitaal protocol naar publiek netwerk</h2>
            <div className="grid gap-px overflow-hidden rounded-[3px] border border-border bg-border sm:col-span-7 sm:grid-cols-3">
              {[["Bibliotheken", "Schaakclub in een Doos voor digitale inclusie en lokale ontmoeting."], ["Zorg", "Toegankelijke schaakprogramma’s voor cognitieve gezondheid en verbinding."], ["Europa", "Aansluiting op digitale soevereiniteit, DMA en publieke R&D-financiering."]].map(([title, text]) => (
                <article key={title} className="bg-paper p-5"><h3 className="font-serif text-lg font-medium">{title}</h3><p className="mt-3 text-[13px] leading-relaxed text-soft">{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="scroll-mt-20 border-t border-border py-16 sm:py-24">
          <SectionLabel number="07">Vierfasen-roadmap</SectionLabel>
          <h2 className="mt-4 max-w-[24ch] font-serif text-3xl font-medium leading-tight sm:text-4xl">Van oprichting naar een wereldwijde standaard</h2>
          <ol className="relative mt-10 space-y-7 border-l border-border pl-8 sm:pl-10">
            {[
              ["Fase 01", "Oprichting", "Maanden 1–3", "Belgische VZW registreren en het Founding Charter met kernpartners tekenen."],
              ["Fase 02", "Protocolontwikkeling", "Maanden 4–9", "API-standaarden en de open referentie-implementatie definiëren."],
              ["Fase 03", "Institutionele uitrol", "Maanden 10–15", "Pilots starten in bibliotheken en woonzorgcentra in Vlaanderen en Nederland."],
              ["Fase 04", "Publieke confrontatie", "Maand 16+", "De OCA Rating wereldwijd lanceren en de markt uitnodigen tot conformiteit."],
            ].map(([phase, title, timing, text], index) => (
              <li key={phase} className="relative">
                <span className={`absolute -left-[37px] top-1.5 size-3.5 rounded-full ring-1 ring-inset ring-primary sm:-left-[45px] ${index === 3 ? "bg-primary" : "bg-paper"}`} />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1"><span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${index === 3 ? "text-primary" : "text-mist"}`}>{phase}</span><h3 className="font-serif text-lg font-medium">{title}</h3><span className="font-mono text-[10px] text-mist">{timing}</span></div>
                <p className="mt-2 max-w-[52ch] text-[14px] leading-relaxed text-soft">{text}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="relative bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid gap-10 sm:grid-cols-12">
            <div className="sm:col-span-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45">Slotwoord</p>
              <p className="mt-5 max-w-[20ch] font-serif text-[clamp(1.9rem,5vw,3rem)] font-medium leading-[1.05]">
                De tijd van de federatie <em className="font-light">begint.</em>
              </p>
              <p className="mt-5 max-w-[46ch] text-[14px] leading-relaxed text-paper/60">
                Een neutrale standaard verdringt geen platform. Ze geeft spelers hun identiteit terug en maakt de markt opnieuw open.
              </p>
            </div>
            <div className="grid gap-8 sm:col-span-5 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/40">Colofon</p>
                <ul className="mt-4 space-y-1.5 text-[13px] text-paper/70">
                  <li>Open Chess Alliance</li>
                  <li>Brussel, België</li>
                  <li>Strategisch rapport 2025</li>
                </ul>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/40">Hoofdstukken</p>
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-1">
                  {chapters.map(([number, label, id]) => (
                    <li key={id}>
                      <a href={`#${id}`} className="inline-flex items-baseline gap-2 text-[13px] text-paper/70 transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                        <span className="font-mono text-[9px] text-paper/35">{number}</span>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-paper/15 pt-6">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="grid size-5 grid-cols-2 grid-rows-2 overflow-hidden rounded-[2px] ring-1 ring-inset ring-paper/25">
                <span className="bg-paper" />
                <span />
                <span />
                <span className="bg-paper" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">OCA · Standaarden</span>
            </div>
            <a href="#top" className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-paper/60 transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              Naar boven ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}