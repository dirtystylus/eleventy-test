---
title: Trying out VS Code
display_title: Trying out VS Code
description: Setting fonts and Terminal app in VS Code.
date: '2016-11-30T14:41:04-05:00'
tags:
  - text-editors
  - web-development
---
After a [couple of weeks of using Atom](/posts/trying-out-atom/) I’m kicking the tires on [VS Code](https://code.visualstudio.com). I like Atom, and I may continue to use it (especially given that I managed to get PHP/Drupal debugging going).

Changing Fonts
--------------

One of the first things that I couldn’t figure out how to set was my preferred [editor font](http://stackoverflow.com/questions/29960057/which-font-is-used-in-visual-studio-code-editor-and-how-to-change-fonts#30605449). Finally found the **editor.fontFamily** and **editor.fontSize** settings, which you can override. I used:

```json
// Controls the font family.
"editor.fontFamily": "'Input Sans', Menlo, Monaco, 'Courier New', monospace",

// Controls the font size in pixels.
"editor.fontSize": 14,

```

Terminal
--------

For good measure I changed up the external Terminal application to point to iTerm:

```json
// External Terminal

// Customizes which terminal application to run on OS X.
"terminal.external.osxExec": "iTerm2.app",

```
