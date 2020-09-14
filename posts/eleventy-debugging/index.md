---
title: "Eleventy: Debugging"
description: I belatedly figure out how to get debug output in Eleventy.
date: 2020-06-17
tags:
  - eleventy
  - web-development
---

While working on my [Paired Shortcode for images](http://dirtystylus.com/2020/06/16/eleventy-paired-shortcodes-and-markdown-rendering/) I finally ran into a situation where trial-and-error wasn’t getting me anywhere, and I finally had to dive into the [debugging hooks in Eleventy](https://www.11ty.dev/docs/debugging/)[^1].

Debugging in Eleventy has two major parts: declaring/invoking the debug instance in your code, and tweaking the command you use to build your site.

## Setting up debug

Eleventy ships with support for the [npm debug module](https://www.npmjs.com/package/debug). You can set it up like this in your **.eleventy.js** file:

```js
const debug = require("debug")("markllobrera");
```

The second set of parentheses is your app name/identifier, and it gets prepended to your debug statements in the output. This allows you to filter your debug statements out of the noise.

Debug statements are just like `console.log()` statements, which makes sense. From the docs:

> `debug` exposes a function; simply pass this function the name of your module, and it will return a decorated version of `console.error` for you to pass debug statements to.

So you can simply do something like this:

```js
debug("captionMarkup: ", captionMarkup);
```

Which would give you output like this:

```bash
markllobrera captionMarkup:  <figcaption>Early-morning fog in Richwood, KY</figcaption>
```

Remember that app name? Well, there it is, right in front of any debug statements you’ve written.

## Running in debug mode

So how do you get debug output to show up? Well, when running your build in the command line you can try:

```bash
DEBUG=Eleventy* npx @11ty/eleventy
```

But this is a little too verbose for me.

You can also try:

```bash
DEBUG=*Error* npx @11ty/eleventy
```

Which would filter for errors. This is a bit more useful. But if you just want your stuff, put your app name into the match pattern in the build command, like so:

```bash
DEBUG=*markllobrera* npx @11ty/eleventy
```

You can even run the build without actually writing files, saving some compilation time:

```bash
DEBUG=*markllobrera* npx @11ty/eleventy --dryrun
```

Or, if you prefer, you can also use `--serve` or `--watch` (this is what I do most of the time).

[^1]: This is, of course, the reverse order of advice I give every person new to programming, where I urge them to figure out a couple of ways to debug before they rush headlong into building things. But here we are.
