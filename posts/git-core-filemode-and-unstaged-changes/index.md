---
title: Git core.filemode and unstaged changes
display_title: Git core.filemode and unstaged changes
description: Letting git ignore permissions weirdness in your repo.
date: '2016-03-01T15:55:46-05:00'
tags:
  - technologys-betrayal
  - web-development
---
I’ve been working on a dev server that only has SSH access. I initialized a git repo, pointed to my Github remote, and was able to pull my files to it. So far, so good. But the next time I went to do a pull, it shouted at me about a ton of unstaged files. Doing a `git checkout -- .` didn’t fix things. Nor did `git reset --hard`. So I did a git diff on one file, and got:

```shell
old mode 100644
new mode 100755

```

So I tried to chmod all of those files, but they were still showing up as unstaged changes.

But. [Via Stackoverflow](http://stackoverflow.com/a/1257613), you can set:

```shell
git config core.filemode false
```

> This means that git thinks that it can correctly set the executable bit on checked out files, but when it attempts to do so it doesn’t work (or at least not in a way that it can read). When it then reads back the status of those files it looks like the executable bit has been deliberately unset. Setting core.filemode to false tells git to ignore any executable bit changes on the filesystem so it won’t view this as a change.

Who knew?
