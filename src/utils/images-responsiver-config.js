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

const runAfterHookGallery = (image, document) => {
	let imageUrl =
		image.getAttribute("data-pristine") || image.getAttribute("src");
		let caption = image.getAttribute("title");
		if (caption !== null) {
			caption = md.renderInline(caption.trim());
		}
		
	const figure = document.createElement("figure");
		figure.classList.add(...image.classList);
		// TODO: decide whether classes should be removed from the image or not
		image.classList.remove(...image.classList);
		
		const link = document.createElement("a");
	link.setAttribute("href", imageUrl);
		link.setAttribute("data-size", figure.classList[0]);
		link.appendChild(image.cloneNode(true));
		
		figure.appendChild(link);
		if (caption) {
		let figCaption = document.createElement("figcaption");
		figCaption.innerHTML =
			(caption ? caption : "");
		figure.appendChild(figCaption);
			
		}

		// Parent node of the image is a <p> because image is an inline element,
		// and Markdown will wrap in a < p > tag
		if (image.parentNode.nodeName === "p") {
			image.parentNode.replaceWith(figure);
		} else {
			image.replaceWith(figure);
		}
};

module.exports = {
	default: {
		sizes: "(min-width: 65em) 1040px, (min-width: 45em) 800px, 100vw",
		attributes: {
			loading: "lazy",
		},
		resizedImageUrl: (src, width) => `${src}?nf_resize=fit&w=${width}`,
		runAfter: runAfterHook,
	},
	regular: {
		classes: ["regular"],
	},
	cinemascope: {
		sizes: "(min-width: 65em) 1280px, (min-width: 45em) 800px, 100vw",
		classes: ["cinemascope"],
	},
	book_thumb: {
		sizes: "400px, 100vw",
		classes: ["book-thumb"],
		figure: "never",
	},
	gallery_3x2: {
		sizes: "(min-width: 45em) 400px, 100vw",
		classes: ["gallery-3x2"],
		fallbackWidth: 400,
		minWidth: 320,
		maxWidth: 640,
		steps: 3,
		runAfter: runAfterHookGallery,
	},
	gallery_2x3: {
		sizes: "(min-width: 45em) 400px, 100vw",
		classes: ["gallery-2x3"],
		fallbackWidth: 400,
		minWidth: 320,
		maxWidth: 640,
		steps: 3,
		runAfter: runAfterHookGallery,
	},
	gallery_4x3: {
		sizes: "(min-width: 45em) 400px, 100vw",
		classes: ["gallery-4x3"],
		fallbackWidth: 400,
		minWidth: 320,
		maxWidth: 640,
		steps: 3,
		runAfter: runAfterHookGallery,
	},
	gallery_3x4: {
		sizes: "(min-width: 45em) 400px, 100vw",
		classes: ["gallery-3x4"],
		fallbackWidth: 400,
		minWidth: 320,
		maxWidth: 640,
		steps: 3,
		runAfter: runAfterHookGallery,
	},
	gallery_16x9: {
		sizes: "(min-width: 45em) 400px, 100vw",
		classes: ["gallery-16x9"],
		fallbackWidth: 400,
		minWidth: 320,
		maxWidth: 640,
		steps: 3,
		runAfter: runAfterHookGallery,
	},
	gallery_1x1: {
		sizes: "(min-width: 45em) 400px, 100vw",
		classes: ["gallery-1x1"],
		fallbackWidth: 400,
		minWidth: 320,
		maxWidth: 640,
		steps: 3,
		runAfter: runAfterHookGallery,
	},
	
};
