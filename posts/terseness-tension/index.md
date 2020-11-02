---
title: Terseness tension
display_title: Terseness tension
description: Christian Heilmann points out some drawbacks to optimizing for terseness.
date: 2019-10-04T14:53:30-04:00
tags:
  - links
  - web-development
---

I found myself agreeing with a lot of what Christian Heilmann [writes here](https://christianheilmann.com/2019/10/01/terseness-tension/), especially this part:

> **Terse code is harder to read**. Oh boy, this is holy war material. I’d rather have maintainers get clean code that follows a style than clever, dense hacks. And it shouldn’t be a rite of passage to know all the syntactic magic a language allows. U wl b abl 2 rd ths, as our brain craves harmony and tends to fill in gaps. But it will tire you out much faster than a proper sentence.

One of my former colleagues warned me off this kind of terseness by recounting how he once tried to shorten his function names into acronyms, turning `pickFirstItemFromCollection()` into something like `pfifc()`. It was a short-lived experiment.

I’m also reminded of this [Twitter thread by Marco Rogers](https://twitter.com/polotek/status/1140413217367191553), looking back at the genesis of the arrow syntax in JavaScript, and how that trades readability for terseness:

> The javascript community fought hard for the fat arrow syntax, () =\> {}.
> 
> It’s shorter for sure. But way more annoying to type on a regular basis than function() {}.
> 
> And that is the folly of programmer culture IMO. Constantly optimizing the wrong things for the wrong reasons.