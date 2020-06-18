const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");
const moment = require("moment");
const now = new Date();
const debug = require("debug")("markllobrera");
const imagesResponsiver = require("eleventy-plugin-images-responsiver");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("project", "layouts/project.njk");
  eleventyConfig.addLayoutAlias("book", "layouts/book.njk");

  // Date filters

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "LLL dd, yyyy"
    );
  });

  // limit filter
  eleventyConfig.addNunjucksFilter("limit", function (array, limit) {
    return array.slice(0, limit);
  });

  // date filter
  eleventyConfig.addNunjucksFilter("date", function (date, format) {
    return moment(date).format(format);
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));

  // Return projects
  eleventyConfig.addCollection("projects", function (collection) {
    return collection.getAll().filter(function (item) {
      return item.data.content_type == "project";
    });
  });

  // Return books
  eleventyConfig.addCollection("reading", function (collection) {
    return collection
      .getAll()
      .filter(function (item) {
        return item.data.content_type == "book";
      })
      .sort(function (a, b) {
        return b.date - a.date;
      });
  });

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");

  // Next/Previous navigation
  // See: https://brycewray.com/posts/2019/12/previous-next-eleventy/
  eleventyConfig.addCollection("posts", function (collection) {
    const coll = collection.getFilteredByTag("posts");

    for (let i = 0; i < coll.length; i++) {
      const prevPost = coll[i - 1];
      const nextPost = coll[i + 1];

      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
    }

    return coll;
  });

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownItAnchor, {
      permalink: true,
      permalinkClass: "direct-link",
      permalinkSymbol: "#",
    })
    .use(markdownItFootnote)
    .use(markdownItAttrs);

  markdownLibrary.renderer.rules.footnote_caption = (tokens, idx) => {
    let n = Number(tokens[idx].meta.id + 1).toString();

    if (tokens[idx].meta.subId > 0) {
      n += ":" + tokens[idx].meta.subId;
    }

    return n;
  };
  eleventyConfig.setLibrary("md", markdownLibrary);

  // An image helper to generate figure markup
  // eleventyConfig.addPairedShortcode(
  //   "figurex",
  //   (data, image, altText, styleName) => {
  //     const styleObj = {
  //       cinemascope: [
  //         { width: 1200, breakwidth: 1000 },
  //         { width: 850, breakwidth: 650 },
  //       ],
  //       book_thumb: [{ width: 300, breakwidth: 400 }],
  //       default: [{ width: 850, breakwidth: 650 }],
  //     };

  //     const styleItem = styleObj[styleName]
  //       ? styleObj[styleName]
  //       : styleObj["default"];
  //     const classMarkup = styleName ? ` class="${styleName}"` : "";
  //     debug("figure data: ", data);
  //     data = data.trim();
  //     if (data !== undefined && data !== "") {
  //       data = markdownLibrary.renderInline(data);
  //       captionMarkup = `<figcaption>${data}</figcaption>`;
  //     } else {
  //       captionMarkup = "";
  //     }
  //     debug("captionMarkup: ", captionMarkup);
  //     let srcsetMarkup = "";
  //     styleItem.forEach((element) => {
  //       srcsetMarkup += `<source srcset="/img/${image}?nf_resize=fit&w=${element.width}" media="(min-width: ${element.breakwidth}px)"></source>`;
  //     });
  //     return `<figure${classMarkup}><picture>${srcsetMarkup}<img src="/img/${image}?nf_resize=fit&w=400" alt="${altText}" /></picture>${captionMarkup}</figure>`;
  //   }
  // );

  // Images Responsiver
  const runAfterHook = (image, document) => {
    let imageUrl =
      image.getAttribute("data-pristine") || image.getAttribute("src");
    let caption = image.getAttribute("title");
    if (caption !== null) {
      caption = markdownLibrary.renderInline(caption.trim());
      debug("runAfterHook::has caption", caption);
    }

    let zoom = [...image.classList].indexOf("zoom") !== -1;

    if (caption || zoom) {
      const figure = document.createElement("figure");
      figure.classList.add(...image.classList);
      // TODO: decide weither classes should be removed from the image or not
      image.classList.remove(...image.classList);
      let figCaption = document.createElement("figcaption");
      figCaption.innerHTML =
        (caption ? caption : "") +
        (zoom
          ? `<p class="zoom">&#128269; See <a href="${imageUrl}">full size</a></p>`
          : "");
      figure.appendChild(image.cloneNode(true));
      figure.appendChild(figCaption);

      image.replaceWith(figure);
      debug("runAfterHook:: replaced", image.nodeName);
    }
  };

  const responsiverPresets = {
    default: {
      sizes: "(min-width: 650px) 850px, 400px",
      classes: ["default"],
      attributes: {
        loading: "lazy",
      },
      runAfter: runAfterHook,
    },
    cinemascope: {
      sizes: "(min-width: 650px) 850px, (min-width: 1000px) 1200px, 400px",
      classes: ["cinemascope"],
      attributes: {
        loading: "lazy",
      },
      runAfter: runAfterHook,
    },
  };

  eleventyConfig.addPlugin(imagesResponsiver, responsiverPresets);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("_site/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.io/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
