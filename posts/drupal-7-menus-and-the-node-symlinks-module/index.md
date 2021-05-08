---
title: Drupal 7 Menus and the Node Symlinks Module
display_title: Drupal 7 Menus and the Node Symlinks Module
description: Using the Node Symlinks module in Drupal 7 to sort out menu priority.
date: '2017-06-23T16:23:13-04:00'
tags:
  - drupal
  - technologys-betrayal
  - web-development
---
Ran into a situation where I had a single node that was assigned a spot in multiple menus. Trouble came about when I wanted to render an expanded submenu for that node and its children, which were only assigned in one of the menus. I had one menu:

* Utility Menu 
    * Section Page 
        * Section Page Child 1
        * Section Page Child 2

and another menu:

- Footer Menu 
  - Section Page

When I went to render the children of Section Page in a secondary navigation tree, it kept finding the Footer menu as the parent of my Section Page, not the Utility Menu entry.

Enter [Node Symlinks](https://www.drupal.org/project/nodesymlinks), which allows you to map and weight those menu items as distinct entries, each with their own url alias. The menu link you assign the lower weight gets priority when it comes to picking which menu the node belongs to.
