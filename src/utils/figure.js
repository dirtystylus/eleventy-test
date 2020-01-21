// Figure Shortcode
module.exports = (image, caption, className) => {
  const classMarkup = className ? ` class="${className}"` : '';
  const captionMarkup = caption ? `<figcaption>${caption}</figcaption>` : '';
  return `<figure${classMarkup}>
  <picture>
  <source srcset="/img/${image}?nf_resize=fit&w=700" media="(min-width: 1200px)">
  <source srcset="/img/${image}?nf_resize=fit&w=600" media="(min-width: 740px)">
  <img src="/img/${image}?nf_resize=fit&w=500" /></picture>
  ${captionMarkup}
  </figure>`;
  //return `<figure${className ? ` class="${className}"` : ''}><img src="/img/${image}" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
};