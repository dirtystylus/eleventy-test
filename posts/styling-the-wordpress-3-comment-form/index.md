---
title: Styling the WordPress 3 Comment Form
display_title: Styling the WordPress 3 Comment Form
description: ''
date: '2011-08-26T12:19:25-04:00'
tags:
  - web-development
---
WordPress 3 brought a few changes to the comment form template. It appears that the fields and text can be modified by applying filters before the comment\_form() method executes. For more details check out [this link](http://ottopress.com/2010/wordpress-3-0-theme-tip-the-comment-form/ "Otto on WordPress") and [this link](http://www.deluxeblogtips.com/2010/05/display-comment-form-wordpress-30.html "Deluxe Blog Tips").

One thing that wasn't readily obvious from the examples was how to maintain the logic of the required fields. So make sure you have the following line in your code block where you override the html output for the name/email/url fields:

```php
$req = get_option( 'require_name_email' );

add_filter('comment_form_default_fields','my_comment_form_fields');  
function my_comment_form_fields($fields) {  
 $req = get_option( 'require_name_email' );  
 $fields['author'] = '<p class="comment-form-author"><input id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) . '" size="30"' . $aria_req . ' />' .  
 '<label for="author">' . __( 'Name' ) . '</label> ' . ( $req ? '<span class="required">(required)</span>' : ” ) . '</p>';  
 $fields['email'] = '<p class="comment-form-email"><input id="email" name="email" type="text" value="' . esc_attr( $commenter['comment_author_email'] ) . '" size="30"' . $aria_req . ' />' .  
 '<label for="email">' . __( 'Email' ) . '</label> ' . ( $req ? '<span class="required"> (will not be published) (required)</span>' : ” ) . '</p>';  
 $fields['url'] = '<p class="comment-form-url"><input id="url" name="url" type="text" value="' . esc_attr( $commenter['comment_author_url'] ) . '" size="30" />' .  
 '<label for="url">' . __( 'Website' ) . '</label></p>';  
 return $fields;  
}  
```
