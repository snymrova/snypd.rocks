import { formatDate, part, settingFlag, settingText, transitionName, Slot, type LayoutProps, type Html } from "@snypd/render";

/**
 * A session's entry in the log (docs/25 §4.2, carried from `console`): a reading page with the
 * session's own name as the prompt above the title and the facts as a status line under it: the pull
 * request when one carried it, the decisions it added as links into docs/11 §8 on GitHub, and what kind
 * of entry it is (the `kind` term, bracketed and coloured the way the ledger does it). The fields are
 * read by name because the site's `snypd.yaml` declares them on this type; an entry that lacks one
 * shows the cells it has. Under the body, the session after (or before), as one row.
 */
const DECISIONS = "https://github.com/snymrova/snypd/blob/main/docs/11-hardening-and-themes.md#8-decisions";
const PR = "https://github.com/snymrova/snypd/pull/";

export default function Log({ ctx, page, adjacent, route, title, description, jsonLd }: LayoutProps): Html {
  const Shell = part(ctx, "shell"), Ledger = part(ctx, "ledger"), Toc = part(ctx, "toc");
  const p = page!;
  const fm = p.frontmatter as { session?: unknown; pr?: unknown; decisions?: unknown };
  const session = typeof fm.session === "string" ? fm.session : undefined;
  const pr = typeof fm.pr === "string" ? fm.pr.replace(/^#/, "") : undefined;
  const decisions = Array.isArray(fm.decisions) ? fm.decisions.filter((d): d is number => typeof d === "number") : [];
  const dates = settingFlag(ctx, "showDates", true);
  const format = settingText(ctx, "dateFormat");
  const cells: { term: string; body: Html }[] = [];
  if (p.date && dates) cells.push({ term: "Date", body: <time datetime={p.date}>{formatDate(p.date, format)}</time> });
  if (pr) cells.push({ term: "Pull request", body: <a href={`${PR}${pr}`} rel="external">#{pr}</a> });
  if (decisions.length) cells.push({ term: decisions.length === 1 ? "Decision" : "Decisions", body: <span class="snypd-log-decisions">{decisions.map((d) => <a href={DECISIONS} rel="external">{String(d)}</a>)}</span> });
  if (p.terms.length) cells.push({ term: "Kind", body: <span>{p.terms.map((t, i) => <>{i ? ", " : ""}<a href={`${t.route}/`} rel="tag">{t.title}</a></>)}</span> });
  const next = adjacent?.newer ?? adjacent?.older;
  return (
    <Shell ctx={ctx} title={title} description={description} markdownUrl={p.markdownUrl} route={route} jsonLd={jsonLd} page={p}>
      <main>
        <article class="snypd-post snypd-log">
          {p.cover ?? (
            <header class="snypd-cover">
              <p class="snypd-eyebrow">{session ?? "Session log"}</p>
              <h1 style={`view-transition-name: ${transitionName(p)}; view-transition-class: snypd-title`}>{p.title}</h1>
              {p.description ? <p class="snypd-subtitle">{p.description}</p> : null}
            </header>
          )}
          {cells.length ? (
            <dl class="snypd-facts" data-count={String(cells.length)}>
              {cells.map((c) => <div><dt>{c.term}</dt><dd>{c.body}</dd></div>)}
            </dl>
          ) : null}
          <Toc ctx={ctx} route={route} title={title} page={p} />
          <Slot name="before-content" ctx={ctx} route={route} title={title} page={p} />
          {p.body}
          <Slot name="after-content" ctx={ctx} route={route} title={title} page={p} />
          <footer class="snypd-post-footer">
            <p class="snypd-twin"><a href={p.markdownUrl} type="text/markdown">Markdown twin</a></p>
          </footer>
          {next ? (
            <nav class="snypd-around" aria-labelledby="snypd-next">
              <h2 id="snypd-next">{adjacent?.newer ? "The session after" : "The session before"}</h2>
              <Ledger ctx={ctx} entries={[next]} />
            </nav>
          ) : null}
        </article>
      </main>
    </Shell>
  );
}
