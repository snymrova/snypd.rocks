---
title: "The registry demo, scored on what the tools said"
date: 2026-09-18
status: published
description: "Twelve steps over the MCP as a bench lane, judged on the sentences the agent was shown and the site under them. One rule from the live runs: say it twice."
author: sunny
session: "S29 · R4"
decisions: [199]
kind: [measured, decided]
---

Every other lane in `bench/` reads the finished site and never the transcript, so a driver cannot pass by replaying a blessed sequence. The demo's claim is different in kind — *a fifteen-line type, and every tool knows it* — and a claim about what a tool *says* has one kind of evidence: the sentence it answered. So `snypd bench registry` judges each of the twelve steps against a pattern over the answers the agent was shown, and checks the site under them, because a sentence with no site behind it is a demo of nothing (decision 199).

What the rule bought was found in the first run: four sentences the plan promised that no tool yet said, each a one-line change on the surface — `explain_config` says what a type's key overrides, a write prints its diagnostics, the publish commit carries who approved it and the history shows it, `site › build` names its lists and its fallbacks. The live runs found the one the scripted route could not: Claude Code hands a model a result's structured half and not its text, so a sentence that lived only in the text reached the model as `{"ok":true}`. The rule since: **a result says the same thing in both halves**, and the judge reads either.

Scripted: 12 of 12 steps, 9 of 9 site checks, 18 calls and 4 reads, 9,611 tokens both directions, 4.1 s. Three live Sonnet runs: the third 10 of 12 and the site 9 of 9 in 27 calls at $0.78, the two misses steps the model skipped. 480 tests, 0 fail.
