---
title: Updating letterboxd-to-markdown to ESM
display_title: Updating **`letterboxd-to-markdown`** to ESM
description: CommonJS to ESM.
date: '2024-03-11T09:59:54.102-04:00'
tags:
  - film
  - eleventy
  - web-development
---

Updated my [**`letterboxd-to-markdown`**](https://github.com/dirtystylus/letterboxd-to-markdown) [CLI script](/posts/letterboxd-to-markdown/) last week to use ESM, mostly so I could open a [pull request](https://github.com/zoetrope69/letterboxd/pull/188) of my [fork of letterboxd](https://github.com/dirtystylus/letterboxd) to add a markdown review method.

The syntax has changed a bit, the main command is now `letterboxd diary [account name]` (previously `letterboxd diary -a [account name]`).

The slow move from CommonJS to ESM is confusing, to say the least. Modules that have been updated to support ESM often have documentation that is CommonJS-centric, and most of the blog posts out there are the same. So…lots of trawling through Github issue queues to find workarounds.

