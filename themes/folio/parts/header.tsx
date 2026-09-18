/**
 * The header: `base`'s, with one difference (S35) — the link home carries the site's mark when the `logo`
 * setting names one, and the site's name when it does not. The same setting and the same markup the
 * studio look uses; the image's size comes from the media index so the header never shifts. The menu is
 * the popover `base` draws, and the motion control follows it on the pages that need one.
 */
import { menu, part, settingText, type Html, type PartProps } from "@snypd/render";

export default function Header({ ctx, route, title, page }: PartProps): Html {
  const items = menu(ctx, "header", route);
  const Motion = part(ctx, "motion");
  const logo = settingText(ctx, "logo");
  const size = logo ? ctx.media[logo] : undefined;
  return (
    <header>
      <a href="/" rel="home">
        {logo
          ? <img class="snypd-logo" src={logo} alt={ctx.site.name} decoding="async"
              width={size ? String(size.width) : undefined} height={size ? String(size.height) : undefined} />
          : ctx.site.name}
      </a>
      {items.length ? (
        <nav aria-label="Site">
          <button type="button" class="snypd-menu-button" popovertarget="snypd-menu">Menu</button>
          <ul id="snypd-menu" popover>{items.map((i) => <li><a href={i.href} rel={i.rel} aria-current={i.current ? "page" : undefined}>{i.label}</a></li>)}</ul>
        </nav>
      ) : null}
      <Motion ctx={ctx} route={route} title={title} page={page} />
    </header>
  );
}
