---
title: "Eleventy: Custom Content Type and Collection for Books"
description: Building a custom content type, collection, and templates for logging my reading.
date: 2020-05-27
tags:
  - eleventy
  - web_development
---

Continuing my adventures in [Eleventy](http://11ty.dev): I wanted to create a collection for books that I’ve read, separate from the default **Post** type. But I didn’t want to have the collection called **Books**, because that would imply that I had written the books.

I settled on a compromise: I would call my custom type **Book**, but my collection would be called **Reading**.

## Book Type

Creating a type called book was fairly simple:

- I created a folder called **reading**
- Within the folder, a **reading.json** file (this follows the convention of the **posts.json** definition for the default **Post** content type)

**reading.json** is very concise:

```json
{
  "layout": "book",
  "content_type": "book"
}
```

This specifies two things:

- A layout file (**book.njk**)
- A content type for the collection (**book**)

This means that for my collection I can grab everything of content type **book**, and that each book file will be rendered by the **book.njk** template file.

A book’s front matter has metadata (this came out of my [recent project for tracking my reading](http://dirtystylus.com/2020/04/17/visualizing-my-reading-with-semiotic/)):

```yaml
---
title: Gideon the Ninth
author: Tamsyn Muir
date: 2020-05-21
description: Tamsyn Muir’s galactic necromancy saga.
publication_date: 2019-09-10
cover_image: reading/gideon-the-ninth.jpg
genre: Fiction
format: Hardcover
reading_start_date: 2020-05-16
reading_end_date: 2020-05-16
tags:
  - reading
---

```

Everything after that Markdown, just like you would find in a default post.

## Retrieving the Collection

With the **Book** content type defined, I can now retrieve my collection in my **.eleventy.js** file. Originally I did this:

```js
eleventyConfig.addCollection("reading", function (collection) {
  return collection.getAll().filter(function (item) {
    return item.data.content_type == "book";
  });
});
```

Which worked — I got all my books back in a list. Except … the order of books was unstable. Even with a `date` set in the YAML front matter for each book post, the order of the books kept changing depending on which was saved last. So I tacked on a `sort()` call, using this [example from the docs](<https://www.11ty.dev/docs/collections/#getall()%20>):

```js
eleventyConfig.addCollection("reading", function (collection) {
  return collection
    .getAll()
    .filter(function (item) {
      return item.data.content_type == "book";
    })
    .sort(function (a, b) {
      return b.date - a.date;
    });
});
```

Now the order is explicitly dependent on the `date` from the front matter. This also means I don’t really have to use the reverse filter within my books list template.

## Templates

### Books Shell Template

Now that I have my collection, I can render out a list for my “Reading” page. I created a **books.njk** template, which looks like this:

```twig
{% raw %}
---
layout: layouts/home.njk
permalink: /reading/
eleventyNavigation:
  key: Reading
  order: 2
---
<div class="content-main container">
<h1>Reading</h1>

{% set bookslist = collections.reading %}
{% include "bookslist.njk" %}
</div>
{% endraw %}
```

That creates a “Reading” link in the main navigation, and maps `/reading` as the URL. It also sets a variable, `bookslist`, that is the result of the collection I retrieved.

### Books List Template

**bookslist.njk** looks very much like **postslist.njk** — note that I’m not reversing the order of my bookslist, because the collection is already sorted reverse chronologically. Note the book-specific `book.data.[X]` front matter variables:

```twig
{% raw %}
<ul reversed class="postlist">
{% for book in bookslist %}
  <li class="postlist-item{% if post.url == url %} postlist-item-active{% endif %}">
    <a href="{{ book.url | url }}" class="postlist-link">{% if book.data.title %}{{ book.data.title }}{% else %}<code>{{ book.url }}</code>{% endif %}</a>
    <p>{{ book.data.description }}</p>
    <span class="post-meta">Finished <time class="postlist-date" datetime="{{ book.data.reading_end_date | htmlDateString }}">{{ book.data.reading_end_date | readableDate }}</time></span>
  </li>
{% endfor %}
</ul>
{% endraw %}
```

### Book Detail Template

Finally, **book.njk**, which renders a single book post. Nothing fancy here, just printing out a bunch of front matter variables and sanitized Markdown content:

```twig
{% raw %}
---
layout: layouts/base.njk
templateClass: tmpl-book
---
<article class="content-main container book-single">
<div class="book-details">
  <div class="book-cover book-shadow">
  {% figure cover_image, "", "book-thumb" %}
  </div>
  <div class="book-meta">
    <h1>{{ title }}</h1>
    <h2>{{author}}</h2>
    <dl>
      <dt>Publication Date</dt>
      <dd>{{ publication_date | readableDate }}</dd>
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
</article>
<p><a href="{{ '/reading' | url }}">← All Books</a></p>
{% endraw %}
```

## What’s Still Confusing

So I’ve got a custom type now, which feels good — I can just treat books as a first-class type instead of using a tag to filter out posts. For the life of me I can’t figure out how to get a custom taxonomy working, however. It’s not quite necessary for what I want to build, but that is usually a default thing I have to consider when I’m in WordPress/Drupal-land.
