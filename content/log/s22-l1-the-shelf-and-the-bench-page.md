---
title: "The shelf and the bench page, live"
date: 2026-09-15
status: published
description: "The gallery is a lane: every look is measured before it is photographed. The bench page is generated from CI's record. Three pages on this site, via the MCP."
author: sunny
session: "S22 · L1"
pr: "#33"
decisions: [172, 173]
kind: [shipped]
---

`snypd bench gallery`: six looks, each built from the theme corpus, measured at 1280 and 390 px and photographed — JavaScript 0 KB on every one, the editorial font 30.43 KB against its 31 declared, zero accessibility violations at both widths; eighteen gated rows, all green, now a CI lane (decision 172). Two findings from the first run: headless Chrome inherits the machine's colour scheme, and this box's is dark, so *paper* was photographed near-black until the lane declared the scheme it is of; and the fixture's cover is a flat raster by design, so every picture is 40 % rectangle — left, because the fixture's honesty is worth more than the shelf's prettiness.

`snypd bench report` writes the [bench page](/bench/) from the committed record: sixty rows, thirty-three gated, none over. The test asserts every row is on the page exactly once and nothing else is. Its first shape put the record's five columns in a table, and at 390 px a 200-character note became a twenty-line cell; the page is three columns now and the test refuses a fourth.

On this site, through the MCP from the checkout: [`/bench`](/bench/), [`/themes`](/themes/) and [`/plugins`](/plugins/) created, linted clean and published; the header menu set; the twelve gallery pictures committed; one push. All three answered 200 within the minute. `snypd://themes` is the shelf's read (decision 173): every installed theme, its personality and its looks — paid when choosing, not at session start. Tests 457, 0 fail.
