---
title: Composer and Homebrew
display_title: Composer and Homebrew
description: A quirky Homebrew/PHP/Composer error.
date: '2018-10-15T16:10:07-04:00'
tags:
  - technologys-betrayal
  - web-development
---
Was firing up a continuous integration-driven Drupal install, and encountered this when running `composer install` after cloning the repo:

`dyld: Library not loaded: /usr/local/opt/icu4c/lib/libicui18n.61.dylib`.

A little bit of searching revealed [this issue](https://github.com/Homebrew/homebrew-php/issues/1710), with the relevant tip:

> brew update &amp;&amp; brew reinstall php56 should work.

I’m running PHP 7.2 in my case, so it was:

`brew update && brew reinstall php72`.
