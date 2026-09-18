---
title: "A specimen, not a photograph — the Desk, given a shape"
date: 2026-09-16
status: published
description: "The review page gains a shelf of every look drawn from its own tokens, a say-card that stays, and a strip; three stale lines that stopped an agent short go."
author: sunny
session: "S23"
pr: "#34"
decisions: [175, 176, 177]
kind: [shipped]
---

Three gaps on the Desk at `/_snypd`: what the other themes look like, what to say to an agent once the first-run card has gone, and what the agent reads before it writes.

**A shelf** (decision 175): every theme this root resolves times every look it ships, each a *specimen* drawn from that look's own tokens at request time — the site's own name in the look's heading face, a line of body, five swatches, its own colour scheme so a dark look paints dark on a light Desk. The gallery PNGs were the obvious tile and the wrong one: a picture of the fixture is not a picture of *your* site. Every other look carries the exact `theme › set` call, selectable — the switcher, and it lives in the harness. **A say-card** (176): one line per sentence in state order — publish a ready draft, open the review page, push when ahead, switch to a look that is not the active one — so the shelf and the card point at each other. **Three stale lines** (177): two prompts and the empty page still said *a human approves*, a session after publish became the default; an agent following them stopped one call short. A test now refuses the sentence.

Cost, measured before it shipped: one config load per look is 12–25 ms, six of them three times the page's budget, so the shelf is never gathered on a request — a rebuild schedules it, one look per macrotask, and a request serves the last whole set. CI's `desk.ttfb`: 1.92 ms. Tests 461, 0 fail.
