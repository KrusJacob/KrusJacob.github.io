function goldCoin(value, modificator) {
  const coinBar = document.querySelector(".bar__coin");
  const coinElement = coinBar.querySelector("span");
  let coin = +coinBar.querySelector("span").textContent;
  let goldMod = 1;

  if (modificator) {
    goldMod += +modificator;
    console.log("мод золото");
  }
  getCoin(value);

  function getCoin(value) {
    coin += Math.round(value * goldMod);
    coinElement.textContent = coin;
  }

  coinBar.animate(
    [
      { transform: "rotate(0deg)" },
      { transform: "rotate(10deg) scale(1.2)" },
      { transform: "rotate(-10deg) scale(1.3) " },
      { transform: "rotate(10deg) scale(1.2)" },
      { transform: "rotate(0deg) " },
    ],
    {
      duration: 1200,
      iterations: 1,
    }
  );
}

export default goldCoin;
