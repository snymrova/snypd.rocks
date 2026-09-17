---
title: "Six looks, one contract"
date: 2026-09-17
status: published
description: "Three themes, six looks, one contract: a theme is a manifest and a stylesheet on top of base, a look is a word, and seventeen rules decide what the shelf lists."
author: sunny
category: building-in-public
tags:
  - mcp
---

:::tldr
Every theme snypd ships is a `theme.yaml` and one stylesheet on top of `base`, which renders the markup and styles nothing. A theme declares tokens, parts, menus, settings and named looks; a site picks a look with one word; and `snypd check theme` runs seventeen rules before anything is listed on the shelf. Three themes and six looks pass today, with zero JavaScript and zero accessibility violations at both widths, and the ones that move do it in CSS.
:::

## The contract, not the theme

The first theme on this site was written by hand and the second was going to be a fork of it. That is how every theme ecosystem starts and how every one of them ends up with a thousand copies of the same header. So the second theme was refused until the first could be described as a contract that a second could be built *from*, and the sessions since have been that description, one key at a time.

`base` is the whole of it. It renders every layout and all thirteen primitives as semantic HTML with one class per block, `snypd-figure`, `snypd-stat-row`, and styles none of it. A theme is a directory with a manifest and a stylesheet, and anything it does not declare resolves up `extends:` to `base`. The manifest is strict: an unknown key fails with a file and a line, and the merged result an agent reads says which file wrote which value.

:::stat-row
::stat{value="3" label="themes, six looks between them" source="https://github.com/snymrova/snypd/blob/main/bench/gallery.md"}
::stat{value="17" label="rules a theme passes before it is listed" source="https://github.com/snymrova/snypd/blob/main/packages/render/src/check.ts"}
::stat{value="0 KB" label="JavaScript on every route of every look" source="https://github.com/snymrova/snypd/blob/main/bench/gallery.md"}
:::

:::diagram{direction="tb" caption="Three themes, six looks. Everything resolves up to base; a look is a named set of token values inside its theme's manifest."}
nodes:
  - { id: base, label: base }
  - { id: ed, label: editorial }
  - { id: tech, label: technical }
  - { id: paper, label: paper }
  - { id: ink, label: ink }
  - { id: broad, label: broadsheet }
  - { id: graphite, label: graphite }
  - { id: phosphor, label: phosphor }
edges:
  - { from: base, to: ed }
  - { from: base, to: tech }
  - { from: ed, to: paper }
  - { from: ed, to: ink }
  - { from: ed, to: broad }
  - { from: tech, to: graphite }
  - { from: tech, to: phosphor }
:::

## What a theme may say

The keys arrived in the order the dogfood asked for them, and each one is a thing the first theme had been doing by hand.

:::steps{title="The manifest, key by key"}
1. **`parts:`** — the shell is not one file. `header`, `footer`, `shell` and `entries` are parts, resolved by the same nearest-declarer walk primitives use, so `editorial` changes the masthead with one file and inherits the other four.
2. **`locations:`** — a menu is a file. The theme names where menus go (`header`, `footer`); the site writes `content/nav/header.yaml`; a slug change re-resolves every link in it.
3. **`settings:`** — what a site may choose. Typed, with defaults and labels, checked before render, so a wrong answer fails with the line in *your* config. The tagline under this site's title is one.
4. **`variations:`** — one theme, several complete looks, each a named set of token values. `ink` is eleven tokens; `broadsheet` is seven. A site writes `variation: ink` and nothing else moves.
5. **`font:`** — one webfont, self-hosted and subsetted, with a declared size the build measures against and a metric-matched fallback so the page does not jump when it arrives.
:::

A look is cheap because colour is derived where it really is derived. `oklch(from var(--color-bg) calc(l + 0.045) c h)` says *the background, lifted*, and stays that when the background moves, where a second hex value is a number to keep in sync by hand. `ink` is eleven tokens and not thirty because the palette is `light-dark()` pairs and one token, `color.scheme: dark`, resolves every pair to its dark side.

```yaml
# snypd.yaml — the whole of switching
theme:
  use: editorial
  variation: ink
```

Or say it. *"Switch this site to editorial, the ink look"* is `theme › set` with a `name` and a `variation`, and `snypd://themes` is what an agent reads to choose.

::figure{src="/media/six-looks.mp4" poster="/media/six-looks-poster.png" alt="The agent switches the site to technical › phosphor, rebuilds, and lists the other looks on the shelf; then the same post in all six looks" caption="*Switch this site to technical › phosphor and rebuild, then tell me what else is on the shelf.* A real session." width="wide"}

## The second theme, built from the contract alone

`technical` is the proof. It was written with no reference to `editorial`'s files: a wide measure for scanning, mono headings, a contents list built from the heading tree, tables and code that take the width they need, and no webfont at all. Its font budget is therefore zero, and it meets it, which is what makes the budget mean something. It declares its own `header` and `toc` parts and inherits the rest, and the coverage report an agent reads says exactly that: `header: own`, `footer: inherited via base`.

::figure{src="/media/technical-phosphor-dark.png" alt="The technical theme in its phosphor look: amber monospaced text on a near-black ground, a slash-separated masthead, a contents panel" caption="**technical › phosphor.** The same post as every other picture on this page, in the theme that never saw the first one's stylesheet." width="wide"}

::figure{src="/media/editorial-paper-light.png" alt="The editorial theme in its paper look: a cream page, a serif headline, an oxblood category label, a TL;DR panel" caption="**editorial › paper.** The theme as written, and the look this site reads in." width="wide"}

## Seventeen rules

A theme gets onto [the shelf](/themes/) by exit code. `snypd check theme <name>` runs seventeen named rules and prints what each one saw, and the shelf lists nothing that fails one.

| Rule | What it refuses |
|---|---|
| `contract.yaml`, `contract.loads` | A manifest with a key this build does not read; a layout, part, stylesheet or font that does not resolve |
| `coverage.primitives`, `coverage.parts` | A primitive or part the chain cannot render, thirteen and five, own or inherited |
| `meta.name`, `meta.version`, `meta.personality` | A theme with nothing for a listing to print or an agent to choose on |
| `tokens.described` | A settable token with no description: forty declared in `editorial`, forty described |
| `variations.declared` | A look that sets a token its theme never declared |
| `font.budget`, `font.used`, `font.fallback` | A face over its own declaration or the 40 KB ceiling; a face nothing renders in; a fallback that is not metric-matched |
| `css.enhancement-guarded` | A two-engine or one-engine CSS feature outside `@supports`, so that a theme cannot be load-bearing on one browser |
| `contrast.text`, `contrast.muted`, `contrast.accent`, `contrast.on-accent` | A colour pair under the WCAG ratio, on every look the theme ships, in both schemes |

The contrast rules are the ones a designer's eye misses. They read the OKLCH the theme actually wrote, resolve every `light-dark()` pair both ways and every relative colour against its base, and check every look: `paper` light text on its background is 17.28 to 1, `ink` 14.64 to 1, and the muted text nobody looks at is held to 4.5 to 1 like everything else.

::figure{src="/media/check-theme.png" alt="A terminal: snypd check theme editorial, seventeen rules, every one passing, with what each rule measured" caption="The judge. The same command a stranger's theme is held to." width="wide"}

## The runtime is CSS

Every site a reader compares this one to ships a script for the same eight things: page transitions, footnote previews, accordions, lightboxes, a scroll-spied contents list, a menu that opens on a phone. In 2026 the platform does all of them declaratively, and since the renderer owns the markup, a change to one file in `base` reaches every theme. So `base` gained a layer of its own, and the page suite's three numbers decided what stayed in it.

What shipped: the title morphs across a navigation with `@view-transition`; a footnote is a sidenote in the margin at desktop widths and a hover card on a phone; a `figure` opens full-size in a native `<dialog>`; a `faq` is an exclusive accordion of `<details>`; the masthead menu is a `popover`; the contents list knows where you are. None of it is a script. Under `prefers-reduced-motion` the transitions are `none`.

:::callout{kind="note" title="Two rules did not survive the gates"}
`content-visibility: auto` on the post list moved layout shift from 0 to 0.0042, under budget and not zero, and zero is the claim. A scroll-driven reveal that faded pullquotes in put seven contrast failures on the fixture, because text at a fraction of its opacity *is* low-contrast text and the accessibility check was right. Both are out. The gates are not there to be argued with.
:::

The rule that came out of it is now the seventeenth: anything that is not Baseline goes under `@supports`, and a page has to read as designed without it, because a theme is not allowed to work in one browser.

:::pullquote
Not zero JavaScript and therefore a plain site. Zero JavaScript and a site that behaves like the ones that ship a bundle to do the same.
:::

## The Desk shows the shelf

A theme is the one thing whose defects every other gate misses, so the Desk that `snypd dev` serves for a person now shows every look this checkout can resolve as a specimen drawn from that look's own tokens: the site's name in its heading face, a line of body, five swatches, its own colour scheme so `ink` paints dark on a light page. The active look is marked. Every other one carries the exact `theme › set` call to switch to it, which makes the shelf the switcher, and the switcher lives in the harness.

::figure{src="/media/desk-dark.png" alt="The Desk at /_snypd in a dark scheme: a shelf of six theme specimens, a say-card with the sentences an agent understands, and the last build's numbers" caption="The Desk, with the shelf and the say-card. Zero JavaScript here too." width="wide"}

:::faq
### Can I write one?
Yes, from a terminal or from a harness. `snypd new theme <name>` scaffolds a manifest and a stylesheet on top of `base`; the `build-theme` prompt walks an agent through the same steps and ends by looking at the result at a phone width and a desktop one. `snypd check theme` is the judge either way. Themes are npm packages named `snypd-theme-<name>`, and there is no marketplace: npm is the registry, [the shelf](/themes/) is the listing.

### What does a look cost an agent?
Thirty-seven tokens. The line that lists a theme's variations in the resource an agent reads went from 4708 to 4745 tokens for three looks, against a budget of 4800, and the tool list an agent pays for on every turn did not move a byte, because `theme › set` is found by search and never listed.

### Why not a light/dark toggle for readers?
Every look follows the reader's system preference through `light-dark()`, and the two dark-only looks commit to dark with `color.scheme`. A toggle is a script and a stored preference; whether the site should have one at all is an open question, and it is written down as one.

### Does it work in Firefox and Safari?
The page reads as designed in all three engines. The enhancements that are two-engine or one-engine features are guarded, so where a browser lacks one the fallback is the page as it was: stacked instead of animated, a link instead of a lightbox. The gate checks that every such line is guarded, and screenshots in Firefox and Chrome at both widths are part of the exit.
:::

::cta{title="See the shelf" body="Three themes, six looks, every one photographed by the bench and measured before it was listed." button="Open the shelf" href="/themes/"}
