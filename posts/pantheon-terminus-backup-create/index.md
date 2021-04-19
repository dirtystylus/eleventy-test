---
title: Pantheon Backups with Terminus
display_title: Pantheon Backups with Terminus
description: Granular Pantheon backups using the Terminus CLI.
date: '2018-06-18T14:37:14-04:00'
tags:
  - web-development
---
The web interface for Pantheon allows you to create a backup for an environment, which saves a snapshot of code, database, and files. To do this through the Pantheon CLI, Terminus, you simply run:

```bash
terminus backup:create [site].[env]

```

But if you want to just back up a specific element — just the database, for example — you can pass in the element like:

```bash
terminus backup:create --element=db [site].[env] 

```

Backing up two elements doesn’t appear to be supported, however. I tried:

```bash
terminus backup:create --element=db --element=files [site].[env]

```

but that only took the last element that I passed in, the files.
