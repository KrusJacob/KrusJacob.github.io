// import Swiper from "../libs/swiper/bundle";

const sliderMain = new Swiper(".slider_main", {
  freeMode: true,
  centeredSlides: true,
  mousewheel: true,
  parallax: true,
  breakpoints: {
    0: {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
    680: {
      slidesPerView: 3.5,
      spaceBetween: 60,
    },
  },
});

const sliderBg = new Swiper(".slider_bg", {
  centeredSlides: true,
  mousewheel: true,
  parallax: true,
  spaceBetween: 60,
  slidesPerView: 3.5,
});

sliderMain.controller.control = sliderBg;

const slides = document.querySelectorAll(".slider__item");
slides.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (item.classList.contains("opened")) {
      slides.forEach((item) => item.classList.remove("opened"));
    } else {
      slides.forEach((item) => item.classList.remove("opened"));
      item.classList.add("opened");
    }
  });
});

let desc = document.querySelector(".description");
sliderMain.on("slideChange", (e) => {
  sliderMain.activeIndex > 0 ? desc.classList.add("hidden") : desc.classList.remove("hidden");
});
