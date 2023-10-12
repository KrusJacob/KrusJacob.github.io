function accordion(
  headActive = "talents__accordion-head--active",
  contentActive = "talents__accordion-content--active",
  paddings = 280
) {
  // const container = document.querySelector(".talents__container");
  const head = document.querySelector(".talents__accordion-head");
  head.addEventListener("click", () => {
    console.log("sss");
    head.classList.toggle(headActive);
    head.previousElementSibling.classList.toggle(contentActive);

    if (head.classList.contains(headActive)) {
      head.previousElementSibling.style.maxWidth = paddings + "px";
      //   container.style.backgroundColor = "black";
    } else {
      head.previousElementSibling.style.maxWidth = "0px";
      //   container.style.backgroundColor = "";
    }
  });
}

export default accordion;
