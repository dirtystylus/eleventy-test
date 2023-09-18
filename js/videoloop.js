// autoplay using intersection observer
const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
const videos = document.querySelectorAll("video"); // Select ALL the Videos
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      entry.target.pause(); // Pause the TARGET video
    } else {
      if (isReduced) return;
      entry.target.play(); // Play the TARGET video
    }
  });
}, {});
for (const video of videos) observer.observe(video); // Observe EACH video
const onVisibilityChange = () => {
  if (document.hidden) {
    for (const video of videos) video.pause(); // Pause EACH video
  } else {
    for (const video of videos) {
      if (isReduced) return;
      video.play(); // Play EACH video
    }
  }
};
document.addEventListener("visibilitychange", onVisibilityChange);
