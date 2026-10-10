import { createFileRoute } from "@tanstack/react-router";
import { Report } from "@/components/report/Report";
import { getDict, pageHead } from "@/content/i18n";

export const Route = createFileRoute("/")({
  head: () => pageHead("nl", "home"),
  component: () => <Report t={getDict("nl")} lang="nl" />,
});
