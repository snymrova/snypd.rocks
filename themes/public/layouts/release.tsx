import { formatDate, part, settingFlag, settingText, transitionName, Slot, type LayoutProps, type Html } from "@snypd/render";

/**
 * A release (S31, docs/23 §4): the `release` type the changelog plugin declares, drawn for the first
 * time by a theme that knows it. The version is the headline's mark, set in the display face; a release
 * that says `breaking: true` carries a pill beside it; the body is the reading column; and under it the
 * release before and after, from the neighbours the build hands every dated item (decision 198).
 * `version` and `breaking` are read by name because the plugin declares them (plugins/changelog).
 */
export default function Release({ ctx, page, adjacent, route, title, description, jsonLd }: LayoutProps): Html {
  const Shell = part(ctx, "shell"), Ledger = part(ctx, "ledger");
  const p = page!;
  const fm = p.frontmatter as { version?: unknown; breaking?: unknown };
  const version = typeof fm.version === "string" ? fm.version : undefined;
  const breaking = fm.breaking === true;
  const dates = settingFlag(ctx, "showDates", true);
  const format = settingText(ctx, "dateFormat");
  const around = [adjacent?.newer, adjacent?.older].filter((e): e is NonNullable<typeof e> => !!e);
  return (
    <Shell ctx={ctx} title={title} description={description} markdownUrl={p.markdownUrl} route={route} jsonLd={jsonLd} page={p}>
      <main>
        <article class="snypd-post snypd-release">
          {p.cover ?? (
            <header class="snypd-cover">
              <p class="snypd-release-version">{version ? <span>v{version}</span> : null}{breaking ? <span class="snypd-release-breaking">Breaking</span> : null}</p>
              <h1 style={`view-transition-name: ${transitionName(p)}; view-transition-class: snypd-title`}>{p.title}</h1>
              {p.description ? <p class="snypd-subtitle">{p.description}</p> : null}
            </header>
          )}
          <p class="snypd-byline">
            {p.date && dates ? <time datetime={p.date}>{formatDate(p.date, format)}</time> : null}
            {p.terms.length ? <> · {p.terms.map((t, i) => <>{i ? ", " : ""}<a href={`${t.route}/`} rel="tag">{t.title}</a></>)}</> : null}
          </p>
          <Slot name="before-content" ctx={ctx} route={route} title={title} page={p} />
          {p.body}
          <Slot name="after-content" ctx={ctx} route={route} title={title} page={p} />
          <footer class="snypd-post-footer">
            <p class="snypd-twin"><a href={p.markdownUrl} type="text/markdown">Markdown twin</a></p>
          </footer>
          {around.length ? (
            <nav class="snypd-release-nav" aria-labelledby="snypd-around">
              <h2 id="snypd-around">Other releases</h2>
              <Ledger ctx={ctx} entries={around} />
            </nav>
          ) : null}
        </article>
      </main>
    </Shell>
  );
}
