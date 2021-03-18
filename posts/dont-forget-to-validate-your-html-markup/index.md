---
title: Don’t Forget to Validate Your HTML Markup
display_title: Don’t Forget to Validate Your HTML Markup
description: Validate to save a life.
date: 2019-09-05T16:54:57-04:00
tags:
  - technologys-betrayal
  - web-development
---
I recently ran into a puzzling situation where Google was properly indexing a WordPress site on a structural level, but ignoring the hand-crafted meta description folks had entered via the [Yoast SEO plugin](https://yoast.com/wordpress/plugins/seo/).

Turns out our Twig markup contained two description meta tags, one created by Yoast and one that was probably leftover boilerplate from the skeleton theme we were using. We stripped out the redundant meta tag, submitted the site for re-indexing, and Google picked up the proper meta descriptions.

Taking a minute to [validate your markup](https://validator.w3.org) can help avert silly head-scratchers.
