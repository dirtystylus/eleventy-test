---
title: "Eleventy: Images Responsiver Markup"
description: Tweaking Images Responsiver for figure element markup.
date: 2020-07-21
tags:
  - eleventy
  - web-development
---

A quick follow-up on my [previous post on Nicolas Hoizey’s Images Responsiver plugin](http://dirtystylus.com/2020/06/29/eleventy-images-responsiver/): I noticed that the markup it generated was wrapping a `<p>` tag around `<figure>` elements. For example:

```twig/0,7
<p>
	<figure class="cinemascope">
		<img src="/img/DSCF1431.jpg?nf_resize=fit&amp;w=640" alt="Trees bathed in fog" title="Testing *Markdown* **captions**" class="" srcset="/img/DSCF1431.jpg?nf_resize=fit&amp;w=320 320w, /img/DSCF1431.jpg?nf_resize=fit&amp;w=560 560w, /img/DSCF1431.jpg?nf_resize=fit&amp;w=800 800w, /img/DSCF1431.jpg?nf_resize=fit&amp;w=1040 1040w, /img/DSCF1431.jpg?nf_resize=fit&amp;w=1280 1280w" sizes="(min-width: 650px) 850px, (min-width: 1000px) 1200px, 400px" data-pristine="/img/DSCF1431.jpg" loading="lazy">
		<figcaption>
			Testing <em>Markdown</em> <strong>captions</strong>
		</figcaption>
	</figure>
</p>
```

Now, `<img>` is an inline element, so I’d expect that it would be wrapped in a paragraph tag. But `<figure>` is a block-level element, so I wanted a way to clean up that markup.

Within my **images-responsiver-config.js** file I noticed that the `runAfterHook()` method is where we check whether there’s a caption. If there’s a caption, the markup is generating using a `<figure>` element with a `<figcaption>` nested within, otherwise it defaults to a regular `<img>` tag. This is the section that actually swaps in the `<figure>` markup:

```js
if (caption || zoom) {
  const figure = document.createElement("figure");
  figure.classList.add(...image.classList);
  // TODO: decide weither classes should be removed from the image or not
  image.classList.remove(...image.classList);
  let figCaption = document.createElement("figcaption");
  figCaption.innerHTML =
    (caption ? caption : "") +
    (zoom
      ? `<p class="zoom">&#128269; See <a href="${imageUrl}">full size</a></p>`
      : "");
  figure.appendChild(image.cloneNode(true));
  figure.appendChild(figCaption);

  image.replaceWith(figure);
}
```

I changed the last line to check whether the `image` element was wrapped in a paragraph tag:

```js
if (image.parentNode.nodeName === "p") {
  image.parentNode.replaceWith(figure);
}
```

Now the `<figure>` elements sit properly on the same level as other block-level elements. A small thing, but now I don’t have to do additional CSS interventions to deal with extra wrapping element.
