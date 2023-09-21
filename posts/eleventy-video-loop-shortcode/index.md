---
title: 'Eleventy: A Paired Shortcode for Looping Video'
display_title: 'Eleventy: A Paired Shortcode for Looping Video'
description: Adding GIF-like looping video to my site.
date: '2023-09-21T08:31:07.524-04:00'
tags:
  - eleventy
  - web-development
---

While writing up my memories from my summer trip I had to figure out how I wanted to deal with video—should I upload things to Vimeo and embed them? Or finally figure out something I’ve put off for a while—embedding video directly off my site, just like I do with images?

In the end I didn’t have to figure out much, because Tyler Sticka and Cloud Four already did most of the work with their recent writeup [“Accessible Animated GIF Alternatives”](https://cloudfour.com/thinks/accessible-animated-gif-alternatives/). I did have a few remaining bits that I needed to figure out, the first one being an item that Tyler left as a breadcrumb in his post:

> You may want to restrict the playback toggle to clips the visitor hasn’t explicitly played or paused themselves. My colleague Paul Hebert wrote [an excellent tutorial for that sort of thing](https://cloudfour.com/thinks/detecting-if-an-event-was-triggered-by-a-user-or-by-javascript/).
>
> To improve performance, consider using [intersection observers](https://css-tricks.com/a-few-functional-uses-for-intersection-observer-to-know-when-an-element-is-in-view/#aa-use-case-2-auto-pause-video-when-its-out-of-view) to only play clips when visible.

The other one was figuring out how to get Eleventy to render the video markup properly, but luckily I had written up some things about [paired shortcodes](/posts/eleventy-paired-shortcodes-and-markdown-rendering/) in the past.

## Play/Pause with Intersection Observer

I wanted videos to remain paused until the user scrolled them into view. I started with this snippet from [skara9 on Stack Overflow](https://stackoverflow.com/a/70192135):

```js
const videos = document.querySelectorAll("video"); // Select ALL the Videos
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      entry.target.pause(); // Pause the TARGET video
    } else {
      entry.target.play(); // Play the TARGET video
    }
  });
}, {});
for (const video of videos) observer.observe(video); // Observe EACH video
const onVisibilityChange = () => {
  if (document.hidden) {
    for (const video of videos) video.pause(); // Pause EACH video
  } else {
    for (const video of videos) video.play(); // Play EACH video
  }
};
document.addEventListener("visibilitychange", onVisibilityChange);
```

I made one small change, pulled from Tyler’s post: adding a check for a user’s OS-level reduced motion setting. If that reduced motion setting is set to `true` then I leave it up to the user to initiate playback when the video scrolls into view:

```js/1,8,19
// autoplay using intersection observer
const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
const videos = document.querySelectorAll("video"); // Select ALL the Videos
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      entry.target.pause(); // Pause the TARGET video
    } else {
      if (isReduced) return;
      entry.target.play(); // Play the TARGET video
    }
  });
}, {});
for (const video of videos) observer.observe(video); // Observe EACH video
const onVisibilityChange = () => {
  if (document.hidden) {
    for (const video of videos) video.pause(); // Pause EACH video
  } else {
    for (const video of videos) {
      if (isReduced) return;
      video.play(); // Play EACH video
    }
  }
};
document.addEventListener("visibilitychange", onVisibilityChange);
```

I put this into a [**`videoloop.js`**](https://github.com/dirtystylus/eleventy-test/blob/295c3965ad2a9eee908432d3165127a2de4ef8a2/js/videoloop.js) file that I include on post templates.

## A Paired Shortcode for `<video>` markup

How to get this into Eleventy, though? I had three variables that needed to get rendered in the markup:

* My video url (for me this is always in the same directory as my markdown file)
* An optional caption
* Alt text for assistive devices
 
Here’s the markup pattern I have, built off Tyler’s example:

```html/1-2,4
<div class="video">
  <video controls="" loop="" autoplay="" muted="" playsinline="" aria-labelledby="video-label" src="[my video url]"></video>
  [an optional caption]
  <div id="video-label" class="visually-hidden" aria-hidden="true">
    [alt text for assistive devices]
  </div>
</div>
```

In my **`.eleventy.js`** file I define the Paired Shortcode `videoloop`. The first variable `content` is what is within the “body” of the paired shortcode, and any other variables (in this case `data` and `alt`) are fed in the opening `{% raw %}{% videoloop %}{% endraw %}` tag:

```js
eleventyConfig.addPairedShortcode(
  "videoloop", (content, data, alt) => {
    const videoURL = markdownLibrary.renderInline(data.trim());
    const altText = markdownLibrary.renderInline(alt.trim());
    const divContent = markdownLibrary.renderInline(content.trim());
    return `<div class="video"><video controls loop autoplay muted playsinline aria-labelledby="video-label" src="${videoURL}"></video>${divContent}<div id="video-label" class="visually-hidden" aria-hidden="true">${altText}</div></div>`;
  }
);
```

Finally, here’s what the Paired Shortcode looks like in a Markdown file:

```twig
{% raw %}
{% videoloop "./phl-jpn-elnido-biglagoon.mp4", "View from behind multiple kayaks paddling between small islands." %}

Entering Big Lagoon (no audio). [*Full version on Flickr*](https://flic.kr/p/2p3MSMV).

{% endvideoloop %}
{% endraw %}
```

On my [El Nido post](/posts/philippines-japan-2023-part-2/) I elected to embed smaller videos with no sound (replicating how I might have used an animated GIF) and link to a longer, higher-res version on Flickr. That’s not necessary, though—I was mostly trying to be mindful about users’ bandwidth.
