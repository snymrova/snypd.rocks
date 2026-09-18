import { menu, part, settingText, Slot, type LayoutProps, type Html } from "@snypd/render";

/**
 * The front page as bands, with a band per dated type (S31, docs/23 §2). The studio's home draws the
 * page's cover and lead as the hero, every `##` section as a band, and one entries band for the type
 * the menu puts first (decision 195). This one keeps the hero and the sections and then draws every
 * list the build hands it (`LayoutProps.lists`, decision 200) — the log, the changelog, the posts — in
 * the order the header menu links them, each headed by the menu's word and linked to its archive. The
 * log and the releases are rows (the ledger part); the posts keep the studio's cards. Nothing here is
 * computed from the content: a band is a list the build already made, newest first.
 */
export default function Home({ ctx, page, lists = [], route, title, description, jsonLd }: LayoutProps): Html {
  const Shell = part(ctx, "shell"), Entries = part(ctx, "entries"), Ledger = part(ctx, "ledger");
  const p = page!;
  const bands = settingText(ctx, "bands") ?? "dark-first";
  const tone = (i: number): string | undefined => bands === "off" ? undefined : (i % 2 === 0) === (bands === "dark-first") ? "dark" : "light";
  const { lead, sections } = p.sections;
  // The menu's order, then the declared order for a type the menu does not link.
  const order = menu(ctx, "header", route).map((i) => i.href.replace(/\/$/, ""));
  const rank = (r: string) => { const i = order.indexOf(r); return i < 0 ? order.length : i; };
  const bandsOfLists = [...lists].sort((a, b) => rank(a.route) - rank(b.route));
  return (
    <Shell ctx={ctx} title={title} description={description} markdownUrl={p.markdownUrl} route={route} jsonLd={jsonLd} page={p}>
      <main class="snypd-home">
        <article class="snypd-page">
          <section class="snypd-band snypd-hero" data-tone={tone(0)}>
            {p.cover ?? <h1>{p.title}</h1>}
            <Slot name="before-content" ctx={ctx} route={route} title={title} page={p} />
            {lead}
          </section>
          {sections.map((s, i) => (
            <section class="snypd-band" data-tone={tone(i + 1)} aria-labelledby={s.id}>
              <h2 id={s.id}>{s.title}</h2>
              {s.body}
            </section>
          ))}
        </article>
        {bandsOfLists.map((l, i) => (
          <section class={`snypd-band snypd-home-list${i === bandsOfLists.length - 1 ? " snypd-home-entries" : ""}`} data-type={l.type} data-tone={tone(sections.length + 1 + i)} aria-labelledby={`snypd-list-${l.type}`}>
            {i === 0 ? <Slot name="after-content" ctx={ctx} route={route} title={title} page={p} /> : null}
            <h2 id={`snypd-list-${l.type}`}><a href={`${l.route}/`}>{l.title}</a></h2>
            {l.type === "post" ? <Entries ctx={ctx} entries={l.entries} /> : <Ledger ctx={ctx} entries={l.entries} />}
            <p class="snypd-home-more"><a href={`${l.route}/`}>{l.title} — every entry</a></p>
          </section>
        ))}
      </main>
    </Shell>
  );
}
