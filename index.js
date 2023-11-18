"use strict";

const sliderButtons = document.querySelectorAll(".slider__btn");
const cardList = document.querySelector(".card__wrapper");
const sliderScrollBar = document.querySelector(".slider__scrollbar");
const scrollbarThumb = document.querySelector(".scrollbar--thumb");
const maxScrollLeft = cardList.scrollWidth - cardList.clientWidth;

sliderButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    const direction = btn.id === "prev" ? -1 : 1;
    const scrollAmount = cardList.clientWidth * direction;
    cardList.scrollBy({ left: scrollAmount, behavior: "smooth" });
  })
);

cardList.addEventListener("scroll", () => {
  const scrollPosition = cardList.scrollLeft;
  const thumbPosition =
    (scrollPosition / maxScrollLeft) *
    (sliderScrollBar.clientWidth - scrollbarThumb.offsetWidth);
  scrollbarThumb.style.left = `${thumbPosition}px`;
});

scrollbarThumb.addEventListener("mousedown", (e) => {
  console.log(e);
  const startX = e.clientX;
  const thumbPosition = scrollbarThumb.offsetLeft;

  const handleMouseMove = (e) => {
    const deltaX = e.clientX - startX;
    const newThumbPosition = thumbPosition + deltaX;

    const maxThumbPosition =
      sliderScrollBar.getBoundingClientRect().width -
      scrollbarThumb.offsetWidth;
    const boundedPosition = Math.max(
      0,
      Math.min(maxThumbPosition, newThumbPosition)
    );

    const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

    scrollbarThumb.style.left = `${boundedPosition}px`;
    cardList.scrollLeft = scrollPosition;
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
});
