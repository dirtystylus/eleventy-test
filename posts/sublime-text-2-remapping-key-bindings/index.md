---
title: 'Sublime Text 2: Remapping Key Bindings'
display_title: 'Sublime Text 2: Remapping Key Bindings'
description: ''
date: '2012-08-15T13:45:04-04:00'
tags:
  - technologys-betrayal
  - web-development
---
While looking for a way to remap the keyboard shortcut for “Enter Full Screen” to “Replace All”, I kept running into a wall. Merely specifying the same keyboard shortcut didn’t work, as Sublime Text seemed to favor the default mapping. [I stumbled onto this note](http://sublimetext.userecho.com/topic/89378-support-unbinding-of-keys/), however, which illustrated how to unbind a keyboard shortcut:

```json
{ "keys": ["alt+shift+left"], "command": "unbound" }

```

So I ended up unbinding the shortcut, and then remapped it:

```json
{ "keys": ["super+ctrl+f"], "command": "unbound" },
{ "keys": ["super+ctrl+f"], "command": "replace_all", "args": {"close_panel": true},
     "context": [{"key": "panel", "operand": "replace"}, {"key": "panel_has_focus"}]
}

```
