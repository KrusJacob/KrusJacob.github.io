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
