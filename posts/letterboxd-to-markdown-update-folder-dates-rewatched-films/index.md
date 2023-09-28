---
title: 'Letterboxd to Markdown Update: Folder Dates for Rewatched Films'
display_title: 'Letterboxd to Markdown Update: Folder Dates for Rewatched Films'
description: Adjusting for rewatched films
date: '2023-09-28T10:18:23.854-04:00'
tags:
  - film
  - eleventy
  - web-development
---

A while back I wrote a small [script for converting my Letterboxd data to Markdown](/posts/letterboxd-to-markdown). However, using it over the last couple of months it’s clear that I needed a better strategy for dealing with rewatches. 

The original script would check if a film’s folder name already existed, and skip it if that was the case. Except…for a rewatch I actually *want* to log the film again. I was dealing with this in an ad-hoc fashion, renaming the earlier log entry to something like `filmname-1`, but this manual process felt unsustainable.

Enter: dates. I’m now appending the date to the film name by default, so there would be no collisions with future rewatches:

```js
const filmStub = filmURIParts[5];
const watchedDateFormatted = await this.readableDate(watchedDate);
const filmFolder = `${filmStub}-${watchedDateFormatted}`;
const parentFolder = process.env.OUTPUT_DIR;
const folderName = `./${parentFolder}/${filmFolder}`; // this is always going to be the film path
const posterImagePath = `/${parentFolder}/${filmFolder}/${filmStub}.jpg`;
```

I’m using [Luxon](https://moment.github.io/luxon/) to help with dates in a helper function:

```js
this.readableDate = async (dateObj) => {
	if (typeof dateObj === 'string') {
		return DateTime.fromISO(dateObj, { zone: "utc" }).toFormat(
			"yyyyMMdd"
		);
	} else {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
			"yyyyMMdd"
		);
	}
}
```

Full code is available on [Github](https://github.com/dirtystylus/letterboxd-to-markdown).

