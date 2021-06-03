---
title: Link Widget in Drupal 7 Custom Forms
display_title: Link Widget in Drupal 7 Custom Forms
description: How to render an input field for a link in a Drupal 7 custom form.
date: '2016-10-13T16:39:52-04:00'
tags:
  - drupal
  - web-development
---
Via [Will Vedder](https://willvedder.com): if you want to embed a [link](https://www.drupal.org/project/link) widget (with Title and URL fields) in a form, you can do something like this (in your code that uses the Form API to build the form):

```php
$form['my_link']() = array(
    '#type' => 'link_field',
    '#title' => t('CTA Link'),
    '#description' => t('Optional Call to Action link.'),
    '#field_name' => 'link_field',
    '#field_parents' => array(),
    '#language' => 'und',
    '#delta' => 0,
);

```

That is different from simply rendering a link in the form:

```php
$form['my_link']() = array(
    '#type' => 'link',
    '#title' => t('Example link'),
    '#href' => 'http://foo.com',
);

```
