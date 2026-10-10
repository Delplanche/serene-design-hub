import { createFileRoute, notFound } from "@tanstack/react-router";
import { Report } from "@/components/report/Report";
import { getDict, isLang, pageHead } from "@/content/i18n";

export const Route = createFileRoute("/$lang/")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang) || params.lang === "nl") throw notFound();
  },
  head: ({ params }) => (isLang(params.lang) ? pageHead(params.lang, "home") : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] }),
  component: LangHome,
});

function LangHome() {
  const { lang } = Route.useParams();
  if (!isLang(lang)) return null;
  return <Report t={getDict(lang)} lang={lang} />;
}
