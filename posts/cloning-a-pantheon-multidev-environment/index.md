---
title: Cloning a Pantheon Multidev Environment
display_title: Cloning a Pantheon Multidev Environment
description: A two-step dance to duplicate a Pantheon multidev environment.
date: '2017-06-25T22:14:35-04:00'
tags:
  - technologys-betrayal
  - web-development
---
It’s been a while since I’ve had to do this (I’m usually cloning off the master branch) but this weekend I had to duplicate a feature branch environment. I was confused because Pantheon’s only option as a starting point for the new [multidev environment](https://pantheon.io/docs/multidev/) was the `dev` (aka master branch) environment—it wouldn’t let me dupe the multidev environment that I wanted.

After trying a few things I figured out that I had to use `dev` as my starting point to create the new multidev environment, but immediately after it was created I could clone the database and files from *any* environment, including the other multidev environment I wanted.
