function goldCoin(value, goldMod) {
  const coinBar = document.querySelector(".bar__coin");
  const coinElement = coinBar.querySelector("span");
  let coin = +coinBar.querySelector("span").textContent;

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
