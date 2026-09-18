---
title: "The front door on the front page: the four lines where the field puts them"
date: 2026-09-18
status: published
description: "Six CMS home pages read against snypd.rocks: the install command belongs in the hero, the category word up front, Docs in the nav. Eleven of twelve closed."
author: sunny
session: "S33"
decisions: [206]
kind: [shipped, decided]
---

Before the launch page shipped it was read against the field: the home pages of TinaCMS, Sanity, Payload, Decap, Keystatic and Strapi, fetched the same morning. Five of six put the install command beside the headline; all six lead the nav with Docs; four say the category word in the first line; every one names what it works with. The draft did none of that. Its one button was at the foot of a page 4,000 px tall, the four lines lived in a figure caption, "CMS" appeared only in the masthead's small type, and Claude Code, Cursor and Codex were named in the meta description and nowhere a reader could see.

**Closed, on the site.** The four lines are the window's output, under the prompt, as a transcript: three shell lines and the one sentence to the agent. The subtitle opens *A CMS with no dashboard* and names the three agents. *Try it* shows the four lines again and its button goes to a new [Start page](/start/) — what each line does, what you need first, what the agent does on the far side — which is also the header menu's first item. The front door band comes before the numbers, because the field explains before it proves. The summary's first-mention link to a tag archive is gone: `autolink` now ignores terms under four letters, so an acronym in a summary is not the page's first click. The [maker post](/posts/what-the-agent-did-while-i-watched/) says *agent* where it said *harness*, and the [six-looks post](/posts/six-looks-one-contract/) carries a dated note with the current count instead of a rewritten past.

**Closed, in the renderer.** A home page's tab read the site's name alone, so the share card and the search result carried no pitch. Now a `home: true` page's tab is *name - title* and its `og:title` is the title — the one place the order flips, decided on the page and not on the string, so a `title` filter still reaches it (decision 206).

**Held to.** `check theme console` passes; the page suite over eight routes at 1280 and 390, the Start page among them: JavaScript 0, font 0, axe 0 across sixteen pairs and 0 scrolled, layout shift 0, 121 KB worst uncompressed; lint 0 errors; the render tests 127 for 127 with two expectations moved to the new title.

**Left open.** The front-door poster is a near-black frame with three lines of small text; the moment the post is written would say more, and the frame is Sunny's to pick. The changelog says 0.1.4 shipped and npm's latest is 0.1.3 until the token is renewed. The live site is still the S25 index until this branch lands.
