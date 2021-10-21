---
title: Clearing out Drupal Modules
display_title: Clearing out Drupal Modules
description: ''
date: '2012-03-28T20:46:43-04:00'
tags:
  - drupal
  - technologys-betrayal
  - web-development
---
Ran into an interesting situation today attempting to update a few custom modules on a client’s site. I deactivated and uninstalled the modules in the admin console, and then deleted the module folders. They were still showing up in the module list after that, however. Did some searching on the web and found this thread, which mentions how modules [may still have entries in the database](http://drupal.org/node/981282). That thread suggested clearing out the module references from the “system” table in the database.

I felt sure this was the situation I was facing, so I ran through those steps and had the site’s sysadmin clear out the database references. But even after doing that the modules were still showing up in the list.

In the end it turns out it wasn’t database entries. When deploying my files the sysadmin had moved all the old modules into a folder under the **`sites/all/modules`** folder. So I think Drupal was recursively pulling those old module versions from that nested folder. The sysadmin had claimed he simply replaced all the folders with the build I gave him, but clearly that wasn’t the case.
