---
title: Plugins
status: draft
description: Four plugins ship inside snypd, one per tier. Each is two lines of YAML to enable, declares every byte it adds, and removing the line removes every byte.
---

:::tldr
Four plugins, bundled, no install: `analytics`, `autolink`, `changelog` and `indexnow`. Each is enabled by naming it under `plugins:` in `snypd.yaml`, declares what it adds to the page before it adds it, and leaves a byte-identical site behind when the line is removed.
:::

## What a plugin is allowed to do

A plugin is a directory with a `snypd.yaml` manifest and, when it needs one, a module. The manifest says which of five tiers it works at — **declares** a type or a taxonomy, **decorates** a slot in the page, **transforms** the content tree, **reacts** to a publish or a push, or **speaks** as a tool the agent can call — and the loader checks the declaration before the plugin runs. Client JavaScript is a budget line: a plugin says how many kilobytes it will put on the page, the site says how many it affords under `bench.budgets.jsKb`, and the build refuses a page that weighs more than it was told. The four below are the first-party set and the proof of the contract; `snypd check plugin <name>` is the gate a third-party one has to pass to be listed.

## analytics

A privacy-respecting analytics beacon — Plausible, Fathom or Umami — declared at 3 KB of client JS. It is the only first-party plugin that adds any JavaScript to a page, and it is the reason the budget exists: measured on the wire, the three providers are 1.9 to 2.7 KB.

:::steps{title="Enable analytics"}
1. **Name it** — in `snypd.yaml`, under `plugins:`, add `- analytics: { provider: plausible }` (`fathom` and `umami` take a `site` id; `domain` and `src` override the defaults).
2. **Build** — `snypd build` puts the beacon in the `head` slot of every page and `page.js.kb` measures it against the budget. Remove the line and the beacon is gone, byte for byte.
:::

## autolink

The first mention of a taxonomy term in a post links to the term's archive — a transform on the content tree, so the author writes nothing and the markdown twin stays clean.

:::steps{title="Enable autolink"}
1. **Name it** — under `plugins:`, add `- autolink` (or `- autolink: { taxonomies: [tag] }` to link one taxonomy only).
2. **Build** — every post's first *benchmarks* becomes a link to `/tag/benchmarks/`. A term added to the site re-renders the posts that mention it, because the term list is part of each page's cache key.
:::

## changelog

A `release` type and a `product` taxonomy — a changelog at `/changelog/{slug}` with a required `version`, a `breaking` flag and a product reference, and no code at all: the whole plugin is one manifest.

:::steps{title="Enable changelog"}
1. **Name it** — under `plugins:`, add `- changelog`.
2. **Write a release** — `content.create` with `type: release`, a `version` like `1.2.0` and a `product`. It lands at `/changelog/<slug>`, and `snypd://types/release` shows the frontmatter it expects.
:::

## indexnow

Tells Bing, Yandex, Seznam and Naver which pages a push changed, the moment it is pushed — the IndexNow protocol, with the key file emitted for you. Its network access is declared in the manifest as the protocol's endpoints and nothing else; a host outside that list is refused before a connection is opened.

:::steps{title="Enable indexnow"}
1. **Name it** — under `plugins:`, add `- indexnow: { key: <your key> }`. The key is a claim, not a secret: any string of 8 to 128 letters, digits and hyphens.
2. **Push** — `site › push` sends the commits and the plugin pings the four engines with the pages they changed; `snypd://indexnow/last` shows what each one answered. The build writes `/indexnow/<key>.txt` so the engines can verify the claim.
:::

## Write one

`snypd new plugin <name>` scaffolds a manifest and a module with one hook of each kind commented out; `snypd check plugin <name>` judges the result on the same rules the four above pass. A plugin in the site's own `plugins/` directory loads by the same path as a bundled one; an npm package named `snypd-plugin-<name>` loads from `node_modules`. `snypd://plugins` lists what is loaded, what each one declares, and whether it loaded at all.
