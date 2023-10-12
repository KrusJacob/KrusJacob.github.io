import updateStats from "./update_stats";
import calcHp from "./calc_hp";

let objHero;
let maxHpHero;
let goldHero;
// let extraPriceHp, extraPriceDef, extraPrice, extraPrice, extraPrice, extraPrice
function updateHero(hero, maxHp) {
  objHero = hero;
  maxHpHero = +maxHp;
  goldHero = +document.querySelector(".bar__coin span").textContent;
}

const shop = () => {
  //   const gainAttack = document.querySelector(".shop_attack");

  getParameter(".shop_attack", ".attack");
  getParameter(".shop_def", ".def");
  getParameter(".shop_chance-crit", ".critChance");
  getParameter(".shop_power-crit", ".critPower");
  getParameter(".shop_dodge", ".dodge");
  getParameter(".shop_luck", ".luck");
  getParameter(".shop_adapt", ".adapt");
  getParameter(".shop_hp", ".hp");
  getParameter(".shop_max-hp", ".hpMax");
  getParameter(".shop_magicPower", ".magicPower");
};

function getParameter(selector, cardParametr) {
  const blockParameter = document.querySelector(selector),
    btnParameter = blockParameter.querySelector("button"),
    parameter = blockParameter.getAttribute("data-shop"),
    value = +blockParameter.querySelector(".shop__item-descr span").textContent,
    price = blockParameter.querySelector(".shop__item-price span");
  btnParameter.addEventListener("click", () => {
    if (goldHero >= price.textContent) {
      if (cardParametr !== ".hp" && cardParametr !== ".attack") {
        updateStats(cardParametr, value);
      }
      if (parameter === "hpMax") {
        maxHpHero += +value;
        document.querySelector(".hero_hp").setAttribute("data-hp", maxHpHero);
        objHero.hp += value;
      } else if (parameter === "attack") {
        objHero.attack[0] += value;
        objHero.attack[1] += value;
        updateStats(".attackMin", value);
        updateStats(".attackMax", value);
      } else if (parameter === "hp") {
        objHero[parameter] += Math.round(maxHpHero / 4);
      } else {
        objHero[parameter] += value;
      }

      updateHero(objHero, maxHpHero);
      calcHp(".hero_hp", objHero.hp);

      goldHero -= price.textContent;

      price.textContent = +price.textContent + 7;
      document.querySelector(".bar__coin span").textContent = goldHero;
    } else {
      alert("Не хватает золота");
    }
  });
}
//   console.log(goldHero);

export default shop;
export { updateHero };
