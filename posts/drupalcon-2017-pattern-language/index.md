---
title: 'Drupalcon 2017: Pattern Language'
display_title: 'Drupalcon 2017: Pattern Language'
description: 'Notes on my recent Drupalcon 2017 talk, “Pattern Language: Pattern Libraries in the Wild”'
date: '2017-05-03T11:51:24-04:00'
tags:
  - drupal
  - talks
  - web-development
---
Last week at Drupalcon 2017, I gave a talk titled “Pattern Language: Pattern Libraries in the Wild”. The [video is up on YouTube](https://youtu.be/bQc9wOgNvQ4), and slides can be found at [Speakerdeck](https://speakerdeck.com/mllobrera/drupalcon-2017-pattern-language-pattern-libraries-in-the-wild).

This talk had its genesis as an article I wanted to write in response to Ethan Marcotte’s [“Pattern Patter”](https://ethanmarcotte.com/wrote/pattern-patter/), which has a lot of great suggestions on the ways in which we can improve our pattern libraries. This part jumped out at me:

> …I’d love to see more discussion of the benefits (or drawbacks) that would lead to choosing one pattern or another. Does your pattern library say how and when a pattern is meant to be used? If the design of your image/caption pattern was shaped outside forces—by the kind of content inside it, by business requirements—are those considerations, those tradeoffs documented in your pattern library?

Ethan and I had a short chat about ways to situate patterns in context, and I got going from there. My original thought was to write the article first, and convert it into a talk if Drupalcon accepted my proposal.

At which point I quickly hit a brick wall.

I wrote five drafts, and couldn’t seem to pull together all of the separate threads that described Bluecadet’s journey into (and through) patterns from the last two years. Then in the space of a few days, really thoughtful folks started pumping out some really great [posts](https://blog.intercom.com/the-full-stack-design-system/) (and [responses](https://bigmedium.com/ideas/links/the-full-stack-design-system.html)!) about pattern-based design, and I started to shut down. I thought, maybe I should just write a blog post, link to those folks, and call it a day.

Instead I decided to shelve the article, and just focus on the talk, so for now you have me talking about this stuff for 25 minutes. (I should have submitted it as a 60-minute proposal, but I seriously thought the other proposals I made were more likely picks. Silly me.)

I wanted to summarize how my teammates and I have taken lots of great ideas from folks like Alla Kholmatova, Daniel Mall, Brad Frost, Anna Debenham, (and Ethan himself) as part of our evolving, pattern-based approach. So the talk touches on:

- Building consensus around the language we use for patterns/components.
- Working in the space in between words and visuals, and using the combination to narrow the abstraction gap between the content model and its visual representation.
- Ways to present patterns that not only document the pattern but also make suggestions for appropriate use.
- Different ways to stage your project to get clients focused practice with the CMS that uses those patterns.

One thing I didn’t get to cover well: my ambivalence around the current state of pattern library tools—I mentioned Patternlab and Fractal briefly in my talk, and my feeling with those tools is that they can be a very useful way to *augment* your process, but I’m wary of building your process around a tool.

One thing I really would really like to see in these pattern library tools is a way to do a “2-Up” view where the small pattern is shown side-by-side with a larger combination of patterns. In my talk I showed some ways we do that at Bluecadet with our documentation, but having the ability to do that within a static prototyping tool would be a good next step.
