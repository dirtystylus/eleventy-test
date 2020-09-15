---
title: A New Home
description: Notes on this website release.
date: 2020-09-15
tags:
  - eleventy
  - web-development
---

Folks who follow me on Twitter know I’ve been muttering about a site rebuild for months, and I’ve been occasionally documented [the steps I’ve taken along the way](/tags/eleventy/). Building for the web is a funny business, though—if you want to, you can easily find a reason, any reason, to hold off flipping the switch and launching the thing. So this new site isn’t done, but it’s good enough.

For the past fourteen-plus years my personal site has lived at [dirtystylus.com](http://dirtystylus.com). It’s running on a MediaTemple Managed WordPress instance that isn’t easy to work with, both from a writing perspective as well as a maintenance one. Several months ago MediaTemple applied a WordPress update—a good thing for security, but it had the side effect of disabling some of my custom image layout code. Then, these last few weeks, I’ve seen increasing attempts to hack my admin user. Even I can take a hint.

## Building the thing

The genesis of this rebuild was a desire to track my reading at a deeper level. I took the [first steps towards this last year](http://dirtystylus.com/2020/04/17/visualizing-my-reading-with-semiotic/) that resulted in a [small dataviz project](https://reading-2019.markllobrera.com), but I wanted to actually give that content a [home on my site](/reading). I could have simply created a custom post type in WordPress, patched a few things, and kept going. But it also felt like a good moment to reflect on *how* I wanted to write. And frankly, the previous workflow was so full of friction:

* Draft a post in [Ulysses](https://ulysses.app)
* Push that to WordPress using Ulysses’ built-in functionality
* Open up the WordPress editor, wrestle with the Gutenberg WYSIWYG to fix the formatting for images and code blocks
* Publish the post

So: I love text-based systems, and I started to look at ways to just write Markdown files and publish those to HTML. I ended up looking at [Hugo](https://gohugo.io), [Gatsby](https://www.gatsbyjs.com), and [Eleventy](https://www.11ty.dev).

I’m also a dev, though, and [distraction was never far off](https://twitter.com/dirtystylus/status/1196911644150030336?s=20):

> Me, chatting to my teammate today: And that’s when I thought, why not do a headless Ghost CMS that publishes to Eleventy deployed on Netlify?
>
> At which point I stopped, and seriously considered writing HTML by hand and using SFTP to upload to a plain old server.

I settled on Eleventy because it *feels* light—there isn’t a ton of abstraction. Every post I write is a folder, for example: `a-new-home`. Within that is an `index.md` Markdown file, along with any images for the post. Because it’s just text and folders, everything is searchable at the file system level. And if I shift to a different tool in the future I don’t have to do a ton of exporting and data transformation. 

Plus: building in it is fun! It feels like the tooling is there just to support you, and it really feels optimized for front-end folks who want to focus on markup, CSS, and a little JavaScript. After years of wrestling with the overly-abstracted Drupal render chain you have no idea what how *free* I’ve felt. (If you’re interested in my dev notes, they’re collected under the [\#eleventy](/tags/eleventy) tag.)

The site is deployed to [Netlify](https://netlify.com), which is as close to “it just works” as you can get these days.

## What’s next?

So much! This site is quite deliberately *un*-designed at present. It’s so minimal I didn’t even hook up Sass—I wrote vanilla CSS for the first time in forever. 

I think I’m going to keep on working on the typography, and then start to work on how I want to present sets of photos.  

I’m still trying to figure out how to do custom taxonomies with Eleventy. Once I figure that out I hope to put up some project work here. If someone out there knows how to have multiple tag vocabularies, scoped to specific custom post types, *please please please* let me know.

I’m also trying to figure out a new workflow: I typically write in Ulysses, but that doesn’t play so nicely with a repo of files—image references don’t work well unless you’re working off Ulysses’ local database. So I’m writing this in IA Writer right now[^1], and it feels like it has the best balance of file/folder support as well as lightly-opinionated Markdown. (If Ulysses skews a bit towards the Microsoft Word philosophy of things, IA Writer feels more like WordPerfect.)

What about [dirtystylus.com](http://dirtystylus.com)? Right now I think I’m going to keep that site running just long enough to migrate all my content and make sure anyone linking to that site ends up at the right place, because link rot stinks.

In the meantime, I’ve cleared out just enough space and clutter to enjoy writing and working on my site again, and that’s a great feeling. I’m glad you’re here.

[^1]: I’m also going to have to figure out how I can publish from my mobile devices.