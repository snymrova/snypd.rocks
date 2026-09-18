---
title: Publish a website from the agent you already have open.
status: published
description: "snypd is a CMS with no dashboard. Claude Code, Cursor or Codex writes; markdown lives in your repo; static HTML comes out, zero JavaScript. Built in public."
home: true
---

::cover{eyebrow="Launching 6 October 2026" subtitle="A CMS with no dashboard. Claude Code, Cursor or Codex writes; markdown in a repo you own; static HTML out, zero JavaScript."}

```
$ mkdir field-notes && cd field-notes
$ bunx @snypd/cli init
$ claude
❯ Write me a first post.
```

:::tldr
This site is the proof: every page on it was written through snypd's own MCP server, and the log is the build as it happened.
:::

## The front door

::figure{src="/media/front-door.mp4" poster="/media/front-door-poster.png" alt="A terminal: one command scaffolds a site, Claude Code opens, a first post is written and built, and the page appears in a browser" caption="The four lines, run. A real session, the waits folded." width="wide"}

The scaffold writes the site, commits it, and drops an `.mcp.json`; any agent that reads one is the interface. Four themes, seven looks, one gate: [the shelf](/themes/).

## The numbers

:::stat-row
::stat{value="23 ms" label="MCP cold start, release binary" source="https://snypd.rocks/bench/"}
::stat{value="510 tokens" label="to read one page as markdown" source="https://snypd.rocks/bench/"}
::stat{value="0 KB" label="JavaScript on the page" source="https://snypd.rocks/bench/"}
:::

Sixty rows in CI on every push, thirty-three of them budgets that fail the build. [Every number, with its row](/bench/).

## Refused

The gate is a machine, and it says no:

- **A masthead that inverted over each band.** Five contrast failures on the light bands. [S29 · U8](/log/s29-u8-the-studio-look/)
- **A benchmark taken on a busy machine.** The numbers were the load's; CI's stand. [F1](/log/f1-the-phase-split/)
- **A noindex on every preview build.** It broke the byte-identical rule and lasted an hour. [S19d · S20](/log/s19d-s20-drafts-and-the-other-engine/)

[Everything the gate refused](/kind/refused/).

## Try it

```
$ mkdir field-notes && cd field-notes
$ bunx @snypd/cli init
$ claude
❯ Write me a first post.
```

::cta{title="Four lines to a first post" body="What each line does, what you need first, and what the agent does on the far side. The source, the spec and every benchmark are on GitHub, MIT." button="Start here" href="/start/"}
