---
title: Debugging is All About Baselines
display_title: Debugging is All About Baselines
description: ''
date: '2012-04-20T16:28:11-04:00'
tags:
  - technologys-betrayal
  - web-development
---
This started out as a quick post for a particularly obscure CSS/Media Query bug for IE 7—or so I thought. It ended up being a quick reminder on why debugging is all about limiting the number of variables at play.

I was encountering a weird situation where a **background** shorthand stack was failing in IE 7, but only when wrapped in a media query. I was using [modernizr 2.0.6](http://modernizr.com/), which had respond.js baked in. So a background declaration like this was failing:

```css
@media only screen and (min-width: 500px) {
    ul li {
        background: rgb(233,233,233);
        background: rgba(233,233,233,.8);
    }   
}

```

If I took away the `rgba` declaration the background color would be properly applied. Other properties seemed to take properly, so I was left scratching my head.

With that information in hand, I set about trying to isolate the issue. I downloaded a fresh copy of [HTML5Boilerplate](http://html5boilerplate.com/) and set to work. It ended up that I couldn’t replicate the bug I had been facing when boiling the markup down to a single unordered list and minimal CSS. But I was also seeing *all* declarations in my media queries fail. After some thrashing about, I read the release notes and this jumped out:

> Respond.js is no longer available by default.

Well, I’ll be. So that explained why my test cases were failing in IE 7 *and* 8: the media query polyfills were no longer included with modernizr. I pulled a fresh copy of [respond.js](https://github.com/scottjehl/Respond), threw that in, and the bug I started out with no longer occurred. That meant that my bug was probably a result of an older respond.js version, or a result of that being wrapped up in modernizr.

So, a hard lesson re-learned about debugging: When investigating a bug, try to make sure you’re working from a baseline that mirrors the situation where you found it. I was starting from a baseline that didn’t mirror the one that had the bug, since I was using modernizr 2.5.3 (vs 2.0.6). In this case using a newer version of modernizr compounded the confusion further because it no longer included respond.js, a *major* difference.
