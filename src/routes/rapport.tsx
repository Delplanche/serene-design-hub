import { createFileRoute } from "@tanstack/react-router";
import { Edition } from "@/components/report/Edition";
import { getDict, pageHead } from "@/content/i18n";

export const Route = createFileRoute("/rapport")({
  head: () => pageHead("nl", "report"),
  component: () => <Edition t={getDict("nl")} lang="nl" />,
});
