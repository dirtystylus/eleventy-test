---
title: 'GraphQL: Adding Fields to Types in Drupal 8'
display_title: 'GraphQL: Adding Fields to Types in Drupal 8'
description: Diving into custom GraphQL fields for Drupal 8.
date: '2018-09-12T11:22:45-04:00'
tags:
  - drupal
  - web-development
---
GraphQL has been a lot of fun to use, and it’s injected some much-needed flexibility into some of our recent projects. For simple projects it’s allowed us to focus on creating good content structures, and reduced the amount of effort on generating API output for our applications

One challenge we’ve encountered is what to do when the built-in schema and processing needs a bit of intervention. For example, we often build our interactive projects using Cinder, a C++ framework. Our text rendering engine within Cinder can handle simple tags (`<b><i><br><p><em><strong>`) so we try to strip out tags that don’t belong to that subset.

The first thing we tried was to define a class extending the TextItem class, and override the class that did processing for text fields, by using the `hook_field_info_alter()` hook. This worked — you could query for both the `processed` and `processedCinder` attributes under a text field.

In an attempt to simplify further, I took some time to delve into Philipp Melab’s post on [adding fields to the GraphQL schema](https://www.amazeelabs.com/en/blog/extending-graphql-part1-fields). Using that as a guide, I was able to add a `cindertext` field to text fields by defining one class:

```php
<?php

namespace Drupal\my_project\Plugin\GraphQL\Fields;

use Drupal\graphql\GraphQL\Execution\ResolveContext;
use Drupal\graphql\Plugin\GraphQL\Fields\FieldPluginBase;
use GraphQL\Type\Definition\ResolveInfo;

define('CINDER_ALLOWED_TAGS', '<b><i><br><p><em><strong>');

/**
* A text transformation for Cinder
* 
* @GraphQLField(
*   id = "cindertext",
*   secure = true,
*   name = "cindertext",
*   type = "String",
*   field_types = {"text","text_long"},
*   deriver = "Drupal\graphql_core\Plugin\Deriver\Fields\EntityFieldPropertyDeriver",
* )
*/
class CinderText extends FieldPluginBase {

  /**
  * {@inheritdoc}
  */
  public function resolveValues($value, array $args, ResolveContext $context, ResolveInfo $info) {
  $text = $value->processed;

  // Avoid doing unnecessary work on empty strings.
  if (!isset($text) || $text === '') {
    yield '';
  }
  else {
    $new_text = strip_tags($text, CINDER_ALLOWED_TAGS);
    $new_text = html_entity_decode($new_text);

    $new_text = preg_replace( "/\r|\n|\t/", "", $new_text);
    $new_text = trim($new_text);
    yield $new_text;
  }
  }
}

```

The `@GraphQLField` [annotation](https://www.drupal.org/docs/8/api/plugin-api/annotations-based-plugins) is the key here, allowing me to define the field types that I want the new field to be attached to. Since my goal was just to filter the processed value of the text field, the class only has to implement the `resolveValues()` method.

My query can now ask for `cindertext` as well as the built-in `processed` field:

```php
{
  nodeQuery(limit: 100, filter: {conditions: [{field: "type", value: "vessel", operator: EQUAL}]}) {
    entities {
      entityLabel
      ... on NodeVessel {
        title
        fieldVesselName {
          processed
          cindertext
        }
        fieldInnovationDescription {
          processed
          cindertext
        }
      }
    }
  }
}

```
