---
title: Overriding Drupal 7 Field Collection Templates
display_title: Overriding Drupal 7 Field Collection Templates
description: How to create a template suggestion file to theme Drupal 7 field collection output.
date: '2014-01-06T12:57:41-05:00'
tags:
  - drupal
---
Occasionally you’ll want to theme a field collection. I’ve done this in the past at the node template level, by walking through the content array and pulling the field collection item, then looping through to find the child that has a numeric index. Pretty convoluted:

```php
<?php
    foreach($content['field_image_item'] as $key=>$field_collection) {
    if(is_numeric($key) && !empty($field_collection['entity']['field_collection_item'])) {
      $field_image_item = current($field_collection['entity']['field_collection_item']);
        print '<li>';
        print '<div class="img">';
        print render($field_image_item['field_image_asset']);
        print '</div>';
        print '<div class="flex-caption">' . render($field_image_item['field_image_caption']) . '</div>';
        print '</li>';
    }
  }
?>

```

And—as it turns out—completely unnecessary in most cases, because you can override a field collection item by simply creating a template file with the name **`field-collection-item--field-[fieldname].tpl.php`**. So, for the example above I could have just created a template named **`field-collection-item--field-image-item.tpl.php`**. You can use the template file **`field-collection-item.tpl.php`** in the field\_collection module folder as a starting point.

So at the node template level you could just render the field:

```php
<?php print render($content[field_image_item’]); ?>

```

and in the new template you have direct access to the child fields without needing to test for a numeric index:

```php
<li>
<div class="img">
    <?php print render($field_image_item['field_image_asset']); ?>
</div>
<div class="flex-caption">
    <?php print render($field_image_item['field_image_caption']); ?>
</div>
</li>

```

*Many thanks to my colleague Putra Roeung for the tip.*
