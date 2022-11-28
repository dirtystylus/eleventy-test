---
title: Encoding Video With Forced Subtitles Using transcode-video
display_title: Encoding Video With Forced Subtitles Using `transcode-video`
description: Finally using the `--force-subtitle flag`
date: '2022-11-15T16:35:08.967-05:00'
tags:
  - physical-media
  - software
  - tech
  - video
---

I use Don Melton’s [`transcode-video`](https://github.com/donmelton/video_transcoding) CLI tool for archiving some of my DVD/Blu-ray discs for in-home streaming via Plex. Occasionally I encounter a movie with forced subtitles that only run during a specific scene, but I’ve never investigated how to encode those in addition to including the full subtitle track.

This Github issue set me on the right path: [https://github.com/donmelton/video_transcoding/issues/327#issuecomment-782794541](https://github.com/donmelton/video_transcoding/issues/327#issuecomment-782794541)

## Finding the subtitle track

I use MakeMKV for prepping my file, as Melton suggests. When it scans your disc you may find multiple subtitles in the same language (I tend to include all English subtitle tracks by default). As for identifying which track is the forced track, I tend to play the disc and see whether it defaults to a subtitle track even with subtitles off. If it does, then it’s probably the forced subtitle track.

## Transcoding

* Your source **`mkv`** file should include the forced subtitle track as well as the full subtitle track
* You use the `--force-subtitle [forced subtitle track number]` flag in your `transcode-video` command
* The full subtitle track gets added using the `--add-subtitle [subtitle track number]` flag

Here’s what I used for *Mission Impossible: Fallout*, which has forced subtitles:

`transcode-video "./Mission-Impossible Fallout.mkv" --force-subtitle 2 --add-subtitle 1 --add-audio 4="Commentary 1" --add-audio 5="Commentary 2" --add-audio 6="Commentary 3" --avbr --output ./MissionImpossibleFallout-forcedsubs.mkv`

That made the forced subtitle track the default, and then added a second subtitle track with everything subtitled.