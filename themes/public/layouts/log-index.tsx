import { formatDate, part, settingText, Slot, type LayoutProps, type Html } from "@snypd/render";

/**
 * The log's archive (S31, docs/23 §4): the build prefers `<type>-index` when a theme declares it. The
 * ledger's rows under the archive's title — the menu's word for it — and one line that says what the
 * ledger holds: how many sessions, and the days they span, read from the entries and never typed.
 */
export default function LogIndex({ ctx, entries, route, title, jsonLd }: LayoutProps): Html {
  const Shell = part(ctx, "shell"), Ledger = part(ctx, "ledger");
  const days = entries.map((e) => e.date?.slice(0, 10)).filter((d): d is string => !!d);
  const format = settingText(ctx, "dateFormat");
  const first = days[days.length - 1], last = days[0];
  const when = (d: string) => formatDate(d, format === "iso" ? "short" : format);
  const n = entries.length;
  return (
    <Shell ctx={ctx} title={title} route={route} jsonLd={jsonLd}>
      <main class="snypd-log-index">
        <h1>{title}</h1>
        {n ? <p class="snypd-lede">{n} {n === 1 ? "session" : "sessions"}{first && last ? (first === last ? `, on ${when(last)}` : `, ${when(first)} to ${when(last)}`) : ""}. Every entry was written by the agent at the end of the session it describes, through the same MCP server that writes the posts.</p> : null}
        <Slot name="before-content" ctx={ctx} route={route} title={title} />
        <Ledger ctx={ctx} entries={entries} />
        <Slot name="after-content" ctx={ctx} route={route} title={title} />
      </main>
    </Shell>
  );
}
