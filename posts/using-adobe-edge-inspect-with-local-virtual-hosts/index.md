---
title: Using Adobe Edge Inspect with Local Virtual Hosts
display_title: Using Adobe Edge Inspect with Local Virtual Hosts
description: ''
date: '2014-06-19T11:22:47-04:00'
tags:
  - technologys-betrayal
  - web-development
---
At [Bluecadet](http://bluecadet.com) we like to review responsive prototypes and site builds using real devices. One of the tools we use is [Adobe Edge Inspect](https://creative.adobe.com/products/inspect), and it’s always worked well for previewing sites on public URLs. We happen to do a lot of development on our local machines, however, and we’ve never been able to load those via Edge Inspect. Despite the cryptic “Localhost Support” in the product bullet points, we couldn’t find much documentation out there on how to actually do that.

[This blog post is old](https://blogs.adobe.com/edgeinspect/2012/06/19/shadow-xip-io-virtual-hosts-workflow-simplified/) (it still refers to Edge Inspect as “Shadow”) but proved to be extremely helpful. The missing piece turned out to be [xip.io](http://xip.io/), which allows you to map an IP address to a domain name. That domain name gets added as a `ServerAlias` entry in my Apache virtual hosts config:

```apacheconf
<VirtualHost *:80>
    DocumentRoot "/Users/bcideveloper/Sites/localproject"
    ServerName localproject.local
    ServerAlias localproject.*.xip.io
</VirtualHost>
```

So now when I browse using Chrome to the `xip.io` url the connected devices can load the site running off my local server, provided all the devices are connected to the same local network.
