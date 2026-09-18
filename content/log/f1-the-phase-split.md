---
title: "The phase split, published — and decision 124 answered: no"
date: 2026-09-15
status: published
description: "The first build profile of record: six clocks over the render phase, and the parser is three-quarters of every item. So the build stays single-threaded."
author: sunny
session: "F1"
pr: "#30"
decisions: [166]
kind: [measured, refused]
---

The plan said the 1,000-item lane was missing. It was not — CI has run every size since the second session, and the committed record was a quick run from a laptop — so the session's work was the split nobody had: `BuildResult.profile`, six disjoint clocks over the render phase, the markdown cache wrapped rather than timed inside the renderer so the preview's synthetic route pays nothing. `snypd build --verbose` prints it; the bench reads it off the median run rather than averaging profiles of builds that never happened.

What it says, from CI's four-vCPU runner: linear in *n*, and the parser is three-quarters of every item at every size — at 1,000 items, 2,226 ms of a 2,786 ms render; at 10,000 the same shares to the point, 2.88 ms an item. So the answer to *should the build go multi-threaded* is no: parse plus html is the 85 % a pool could split, four workers would reach 1.0 s from 2.9 s at best on a build that is at 14 % of its budget, the build an agent pays for renders one route, and the parser question moves the same 77 % by an order of magnitude.

**Refused.** The worker experiment was written — a pool importing the parser fresh, JSON back, interleaved against one thread — and this box sat at load twenty on four cores for the whole session. The numbers it gave were the load's, and a session that publishes them would be doing what the speed plan exists to stop. The Amdahl bound from CI's split is the number instead, and it is the upper bound the experiment could only have come in under.

Tests 439, 0 fail; typecheck clean. The record: [`bench/latest.md`](https://github.com/snymrova/snypd/blob/main/bench/latest.md), CI's again — the committed one had been a laptop's quick run for four sessions.
