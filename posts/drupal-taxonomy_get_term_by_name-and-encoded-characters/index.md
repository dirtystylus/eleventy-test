---
title: Drupal taxonomy_get_term_by_name() and Encoded Characters
display_title: Drupal `taxonomy_get_term_by_name()` and Encoded Characters
description: ''
date: '2013-11-01T16:46:46-04:00'
tags:
  - drupal
---
Drupal’s API method [`taxonomy\_get\_term\_by\_name()`](https://api.drupal.org/api/drupal/modules%21taxonomy%21taxonomy.module/function/taxonomy_get_term_by_name/7) chokes and fails to return the taxonomy term when the term name has encoded characters. The trouble is that term names are usually encoded by the time you pull them from the `$variables` array in a hook. This means that a taxonomy term with an ampersand would not get looked up properly, since the ampersand is encoded as `&amp;` So doing a lookup of a taxonomy term “Help &amp; Resources” actually ends up feeding “Help `&amp;` Resources” to the method.

The solution is to [sanitize the term name before the lookup](http://drupal.stackexchange.com/questions/48191/taxonomy-name-filter-to-get-terms-with-special-characters), like so:

```php
$term_name_sanitized = str_replace('&amp;', '&', $variables['title']);
$term_by_name = taxonomy_get_term_by_name($term_name_sanitized, 'article_category');
```

where `article_category` is the vocabulary name, and `$vars['title']` is the taxonomy name (accessed from the variables array in a hook).
