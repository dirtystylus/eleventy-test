---
title: Netlify Large Media and Eleventy
display_title: Netlify Large Media and Eleventy
description: Some links that helped me figure out image derivatives with Eleventy and Netlify.
date: 2020-01-27T17:29:00-04:00
tags:
  - eleventy
  - netlify
  - web-development
---


I’m still doing early prototyping for the next iteration of this site, trying out different technical aspects. Eleventy doesn’t have any official image-handling plugins yet (from my research it seems like folks tend to integrate external tooling to make that happen), so for the past several months I’ve procrastinated on that front, instead trying to figure out custom post types and taxonomies.

Phil Hawksworth has set up a very helpful guide to how Netlify Large Media can help create different image derivatives: [“Netlify Large Media and the picture element”](https://example-nlm-picture.netlify.com).

This all sounded very good, so the next step was to figure out how to configure Netlify Large Media. I started with the official docs, but kept running into a cryptic error when pushing my repo up to my remote: `git: 'credential-netlify' is not a git command. See 'git --help'.`

Luckily, Piper Haywood published a thorough write-up of her experiences: [“Configuring and troubleshooting Netlify Large Media”](https://piperhaywood.com/configuring-and-troubleshooting-netlify-large-media/), including some workarounds for dealing with the “not a git command” error I was getting:

> The current Netlify Large Media documentation says that after running netlify lm:install, “you will be presented with a custom command to run in order to use Netlify Large Media in your shell. Copy and run this command.” 
> …
> Running the source ... command added the Netlify credential helper executables to the $PATH and didn’t return any output. Note that it is added for the current shell only. *This is relevant for troubleshooting the “not a git command” error covered below*.

That did the trick — after reinstalling using `netlfy lm:install`, I ran `source /Users/[username]/.netlify/helper/path.zsh.inc` and when I pushed up to my remote it told me which images had been flagged for NLM to deal with.

Many thanks to Piper, who took the time to write things up. When I say “I fell in love with a blog post today”, [I’m not kidding](https://alistapart.com/column/write-what-you-know-now/).

After [I posted about this on Twitter](https://twitter.com/dirtystylus/status/1220024146568019969), Jérôme Coupé sent me his post for how he generates derivatives as part of the build process: [“Blazing fast image transforms with Sharp and Gulp”](https://www.webstoemp.com/blog/blazing-fast-image-transforms-with-sharp-gulp/), which might be helpful for folks (especially if you’re not deploying to Netlify).