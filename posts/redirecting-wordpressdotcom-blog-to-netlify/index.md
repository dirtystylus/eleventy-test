---
title: Redirecting a WordPress.com blog to Netlify
display_title: Redirecting a Wordpress.com blog to Netlify
description: DNS and redirects for a blog migration.
date: '2022-05-10T12:48:45.202-04:00'
tags:
  - bluecadet
  - web-development
---

For the recent redesign and rebuild of [historyofvaccines.org](https://historyofvaccines.org) my team and I had to migrate a blog hosted and managed at WordPress.com to a subdirectory within a static Gatsby site, deployed to Netlify. We wanted to have any requests for [historyofvaccines.blog](https://historyofvaccines.blog) land at the appropriate new url of [historyofvaccines.org/blog](https://historyofvaccines.org/blog).

## WordPress domain management

Part one was pointing the `historyofvaccines.blog` domain to Netlify. [WordPress’s documentation](https://wordpress.com/support/domains/custom-dns/#editing-or-deleting-dns-records) suggested having the default `A` record point to the IP address for Netlify’s load balancer, in this case `75.2.60.5`.

## Netlify domain/redirect configuration

In the Netlify admin panel I added `historyofvaccines.blog` as a custom [domain alias](https://docs.netlify.com/domains-https/custom-domains/multiple-domains/#domain-aliases).

Then, in my Netlify **`_redirects`** file (in the Gatsby codebase) I added in some redirects. I put in the more specific redirects first, since Netlify will take the first one that matches.

```shell
https://historyofvaccines.blog/:year/:month/:date/:slug https://historyofvaccines.org/blog/:slug
https://www.historyofvaccines.blog/:year/:month/:date/:slug https://historyofvaccines.org/blog/:slug
https://historyofvaccines.blog/* https://historyofvaccines.org/blog/:splat 301!
https://www.historyofvaccines.blog/* https://historyofvaccines.org/blog/:splat 301!
http://historyofvaccines.blog/* https://historyofvaccines.org/blog/:splat 301!
http://www.historyofvaccines.blog/* https://historyofvaccines.org/blog/:splat 301!
/:year/:month/:date/:slug  /blog/:slug
```

## Redirecting to the base directory of the blog

With my original set of redirects (before the working version above) things *almost* worked as expected—individual blog posts were correctly relayed to the right URL (for ex: [https://historyofvaccines.blog/2021/01/04/keeping-track-of-covid-19-vaccination-rates/](https://historyofvaccines.blog/2021/01/04/keeping-track-of-covid-19-vaccination-rates/) was correctly redirected to [https://historyofvaccines.org/keeping-track-of-covid-19-vaccination-rates/](https://historyofvaccines.org/keeping-track-of-covid-19-vaccination-rates/). 

But the root level [historyofvaccines.blog](https://historyofvaccines.blog) was redirecting to [historyofvaccines.org](https://historyofvaccines.org), not [historyofvaccines.org/blog](https://historyofvaccines.org/blog). Turns out `!` is a [very important part of a redirect rule](https://docs.netlify.com/routing/redirects/redirect-options/#domain-level-redirects).


I originally had:

```
https://www.historyofvaccines.blog/* https://historyofvaccines.org/blog/:splat
```
    
After putting `301!` at the end of my rule things started working as expected. From Netlify’s docs:

> Refer to the note on shadowing for the reasoning behind the ! — it is presumably the case that you have a `/blog/index.html` that you’d rather serve than your site’s main `index.html` in this case!

This was a little bit hard to understand, but here’s what I think is happening:

* Without the `!` in the redirect rule, `historyofvaccines.blog` will resolve to `historyofvaccines.org/index.html`, because that page actually exists. It seems the presence of a page that matches the same pattern as the source takes precedence over the redirect.
* The `!` in the rule says to ignore that default match and force the redirect to the URL you have defined, in strict terms: `historyofvaccines.org/blog/index.html`

### URL pattern redirects

I’ve [written about this before](/posts/eleventy-netlify-redirects/), but WordPress by default goes with a year/month/day/slug arrangement for permalinks. With the new blog we simplified that to be simply `/blog/[slug]`. So part of the redirect pattern used Netlify’s redirect tokens to transform the URLs:

```shell
https://historyofvaccines.blog/:year/:month/:date/:slug https://historyofvaccines.org/blog/:slug
```

That takes a URL like `https://historyofvaccines.blog/2020/03/15/our-coronavirus-coverage/` and redirects it to `https://historyofvaccines.org/blog/our-coronavirus-coverage/`

