import musicAction from "./audio/audio";

const sliderHero = (slides, prev, next) => {
  const slidesElem = document.querySelectorAll(slides),
    arrowPrev = document.querySelector(prev),
    arrowNext = document.querySelector(next);

  let slideIndex = 0;
  const allSlider = slidesElem.length;

  goSlide(slideIndex);

  function plusSlide(n) {
    goSlide((slideIndex += n));
  }

  function goSlide(n) {
    arrowPrev.style.display = "block";
    arrowNext.style.display = "block";
    if (n > allSlider - 5) {
      arrowNext.style.display = "none";
    }
    if (n <= 0) {
      arrowPrev.style.display = "none";
    }
  }

  arrowNext.addEventListener("click", () => {
    slidesElem[slideIndex].classList.add("hidden");
    slidesElem[slideIndex + 4].classList.remove("hidden");
    plusSlide(1);
    musicAction("clickSliderArrow");
  });

  arrowPrev.addEventListener("click", () => {
    plusSlide(-1);
    slidesElem[slideIndex].classList.remove("hidden");
    slidesElem[slideIndex + 4].classList.add("hidden");
    musicAction("clickSliderArrow");
  });
};

export default sliderHero;
