---
title: Using mkvmerge to Split/Combine Video Files
display_title: Using `mkvmerge` to Split/Combine Video Files
description: Some handy `mkvmerge` examples for archiving video files.
date: '2022-04-06T16:50:55.653-04:00'
tags:
  - physical-media
  - software
  - tech
  - video
---

I’m a firm believer in [physical media](https://pinboard.in/u:dirtystylus/t:physicalmedia/) but I also archive parts of my personal collection for local device streaming via [Plex](https://pinboard.in/u:dirtystylus/t:physicalmedia/). Typically I use software to create an **`mkv`** file and then use Don Melton’s handy [CLI tools for video transcoding](https://github.com/donmelton/video_transcoding#installation). That usually covers about 99% of my needs, but I recently had to tackle a couple of trickier situations, and this is where `mkvmerge` comes in. It’s part of the MKVToolNix[^1] collection of tools, and I found it helpful for splitting or combining different files (or specific audio/video streams from those files). Here’s two scenarios:

## Splitting video files by chapter

This seems to come up sometimes with tv episodes, where multiple episodes are encoded as a single file. To split the file apart, note the chapter stops where each episode begins, and you can feed those in to mkvmerge as a comma-delimited array:

```shell
mkvmerge -o destination-file.mkv --split chapters:8,15,22,29 source-file.mkv
```

`mkvmerge` will split before each chapter stop you specify. You feed in an output file name pattern using the `-o` option; `mkvmerge` will append digits after the  operation runs.

## Combining video/audio streams into one file

This scenario is a bit less common—I had a tv episode with two versions, each with the same video stream but different audio streams. The first file had the regular episode audio, and the second file had a filmmaker commentary. (Why these weren’t simply encoded as multiple audio options on the same file is beyond me). In this case I wanted to pull just the audio from the second file, and merge it with the first. This meant passing two options for the second file: `-D` (don’t copy the video track) and `-S` (don’t copy the subtitle tracks).

```shell
mkvmerge -o destination-file.mkv file-01.mkv -D -S file-02.mkv
```

This obviously only really works if both files have the exact same video stream with the same length, otherwise you will get audio/video sync issues.

The full `mkvmerge` documentation is [here](https://mkvtoolnix.download/doc/mkvmerge.html).

[^1]: If you’re a Homebrew user you can run `brew install mkvtoolnix`.