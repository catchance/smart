Smart Hugo Theme
========================

Smart is a clean, simple blog theme for Hugo. 

![smart](https://github.com/catchance/smart/blob/master/images/screenshot.gif)

# Demo
To see this theme in action,  Here is a live [demo site](https://xchance.xyz) which is rendered with this theme and some content for documentation and blog posts.

# Features

* Dark/Light mode
* Wrap Image with Figure Tag without Shortcode. Thanks [Junian.Net](https://www.junian.net/hugo-image-figure-wrap/)
* Load images with Lazy Load By [lazysizes](https://github.com/aFarkas/lazysizes)
* Automatically highlighting code By [Google code-prettify](https://github.com/google/code-prettify), Customizable styles via CSS. See the [themes gallery](https://rawgit.com/google/code-prettify/master/styles/index.html).
* Automagical image gallery with [lightGallery](https://github.com/sachinchoolur/lightGallery)
* service-worker
* lunr
* canvas-nest

# Getting Started
Clone this repository to your hugo theme directory.

```bash
cd themes
git clone https://github.com/catchance/smart.git
```

Next, open config.toml in the base of the Hugo site and ensure the theme option is set to mainroad:
```bash
theme = "smart"
```
For more information read the [official setup guide](https://gohugo.io/documentation/) of Hugo.

# Site Configuration
Take a look in the `exampleSite` folder.

This directory contains an example config file and the content for the demo. It serves as an example setup for your documentation.

Copy the `config.toml` in the root directory of your website. Overwrite the existing config file if necessary.

# Content Suggestions

A few suggestions to help you get a good looking site quickly:

* Keep blog posts in the content/posts directory, for example: content/posts/my-first-post.md
* Keep static pages in the content directory, for example: content/about/about.md

# Customizing styles for your website

If you want to change some styling to fit your own website needs, you can edit them:

* `assets/css/_varibales/default.scss`:  You can override the variables in `_variables.scss` to customize the style
* `assets/css/_custom.scss` :  You can put your custom css in this file

# Tips

#### Hugo “extended” Sass/SCSS version required

This theme write style with scss, So you must download and install the “extended” Sass/SCSS version

# Home Post model
If you want to show posts on index instead of a personal profile, just open config.toml in the base of the Hugo site, add the following line to config.toml
```toml
[params]
 home_mode = "post" # post or other
```

### Displaying Featured Image

```toml
+++
date = 2019-05-04T15:17:02+08:00
title = "This One Goes to 11!"
description = "With Go 1.11, Hugo finally gets support for variable overwrites in templates!"
categories = ["Releases"]
featured_image = "https://raw.githubusercontent.com/gohugoio/hugoDocs/master/content/en/news/0.48-relnotes/featured-hugo-48-poster.png"
+++
```

# Questions, ideas, bugs, pull requests?
All feedback is welcome! Head over to the [issue tracker](https://github.com/catchance/smart/issues).

# License
Smart is licensed under the MIT license. Check the LICENSE file for details.
The following resources are included in the theme:

* lazysizes - https://github.com/aFarkas/lazysizes
* lightGallery - https://github.com/sachinchoolur/lightGallery
* [google code prettify](https://github.com/google/code-prettify) 

# Author
[catchance](https://github.com/catchance)

# See Also

* [hyde](https://github.com/spf13/hyde)
* [Coder](https://themes.gohugo.io/hugo-coder/)
* [hello-friend](https://themes.gohugo.io/hugo-theme-hello-friend/)
* [LeaveIt](https://github.com/liuzc/LeaveIt)
