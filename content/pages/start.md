---
title: Start
status: published
description: "Four lines to a first post: a directory, the scaffold, your agent, one sentence. What each line does, what you need first, and what happens on the far side."
---

:::tldr
A terminal, [Bun](https://bun.sh), git, and one agent that reads an `.mcp.json` — Claude Code, Cursor or Codex. Then four lines.
:::

```
$ mkdir field-notes && cd field-notes
$ bunx @snypd/cli init
$ claude
❯ Write me a first post.
```

## What each line does

:::steps{title="The four lines"}
1. **A directory** — `mkdir field-notes && cd field-notes`. The site is named after it unless you say otherwise; `init --name=…` and `--url=…` do.
2. **The scaffold** — `bunx @snypd/cli init` writes the smallest `snypd.yaml` that loads, the `content/` directories, a `.gitignore`, and an `.mcp.json` that points your agent at snypd's MCP server. In an empty directory it runs `git init` too, and it commits the scaffold, so the site has a history before it has a post. `--deploy=cloudflare` or `--deploy=vercel` adds the host's half: the build command and `dist/`.
3. **Your agent** — `claude`, or open the directory in Cursor or Codex. Any agent that reads an `.mcp.json` finds seven tools and the site's resources on its first turn; there is nothing to install on the agent's side and no account to make.
4. **One sentence** — *Write me a first post.* The agent writes markdown on a drafts branch, builds, and shows you the page. You approve what lands on `main`; the host builds `main`. That is the whole loop, and [the front door clip](/#the-front-door) is a real one.
:::

## What it refuses to be

No dashboard: your agent is the interface, and a person reads the site the way a visitor does. No database: the content is markdown in a git repo you own, and leaving is `git clone`. No JavaScript on the page unless a plugin declares its bytes and the budget allows them. [Why MCP is the only interface](/posts/why-mcp-is-the-only-interface/) is the argument; [the numbers](/bench/) are the proof.

## Then

Switch the look with one sentence to the agent — [four themes, seven looks](/themes/) pass the same gate. Add [a plugin](/plugins/) with two lines of YAML. Read [the log](/log/) for how this site was built through the same server, session by session.

::cta{title="The source" body="The CLI, the renderer, the spec, every theme and every benchmark, MIT." button="GitHub" href="https://github.com/snymrova/snypd"}
