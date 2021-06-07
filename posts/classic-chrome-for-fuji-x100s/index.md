---
title: Classic Chrome for Fuji X100S
display_title: Classic Chrome for Fuji X100S
description: How to unlock the Classic Chrome film simulation in Lightroom for Fuji’s X100S.
date: '2015-12-17T11:15:32-05:00'
tags:
  - cameras
  - photography
  - photos
---
![Two girls on a scooter rolling down a driveway.](em-steering.jpg "Em in Classic Chrome"){data-responsiver=vertical}

Fuji is usually pretty good at providing firmware upgrades for their older cameras. It seems like the X100S is one of those rare exceptions—Fuji has publicly said they [won’t be releasing major firmware updates](http://www.imaging-resource.com/news/2015/03/19/fujifilm-interview-cpplus-2015-dave-gets-tables-turned-what-do-you-think) since the X100T is on the market. That means that the [Classic Chrome film simulation](http://petapixel.com/2014/09/10/classic-chrome-film-simulation-sleeper-feature-new-x100t/) is only available in-camera on the X100T.

I say in-camera because if you’re using Adobe Lightroom there’s a workaround: change the EXIF info on your X100S .RAF RAW files to identify them as X100T files, and Lightroom will happily let you process them using Classic Chrome. This [post on DPReview](http://www.dpreview.com/forums/post/55219805) has links to the command-line program ExifTool, and examples. My recipe is usually this:

```shell
exiftool -model="X100T" -ext .RAF -r "/PATH/TO/MY/RAF/FILES/" -overwrite_original

```

and then after I process JPGs I flip the model back to *X100S* on the JPGs (since sites like Flickr bring up the camera model in the metadata).

```shell
exiftool -model="X100S" -ext .JPG -r "/PATH/TO/MY/JPG/FILES/" -overwrite_original

```

Be careful with those operations if you have a mixture of RAF and JPG files from different cameras. If you do, you might want to do these operations on a folder that contains *just* the X100S files.

Do I like Classic Chrome? For me it’s hit or miss. I think it looks really great in daylight. Indoors, I’d probably use a different film simulation or use a VSCO preset in VSCOCam.
