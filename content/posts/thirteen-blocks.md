---
title: "Thirteen blocks: the vocabulary an agent writes in"
date: 2026-09-06
status: published
description: A snypd post is prose plus thirteen typed blocks, declared in YAML and rendered at build time. Why the vocabulary is closed, and what lint refuses.
author: sunny
category: building-in-public
---

:::tldr
A snypd post is markdown plus thirteen typed blocks. Each is declared, not drawn: a chart is a YAML list, a diagram is nodes and edges, a flow is steps with yes/no branches, and the build turns them into inline SVG with no JavaScript. The vocabulary is closed on purpose, every block has a schema an agent can read in one call, and a twelve-rule lint refuses the things that make agent-written content bad.
:::

## Why a folder of markdown is not enough

The first post on this site said the bar for snypd is "obviously better than a folder of markdown and the harness you already have". A folder of markdown gets you a long way. What it does not get you is a chart. Or rather, it gets you one of two things: an image an agent generated somewhere else and pasted in, which no theme can restyle and no reader can check, or a block of raw HTML, which is inconsistent from one post to the next, unthemeable and unlintable.

The alternative is a closed vocabulary. A post can contain prose and a fixed set of named blocks, and nothing else. An unknown block is a lint error, never a silent passthrough. That sounds restrictive and is the opposite: because the set is small and described, an agent learns the whole of it in one resource read, a theme can implement all of it and be checked for coverage, and content written today survives a theme swap tomorrow without changing a byte. The source file is also the markdown twin an agent reads, so the thing you write is the thing another agent gets.

:::stat-row
::stat{value="13" label="primitives in spec v1" source="https://github.com/snymrova/snypd/tree/main/packages/spec/primitives"}
::stat{value="12" label="editorial lint rules, each with a fix hint" source="https://github.com/snymrova/snypd/blob/main/packages/core/src/content/lint.ts"}
::stat{value="0 KB" label="client JavaScript on a page using all of them" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md"}
::stat{value="14.4 KB" label="largest SVG any block emits, at its 40-node cap" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md"}
:::

## The thirteen

The blocks use markdown directive syntax: a leaf is `::name{props}` and a container is `:::name{props} … :::`. They group by what they are for.

- **Structure:** `cover`, the post header with an optional eyebrow, subtitle and image. Leave it out and the theme builds one from the frontmatter.
- **Emphasis:** `tldr`, the one to three sentences an agent or a skimmer reads first. `callout`, a boxed aside with a kind of note, tip, warning, danger or quote-me. `pullquote`, a sentence already in the post, set large.
- **Evidence:** `stat` and `stat-row`, a number with its label and where it came from, and two to four of them side by side. `chart`, five types rendered from inline rows. `diagram`, nodes and edges laid out automatically. `flow`, an ordered procedure with branches.
- **Media:** `figure`, the only way to place an image, and its alt text is required.
- **Interaction:** `faq`, question headings that emit FAQPage schema. `steps`, an ordered procedure that emits HowTo schema. `cta`, one call to action, at the end, never two.

Every one of them is a YAML file with the same fields: purpose, typed props, slots, an intent, an anti-intent, an example, what schema it emits, a render budget, and a fallback. The fallback matters more than it looks. A theme that does not implement `chart` still shows the rows as a table with the caption under it, so the data survives even when the picture does not.

:::callout{kind="note" title="What the vocabulary refuses"}
There is no `grid`, no `columns`, and no `hero-with-three-cards`. Layout is the theme's job, and an author never says "grid". The moment content describes layout it is coupled to one theme, and the vocabulary exists so that it never is.
:::

## Declared, not drawn

The three evidence blocks that render to SVG are where the vocabulary earns its keep. The chart below is a YAML list of rows. The spec owns the geometry and the theme only supplies colours and type, so the same rows draw correctly in a theme written by someone who has never seen them. Every paint is a CSS variable with a literal fallback, which is why a dark theme needs no chart-specific tokens at all.

:::chart{type="bar" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md" caption="The SVG each evidence block emits on its worst measured shape, against its budget. A chart of twelve long-labelled points, a diagram and a flow of forty nodes each. Zero JavaScript and zero CSS in every one." unit="KB"}
- { label: chart, value: 7.6, series: measured }
- { label: chart, value: 12, series: budget }
- { label: diagram, value: 13.2, series: measured }
- { label: diagram, value: 25, series: budget }
- { label: flow, value: 14.4, series: measured }
- { label: flow, value: 25, series: budget }
:::

The budgets are not decoration. `snypd bench` measures the worst type on the worst shape, and a render that crosses its budget fails the build. Diagram layout is layered and deterministic, so the same nodes produce the same picture on every machine, and there are no coordinates in the source for an agent to get wrong.

The limits are chosen so a reader can still read the result. A chart stops at twelve points, because past that the bars stop meaning anything without a legend. A diagram and a flow stop at forty nodes. A flow label clips at three lines, which the first post on this site ran into with three URIs in one box, and the fix was the right one: shorten the label.

## What lint refuses

An agent writing in a vocabulary needs to be told when it is wrong, in the same turn, in a form it can act on. Every write returns the lint for the file it just wrote, and every diagnostic carries a rule number, a severity and a fix hint. The twelve rules, numbered as the code numbers them:

- **0** Frontmatter: required fields, unknown fields, types, a valid status.
- **1** A block that is not in the vocabulary.
- **2** A block missing a required prop, or carrying an unknown one, or overfilling a slot.
- **3** A `stat` or a `chart` with no checkable source. A number whose origin cannot be clicked is an opinion.
- **4** An image with no alt text.
- **5** An internal link that resolves to no route.
- **6** A heading skip, or an `h1` in the body.
- **7** An `updated` date earlier than the post's date, or an update note with no date.
- **8** A phrase from the slop list, matched on prose only.
- **9** More than three callouts per thousand words.
- **10** A slug that changed with nothing redirecting the old URL.
- **11** A tag no other post uses.

The last two can only be seen across the whole site, which is why there is a site-wide lint next to the one a write returns. Rules three and four are the ones that make the difference between content an agent wrote and content an agent wrote well: the source and the alt text are required by the schema, so there is no version of a chart or an image that lint lets through without them.

## Prose that was already trying to be a block

Most writing arrives as prose, and a lot of prose is a block that has not been declared yet. A markdown table with a unit in its header is a chart. A run of question headings is an FAQ. A numbered list with an "if" in it is a flow. There is a tool for this, and while writing this post I fed it a page of plain markdown with all three shapes in it to see what came back.

It found two of the three. The table became a two-series bar chart at 0.7 confidence, with the reasons in words: a column header naming a unit is a measurement, and three points make a shape a reader can see. It would not apply it, because the prose carried no source, and it said so, naming rule three. The three question headings became an FAQ at 0.87 confidence with nothing missing. The numbered list with a branch in step two was not suggested as a flow. That is a gap the tool has, and it is written down here rather than smoothed over.

:::flow{caption="How a post gets written in the vocabulary. The lint's own hints are the loop, and the preview is the same build that publishes."}
steps:
  - Read the primitives and the type schema
  - Choose the shape of the post before the prose
  - id: write
    do: Write it, blocks included
  - ask: Lint clean?
    yes: { then: suggest }
    no:
      - Act on the fix hint the rule named
      - { then: write }
  - id: suggest
    do: Ask what prose is already a block
  - ask: Anything worth applying?
    yes: Apply it, with the source it asked for
    no: Leave the prose as prose
  - Render the preview and read the twin
:::

## What is not in it yet

The design set names about thirty-five primitives. Thirteen are shipped, and the choice of which was made by asking what a launch post needs and refusing everything else. `comparison`, `citation`, `receipt`, `code`, `video`, `gallery`, `tabs`, `accordion` and the rest are on the roadmap for v0.2, and they arrive on the same terms: a schema, an intent, a budget and a fallback, or they do not arrive.

Two things are honest gaps rather than deferrals. A chart can name a data file with `src=`, and the spec accepts it, but v0.1 does not read it, because a route's cache key hashes the post and a chart whose rows live elsewhere would not rebuild when they changed. It is a lint warning with the fix in the hint, never a silently empty figure. And themes have no formal pattern contract yet, so the base theme's class names are the contract in the meantime.

The next post is the numbers: what each of these blocks costs to render, what a page costs an agent to read, and how the benchmarks are run so that a claim on this site links to a measurement rather than to a sentence.
