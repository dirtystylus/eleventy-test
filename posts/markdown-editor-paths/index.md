---
title: Markdown Editors and Eleventy
description: Testing image paths and Markdown editors
date: 2020-06-22
layout: layouts/post.njk
--- 

This is a test of how different Markdown editors handle local images. Using a central images directory proved to be problematic because the source and destination folder structure ended up being different. Taking a cue from Nicolas’ [comment](https://github.com/11ty/eleventy/issues/976#issuecomment-611398178) I decided to have the source and destination follow the same structure, basically creating a new folder for each post, and having the post within that folder be **index.md**

I had to add image types (jpg/gif/png) to the templateFormats` definition within Eleventy so that they would be published to the same folder as my Markdown files.

![A grid of Lego™ computer bricks](lego-computers.jpg "Lego™ computer bricks through the years")