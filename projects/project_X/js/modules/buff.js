import updateStats from "./update_stats";
import calcHp from "./calc_hp";

const arrBuffs = [
  {
    name: "hawk",
    title: "Метка Ястреба",
    descr: "Атака + 14%",
    value: { inc: 14, percent: true, buff: ["attack"], selector: [".attackMin", ".attackMax"] },
  },
  {
    name: "turtle",
    title: "Метка Черепахи",
    descr: "Защита + 15%",
    value: { inc: 15, percent: true, buff: ["def"], selector: [".def"] },
  },
  {
    name: "bear",
    title: "Метка Медведя",
    descr: "Запас Здоровья + 14%",
    value: { inc: 14, percent: true, buff: ["hp"], selector: [".hpMax"] },
  },
  {
    name: "monkey",
    title: "Метка Обезьяны",
    descr: "Уклонение + 16%",
    value: { inc: 16, percent: true, buff: ["dodge"], selector: [".dodge"] },
  },
  {
    name: "tiger",
    title: "Метка Тигра",
    descr: "Шанс крит.удара и Сила крит.удара + 7%",
    value: { inc: 7, percent: true, buff: ["critChance", "critPower"], selector: [".critChance", ".critPower"] },
  },
  {
    name: "raccoon",
    title: "Метка Eнота",
    descr: "Адаптация + 16%",
    value: { inc: 16, percent: true, buff: ["adapt"], selector: [".adapt"] },
  },
  {
    name: "frog",
    title: "Метка Лягушки",
    descr: "Удача + 16%",
    value: { inc: 16, percent: true, buff: ["luck"], selector: [".luck"] },
  },
  {
    name: "rhino",
    title: "Метка Носорога",
    descr: "Атака + 8% <br> Защита + 8%",
    value: { inc: 8, percent: true, buff: ["attack", "def"], selector: [".attackMin", ".attackMax", ".def"] },
  },
  {
    name: "hyena",
    title: "Метка Гиены",
    descr: "Атака + 8% <br> Адаптация + 8%",
    value: { inc: 8, percent: true, buff: ["attack", "adapt"], selector: [".attackMin", ".attackMax", ".adapt"] },
  },
  {
    name: "lion",
    title: "Метка Льва",
    descr: "Запас Здоровья + 8% <br> Защита + 8%",
    value: { inc: 8, percent: true, buff: ["hp", "def"], selector: [".hpMax", ".def"] },
  },
  {
    name: "wolf",
    title: "Метка Волка",
    descr: "Запас Здоровья + 8% <br> Уклонение + 8%",
    value: { inc: 8, percent: true, buff: ["hp", "dodge"], selector: [".hpMax", ".dodge"] },
  },
  {
    name: "crab",
    title: "Метка Краба",
    descr: "Запас Здоровья + 8% <br> Удача + 8%",
    value: { inc: 8, percent: true, buff: ["hp", "luck"], selector: [".hpMax", ".luck"] },
  },
  {
    name: "dolphin",
    title: "Метка Дельфина",
    descr: "Уклонение + 9% <br> Удача + 9%",
    value: { inc: 9, percent: true, buff: ["dodge", "luck"], selector: [".dodge", ".luck"] },
  },
  {
    name: "fox",
    title: "Метка Лисы",
    descr: "Aтака + 8% <br> Уклонение + 8%",
    value: { inc: 8, percent: true, buff: ["attack", "dodge"], selector: [".attackMin", ".attackMax", ".dodge"] },
  },
  {
    name: "shark",
    title: "Метка Акулы",
    descr: `Защита + 9% <br> Адаптация + 9%`,
    value: { inc: 9, percent: true, buff: ["def", "adapt"], selector: [".def", ".adapt"] },
  },
  {
    name: "snake",
    title: "Метка Змеи",
    descr: `Атака + 8% <br> Сила Магии + 8%`,
    value: {
      inc: 8,
      percent: true,
      buff: ["attack", "magicPower"],
      selector: [".attackMin", ".attackMax", ".magicPower"],
    },
  },
  {
    name: "lizard",
    title: "Метка Ящера",
    descr: `Адаптация + 9% <br> Сила Магии + 9%`,
    value: { inc: 9, percent: true, buff: ["adapt", "magicPower"], selector: [".adapt", ".magicPower"] },
  },
  {
    name: "crane",
    title: "Метка Журавля",
    descr: `Удача + 9% <br> Сила Магии + 9%`,
    value: { inc: 9, percent: true, buff: ["luck", "magicPower"], selector: [".luck", ".magicPower"] },
  },
];

const copyArrBuffs = arrBuffs.slice(0);

function buff(hero) {
  const buffOverlay = document.querySelector(".overlay__buff");
  // const buffContent = document.querySelector(".buff__content")

  function mathBuffs() {
    const arrLength = copyArrBuffs.length;
    let num = Math.floor(1 + Math.random() * (arrLength + 1 - 1));
    let buff = copyArrBuffs.splice(num - 1, 1)[0];

    return buff;
  }

  function useBuff(hero, buffObj) {
    // hero[buff.value.buff] += buff.value.inc;

    let hpMax = document.querySelector(".hero_hp").getAttribute("data-hp");

    buffObj.value.buff.forEach((item) => {
      if (item == "attack") {
        hero[item][0] += Math.round(hero[item][0] * (buffObj.value.inc / 100));
        hero[item][1] += Math.round(hero[item][1] * (buffObj.value.inc / 100));
      } else {
        const calcBuff = Math.round(hero[item] * (buffObj.value.inc / 100));
        hero[item] += calcBuff;

        if (item == "hp") {
          hpMax = +hpMax + calcBuff;
          document.querySelector(".hero_hp").setAttribute("data-hp", hpMax);
          calcHp(".hero_hp", hero.hp);
        }
      }
    });
    // hero[buffObj.value.buff] += Math.round(hero[buffObj.value.buff] * (buffObj.value.inc / 100));
    let count = 0;
    buffObj.value.selector.forEach((item) => {
      if (item == ".attackMin") {
        updateStats(`${item}`, hero[buffObj.value.buff[0]][0], true);
      } else if (item == ".attackMax") {
        updateStats(`${item}`, hero[buffObj.value.buff[count++]][1], true);
      } else if (item == ".hpMax") {
        updateStats(`${item}`, hpMax, true);
        count++;
      } else {
        updateStats(`${item}`, hero[buffObj.value.buff[count++]], true);
      }
    });

    console.log(hero);
  }

  collectBuffs();

  function collectBuffs() {
    const firstBuff = mathBuffs();
    const secondBuff = mathBuffs();
    const thirdBuff = mathBuffs();

    initBuffs(firstBuff, secondBuff, thirdBuff);
  }

  function initBuffs(firstBuff, secondBuff, thirdBuff) {
    const buffItems = document.querySelectorAll(".buff-item");
    const btnBuffChoose = document.querySelector(".btn__chooseBuff");

    buffGetStyle(buffItems[0], firstBuff);
    buffGetStyle(buffItems[1], secondBuff);
    buffGetStyle(buffItems[2], thirdBuff);

    buffOverlay.style.display = "block";
    document.body.style.overflow = "hidden";
    buffItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();

        btnBuffChoose.style.display = "block";
        buffItems.forEach((art) => {
          art.setAttribute("data-buff", 0);
          art.style.border = "2px solid";
          art.style.boxShadow = "none";
        });

        item.setAttribute("data-buff", 1);
        item.style.border = "4px solid red";
        item.style.boxShadow = "0 0 20px red";
      });
    });

    btnBuffChoose.addEventListener(
      "click",
      (e) => {
        buffItems.forEach((item) => {
          let buffName = item.getAttribute("buff-name");
          if (item.getAttribute("data-buff") == 1) {
            alert(`Выбрана ${buffName}`);
            useBuff(hero, ...arrBuffs.filter((item) => item.title == buffName));
          } else {
            copyArrBuffs.push(...arrBuffs.filter((item) => item.title == buffName));
          }
          item.firstChild.remove();
        });

        document.body.style.overflow = "";
        buffOverlay.style.display = "none";
      },
      { once: true }
    );
  }

  function buffGetStyle(item, buff) {
    const buffElem = document.createElement("div"),
      buffImg = document.createElement("img"),
      buffDescr = document.createElement("span"),
      buffTitle = document.createElement("p"),
      buffText = document.createElement("div");

    buffElem.classList.add("buff__container");
    // buffElem.style.backgroundColor = artObj.rarity;
    buffImg.setAttribute("src", `img/icons/buffs/buff-${buff.name}.png`);
    buffText.classList.add("buff__text");

    item.setAttribute("buff-name", buff.title);

    item.append(buffElem);
    buffElem.append(buffImg);

    buffTitle.textContent = buff.title;
    buffDescr.innerHTML = buff.descr;
    buffElem.append(buffText);
    buffText.append(buffTitle);
    buffText.append(buffDescr);
  }
}

export default buff;
