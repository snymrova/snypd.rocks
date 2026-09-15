---
title: Benchmarks
status: draft
description: "Every number snypd claims, from the suite CI runs on every push: 60 rows, 33 of them budgets that fail the build. Taken 2026-09-15 on v0.1.4."
---

:::tldr
60 rows, 33 of them gated: a gated row over its budget fails the build. Today none is. Version 0.1.4 on Bun 1.4.0, taken 2026-09-15, tokens counted with o200k_base.
:::

:::stat-row
::stat{value="23 ms" label="MCP cold start, release binary" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md"}
::stat{value="510 tokens" label="to read one page as markdown" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md"}
::stat{value="0 KB" label="JavaScript on the page" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md"}
:::

## How to read this page

Every row is a value, a budget and a note saying how the value was taken. A **budget** is a design statement — the number the product promises, written in `snypd.yaml` under `bench.budgets` so a site can tighten it. CI passes a timed row at 80 % of its budget, because a runner is noisy and a promise met on a bad afternoon is the promise; a *counted* row — tokens, kilobytes, actions — passes at the budget exactly. **report** rows have no budget: they are published so the next decision has a number, and a budget is set from them once there is one worth setting. The numbers are CI's, not a laptop's; [the record](https://github.com/snymrova/snypd/blob/main/bench/latest.md) this page is generated from is committed on every run that changes it.

## Build

A cold build from nothing — no `dist/`, no index — at three sizes, and the incremental build a single edit costs. `parse` rows are the share of each build spent turning markdown into the typed tree.

| Metric | Value | Budget |
|---|---|---|
| `build.cold.100` | 292.5 ms | 2000 ms ✅ |
| `build.cold.100.parse` | 222.3 ms | report-only |
| `build.cold.100.parse.bun` | 2.3 ms | report-only |
| `build.cold.1000` | 2748 ms | 20000 ms ✅ |
| `build.cold.1000.parse` | 2161.2 ms | report-only |
| `build.cold.1000.parse.bun` | 22.8 ms | report-only |
| `build.cold.10000` | 27720.5 ms | 200000 ms ✅ |
| `build.cold.10000.parse` | 21751.3 ms | report-only |
| `build.cold.10000.parse.bun` | 232.8 ms | report-only |
| `build.incremental.100` | 13.1 ms | 300 ms ✅ |
| `build.noop.100` | 9.3 ms | report-only |

How each was taken:

- `build.cold.100` — 113 routes, no dist, no index · 2.36 ms an item over 124 · config 3 · theme 0 · sync 6 · plan 4 · render 279 = stat 0 + parse 222 + html 30 + write 15 + weigh 9 + index 1 ms
- `build.cold.100.parse` — report-only (F1): micromark + the typed tree, 76 % of the build — with html at 10 %, the CPU a worker pool could split; write 5 %, index 0 % and weigh 3 % it could not
- `build.cold.100.parse.bun` — report-only (S20): `Bun.markdown.html` over the same 100 sources (0.27 MB) — 98× under the parse row, 119 MB/s. A renderer, not a parser: no tree, no positions, no directives, Bun-only — the ceiling, not a candidate (decision 168)
- `build.cold.1000` — 1013 routes, no dist, no index · 2.68 ms an item over 1024 · config 3 · theme 0 · sync 38 · plan 26 · render 2680 = stat 0 + parse 2161 + html 244 + write 184 + weigh 76 + index 9 ms
- `build.cold.1000.parse` — report-only (F1): micromark + the typed tree, 79 % of the build — with html at 9 %, the CPU a worker pool could split; write 7 %, index 0 % and weigh 3 % it could not
- `build.cold.1000.parse.bun` — report-only (S20): `Bun.markdown.html` over the same 1000 sources (2.73 MB) — 95× under the parse row, 120 MB/s. A renderer, not a parser: no tree, no positions, no directives, Bun-only — the ceiling, not a candidate (decision 168)
- `build.cold.10000` — 10013 routes, no dist, no index · 2.77 ms an item over 10024 · config 6 · theme 1 · sync 393 · plan 286 · render 27035 = stat 1 + parse 21751 + html 2674 + write 1793 + weigh 673 + index 92 ms
- `build.cold.10000.parse` — report-only (F1): micromark + the typed tree, 78 % of the build — with html at 10 %, the CPU a worker pool could split; write 6 %, index 0 % and weigh 2 % it could not
- `build.cold.10000.parse.bun` — report-only (S20): `Bun.markdown.html` over the same 10000 sources (27.26 MB) — 93× under the parse row, 117 MB/s. A renderer, not a parser: no tree, no positions, no directives, Bun-only — the ceiling, not a candidate (decision 168)
- `build.incremental.100` — one body edit → 1 rendered, 123 cached
- `build.noop.100` — touch only (mtime): stat + one hash, nothing rendered; report-only

## Lint

Editorial lint over the same corpora, warm and cold.

| Metric | Value | Budget |
|---|---|---|
| `lint.100` | 9.7 ms | 100 ms ✅ |
| `lint.100.cold` | 205.2 ms | report-only |
| `lint.1000` | 67 ms | 1000 ms ✅ |
| `lint.1000.cold` | 2057.1 ms | report-only |

How each was taken:

- `lint.100` — 0 errors · 0 warnings; mdast cache warm
- `lint.100.cold` — parse (micromark) + lint from an empty cache; report-only
- `lint.1000` — 0 errors · 0 warnings; mdast cache warm
- `lint.1000.cold` — parse (micromark) + lint from an empty cache; report-only

## The MCP server

Spawn to `initialize` on the release binary — the number that decides whether an agent's first turn waits.

| Metric | Value | Budget |
|---|---|---|
| `mcp.coldStart.binary` | 23 ms | 50 ms ✅ |
| `mcp.coldStart` | 21.4 ms | report-only |

How each was taken:

- `mcp.coldStart.binary` — the artefact a release ships (`bun build --compile --splitting`), spawn → `initialize`; D2's lane since S18c · median of 21 interleaved rounds
- `mcp.coldStart` — report-only since S18c: `bun packages/mcp/src/server.ts`, the dev loop, not the thing anyone installs — interleaved with the binary lane, so the delta between the two rows is real even when the box is loaded

## Install

What `bunx @snypd/cli init` pulls, and how much of it is snypd rather than the runtime it ships in.

| Metric | Value | Budget |
|---|---|---|
| `install.download.mb` | 36.31 MB | report-only |
| `install.binary.mb` | 83.97 MB | report-only |
| `install.code.mb` | 5.26 MB | 8 MB ✅ |

How each was taken:

- `install.download.mb` — report-only, and deliberately: the tarball `bunx @snypd/cli init` pulls, and that the host pulls again on every deploy — ~94 % of it is Bun's runtime, which no commit here moves
- `install.binary.mb` — report-only: the artefact unpacked — the half of install time that is disk rather than network
- `install.code.mb` — the release binary (83.97 MB) minus a one-line program through the same `compile()` (78.71 MB): Bun cancels and what is left is snypd — the only half of the download this repo can move

## Serving

Time to first byte for a static `dist/`, for the preview server, and for the Desk it serves at `/_snypd`.

| Metric | Value | Budget |
|---|---|---|
| `serve.ttfb` | 0.11 ms | report-only |
| `preview.ttfb` | 0.09 ms | 50 ms ✅ |
| `desk.ttfb` | 2.12 ms | report-only |

How each was taken:

- `serve.ttfb` — static dist/ over Bun.serve — the floor the preview server is measured against
- `preview.ttfb` — the preview server (`snypd dev`), unchanged tree, drafts included; review page served
- `desk.ttfb` — report-only (S19a): `/_snypd` on the same server and the same unchanged tree. The Desk inherits D2's 50 ms rather than owning it, and this is the first session that can say whether it is inside it

## Tokens

What a page costs an agent to read, and what a site costs one to learn — counted with the tokenizer named above.

| Metric | Value | Budget |
|---|---|---|
| `tokens.page.md` | 510 tokens | 2500 tokens ✅ |
| `tokens.page.html` | 1610 tokens | report-only |
| `tokens.page.reduction` | 68.3 % | report-only |
| `tokens.learn` | 4605 tokens | 6000 tokens ✅ |
| `tokens.page.html.editorial` | 1663 tokens | report-only |
| `tokens.page.reduction.editorial` | 69.3 % | report-only |
| `tokens.learn.editorial` | 4779 tokens | 6000 tokens ✅ |
| `tokens.tools` | 2230 tokens | 3000 tokens ✅ |
| `tokens.tools.full` | 4256 tokens | report-only |

How each was taken:

- `tokens.page.reduction` — vs this theme's own HTML — how thin this theme already is, not what an agent saves; low is good (docs/07 decision 15)
- `tokens.learn` — 17 resources
- `tokens.page.html.editorial` — editorial theme
- `tokens.page.reduction.editorial` — vs this theme's own HTML (editorial) — how thin this theme already is, not what an agent saves; low is good (docs/07 decision 15)
- `tokens.learn.editorial` — 17 resources · editorial theme
- `tokens.tools` — 11 always listed (content.* + find_tools); paid every turn, on top of tokens.learn, which docs/05 scopes to config + spec + theme
- `tokens.tools.full` — the same 15 tools with the catalogue listed rather than found — what deferring it saves a turn (docs/07 decision 38); report-only

## The agent surface

The eight things a page has to offer a machine reader, and whether every one of them is there.

| Metric | Value | Budget |
|---|---|---|
| `surface.completeness` | 100 % | ≥ 100 % ✅ |

How each was taken:

- `surface.completeness` — 8/8: ✓ llms.txt, ✓ .md twin, ✓ Accept: text/markdown, ✓ link rel=alternate, ✓ JSON API, ✓ feed.xml, ✓ sitemap.xml, ✓ JSON-LD; public MCP joins in S19

## Visual primitives

Chart, diagram and flow at their worst shapes: render time and SVG weight, zero JS, zero CSS.

| Metric | Value | Budget |
|---|---|---|
| `viz.chart.renderMs` | 0.1 ms | 3 ms ✅ |
| `viz.chart.svgKb` | 7.6 KB | 12 KB ✅ |
| `viz.diagram.renderMs` | 0.88 ms | 15 ms ✅ |
| `viz.diagram.svgKb` | 13.2 KB | 25 KB ✅ |
| `viz.flow.renderMs` | 0.66 ms | 15 ms ✅ |
| `viz.flow.svgKb` | 14.5 KB | 25 KB ✅ |

How each was taken:

- `viz.chart.renderMs` — worst type (bar) on the worst shape — bar 0.10 ms / 6.6 KB · line 0.06 ms / 4.3 KB · area 0.06 ms / 4.6 KB · donut 0.10 ms / 6.9 KB · lollipop 0.08 ms / 7.6 KB
- `viz.chart.svgKb` — worst type (lollipop); zero JS, zero CSS
- `viz.diagram.renderMs` — worst shape (feedback) at the 40-node cap, layout cache defeated — chain 0.52 ms / 10.5 KB · wide 0.64 ms / 12.0 KB · feedback 0.88 ms / 13.2 KB
- `viz.diagram.svgKb` — worst shape (feedback); zero JS, zero CSS
- `viz.flow.renderMs` — worst shape (retry loop) at the 40-node cap, layout cache defeated — ladder 40 steps 0.33 ms / 13.7 KB · retry loop 38 steps 0.66 ms / 13.2 KB · nested 40 steps 0.36 ms / 14.5 KB
- `viz.flow.svgKb` — worst shape (nested); zero JS, zero CSS

## Suggestions

`content.suggest_blocks` over a hand-labelled corpus: how often it finds the chart inside the table, and how often it invents one.

| Metric | Value | Budget |
|---|---|---|
| `suggest.precision` | 1 | ≥ 0.8 ✅ |
| `suggest.recall` | 1 | report-only |
| `suggest.ms` | 3.37 ms | report-only |

How each was taken:

- `suggest.precision` — 17/17 suggestions matched a label over 20 posts, 7 of which are labelled with no upgrade
- `suggest.recall` — 17/17 labelled upgrades found; report-only — a miss costs the author nothing, a false positive rewrites their post
- `suggest.ms` — per post: parse + shapes + score + verify (the verify pass lints each candidate against the document it would land in)

## The page in a browser

Six routes at 1280 and 390 px in headless Chrome: JavaScript on the wire, the webfont, axe violations, bytes and vitals.

| Metric | Value | Budget |
|---|---|---|
| `page.js.kb` | 0 KB | 0 KB ✅ |
| `page.font.kb` | 30.43 KB | 31 KB ✅ |
| `page.a11y.violations` | 0 violations | 0 violations ✅ |
| `page.bytes.kb` | 67.44 KB | report-only |
| `page.lcp` | 68 ms | report-only |
| `page.cls` | 0 | 0.05 ✅ |

How each was taken:

- `page.js.kb` — editorial: 6 routes × 1280/390 px — /posts/every-primitive-once/, /about/, /authors/sunny/, /, /category/engineering/, /tag/markdown/; worst /posts/every-primitive-once/ @ 1280 (0 B loaded + 0 B inline/handlers). JSON-LD excluded: it is data
- `page.font.kb` — worst /posts/every-primitive-once/ @ 1280; budget 31 KB is the theme's own font.kb — what it declared, not what the file happens to weigh
- `page.a11y.violations` — axe-core, 0 across 12 route/viewport pairs
- `page.bytes.kb` — worst /posts/every-primitive-once/ @ 1280: 16.26 KB html + 17.56 KB css + 3.19 KB img + 30.43 KB font, 4 requests — uncompressed, which no host serves; report-only
- `page.lcp` — worst /posts/every-primitive-once/ @ 1280; localhost, unthrottled — the shape of the page, not a field number; report-only
- `page.cls` — worst /posts/every-primitive-once/ @ 1280; caused by the theme, not the network — the one vital localhost measures honestly

## The Desk in a browser

The same suite over `/_snypd`, with a draft in flight, and the first run of a scaffolded site.

| Metric | Value | Budget |
|---|---|---|
| `desk.js.kb` | 0 KB | 0 KB ✅ |
| `desk.font.kb` | 30.46 KB | 31 KB ✅ |
| `desk.a11y.violations` | 0 violations | 0 violations ✅ |
| `desk.bytes.kb` | 56.27 KB | report-only |
| `desk.lcp` | 76 ms | report-only |
| `desk.cls` | 0 | 0.05 ✅ |
| `desk.first.js.kb` | 0 KB | 0 KB ✅ |
| `desk.first.font.kb` | 30.46 KB | 31 KB ✅ |
| `desk.first.a11y.violations` | 0 violations | 0 violations ✅ |
| `desk.first.bytes.kb` | 58.73 KB | report-only |
| `desk.first.lcp` | 76 ms | report-only |
| `desk.first.cls` | 0 | 0.05 ✅ |

How each was taken:

- `desk.js.kb` — desk: 2 routes × 1280/390 px — /_snypd, /_snypd/review/post/a-draft-in-flight; worst /_snypd @ 1280 (0 B loaded + 0 B inline/handlers). JSON-LD excluded: it is data
- `desk.font.kb` — worst /_snypd @ 1280; budget 31 KB is the theme's own font.kb — what it declared, not what the file happens to weigh
- `desk.a11y.violations` — axe-core, 0 across 4 route/viewport pairs
- `desk.bytes.kb` — worst /_snypd @ 1280: 8.23 KB html + 17.59 KB css + 0 KB img + 30.46 KB font, 3 requests — uncompressed, which no host serves; report-only
- `desk.lcp` — worst /_snypd/review/post/a-draft-in-flight @ 1280; localhost, unthrottled — the shape of the page, not a field number; report-only
- `desk.cls` — worst /_snypd @ 1280; caused by the theme, not the network — the one vital localhost measures honestly
- `desk.first.js.kb` — first run: 2 routes × 1280/390 px — /_snypd, /; worst /_snypd @ 1280 (0 B loaded + 0 B inline/handlers). JSON-LD excluded: it is data
- `desk.first.font.kb` — worst /_snypd @ 1280; budget 31 KB is the theme's own font.kb — what it declared, not what the file happens to weigh
- `desk.first.a11y.violations` — axe-core, 0 across 4 route/viewport pairs
- `desk.first.bytes.kb` — worst /_snypd @ 1280: 10.69 KB html + 17.59 KB css + 0 KB img + 30.46 KB font, 3 requests — uncompressed, which no host serves; report-only
- `desk.first.lcp` — worst / @ 1280; localhost, unthrottled — the shape of the page, not a field number; report-only
- `desk.first.cls` — worst /_snypd @ 1280; caused by the theme, not the network — the one vital localhost measures honestly

:::callout{kind="note" title="Where this page comes from"}
`snypd bench report` rewrites [`bench/latest.md`](https://github.com/snymrova/snypd/blob/main/bench/latest.md) as this page. Nothing here is typed by hand; a number that is not in the record is not on the page.
:::
