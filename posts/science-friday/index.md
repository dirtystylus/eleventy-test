---
title: Science Friday
display_title: Science Friday
description: Launch notes for Science Friday’s new website.
date: '2015-10-21T13:46:43-04:00'
tags:
  - bluecadet
  - web-development
  - wordpress
  - portfolio
---
*Update 2015-11-02: Corrected references to their previous CMS—it was a custom CMS, not a MovableType-based one. The MT one was a previous project, Lapham’s Quarterly.*

Yesterday Bluecadet flipped the switch and helped [Science Friday launch their new, responsive website](http://sciencefriday.com "Science Friday"). In addition to the visual redesign, it also involved moving them from their custom CMS to a new one built using WordPress. Bluecadet’s team was led by Jeff Wiesner and Maya Bogdanow on project management, Wyatt Glennon taking the lead on design, Putra Bonaccorsi and Henry Steinberg on dev, and Kim Quinn and Josh Goldblum providing art/creative direction. Maya also did content strategy and CMS training. I helped with some dev/content strategy, prototyping, and content migration.

The team at Science Friday, led by Christian Skottke, was a joy to work with. I found them incredibly cooperative and great at weighing technical questions against user goals. Getting to meet some of the staff: Julie Leibach, Christopher Intagliata, Brandon Echter, Chau Tu, Ariel Zych (among others) helped me picture the content authors and remember their goals throughout the process.

Here’s a few dev notes, before I forget too many things:

- If I could sum up the process, it would be this way: *listen, prototype, repeat*.
- We spent a lot of time talking with the Science Friday team about the audio player on the site, and the best approach for it: a persistent player? Popup? On-page audio that cuts off upon leaving the page? The existing site used a popup, and the Science Friday team expressed a desire to have a better experience for the user.
- We looked at other sites like [Serial](https://serialpodcast.org "Serial Podcast") to see how they dealt with audio, but many of the sites didn’t have the depth of content that Science Friday has. So we ended up doing some prototypes. We liked the experience of a persistent player, but that brought with it a host of technical prerequisites, most notably that page loads would have to occur via AJAX to prevent interruption of playback.
- AJAX loading pages worked fine—pages loaded, the URL updated appropriately to allow bookmarking, and direct visits to permalinks worked well. But AJAX loads got in the way of how WordPress handles custom queries and pagination. So we did more prototypes. We wrote our own custom queries and pagination. We tried about four different search/query plugins. Eventually we found [Search &amp; Filter Pro](https://www.designsandcode.com/wordpress-plugins/search-filter-pro/ "Search & Filter Pro"), which plays well with AJAX-loaded posts/pages.
- Migrating content from their custom CMS into custom WordPress Post types was…challenging. We used [WP All Import](https://www.wpallimport.com/), but still needed to run a lot of pre-processing using both SQL queries and PHP scripts. Even then, there were still a number of things that required post-import manual cleanup.
- The project made me think (once again, and forever more) about how we take care of our links. We fought link rot as best we could, setting up redirects. Fortunately most of the URLs moved over cleanly using RegEx patterns, but there were a few maddening inconsistencies: Movable Type’s permalink generator substituted dashes for apostrophes and single quotation marks, turning a title like “Pluto’s Haze” into *pluto-s-haze*. WordPress, on the other hand, mashes the letter after the quote into the word, so it serves up the permalink as *plutos-haze*. For those we had to generate manual redirects.
- We made use of Advanced Custom Fields’ *[Flexible Content Field](https://www.advancedcustomfields.com/resources/flexible-content/ "Flexible Content Field")* to allow for reordering complex content pieces. The [Educational Resources](http://www.sciencefriday.com/educate/) have a format that changes depending on the subject, so we had to build modules to support specialized lists, video, slideshows and other supporting material.
- We deployed to [Pantheon](https://pantheon.io "Pantheon"). [Terminus](https://github.com/pantheon-systems/cli "Terminus CLI for Pantheon") is my friend, and she could be yours too.
- A lot of work turned out to be on the content strategy level, breaking apart blobs into chunks, creating new types to enable relationships between different pieces, and condensing 100+ taxonomy terms to the thirteen main ones you see on the new site.
- The Science Friday team pushed us to think about their many audiences, and how to give each of those audiences a clear path to the content they wanted. How would weekly listeners find items that host Ira Flatow mentioned on air? How would educators sift through educational resources to find age and subject-appropriate items? It’s particularly gratifying to me how many of those early discussions found a solution in the final site. I’m not sure whether those solutions are the best ones, but it’s a great start.
- Another subject that kept coming up: how to improve the authoring experience (or AX, as [Eileen Webb and others call it](http://theaxbook.com/non-enterprise/ "Author Experience")). One thing we heard repeatedly during our initial meetings with Science Friday was: “We want to present the content this way, but we can’t using our current CMS, so we just hack it together in a blog post.” So we spent a lot of time figuring out the different use cases for content and thinking about content author workflows, not just the final rendered form.

Every launch I still get the [feeling of loss that I’ve described in the past](/posts/tyler-school-of-art/), but less so this time around. I’ve been working on a bunch of other projects while Putra and Henry built out most of the front-end, so during pre-launch testing I was coming back to the site after several weeks. I think the team did a tremendous job, and I hope that Science Friday’s users feel the same delight that I did while I explored the site.
