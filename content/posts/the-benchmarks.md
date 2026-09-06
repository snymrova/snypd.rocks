---
title: "The benchmarks: measure or don't claim"
date: 2026-09-06
status: published
description: Every number snypd claims comes from a suite that runs in CI and fails the build when a budget is breached. What is measured, how, and which budgets are tight.
author: sunny
category: building-in-public
---

:::tldr
Snypd has three benchmark suites, for speed, for the visual primitives and for what a site costs an agent, and they run in CI on every push. A budget breach fails the build. This post is what the numbers are, how they are taken so that they can be compared, and which of the budgets are close to being spent.
:::

## The rule

Principle nine of the design set is four words: measure or don't claim. Every performance or agent-friendliness claim in the README has to link to `snypd bench` output, and the output is a markdown file committed to the repo, exposed as an MCP resource, and the source that every `stat` on this site points at. If a claim cannot be linked to a row in that file, the claim does not get made.

That sounds like discipline and is mostly plumbing. The bench is one CLI verb, one MCP tool and one CI step. Budgets live in the site config next to everything else, so a site can tighten them. And the report is written for reading: every row has a value, a budget, a status and a note that says what the number is and, when it matters, what it is not.

:::stat-row
::stat{value="48" label="rows in the bench of record" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md"}
::stat{value="29" label="of them gated: a breach fails the build" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md"}
::stat{value="80 %" label="of each published budget is the line CI enforces" source="https://github.com/snymrova/snypd/blob/main/docs/07-delivery-plan.md"}
::stat{value="0" label="gated rows over budget today" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md"}
:::

## Three suites

**Speed** is the one every static site generator publishes. A cold build with no cache, no index and no output directory, on synthetic corpora of a hundred, a thousand and ten thousand posts. An incremental build after one body edit. Lint over the same corpora, warm and cold. The MCP server from spawn to its first `initialize` reply, measured on the compiled binary a release ships rather than the source the dev loop runs. The preview server's time to first byte on an unchanged tree.

**Visual primitives** are the suite nobody else has because nobody else renders charts at build time. Every chart type is drawn on the worst shape the spec allows, twelve points with long labels and a grouped second series, and the worst type is reported rather than the mean. Diagram and flow are laid out on three forty-node shapes, a deep chain, a wide layer and a graph with feedback edges, with the layout cache defeated so the number is the layout and not a file copy. Each has a render budget in milliseconds and a size budget in kilobytes of SVG.

**Agent cost** is the suite this project exists for. How many tokens a page costs an agent to read, measured on the markdown twin every route emits, because that is what actually lands in a context window. How many tokens an agent pays to learn the site: the config, the vocabulary and the theme, read once at session start. How many it pays for the tool list, which it pays on every turn. Whether every part of the agent-read surface is present: the twin, content negotiation, the feed, the sitemap, the JSON API, the structured data. And the precision of the tool that turns prose into blocks, over a hand-labelled corpus.

There is a fourth thing that is not a suite. Headless Chrome opens six routes of a fixture that uses every primitive, at desktop and phone widths, and reports client JavaScript in bytes, accessibility violations from axe-core, layout shift, and page weight. The first three are gated at zero, zero and 0.05. Largest contentful paint is reported and not gated, because a number off an unthrottled localhost is the shape of the page, not what a phone on a slow network sees, and gating it would be pretending otherwise.

## How much of each budget is spent

A green tick says a number is under budget. It does not say by how much, and the interesting information is in the margin. This is every gated clock and token count from the current bench of record, as a share of its budget.

:::chart{type="bar" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md" caption="Each gated measurement as a percentage of its published budget, largest first. Under 80 is what CI requires. The two agent-cost rows at the top are the tight ones, and they are tight on purpose." unit="%"}
- { label: "tokens to learn the site", value: 75 }
- { label: "tokens for the tool list", value: 74 }
- { label: "chart SVG bytes", value: 63 }
- { label: "flow SVG bytes", value: 58 }
- { label: "MCP cold start, binary", value: 45 }
- { label: "tokens per page, twin", value: 20 }
- { label: "cold build, 100 posts", value: 15 }
- { label: "cold build, 1,000 posts", value: 14 }
- { label: "cold build, 10,000 posts", value: 14 }
- { label: "lint, 1,000 posts", value: 7 }
- { label: "diagram render", value: 6 }
- { label: "incremental build", value: 3 }
:::

The two rows at the top are worth reading twice. Tokens to learn the site is at three quarters of its budget and tokens for the tool list is nearly there, and neither is an accident. The tool budget was set at the measured surface plus roughly one more tool, so that when the next namespace lands, the budget and not anyone's taste is what decides whether it is listed always or found on demand. A budget with a wide margin is a budget nobody has to think about, and for the numbers that describe what an agent pays, thinking about them is the point.

The build numbers are the opposite. A cold build of ten thousand posts sits at a seventh of its budget, and an incremental build after one edit at a thirtieth. These budgets were set before the code existed, and the code turned out to be faster than the guess. They will be tightened at the speed pass before release, because a budget that cannot be breached is not measuring anything.

## Where a number becomes comparable

The hardest part of benchmarking is not taking the measurement. It is making two measurements mean the same thing. The machine this code is written on spent most of the last ten days at a load average above ten on four cores, and for a while the session log carried numbers from it. They moved by a factor of two between sessions with no code change in between, and the log had to say so every time.

So the rule now is that a number is only a number when CI produced it. A GitHub runner is not fast, but it is the same slow every time, and a regression of more than ten percent between two runs on it is a regression in the code. The measurements themselves are medians: a cold start is the median of twenty-one rounds, and the two cold-start lanes, source and binary, are interleaved so that a load spike hits both equally and the difference between them survives it.

:::flow{caption="How a measurement becomes a claim. The file the bench writes is the same file a stat on this site links to."}
steps:
  - A push runs snypd bench in CI, on a runner, not a laptop
  - ask: Every gated row under 80 percent?
    no:
      - The build fails and the row names the breach
      - { then: fix }
    yes: { then: record }
  - id: fix
    do: Fix it, or amend the budget and say why
  - id: record
    do: The report is committed as the bench of record
  - It is served as an MCP resource any agent can read
  - A stat on this site links to that row
:::

## What is not measured yet

Three things the design set promises are not in the report, and saying so is part of the rule.

The kill test, in which an agent with only the MCP upgrades three plain posts, swaps the theme, changes two tokens and writes a new post with a chart and a flow in at most eight tool calls, runs in CI and is not enforcing yet. It is scheduled to run against three models before release, with the pass rate published whether or not it clears the bar.

The comparison that would make the token numbers land, a real CMS's HTML for the same post against the twin, does not exist, because a comparator you build yourself is a strawman you beat. The twin's reduction against snypd's own HTML is reported, at about 63 percent, and is deliberately not gated: as a budget it would reward making the HTML worse.

And Lighthouse's performance score, which the gate table asks for, is not measured. What the browser suite reports instead is the part of that score localhost can measure honestly: bytes, script, layout shift, and violations.

:::callout{kind="note" title="A bench page on this site"}
The last session before release generates a page at this site's `/bench` route from the same file every stat above links to, so the README's claims link to a page and not to a file in a repo. Until then the file is the record, and it is linked from every number on this site.
:::

This is the last of the four launch posts. Three sessions remain before v0.1: draft previews at a URL that is not production, the speed pass that tightens the budgets above, and the kill test. If the result is not obviously better than a folder of markdown and the harness you already have, the plan says to stop and fix the primitives first.
