---
title: Start
status: published
description: "One line, one sentence, one click: from an empty terminal to a live URL. What the line does, what you need first, and what happens on the far side."
---

:::tldr
A terminal, [Bun](https://bun.sh), git, and one agent that reads an `.mcp.json` — Claude Code, Cursor or Codex. Then one line, one sentence, and one click.
:::

```
$ bunx @snypd/cli init my-site && cd my-site && claude
❯ Write me a first post and put it online.
✓ https://my-site.<your-account>.workers.dev
```

## What happens, in order

:::steps{title="Three human actions"}
1. **You type the line.** `init` makes `my-site/`, writes the config, the content folders, an `.mcp.json` and your host's half, runs `git init` and commits the lot. The last thing it prints is the next thing you type, so nothing has to be remembered.
2. **Your harness opens** in that directory and reads the `.mcp.json` as it starts. Seven tools and the site's resources are there on its first turn — nothing to install, no account to make.
3. **You say the sentence.** *Write me a first post and put it online.* The agent reads the site and its vocabulary, writes a real post on a drafts branch, lints it, builds it, shows you the page, and calls deploy.
4. **Your host asks once.** Its own login opens in a tab; you click *allow*. snypd runs the host's CLI the way it already runs `git push`, and never reads the credential that CLI stores.
5. **The URL comes back.** The binary reads the real origin out of the host's output, sets `site.url`, builds again now that the feed and the sitemap know where they live, uploads again, and answers with the URL, the file count and the bytes. Your agent tells you.
:::

Three of those five are yours: type, say, click. That is what the bench counts, against a budget of five — [the row](/bench/).

## What `init` takes

`init --name=…` and `--url=…` name the site when the directory's name will not do. `--host=cloudflare` is the default and needs no flag; `--host=vercel` writes that one instead, and `--host=none` writes neither, for anything that can run a binary and serve a folder. In an empty directory it runs `git init` too, so the site has a history before it has a post. Run it as `init .` and it scaffolds where you already are.

## Who runs the build

The contract is two lines long — run `snypd build`, serve `dist/` — and `deploy.mode` says who runs them.

**Direct**, the default: your agent calls `site` › `deploy`, and the binary runs the host's own CLI from your site root. No repository is involved, nothing is watched, and a deploy happens when you ask for one.

**Git**: the committed workflow runs `npx -y @snypd/cli@<pinned> build` on the branch you publish to, and the host serves what it produces. You approve what lands; the host builds what landed. Switch with one sentence to your agent.

Either way snypd holds nothing your host issued.

## Then

**Back it up.** *Back this up on GitHub* is one call: it creates the repository, private, connects the remote, and sends the published branch. Until you ask, this machine is the only copy — which the deploy answer tells you.

**Change the look.** One sentence to the agent — [four themes, seven looks](/themes/) pass the same gate. Add [a plugin](/plugins/) with two lines of YAML.

**Read the log.** [The log](/log/) is how this site was built through the same server, session by session.

## What it refuses to be

No dashboard: your agent is the interface, and a person reads the site the way a visitor does. No database: the content is markdown in a git repo you own, and leaving is `git clone`. No JavaScript on the page unless a plugin declares its bytes and the budget allows them. [Why MCP is the only interface](/posts/why-mcp-is-the-only-interface/) is the argument; [the numbers](/bench/) are the proof.

::cta{title="The source" body="The CLI, the renderer, the spec, every theme and every benchmark, MIT." button="GitHub" href="https://github.com/snymrova/snypd"}
