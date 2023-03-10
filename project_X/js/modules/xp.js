function heroXp(xp) {
  const barXp = document.querySelector(".bar__xp");
  const imgHero = document.querySelector(".img__hero");
  let totalXp = barXp.querySelector("span");

  totalXp.textContent = xp;

  barXp.animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.8)" }, { transform: "scale(1)" }],
    {
      duration: 1500,
      iterations: 1,
    }
  );

  //   if (totalXp.textContent == "5") {
  //     imgHero.setAttribute("src", "img/heroes/gladiator.png");
  //   }
}

export default heroXp;
