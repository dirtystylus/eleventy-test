---
title: "Eleventy: Paired Shortcodes and Markdown Rendering"
description: Implementing figure markup with a Paired Shortcode, plus adventures in Markdown rendering.
date: 2020-06-16
tags:
  - eleventy
  - web-development
---

The first time I read the documentation on Eleventy’s [Paired Shortcodes](https://www.11ty.dev/docs/shortcodes/#paired-shortcodes) I couldn’t quite figure out how I would use one, so I stuck to a regular shortcode for [generating figure/image output](http://dirtystylus.com/2019/11/19/ternary-operators-in-template-literals/). Here’s what my original shortcode looked like:

```twig
{% raw %}
{% figure "DSCF1433.jpg" "This is a caption" "cinemascope" %}
{% endraw %}
```

This worked quite well! Except that it was starting to get a little bit ungainly. I needed to support the following params:

- Image name
- Alt text
- Caption
- Optional CSS class

Jamming all of that into a standard shortcode was starting to get ungainly.

## Paired Shortcodes

Paired shortcodes let you nest template content inside, so it felt like a good attempt to separate the caption as text content from the other params. Here’s what I tried:

```js
{% raw %}
eleventyConfig.addPairedShortcode(
  "figure",
  (data, image, altText, styleName) => {
    const styleObj = {
      cinemascope: [
        { width: 1200, breakwidth: 1000 },
        { width: 850, breakwidth: 650 },
      ],
      book_thumb: [{ width: 300, breakwidth: 400 }],
      default: [{ width: 850, breakwidth: 650 }],
    };

    const styleItem = styleObj[styleName]
      ? styleObj[styleName]
      : styleObj["default"];
    const classMarkup = styleName ? ` class="${styleName}"` : "";
    data = data.trim();
    if (data !== undefined && data !== "") {
      captionMarkup = `<figcaption>${data}</figcaption>`;
    } else {
      captionMarkup = "";
    }
    let srcsetMarkup = "";
    styleItem.forEach((element) => {
      srcsetMarkup += `<source srcset="/img/${image}?nf_resize=fit&w=${element.width}" media="(min-width: ${element.breakwidth}px)"></source>`;
    });
    return `<figure${classMarkup}><picture>${srcsetMarkup}<img src="/img/${image}?nf_resize=fit&w=400" alt="${altText}" /></picture>${captionMarkup}</figure>`;
  }
);
{% endraw %}
```

In my Markdown file I could then do this:

```twig
{% raw %}

{% figure "DSCF1433.jpg", "Barn with distant trees barely visible in the fog.", "cinemascope" %}
Testing if **Paired Shortcodes** can take *Markdown* transformations
{% endfigure %}

{% endraw %}
```

The comma-delimited params in the opening `{% raw %}{% figure %}{% endraw %}` tag map to the image name, alt text, and optional CSS class. The text between the `{% raw %}{% figure %}{% endraw %}` and `{% raw %}{% endfigure %}{% endraw %}` is the caption, and also the first parameter passed into the callback function (as `data`). This worked well enough, except that any Markdown in the caption was ignored and rendered as plain text. So the above would result in this for the caption:

```twig
{% raw %}

<figcaption>Testing if **Paired Shortcodes** can take *Markdown* transformations</figcaption>

{% endraw %}
```

Turns out this is a [common pitfall](https://www.11ty.dev/docs/languages/markdown/#why-cant-i-return-markdown-from-paired-shortcodes-to-use-in-a-markdown-file). Any text that gets wrapped in HTML before being returned doesn’t get run through Markdown parsing, if I understand that documentation note correctly. But there’s a workaround! I followed a clue [in this Github issue](https://github.com/11ty/eleventy/issues/536), and looking at [the example](https://github.com/11ty/11ty-website/blob/master/.eleventy.js#L88) it appears that using markdown-it’s [`renderInline()` method](https://markdown-it.github.io/markdown-it/#MarkdownIt.renderInline) will do the transformation, and then you can wrap the output in HTML. So, adding this line:

```js
data = markdownLibrary.renderInline(data);
```

did the trick. Here’s the full code:

```js
{% raw %}
eleventyConfig.addPairedShortcode(
  "figure",
  (data, image, altText, styleName) => {
    const styleObj = {
      cinemascope: [
        { width: 1200, breakwidth: 1000 },
        { width: 850, breakwidth: 650 },
      ],
      book_thumb: [{ width: 300, breakwidth: 400 }],
      default: [{ width: 850, breakwidth: 650 }],
    };

    const styleItem = styleObj[styleName]
      ? styleObj[styleName]
      : styleObj["default"];
    const classMarkup = styleName ? ` class="${styleName}"` : "";
    data = data.trim();
    if (data !== undefined && data !== "") {
      data = markdownLibrary.renderInline(data);
      captionMarkup = `<figcaption>${data}</figcaption>`;
    } else {
      captionMarkup = "";
    }
    let srcsetMarkup = "";
    styleItem.forEach((element) => {
      srcsetMarkup += `<source srcset="/img/${image}?nf_resize=fit&w=${element.width}" media="(min-width: ${element.breakwidth}px)"></source>`;
    });
    return `<figure${classMarkup}><picture>${srcsetMarkup}<img src="/img/${image}?nf_resize=fit&w=400" alt="${altText}" /></picture>${captionMarkup}</figure>`;
  }
);
{% endraw %}
```
