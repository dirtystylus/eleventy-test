---
title: Publish/Unpublish Permissions in Drupal 8
display_title: Publish/Unpublish Permissions in Drupal 8
description: Override Node Options module for Drupal 8.
date: 2019-06-04T10:22:10-04:00
tags:
  - drupal
  - web-development
---
It appears that the default permissions options don’t expose this option, so any non-admin roles will not be able to check/uncheck the “Publish” checkbox on a node.

I tried:

- <https://www.drupal.org/project/publishcontent>
- [https://www.drupal.org/project/override\_node\_options](https://www.drupal.org/project/override_node_options)

Of the two, Override Node Options was a better fit — it exposed permissions for publish/unpublish transparently, whereas the Publish Content module added tabs for Publish/Unpublish, which is not where most content authors would expect to find those options.

![Tab bar for the Drupal 8 node edit form, with a red arrow pointing to the "Unpublish" tab](drupal-publishcontent.png)
