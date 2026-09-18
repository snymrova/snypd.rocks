import { menu, part, settingFlag, Slot, type LayoutProps, type Html } from "@snypd/render";

/**
 * The front page as a transcript (docs/24 §5). The hero is the window: the page's cover — eyebrow,
 * headline as the prompt, subtitle, the clip when the cover has one — and the lead as the output under
 * the prompt, inside one drawn frame (S33: the lead is the four lines and the `tldr`, and a command
 * outside the window read as a caption; the frame is a `div` the layout owns, so the cover stays the
 * primitive's). Every `##` section is a turn: the heading as a prompt
 * line, the body as output. Then every list the build hands it (`LayoutProps.lists`, decision 200) in
 * the order the header menu links them — the log, the changelog, the posts — each as the ledger's rows.
 * The last `##` section, the `cta`, is drawn after the lists so the page ends on the ask.
 *
 * Same markup as the studio's home: `<section class="snypd-band"><h2>`; the sheet is what differs, and
 * `data-caret` on `main` is the one thing the layout adds — the `caret` setting, read here because a
 * setting is not a CSS variable and the sheet needs a hook to turn the two hero motions off.
 */
export default function Home({ ctx, page, lists = [], route, title, description, jsonLd }: LayoutProps): Html {
  const Shell = part(ctx, "shell"), Ledger = part(ctx, "ledger");
  const p = page!;
  const { lead, sections } = p.sections;
  const caret = settingFlag(ctx, "caret", true);
  const order = menu(ctx, "header", route).map((i) => i.href.replace(/\/$/, ""));
  const rank = (r: string) => { const i = order.indexOf(r); return i < 0 ? order.length : i; };
  const bandsOfLists = [...lists].sort((a, b) => rank(a.route) - rank(b.route));
  const closing = sections.length > 1 ? sections[sections.length - 1] : undefined;
  const body = closing ? sections.slice(0, -1) : sections;
  const turn = (s: typeof sections[number]) => (
    <section class="snypd-band snypd-turn" aria-labelledby={s.id}>
      <h2 id={s.id}>{s.title}</h2>
      {s.body}
    </section>
  );
  return (
    <Shell ctx={ctx} title={title} description={description} markdownUrl={p.markdownUrl} route={route} jsonLd={jsonLd} page={p}>
      <main class="snypd-home" data-caret={caret ? "" : undefined}>
        <article class="snypd-page">
          <section class="snypd-band snypd-hero">
            <div class="snypd-window">
              {p.cover ?? <header class="snypd-cover"><h1>{p.title}</h1></header>}
              <Slot name="before-content" ctx={ctx} route={route} title={title} page={p} />
              {lead}
            </div>
          </section>
          {body.map(turn)}
        </article>
        {bandsOfLists.map((l, i) => (
          <section class={`snypd-band snypd-home-list${l.type === "post" ? " snypd-home-entries" : ""}`} data-type={l.type} aria-labelledby={`snypd-list-${l.type}`}>
            {i === 0 ? <Slot name="after-content" ctx={ctx} route={route} title={title} page={p} /> : null}
            <h2 id={`snypd-list-${l.type}`}><a href={`${l.route}/`}>{l.title}</a></h2>
            <Ledger ctx={ctx} entries={l.entries} />
            <p class="snypd-home-more"><a href={`${l.route}/`}>{l.title} archive</a></p>
          </section>
        ))}
        {closing ? <article class="snypd-page snypd-home-close">{turn(closing)}</article> : null}
      </main>
    </Shell>
  );
}
