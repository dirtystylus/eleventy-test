---
title: Lando (Docker + Drupal/WordPress)
display_title: Lando (Docker + Drupal/WordPress)
description: Trying out Kalabox successor Lando.
date: '2017-10-23T17:30:45-04:00'
tags:
  - drupal
  - web-development
  - wordpress
---
I’ve been using [Kalabox](http://kalabox.io "Kalabox") quite heavily this past year, to the point where I haven’t even set up the default \*AMP stack on my new(ish) MacBook Pro. The folks behind Kalabox, [Tandem](https://thinktandem.io "Tandem"), [clued me in](https://twitter.com/pirogcommamike/status/902197036983783424) to their latest iteration on that Docker-based VM setup, [Lando](https://docs.devwithlando.io). So far it’s all-CLI, no GUI. That’s not a dealbreaker for me—I pretty much use the CLI for all Kalabox operations except for the initial instantiation.

I took some time to install and run Lando through my typical usage, which is to spin up a local copy of a Pantheon site (Lando can do much more than that, but pretty much all my Drupal/WordPress dev is on Pantheon these days). After installing Lando, you can get your site running in four steps:

- Create the directory for your site
- Run `lando init pantheon` and follow the prompts to choose the site you want. (You’ll need a [Pantheon machine token](https://pantheon.io/docs/machine-tokens/ "Pantheon machine token") for this step.)
- After the site pulls down the codebase, run `lando start`.
- Grab the database and files: `lando pull --code=none --database=live --files=live`. This was a bit confusing to me at first, I thought that this would happen as part of the lando init process. Also, you need to run `lando start` *before* you try to do a pull.

Downsides? If you run anything that uses localhost, Docker takes it over, so any built-in Apache/MySQL/PHP vhosts will be inaccessible until you quit Docker.

Debugging
---------

I’ve written about [debugging in Kalabox](/posts/kalabox-vs-code-and-xdebug/), and setup in Lando is a bit more straightforward in you’re using VS Code:

- Edit **`lando.yml`** and add `xdebug: true` to the recipe, then run `lando rebuild`. This [PHP section in the Lando docs](https://docs.devwithlando.io/services/php.html) was helpful.
- In VS Code’s PHP debugger **`launch.json`** file, add the localSourceRoot and serverSourceRoot (where **`landotest`** is the name of my site directory): 

```json
"configurations": [
{
"name": "Listen for XDebug",
"type": "php",
"request": "launch",
"port": 9000,
"localSourceRoot": "/Users/markllobrera/Lando/landotest",
"serverSourceRoot": "/app/"
},
```