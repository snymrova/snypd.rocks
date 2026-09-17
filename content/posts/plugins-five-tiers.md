---
title: "Plugins: five tiers, four proofs, and every byte declared"
date: 2026-09-12
status: draft
description: "Snypd's plugin contract: a manifest that is checked, five tiers a plugin declares, four bundled proofs, and a JavaScript budget the first plugin had to fit."
author: sunny
category: building-in-public
tags:
  - mcp
---

:::tldr
A plugin in snypd is an npm package with a validated manifest that declares which of five things it does: declare, decorate, transform, react, speak. Four of them ship inside the binary, one per tier, and each is the conformance test for that tier. Nothing a plugin does is registered at runtime, nothing it adds is invisible, and the four of them together add zero bytes to the tool list an agent pays for on every turn.
:::

## The second question

The first question anyone asks about a CMS with no dashboard is how you write a post. The second one is harder: is this a toy with two themes, or is it the thing it keeps comparing itself to? WordPress is not a third of the web because of its editor. It is a third of the web because tens of thousands of plugins exist, and because the contract they were written against barely changed for fifteen years.

So the question here is not whether to have plugins. It is what the contract should be when the extension points are read by an agent rather than clicked by a person, and when every byte a plugin adds shows up in a benchmark that fails the build.

:::stat-row
::stat{value="5" label="tiers a plugin declares, checked at load" source="https://github.com/snymrova/snypd/blob/main/docs/10-plugins-and-launch.md"}
::stat{value="4" label="plugins bundled in the binary, one per tier" source="https://github.com/snymrova/snypd/blob/main/docs/10-plugins-and-launch.md"}
::stat{value="0" label="bytes all four add to the tool list" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md"}
::stat{value="0 KB" label="client JavaScript until a plugin declares some" source="https://github.com/snymrova/snypd/blob/main/bench/latest.md"}
:::

## A plugin is a package with a manifest

A plugin is a directory with a `snypd.yaml`. Everything at the root of that file merges into the site's config exactly as a theme's does — content types, taxonomies, field types, scheduled jobs, benchmark budgets — with provenance, so the merged config says which plugin contributed which line. Everything the plugin says *about itself* lives under one key, `plugin:`, which the loader reads and never merges.

```yaml
plugin:
  name: analytics
  version: 0.1.0
  api: 1
  description: A privacy-respecting analytics beacon.
  options:
    type: object
    required: [provider]
    properties:
      provider: { type: string, enum: [plausible, fathom, umami] }
  capabilities:
    client: 3kb
  slots:
    head:     ./slots/head.tsx
    body-end: ./slots/beacon.tsx
```

`api: 1` is checked before anything else in the file is read, so a plugin written against a contract this binary does not speak is refused with the version it wanted rather than loaded and broken. The options are validated against the plugin's own JSON Schema, and a failure names the line in *your* config, where the fix is, rather than a line in the plugin. A plugin that fails any of this is not loaded, and the rest of the site is: the build goes on, the health report prints the problem, and the plugins resource carries it.

## Five tiers, declared

A plugin does one or more of five things, and the manifest says which. The tiers are not levels of trust. They are kinds, so that a health report can print "analytics: decorates, 3 KB of client JS" and you know what to expect before reading a line of its code.

| Tier | Verb | What it can do | Runs |
|---|---|---|---|
| 0 | Declare | Content types, taxonomies, field types, jobs, budgets | At config load |
| 1 | Decorate | Six slots in the document, six named value filters | At render, per route |
| 2 | Transform | Change a post's block tree on the way past; emit files of its own | At build |
| 3 | React | Handle a publish or a push, with an allowlisted fetch | After the event |
| 4 | Speak | Add an MCP tool, a prompt and a resource | In the agent's session |

Tier 2's transform gets a **copy** of the parsed document, which sounds like a detail and is the difference between a plugin that renders a view and a plugin that edits your writing. The source file stays the source file: with the autolink plugin on, a post's HTML carries links its markdown twin does not, and that disagreement is deliberate. A twin that carried the transform's output would let an agent read it, write it back, and bake the transform into the source — where the next build would transform it again.

## Every byte is declared, and then measured

The rule this project shipped with was blunter: a plugin may not add JavaScript. The site's JS budget is zero, it is measured on the built page, and a breach fails the build.

That rule survives contact with exactly zero real plugins. The first thing anybody asks for is analytics, and every privacy-respecting analytics provider is a small script. A rule the first real plugin has to break is not a rule, so it became a budget line: a plugin *declares* what it spends, the declared bytes are summed in order at load, and a site that has not raised its budget refuses the plugin with the remedy in the error. What reaches the page is still measured, so a plugin whose script is bigger than it declared fails a gate rather than shipping.

Writing that plugin is also how we found out the estimate was wrong. "About a kilobyte" was a guess. Measured on the wire, headers included:

:::chart{type="bar" source="https://github.com/snymrova/snypd/blob/main/docs/10-plugins-and-launch.md" caption="Client JavaScript each analytics provider actually puts on the page, against the 3 KB the plugin declares. Cloudflare Web Analytics was dropped from the provider list at 9.9 KB, because one declaration has to cover every provider on offer." unit="KB"}
- { label: "Plausible", value: 1.87 }
- { label: "Umami", value: 2.63 }
- { label: "Fathom", value: 2.69 }
- { label: "what the plugin declares", value: 3 }
- { label: "Cloudflare, dropped", value: 9.9 }
:::

The measurement had a hole in it too. The page suite's warm-up navigation primed the browser's disk cache, and a cached third-party script weighs nothing, so a page with a beacon on it measured as zero. The cache is disabled for measurement now. Those are the first honest numbers this project has taken for client JavaScript, which is worth saying out loud in a post whose whole claim is that things are measured.

What all of it buys is one sentence that stays true after the first plugin: **zero JavaScript by default, and every byte declared by the plugin that spends it and afforded by the site that allows it.**

## What a plugin cannot do

Three refusals, each one a thing WordPress allows and pays for.

**A plugin does not write content.** There is no capability for it. The MCP is the one door for words, and a plugin that writes a post is a second door with nobody on the other side of it. A translation plugin exposes a *tool*; the agent calls it, and the agent writes.

**A plugin does not add primitives.** The thirteen blocks are a closed vocabulary, and a block that renders only when a package is installed is a shortcode with a manifest — a post that stops rendering when you uninstall something. New primitives go through the spec, where they arrive in every theme's coverage report, or they do not arrive.

**There is no registry.** npm is the registry. A plugin is an `snypd-plugin-*` package with a keyword; this site will list what npm already knows and host none of it. No accounts, no reviews, no install-from-the-dashboard, because there is no dashboard.

## What is enforced, and what is not

A plugin is TypeScript running in the same process as everything else, and Bun does not sandbox an import. Pretending otherwise would be the one claim on launch day that costs more than having no sandbox at all.

:::callout{kind="warning" title="Said plainly"}
Enforced: the manifest and its options schema, contract compatibility, the paths a plugin may write to, the client-byte budget on the built page, and the hosts a plugin may reach — the fetch it is handed refuses anything outside its declared list before a connection is made. Not enforced: a plugin can import `node:fs` and call the global `fetch`. **A plugin is a dependency you install, and you vet it the way you vet any dependency.** What snypd adds is that what it declared and what it did are both inspectable.
:::

Both halves of that last sentence are real calls. The explain tool answers "what ran over this post" by *building* it, in a scratch directory with an index of its own, rather than by printing what was declared — because a declaration table cannot tell a hook that never ran from a hook that ran and changed nothing.

## Removing a plugin removes every byte it added

The gate for all of this is not a feature list. It is a diff. A site is built with no plugins and every file in the output is hashed. Then each of the four is switched on, the site is rebuilt, the diff is taken, and the plugin is switched off and the output is compared byte for byte against the baseline — each one alone, and then all four at once.

That test is the answer to the question anybody who has maintained a WordPress site is actually asking. Not "what can it add", but "what does it leave behind".

:::faq
### Do I have to install anything to use these four?
No. They ship inside the binary, the way the three themes do. Naming one in the config works on a fresh site with no install step, and a plugin of your own in `plugins/` or `node_modules/` is found first, so a third-party plugin is not second-class.

### Does a plugin slow down a site that does not use one?
No. The loader runs only over the plugins your config names, so a site with none never goes looking. The cold-build lanes in CI show no change in either direction.

### What does a plugin cost an agent?
Nothing until it speaks. The always-listed tool set is byte-identical with all four plugins enabled, because a plugin's tool is found by searching for what it does rather than listed on every turn.

### Is the contract stable?
No, and it says so. Every manifest carries the contract version it speaks, that version is checked first, the contract is marked experimental through 0.x, and the only consumers anyone owes anything to are the four first-party ones.
:::

## Where this leaves the launch

The plugin gate is green: four plugins, one per tier, bundled and proven, with the byte diff to show for it. This post was written the day it went green and sat as a draft while the presentation work it named — a settings schema for themes, style variations, a third theme built entirely from the contract — got done; that work has [its own post](/posts/six-looks-one-contract/), and [the plugins page](/plugins/) shows the four with the two lines of YAML each one costs.

Two of the four are already switched on here. They show up on the public page the day the host builds this site with a release that carries them, which is the same wait the navigation menus had, and a fair description of what building in public actually looks like: the thing works locally, and then it has to ship.
