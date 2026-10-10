import { createFileRoute, notFound } from "@tanstack/react-router";
import { Edition } from "@/components/report/Edition";
import { getDict, isLang, pageHead } from "@/content/i18n";

export const Route = createFileRoute("/$lang/rapport")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang) || params.lang === "nl") throw notFound();
  },
  head: ({ params }) => (isLang(params.lang) ? pageHead(params.lang, "report") : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] }),
  component: LangEdition,
});

function LangEdition() {
  const { lang } = Route.useParams();
  if (!isLang(lang)) return null;
  return <Edition t={getDict(lang)} lang={lang} />;
}
