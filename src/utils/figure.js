// Figure Shortcode
module.exports = (image, caption, styleName) => {
  const styleObj = {
    cinemascope: [
      { width: 700, breakwidth: 650 },
      { width: 1200, breakwidth: 1000 }
    ],
    book_thumb: [
      { width: 300, breakwidth: 400 }
    ],
    default: [
      { width: 700, breakwidth: 650 }
    ]
  };

  const styleItem = styleObj[styleName] ? styleObj[styleName] : styleObj['default'];
  const classMarkup = styleName ? ` class="${styleName}"` : '';
  const captionMarkup = caption ? `<figcaption>${caption}</figcaption>` : '';
  // const srcsetMarkup = className === 'cinemascope' ? `<source srcset="/img/${image}?nf_resize=fit&w=1200" media="(min-width: 1000px)"><source srcset = "/img/${image}?nf_resize=fit&w=700" media = "(min-width: 650px)" >` : `<source srcset = "/img/${image}?nf_resize=fit&w=700" media = "(min-width: 650px)" >`;
  let srcsetMarkup = '';
  styleItem.forEach(element => {
    srcsetMarkup += `<source srcset="/img/${image}?nf_resize=fit&w=${element.width}" media="(min-width: ${element.breakwidth}px)"></source>`;
  });
  return `<figure${classMarkup}>
  <picture>
  ${srcsetMarkup}
  <img src="/img/${image}?nf_resize=fit&w=400" /></picture>
  ${captionMarkup}
  </figure>`;
  //return `<figure${className ? ` class="${className}"` : ''}><img src="/img/${image}" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
};