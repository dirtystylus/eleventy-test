---
title: "Eleventy: RSS Feeds and Front Matter Data"
description: Getting front matter data into my Nunjucks RSS feed templates.
date: 2020-09-04
tags:
  - eleventy
  - web development
---

I’ve been setting up the RSS feeds for my posts, as well as a separate feed just for my custom post type Book. It has quite a bit of YAML front matter, some of which I want to include in the feed:

```yaml
title: Gideon the Ninth
author: Tamsyn Muir
date: 2020-05-21
description: Tamsyn Muir’s galactic necromancy saga.
publication_date: 2019-09-10
cover_image: /img/reading/gideon-the-ninth.jpg
genre: Fiction
format: Hardcover
reading_start_date: 2020-05-16
reading_end_date: 2020-05-16
---

```

This gets rendered in my **book.njk** Nunjucks template, in this snippet:

```twig
{% raw %}
<div class="book-details">
  <div class="book-cover book-shadow">
  {% image cover_image, title + " cover image" , "book_thumb" %}
  </div>
  <div class="book-meta">
    <h1>{{ title }}</h1>
    <h2>{{author}}</h2>
    <dl>
      <dt>Genre</dt>
      <dd>{{ genre }}</dd>
      <dt>Format</dt>
      <dd>{{ format }}</dd>
      <dt>Started Reading</dt>
      <dd>{{ reading_start_date | readableDate }}</dd>
      <dt>Finished Reading</dt>
      <dd>{{ reading_end_date | readableDate }}</dd>
    </dl>
  </div>
</div>
<div class="book-body">
{{ content | safe }}
</div>
{% endraw %}
```

Moving on tho RSS. The starter RSS template I am using uses this snippet to render out the post content:

```js
<content type="html">{{ post.templateContent | htmlToAbsoluteUrls(absolutePostUrl) }}</content>
```

Which is fine, except that `post.templateContent` does not include anything from the wrapper template. It’s basically the body of the post, but if you’re rendering YAML front matter like I am that won’t be included.

## XML, so strict

So. I spent some time figuring out how to add that markup into my feed template. I ended up with this snippet:

```twig
{% raw %}
{% set book_metadata %}<p></p></p>{% image metadata.feed_reading.img_base_url + post.data.cover_image, post.data.title + " cover image" , "book_thumb" %}</p><p>Started Reading: {{post.data.reading_start_date | readableDate }}</p><p>Finished Reading: {{post.data.reading_end_date | readableDate }}</p>{% endset %}<content type="html">{{ book_metadata | htmlToAbsoluteUrls(absolutePostUrl) }}{{ post.templateContent | htmlToAbsoluteUrls(absolutePostUrl) }}</content>
{% endraw %}
```

Line one sets a new variable, `book_metadata`, containing my markup with some of the YAML front matter. Because that HTML is not valid XML, I piped it through the `htmlToAbsoluteUrls()` filter, which escapes HTML entities in addition to transforming URLs. That is followed by the existing `post.templateContent`.

## Why not use CDATA instead?

Alternatively, something gleaned from Andy Bell’s excellent [Learn Eleventy From Scratch](https://piccalil.li/course/learn-eleventy-from-scratch/) course: you _could_ wrap the whole thing in CDATA tags, like this:

```twig
{% raw %}
<content type="html"><![CDATA[<p>{% image metadata.feed_reading.img_base_url + post.data.cover_image, post.data.title + " cover image" , "book_thumb" %}</p><p>Started Reading: {{post.data.reading_start_date | readableDate }}</p><p>Finished Reading: {{ post.data.reading_end_date | readableDate }}</p>{{ post.templateContent | safe }}]]></content>
{% endraw %}
```

There’s a small catch, though. The conundrum here is that if you have images with relative URLs they will not be rendered in some feed readers. I tried to use `htmlToAbsoluteUrls()` as in the earlier attempt, but if you pipe the post through `htmlToAbsoluteUrls`, you now end up with escaped HTML tags within CDATA, so they will not be rendered as proper HTML tags in your feed reader. So you end up having to choose: broken images, or broken HTML. So in the end I decided to go back to my earlier version where I set a variable and then pipe that whole string through `htmlToAbsoluteUrls()`.

`htmlToAbsoluteUrls()` uses [**posthtml-urls**](https://github.com/posthtml/posthtml-urls) under the hood, which means that I could potentially write my own version of `htmlToAbsoluteUrls()` that didn’t escape HTML tags. I’ll leave that for a future task, though.
