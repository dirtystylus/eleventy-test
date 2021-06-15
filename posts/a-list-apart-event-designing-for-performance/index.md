---
title: 'A List Apart Event: Designing for Performance'
display_title: 'A List Apart Event: Designing for Performance'
description: Notes on ALA’s performance panel.
date: '2015-03-10T11:49:13-04:00'
tags:
  - web-development
---
Some notes from A List Apart’s online panel [*Designing for Performance:  
Can We Have it All?*](http://alistapart.com/event/designing-for-performance) featuring Lara Hogan, Scott Jehl, Yesenia Perez-Cruz, and Mat Marquis:

- Optimizing images (or reducing their number outright) are an area where designers and developers can get big wins quickly.
- Examine the critical path for page rendering—what is synchronous, and what can be deferred?
- Look at whether you have render-blocking JS/CSS referenced in the
- Inline critical CSS. Lots of debate on whether this is *gross* or *yucky*. Scott Jehl spent the following morning on Twitter [clarifying that this is an automated post-production step](https://twitter.com/scottjehl/status/571316037012103168), not something you do by hand.
- Style guides can help, by establishing performant chunks that can be copy/pasted.
- <picture> element and *srcset*. *srcset* lets the browser choose the best image to display.</picture>
- Use [webpagetest](http://webpagetest.org) to check for the timing on when your page can be used. Balance overall page weight against how soon the page is usable.

My chief takeaways from the panel were to think about how images are used, and how to optimize them. I’m interested in optimizing the critical path, and it seems like Scott Jehl and the Filament Group have been doing a lot of work in that area. It does seem like certain things (like CSS inlining) are going to require integrating a dev tool like Grunt into the mix, which I’ve been hesitant to do so far.

The big area that I am personally curious about is how to achieve performance within the context of open-source CMS platforms like Drupal and WordPress. All of this performance tuning is fine and good if you have complete control over your output, how does it change given the constraints on those platforms?
