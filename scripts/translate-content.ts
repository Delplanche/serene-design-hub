// Generates src/content/locales/{en,fr,de,es}.json from the Dutch source.
// Run once with: LOVABLE_API_KEY=... bun scripts/translate-content.ts [lang...]
import { writeFileSync } from "node:fs";
import { streamText } from "ai";
import { nl } from "../src/content/locales/nl";
import { createReportAi } from "../src/lib/ai-gateway.server";

const NAMES: Record<string, string> = { en: "British English", fr: "French (Belgian/European)", de: "German", es: "Spanish (European)" };
const LOCALES: Record<string, string> = { en: "en_GB", fr: "fr_BE", de: "de_DE", es: "es_ES" };

function sameShape(a: unknown, b: unknown): boolean {
  if (typeof a === "string") return typeof b === "string";
  if (Array.isArray(a)) return Array.isArray(b) && a.length === b.length && a.every((v, i) => sameShape(v, b[i]));
  if (a && typeof a === "object") return !!b && typeof b === "object" && Object.keys(a).every((k) => sameShape((a as any)[k], (b as any)[k]));
  return false;
}

const key = process.env.LOVABLE_API_KEY!;
const langs = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(NAMES);

await Promise.all(
  langs.map(async (lang) => {
    const result = streamText({
      model: createReportAi(key),
      system: `You are a senior translator for European policy publications. Translate the JSON values from Dutch into ${NAMES[lang]}. Keep the exact same JSON structure, keys and array lengths. Keep proper names and protocol terms unchanged: Open Chess Alliance, OCA, Lichess, ChessBase, FIDE, Global_ID, OCA Rating, Founding Charter, Digital Markets Act. Translate "VZW" as the local equivalent legal form description of a Belgian non-profit association (e.g. "Belgian non-profit (VZW)"). Format money and percentages in local conventions (e.g. en: "$3.70 bn", "10.91% CAGR"). Keep typographic quotes appropriate to the language. Tone: authoritative, concise, editorial. Return only the JSON object.`,
      prompt: JSON.stringify(nl),
      providerOptions: {
        openai: { forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", store: false, include: ["reasoning.encrypted_content"] },
      },
    });
    const text = (await result.text).trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
    const parsed = JSON.parse(text);
    parsed.meta.locale = LOCALES[lang];
    if (!sameShape(nl, parsed)) throw new Error(`Shape mismatch for ${lang}`);
    writeFileSync(`src/content/locales/${lang}.json`, JSON.stringify(parsed, null, 2) + "\n");
    console.log("wrote", lang);
  }),
);
