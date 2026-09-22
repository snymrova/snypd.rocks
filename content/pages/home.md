---
title: A CMS with no dashboard. Your agent writes it.
status: published
description: "snypd is a CMS with no dashboard. Claude Code, Cursor or Codex writes; markdown lives in your repo; static HTML comes out, zero JavaScript. Built in public."
home: true
---

::cover{title="A CMS with no dashboard. Your agent writes it."}

You know how every CMS assumes a person at a screen, filling in fields? The person at the screen now has Claude Code, Cursor or Codex open, and it can write.

```
$ bunx @snypd/cli init my-site && cd my-site && claude
❯ Write me a first post and put it online.
✓ https://my-site.<your-account>.workers.dev
```

::figure{src="/media/hero.mp4" poster="/media/hero-poster.webp" alt="The hero film, 45 seconds with sound: every CMS was built for a person at a dashboard; you have an agent now; one sentence in, a finished page out — a real post with charts, diagrams and sourced numbers, seven looks, a whole studio site as files in your repo, a lint refusal, a git log, and the install line" caption="Forty-five seconds, with sound. Every page in it is real."}

## Measured in CI, or not claimed.

:::stat-row
::stat{value="23 ms" label="MCP cold start, release binary" source="https://snypd.rocks/bench/"}
::stat{value="510" label="tokens to read one page as markdown" source="https://snypd.rocks/bench/"}
::stat{value="0 KB" label="JavaScript on the page, every theme" source="https://snypd.rocks/bench/"}
:::

Sixty rows run on every push. Thirty-three of them are budgets, and a breach fails the build.

[Every number, with its row](/bench/)

## How things will go. One line.

::figure{src="/media/front-door.mp4" poster="/media/front-door-done.webp" alt="A terminal: one command scaffolds a site, Claude Code opens, a first post is written and built, and the page appears in a browser" caption="A real session, unedited but for the waits — recorded in September, before `init` learned to make the directory and to put the post online. The two lines it types are one line now, and the walk ends on a URL."}

:::steps
1. **One line.** `bunx @snypd/cli init my-site && cd my-site && claude` — it makes the directory, writes the config, the content folders, an `.mcp.json` and your host's half, commits all of it, and prints the next thing you type.
2. **One sentence.** *Write me a first post and put it online.* Your agent reads the site, learns the vocabulary, writes the post on a drafts branch, builds it, and asks the host for a URL.
3. **One click.** Your host opens its own login in a tab; you click *allow*, once per machine. Nothing else is typed — not the origin, not a build command, not a repository.
:::

Three human actions, from an empty terminal to a live page. That is measured, not estimated: the bench walks it and counts them, against a budget of five. [The row](/bench/)

## Everything a CMS has. As files.

- **Themes and child themes.** Four ship in the binary, in seven looks. A theme is a manifest and one stylesheet; a child theme is one `extends:` line. [Themes](/themes/)
- **Plugins.** Four ship, one per tier: declare a type, fill a slot, transform the tree, react to a publish, hand the agent a tool. Each declares every byte it adds. [Plugins](/plugins/)
- **Content types and taxonomies.** Declare a type in YAML and it has a folder, a URL, checked fields and an archive. This site's log and changelog are two. [The registry](/log/s29-r1-the-registry-part-one/)
- **Templates, menus, settings.** A layout per type, menus in YAML, typed settings your agent reads before it changes one. A site overrides any of it from its own folder; this page does. [How](/log/s34-the-product-look/)
- **Blocks.** Fourteen typed blocks, from `chart` and `flow` to `faq`, rendered at build time as HTML and inline SVG. Lint refuses a number with no source. [The blocks](/posts/thirteen-blocks/)
- **Drafts, preview, approval.** Writes land on a drafts branch, a preview is a build no search engine sees, and a site can require a person to approve the exact version that lands. [Drafts](/log/s19d-s20-drafts-and-the-other-engine/)

## One sentence changes the look.

::figure{src="/media/four-looks.webp" alt="Four snypd themes side by side: studio with a dark hero band and a very large sans headline, editorial paper with a serif headline on cream, technical phosphor in amber mono on near-black, and editorial ink in off-white serif on a cool dark ground" caption="Four of the seven looks, photographed by the bench from one fixture. Every one passes the same eighteen rules before it is listed."}

*Switch this site to editorial, the ink look.* That is the whole change, and the markdown does not move. Or have your agent write a theme of your own; the same gate checks it. [Every theme, photographed](/themes/)

## The gate says no.

- **A masthead that inverted over each band.** Five contrast failures on the light bands. [S29 · U8](/log/s29-u8-the-studio-look/)
- **A benchmark taken on a busy machine.** The numbers were the load's; CI's stand. [F1](/log/f1-the-phase-split/)
- **A noindex on every preview build.** It broke the byte-identical rule and lasted an hour. [S19d · S20](/log/s19d-s20-drafts-and-the-other-engine/)

[Everything the gate refused](/kind/refused/)

## One line. A live site.

```
$ bunx @snypd/cli init my-site && cd my-site && claude
❯ Write me a first post and put it online.
```

::cta{title="Open source, MIT." body="The source, the spec and every benchmark are on GitHub. Every page on this site was written through snypd's own MCP server." button="Install from npm" href="https://www.npmjs.com/package/@snypd/cli"}
