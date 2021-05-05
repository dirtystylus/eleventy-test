---
title: Fixing VS Code’s Command-Line Utility
display_title: Fixing VS Code’s Command-Line Utility
description: Remapping VS Code’s command line utility
date: '2017-05-24T12:50:29-04:00'
tags:
  - technologys-betrayal
  - text-editors
  - web-development
---
On my system the VS Code `code` command-line utility kept breaking. I would go into VS Code, hit F1 and select the “Install ‘code’ command in PATH” option, and it would work, but would stop eventually. So I checked where it was installed, and it was a symlink in /usr/local/bin:

```shell
code -> /private/var/folders/y7/23kzmk790qvb31nlzmcpdxrw0000gp/T/AppTranslocation/154BF34A-F780-4189-9936-A151C7117FA1/d/Visual Studio Code.app/Contents/Resources/app/bin/code

```

So I changed that to point directly to the Application bundle. In /usr/local/bin:

```shell
ln -s /Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code code

```
