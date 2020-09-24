---
title: 'Guido van Rossum on “Cryptic Code”'
display_title: 'Guido van Rossum on “Cryptic Code”'
description: 'Some quotes on clever code and maintainability by Guido van Rossum'
date: '2019-11-18T16:25:37-05:00'
tags:
  - link
  - programming
---
[This farewell to Guido van Rossum (creator of Python) on the Dropbox blog](https://blog.dropbox.com/topics/company/thank-you--guido) has some notes and quotes on code style and maintainability that resonated with me:

> …as the company grew, new engineers who joined couldn’t understand the code. Clever code is usually short and cryptic, written by and for the individual who came up with it, but is hard for anyone else to understand—and nearly impossible to maintain. Guido called this “cowboy coding culture”. He recognized its value in our early stages of trying to implement things quickly, but knew it wouldn’t be sustainable over time…
> 
> “When asked, I would give people my opinion that maintainable code is more important than clever code,” he said. “If I encountered clever code that was particularly cryptic, and I had to do some maintenance on it, I would probably rewrite it. So I led by example, and also by talking to other people.”

It’s not always limited to new engineers, either. How often have you come across a piece of clever code, cursed under your breath at the person who wrote it, and then checked `git blame` to realize that the culprit was yourself, from several months/years prior?

The whole post reminded me of Christian Heilmann’s post, [“Terseness Tension”](https://christianheilmann.com/2019/10/01/terseness-tension/), for which I also [wrote notes](http://dirtystylus.com/2019/10/04/terseness-tension/).