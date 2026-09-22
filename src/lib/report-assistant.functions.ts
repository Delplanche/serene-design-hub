import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";

const questionSchema = z.object({
  question: z.string().trim().min(3).max(500),
});

const REPORT_CONTEXT = `
OPEN CHESS ALLIANCE — STRATEGISCH RAPPORT, BRUSSEL 2025

Kern: OCA wordt geen vierde schaakplatform, maar een neutrale, federatieve standaard die bestaande platformen verbindt. Doel is digitale soevereiniteit, marktcorrectie, interoperabiliteit en eigenaarschap voor spelers.

Markt: omvang in 2025 is 3,70 miljard dollar; prognose voor 2032 is 7,64 miljard dollar; verwachte CAGR is 10,91%.

01 Diagnose: Lichess, ChessBase en FIDE beheren gescheiden identiteiten, ratings en infrastructuur. Spelgeschiedenis, connecties en reputatie bewegen niet mee met de speler. Netwerkeffecten beperken keuze, innovatie en een gezonde digitale schaakcultuur.

02 Alliantieprotocol: Lichess levert open-source infrastructuur en API-expertise. De OCA-standaard is de neutrale kern voor identiteit, rating en integriteit zonder lock-in. ChessBase en FIDE brengen professionele gebruikers, historische data en officiële erkenning. Het schema verbindt global_id met portable_identity, resultaten met oca_rating en signalen met fair_play.

03 Digitale soevereiniteit: spelers behouden hun vertrouwde account. Een universele Global_ID verbindt het profiel veilig met deelnemende platformen. Persoonlijke datakluizen houden geschiedenis en toestemming onder controle van de speler. Identiteit is federatief en verifieerbaar; historie is exporteerbaar en synchroniseerbaar; toestemming is specifiek, inzichtelijk en intrekbaar. Uitgangspunt: wie de identiteit bezit, bezit de markt; daarom hoort ze bij de speler.

04 Universele rating: de OCA Rating vertaalt bestaande cijfers niet cosmetisch. Ze bouwt een transparante, vergelijkbare standaard uit geverifieerde resultaten in het federatieve netwerk: lokaal resultaat, federatieve update, universele OCA Rating.

05 Collectieve integriteit: onafhankelijke detectiemodules delen signalen. Pas na consensus van twee of meer signalen volgt een netwerkbrede maatregel. Een onafhankelijke Fair Play Commissie verzorgt transparant beroep. Proces: detectie, consensus, beroep.

06 Institutionele uitrol: bibliotheken krijgen “Schaakclub in een Doos” voor digitale inclusie en ontmoeting. Zorginstellingen krijgen toegankelijke programma’s voor cognitieve gezondheid en verbinding. Europa biedt aansluiting op digitale soevereiniteit, de Digital Markets Act en publieke R&D-financiering.

07 Roadmap: fase 1, maanden 1–3: Belgische VZW registreren en Founding Charter met kernpartners tekenen. Fase 2, maanden 4–9: API-standaarden en open referentie-implementatie definiëren. Fase 3, maanden 10–15: pilots in bibliotheken en woonzorgcentra in Vlaanderen en Nederland. Fase 4, maand 16+: OCA Rating wereldwijd lanceren en de markt uitnodigen tot conformiteit.
`;

function safeGatewayMessage(error: unknown) {
  if (typeof error !== "object" || error === null) return "De AI-dienst gaf geen bruikbaar antwoord.";
  const candidate = error as { message?: unknown; responseBody?: unknown };
  if (typeof candidate.responseBody === "string") {
    try {
      const body = JSON.parse(candidate.responseBody) as { error?: { message?: unknown }; message?: unknown };
      const message = body.error?.message ?? body.message;
      if (typeof message === "string" && message.trim()) return message.trim();
    } catch {
      if (candidate.responseBody.trim()) return candidate.responseBody.trim();
    }
  }
  return typeof candidate.message === "string" && candidate.message.trim()
    ? candidate.message.trim()
    : "De AI-dienst gaf geen bruikbaar antwoord.";
}

export const askReportQuestion = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => questionSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { answer: null, error: "De AI-vraagfunctie is nog niet geconfigureerd." };

    try {
      const { createReportAi } = await import("./ai-gateway.server");
      const result = streamText({
        model: createReportAi(key),
        system: `Je bent de inhoudelijke gids van het Open Chess Alliance-rapport. Antwoord uitsluitend op basis van de meegeleverde rapporttekst. Schrijf helder Nederlands, direct en beknopt (doorgaans 2–4 korte alinea's). Schrijf platte lopende tekst zonder opmaaktekens: geen sterretjes, geen koppen, geen opsommingstekens. Verwijs naar het relevante hoofdstuknummer en de hoofdstuktitel wanneer dat helpt. Maak duidelijk onderscheid tussen wat het rapport stelt en wat het nog niet specificeert. Als het antwoord niet in het rapport staat, zeg letterlijk dat het rapport dit niet specificeert; verzin niets en gebruik geen externe kennis.\n\n${REPORT_CONTEXT}`,
        prompt: data.question,
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "medium",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });
      const answer = (await result.text).trim();
      return answer
        ? { answer, error: null }
        : { answer: null, error: "De AI-dienst voltooide de vraag zonder antwoord." };
    } catch (error) {
      console.error("Report assistant request failed", error);
      return { answer: null, error: safeGatewayMessage(error) };
    }
  });