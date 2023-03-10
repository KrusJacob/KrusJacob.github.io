function calcMp(numMp) {
  const mpBar = document.querySelector(".hero_mp");
  let mpAtr = +mpBar.getAttribute("data-mp");
  const factor = mpBar.parentNode.clientWidth / mpAtr;

  let res;
  if (mpAtr < numMp) {
    res = factor * mpAtr;
  } else {
    res = factor * numMp;
  }
  //   res = factor * numMp;

  if (res < 0) {
    mpBar.style.width = "0px";
  } else {
    mpBar.style.width = res + "px";
  }

  function calcDescrMp(current) {
    const wrapperSpan = mpBar.parentNode;
    let currentMp = wrapperSpan.querySelector(".current_mp"),
      totalMp = wrapperSpan.querySelector(".total_mp");
    if (mpAtr < current) {
      currentMp.textContent = mpAtr;
    } else {
      currentMp.textContent = current;
    }
    totalMp.textContent = mpAtr;
  }

  calcDescrMp(numMp);
}

export default calcMp;
