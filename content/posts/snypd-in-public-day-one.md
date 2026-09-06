---
title: "Snypd in public: what it is, and where the build stands"
date: 2026-09-06
status: published
description: "A CMS whose only interface is MCP. Ten days in: a 22 ms server, 510-token pages, zero JS, and the first post published through it."
author: sunny
category: building-in-public
---

:::tldr
Snypd is a CMS whose only interface is MCP: an agent writes, lints, publishes and deploys a site from the harness you already work in. Ten days and nineteen sessions in, the shipped binary starts in 22 ms, a page costs an agent 510 tokens, and this is the first post published through it.
:::

## What it is

Snypd is an open-source CMS with no dashboard. There is no admin tab, no login, no editor. The whole product is an MCP server, `snypd serve`, that any harness can talk to: Claude Code, Cursor, Codex, a Slack agent. You say what you want written, and the agent writes it, runs the editorial lint, shows you a preview, publishes and pushes.

Content is markdown plus YAML in a git repo you own. There is no content database: SQLite is a disposable index that can be deleted at any time and rebuilt from the files. The site builds to static HTML with zero client JavaScript, and every page ships with a markdown twin, so the next agent that reads your site pays for the words and not for the markup.

:::diagram{direction="tb" caption="One MCP server in front of a git repo; one build behind it that emits both the human page and the agent surface."}
nodes:
  - { id: harness, label: Your harness, kind: pill }
  - { id: mcp, label: snypd serve (MCP) }
  - { id: repo, label: markdown + YAML in git }
  - { id: build, label: snypd build }
  - { id: html, label: "static HTML, 0 JS" }
  - { id: twin, label: ".md twin, llms.txt, feed, JSON API" }
  - { id: host, label: Cloudflare Workers, kind: pill }
edges:
  - { from: harness, to: mcp, label: tools }
  - { from: mcp, to: repo, label: commits }
  - { from: repo, to: build }
  - { from: build, to: html }
  - { from: build, to: twin }
  - { from: html, to: host }
  - { from: twin, to: host }
:::

The part that makes this more than a markdown folder is the vocabulary. A post is prose plus thirteen typed blocks: a chart, a diagram, a flow, a stat, a callout, an FAQ, and so on. Each one is declared, not drawn. The chart below is a YAML list; the build turns it into inline SVG. A `stat` or a `chart` without a `source` fails lint, so the numbers a post stands on are numbers a reader can check.

## Where the build stands

The first commit was on 27 August 2026. Since then the repo has taken nineteen working sessions, eighty recorded design decisions, and a benchmark suite that fails the build when a budget is breached. These are the numbers from the most recent CI run, on a GitHub runner rather than a laptop.

:::stat-row
::stat{value="22.3 ms" label="MCP server cold start, shipped binary" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md"}
::stat{value="510" label="tokens an agent pays to read one page" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md"}
::stat{value="0 KB" label="client JavaScript on a content page" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md"}
::stat{value="0" label="accessibility violations, 12 route and viewport pairs" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md"}
:::

The build is the part I expected to be slow and is not. A cold build with no cache, no index and no output directory scales in a straight line with the number of posts, at about three milliseconds a page.

:::chart{type="bar" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md" caption="Cold build time by corpus size, no cache and no index. Budgets are 2 s, 20 s and 200 s; every run lands well under 20 % of its budget." unit="ms"}
- { label: "100 posts", value: 305.6 }
- { label: "1,000 posts", value: 2722.4 }
- { label: "10,000 posts", value: 27481.6 }
:::

An incremental build after editing one post is under 10 ms, because only the page that changed is rendered and the other 121 routes come from the cache.

:::callout{kind="note" title="What the numbers do not say"}
Every clock here comes from CI, not from the machine the code was written on, which spent most of the last ten days under a load average above ten. The page load metrics are measured on an unthrottled localhost, so they describe the shape of the page and not what a phone on a slow network will see.
:::

## How this post got here

This post was written by an agent, through the MCP server, against the working tree of the repo. No person edited the markdown. That is the design: five sessions ago the default gate moved from the code to the config, so an agent can write, publish and push on its own, and a site owner puts a person back in the loop with one line of YAML, per content type or per deploy.

:::flow{caption="The path from a prompt to a live URL. Nothing in it needs a browser tab."}
steps:
  - Read the site config and the primitive spec
  - id: write
    do: Write the post with content.create
  - ask: Lint clean?
    yes: Render the preview and read the markdown twin
    no:
      - Fix the rule the lint named
      - { then: write }
  - Publish, which lands this one item on main
  - Push, and the host builds and serves it
:::

## What is next

The delivery plan has three sessions left before a v0.1 release, and this site is where they get reported.

1. Three launch posts written the same way as this one: why MCP is the only interface, the thirteen-block vocabulary, and the benchmarks with their methodology.
2. Draft-branch previews, so a draft has a URL that is not production. On a public repo, pushing draft text is a different act from pushing published text, and that has to be written down before the first one leaves the machine.
3. A markdown engine report, a kill test across three models, and a public bench page on this site generated from the same file the stats above link to.

If the finished thing is not obviously better than a folder of markdown and the harness you already have, the plan says to stop and fix the primitives before going any further. That is the bar.
