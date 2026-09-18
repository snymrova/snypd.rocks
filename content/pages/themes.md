---
title: Themes
status: published
description: "Every theme snypd ships, photographed: four themes, seven looks, each a name your agent can switch to. All pass the same machine check before they are listed."
---

:::tldr
Four themes and seven looks, every one of them `theme.yaml` plus one stylesheet on top of `base`. A site switches with two lines in `snypd.yaml` or one sentence to its agent, and nothing is listed here that `snypd check theme` does not pass.
:::

## How a theme gets onto this page

A theme is a directory with a `theme.yaml` and a `theme.css`. Every layout and every one of the fourteen primitives it does not declare resolves up `extends:` to `base`, which renders semantic HTML with one class per block and styles nothing — so a theme is a stylesheet with a manifest, and a *variation* is a named set of token values inside that manifest. The pictures below are the bench's own: `snypd bench gallery` builds the same fixture — every primitive, every layout, once — under each look, measures it in headless Chrome at 1280 and 390 px, and photographs it. The rule for a listing is exit code 1: `snypd check theme <name>` has to pass, and every look here does, with zero JavaScript on the page and zero axe violations at both widths ([the record](https://github.com/snymrova/snypd/blob/main/bench/gallery.md)).

To use one, name it:

```yaml
theme:
  use: editorial
  variation: ink
```

Or ask: *"switch this site to editorial, the ink look"* — `theme › set` takes a `name` and a `variation`, and `snypd://themes` is the read an agent makes to choose.

This page, the pictures on it and the site around it were written and published through that same server, by the agent building the product: the dogfood and the distribution channel are the same activity.

## studio

The agency look. Full-bleed bands that alternate dark and light down the front page, one display face set at a hundred pixels, hairline cards, pill buttons, a masthead that blurs what scrolls under it, and a reel behind the headline when the cover has one. Every one of those is CSS or markup the renderer already owns, so the whole of it is tokens, one stylesheet and one subsetted webfont at 33 KB. Two layouts of its own, `work` and its archive, for a type that declares them. Zero JS.

::figure{src="/media/gallery/studio-1280.png" alt="The studio theme on the Ferrule specimen: a dark hero band with a very large sans headline, an orange eyebrow, and a light band of numbered sections below" caption="**studio** — dark and light bands, one display face, hairlines: the theme as written. `use: studio`" width="wide"}

## editorial

Long-form reading. One serif column at a comfortable measure, generous leading, a single accent used sparingly. Figures, charts, diagrams and flows break out of the column; nothing else does. One subsetted variable webfont, declared at 31 KB and measured under it. Zero JS.

::figure{src="/media/gallery/editorial-paper-1280.png" alt="The editorial theme in its paper look: a cream page, a serif headline in near-black, an oxblood category label, a wide cover block, and a TL;DR panel with an oxblood rule" caption="**paper** — warm cream, oxblood accent, serif throughout: the theme as written. `variation: paper`" width="wide"}

::figure{src="/media/gallery/editorial-ink-1280.png" alt="The editorial theme in its ink look: the same page on a cool near-black ground, headline in off-white, a cyan category label" caption="**ink** — dark only: a cool near-black, one cyan, the same measure. `variation: ink`" width="wide"}

::figure{src="/media/gallery/editorial-broadsheet-1280.png" alt="The editorial theme in its broadsheet look: a wider column, a sans-serif headline, tighter leading, a press-blue category label" caption="**broadsheet** — a wider column, sans headlines, tighter leading, a press blue. `variation: broadsheet`" width="wide"}

## technical

Reference. A wide measure for scanning, mono headings and chrome, a contents list built from the heading tree, and tables and code blocks that take the width they need. Figures, charts, diagrams and flows break out as they do everywhere. No webfont, so its font budget is 0 and it meets it. Zero JS.

::figure{src="/media/gallery/technical-graphite-1280.png" alt="The technical theme in its graphite look: a light neutral page with a monospaced headline, a blue category label, a slash-separated masthead and a Contents panel listing the page's headings" caption="**graphite** — cool neutral, one blue, follows the reader's light or dark: the theme as written. `variation: graphite`" width="wide"}

::figure{src="/media/gallery/technical-phosphor-1280.png" alt="The technical theme in its phosphor look: amber monospaced text on a near-black ground, the terminal it is named for" caption="**phosphor** — dark only: amber on near-black, mono throughout. `variation: phosphor`" width="wide"}

## base

Unstyled. Semantic HTML only, one class per primitive (`snypd-<name>`), so a child theme styles it without touching markup. It is what every other theme extends and what a site gets with no `theme:` at all — listed here because it is a real theme that passes the same check, not because anyone should ship it.

::figure{src="/media/gallery/base-1280.png" alt="The base theme: browser-default typography, a black serif headline, a wide cover block, unstyled links — the semantic HTML every other theme styles" caption="**base** — no variations; its one look is its defaults. `use: base`" width="wide"}

## The look this site wears

`folio` is not on the shelf: it lives in this site's own `themes/` directory, over `base`, and the loader finds it there first. A light page with one big sentence; every section a heading on the left and its content on the right, one hairline between sections, a dark band to close. One webfont at one weight, 18 KB against the 40 the lane allows, for what is set; the system faces for what is read. It was chosen on a picture before a line of it was written, and it passes the same check as the four above: `snypd check theme folio --root=.`

::figure{src="/media/gallery/folio-1280.png" alt="The folio theme on this site's front page: a light ground, a very large medium-weight sans headline in three lines reading A CMS with no dashboard, your agent writes it, a dark rounded button under it, and a plain header with an outlined GitHub button" caption="**folio** — site-local, light, one face at one weight. Not bundled; a second site that wants it would make it the fifth." width="wide"}

## Make one

`build-theme` is a prompt the server ships: it scaffolds a theme from `base`, walks the tokens, and ends by looking at the result at a phone width and a desktop one, because a theme is the one thing whose defects every other gate misses. `snypd new theme <name>` is the same scaffold from the command line, and `snypd check theme <name>` is the gate this page applies. Themes are npm packages named `snypd-theme-<name>`; `theme.use` resolves `node_modules/snypd-theme-<name>` the same way it resolves `themes/<name>`. There is no marketplace and no install button — npm is the registry, this page is the shelf.
