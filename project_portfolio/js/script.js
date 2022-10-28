const hamburger = document.querySelector(".hamburger"),
  menu = document.querySelector(".menu"),
  closeMenu = document.querySelector(".menu__close"),
  links = menu.querySelectorAll(".menu__link");

hamburger.addEventListener("click", () => {
  menu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  menu.classList.remove("active");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

const counters = document.querySelectorAll(".skills__scales-number"),
  lines = document.querySelectorAll(".skills__scales-empty span");

counters.forEach((item, i) => {
  lines[i].style.width = item.innerHTML;
});
