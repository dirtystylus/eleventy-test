const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItAttrs = require("markdown-it-attrs");
const now = new Date();
const debug = require("debug")("markllobrera");
const imagesResponsiver = require("eleventy-plugin-images-responsiver");

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
    if (typeof dateObj === 'string') {
      return DateTime.fromISO(dateObj, { zone: "utc" }).toFormat(
        "LLL dd, yyyy"
      );
    } else {
      return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
        "LLL dd, yyyy"
      );
    }
  });

  eleventyConfig.addNunjucksFilter("date", function (date, format) {
    return DateTime.fromJSDate(date, { zone: "utc" });
  });

  eleventyConfig.addNunjucksFilter("convertTimestampToDate", function (date) {
    return DateTime.fromMillis(date, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Map from Object filter, for Year-based custom collections
  eleventyConfig.addNunjucksFilter("createReverseYearsMapFromObject", function (obj) {
    const yearCollection = obj;
    let yearCollectionDescending = new Map();
    const keysSorted = Object.keys(yearCollection).sort(function(a,b){return Number(b)-Number(a)});    
    keysSorted.forEach((key) => {
      yearCollectionDescending.set(key, yearCollection[key]);
    });
    return yearCollectionDescending;
  });

  // Limit filter
  eleventyConfig.addNunjucksFilter("limit", function (array, limit) {
    return array.slice(0, limit);
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Override original declaration: eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));
  eleventyConfig.addCollection("tagList", require("./src/utils/getTagList.js"));

  // Return projects
  eleventyConfig.addCollection("projects", function (collection) {
    return collection.getAll().filter(function (item) {
      return item.data.content_type == "project";
    });
  });

  // Return books
  eleventyConfig.addCollection("reading", function (collection) {
    const books = collection
      .getAll()
      .filter(function (item) {
        return item.data.content_type == "book";
      })
      .sort(function (a, b) {
        return a.date - b.date;
        // return (
        //   new Date(a.data.end_date) - new Date(b.data.end_date);
        // );
      });
    for (let i = 0; i < books.length; i++) {
      const prevPost = books[i - 1];
      const nextPost = books[i + 1];

      books[i].data["prevBook"] = prevPost;
      books[i].data["nextBook"] = nextPost;
    }
    return [...books].reverse();
  });

  // Return combined posts and books
  eleventyConfig.addCollection("combined", function (collection) {
    const coll = collection
      .getAll()
      .filter(function (item) {
        return (
          item.data.content_type == "book" || item.data.content_type == "post"
        );
      })
      .sort(function (a, b) {
        return a.date - b.date;
      });

    for (let i = 0; i < coll.length; i++) {
      const prevPost = coll[i + 1];
      const nextPost = coll[i - 1];

      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
    }
    return [...coll].reverse();
  });

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("_redirects");

  // Next/Previous navigation
  // See: https://brycewray.com/posts/2019/12/previous-next-eleventy/
  eleventyConfig.addCollection("posts", function (collection) {
    const coll = collection
      .getAll()
      .filter(function (item) {
        return item.data.content_type == "post";
      })
      .sort(function (a, b) {
        return a.date - b.date;
      });

    for (let i = 0; i < coll.length; i++) {
      const prevPost = coll[i - 1];
      const nextPost = coll[i + 1];

      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
    }

    return [...coll].reverse();
  });

  function makeDateFormatter(dateFormat) {
    return function (date) {
      // return moment(date).format(datePattern);
      return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(dateFormat);
    };
  }
  
  function generateItemsDateSet(items, dateFormatter) {
    const formattedDates = items.map((item) => {
      return dateFormatter(item.data.page.date);
    });
    return [...new Set(formattedDates)];
  }
  
  function getItemsByDate(items, date, dateFormatter) {
    return items.filter((item) => {
      return dateFormatter(item.data.page.date) === date;
    });
  }
  
  const contentByDateString = (items, dateFormatter) => {
    return generateItemsDateSet(items, dateFormatter).reduce(function (
      collected,
      formattedDate
    ) {
      return Object.assign({}, collected, {
        // lowercase to match month directory page.url
        [formattedDate.toLowerCase()]: getItemsByDate(
          items,
          formattedDate,
          dateFormatter
        ),
      });
    },
    {});
  };

  const contentsByYear = (collection) => {
    return contentByDateString(collection, makeDateFormatter('yyyy'));
  };

  eleventyConfig.addCollection("postsByYear", function (collection) {
    const coll = collection
      .getAll()
      .filter(function (item) {
        return item.data.content_type == "post";
      })
      .sort(function (a, b) {
        return a.date - b.date;
      });

    for (let i = 0; i < coll.length; i++) {
      const prevPost = coll[i - 1];
      const nextPost = coll[i + 1];

      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
    }

    return contentsByYear(coll);
  });

  eleventyConfig.addCollection("booksByYear", function (collection) {
    const coll = collection
      .getAll()
      .filter(function (item) {
        return item.data.content_type == "book";
      })
      .sort(function (a, b) {
        return a.date - b.date;
      });

    for (let i = 0; i < coll.length; i++) {
      const prevPost = coll[i - 1];
      const nextPost = coll[i + 1];

      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
    }

    return contentsByYear(coll);
  });

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: false,
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
  eleventyConfig.addShortcode("image", require("./src/utils/image.js"));

  eleventyConfig.addPairedShortcode(
    "markdown",
    (data) => {
      return markdownLibrary.renderInline(data);
    }
  );

  eleventyConfig.addPairedShortcode(
    "gallery", (data) => {
      const galleryContent = markdownLibrary.render(data);
      return `<div class="gallery">${galleryContent}</div>`;
    }
  );

  eleventyConfig.addPairedShortcode(
    "vimeo", (data) => {
      const videoURL = markdownLibrary.renderInline(data.trim());
      return `<figure class="cinemascope video"><div class="video-embed"><div><iframe src="${videoURL}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script></figure>`;
    }
  );

  // Images Responsiver
  const imagesResponsiverConfig = require("./src/utils/images-responsiver-config.js");
  eleventyConfig.addPlugin(imagesResponsiver, imagesResponsiverConfig);

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
    templateFormats: ["md", "njk", "html", "liquid", "jpg", "gif", "png"],

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
