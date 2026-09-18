---
title: "The registry, part two: Ferrule declares `work`"
date: 2026-09-18
status: published
description: "The studio specimen declares a work type with two taxonomies in fifteen lines of YAML; six cases move, eight redirects, and lint's newest rule earns its keep."
author: sunny
session: "S29 · R2"
kind: [shipped]
---

Ferrule, the fictional studio that is the studio theme's specimen, declares its registry: `work` extends `post` with a required `client`, a `year`, a list of `service` refs and an `industry` ref; `service` is hierarchical, `industry` flat. Six cases moved from posts to work with a client each, one back to draft; three notes stayed posts; a studio page with credits under it; eight redirects so every old URL still lands. One renderer line: a type's surface label is its archive's title, so `llms.txt` says *Work* as the menu does.

Counts, no clocks: lint 0 errors and 2 warnings (rule 11 on two single-use industries, kept); build 30 routes, 22 before; `_redirects` 8 lines; the page suite over nine routes at two widths — JavaScript 0, font 32.74 KB, zero violations across eighteen pairs, layout shift 0. Rule 19 fired twice on the new term files — colons in descriptions — and said which line to quote, which is the rule earning its keep. 477 tests, 0 fail.
