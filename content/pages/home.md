---
title: Publish a website from the harness you already have open.
status: published
description: "snypd is a CMS whose only interface is your AI agent: markdown in your repo, static HTML out, zero JavaScript. This site is built with it, in public."
home: true
---

::cover{eyebrow="Launching 6 October 2026" subtitle="Your CMS is wherever your agent is."}

:::tldr
A CMS your agent can actually use. You write, edit, theme and publish from Claude Code, Cursor or Codex; the content is markdown and YAML in a git repo you own; the output is static HTML with no JavaScript on the page. There is no dashboard, on purpose. This site is the proof: every page on it, this one included, was written through snypd's own MCP server, and the log below is the build as it happened.
:::

## The numbers

:::stat-row
::stat{value="23 ms" label="MCP cold start, release binary" source="https://snypd.rocks/bench/"}
::stat{value="510 tokens" label="to read one page as markdown" source="https://snypd.rocks/bench/"}
::stat{value="0 KB" label="JavaScript on the page" source="https://snypd.rocks/bench/"}
:::

From the suite CI runs on every push: sixty rows, thirty-three of them budgets that fail the build. One binary — the MCP server, the renderer, the spec, four themes in seven looks, the bundled plugins, SQLite. Fourteen typed primitives rendered at build time, so a chart is inline SVG and a stat without a source fails lint. A `.md` twin beside every page, `llms.txt`, a feed, a sitemap, JSON-LD, on every build. [Every number, with its row](/bench/).

## The front door

::figure{src="/media/front-door.mp4" poster="/media/front-door-poster.png" alt="A terminal: one command scaffolds a site, Claude Code opens, a first post is written and built, and the page appears in a browser" caption="`mkdir field-notes && cd field-notes` · `bunx @snypd/cli init` · `claude` · *Write me a first post.* A real session, the waits folded." width="wide"}

Four lines. The scaffold writes the site, git-inits it, commits, and drops an `.mcp.json`; any harness that reads one is the interface. A theme is the one thing that is not content, so it is the one thing a terminal makes — `snypd new theme slate`, then `check theme` until every rule passes. The theme this page is wearing is that sentence with evidence: it lives in this site's own `themes/`, extends the bundled `studio` by one line of YAML, and passes the same eighteen rules. [The shelf](/themes/).

## Refused

The gate is a machine, and it says no. Three from the log:

- **The masthead that flipped with the band under it.** `mix-blend-mode: difference` was the reference's trick and it was here for an hour; axe cannot see a blend and read white type on the light page as five contrast failures. The effect went, not the gate. [S29 · U8](/log/s29-u8-the-studio-look/)
- **The worker pool's numbers.** A pool that split the parse across four cores was written and run on a box at load twenty; the numbers it gave were the load's, and a session that publishes them is doing what the plan exists to stop. The Amdahl bound from CI's split stands instead. [F1](/log/f1-the-phase-split/)
- **A preview mark on every build with drafts in it.** The first design put `noindex` on every page a drafts build wrote; the rule that a page under `snypd dev` is byte-identical to the built one refused it inside the hour. The output marks itself only when the branch decided. [S19d · S20](/log/s19d-s20-drafts-and-the-other-engine/)

[Everything the gate refused](/kind/refused/), as it happened.

## Try it

::cta{title="Four lines to a first post" body="`mkdir field-notes && cd field-notes` · `bunx @snypd/cli init` · `claude` · *Write me a first post.* The source, the spec and every benchmark are on [GitHub](https://github.com/snymrova/snypd)." button="Read the README" href="https://github.com/snymrova/snypd"}
