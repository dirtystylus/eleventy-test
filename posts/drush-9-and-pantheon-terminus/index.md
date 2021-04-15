---
title: Drush 9 and Pantheon Terminus
display_title: Drush 9 and Pantheon Terminus
description: Resolving a strange drush/terminus conflict on Pantheon.
date: '2018-06-05T14:05:48-04:00'
tags:
  - drupal
  - technologys-betrayal
  - web-development
---
While using terminus (1.8.0) with a local lando environment connected to a Pantheon sandbox I ran into an error: `[preflight] Unable to parse at line 2 (near "<?php").` Looking in the terminus repo issue queue I noticed that the error was [documented here by Duran Goodyear](https://github.com/pantheon-systems/terminus/issues/1849). Duran noted that Pantheon does not (yet) support drush version 9, which is what you get these days if you run composer (`composer require drush/drush`) on your project. If you push that up you will get the error if you try to run any [terminus commands](https://pantheon.io/docs/terminus/commands/).

What solved things was to downgrade drush in my local [lando](https://docs.devwithlando.io) instance to the drush 8.1.x version. Pushing the codebase with that version of drush in the vendor folder resolved the terminus errors. (In my case I had to [manually change the drush version](https://github.com/pantheon-systems/terminus/issues/1849#issuecomment-387871773) in my composer.json file, since running `composer remove drush/drush` didn’t work).
