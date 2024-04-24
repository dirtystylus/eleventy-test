let postClass = 'tmpl-post';
let articleSelector = 'article.content-main';
let notesWrapperSelector = '.notes-wrapper';
let notesWrapperClass = 'notes-wrapper';
let footnoteRefClass = 'footnote-ref'

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

function showSidenotes() {
  document.querySelector(articleSelector).classList.remove("hide-sidenotes");
}

function hideSidenotes() {
  document.querySelector(articleSelector).classList.add("hide-sidenotes");
}

function insertSidenotes({showFootnotes}) {
  const articleContent = document.querySelector(articleSelector);
  for (const child of articleContent.children) {
    if (
      child.classList.contains('notes-wrapper') // notesWrapperSelector
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

function positionSidenotes() {
  const sidenotes = document.querySelectorAll("aside.note");
  for (let i = 0; i < sidenotes.length; i++) {
    const sidenote = sidenotes[i];
    const anchorId = sidenote.getAttribute("data-anchor-id");
    const anchor = document.querySelector(
      `${articleSelector} > *:not(.notes-wrapper, .footnotes) #${anchorId}`
    );
    // const anchorParent = getAnchorParentContainer(anchor);
    const anchorParent = anchor.parentNode;

    const anchorPosition = anchor.getBoundingClientRect().top;
    const anchorParentPosition = anchorParent.getBoundingClientRect().top;

    // Bump down sidenote if it would overlap with the previous one
    let newPosition = anchorPosition;
    if (i > 0) {
      const prevSideNote = sidenotes[i - 1];
      const prevSidenoteEnd = prevSideNote.getBoundingClientRect().bottom;
      if (anchorPosition < prevSidenoteEnd) {
        newPosition = prevSidenoteEnd + 20;
      }
    }

    sidenote.style.top = `${Math.round(newPosition - anchorParentPosition)}px`;
  }
}

function insertAndPositionSidenotes({showFootnotes}) {
  const mediaQuery = window.matchMedia("(min-width: 45rem)");
  if (mediaQuery.matches) {
    insertSidenotes({showFootnotes});
    positionSidenotes();
    setTimeout(() => positionSidenotes(), 200);
  }
}

function onResize() {
  const sidenotesInDom = Boolean(document.querySelector(notesWrapperSelector));
  console.log('sidenotesInDom', sidenotesInDom);
  const mediaQuery = window.matchMedia("(min-width: 45rem)");
  if (mediaQuery.matches) {
    if (!sidenotesInDom) {
      insertSidenotes({showFootnotes: true});
    }
    showSidenotes();
    positionSidenotes();
  } else {
    if (sidenotesInDom) {
      hideSidenotes();
    }
  }
}

function onAnchorClick(evt) {
  const mediaQuery = window.matchMedia("(min-width: 45rem)");
  dehilightNotes();
  if (mediaQuery.matches) {
    const sidenote = document.getElementById(evt.target.parentNode.id.replace("anchor-", "sidenote-"));
    if (sidenote) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.target.classList.add("active-sidenote");
      const sidenote = document.getElementById(evt.target.parentNode.id.replace("anchor-", "sidenote-"));
      sidenote.classList.add("active-sidenote");
    }
  }
}

function dehilightNotes(evt) {
  const highlighted = document.querySelectorAll(".active-sidenote");
  for (let highlight of highlighted) {
    highlight.classList.remove("active-sidenote");
  }
}

function sidenotes({showFootnotes = true} = {}) {
  if (document.getElementsByTagName('main')[0].classList.contains(postClass)) {
    if (showFootnotes) {
      window.addEventListener("resize", debounce(onResize, 100));
      window.addEventListener("resize", debounce(onResize, 100));
      const anchors = document.querySelectorAll(".footnote-ref");
      for (const anchor of anchors) {
        anchor.addEventListener("click", onAnchorClick);
      }
      document.addEventListener("click", (evt) => {
        if (evt.target.nodeName !== "A") {
          dehilightNotes();
        }
      });
      insertAndPositionSidenotes({showFootnotes});
    }

  }
}

sidenotes({showFootnotes: true});

