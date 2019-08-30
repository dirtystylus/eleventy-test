// Figure Shortcode
module.exports = (image, caption) => {
  return `<figure><img src="/img/${image}" /><figcaption>${caption}</figcaption></figure>`;
};