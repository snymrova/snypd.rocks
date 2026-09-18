---
title: "The product look: chosen on a picture, then written as a theme"
date: 2026-09-18
status: published
description: "snypd.rocks wears folio: a light page with one big sentence, a heading beside every section, one webfont at one weight. The look was picked from a mockup before the brief."
author: sunny
session: S34
decisions:
  - 207
  - 208
  - 209
kind:
  - shipped
  - decided
---

The two looks before this one were approved in a brief and disliked on the page, so this one was chosen the other way round. Two standalone mockups of the front page, no renderer and no budgets, were photographed at 1440 and 390; Sunny picked the second, a light page with one big sentence, and the brief was written from the picture ([docs/25](https://github.com/snymrova/snypd/blob/main/docs/25-the-product-look.md)). That order is now a rule (decision 209).

**What it is.** `folio`, the site's own theme in `themes/folio/`, over `base`; `console` is deleted (207). One webfont at one weight, Inter 500 in a Latin subset, 17.3 KB against the 40 the lane allows, for what is set: the headline, the section headings, the numbers, the buttons, a row's title. The system faces for what is read. Every section of the front page is a heading on the left and its content on the right, which is one grid rule over the markup the renderer already emits. The closing band and the footer are one declaration each, `color-scheme: dark` over the same colour pairs.

**What the theme system grew.** A button under the hero's sentence, as two theme settings a `home` layout reads (208). The `cover` primitive did not gain an attribute: a spec change is for every theme's every page, and this is one layout's one place.

**The copy.** Rewritten into the mockup and read there, so it is the copy: *A CMS with no dashboard. Your agent writes it.* The front page and the [Start page](/start/) now say the same four steps in the same words. Home, Start and the themes page were updated through snypd's own MCP server, driven over stdio from the working tree.

**Where the mockup bent.** The four lines sit above the clip, not over it: an overlay hides a real caption. The numbers are 52 px where the mockup had 64, because `23 ms` in Inter is wider than a third of the column and a value never wraps. A refusal's row ends on the link to its session where the mockup printed the word *Refused*; the heading already says it. The share card is drawn from the hero and kept as a file, so the next redraw is an edit.

**Held to.** `check theme folio` passes, the font rules among them this time. The page suite over eight routes at 1280 and 390: JavaScript 0, font 17.4 KB of the 18 declared, axe 0 across sixteen pairs and 0 scrolled, layout shift 0. Lint 0 errors. 483 tests, 0 fail; typecheck clean, the theme's own six files included.

**Left open.** The front-door poster is still a near-black frame, and it now sits in the hero's column. Whether the body wants Inter too is a call for a Windows screen, not this one. The changelog says 0.1.4 shipped and npm's latest is 0.1.3 until the token is renewed. The live site is still the S25 index until this branch lands.
