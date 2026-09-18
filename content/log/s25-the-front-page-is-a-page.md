---
title: "The front page is a page, and a clip is a figure"
date: 2026-09-16
status: published
description: "home: true on a page puts it at / under a sixth layout, the list moves to /posts/, and an .mp4 in a figure is a video with a poster. Nothing autoplays."
author: sunny
session: "S25"
decisions: [180, 181, 182]
kind: [decided]
---

**The front page is a page** (decision 180). A page whose frontmatter says `home: true` is served at `/`, under a sixth `base` layout — the page's body, the newest six posts, a link to the rest — and the list moves to `/posts/`; a site without one is byte-for-byte what it was. The route is decided where routes are listed, from the file's own frontmatter, so every reader of a route — the build, the query tool, the preview, a menu `ref`, the dead-link rule, an IndexNow ping — says `/`. Two pages that ask: the first by path holds `/`, the second is lint rule 14, never a build that throws.

**A clip is a figure** (181): `.mp4` and `.webm` render as a video with controls, a poster sized from the media index, no lightbox, nothing autoplaying. **A token count is exact** (182): the learn surface grew by 52 tokens for one `poster` prop and the word *clip*, over the 80 % line and under the budget — and a count has no runner noise, so the budget is the line.

Checked through the compiled binary, the fixture copied to a directory with no `themes/`: `/` is the front page, `/posts/` the list. Found on the way: a YAML scalar with a colon in it parses to nothing in both frontmatter readers and lint said nothing about the frontmatter being gone — rule 0 owes a diagnostic. Tests 468, 0 fail.
