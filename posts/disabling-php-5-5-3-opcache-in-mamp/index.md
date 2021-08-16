---
title: Disabling PHP 5.5.3 OPcache in MAMP
display_title: Disabling PHP 5.5.3 OPcache in MAMP
description: ''
date: '2014-01-18T17:47:24-05:00'
tags:
  - apps
  - macos
  - technologys-betrayal
  - web-development
---
A student in my [MCAD](http://mcad.edu) PHP and WordPress class ran into a curious issue where her changes to PHP scripts running in MAMP weren’t reflected when she refreshed the page in a browser, *unless* she opened the page in a new tab. Turns out OPcache is enabled by default in PHP 5.5.3 running in MAMP 2.2. Here’s a [Stack Overflow post on how to disable it in your php.ini file](http://stackoverflow.com/a/19130992).

The steps:

1. Find your php.ini file. In my MAMP installation it was located at: **`/Applications/MAMP/bin/php/php5.5.3/conf/php.ini`**.
2. Comment out the OPcache lines at the bottom by putting a semicolon in front: 

    ```apacheconf
    [OPcache]
    ;zend_extension="/Applications/MAMP/bin/php/php5.5.3/lib/php/extensions/no-debug-non-zts-20121212/opcache.so"
    ;  opcache.memory_consumption=128
    ;  opcache.interned_strings_buffer=8
    ;  opcache.max_accelerated_files=4000
    ;  opcache.revalidate_freq=60
    ;  opcache.fast_shutdown=1
    ;  opcache.enable_cli=1
    ```

3. Stop and start your MAMP servers.
