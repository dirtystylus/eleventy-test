---
title: Setting a destination directory for drush features-export
display_title: Setting a destination directory for drush features-export
description: Creating Drupal 7 Features exports using drush, plus how to specify the directory for the feature.
date: '2016-02-18T14:47:00-05:00'
tags:
  - drupal
  - web-development
---
Drupal’s [*drush*](https://github.com/drush-ops/drush) shell has a number of interesting uses, but when I’m working in Drupal 7 my primary use for it is to generate [Features](https://www.drupal.org/project/features) configuration exports for content types or views. Usually that means using `drush fu` (features-update) to quickly re-create an existing feature I’ve created using the admin UI. But a recent PHP memory usage lockup had me investigating if I could do this from the command line. Turns out it’s pretty easy. The form is

```shell
drush fe [feature name] [feature component]

```

For example,

```shell
drush fe amenities_view views_view:amenities

```

Doing that puts things into **`sites/all/modules`**. But what if you have your modules in a subfolder, say **`sites/all/modules/custom/features`**? Well, enter the `--destination` flag. So you can do:

```shell
drush fe amenities_view views_view:amenities --destination=sites/all/modules/custom/features

```

It appears that the `--destination` flag can be used for other drush commands as well, like downloading contrib modules. Something like:

```shell
drush dl admin_views --destination=sites/all/modules/contrib

```

[This post by Mike Stiv](http://www.mikestiv.com/blog/use-drush-add-component-feature-pro) has a lot of great examples for working with Features and drush.
