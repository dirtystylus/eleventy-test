---
title: Offline Development with Lando
display_title: Offline Development with Lando
description: Configuring Lando for offline work.
date: '2019-04-26T15:52:51-04:00'
tags:
  - drupal
  - technologys-betrayal
  - web-development
---
***Update 2019-04-30:*** *When I tried to change my TLD the URLs kept showing up in red after a `lando rebuild`. I’ve noted below that you need to enter the domain of your lando instance in the /etc/hosts file.*

Finally got around to configuring Lando for offline development, mostly because I’ve been traveling quite a bit for the last two weeks and WiFi can get spotty in airports/trains.

Here’s the [official documentation](https://docs.devwithlando.io/guides/offline-dev.html). I chose “ml” as my top-level domain (TLD). Following the documentation step-by-step did not result in success. I had to dig a bit, and I found this helpful [Github issue](https://github.com/lando/lando/issues/1581), which noted two things:

- Step 10 in the official docs instruct you to add `domain: test.me` (in my case `domain: ml.me` to the **/.lando/config.yml** file. The Github issue suggested dropping the “.me” part of the entry, and I can confirm that this helped.
- Steps 11 and 12 instruct you to do a `lando poweroff` and `lando start`. When I did this my **site.ml** urls showed up red, and would not resolve properly. Doing a `lando rebuild` as suggested in the Github issue worked, however.

Not noted in the issue, but *very* important: your **/etc/hosts** file needs to contain your actual project instance’s domain, mapped to `127.0.0.1`, like: `127.0.0.1 my-project.ml`.
