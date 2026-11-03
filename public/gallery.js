const slides = document.querySelector(".slides");
const pager = document.querySelector(".gallery-pager");
const buttons = Array.from(pager.children);

function showPosition() {
  const index = Math.round(slides.scrollLeft / slides.clientWidth);
  buttons.forEach((button, i) => button.setAttribute("aria-pressed", String(i === index)));
}

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    slides.scrollTo({ left: index * slides.clientWidth });
  });
});

slides.addEventListener("scroll", showPosition, { passive: true });
window.addEventListener("resize", showPosition);
showPosition();
pager.hidden = false;
