---
title: "Eleventy: Markdown and Footnotes"
description: Adding footnote support to markdown-it in Eleventy.
date: 2020-06-15
tags:
  - eleventy
  - web-development
---

The default Markdown plugin in the [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog) repo that I’m using as a basis doesn’t parse footnotes by default, so here’s a few notes on how I added support:

## markdown-it-footnote

[markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote) does what it says on the tin, adds footnote support to the [markdown-it parser](https://github.com/markdown-it/markdown-it) that was already in place. I added it to my project:

```bash
npm install markdown-it-footnote --save
```

In **.eleventy.js** I required it, and then told my Markdown library to use it:

```js
const markdownItFootnote = require("markdown-it-footnote");

…

let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownItAnchor, {
      permalink: true,
      permalinkClass: "direct-link",
      permalinkSymbol: "#",
    })
    .use(markdownItFootnote);
eleventyConfig.setLibrary("md", markdownLibrary);
```

## Styling the footnote link

That worked, except that it would render the footnote link with brackets, like: [1]. To change the output I had to override the `footnote\_caption()` method, using the [examples from the documentation](https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer). Note that the function in the module is `render_footnote_caption()` but it seems like the convention when overriding it is to drop the “render” part of that function name. So my override looks like this:

```js
markdownLibrary.renderer.rules.footnote_caption = (tokens, idx) => {
  let n = Number(tokens[idx].meta.id + 1).toString();

  if (tokens[idx].meta.subId > 0) {
    n += ":" + tokens[idx].meta.subId;
  }

  return n;
};
```

In full, my Markdown configuration looks like this:

```js
/* Markdown Overrides */
let markdownLibrary = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
})
  .use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
  })
  .use(markdownItFootnote);

markdownLibrary.renderer.rules.footnote_caption = (tokens, idx) => {
  let n = Number(tokens[idx].meta.id + 1).toString();

  if (tokens[idx].meta.subId > 0) {
    n += ":" + tokens[idx].meta.subId;
  }

  return n;
};
eleventyConfig.setLibrary("md", markdownLibrary);
```
