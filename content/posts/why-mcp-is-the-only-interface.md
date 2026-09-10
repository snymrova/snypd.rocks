---
title: Why MCP is the only interface
date: 2026-09-06
status: published
description: "Snypd has no dashboard on purpose: what a CMS looks like when the only way in is your harness, what it costs an agent per turn, and what a human keeps."
author: sunny
category: building-in-public
tags:
  - mcp
---

:::tldr
Snypd has no admin app, no editor and no login. The whole product is an MCP server, because a second way to write would make the first one optional. This post is the argument, what it costs an agent per turn, and the two lines of YAML that put a person back in the loop.
:::

## The tab you resent

Every CMS I have used has the same shape. There is a place you write, and there is a place the site lives, and they are not the same place. You draft in one tab, paste into another, fix the formatting the paste broke, find the publish button, and then go back to the tab you were actually working in.

The interface shift already happened for code. If you write software in 2026 you probably write it by talking to an agent inside a harness, and the harness has file tools, a terminal, a browser and git. Content has exactly the same shape as code: draft, review, publish. It has not moved, because the products that hold content are dashboard-first and are bolting MCP on as a feature.

Snypd starts from the other end. The `snypd` binary has five verbs, and none of them touches content. `serve` is the MCP server. `dev` shows you what a build produced. `build`, `init` and `bench` do what they say. If a thing is not a resource, a tool or a prompt, it does not exist.

:::pullquote
A second way to write means every feature is built twice, and the MCP surface stops being the product the moment there is a better way to use it.
:::

## What "only" buys you

The word that does the work is *only*. A CMS with an MCP server and a dashboard has two front doors, and every feature has to be built behind both, tested behind both and kept in step. The dashboard is always the one that gets the new thing first, because it is the one a designer can see, and the MCP surface becomes a partial mirror of it. Then the agent is a second-class user of your own product.

With one door there is one surface to get right. That has three consequences that were not obvious until they were built.

**Reads are free, and writes are commits.** Anything an agent needs to know about the site is a resource: the merged config with a comment on every line saying where the value came from, the thirteen-block vocabulary with a schema and an example each, the theme's tokens, the lint on any post, the last benchmark report. A resource costs nothing until something reads it. A write is a tool call that ends in a git commit with a trailer naming who made it, on a drafts branch that is never pushed.

**The docs are the tool list.** There is no separate documentation site to fall behind. Each tool's description is written for an agent: purpose, intent, anti-intent, an example. The `get-started` and `write-post` prompts name the exact resources and calls in order, because a prompt that does not name its calls is a paragraph, not a workflow.

**The preview is the build.** Because no page in the product is an editor, the preview server can be the same incremental build that publishes, and a test asserts every preview page is byte-identical to what lands in `dist/`. There is no draft renderer that drifts from the real one.

:::diagram{direction="tb" caption="One door. Reads are resources, writes are tools that commit, and the only web page in the product is for looking."}
nodes:
  - { id: harness, label: Claude Code / Cursor / Codex, kind: pill }
  - { id: resources, label: "resources: config, spec, theme, lint, bench" }
  - { id: tools, label: "tools: create, update, lint, publish, push" }
  - { id: git, label: "git repo: a drafts branch and main" }
  - { id: dev, label: "snypd dev: the page a person looks at" }
  - { id: host, label: the host builds main, kind: pill }
edges:
  - { from: harness, to: resources, label: read }
  - { from: harness, to: tools, label: call }
  - { from: tools, to: git, label: commit }
  - { from: git, to: dev, label: same build }
  - { from: git, to: host, label: push }
:::

## What it costs, per turn

An interface an agent talks to is paid for in tokens, every turn, and this is where a dashboard-first product's MCP server usually goes wrong: it exposes one tool per button. Snypd's first draft of the surface did the same thing. One tool per verb across content, theme, site, media, taxonomy, history and bench came to about 8,600 tokens of tool descriptions before the agent had written a word, on top of the roughly 4,600 it pays to learn the vocabulary.

So the surface was split, and the split is a benchmark that fails the build. The hot path, the content tools plus `find_tools`, is always listed. Everything else lives in a catalogue: you say what you are trying to do, the matching tool comes back with its full schema and joins the list. Each namespace is one tool with an `action`, not one tool per verb, because nine theme tools is nine descriptions and eight of them re-explain what a theme is. And every read is a resource rather than a tool, so it is not on the list at all.

:::chart{type="bar" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md" caption="Tokens an agent pays for the tool list on every turn. Flat is the first design, one tool per verb, estimated from the measured 203 tokens per tool. The other two are measured in CI. The budget is 3,000." unit="tokens"}
- { label: "Flat, one tool per verb", value: 8600 }
- { label: "Catalogue listed", value: 3461 }
- { label: "Catalogue found on demand", value: 2230 }
:::

The budget is 3,000 tokens and it was not picked to be comfortable. It is the measured surface plus about one more hot-path tool. That is the point: when media and taxonomy tools land, the budget rather than anyone's taste is what stops them from quietly undoing the split.

The same logic runs the other way for the site the agent reads. Every page ships with a markdown twin, and the twin is what is gated, at 510 tokens for a page whose HTML is about 1,380. The reduction number is reported but not gated, because as a budget it rewards bloating the HTML.

## What a human still gets

The obvious objection is that a CMS with no human interface is a CMS where a human is not in control. For the first eighteen sessions the answer was a gate in the code: an agent could draft and never publish, and a person approved the exact bytes on a review page, with the approval bound to a content hash so an edit after approving was refused.

That gate was true and it was in the wrong place. "MCP is the only interface" was false at the last mile, and the things it broke were not edge cases. A CI job cannot click. A headless box has no browser. A scheduled post has nobody awake. Snypd's own kill test, which asks an agent to build a site from an empty directory, could not finish a site it was not allowed to publish.

So five sessions ago the gate moved from the code to the config. By default an agent writes, publishes and pushes, which is how this post got here. A site puts a person back in front of every post of a type with `mcp.write: draft`, or in front of every deploy with `deploy.push: human`. The review page, the approval ledger and the button all still exist for a site that asks. What does not exist is an approve tool: the ledger means one thing, a person read these bytes, and an agent approving its own draft would be a signature on nothing.

:::flow{caption="Where a person can stand. Both refusals are one line of YAML away, and neither is on by default."}
steps:
  - Agent writes a draft on the drafts branch
  - ask: "mcp.write is draft?"
    yes:
      - Person reads it on the review page and approves that hash
      - { then: publish }
    no: { then: publish }
  - id: publish
    do: Publish lands this one item on main
  - ask: "deploy.push is human?"
    yes: Person presses the one button on the Desk
    no: Agent pushes main to the host
  - The host builds it and the URL is live
:::

Either way the evidence is the same git log, and the commit trailer says which of the two did it.

:::faq
### Is there really no way to edit a post in a browser?
No. The one web page in the product, the Desk, shows what is in flight, what the theme is, the review page for a draft-policy type and the push button. It writes no words, and there is no plan for it to. The name is the newsroom word for where copy lands and someone decides whether it runs, and it is chosen as an argument against the "New Post" button somebody will propose.

### What about people who do not use an agent?
They are not who this is for yet. Snypd is for people who already write in a harness and resent the CMS tab. Content is markdown and YAML in a git repo, so a text editor and a commit also work, but nothing in the product is built to make that path nice.

### Does this run without an internet service?
Yes. `snypd serve` is a stdio process the harness spawns from an `.mcp.json` in the repo. No account, no token, no server anywhere but your machine. A hosted transport with OAuth for teams is planned and is not needed for any of this.

### What stops a page the agent reads from publishing something?
The write path and the read path are different things. A page an agent reads is a resource. Publishing is a tool call that commits under the agent's principal, and a site that wants a human in front of it declares that in config. Nothing an agent reads can flip that key.
:::

## The bar

The delivery plan has one hard stop written into it. If, at release, snypd is not obviously better than a folder of markdown and the harness you already have, the primitives get fixed before anything else ships. "Only" is a bet that the one interface can be good enough to clear that. The next two posts are about the two halves of the bet: the vocabulary, and the numbers.
