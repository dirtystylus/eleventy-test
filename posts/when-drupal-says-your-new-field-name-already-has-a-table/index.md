---
title: When Drupal Says Your New Field Name Already Has a Table
display_title: When Drupal Says Your New Field Name Already Has a Table
description: ''
date: '2013-01-18T11:00:45-05:00'
tags:
  - drupal
  - technologys-betrayal
  - web-development
---
Sometimes I run into phantom fields that I had created for a content type that I later destroyed:

> There was a problem creating field Artist Name: Table field\_data\_field\_\[YOUR FIELD NAME\] already exists.

Instead of sighing and choosing another name, you can delete the table in the database, *and* the corresponding 
`field_revision_field_[YOUR FIELD NAME]`.
