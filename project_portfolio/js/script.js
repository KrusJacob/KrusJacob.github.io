const hamburger = document.querySelector(".hamburger"),
  menu = document.querySelector(".menu"),
  close = document.querySelector(".menu__close");

hamburger.addEventListener("click", () => {
  menu.classList.add("active");
});

close.addEventListener("click", () => {
  menu.classList.remove("active");
});

const counters = document.querySelectorAll(".skills__scales-number"),
  lines = document.querySelectorAll(".skills__scales-empty span");

counters.forEach((item, i) => {
  lines[i].style.width = item.innerHTML;
});
