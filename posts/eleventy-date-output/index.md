---
title: "Eleventy: Date Output"
description: Dates, Data files, and Custom Filters in Eleventy.
date: 2020-06-05
tags:
  - eleventy
  - web_development
---

Now that I’ve hit the front end phase of my website rebuild in [Eleventy](https://11ty.dev), I’ve had to figure out a few data output challenges. Here’s something that seemed like it would be simple: printing out the current year for my footer copyright.

There isn’t a ready-made way to do this in Eleventy, but fortunately Jérôme Coupé [already documented one way to do this](https://www.webstoemp.com/blog/from-jekyll-to-eleventy/) using the [Moment.js library](https://momentjs.com). In Eleventy you can [feed things into a filter](https://www.11ty.dev/docs/filters/) using the vertical bar (pipe) `|` symbol. (This is similar to how you pipe Unix commands together, so it made immediate sense to my brain.) So in my footer template I could write something like this, to print out the year:

```twig
Copyright © {{ site.buildTime | date("Y") }} Mark Llobrera
```

Where is that `site.buildTime` variable coming from, though? Thankfully Jérôme also put up the [source code for his site online](https://github.com/jeromecoupe/webstoemp), so I took a look under the hood. Eleventy supports [JavaScript data files](https://www.11ty.dev/docs/data-js/#using-js-data-files) in the `_data` folder, and scopes them to the name of your file. In this case I could create a **\_data/site.js** file with a single variable, `buildTime`:

```js
module.exports = {
  buildTime: new Date(),
};
```

Eleventy automatically scans the data folder, and any variables in that **site.js** file are scoped to `site`. In this case, `site.buildTime` is simply the date when Eleventy runs its most recent build, which would (of course) allow us to grab the current year;

You can use that data file for other site metadata, as [Jérôme does](https://github.com/jeromecoupe/webstoemp/blob/master/src/_data/site.js). In my case I have an existing **metadata.json** file that contains most of that stuff. In the future I might collapse them down to a single file.
