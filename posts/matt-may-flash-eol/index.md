---
title: Adobe’s Matt May on Flash and Accessibility
display_title: Adobe’s Matt May on Flash and Accessibility
description: Matt May looks back at Flash and its accessibility problems.
date: 2021-01-06T14:02:00-05:00
tags:
  - web-design
  - web-development
---

With Adobe [officially ending support for Flash in 2020](https://www.adobe.com/products/flashplayer/end-of-life.html), Matt May (head of inclusive design at Adobe) put together a [thoughtful thread on Flash’s history](https://twitter.com/mattmay/status/1344728355912880129), focusing on accessibility:

> I come to bury Flash, not to praise it.
>
> As an animation platform, Flash launched the web into new directions. But once it became a UX platform, without the structure of web or OS apps, it left millions behind. 

This distinction is so simple, and it reminds me of the big Flash schism between version 4 and 5. Flash 5 ushered in ActionScript, and with it Macromedia (and creators) started to push into web applications. If my memory serves me correctly, it’s also when I noticed some folks who were using Flash as a fun animation tool had started to drop off. Further iterations to ActionScript followed a common story in programming languages: more structure (interfaces, classes, inheritance) but also more gatekeeping. Macromedia (and the community around it) wanted Flash to be a serious tool, and if you had trouble learning ActionScript, well, that was your problem.

It’s fun to remember that early code loops in Flash were *literally* loops, because that’s how the timeline behaved: you did some actions one frame, and as the timeline looped back to the starting frame you could do conditionals and other stuff. It was labor-intensive, especially if you wanted to rapidly change interaction between multiple movie clips and their timelines. But it also made things remarkably concrete, whereas ActionScript made things more abstract. As ActionScript evolved you had to split your mind: you had things happening in the timeline, and then you had the other stuff executing in abstract code-land, and often those things were tied together[^1].

May reminded me how Flash turned text into vectors:

> You see, Flash had no inherent semantics or structure to it. You made shapes, you added keyframes. They moved around. Then they started over.
>
> But text in Flash wasn't text: it was vectors shaped like letters. And that came back to haunt it.

With no semantic meaning to elements (especially text) accessibility was always going to be a challenge, or nigh impossible. I love how May points out that accessibility has to be built in from the beginning:

> Every framework, library, plugin model, pattern, etc. in the world needs to be thinking, from their very \_conception\_, how they're going to be accessible, inclusive, equitable, adaptive, future-proof. Each mistake you make limits your future potential, possibly forever.

I think it’s a good thing that Flash eventually gave way to richer alternatives on the native web. But I do fear that there’s a whole swath of interesting work that will simply be lost, for lack of a way to run it[^2].

It was fittingly ironic that as Flash’s influential run was officially coming to an end, I found myself updating an older project built in Flash: a museum touchscreen application I originally built in 2013[^3]. Flash the authoring tool isn’t even *Flash* anymore, it’s [Adobe Animate](https://www.adobe.com/products/animate.html). Fortunately it seems like Adobe mostly put a new badge on top of the old Flash chassis: everything still compiled, with some complications brought on by the advent of 64-bit OSes in the interim years.

[^1]: This is how lots of modern UI-based development happens, of course, but it’s worth noting how much mental overhead that requires from the creator.

[^2]: [*ruffle*](https://ruffle.rs) is a project written in Rust to emulate the Flash Player, so there’s some hope for preservation here.

[^3]: For now it seems that while browser-based Flash support is over, Adobe Air and projector applications will continue to run.