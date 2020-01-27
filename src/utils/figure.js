// Figure Shortcode
module.exports = (image, caption, className) => {
  const classMarkup = className ? ` class="${className}"` : '';
  const captionMarkup = caption ? `<figcaption>${caption}</figcaption>` : '';
  const srcsetMarkup = className === 'cinemascope' ? `<source srcset="/img/${image}?nf_resize=fit&w=1200" media="(min-width: 1000px)"><source srcset = "/img/${image}?nf_resize=fit&w=700" media = "(min-width: 650px)" >` : `<source srcset = "/img/${image}?nf_resize=fit&w=700" media = "(min-width: 650px)" >`;
  return `<figure${classMarkup}>
  <picture>
  ${srcsetMarkup}
  <img src="/img/${image}?nf_resize=fit&w=500" /></picture>
  ${captionMarkup}
  </figure>`;
  //return `<figure${className ? ` class="${className}"` : ''}><img src="/img/${image}" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
};