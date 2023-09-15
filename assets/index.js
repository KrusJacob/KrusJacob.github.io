const timeline = gsap.timeline();

const title = document.querySelector(".home .title");
const descr = document.querySelector(".home__grid_left .descr");
const button = document.querySelector(".home .button");

// const splitText = (el) => {
//   el.innerHTML = el.textContent.replace(/(\S+)/g, (m) => {
//     return `<div class="word">` + m.replace(/(-|#|@)?\S(-|#|@)?/g, "<div class='letter'>$&</div>") + `</div>`;
//   });
//   return el;
// };

// const split = splitText(descr);
// split.querySelectorAll(".letter").forEach((el, index) => {
//   gsap.from(el, 1, {
//     opacity: 0,
//     scale: 0.1,
//     x: gsap.utils.random(-150, 200, 1),
//     y: gsap.utils.random(-150, 200, 1),
//     z: gsap.utils.random(-150, 200, 1),
//     delay: index * 0.015,
//     repeat: 0,
//   });
// });

gsap.from(title, {
  duration: 1,
  opacity: 0,
  x: 150,
  delay: 0.5,
});

gsap.from(descr, {
  duration: 1,
  opacity: 0,
  x: 150,
  delay: 1,
});

gsap.from(button, {
  duration: 2,
  opacity: 0,
  delay: 1.75,
});
