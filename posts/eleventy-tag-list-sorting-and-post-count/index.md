---
title: "Eleventy: Tag List Sorting and Post Count"
description: "Getting front matter data into my Nunjucks RSS feed templates."
date: 2020-08-17
tags:
  - eleventy
  - web_development
---

This week I’m focusing on building out the tag-related pages for my new site, and I had two straightforward requirements for the tag list:

- Order the list of tags alphabetically
- Display the post count for each tag

The [starter repository](https://github.com/11ty/eleventy-base-blog) I’m using has basic support for a tags collection, but I noticed that the tag list is not sorted, and can change order with a build. I also couldn’t figure out how to add a post count. Fortunately the Eleventy/Jamstack community has been pretty open about sharing their site repositories. I took a look at Phil Hawksworth’s [blog repo](https://github.com/philhawksworth/hawksworx.com) and found both elements that I needed (thanks Phil!).

## Sorting the Tag List

Phil wrote his own [getTagList function](https://github.com/philhawksworth/hawksworx.com/blob/master/src/site/_filters/getTagList.js) to generate the **tagList** collection (the main difference that I can see from the version from the starter repo is that Phil is using the `getAllSorted()` method when grabbing collections. I copied Phil‘s function and defined the collection in my **.eleventy.js** file:

```js
eleventyConfig.addCollection("tagList", require("./src/utils/getTagList.js"));
```

So far, so good. However, I have a couple of custom post types that I’m using: **book** and **project**, which each have their own tags. For now I want to exclude those custom types from the main **post** tag archive. So, I added a quick filter into the mix to only return items that matched the **post** content type. Note that to do this, I had to make sure that I had explicitly add a `content_type` attribute to my **posts.json** file, which looks like this:

```js
{
	"content_type": "post",
	"layout": "post",
	"tags": ["posts"]
}
```

Here’s my `getTagList()` method in full:

```js
module.exports = function (collection) {
  let tagSet = new Set();
  collection
    .getAllSorted()
    .filter(function (item) {
      return item.data.content_type == "post";
    })
    .forEach(function (item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        if (typeof tags === "string") {
          tags = [tags];
        }

        tags = tags.filter(function (item) {
          switch (item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "post":
            case "posts":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

  // returning an array in addCollection works in Eleventy 0.5.3
  return [...tagSet].sort();
};
```

## Adding a Post Count to Each Tag

The post count for tags was even simpler. In his [tag list template](https://github.com/philhawksworth/hawksworx.com/blob/master/src/site/tags.njk) I found this snippet for printing out the post count for a tag: `{% raw %}{{ collections[tag].length }}{% endraw %}`. So my template looks like this:

```twig
{% raw %}
---
permalink: /tags/
layout: layouts/base.njk
templateClass: tmpl-tags-list
---
<div class="content-main container">
<h1>Tags</h1>
<ul class="postlist">
{% for tag in collections.tagList%}
	{% set tagUrl %}/tags/{{ tag }}/{% endset %}
	<li class="postlist-item">
		<a href="{{ tagUrl | url }}" class="postlist-link">{{ tag }}</a> ({{ collections[tag].length }})
	</li>
{% endfor %}
</ul>
{% endraw %}
```

Thanks again to [Phil Hawksworth](https://www.hawksworx.com) for making his code public.
