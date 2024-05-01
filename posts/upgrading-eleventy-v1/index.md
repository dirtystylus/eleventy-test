---
title: Upgrading to Eleventy 1.0.1
display_title: Upgrading to Eleventy 1.0.1
description: If it ain’t broke, clearly you gotta fix it.
date: '2024-05-01T13:32:44.389-04:00'
tags:
  - eleventy
  - web-development
---

With Eleventy 3.0 on the horizon I decided to finally see what the upgrade process is like by taking my site from 0.12 to 1.0. Eleventy has a handy [eleventy-upgrade-help plugin](https://github.com/11ty/eleventy-upgrade-help/tree/v1.x) which made this relatively painless. I only ran into a few small issues which I’m noting here.^[Mostly for my future self’s sake.]

## Markdown Paired Shortcode

I had previously used a paired shortcode to return inline Markdown, which I use for post titles/descriptions in front matter that need some styling on render, as in [this post](/posts/updating-letterboxd-to-markdown-esm/). The shortcode looked like this:

```js
eleventyConfig.addPairedShortcode(
	"markdown",
	(data) => {
		if (data) {
			return markdownLibrary.renderInline(data);
		} else {
			return "";
		}
	}
);
```

and in my Nunjucks templates I would do something like:

```twig
{% raw %}<p>{% markdown %}{{ post.data.description }}{% endmarkdown %}</p>
{% endraw %}
```

When running a build Eleventy would throw an error—my guess is that the paired shortcode is more expensive, resource-wise, than a filter. So I’m doing this instead:

```js
eleventyConfig.addFilter("markdownInline", function (data) {
	if (data) {
		return markdownLibrary.renderInline(data);
	}
	else {
		return "";
	}
});
```

and in my template I have:

```twig
{% raw %}<p>{{ post.data.description | markdownInline | safe }}</p>
{% endraw %}
```

## Images Responsiver

I use Nicolas Hoizey’s [Images Responsiver plugin](https://github.com/nhoizey/eleventy-plugin-images-responsiver) for post images and galleries.^[I’ve written about my specific configuration [here](/posts/eleventy-images-responsiver/) and [here](/posts/eleventy-building-image-gallery-photoswipe/)]. I have some hook overrides and had to modify how I retrieved CSS class names from an element’s `classList`.

For some reason this was returning undefined:

```js
link.setAttribute("data-size", figure.classList[0]);
```

so I switched to this:

```js
link.setAttribute("data-size", ...figure.classList);
```

Not sure why, either. Printing out the element said the classList was a [DOMTokenList](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList) but it wasn’t behaving like one.

## V2/V3?

I’m on the fence on whether to do an in-place upgrade to V2 or V3 (when it’s released)—I’m working off a fork of [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog) and I’ve modified it so much that it feels like a fresh start might be worth it.