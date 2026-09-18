/**
 * The footer as a status line (docs/24 §3): one two-sided line in the small size — the `footerNote`
 * setting on the left, the `statusNote` setting on the right, the way the poster's `auto mode on` and
 * `● high · /effort` sit — then the `footer` menu as a plain listing, then the name set large in mono,
 * the one brand moment kept from the studio. Nothing here is computed at build: both notes are the
 * site's own words, so a number in them is the site's claim and the bench page is where it is proven.
 * The classes `base`'s footer uses — `snypd-social`, `snypd-footer-note` — are kept.
 */
import { inline, menu, settingLinks, settingText, Slot, type Html, type PartProps } from "@snypd/render";

export default function Footer({ ctx, route, title, page }: PartProps): Html {
  const items = menu(ctx, "footer", route);
  const social = settingLinks(ctx, "social");
  // Markdown, rendered here and not stored as HTML: a value in snypd.yaml is content a person wrote.
  const note = settingText(ctx, "footerNote");
  const status = settingText(ctx, "statusNote");
  return (
    <footer class="snypd-console-footer">
      {note || status ? (
        <p class="snypd-status">
          {note ? <span class="snypd-footer-note">{inline(note)}</span> : <span />}
          {status ? <span class="snypd-status-right">{inline(status)}</span> : null}
        </p>
      ) : null}
      {items.length ? (
        <nav aria-label="Footer">
          <ul>{items.map((i) => <li><a href={i.href} rel={i.rel} aria-current={i.current ? "page" : undefined}>{i.label}</a></li>)}</ul>
        </nav>
      ) : null}
      {social.length ? (
        <ul class="snypd-social">{social.map((l) => <li><a href={l.url} rel={l.rel ?? "me"}>{l.label}</a></li>)}</ul>
      ) : null}
      <p class="snypd-wordmark">{ctx.site.name}</p>
      <Slot name="footer-end" ctx={ctx} route={route} title={title} page={page} />
    </footer>
  );
}
