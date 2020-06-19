module.exports = (image, altText, styleName) => {
  const styleObj = {
    book_thumb: {
      sizes: "(min-width: 300px) 400px, 400px",
      classes: ["book-thumb"],
    },
    default: {
      sizes: "(min - width: 650px) 850px, 400px",
      classes: ["default"],
    },
  };

  const styleItem = styleObj[styleName]
    ? styleObj[styleName]
    : styleObj["default"];
  const classMarkup = styleName ? ` class="${styleItem["classes"]}"` : "";
  let sizesMarkup = styleItem["sizes"];
  return `<img ${classMarkup} src="${image}" alt="${altText}" sizes="${sizesMarkup}"/>`;
};
