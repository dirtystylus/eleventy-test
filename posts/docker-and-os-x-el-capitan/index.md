---
title: Docker and OS X El Capitan
display_title: Docker and OS X El Capitan
description: 'Playing Whac-a-Mole with Docker, lando, and my aging Macbook.'
date: '2019-02-25T15:58:30-05:00'
tags:
  - technologys-betrayal
  - web-development
---
The folks at [lando](https://docs.devwithlando.io) have been doing a lot of great work lately. I’ve noticed the performance improving with the latest builds (early alpha/beta versions often felt quite slow on older hardware). Speaking of older hardware, my laptop at home is a pre-Retina Macbook Pro 13″ that maxes out at OS X (not even MacOS!) El Capitan, so [despite my advice to my colleague Chris](https://twitter.com/dirtystylus/status/1098638549426020354), I tried updating to the latest version ([v3.0.0-rc.12](https://github.com/lando/lando/releases/tag/v3.0.0-rc.12 "v3.0.0-rc.12")).

That’s…where my adventure started.

My Macbook can’t run the the latest version of Docker, so I’ve always left off updating that, and I also usually leave it running when updating lando. Well, this time I quit Docker before installing lando—*[just like the instructions say, mind you](https://docs.devwithlando.io/installation/updating.html)*—and it updated Docker to the latest version.

*No problem*, I thought, I’ll just downgrade to the last version compatible with El Capitan, which Docker thankfully provides links to in the [release notes](https://docs.docker.com/docker-for-mac/release-notes/). I installed version 18.06.1-ce-mac73 2018-08-29 but ended up with an error:

`communication with networking components failed`

A bit of searching turned up a helpful Github issue: <https://github.com/docker/for-mac/issues/777>, which suggested deleting `/Library/PrivilegedHelperTools/com.docker.vmnetd`. I did that, restarted Docker, and I was back in business.
