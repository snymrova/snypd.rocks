---
title: "What the agent did while I watched"
date: 2026-10-06
status: draft
description: "snypd is on Product Hunt today: what it is, the front door that ends on a live URL, what it kept from WordPress and refused, three numbers, and what is next."
author: sunny
category: building-in-public
tags:
  - mcp
---

:::tldr
snypd is a CMS whose only interface is your AI agent. You write, edit, theme and publish a site from Claude Code, Cursor or Codex; the content is markdown and YAML in a git repo you own; the output is static HTML with no JavaScript on the page. There is no dashboard, on purpose. It is on Product Hunt today, and this is the post that says what it is, what it is not, and what happens next.
:::

## What it is

A month ago this was a question: what does a CMS look like when the only way in is the agent you already have open? The answer turned out to be one Bun binary that speaks MCP over stdio. It holds the server, the renderer, the spec, three themes, four plugins and SQLite, and it exposes seven verbs, none of which writes content. The agent writes: markdown plus thirteen typed blocks, on a drafts branch, and a person approves what lands. The build writes semantic HTML, a `.md` twin beside every page for the next agent that reads it, a feed, a sitemap, JSON-LD and `llms.txt`, and every chart, diagram and flow on the page is SVG the build drew from YAML.

:::steps{title="The whole front door" time="2 min"}
1. **Type one line** — `bunx @snypd/cli init my-site && cd my-site && claude`. It makes the directory, writes the site, git-inits it, commits, drops an `.mcp.json` and your host's config, and prints the next thing you type.
2. **Say one sentence** — *"Write me a first post and put it online."*
3. **Click *allow* once** — your host's own login, in a tab it opens. The binary builds, uploads, reads your URL back from the host and sets it, then builds and uploads again now that the origin is real.
:::

Three human actions, empty terminal to live page. The bench walks it and counts them against a budget of five; the row is on [the bench page](/bench/) with the rest.

::figure{src="/media/front-door.mp4" poster="/media/front-door-poster.png" alt="A terminal: one command scaffolds a site, Claude Code opens, a first post is written and built, and the page appears in a browser" caption="A real session, the waits folded — recorded in September, before `init` learned to make the directory and to put the post online. The two lines it types are one line now." width="wide"}

## What it kept from WordPress, and what it refused

Every commenter will make the comparison, so here it is first and precisely. WordPress is a third of the web because it got the durable ideas right: content has shape, extension points have names, a theme can be extended without a fork, and there is one place to find things. snypd keeps each of those and refuses the mechanism that paid for it.

| WordPress | What it got right | snypd |
|---|---|---|
| Custom post types, taxonomies | Content has shape, and the shape is registered | `types:` and `taxonomies:` in YAML, merged with provenance |
| Actions and filters | An extension point at a named place | Slots and filters declared in YAML, ordered by the `plugins:` list |
| Child themes, style variations | Extend without forking; one theme, several looks | `extends:` and `variations:` in `theme.yaml`, one config value to switch |
| The plugin directory | One place to find things | npm is the registry; this site lists, never hosts |
| The dashboard | Live preview beside the control | Declined. The agent is the interface, the Desk is the review, and the page ships no script |

Refused, and named: the database (a git repo), the dashboard (your agent), the registry (npm), hook priorities (the order of a list), and every byte of default JavaScript.

## Three numbers

Every number this project claims comes from a suite that runs in CI on every push and fails the build when a budget is breached. These three are the ones that decide whether an agent can use it at all.

:::stat-row
::stat{value="23 ms" label="MCP cold start, release binary" source="https://snypd.rocks/bench/"}
::stat{value="510 tokens" label="to read one page as markdown" source="https://snypd.rocks/bench/"}
::stat{value="0 KB" label="JavaScript on the page, every theme" source="https://snypd.rocks/bench/"}
:::

The first is the wait before an agent's first turn. The second is what a page costs an agent to read, against the 6,000 or so the same page costs as HTML. The third is enforced by the build: a page that ships a script it did not budget for does not ship. [The bench page](/bench/) has all sixty rows, the thirty-three budgets among them, and how each was taken.

## What it is not

**No dashboard, on purpose.** Every CMS with an editor has two interfaces and the second one drifts. Here the agent is the interface and the Desk that `snypd dev` serves is a review page: what is in flight, what is waiting for a person, what the last build did. It ships no script either.

**No marketplace.** Themes are `snypd-theme-*` and plugins are `snypd-plugin-*` on npm. This site lists what npm knows and hosts none of it, and there are no accounts.

**No sandbox, said plainly.** A plugin is TypeScript in the same process. What is enforced is its manifest, its option schema, the paths it may write, the hosts it may reach and the client bytes it declared, all measured on the built page. What is not enforced is an import. You vet a plugin the way you vet any dependency; what snypd adds is that what it declared and what it did are both inspectable.

**No telemetry.** The binary reports nothing to anyone. That is a decision, not an omission. What gets measured instead is public: downloads, stars, issues from people who are not us, and themes and plugins on npm with the keyword.

## What is next

Two things, in this order. A `migrate-from-wordpress` prompt, because leaving has to be possible for arriving to be, and a WXR export is the one format everyone has. And HTTP transport for the MCP server, so an agent that does not run on your machine can still be the interface. Neither blocks today; both are written down in the repo with the reasons.

::cta{title="One line to a live site" body="`bunx @snypd/cli init my-site && cd my-site && claude`, then *Write me a first post and put it online.* The source, the spec and every benchmark are on [GitHub](https://github.com/snymrova/snypd)." button="Read the README" href="https://github.com/snymrova/snypd"}
