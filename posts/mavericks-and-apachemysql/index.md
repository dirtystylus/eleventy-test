---
title: OS X Mavericks and Apache/MySQL
display_title: OS X Mavericks and Apache/MySQL
description: ''
date: '2014-07-16T17:02:18-04:00'
tags:
  - macos
  - technologys-betrayal
  - web-development
---
I finally upgraded my office machine to OS X Mavericks, and as a result had to reconfigure both Apache and MySQL.

[This post](http://www.coolestguidesontheplanet.com/downtown/get-apache-mysql-php-and-phpmyadmin-working-osx-109-mavericks) covers most of the relevant info for dealing with Apache: remapping your default web directory, enabling PHP. [This post deals with setting **`index.php`**](http://brianflove.com/2013/10/23/os-x-mavericks-and-apache/) as a default document if a directory is requested.

MySQL was a bit trickier. I had installed it using [Homebrew](http://brew.sh/), so I had to [uninstall MySQL](http://stackoverflow.com/questions/19962522/trouble-installing-mysql-on-mavericks-with-homebrew), upgrade Homebrew, and then [reinstall MySQL](http://blog.joefallon.net/2013/10/install-mysql-on-mac-osx-using-homebrew/).

One random note: Launchbar’s ClipMerge feature stopped working, and it turns out that was because Mavericks resets the Accessibility options. I had to go to **System Preferences** > **Security & Privacy** > **Accessibility** and allow Launchbar to control my computer.
