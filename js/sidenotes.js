let postClass = 'tmpl-post';
let articleSelector = 'article.content-main';
let noteWrapperClass = 'notes-wrapper';
let footnoteRefClass = 'footnote-ref'

function insertSidenotes({showFootnotes}) {
  const articleContent = document.querySelector(articleSelector);
  for (const child of articleContent.children) {
    if (
      child.classList.contains('notes-wrapper') // noteWrapperClass
    ) {
      continue;
    }
    const anchors = child.querySelectorAll('.footnote-ref'); // footnoteRefClass
    if (anchors.length) {
      const sidenoteContainer = document.createElement("div");
      sidenoteContainer.setAttribute("class", "notes-wrapper");
      for (anchor of anchors) {
        const id = anchor.id;
        const contentId = id.replace("-anchor-", "");
        const content = document.getElementById(contentId);
        const sidenoteWrapper = document.createElement("aside");
        sidenoteWrapper.setAttribute("id", id.replace("anchor-", "sidenote-"));
        sidenoteWrapper.setAttribute("class", "note");
        sidenoteWrapper.setAttribute("role", "note");
        sidenoteWrapper.setAttribute("data-anchor-id", id);

        sidenoteWrapper.innerHTML = content.innerHTML;

        // Remove "jump back to text" link, since it'll be right next to the anchor
        const links = sidenoteWrapper.querySelectorAll("a");
        const lastLink = links[links.length - 1];
        if (lastLink && (lastLink.textContent === "↩︎")) {
          lastLink.remove();
        }

        sidenoteWrapper.insertAdjacentHTML("afterbegin", `<div class='note-identifier'>${anchor.textContent}.</div>`);
        sidenoteContainer.insertAdjacentElement("beforeend", sidenoteWrapper);
      }
      child.insertAdjacentElement("afterend", sidenoteContainer);
    }
  }
}

function insertAndPositionSidenotes({showFootnotes}) {
  const mediaQuery = window.matchMedia("(min-width: 45rem)");
  if (mediaQuery.matches) {
    insertSidenotes({showFootnotes});
    // positionSidenotes();
    // setTimeout(() => positionSidenotes(), 200);
  }
}

function sidenotes({showFootnotes = true} = {}) {
  if (document.getElementsByTagName('main')[0].classList.contains(postClass)) {
    if (showFootnotes) {
      //window.addEventListener("resize", debounce(onResize, 100));
      insertAndPositionSidenotes({showFootnotes});
    }

  }
}

sidenotes({showFootnotes: true});

