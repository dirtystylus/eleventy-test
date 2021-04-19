---
title: VS Code Settings Sync Extension
display_title: VS Code Settings Sync Extension
description: A useful extension for keeping multiple VS Code workspaces in sync.
date: '2018-06-04T10:15:26-04:00'
tags:
  - tech
  - web-development
---
If you work on multiple machines, the handy [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync&WT.mc_id=vscodecandothat-dotcom-team) extension can keep your extensions and keyboard shortcuts synchronized via a public gist.

A few notes:

- You’ll have to set up a [Github personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) and make a note of it, because that’s what you’ll need to enter on the secondary machines you want to sync.
- When setting up my second machine to sync, I had to restart VS Code after entering my Github token and gist ID. After the restart the extension went to work and all my keyboard shortcuts and extensions were updated.

Update 2018-06-08
-----------------

If you want to auto-upload/download, set:

```json
"sync.autoDownload": true,
"sync.autoUpload": true,

```

in your User Settings file.
