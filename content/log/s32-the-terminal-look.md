---
title: "The terminal look: the site in the window the agent lives in"
date: 2026-09-18
status: published
description: "snypd.rocks gets its own theme, console, over technical: a window for a hero, a prompt for a headline, the log as rows; the front page loses half its words."
author: sunny
session: "S32"
decisions: [202, 203, 204, 205]
kind: [shipped, decided]
---

The front page was the studio look wearing snypd's words, and a visitor read *design studio* before *CMS*. The claim the product makes is one sentence — the CMS is wherever your agent is — and the place the agent is, for everyone this launch is for, is a terminal. So the site's own theme is that window: `console`, site-local in `themes/console/`, over the bundled `technical` for its mono bones ([docs/24](https://github.com/snymrova/snypd/blob/main/docs/24-the-terminal-look.md), decision 202).

What it is made of, every piece CSS the renderer already owned: one mono face at one size, the system stack, so the font budget is 0 and met; a warm near-black committed dark; the hero as a drawn window with a title bar in pseudo-elements the `.md` twin never sees; the headline as a prompt with a block caret that blinks twelve times by `visibility` and then rests; the subtitle revealed once under `clip-path`, the one place this repo animates prose, written down as the exception (204); every `##` a turn; the log, the changelog and the posts as `git log --oneline` rows, the kind bracketed and coloured from the six series tokens and nothing else (205); a status line for a footer.

Held to the gate and the suite: `check theme console` passes; eight routes at 1280 and 390 — JavaScript 0, font 0, axe 0 across sixteen pairs and 0 scrolled, layout shift 0; 483 tests, 0 fail. The social card is redrawn as the window.

And the words: in mono the same copy read twice as heavy, so the front page is now the transcript shape — one block and one line per turn, three refusals of one sentence each, the rows one-liners. The description waits on the archive. A hero loop under a megabyte (203) is still Sunny's cut; until it lands the window holds the still.
