---
title: "What the writes lane found, and what fixed it"
date: 2026-09-15
status: published
description: "Three models at the keyboard, twenty topics each, twice: every first failure was a prop the index does not carry, and six reads took Sonnet from 0.60 to 0.95."
author: sunny
session: "S21"
pr: "#32"
decisions: [169, 170, 171]
kind: [measured]
---

Three records from this box, none of them clocks — a model at the keyboard is a record, not a test (decision 170). The kill test with Haiku, Sonnet and Opus each driving the scripted scenario: every check green three times, with a check per plugin tier now inside it; the learn surface on the site the test leaves at 5,654 tokens against a budget of 6,000, exact (decision 169).

The `write-post` lane, twenty topics per model, run twice on the same prompt fix: pass rates Haiku 0.40 → 0.70, Sonnet 0.60 → 0.95, Opus 0.95 → 0.95, against a target of 0.8. Every first-run failure on the two smaller models was a prop the primitives *index* does not carry — flow steps without `do:`, diagram bodies that were prose, stat sources that were a repo path or nothing. Opus had read every planned primitive's sheet before its first create; the other two had read the index and stopped. The fix is a sentence in the prompt (decision 171): read each primitive's sheet, one read each, because the index names them and the sheet is what lint checks. After it, reads before the first create go to six or seven for every model and the pass rates follow, at a cost of 20 k tokens a post on the two that were not reading.

The suggest corpus grew from twenty to fifty posts and found four detector faults in one morning; precision held at 1.0 through all four. Sixty agent runs cost $8.17. Tests 453, 0 fail.
