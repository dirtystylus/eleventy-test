---
title: wavfix
display_title: wavfix
description: 
date: 2019-10-08T10:20:32-04:00
tags:
  - apps
---

Over the weekend Jordan and I ran into a problem with a sound recording from an event. We had an 800 MB WAV file, but something was wrong with the headers — the duration info was showing 00:00, and Audacity/VLC wouldn’t play it.

Enter [wavfix](https://github.com/agfline/wavfix). This runs as a command-line utility (I downloaded a release and put it in `/usr/local/bin`). It managed to read the original file and save out a repaired version which Audacity could open.