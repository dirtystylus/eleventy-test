---
title: "Eleventy: Escaping Nunjucks Statements in Markdown Code Blocks"
description: "Making code blocks with Nunjucks statements safe for Nunjucks template rendering."
date: 2020-09-08
tags:
  - eleventy
  - web-development
---

A fun little wrinkle, but one with a very quick solution: if you have a code block containing any Nunjucks templates (and you’re using Nunjucks as your templating engine), you could end up with a `TemplateContentRenderError`. To get around it you can wrap the entire block in a `{% raw %}{% raw %}{% endraw %}` block:

```twig
{% raw %}
<content type="html">
  <![CDATA[<p>{% image metadata.feed_reading.img_base_url + post.data.cover_image, post.data.title + " cover image" , "book_thumb" %}</p>
  <p>Started Reading: {{post.data.reading_start_date | readableDate }}</p>
  <p>Finished Reading: {{ post.data.reading_end_date | readableDate }}</p>
  {{ post.templateContent | safe }}]]>
</content>
{% endraw %}
```
