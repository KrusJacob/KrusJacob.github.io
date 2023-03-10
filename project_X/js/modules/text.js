function addText(text, color) {
  const textBlock = document.querySelector(".text__container .text");
  let newText = document.createElement("p");
  newText.textContent = text;
  newText.style.color = color;
  textBlock.prepend(newText);
  function deleteText() {
    if (textBlock.children.length > 10) {
      textBlock.lastChild.remove();
    }
  }
  deleteText();
}

export default addText;

// const level = item.getAttribute("level");
//               const branch = item.getAttribute("branch");

//               unlocksTalents: {
//                 level_1_1: true,
//                 level_2_1: false,
//                 level_2_2: false,
//                 level_3_1: false
//                 level_3_2: false
//               },
