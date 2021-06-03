---
title: Drupal 7 Paragraph Bundle Template Suggestions
display_title: Drupal 7 Paragraph Bundle Template Suggestions
description: Enabling theme debugging in Drupal 7.
date: '2016-11-28T16:04:44-05:00'
tags:
  - drupal
  - web-development
---
A reminder that if you’re creating custom *.tpl* files (for, say, a [paragraph bundle](https://www.drupal.org/project/paragraphs)) then enabling theme debugging in your **`settings.php`** file can be helpful:

```php
$conf['theme_debug'] = TRUE;

```

Which would expose HTML comments that detail template file suggestions:

```html
<!-- FILE NAME SUGGESTIONS:
* paragraphs-item-1366.tpl.php
* paragraphs-item-callout-block-full.tpl.php
x paragraphs-item-callout-block.tpl.php
* paragraphs-item.tpl.php
* entity.tpl.php
-->

```

Where the form is **`paragraphs-item--[paragraph machine (bundle) name]--[view mode].tpl.php`**

This is your reminder that [The Themery’s chapters on theming](http://themery.com/dgd7) from *The Definitive Guide to Drupal 7* are worth bookmarking.
