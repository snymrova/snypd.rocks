---
title: "A host that builds the drafts branch gets the drafts; the parser stays, and the other engine is a row"
date: 2026-09-15
status: published
description: "The build knows which branch it is for and marks a preview only when the branch decided; Bun's renderer, 95× faster, is a row and the ceiling, not a candidate."
author: sunny
session: "S19d · S20"
pr: "#31"
decisions: [167, 168]
kind: [decided, refused]
---

**S19d — pushing the drafts is a named act** (decision 167). `builtBranch` reads the branch a build is *for*: the host's environment first, because every host builds on a detached HEAD where git answers nothing — the Workers, Pages, Vercel, GitHub and Netlify variables in that order — then the checkout. A plain `snypd build` of `snypd/drafts` includes the drafts and says so; the build result names who decided. `site › push` with `preview: true` sends the drafts branch and nothing else, is refused under `deploy.push: human` with the command a person would run, and its result *leads* with the line that says the drafts are about to be public, because the agent relays it to the person deciding.

**Refused, inside the hour.** The first design put the preview mark — `noindex` on every page, `Disallow: /` in the robots file — on every build with drafts in it. The rule from S18e refused it: an item page under `snypd dev` is byte-identical to the built one, and a `<meta name="robots">` on it is a byte. So `preview` is a second option beside `drafts`, on by default only when the branch decided; `snypd dev` sets `drafts` alone and its bytes are what they were.

**S20 — the parser stays** (decision 168). `Bun.markdown.html` runs over the same sources the build just parsed, report-only beside the parse row at every size: about 95×, 120 MB/s against 0.4. The row flatters the alternative on purpose — no frontmatter, no directive split — so the ratio is an upper bound, and it is the ceiling, not a candidate: it returns strings and not a tree, so lint's line numbers, the typed blocks, the shape detector and the `.md` twin have nothing to stand on; it has no directive syntax, so a chart is a paragraph; and it is Bun's, on the content path the design keeps runtime-neutral. No other speed change, on purpose: the cold build is at 14 % of budget with the parser at 78 % of it, and nothing under 10 % is worth a risk three weeks from launch.

Tests 445, 0 fail. The numbers: [`bench/latest.md`](https://github.com/snymrova/snypd/blob/main/bench/latest.md), the `build.cold.<n>.parse.bun` rows.
