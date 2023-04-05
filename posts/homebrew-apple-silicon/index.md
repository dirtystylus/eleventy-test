---
title: Homebrew and Apple Silicon Macs
display_title: Homebrew and Apple Silicon Macs
description: 
date: '2023-04-05T13:50:48.367-04:00'
tags:
  - apple
  - macos
  - technologys-betrayal
  - web-development
---

While kicking the tires on Autogram’s content tool[^1] [Spidergram](https://github.com/autogram-is/spidergram) I ran into a puzzling error:

```
Error: dlopen(/Users/markllobrera/git-workspace/ammp-spidergram/node_modules/canvas/build/Release/canvas.node, 0x0001): symbol not found in flat namespace (_cairo_fill)
    at Object.Module._extensions..node (node:internal/modules/cjs/loader:1361:18)
    at Module.load (node:internal/modules/cjs/loader:1133:32)
    at Function.Module._load (node:internal/modules/cjs/loader:972:12)
    at Module.require (node:internal/modules/cjs/loader:1157:19)
    at require (node:internal/modules/helpers:119:18)
    at Object.<anonymous> (/Users/markllobrera/git-workspace/ammp-spidergram/node_modules/canvas/lib/bindings.js:3:18)
    at Module._compile (node:internal/modules/cjs/loader:1275:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1329:10)
    at Object.require.extensions.<computed> [as .js] (/Users/markllobrera/git-workspace/ammp-spidergram/node_modules/ts-node/src/index.ts:1608:43)
    at Module.load (node:internal/modules/cjs/loader:1133:32) {
  code: 'ERR_DLOPEN_FAILED'
```

A few dozen browser tabs later it appeared that this was related to [dependencies that were not compatible with ARM64](https://github.com/Automattic/node-canvas/issues/2192), aka the architecture used by the new Mx series of Apple silicon. *Further* investigation revealed that it wasn’t just the NodeJS packages, but the Python dependencies underneath. 

\[Deep Breath\]

My initial instinct, as is typical, was to set my machine on fire and renounce this career.

I slept on it instead, and here was what I found:

* I had used Migration Assistant to go from my Intel-based MacBook Pro to this M1-based Pro, and that meant that my Homebrew formulae were a mish-mash of Intel 64 and ARM64 versions
* My installed version of Python was pretty old, 2.7.x-era

To clean this up:

* I reinstalled Homebrew to `/opt/homebrew` using the default instructions
* Added `/opt/homebrew/bin` to my `$PATH`
* Created a **`Brewfile`** using `brew bundle dump` in **`/usr/local/bin`**, and then copied this file over to **`/opt/homebrew/bin`**
* Made sure I was using the new brew: `which brew`, pointing to **`/opt/homebrew/bin`**
* Ran `brew bundle` in the dir with the **`Brewfile`** to install my formulae into the new Homebrew bin
* I used `pyenv` to install the latest Python version, `pyenv install 3.11.2`

After all that I was able to run `npm install` within my Spidergram project and those dependencies now pointed to the latest Python version. 

All of this reminded me of Alex Riviere’s recent post, [“Delete Your Dev Environment Regularly”](https://alex.party/posts/2023-03-23-delete-your-dev-environment-regularly/). I think if I had to do things over I would have chosen *not* to use Migration Assistant and reinstalled my tooling from scratch.

[^1]: This does Spidergram a disservice, it is a really ambitious and exciting inventory/analysis tool 