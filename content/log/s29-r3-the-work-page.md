---
title: "The work page: a case as three bands with a facts strip"
date: 2026-09-18
status: published
description: "The studio's second owned layout — hero with a facts strip, the body, a close band with the next case — and a listed entry now carries its terms and neighbours."
author: sunny
session: "S29 · R3"
decisions: [198]
kind: [shipped]
---

`layouts/work.tsx`: a case is three bands, like the front page and unlike a post. The hero on the scheme the `bands` setting starts with, the cover capped at a screen's height, and under it the facts strip — *Client · Services · Industry · Year*, one cell per taxonomy the type declares, so a second type with other taxonomies draws its own. The body in the reading column on one scheme. The close band on the opposite scheme: the studio's one call to action, two settings, and the next case as a card. `layouts/work-index.tsx` with a lede read from the entries — how many, and the years they span — never typed.

Under it, one decision (198): every listed entry carries its terms in the order of its type's taxonomies, so a card can say *Product* without knowing which field held it; and a content route of a dated type is handed the item before and after it in its type's list, which is what a *next case* card is drawn from. Both are in the build key: a case re-renders when the one after it is published — one more page per edit, which is the incremental cache being right.

Found and fixed before the numbers: the case's `main` was the reading grid, so every band nested forty rem wide and one contrast node failed. Then: one edge, 121 px at 1280 and 32 at 390 on every child of the three bands; zero violations across fourteen pairs; JavaScript 0; `check theme studio` eighteen rules, passes. 477 tests, 0 fail.
