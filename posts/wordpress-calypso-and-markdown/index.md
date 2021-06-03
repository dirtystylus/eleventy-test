---
title: WordPress Calypso and Markdown
display_title: WordPress Calypso and Markdown
description: 'A test post using the new WordPress desktop application, Calypso.'
date: '2016-01-04T22:35:27-05:00'
tags:
  - technologys-betrayal
  - wordpress
---
I’m writing this using the new [WordPress desktop application](https://developer.wordpress.com/calypso/), dubbed “Calypso”. It was announced in the leadup to WordCamp US 2015, but I’ve only just started to test out a few things. So far it seems like a step in the right direction—I forget when I stopped using a dedicated desktop app to publish to my blog (maybe with MarsEdit?). I tried it a bit with Byword but that converted my Markdown text to the rendered HTML on publish, IIRC. So I’ve mostly drafted my posts in Byword, then copied them over to the WordPress web editor (which recognizes and preserves Markdown if you’ve got Jetpack installed).

In Calypso the Markdown support so far is a bit…quirky. In v 1.2.1 (using the Visual Editor) it seems to matter if I start a new line by simply hitting Return, versus if I hit Shift+Option+Return. If I use the latter it seems to leave the Markdown syntax intact but render it correctly as HTML when the post is viewed. But if I simply hit Return and start typing Markdown syntax, what I’ve observed is:

- Header syntax (## blah blah) gets converted to the HTML header equivalent after you hit return.
- List syntax (\* item) gets converted to an HTML unordered list as soon as you hit space after the asterisk.

So it looks like there’s some client-side Markdown conversion in place, but you can bypass it by hitting Shift+Option+Return to generate the line break *before* the Markdown text. Not sure if any of that’s been documented anywhere, or if the behavior is even intentional. (I couldn’t find release notes. *Shrug*.)
