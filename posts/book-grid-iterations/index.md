---
title: Book Grid Variations
display_title:
description: Fine-tuning the grid in my Reading log.
date: 2020-09-21
tags:
  - css
  - eleventy
  - web-development
---

One of the earliest seed ideas for this project was how to create my own personal reading log. I’d often been asked whether I tracked my reading on Goodreads, and my reply is always the same: that site makes me break out in hives. It feels like the books are buried under so much visual noise.

Instead, I took inspiration from Mandy Brown’s [A Working Library](https://aworkinglibrary.com) and Winston Hearn’s [personal site](https://www.winstonhearn.com/read/). You can probably see the bits I’ve borrowed from their own systems.

I’d played around with CSS Grid before, but this was my first time using it on a project. Once I got around the basics and discovered `minmax()` things came together quickly at the macro level—I was able to quickly make a grid that would adjust for a wide range of viewports.

## “This content has been resized to fit your screen”[^1]

Sizing the book images is where I ended up spending the most time. I decided that I wanted to try and keep the baseline consistent so that I wouldn’t get weird alignment issues with the metadata under the book covers. Book covers, however, aren’t uniformly sized. I batch-resized mine so that they all had the same height, with variable widths. I then decide that I would live with some cropping in exchange for consistent sizing. Here’s my attempt (`book-thumb` is a class on the cover `<img>` element):

```css
.bookslist-item .book-thumb {
  max-width: 100%;
  width: 100%;
  height: 100%;
  max-height: 245px;
  min-height: 220px;
  object-fit: cover;
  object-position: top;
}
```

This is…ok. It’s what shipped with v1.0 of my site. Here’s a look:

![Grid layout of books, with each book consistently-sized but with cropping on some items.](object-fit-cover.jpg "Using `object-fit: cover`"){data-responsiver=cinemascope}

Note that while this keeps all the books nicely aligned on the baseline, it also has a side effect. Look at the way the covers are cropped for *The Warmth of Other Suns* and *They Called Us Enemy*, in particular. Bits of the cover have gotten sliced off the left and right edges, and in the latter case the cover is cropped to the point that the title is getting cut off.

## Saving the covers

Clearly I wouldn’t leave this alone, so after I launched the site I went back to the grid. I did a little more reading on `object-fit`. This post on CSS Tricks by [Lari Maza](https://twitter.com/larimaza), “Fluid Images in a Variable Proportion Layout”, was particularly helpful. I decided to use `object-fit: contain` instead of `cover`:

```css
.bookslist-item .book-thumb {
  max-width: 100%;
  width: 100%;
  height: 220px;
  object-fit: contain;
  object-position: bottom;
}
```

The result is…better? I still have the baseline consistency, and I’m not bothered by the variable heights—that’s kind of what you see on a physical bookshelf, anyway. Best of all, I’m no longer cropping parts of the book covers:

![Grid layout of books, with each book scaled to fit within a set pixel value for height.](object-fit-contain.jpg "Using `object-fit: contain`"){data-responsiver=cinemascope}

## Sizing up the covers

At the widest responsive breakpoint (65em) I wanted to increase the size of the book covers. In the grid above you see six books per row, but they also felt a little bit small, especially when I have a little more space to stretch out. The original grid for the books list is contained in a CSS variable, `--grid--books--list--wide`, set to a minimum grid cell width of `120px`:

```css
--grid--books--list--wide: repeat(auto-fit, minmax(120px, 1fr));
```

I switched that to a more expansive minimum size of `160px`:

```css
--grid--books--list--wide: repeat(auto-fit, minmax(160px, 1fr));
```

This brought the number of books per row down to five, but the covers feel a bit larger and more balanced relative to the text details below.

![Grid layout of books, with five books per row.](books-grid-wide-1.jpg "Books List Grid, 160px per cell"){data-responsiver=cinemascope}

Just for kicks I tried a grid that results in four books per row:

![Grid layout of books, with five books per row.](books-grid-wide-2.jpg "Books List Grid, 180px per cell"){data-responsiver=cinemascope}

I like the presence this gives the covers, but on a smaller laptop screen you can really only see one full row of books, and the visual rhythm starts to feel too short—when scanning a row it feels like the eye runs of out books too quickly, which makes it seem like you’re viewing the grid on a more cramped viewport. This is all highly subjective, and I feel like if I were a trained designer I might be able to better articulate why bigger isn’t necessarily better.

## Type matters

I’m still tweaking the typographic balance for the book details underneath the covers — this is trickier and I’m trying to balance making the text big enough to comfortably read, without making it so big that longer titles wrap to several lines. One thing I liked about the largest cover variation above was that it helped solve a lot of the typography issues—I felt like I could size up titles, for example, without having them run more than two lines.

The launch-day type on the grid was perhaps too large, note how *Fear of Falling* wraps to three lines:

![Zoomed in look at the text details under the book covers, with one title wrapping to three lines.](books-grid-typography-1.jpg)

I nudged the type down about `0.25–0.5em` for each item, and spaced out the “Finished” date to get some rhythm in there:

![Book detail type under covers, with smaller type and less wrapping.](books-grid-typography-2.jpg)

This feels a bit better, even if I wish I could make the titles just a *bit* larger. I’m giving it a rest for now, onward to the individual book layout!


[^1]: I sometimes think of the switchover to 16:9-ratio HD resolutions in tvs, and how prior to that one of the “responsive” solutions to presenting movies on 4:3-ratio tvs was to [“pan and scan”](https://en.wikipedia.org/wiki/Pan_and_scan).

