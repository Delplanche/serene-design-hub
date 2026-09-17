import { createFileRoute } from "@tanstack/react-router";

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
  return <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">{number} — {children}</p>;
}

function OpenChessReport() {
  return (
    <div id="top" className="relative min-h-screen overflow-hidden bg-paper font-sans text-ink antialiased">
      <div aria-hidden="true" className="report-grid pointer-events-none fixed inset-0 opacity-60" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px bg-primary/50" />

      <nav aria-label="Hoofdstukken" className="report-frost sticky top-0 z-40 border-b border-border">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-5 px-5 sm:px-8">
          <a href="#top" className="flex shrink-0 items-baseline gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">OCA</span>
            <span className="hidden font-serif text-[15px] font-medium sm:inline">Standaarden</span>
          </a>
          <div className="no-scrollbar ml-auto flex items-center gap-4 overflow-x-auto">
            {chapters.map(([number, label, id]) => (
              <a key={id} href={`#${id}`} className="group flex shrink-0 items-baseline gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                <span className="font-mono text-[10px] text-mist">{number}</span>
                <span className="text-[12px] font-medium text-soft transition-colors group-hover:text-ink">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <section className="pb-16 pt-14 sm:pb-24 sm:pt-20">
          <div className="report-reveal flex items-center gap-3">
            <span className="size-2 bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-soft sm:text-[11px]">Open Chess Alliance</span>
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist sm:text-[11px]">Brussel · 2025</span>
          </div>
          <h1 className="report-reveal mt-8 max-w-[19ch] font-serif text-[clamp(2.6rem,7.5vw,5rem)] font-medium leading-[1.02]" style={{ animationDelay: "60ms" }}>
            Federatieve standaarden voor een <em className="text-primary">soevereine</em> schaakmarkt
          </h1>
          <div className="mt-10 grid items-stretch gap-7 sm:grid-cols-12">
            <p className="report-reveal max-w-[40ch] text-[15px] leading-relaxed text-soft sm:col-span-5" style={{ animationDelay: "120ms" }}>
              Een neutrale standaardenorganisatie die spelers, platforms en federaties verbindt — zonder hun identiteit, data of autonomie op te sluiten.
            </p>
            <div className="grid grid-cols-3 gap-2 sm:col-span-7 sm:gap-5">
              {[["Markt 2025", "$3,70 mld"], ["Markt 2032", "$7,64 mld"], ["CAGR", "10,91%"]].map(([label, value], index) => (
                <div key={label} className="report-frost report-reveal min-w-0 rounded-[3px] px-3 py-4 sm:px-4 sm:py-5" style={{ animationDelay: `${160 + index * 50}ms` }}>
                  <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-mist sm:text-[10px] sm:tracking-[0.16em]">{label}</p>
                  <p className={`mt-2 font-serif text-[clamp(1.05rem,3vw,1.65rem)] font-medium ${index === 1 ? "text-primary" : ""}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="report-reveal mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "330ms" }}>
            <a href="#diagnose" className="inline-flex items-center gap-3 rounded-[3px] bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              Verken het rapport <span aria-hidden="true" className="font-mono">→</span>
            </a>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">10 hoofdstukken · EU-context · open standaard</span>
          </div>
        </section>

        <section id="diagnose" className="scroll-mt-14 border-t border-border py-16 sm:py-24">
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

        <section id="protocol" className="scroll-mt-14 border-t border-border py-16 sm:py-24">
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

        <section id="identiteit" className="scroll-mt-14 border-t border-border py-16 sm:py-24">
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

        <section className="grid scroll-mt-14 gap-10 border-t border-border py-16 md:grid-cols-2 md:gap-8 sm:py-24">
          <div id="rating" className="scroll-mt-16">
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

        <section id="uitrol" className="scroll-mt-14 border-t border-border py-16 sm:py-24">
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

        <section id="roadmap" className="scroll-mt-14 border-t border-border py-16 sm:py-24">
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

      <footer className="relative border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-baseline gap-2"><span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">OCA</span><span className="font-serif text-[15px] font-medium">De tijd van de federatie begint.</span></div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 sm:ml-auto"><a href="#top" className="font-mono text-[10px] uppercase tracking-[0.14em] text-soft hover:text-ink">Naar boven ↑</a><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">Brussel · Strategisch rapport 2025</span></div>
        </div>
      </footer>
    </div>
  );
}