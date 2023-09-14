function updateStats(selector, value, current) {
  let textItem = document.querySelector(selector);
  if (!current) {
    textItem.textContent = +textItem.textContent + value;
  } else {
    textItem.textContent = value;

    textItem.animate(
      [
        { transform: "scale(1) translateX(0px)" },
        { transform: "scale(1.6) translateX(3px)" },
        { transform: "scale(1) translateX(0px)" },
      ],
      {
        duration: 1000,
        iterations: 1,
      }
    );
  }
}

export default updateStats;
