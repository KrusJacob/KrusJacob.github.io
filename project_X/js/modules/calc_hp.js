function calcHp(selector, numHp) {
  const hpBar = document.querySelector(selector);
  const hpBarShadow = hpBar.parentNode.querySelector(".bar__hp-f-shadow");

  let hpAtr = +hpBar.getAttribute("data-hp");
  const factor = hpBar.parentNode.clientWidth / hpAtr;
  let res;
  if (hpAtr < numHp) {
    res = factor * hpAtr;
  } else {
    res = factor * numHp;
  }

  if (res < 0) {
    hpBar.style.width = "0px";
    hpBarShadow.style.width = "0px";
  } else {
    hpBar.style.width = res + "px";
    hpBarShadow.style.width = res + "px";
  }

  function calcDescrHP(current) {
    const wrapperSpan = hpBar.parentNode;
    let currentHp = wrapperSpan.querySelector(".current_hp"),
      totalHp = wrapperSpan.querySelector(".total_hp");

    if (hpAtr < current) {
      currentHp.textContent = hpAtr;
    } else {
      currentHp.textContent = current;
    }

    totalHp.textContent = hpAtr;
  }

  function setAttrHp(numHp) {
    hpBar.setAttribute("data-current_hp", numHp);
  }

  setAttrHp(numHp);
  calcDescrHP(numHp);
}

export default calcHp;
