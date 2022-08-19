---
title: Changing the Default Avatar in WordPress
display_title: Changing the Default Avatar in WordPress
description: ''
date: '2011-09-02T11:02:08-04:00'
tags:
  - web-development
  - wordpress
---
This [post by Nikhil Misai](http://nikhilmisal.com/how-to-change-default-gravatar-in-wordpress/ "How to Change Default Gravatar in WordPress") cleared up some confusion I had yesterday. I had added a filter to override the avatar default with a local file in my template’s images directory, but every how-to I read neglected to mention the final step of setting the default avatar in the the Settings &gt; Discussion settings. I had (incorrectly) assumed that the filter would override any avatar setting when rendering the final output, but it appears that the filter merely makes a new default available in the settings.
