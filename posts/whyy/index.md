---
title: WHYY
display_title: WHYY
description: Notes from Bluecadet’s recent redesign for WHYY.
date: '2017-11-30T14:58:04-05:00'
tags:
  - web-development
  - wordpress
  - portfolio
---
In October WHYY unveiled their [new website](https://whyy.org), which Bluecadet helped them design and develop. It brought their news wing (formerly NewsWorks.org) under the unified banner of WHYY, an effort that required a lot of up-front strategy about how to serve multiple audiences.

I recently appeared on [episode 149 of the Responsive Web Design Podcast](https://responsivewebdesign.com/podcast/whyy/), hosted by Karen McGrane and Ethan Marcotte. Together with my old friend (and former Bluecadet team member) Rebecca Smith, we talked about the project—how it came about, some of the challenges we faced, and why migrations are such a pain.

Here are a few more notes I’ve been sitting on since the launch:

- The Bluecadet team morphed a bit through two phases: the up-front research and strategy phase, and the production phases. Altogether it was: Rebecca Sherman on account management, Mariclare Hall and Maya Bogdanow on project management, Ksenia Dynkin on content strategy and research, Nate Renninger and Janet Lu on design, and Putra Bonaccorsi and TJ Perry on development.
- This was my colleague TJ’s first full project as part of my team at Bluecadet, and I’m super proud of him.
- Besides Rebecca Smith, on the WHYY side we got to work closely with Gabriel Coan, Rich Baniewicz, and Scott Hendrickson. They were great collaborators, and very savvy in terms of approaching a dual-CMS replatforming plus responsive redesign.
- This was a WordPress build, and in many ways we were were able to continue some of the ideas and techniques we first rolled out with the [Science Friday](http://dirtystylus.com/2015/10/21/science-friday/) website project from a couple of years ago. (You can listen to a [RWD podcast episode](https://responsivewebdesign.com/podcast/science-friday/) about that, too!)
- We migrated the NewsWorks site from Joomla, and the main WHYY site from a WordPress multi-site instance into a unified WordPress build. Those sites served two very different audiences: one was focused on timely news, the other mostly wanted information about WHYY’s radio and tv programming.
- [Pantheon multidev](https://pantheon.io/features/multidev-cloud-environments) was essential to our process. We hit milestones where we wanted to get a specific content type in front of the WHYY team—Article, for example—and we would quickly spin up a multidev branch on Pantheon so they could evaluate the current build there undisturbed. Meanwhile we continued developing on a separate branch, and merged everything together once we received feedback.
- Kudos to Rebecca Smith for mapping all the existing Joomla taxonomy terms to the new ones in the unified CMS. That was a lift.
- Speaking of taxonomy, an evergreen question CMS builders always have is whether something should be handled with taxonomy or a content type. Spoiler: often you need *both*. Taxonomy is especially useful if (like WHYY) you need RSS for things like podcast feeds.
- Finally, migrations are a bear. I mention it on the podcast, but this quote from Jeff Eaton from a [separate RWD episode](http://responsivewebdesign.com/podcast/jeff-eaton/) really resonated with me in a “we’re laughing outside, but we’re crying inside” kind of way:

> You know, there’s a running joke that the first thing you should start working on the minute you have a contract or you’re even thinking about doing any kind of CMS replatforming is, “Well, you should start the migration immediately.” Then once you’ve immediately started the migration, you should accept that you’ve probably started it too late, just because the process of actually taking a close and detailed look at all of the stuff you’re moving into a new system or even just moving into a new design, and assessing how well it fits, where the rough edges are—that’s a process that it’s always easy to underestimate.

I wouldn’t say that we were unaware of how big the migration task would be—but it was definitely a challenge importing content while we were still working out the kinks on our content types. Migrating into WordPress can be challenging, too, if you’re trying to map to custom post types. For what it’s worth, I think Drupal has a much more robust way of dealing with migrations. (Drupal has other issues, but that’s another post.)

WHYY had always taken a multi-phase product-style approach for their site revamp. So I’m very excited to see where they take things next, now that they’re finally on a unified platform built around their publishing needs.
