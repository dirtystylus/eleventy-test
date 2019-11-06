// Figure Shortcode
module.exports = (image, caption, className) => {
  return `<figure class="${className}"><img src="/img/${image}" /><figcaption>${caption}</figcaption></figure>`;
};