---
title: Deleting Ignored Files Mistakenly Committed to a Git Repo
display_title: Deleting Ignored Files Mistakenly Committed to a Git Repo
description: How to rewrite commits to remove files from Git’s history by using `filter-branch`.
date: '2013-10-28T11:00:29-04:00'
tags:
  - technologys-betrayal
  - web-development
---
This is not a common situation, but occasionally you may find yourself having force-committed a bunch of things (usually a bad sign to begin with, but that’s a whole ’nother post) and a few files that should be ignored sneak into your repo. You might have dozens of commits from that point on and not be aware of it, because your .gitignore file dutifully doesn’t track those files anyway.

So: how to remove those files from the Git cache? My research led me to rewriting commits, which is usually filed in the **“Contents Dangerous. Open With Caution.”** section of Git. Here’s some links:

- [Making Git ignore already-tracked files](http://aralbalkan.com/2389/) (The first comment on Aral’s post points to this useful gist by user **atnan**: [git-clean-cached.sh](https://gist.github.com/atnan/190002))
- [git: forever remove files or folders from history](http://dound.com/2009/04/git-forever-remove-files-or-folders-from-history/)
- [Permanently Delete Folders and Files from Git History](http://thomashunter.name/blog/permanently-delete-folders-and-files-from-git-history/) (Uses the David Underhill script linked above.)

So here was my process:

1. Remove the files from the Git cache. I used an **rm -rf** command because I was getting rid of directories. For example: 

  ```shell
  git filter-branch --index-filter 'git rm -rf --cached --ignore-unmatch <path to file or directory, from root level of your repo>' HEAD
  ```
  
2. Prune Git. For example: 

  ```shell
  rm -rf .git/refs/original/ && git reflog expire --all &&  git gc --aggressive --prune
  ```
  
3. Force-push your edits, otherwise they will be rejected because you’ve rewritten history. (Couldn’t figure this part out until I read Thomas Hunter’s post linked above.) 

  ```shell
  git push origin master --force
  ```

If you’ve got a *bunch* of files, I would suggest **atnan’s** gist linked above, or David Underhill’s script (second link). David’s script also prunes Git (my understanding is you can still have file references hanging around that need to be garbage-collected).

Ideally you would never end up in this situation, and hopefully you catch this before you’ve pushed changes to a remote and others have pulled the dirty repo down. In my case there didn’t seem to be ill effects introduced by rewriting commits and pushing to a remote, but it’s something I’d like to avoid as much as possible.
