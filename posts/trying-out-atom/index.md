---
title: Trying out Atom
display_title: Trying out Atom
description: The first of my ongoing notes on trying the Atom text editor.
date: '2016-11-01T17:40:54-04:00'
tags:
  - text-editors
  - web-development
---
I’ve been a [TextMate](http://macromates.com) user for years (and years, and years). I’ve dipped my toe into the [Sublime Text](http://www.sublimetext.com) waters, but its UI has always driven me back to TextMate. For the most part that works really well, but lately I’ve been looking for something that supports PHP autocompletion and debugging. I don’t necessarily want to go all-in on an IDE like [PHPStorm](http://www.jetbrains.com/phpstorm/) if I don’t have to.

So I’m kicking the tires on [Atom](http://atom.io), on a recommendation from my teammate [Henry Steinberg](http://henrysteinberg.com). I’m going to spend some time every day in the editor, and I’ll occasionally post updates here on the blog.

Columns
-------

One of the first things I did was try to figure out how to get Atom’s column selection a bit closer to TextMate’s. In TextMate `Alt` is the magic key to trigger column editing. Atom doesn’t have a similar trigger, just shortcuts for adding to a selection up/down. I tried remapping those using the OS X (sorry, are we calling it Mac OS yet?) keyboard shortcuts, but that didn’t work. Turns out the key mappings are in the Atom **`keymap.cson`** file (found under the *Atom > Keymap* menu item). I added these to the bottom:

```json
"atom-text-editor":
    "alt-up": "editor:add-selection-above"
    "alt-down": "editor:add-selection-below"

```

That brings it a little bit closer to my TextMate muscle memory. `Alt+Up` to select a column above, `Alt+Down` for the reverse.

So far in my testing it looks like you have to hit `Esc` to exit column editing. That seems to be the reverse of TextMate’s behavior, where you can just move the cursor up/down to exit the mode (probably because TextMate uses the `Esc` for text completion).
