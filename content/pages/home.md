---
title: A CMS with no dashboard. Your agent writes it.
status: published
description: "snypd is a CMS with no dashboard. Claude Code, Cursor or Codex writes; markdown lives in your repo; static HTML comes out, zero JavaScript. Built in public."
home: true
---

::cover{title="A CMS with no dashboard. Your agent writes it."}

You know how every CMS assumes a person at a screen, filling in fields? The person at the screen now has Claude Code, Cursor or Codex open, and it can write.

snypd is the CMS for that. Markdown in a repo you own; your agent writes it through one MCP server; static HTML comes out, and no JavaScript with it. Launching 6 October 2026.

```
$ mkdir field-notes && cd field-notes
$ bunx @snypd/cli init
$ claude
❯ Write me a first post.
```

::figure{src="/media/front-door.mp4" poster="/media/front-door-poster.png" alt="A terminal: one command scaffolds a site, Claude Code opens, a first post is written and built, and the page appears in a browser" caption="The four lines, run. A real session, the waits folded."}

## Measured in CI, or not claimed.

:::stat-row
::stat{value="23 ms" label="MCP cold start, release binary" source="https://snypd.rocks/bench/"}
::stat{value="510" label="tokens to read one page as markdown" source="https://snypd.rocks/bench/"}
::stat{value="0 KB" label="JavaScript on the page, every theme" source="https://snypd.rocks/bench/"}
:::

Sixty rows run on every push. Thirty-three of them are budgets, and a breach fails the build.

[Every number, with its row](/bench/)

## How things will go. Four lines.

:::steps
1. **A directory.** `mkdir field-notes && cd field-notes` — the site is named after it.
2. **The scaffold.** `bunx @snypd/cli init` writes the config, the content folders and an `.mcp.json`, and commits them.
3. **Your agent.** `claude`, or the directory open in Cursor or Codex. Anything that reads an `.mcp.json` is the interface.
4. **One sentence.** *Write me a first post.* It writes on a drafts branch, builds, and shows you the page. You approve what lands.
:::

## The gate says no.

- **A masthead that inverted over each band.** Five contrast failures on the light bands. [S29 · U8](/log/s29-u8-the-studio-look/)
- **A benchmark taken on a busy machine.** The numbers were the load's; CI's stand. [F1](/log/f1-the-phase-split/)
- **A noindex on every preview build.** It broke the byte-identical rule and lasted an hour. [S19d · S20](/log/s19d-s20-drafts-and-the-other-engine/)

[Everything the gate refused](/kind/refused/)

## Four lines. First post.

```
$ mkdir field-notes && cd field-notes
$ bunx @snypd/cli init
$ claude
❯ Write me a first post.
```

::cta{title="Open source, MIT." body="The source, the spec and every benchmark are on GitHub. Every page on this site was written through snypd's own MCP server." button="Install from npm" href="https://www.npmjs.com/package/@snypd/cli"}
