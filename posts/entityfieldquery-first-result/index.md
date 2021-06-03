---
title: Getting the First Result from EntityFieldQuery
display_title: Getting the First Result from EntityFieldQuery
description: How to grab the first result of an Entity Field Query.
date: '2016-05-16T14:50:37-04:00'
tags:
  - drupal
  - web-development
---
[EntityFieldQuery](https://www.drupal.org/node/1343708) returns an array of nodes indexed by `nid`, so to grab a specific one (say, the first one) it’s easier to dump the ids into an array so you can pop the first one. Like:

```php
  $node_query = new EntityFieldQuery();
  $node_query->entityCondition('entity_type', 'node')
    ->entityCondition('bundle', 'article')
    ->range(0,1)
    ->propertyCondition('status', NODE_PUBLISHED)
    ->addMetaData('account', user_load(1)); // Run the query as user 1.

  $query_result = $node_query->execute();
  if (isset($query_result['node'])) {
    $nids = array_keys($query_result['node']);
    // now you can grab $nids[0];
  } 

```

[This post](http://www.sitepoint.com/understanding-drupals-entityfieldquery/) was helpful in figuring this out.
