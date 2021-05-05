---
title: 'Kalabox, VS Code, and XDebug'
display_title: 'Kalabox, VS Code, and XDebug'
description: My adventures in debugging Kalabox apps within VS Code.
date: '2017-01-12T17:32:58-05:00'
tags:
  - drupal
  - technologys-betrayal
  - web-development
---
***Drupal 8 Update 2**: Added a note below on disabling render cache and dynamic page cache that addressed my issues from my first Drupal 8 Update below.*

***Drupal 8 Update**: Everything below applies, except that I found that I didn’t need to enter xdebug.remote\_host. Also depending on where I was placing my breakpoint, I would have to run `kbox drush cr` before debugging. This might be related to the server configuration (varnish maybe?), but I’m still investigating.*

An update on my [VS Code test-drive](/posts/trying-out-vs-code/): I tried it out for a while, but then hit my first big roadblock with it when I tried to get PHP debugging working with Drupal sites served up using [Kalabox](http://www.kalabox.io). For those not familiar with it, Kalabox is a Docker-based VM that integrates really well with [Pantheon](https://pantheon.io) (which is where most of Bluecadet’s Drupal and WordPress sites are developed). VS Code has a pretty good [PHP debugging adapter](https://github.com/felixfbecker/vscode-php-debug) but I could only get it to work with sites served up using my built-in Apache web server—basically localhost vhosts. What was most annoying was that [Sublime Text’s XDebug extension was working just fine with Kalabox-served sites](http://pantheon.kalabox.io/en/v2.1/users/tooling/#listen-for-incoming-xdebug-connections). So I knew that it was possible, but after a few hours[^1] I shelved things and went back to using TextMate and my OS Apache setup.

Docker
------

Flash forward to a new year, and I decided to try and figure it out again. I noted a quick exchange on the PHP debug adapter [Gitter support channel](https://gitter.im/felixfbecker/vscode-php-debug) had this clue from Felix Becker, the adapter developer:

> Docker is very tricky
> 
>  You need to make the container connect to the host
> 
>  That means the container needs remote\_host to the host’s IP adress
> 
>  So you need to either hardcode it or use a loopback + IP alias

That led to this helpful post on debugging [PHP apps in a Docker container](http://joenyland.me/blog/debug-a-php-app-in-a-docker-container-using-xdebug/).

As an experiment, I tried adding my computer’s IP address to the XDebug config of my Kalabox app, and all of a sudden it recognized the breakpoints. This is taken from my php.ini file (which is usually **`~/Kalabox/\[project name\]/config/php/php.ini`**):

```ini
; Xdebug
xdebug.max_nesting_level = 256
xdebug.show_exception_trace = 0
xdebug.collect_params = 0
xdebug.remote_enable = 1
xdebug.remote_autostart = 1
xdebug.remote_host = xxx.xxx.x.x  ; my computer’s IP address, e.g. 192.168.0.1
xdebug.idekey = "vscode" ; not sure if this does anything

```

…well, it worked to a point. I noted that it was correctly stopping at breakpoints in the stack trace, but not jumping to those breakpoints in the actual files. Turns out that in my PHP debug adapter configuration (**`launch.json`**) I needed to make sure that the **localSourceRoot** was set correctly:

```json
…
{
    "name": "Listen for XDebug",
    "type": "php",
    "request": "launch",
    "port": 9000,
    "localSourceRoot": "/Users/mllobrera/Kalabox/myproject/code/",
    "serverSourceRoot": "/code/",
    "log": true
},
…

```

So `localSourceRoot` is the path to your root directory for your Drupal or WordPress site. `serverSourceRoot` is going to be `/code/` for most applications.

Remaining Issues
----------------

So that’s fine and good, but I find that I have to keep appending an **XDEBUG\_SESSION\_START** parameter value to the end of my URLs, or XDebug wouldn’t debug the request. I thought that this [Chrome XDebug extension](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc) would help, and auto-append that session param, but so far that doesn’t seem to be the case.

Drupal 8 and Caching
--------------------

In my first update I noted that I was having trouble triggering breakpoints without running `kbox drush cr`. After reviewing my caching settings in my **`settings.local.php`** file, I made sure that I uncommented the following lines:

```php
// render cache
$settings['cache']['bins']['render'] = 'cache.backend.null';

// dynamic page cache
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

```

[^1]: Ok, *several* hours.
