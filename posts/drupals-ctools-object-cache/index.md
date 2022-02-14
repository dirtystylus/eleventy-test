---
title: Drupal’s Ctools Object Cache
display_title: Drupal’s Ctools Object Cache
description: ''
date: '2011-12-01T13:39:09-05:00'
tags:
  - drupal
  - technologys-betrayal
  - web-development
---
Not sure why (there are so many things I don’t know about Drupal, frankly) but occasionally when creating/cloning a View, I’ll get the following error message when saving:

> PDOException : SQLSTATE\[23000\]: Integrity constraint violation:

I’ve taken to using a workaround gleaned from [this thread on drupal.org](http://drupal.org/node/1123198 "Error message on save view"). I examine the database using Sequel Pro, find the `ctools_object_cache table`, and find the row entry for the View I’m trying to create. Deleting that row and attempting to save again usually does the trick. My guess is that the operation creates the temporary entry in the Ctools object cache, but when saving fails you still have the entry in that table. So attempting to re-save results in a collision with that cached object.
