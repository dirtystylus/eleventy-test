---
title: Lapham’s Quarterly
display_title: Lapham’s Quarterly
description: Developer notes for the Lapham’s Quarterly website.
date: '2014-10-20T14:13:12-04:00'
tags:
  - drupal
  - web-development
  - portfolio
---
A few dev notes on the recently-launched redesign of [Lapham’s Quarterly](http://www.laphamsquarterly.org):

- The site was designed and built by [Bluecadet](http://www.bluecadet.com) (with the exception of the online store, for which we only did the design templates). Design was led by [Theresa Decker](https://twitter.com/treesdecker). [Will Vedder](https://twitter.com/willvedd) and [Greg Sarault](https://twitter.com/gregsarault) handled most of the development. Kevin Zakszewski did a lot of early responsive prototyping during the wireframe and design phases. [Rebecca Smith](https://twitter.com/thesmithsmithly) handled both content strategy and project management (!). I did technical strategy and a few tricky Drupal/JavaScript pieces.
- It’s a Drupal site. Drupal can be a sprawling beast sometimes, but it was a good fit for this project because of the complex relationships between issues, contributors, and individual articles.
- We built and deployed the site on [Pantheon](http://www.getpantheon.com), which allowed us to open up the CMS to content authors in one tier while we developed/tested on the other tiers.
- A lot of Lapham’s Quarterly’s content requirements involved some form of what we internally dubbed “sophisticated whimsy” – *Essays* and *Voices in Time* on the issue page had to be pulled randomly, for instance. We ended up doing a few compound views to achieve complex layouts.
- Artwork and quotes that appear on *Essays* and *Voices in Time* are not directly related to the piece itself (carrying over a hallmark of the print quarterly). For the website, however, Lapham’s Quarterly wanted the artwork and quotes to also be random, lending the piece a slightly different look each time it was loaded. Content authors choose the point at which they want to insert an instance of one of three types of content: a column-width image, a widescreen image, or a quote. These generate markup patterns that then replaced with a random instance of artwork, pulled from the available options for that issue (each issue has a bucket of artwork/quotes).
- Each issue that Lapham’s Quarterly publishes has a signature color. In the website’s design system this translates to a set of four hex values to cover different states: default, rollover, emphasis, etc. We wouldn’t be able to treat those colors as Sass variables, since we didn’t want to have to add to the stylesheet each time Lapham’s Quarterly published a new issue. So they are injected at the page template level, based on the values set by content authors for that issue. The styles … cascade.
- Lapham’s Quarterly needed a way to designate an issue as “Coming Soon”. This meant that any content associated with that issue would not be displayed/linked from the archive pages. We had to write a few hook functions to filter taxonomies prior to display.
- Handling BC dates turned into more of an interesting development problem than we anticipated, because we wanted to keep the actual date value different from the display, to make sorting content by date easier. We ended up writing a small custom module to transform BC dates for display.
- There was a lot of iterative design and development for this project. One example is the slide-out tab allows you to get back to the main issue page. That was originally visible at all times, but as we started testing content we realized that it obscured the widescreen images. So we turned it into a little pull-tab.
- There’s no [single workflow technique](http://alistapart.com/article/prototyping-your-workflow) that emerged from this project, just a general feeling that team conversations around a whiteboard are rarely a waste of time. In most cases we arrived at a faster, more bulletproof solution than if we had sealed ourselves off to work in isolation.

We’re still fine-tuning thing under the hood, but I’m very happy with how the project turned out.
