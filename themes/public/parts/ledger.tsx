/**
 * The ledger (S31, docs/23 §4): a dated type as rows, one line each — the studio's cards are for a case
 * with a picture; a session's entry and a release have none, and a row says more in less height. Each
 * row is one link: the date, the entry's own mark (a log's `session`, a release's `version`), the title,
 * the description, and the term it is filed under — a `kind` for a log, *breaking* for a release that
 * says so. The mark is read from two fields by name because this theme declares the types that carry
 * them (the site's `snypd.yaml`, the changelog plugin); an entry with neither shows its date and title.
 */
import { formatDate, settingFlag, settingText, transitionName, type EntriesProps, type Html } from "@snypd/render";

export default function Ledger({ ctx, entries }: EntriesProps): Html {
  if (!entries.length) return <p>Nothing yet.</p>;
  const dates = settingFlag(ctx, "showDates", true);
  const format = settingText(ctx, "dateFormat");
  return (
    <ol class="snypd-ledger" reversed>
      {entries.map((e, i) => {
        const fm = e.frontmatter as { session?: unknown; version?: unknown; breaking?: unknown };
        const mark = typeof fm.session === "string" ? fm.session : typeof fm.version === "string" ? `v${fm.version}` : undefined;
        const kind = e.terms?.[0]?.title;
        const breaking = fm.breaking === true;
        return (
          <li>
            <a class="snypd-ledger-row" href={`${e.route}/`}>
              <span class="snypd-ledger-when">{e.date && dates ? <time datetime={e.date}>{formatDate(e.date, format)}</time> : null}</span>
              <span class="snypd-ledger-what">
                {mark ? <span class="snypd-ledger-mark">{mark}</span> : null}
                <span class="snypd-ledger-title" style={i < 6 ? `view-transition-name: ${transitionName(e)}; view-transition-class: snypd-title` : undefined}>{e.title}</span>
                {e.description ? <span class="snypd-ledger-text">{e.description}</span> : null}
              </span>
              {breaking ? <span class="snypd-ledger-kind" data-breaking="">Breaking</span> : kind ? <span class="snypd-ledger-kind">{kind}</span> : <span />}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
