const markdownIt = require("markdown-it");
const md = new markdownIt();
const dbg = require("debug")("responsiver-config");

const runAfterHook = (image, document) => {
  let imageUrl =
    image.getAttribute("data-pristine") || image.getAttribute("src");
  let caption = image.getAttribute("title");
  if (caption !== null) {
    caption = md.renderInline(caption.trim());
  }

  let zoom = [...image.classList].indexOf("zoom") !== -1;

  if (caption || zoom) {
    const figure = document.createElement("figure");
    figure.classList.add(...image.classList);
    // TODO: decide whether classes should be removed from the image or not
    image.classList.remove(...image.classList);
    let figCaption = document.createElement("figcaption");
    figCaption.innerHTML =
      (caption ? caption : "") +
      (zoom
        ? `<p class="zoom">&#128269; See <a href="${imageUrl}">full size</a></p>`
        : "");
    figure.appendChild(image.cloneNode(true));
    figure.appendChild(figCaption);

    // Parent node of the image is a <p> because image is an inline element,
    // and Markdown will wrap in a < p > tag
    if (image.parentNode.nodeName === "p") {
      image.parentNode.replaceWith(figure);
    }
  }
};

module.exports = {
  default: {
    sizes: "(min-width: 650px) 850px, 400px",
    attributes: {
      loading: "lazy",
    },
    resizedImageUrl: (src, width) => `${src}?nf_resize=fit&w=${width}`,
    runAfter: runAfterHook,
  },
  regular: {
    sizes: "(min-width: 650px) 850px, 400px",
    classes: ["regular"],
  },
  cinemascope: {
    sizes: "(min-width: 650px) 850px, (min-width: 1000px) 1200px, 400px",
    classes: ["cinemascope"],
  },
  book_thumb: {
    sizes: "(min-width: 650px) 850px, 400px",
    classes: ["book-thumb"],
    figure: "never",
  },
};
