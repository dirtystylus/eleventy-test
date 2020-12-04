---
title: "Eleventy: The log Universal Filter"
display_title: "Eleventy: The `log` Universal Filter"
description: After writing my own filter it turns out Eleventy already has one.
date: 2020-12-04T20:44:00-05:00
tags:
  - eleventy
  - web-development
---

I’ve [written about debugging in Eleventy before](/posts/eleventy-debugging/), in the context of **.js** files. But I’ve always wondered about the best ways to debug within Nunjucks templates.

I knew about the [Nunjucks `dump` filter](https://mozilla.github.io/nunjucks/templating.html#dump), but I was searching for something to write to the console while doing a `--dryrun` build of my site. So I wrote my own universal filter:

```js
// Logging within Nunjucks files filter
eleventyConfig.addNunjucksFilter("njkLog", function (message) {
  debug('njkLog: ', message);
});
```

Except, uh, this already exists in Eleventy as the universal filter [`log`](https://www.11ty.dev/docs/filters/log/). So within a Nunjucks/Liquid/Handlebars template you could do:

```twig
{% raw %}{{ "This is a message" | log }}
{% endraw %}
```

or pass it a variable:

```twig
{% raw %}{{ myCollection | log }}
{% endraw %}
```

