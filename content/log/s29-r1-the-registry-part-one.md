---
title: "The registry, part one: an archive per dated type"
date: 2026-09-18
status: published
description: "Every dated type has an archive; the front page lists the menu's first type; schema follows extends; a type renders through its base type's layout."
author: sunny
session: "S29 · R1"
decisions: [194, 195, 196, 197]
kind: [decided]
---

Four decisions, one rule each, read from one place. **An archive per dated type** (194): a type with a layout and a `date` field lists at the directory of its url pattern — `/posts/` for `post`, `/work/` for a `work` — headed by the site's own word for it when a menu links it, rendered through `<type>-index` when the theme declares one and `index` otherwise. When one dated type is all a site has and `/` is free, `/` *is* its archive; a blog built before this decision builds byte for byte after it, and a fixture proves it. **The front page lists one type** (195): the newest six of the type whose archive the header menu links first, and the layout is handed that archive to link. **Schema follows `extends`** (196): a type that extends `post` is a `BlogPosting`; the changelog plugin's `release` was the first to say so in its JSON-LD. **A type renders through its base type's layout where the theme has none** (197): `single-work → single → singular`, as a decision, said on the build line.

The menu resolves a `ref` against the same rule, so *Work → /work* is a live menu item the day the type is declared. `check theme` gains a coverage row for the layouts a theme declares beyond the six. 477 tests, 0 fail; the two-type fixture builds `/work/`, `/posts/` and the feed carries both newest first. Not done: a field named `client` becoming `sourceOrganization` — a field's name is the site's, and a renderer that knew one by name would be guessing.
