---
title: Publish a website from the harness you already have open.
status: published
description: "snypd is a CMS whose only interface is your AI agent: markdown in your repo, static HTML out, zero JavaScript. Four lines to a first post."
home: true
---

::cover{eyebrow="snypd" subtitle="Your CMS is wherever your agent is."}

:::tldr
A CMS your agent can actually use. You write, edit, theme and publish from Claude Code, Cursor or Codex; the content is markdown and YAML in a git repo you own; the output is static HTML with no JavaScript on the page. There is no dashboard, on purpose.
:::

:::steps{title="The whole front door" time="2 min"}
1. **Make a directory** — `mkdir field-notes && cd field-notes`
2. **Scaffold it** — `bunx @snypd/cli init` writes the site, git-inits it, commits, and drops an `.mcp.json`.
3. **Open your harness** — `claude`, or Cursor, or Codex: anything that reads `.mcp.json`.
4. **Say it** — *"Write me a first post."*
:::

::figure{src="/media/front-door.mp4" poster="/media/front-door-poster.png" alt="A terminal: one command scaffolds a site, Claude Code opens, a first post is written and built, and the page appears in a browser" caption="One command, then the harness: a site, a post, a build. A real session, the waits folded." width="wide"}

## What you get

:::stat-row
::stat{value="23 ms" label="MCP cold start, release binary" source="https://snypd.rocks/bench/"}
::stat{value="510 tokens" label="to read one page as markdown" source="https://snypd.rocks/bench/"}
::stat{value="0 KB" label="JavaScript on the page" source="https://snypd.rocks/bench/"}
:::

One binary: the MCP server, the renderer, the spec, the bundled themes and plugins, SQLite. Thirteen typed primitives rendered at build time, so a chart is inline SVG and a stat without a source fails lint. A `.md` twin beside every page, `llms.txt`, a feed, a sitemap, JSON-LD, on every build. Benchmarks that fail CI, so every number on this site links to its row. And a git repo you own: the only no-lock-in claim you can check with `ls`.

::figure{src="/media/one-binary.svg" alt="A harness speaks MCP over stdio to one binary; the binary writes markdown to a git repo and renders it to a static directory" caption="This diagram is snypd's own `diagram` primitive, rendered by the build from twelve lines of YAML. No coordinates were typed." width="wide" lightbox=false}

## Three themes, six looks

The same post in every look the shelf carries. Each is measured before it is listed: JavaScript on the wire, the webfont against its budget, accessibility at 1280 and 390 px. A site switches with two lines of YAML or one sentence to its agent. [See the shelf](/themes/).

::figure{src="/media/six-looks-390.png" alt="Six phone-width screenshots of the same post: editorial in paper, ink and broadsheet; technical in graphite and phosphor; and base, unstyled" caption="The six looks at 390 px. Every one passes `snypd check theme`: seventeen rules, zero JavaScript, zero axe violations." width="full"}

::figure{src="/media/six-looks.mp4" poster="/media/six-looks-poster.png" alt="The agent switches the site to technical › phosphor, rebuilds, and lists the other looks on the shelf; then the same post in all six looks" caption="*Switch this site to technical › phosphor and rebuild, then tell me what else is on the shelf.*" width="wide"}

A theme is the one thing that is not content, so it is the one thing a terminal makes: `snypd new theme slate` writes a manifest and one stylesheet, and `base` brings every layout and all thirteen primitives. Or ask the agent to make one and keep running `check theme` until every rule passes.

::figure{src="/media/theme-from-nothing.mp4" poster="/media/theme-from-nothing-poster.png" alt="The agent scaffolds a theme called slate, runs check theme until every rule passes, and switches the site to it" caption="*Make me a theme called slate.* Scaffolded, checked, switched: a theme from nothing." width="wide"}

## Thirteen primitives

The vocabulary is closed on purpose: thirteen blocks, versioned, each with a schema, an intent, an anti-intent and a fallback. Themes implement the vocabulary; content never references a theme. An unknown block fails lint, and so does a stat with no source. [Every block, explained](/posts/thirteen-blocks/).

::figure{src="/media/primitives.png" alt="Three primitives as the editorial theme renders them: a bar chart of tokens per page, a box-and-arrow diagram of content flowing from git to two outputs, and a row of two stats" caption="`chart`, `diagram` and `stat-row`, rendered by the editorial theme from the spec's own examples. All three are SVG and HTML the build wrote; none loads a script." width="wide"}

## A person in the loop

An agent writes on a drafts branch, and nothing lands on the site until a person approves that exact version. `snypd dev` serves the Desk: the drafts in flight, what is waiting for approval, and what the last build did. Approve on the review page and the one item lands; edit after approval and the approval is void.

::figure{src="/media/desk.png" alt="The Desk at /_snypd: a shelf of drafts in flight, a review card for one post, and the last build's numbers" caption="The Desk, served by `snypd dev`. Zero JavaScript here too." width="wide"}

## What it keeps from WordPress, and what it refuses

| WordPress | What it got right | snypd |
|---|---|---|
| Custom post types, taxonomies | Content has shape, and the shape is registered | `types:` and `taxonomies:` in YAML, merged with provenance |
| Actions and filters | An extension point at a named place | Slots and filters declared in YAML, ordered by the `plugins:` list |
| Child themes, style variations | Extend without forking; one theme, several looks | `extends:` and `variations:` in `theme.yaml`, one config value to switch |
| The plugin directory | One place to find things | npm is the registry; snypd.rocks lists, never hosts |
| The dashboard | Live preview beside the control | Declined. The agent is the interface, the Desk is the review, and the page ships no script |

::cta{title="Four lines to a first post" body="`mkdir field-notes && cd field-notes` · `bunx @snypd/cli init` · `claude` · *Write me a first post.* The source, the spec and every benchmark are on [GitHub](https://github.com/snymrova/snypd)." button="Read the README" href="https://github.com/snymrova/snypd"}
