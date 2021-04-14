---
title: GraphQL Queries in Postman and Browsers
display_title: GraphQL Queries in Postman and Browsers
description: Getting GraphQL queries into other tools.
date: '2018-10-18T11:43:44-04:00'
tags:
  - web-development
---
[This StackOverflow post](https://stackoverflow.com/questions/42520663/how-to-send-graphql-query-by-postman) was helpful for figuring out how to get your query from the GraphiQL explorer into [Postman](https://www.getpostman.com/apps).

I also wanted to figure out how to get the query into something I could just load up in a browser, so I just copied the query out of GraphiQL, URL encoded it in TextMate, and passed it in via a query string variable named, uh, `query`:

```
http://[SITE URL]/graphql?query=[PASTED STUFF HERE]

```

Turns out, you can just take that encoded URL and just paste it straight into the URL field in Postman, too, so you probably won’t have to do the whole dance described in the StackOverflow post after all, as long as you’re willing to do some string manipulation in your text editor.
