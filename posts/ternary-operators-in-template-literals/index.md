---
title: 'Ternary Operators in Template Literals'
display_title: 'Ternary Operators in Template Literals'
description: Folding myself into nested template literals, and then unfurling again.
date: 2019-11-19T10:23:27-05:00
tags:
  - eleventy
  - web-development
---

**Update 2020-09-24**: [I’m now using Nicolas Hoizey’s Images Responsiver plugin](/posts/eleventy-images-responsiver/) instead of a shortcode. (This post is still relevant if you’re looking for an example of how to configure a shortcode.)

Working on a small [shortcode for Eleventy](https://gist.github.com/dirtystylus/d488ea82fec9ebda8308a288015d019b) to generate `<figure>` markup, I realized I needed to test my optional parameters for values and alter my output if they didn’t exist.

[Mozilla Dev Network’s documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Nesting_templates) had some good examples, specifically nesting template literals and ternary operators.

In my situation, I created a shortcode to accept one required param (my filename) and two optional params (a caption, and a CSS class name):

```js
{% raw %}
module.exports = (image, caption, className) => {
  return `<figure${className ? ` class="${className}"` : ''}><img src="/img/${image}" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
};
{% endraw %}
```

I’m using ternary operators to test for the presence of a className, as well as a caption. So I can invoke this shortcode in my Markdown files any of three ways:

- Image only: 

  ```twig
  {% raw %}{% figure "DSCF1433.jpg" %}{% endraw %}
  ```

- Image with caption: 

  ```twig
  {% raw %}{% figure "DSCF1433.jpg" "This is a caption" %}{% endraw %}  
  ```
  
- Image with caption and class name: 
  
  ```twig
  {% raw %}{% figure "DSCF1433.jpg" "This is a caption" "cinemascope" %}{% endraw %}
  ```

- Image with class name, but no caption: 
  
  ```twig
  {% raw %}{% figure "DSCF1433.jpg" "" "cinemascope" %}{% endraw %}
  ```

As convenient and concise as this code is, it’s not particularly readable. I’m debating whether to pull the ternary operators into String variables above the main `return` statement, to be explicit about what I’m testing for, and what markup to wrap around a class name or a caption. Something like:

```js
module.exports = (image, caption, className) => {
  const classMarkup = className ? ` class="${className}"` : '';
  const captionMarkup = caption ? `<figcaption>${caption}</figcaption>` : '';
  return `<figure${classMarkup}><img src="/img/${image}">${captionMarkup}</figure>`;
};
```

It’s three lines instead of one, but to my eye it’s easier to understand what I’m checking for, and how that gets output in the return statement. Perhaps I’m just heeding the call from my [last post](http://dirtystylus.com/2019/11/18/guido-van-rossum-on-cryptic-code/).

A gist of my shortcode is [here](https://gist.github.com/dirtystylus/d488ea82fec9ebda8308a288015d019b).