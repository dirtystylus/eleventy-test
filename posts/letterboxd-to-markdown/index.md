---
title: Syncing Letterboxd Data to Markdown Files
display_title: Syncing Letterboxd Data to Markdown Files
description: Owning my Letterboxd data.
date: '2023-03-21T14:27:09.974-04:00'
tags:
  - film
  - eleventy
---

![A grid of thumbnails for movies](watching-grid.jpg "My film viewing log"){data-responsiver=cinemascope}

About two years ago I used [Xavi Benjamin’s handy blog post](https://xavibenjamin.com/2020/07/create-a-film-diary-with-eleventy-and-letterboxd/) display my [Letterboxd diary info](https://letterboxd.com/dirtystylus/) on my Eleventy site. At the time [I said](https://twitter.com/dirtystylus/status/1351214808956350471):

> Why use Letterboxd instead of building it into my own site, like my reading log? Letterboxd is actually nice to use, for one, whereas Goodreads being terrible is why I decided to roll my own
> 
> (I also thought that Letterboxd had a public API and I could pull it into my Eleventy build process if need be, but it looks like API access is still in Beta)

Well, the idea of being able to keep that data locally on my site never left my brain.[^1] It was nice to dynamically source the data at build time, but Letterboxd’s RSS feeds top out at 50 items, so I couldn’t display an ever-growing log. Plus it felt important to view Letterboxd as an outlet for my information, not the sole keeper of it. So a few weekends ago I rolled up my sleeves and put together a small CLI utility. I already had some useful data scraping bits in another CLI tool that I use to prep my reading log, so I combined that with a fork of the [**`letterboxd`**](https://www.npmjs.com/package/letterboxd) package. I ended up [forking](https://github.com/dirtystylus/letterboxd) **`letterboxd`** for two reasons:

* I needed the CJS version, and the last release of **`letterboxd`** switched to ESM
* I needed to add a method to return the diary entry as Markdown

## letterboxd-to-markdown

The result is here: [**`letterboxd-to-markdown`**](https://github.com/dirtystylus/letterboxd-to-markdown). The script installs a `letterboxd` command that does one thing: fetches the RSS feed for a Letterboxd account and converts the diary entries to Markdown files, with a folder for each film. That alone would be pretty useful from an archival standpoint, but the next step was integrating it into my site.

## Using this with Eleventy

My personal usage is pretty simple: I copied the approach of my hand-built [reading log](https://www.markllobrera.com/posts/book-grid-iterations/), and at the root level of my Eleventy site I created a folder called **`watching`**, with a **`watching.json`** file that defines a content type `film`. I set this as the output directory for `letterboxd-to-markdown`. When I run `letterboxd` it fills my **`watching`** directory with the folders of all my films.

![A folder filled with subfolders of film information](watching-folder.jpg)

Within my **`.eleventy.js`** file I define a `watching` collection that aggregates all of those film folders and also gives me sub-groupings by [year](/watching/years/). If you’re interested in the code details my site  is on [Github](https://github.com/dirtystylus/eleventy-test).[^2]

## Build

To automate the process further I added an entry in my **`package.json`** file to run `letterboxd` before doing an `eleventy` build:

```json/5
"scripts": {
  "build": "eleventy",
  "watch": "eleventy --watch",
  "serve": "eleventy --serve",
  "debug": "DEBUG=* eleventy",
  "film": "letterboxd rss -a dirtystylus && eleventy"
},
```

## Next Steps

I suppose I could turn this into an actual Eleventy plugin? If there’s anyone who can help me with that, please reach out on [Mastodon](https://mastodon.social/@markllobrera) or [Twitter](https://twitter.com/dirtystylus).

[^1]: Ethan Marcotte said [“let a website be a worry stone”](https://ethanmarcotte.com/wrote/let-a-website-be-a-worry-stone/).
[^2]: Yes, it’s called `eleventy-test`. Sometimes you just run with a thing that’s working.