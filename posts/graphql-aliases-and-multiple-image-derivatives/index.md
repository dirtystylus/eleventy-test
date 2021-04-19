---
title: 'GraphQL, Aliases, and Multiple Image Derivatives'
display_title: 'GraphQL, Aliases, and Multiple Image Derivatives'
description: An exploration of GraphQL aliases for image derivative queries in Drupal 8.
date: '2018-08-13T16:22:19-04:00'
tags:
  - drupal
  - web-development
---
As part of Bluecadet’s Drupal 8-as-data-API setup we often need to deliver multiple derivatives of an image to products. So the first step was figuring out how to get output for an image field within a Media bundle. That looks something like this:

```graphql
query{
 nodeQuery(limit: 100, filter: {conditions: [{field: "type", value: "hotspot", operator: EQUAL}]}) {
   entities {
   entityLabel
   ... on NodeHotspot {
     fieldName,
     title,
     fieldThumbnailImage {
      entity {
        ... on MediaImage {
          fieldMediaImage {
            url
            width
            height
            alt
            title
          }
        }
      }
    },
   }
  }
 }
}

```

Where we have to grab the field which contains a Media bundle of type Image (`MediaImage`), and get the actual image field within that bundle (`fieldMediaImage`). This results in the output for the `url`, `width`, `height`, `alt`, and `title` fields at the original upload size. Which is fine, but what if you want an image derivative, say the `thumbnail` image style?

```graphql
query{
 nodeQuery(limit: 100, filter: {conditions: [{field: "type", value: "hotspot", operator: EQUAL}]}) {
   entities {
   entityLabel
   ... on NodeHotspot {
     fieldName,
     title,
     fieldThumbnailImage {
      entity {
        ... on MediaImage {
          fieldMediaImage {
            derivative(style: THUMBNAIL) {
              url
              width
              height
            }
            url
            width
            height
            alt
            title
          }
        }
      }
    },
   }
  }
 }
}

```

In this case we’ve added a derivative filter (I think that’s the right term) for the image style *THUMBNAIL* (all-caps seems to be required by the GraphiQL interface included with the Drupal 8 GraphQL module). Within that filter we’re getting the `url`, `width`, and `height` (I’ve left the fields for the original source size outside the derivative block).

What about two (or more) derivatives? Enter query *aliases* (see this [helpful post](https://medium.com/graphql-mastery/graphql-quick-tip-aliases-567303a9ddc5) for more).

```graphql
query{
 nodeQuery(limit: 100, filter: {conditions: [{field: "type", value: "hotspot", operator: EQUAL}]}) {
   entities {
   entityLabel
   ... on NodeHotspot {
     fieldName,
     title,
     fieldThumbnailImage {
      entity {
        ... on MediaImage {
          fieldMediaImage {
            thumbnail:derivative(style: THUMBNAIL) {
              url
              width
              height
            }
            large:derivative(style: LARGE) {
              url
              width
              height
            }
            url
            width
            height
            alt
            title
          }
        }
      }
    },
   }
  }
 }
}

```

In this block we’re aliasing two queries for image style derivatives to `thumbnail` and `large`, respectively: (`thumbnail:derivative(…` and `large:derivative(…`). In fact, you can alias anything. So if you don’t want your output to say `entity`, you could just stick an alias in front, like `image_sizes:entity`.
