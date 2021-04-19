---
title: PHP 7.x on MacOS via Homebrew
display_title: PHP 7.x on MacOS via Homebrew
description: Using homebrew to update PHP to version 7.1
date: '2018-06-11T15:23:24-04:00'
tags:
  - drupal
  - technologys-betrayal
  - web-development
---
This handy [PHP Intellisense](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-intellisense) VS Code extension requires PHP 7 and up, so I finally decided to upgrade the onboard PHP on my Macbook Pro.

I used this: <https://stackoverflow.com/questions/42537955/installing-php-using-homebrew-on-mac#42538097>. (Earlier guides have instructions to run `brew tap…` instructions that are no longer necessary. Not sure how tap deprecation happens but they were apparently moved into core homebrew?)

In the end it was as simple as `brew install php`, which installed v7.2.6. I didn’t set Apache to run off it yet, though, since I don’t use the default MacOS web server anymore.
