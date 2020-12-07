---
title: "Eleventy: Netlify Redirects"
display_title: "Eleventy: Netlify Redirects"
description: Two different flavors of Netlify redirects, in an Eleventy context
date: 2020-12-07T13:40:00-05:00
tags:
  - eleventy
  - web-development
---

Netlify has [a couple of different ways to handle redirects on your site](https://docs.netlify.com/routing/redirects/): using a **_redirects** file or the Netlify configuration file (**netlify.toml**). I tend to handle explicit path redirects in the former, and pattern-based redirects in the latter.

## Explicit Path Redirects

While updating my reading log I noticed that I had incorrectly titled the first entry for the ongoing Daredevil series: I listed the first volume as *Daredevil: Know Fear, Vol. 1*. After I read the next collection I realized that the volume number should precede the subtitle—so it should really be *Daredevil Vol. 1: Know Fear*, to be consistent with the next one, *Daredevil Vol. 2: No Devils, Only God*[^1].

So I updated the title, but now I had a url slug that didn’t match the title. So `/reading/daredevil-know-fear-v1/` should be `/reading/daredevil-v1-know-fear/`. Enter the Netlify **_redirects** file, which should be deployed to the publish directory of your site. I created one in the root directory of my repository, then plugged in those paths redirects, one per line, and I was *almost* ready to go:

```bash
/reading/daredevil-know-fear-v1/ /reading/daredevil-v1-know-fear/
```

## Eleventy Passthrough Declaration

I say *almost* because if you’re using Eleventy, you need to actually specify where that file should end up, because otherwise it won’t get published. In **.eleventy.js** I added a single line:

```js
eleventyConfig.addPassthroughCopy("_redirects");
```

This mimics the existing declarations for image and CSS files:

```js
eleventyConfig.addPassthroughCopy("img");
eleventyConfig.addPassthroughCopy("css");
```

Note that you don’t have to put that **_redirects** file in the root of your repo like I did. Other folks put it  elsewhere, like in [this example from Sean C. Davis](https://www.seancdavis.com/blog/netlify-redirects-headers-with-eleventy/)—Sean has the file in a **static** directory.

## Pattern-based Redirects

What if you have hundreds of redirects, however? Listing them one-by-one in the **_redirects** file would work, but it would also be painstaking to put *all* those links in, especially if they follow a pattern. My old WordPress blog used a year/month/day URL pattern, like:

```bash
/2020/09/08/eleventy-escaping-nunjucks-statements-in-markdown-code-blocks/
``` 

Since my posts in Eleventy all just originate at the `posts` directory, that URL should now be:

```bash
/posts/eleventy-escaping-nunjucks-statements-in-markdown-code-blocks/
```

In this case it makes much more sense to use the **netlify.toml** file. I added this declaration:

```toml
[[redirects]]
  from = "/:year/:month/:date/:slug"
  to = "/posts/:slug"
  status = 301
```

See those colons? They act as [**placeholders**](https://docs.netlify.com/routing/redirects/redirect-options/#placeholders) for bits of the path (much like RegEx capture groups). Since I only really cared about the slug after the year/month/date[^2] sequence, I could grab that `:slug` placeholder for the new URL pattern: `to = "/posts/:slug"`.



## Local Testing

Ok, now everything should be redirecting properly. How do you test this locally, without deploying to Netlify a dozen times until you get the configuration right? Turns out [Netlify Dev](https://www.netlify.com/products/dev/) allows you to test custom headers and redirects. I installed that, ran `netlify dev`, and verified my redirects before committing everything and kicking off a deploy to Netlify.

Netlify Dev even has a handy `--live` option which creates a public URL for your local development instance (for as long as that session is running). Handy for collaborating with teammates in a code pairing situation.


[^1]: Do I often get paralyzed about naming conventions for files in a codebase? Why yes, I very much do.

[^2]: Now I’m wondering if that should be `:day`, not `:date`.