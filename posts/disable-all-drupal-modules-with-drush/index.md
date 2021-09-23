---
title: Disable All Drupal Modules with Drush
display_title: Disable All Drupal Modules with Drush
description: ''
date: '2013-05-15T13:52:10-04:00'
tags:
  - drupal
  - web-development
---

Daniel Ochoa had a good tip on how to [use Drush to disable all non-core modules from a Drupal site](http://www.danielochoa.info/blog/disable-all-the-contributed-modules-from-a-site-in-one-drush-line).

```shell
drush pm-disable `drush pm-list --no-core --type=module --pipe`

```
