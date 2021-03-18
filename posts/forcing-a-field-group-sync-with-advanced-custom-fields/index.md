---
title: Forcing a Field Group Sync with Advanced Custom Fields
description: Kicking WordPress ACF fields in the pants to force a sync.
date: 2019-04-30T16:40:06-04:00
tags:
  - technologys-betrayal
  - web-development
---
A tip from my friend Max: if you’ve made changes to an ACF field group, and merged in another branch, you may find that the field group doesn’t get flagged for a sync. This is sometimes due to the fact that the older branch’s timestamp for that field group overwrote yours. If that’s the case, you can find the JSON file associated with that field group in your theme’s **acf-json** folder and manually set a newer UNIX timestamp in the modified item (like `"modified": 1553890887`). If you go back to the WordPress Admin for ACF field groups your field group should now be correctly flagged to sync.
