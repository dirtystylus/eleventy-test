---
title: SSH Keys and Permissions
display_title: SSH Keys and Permissions
description: 'When configuring SSH keys on a remote server, check those permissions!'
date: '2016-01-19T22:06:10-05:00'
tags:
  - technologys-betrayal
  - web-development
---
Now that I mostly work on dedicated platforms like Pantheon, Acquia, and WPEngine, it’s been a while since I’ve had to manually add an SSH key on a server. Most platforms expose a web form on your profile that takes care of that for you. If (like me) you’ve forgotten how to do this, Digital Ocean has a [pretty straightforward guide](https://www.digitalocean.com/community/tutorials/how-to-configure-ssh-key-based-authentication-on-a-linux-server).

One thing to watch out for: permissions matter! I added a key on the remote server, tried logging in, and was still greeted with a password prompt. Turns out that I needed to check the permissions on a number of directories, as outlined in this [Q&amp;A post](http://unix.stackexchange.com/questions/36540/why-am-i-still-getting-a-password-prompt-with-ssh-with-public-key-authentication):

> Your home directory ~, your ~/.ssh directory and the ~/.ssh/authorized\_keys file on the remote machine must be writable only by you: rwx—— and rwxr-xr-x are fine, but rwxrwx— is no good¹, even if you are the only user in your group (if you prefer numeric modes: 700 or 755, not 775).

Once I adjusted the permissions, I was able to SSH in cleanly with no password prompt.
