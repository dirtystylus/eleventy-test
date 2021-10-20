---
title: 'Sublime Text 2: Disabling Auto-Reload of Windows'
display_title: 'Sublime Text 2: Disabling Auto-Reload of Windows'
description: ''
date: '2012-07-23T10:29:16-04:00'
tags:
  - technologys-betrayal
  - web-development
---
I’ve been using Sublime Text 2 as my full-time as my text editor the last two weeks, trying to decide whether to switch over from TextMate. One thing that’s bugged me since Day Two has been the way it re-opens the last session whenever you fire it up. Sometimes that’s ideal, but on my current project I’ve been working directly on server files via SFTP, and it is annoying to see dozens of empty files on startup, since those files’ connection to the server has been severed.

Here’s how to remove this behavior. In your User Settings file add:

```json
{
  "hot_exit": false,
  "remember_open_files": false
}

```

At first I thought that all you needed was the `remember_open_files` line, but if you have `hot_exit` set to `true` it appears that you will get your last session restored, including unsaved files.

This tip was pulled from [this Sublime Forum post](http://www.sublimetext.com/forum/viewtopic.php?f=3&t=4942&p=22203&hilit=session#p22203 "Sublime Forum post on disabling session restore").
