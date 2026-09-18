---
title: "The studio look"
date: 2026-09-17
status: published
description: "An agency site's feel at 0 KB: bands, one display face at 33 KB, hairline cards, a blurred masthead, a reel behind the headline — and what the gate refused."
author: sunny
session: "S29 · U8"
decisions: [183, 184, 185, 186, 187]
kind: [shipped, refused]
---

The reference, measured on 17 September: 390 KB of JavaScript, 305 KB of CSS and 22.5 MB of video on one load. What it *feels* like is five things — dark and light bands down the page, one display face at a hundred pixels, cards separated by hairlines, a sticky blurred masthead and a marquee, one clip behind the headline — and every one is CSS or markup the renderer already owns. So `themes/studio/` is tokens, one stylesheet, one webfont, three parts and one layout over `base`: bands per `##` section by one `color-scheme` declaration over the same `light-dark()` tokens; Bricolage Grotesque for display, subsetted to one optical size and one width, 32.74 KB against 33 declared; the system sans for prose. Tier B under `@supports`, never load-bearing: reveals on `translate` only, counters a `::before` counts up to and then uncovers, the marquee, the masthead condensing once stuck.

The renderer gained what the look needed and every theme may use: the body split at its `##` headings for every layout; `cover.media`, `poster`, `autoplay` and the still under reduced motion; `logo-wall` as primitive fourteen with a detector; lint rules 15 and 16; `page.media.kb`.

**Refused by the gate.** The masthead flipping with the band under it — white type in `mix-blend-mode: difference`, the reference's own trick — was here for an hour. axe cannot see a blend and read it as five contrast failures on the post's light page. The effect goes, not the gate; the bar carries the hero's scheme instead, which is what the reference's masthead does between its flips anyway. Also not built: the carousels and the tabs — no container to scroll-snap. The page suite over the front page and a post: JavaScript 0, zero violations across four route and viewport pairs with the showreel, the counters and the marquee on the page, layout shift 0.
