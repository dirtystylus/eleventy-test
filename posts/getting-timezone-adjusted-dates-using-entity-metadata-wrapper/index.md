---
title: Getting Timezone-adjusted Dates using Entity Metadata Wrapper
display_title: Getting Timezone-adjusted Dates using Entity Metadata Wrapper
description: 'Basically, don’t try and sidestep Entity Metadata Wrapper in the final mile.'
date: '2016-05-18T23:31:21-04:00'
tags:
  - drupal
  - technologys-betrayal
  - web-development
---
Given a repeatable date field `field_date_repeat` that you know has only a single value, you might be tempted to drill down into dates like this:

```php
$event_date = array();
// assume you’ve already created $item_wrapper
$date = $item_wrapper->field_date_repeat->value();
if (isset($date) && !empty($date)) {
  $event_date['date_start'] = format_date(strtotime($item_wrapper->field_date_repeat[0]['value']), 'custom', 'm-d-Y');
  $event_date['date_end'] = format_date(strtotime($item_wrapper->field_date_repeat[0]['value2']), 'custom', 'm-d-Y');
  $event_date['time_start'] = format_date(strtotime($item_wrapper->field_date_repeat[0]['value']), 'custom', 'g:ia');
  $event_date['time_end'] = format_date(strtotime($item_wrapper->field_date_repeat[0]['value2']), 'custom', 'g:ia');
}

```

Except that you now have a date that isn’t properly converted for your timezone, because you’ve sidestepped the EntityMetadataWrapper `value()` method which would convert the date for you. Also, it turns out that a date is treated as an `EntityListWrapper`, so you actually might just want to grab the first value, like so:

```php
$event_date = array();
// assume you’ve already created $item_wrapper
$date = $item_wrapper->field_date_repeat->value();
if (isset($date) && !empty($date)) {
  $event_date['date_start'] = format_date($item_wrapper->field_date_repeat[0]->value->value(), 'custom', 'm-d-Y');
  $event_date['date_end'] = format_date($item_wrapper->field_date_repeat[0]->value2->value(), 'custom', 'm-d-Y');
  $event_date['time_start'] = format_date($item_wrapper->field_date_repeat[0]->value->value(), 'custom', 'g:ia');
  $event_date['time_end'] = format_date($item_wrapper->field_date_repeat[0]->value2->value(), 'custom', 'g:ia');
}

```

In this case you are using the `value()` method as the final step, which properly converts the date. As with most Entity Metadata Wrapper quirks, it pays to always use the `value()` method to get the properly converted value. I think of this almost like how using `render()` when theming uses the proper display formatter you’ve chosen.

This Drupal.org post: [(\[SOLVED\] How to get a timestamp when using Date Popup from the Date module?)](https://www.drupal.org/node/994134#comment-3810264) was very helpful, explaining that dates are stored in UTC format, so if you don’t retrieve that date via `value()`, you’re not localized to your timezone.
