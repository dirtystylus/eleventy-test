---
title: Progressively Enhancing Progressive Enhancement
display_title: Progressively Enhancing Progressive Enhancement
description: Taking a second pass at a Lapham’s Quarterly feature.
date: '2014-11-09T19:06:28-05:00'
tags:
  - drupal
  - portfolio
  - technologys-betrayal
  - web-development
---
Last Friday I made a joke on Twitter about [progressively enhancing the progressive enhancement on a site](https://twitter.com/dirtystylus/status/530903263290589184)—turtles all the way down, ha ha. But in some ways I was being quite serious. One of the beautiful things about working on the web is that a site is never truly done, sometimes for worse but usually for the better. You can keep improving things iteratively, smoothing over the rough edges that may have existed at launch.

The *Essay* and *Voices in Time* articles on [Lapham’s Quarterly](http://laphamsquarterly.org) feature random artwork and quotes (random in a sense that they’re only tangentially related to the article). Every issue has an associated pool of artwork and quotes, and each time we load an article we dip into that pool and inject some artwork/quotes into locations specified by the content author. This worked fairly well, but it’s always bothered me that our first implementation relied on JavaScript. So if JavaScript wasn’t available, or somehow failed ([which we all know never ever happens, no no](http://adactio.com/journal/6022/))—you didn’t get the artwork. We justified that decision based on the fact that the artwork and quotes are an enhancement on the article—the article makes perfect sense even without the random elements.

But still: it felt like it warranted a second pass. I really like how Aaron Gustafson advocates for unobtrusive JavaScript in his book *[Adaptive Web Design](http://easy-readers.net/books/adaptive-web-design/)*:

> “Unobtrusive JavaScript is an idea that meshes perfectly with progressive enhancement philosophy because it forces JavaScript into the role of functional enhancement, as opposed to absolute requirement.”

So this past week we went back to work under the hood, pulling the JavaScript-reliant parts into a custom Drupal module. We did the same things we were doing on the client-side, except now we do them just *before* we render the page, using some new tricks we learned about selectively replacing markup after all Drupal modules have run. The result is a page that has all its artwork and quotes, even if JavaScript takes a nap. Most people (hopefully) won’t notice a thing, but I’m glad that we’ve continued to move towards a more accessible and inclusive site.
