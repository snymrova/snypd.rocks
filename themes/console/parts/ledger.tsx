/**
 * The ledger (docs/24 §3): a dated type as rows, the way `git log --oneline` reads — the entry's own
 * mark (a log's `session`, a release's `version`) in the accent like a short hash, the title, the
 * description muted on the next line, the date right, and the term it is filed under as a bracketed
 * word coloured by `data-kind` (decision 205: the six series tokens, nothing else; a kind the sheet has
 * no colour for is muted). Registered as `entries` too, so `/posts/`, a term page and an author page
 * are the same rows: a post has no mark, so its first term takes the mark's place and the bracket goes.
 *
 * The build orders a list by date and then by route, so four sessions on one day read R1, R2, R3, R4
 * under a heading that promises newest first. Within a day the mark decides — R4 above R1, v0.1.4
 * above v0.1.3 — compared as a number where it is one; the day order is the build's and stands.
 */
import { formatDate, settingFlag, settingText, transitionName, type EntriesProps, type Html } from "@snypd/render";

type Entry = EntriesProps["entries"][number];
const markOf = (e: Entry): string | undefined => {
  const fm = e.frontmatter as { session?: unknown; version?: unknown };
  return typeof fm.session === "string" ? fm.session : typeof fm.version === "string" ? `v${fm.version}` : undefined;
};

export default function Ledger({ ctx, entries }: EntriesProps): Html {
  if (!entries.length) return <p class="snypd-ledger-empty">Nothing yet.</p>;
  const dates = settingFlag(ctx, "showDates", true);
  const format = settingText(ctx, "dateFormat");
  const byMark = new Intl.Collator("en", { numeric: true });
  const rows = [...entries].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || byMark.compare(markOf(b) ?? "", markOf(a) ?? ""));
  return (
    <ol class="snypd-ledger" reversed>
      {rows.map((e, i) => {
        const term = e.terms?.[0];
        const own = markOf(e);
        const mark = own ?? term?.title;
        const kind = own ? term : undefined;
        const breaking = (e.frontmatter as { breaking?: unknown }).breaking === true;
        return (
          <li>
            <a class="snypd-ledger-row" href={`${e.route}/`} data-kind={breaking ? "breaking" : kind?.term}>
              <span class="snypd-ledger-what">
                {mark ? <span class="snypd-ledger-mark">{mark}</span> : null}
                <span class="snypd-ledger-title" style={i < 6 ? `view-transition-name: ${transitionName(e)}; view-transition-class: snypd-title` : undefined}>{e.title}</span>
                {e.description ? <span class="snypd-ledger-text">{e.description}</span> : null}
              </span>
              <span class="snypd-ledger-when">{e.date && dates ? <time datetime={e.date}>{formatDate(e.date, format)}</time> : null}</span>
              {breaking ? <span class="snypd-ledger-kind">breaking</span> : kind ? <span class="snypd-ledger-kind">{kind.term}</span> : null}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
