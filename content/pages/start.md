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
1. **A directory.** `mkdir field-notes && cd field-notes` — the site is named after it.
2. **The scaffold.** `bunx @snypd/cli init` writes the config, the content folders and an `.mcp.json`, and commits them.
3. **Your agent.** `claude`, or the directory open in Cursor or Codex. Anything that reads an `.mcp.json` is the interface.
4. **One sentence.** *Write me a first post.* It writes on a drafts branch, builds, and shows you the page. You approve what lands.
:::

## What `init` takes

`init --name=…` and `--url=…` name the site when the directory's name will not do. In an empty directory it runs `git init` too, so the site has a history before it has a post. `--deploy=cloudflare` or `--deploy=vercel` adds the host's half: the build command and `dist/`. On the agent's side there is nothing to install and no account to make: it finds seven tools and the site's resources on its first turn. You approve what lands on `main`, and the host builds `main`. That is the whole loop, and the clip on [the front page](/) is a real one.

## What it refuses to be

No dashboard: your agent is the interface, and a person reads the site the way a visitor does. No database: the content is markdown in a git repo you own, and leaving is `git clone`. No JavaScript on the page unless a plugin declares its bytes and the budget allows them. [Why MCP is the only interface](/posts/why-mcp-is-the-only-interface/) is the argument; [the numbers](/bench/) are the proof.

## Then

Switch the look with one sentence to the agent — [four themes, seven looks](/themes/) pass the same gate. Add [a plugin](/plugins/) with two lines of YAML. Read [the log](/log/) for how this site was built through the same server, session by session.

::cta{title="The source" body="The CLI, the renderer, the spec, every theme and every benchmark, MIT." button="GitHub" href="https://github.com/snymrova/snypd"}
