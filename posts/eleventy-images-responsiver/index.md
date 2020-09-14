---
title: "Eleventy: Images Responsiver"
description: Refining my responsive images approach with Nicolas Hoisey’s Images Responsiver plugin.
date: 2020-06-29
tags:
  - eleventy
  - web-development
---

One of my favorite things is writing and sharing things, and getting feedback from folks. I tweeted out the [last post on Paired Shortcodes and responsive images](http://dirtystylus.com/2020/06/16/eleventy-paired-shortcodes-and-markdown-rendering/), and heard back from [Nicolas Hoisey](https://nicolas-hoizey.com), who mentioned the work he’s been doing on the [Eleventy Images Responsiver](https://nhoizey.github.io/eleventy-plugin-images-responsiver/) plugin. I liked some of the design decisions behind the plugin, so I decided to give it a shot on my in-progress site.

Here’s some things I learned in short order:

- Picture is not recommended for image markup unless you’re doing [art direction changes or switching file types](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/)
- Markdown-it has support for additional attributes via [markdown-it-attrs](https://www.npmjs.com/package/markdown-it-attrs)

## Adding markdown-it-attrs to your Markdown Library config

I can’t remember if I had to install **markdown-it-attrs** separately, or if it’s included as a dependency of Images Responsiver. Here’s how I required it and added it to my Markdown library config in **.eleventy.js**:

```js
const markdownItAttrs = require("markdown-it-attrs");

let markdownLibrary = markdownIt({
  html: true,
  breaks: true,
  linkify: false,
  typographer: true,
})
  .use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
  })
  .use(markdownItFootnote)
  .use(markdownItAttrs);

markdownLibrary.renderer.rules.footnote_caption = (tokens, idx) => {
  let n = Number(tokens[idx].meta.id + 1).toString();

  if (tokens[idx].meta.subId > 0) {
    n += ":" + tokens[idx].meta.subId;
  }

  return n;
};
eleventyConfig.setLibrary("md", markdownLibrary);
```

## Using Images Responsiver

Nicolas [made the case](https://twitter.com/nhoizey/status/1273012226992078848) that leaving the syntax as close to Markdown as possible was preferable to an Eleventy-specific Paired Shortcode, which is something that [I had been mulling about recently](https://twitter.com/dirtystylus/status/1272647229992509440).

Implementing Images Responsive was relatively straightforward, although there were a few things that I missed in my first implementation pass that Nicolas was kind enough to point out. I focused on three components: adding the plugin to my setup, setting configuration in a separate file, and then adjusting my Markdown code to work with the plugin.

### In **.eleventy.js**

I require the plugin and pass in the configuration file as a param:

```js
const imagesResponsiver = require("eleventy-plugin-images-responsiver");

…

const imagesResponsiverConfig = require("./src/utils/images-responsiver-config.js");
eleventyConfig.addPlugin(imagesResponsiver, imagesResponsiverConfig);
```

You can see that I’ve specified a separate file **images-responsiver-config.js** just to keep all the config info separate from **.eleventy.js**.

### In **images-responsiver-config.js**

I didn’t do much in this file. I changed the `runAfterHook()` method to use the markdown-it method `renderInline()` so that the caption wouldn’t be wrapped in a paragraph tag:

```js
const runAfterHook = (image, document) => {
	let imageUrl =
		image.getAttribute("data-pristine") || image.getAttribute("src");
	let caption = image.getAttribute("title");
	if (caption !== null) {
		caption = md.renderInline(caption.trim());
	}

…

};
```

For my default preset I specified a different inline function for `resizedImageUrl`:

```js
default: {
	sizes: "(min-width: 650px) 850px, 400px",
	attributes: {
		loading: "lazy",
	},
	resizedImageUrl: (src, width) => `${src}?nf_resize=fit&w=${width}`,
	runAfter: runAfterHook,
},
```

This allowed me to use [Netlify Large Media](https://www.netlify.com/products/large-media/) and its dynamic image resizing URL pattern. By default Images Responsiver is configured with the assumption that different image derivatives will be generated at build time using a gulp task (or similar).

### In a Markdown file

If I want to use a **cinemascope** preset that I’ve defined in **images-responsiver-config.js**, I can use **markdown-it-attrs** to pass in a `data-responsiver` attribute:

```md
![Trees bathed in fog](/img/DSCF1431.jpg "Testing *Markdown* **captions**"){data-responsiver=cinemascope}
```

Which generates this markup:

```html
<figure class="cinemascope">
  <img
    src="/img/DSCF1431.jpg?nf_resize=fit&w=640"
    alt="Trees bathed in fog"
    title="Testing *Markdown* **captions**"
    class=""
    srcset="
      /img/DSCF1431.jpg?nf_resize=fit&w=320   320w,
      /img/DSCF1431.jpg?nf_resize=fit&w=560   560w,
      /img/DSCF1431.jpg?nf_resize=fit&w=800   800w,
      /img/DSCF1431.jpg?nf_resize=fit&w=1040 1040w,
      /img/DSCF1431.jpg?nf_resize=fit&w=1280 1280w
    "
    sizes="(min-width: 650px) 850px, (min-width: 1000px) 1200px, 400px"
    data-pristine="/img/DSCF1431.jpg"
    loading="lazy"
  />
  <figcaption>Testing <em>Markdown</em> <strong>captions</strong></figcaption>
</figure>
```

So: I’ve got support for alt text, Markdown captions, and Netlify Large Media, using syntax that is mostly standard Markdown (save for the extended data attribute). Not bad.

Many thanks (again) to Nicolas Hoisey, who created the plugin and was super generous with helping me through these implementation questions.
