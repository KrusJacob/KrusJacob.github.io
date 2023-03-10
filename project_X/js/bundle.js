/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/artifacts.js":
/*!*************************************!*\
  !*** ./src/js/modules/artifacts.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _calc_hp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calc_hp */ "./src/js/modules/calc_hp.js");
/* harmony import */ var _calc_mp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calc_mp */ "./src/js/modules/calc_mp.js");
/* harmony import */ var _update_stats__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./update_stats */ "./src/js/modules/update_stats.js");
/* harmony import */ var _xp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./xp */ "./src/js/modules/xp.js");
/* harmony import */ var _talents_core_talents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./talents/core-talents */ "./src/js/modules/talents/core-talents.js");
/* harmony import */ var _buff__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./buff */ "./src/js/modules/buff.js");







const artifacts = [
  "spear",
  "ironArmor",
  "clover",
  "dagger",
  "heart",
  "phoenix",
  "sword",
  "mace",
  "magicBall",
  "vampiric",
  "flacon",
  "shieldAndSword",
  "bronzeAxe",
  "boots",
  "knightArmor",
  "leatherArmor",
  "goldCrown",
  "iceAxe",
  "goldBelt",
  "apple",
  "amulet",
  "dwarfHammer",
  "spark",
  "glassesMiner",
  "leatherBracers",
  "frostSword",
  "magicShield",
  "potion_Hp_Mp",
  "magicBook",
  "staffOfHealing",
];
const artifactsLegends = [
  "goldSword",
  "helmet",
  "eyeFirst",
  "eyeSecond",
  "fieryFist",
  "cursedSkull",
  "fieryHand",
  "blackRaven",
  "gnomeShield",
  "redDagger",
  "sphereOfPower",
  "robberyCloak",
  "flameBook",
  "thunderHammer",
];
const artifactsBoss = [
  ["bloodOrk", "fangOrk"],
  ["darknessMimic", "pumpkinMimic"],
  ["ringOmbal", "staffOmbal"],
  ["iceDM", "sphereDM"],
  ["swordKingHell", "handKingHell"],
];
// bloodOrk - ярость
// fangOrk - атака, крит.шанс
// darknessMimic - отхил
// pumpkinMimic - (-здоровье +атака и крит)
// ringOmbal - макс нр
// staffOmbal - дагон
// iceDM - защита
// sphereDM - сейв на лоу хп
// swordKingHell - супер атака

const artContent = document.querySelector(".art__content");
const artWindow = document.querySelector(".overlay__takeArt");

let artLength;
let xp = 0;
let totalXp = 1;
let arrArtifacts;
let numBoss = 0;
const staticChanceLegendArt = 4;
let upChanceLegendArt = staticChanceLegendArt;

(0,_xp__WEBPACK_IMPORTED_MODULE_3__["default"])(1);

function getXp(hero, guarantLegendArt = false, boss = false) {
  if (!boss) {
    xp += 1;
  }

  if (xp % 2 == 0) {
    xp = 0;
    totalXp += 1;
    if (totalXp % 4 == 0) {
      hero.talentsPoint += 1;
      _talents_core_talents__WEBPACK_IMPORTED_MODULE_4__["default"].incTalent(hero.talentsPoint);
    }

    hero.lvl += 1;
    hero.lvl % 15 == 0 ? (0,_buff__WEBPACK_IMPORTED_MODULE_5__["default"])(hero) : null;

    (0,_xp__WEBPACK_IMPORTED_MODULE_3__["default"])(totalXp);
    setTimeout(collectArt, 1000);
  } else if (guarantLegendArt || boss) {
    setTimeout(collectArt, 1000);
  }
  function mathArtifacts(guarantLegend, boss) {
    if (boss) {
      artLength = artifactsBoss[numBoss];
      arrArtifacts = artifactsBoss[numBoss];
    } else if (Math.floor(Math.random() * 100) + 1 < upChanceLegendArt || guarantLegend) {
      artLength = artifactsLegends.length;
      arrArtifacts = artifactsLegends;
      upChanceLegendArt = staticChanceLegendArt;
    } else {
      artLength = artifacts.length;
      arrArtifacts = artifacts;
      upChanceLegendArt += 1;
    }
    //   let num = Math.floor(Math.random() * (0 - artLength + 1)) + artLength;
    let num = Math.floor(1 + Math.random() * (artLength + 1 - 1));
    let art = arrArtifacts.splice(num - 1, 1).join("");
    // useArtifact(art, hero);

    return art;
  }

  //
  async function collectArt() {
    let first = await getSrcImgArt(mathArtifacts(guarantLegendArt, boss));
    let second = await getSrcImgArt(mathArtifacts(guarantLegendArt, boss));
    if (boss) numBoss++;
    chooseArt(first, second);
  }

  function getSrcImgArt(art) {
    switch (art) {
      case "thunderHammer":
        return {
          name: "thunderHammer",
          src: "img/artifacts/thunderHammer.png",
          rarity: "gold",
          title: "Громовой Молот",
          descr: "Увеличивает атаку и силу магии на 5, есть шанс, что ваша атака может оглушить врага на 1 ход",
        };
      case "staffOfHealing":
        return {
          name: "staffOfHealing",
          src: "img/artifacts/staffOfHealing.png",
          rarity: "royalblue",
          title: "Посох Исцеления",
          descr: "Увеличивает силу магии на 5, макс.здоровье на 25 и повышает регенерацию здоровья после боя",
        };
      case "flameBook":
        return {
          name: "flameBook",
          src: "img/artifacts/flameBook.png",
          rarity: "gold",
          title: "Огненная Книга",
          descr: "Увеличивает силу магии на 16",
        };
      case "magicBook":
        return {
          name: "magicBook",
          src: "img/artifacts/magicBook.png",
          rarity: "royalblue",
          title: "Книга Магии",
          descr: "Увеличивает силу магии на 10 и адаптацию на 5%",
        };
      case "robberyCloak":
        return {
          name: "robberyCloak",
          src: "img/artifacts/robbery_cloak.png",
          rarity: "gold",
          title: "Плащ Разбойника",
          descr: "Увеличивает уклонение на 5%. При успешном уклонении повышает шанс крит.удара на 30% на 1 ход",
        };
      case "handKingHell":
        return {
          name: "handKingHell",
          src: "img/artifacts/bossArts/handKingHell.png",
          rarity: "blueviolet",
          title: "Адские Когти",
          descr:
            "Ваши критические атаки могут поджечь противинка, от чего он будет терять здоровье в течении 4 ходов",
        };
      case "swordKingHell":
        return {
          name: "swordKingHell",
          src: "img/artifacts/bossArts/swordKingHell.png",
          rarity: "blueviolet",
          title: "Меч Короля Ада",
          descr: "Увеличивает атаку на 5. При промахе, огненный шлейф от взмаха меча наносит врагу 50% от атаки",
        };
      case "potion_Hp_Mp":
        return {
          name: "potion_Hp_Mp",
          src: "img/artifacts/potion_Hp_Mp.png",
          rarity: "royalblue",
          title: "Зелье Регенерации",
          descr:
            "С некоторым шансом, при получении урона, вы можете выпить зелье, восстановив 5% здоровья и 10 маны",
        };
      case "magicShield":
        return {
          name: "magicShield",
          src: "img/artifacts/magicShield.png",
          rarity: "royalblue",
          title: "Магический Щит",
          descr:
            "Увеличивает защиту на 2 и макс.здоровье на 20, также при получении урона, есть шанс получить 1 к мане",
        };
      case "frostSword":
        return {
          name: "frostSword",
          src: "img/artifacts/frostSword.png",
          rarity: "royalblue",
          title: "Ледяной Меч",
          descr: "Увеличивает атаку на 4, ваши критические удары генерируют 2 маны",
        };
      case "leatherBracers":
        return {
          name: "leatherBracers",
          src: "img/artifacts/leatherBracers.png",
          rarity: "limegreen",
          title: "Кожанные Наручи",
          descr: "Увеличивает защиту и уклонение на 1 и адаптацию на 10%",
        };
      case "glassesMiner":
        return {
          name: "glassesMiner",
          src: "img/artifacts/glassesMiner.png",
          rarity: "limegreen",
          title: "Очки Шахтера",
          descr: "Увеличивает защиту и удачу на 1 и адаптацию на 10%",
        };
      case "sphereOfPower":
        return {
          name: "sphereOfPower",
          src: "img/artifacts/sphereOfPower.png",
          rarity: "gold",
          title: "Сфера Силы",
          descr: "Увеличивает атаку и Силу магии на 2, а также получение маны за удар увеличено на 1",
        };
      case "spark":
        return {
          name: "spark",
          src: "img/artifacts/spark.png",
          rarity: "limegreen",
          title: "Волшебная Искра",
          descr: "Увеличивает ваше максимальное здоровье и ману на 35",
        };
      case "sphereDM":
        return {
          name: "sphereDM",
          src: "img/artifacts/bossArts/sphereDM.png",
          rarity: "blueviolet",
          title: "Сердце алмазного гиганта",
          descr: "При получении смертельного урона, наделяет неуязвимостью на 2 хода",
        };
      case "iceDM":
        return {
          name: "iceDM",
          src: "img/artifacts/bossArts/iceDM.png",
          rarity: "blueviolet",
          title: "Первородный Алмаз",
          descr: "Увеличивает вашу защиту на 7 и удачу на 3%",
        };
      case "staffOmbal":
        return {
          name: "staffOmbal",
          src: "img/artifacts/bossArts/staffOmbal.png",
          rarity: "blueviolet",
          title: "Жезл Омбала",
          descr:
            "Сила магии + 5. После каждых 5 ходов жезл выплескивает накопившуюся в себе волшебную силу и наносит врагу урон в размере 20% вашего макс.здоровья",
        };
      case "ringOmbal":
        return {
          name: "ringOmbal",
          src: "img/artifacts/bossArts/ringOmbal.png",
          rarity: "blueviolet",
          title: "Кольцо жизненной силы",
          descr: "Увеличивает максимальный запас здоровье на 110",
        };
      case "pumpkinMimic":
        return {
          name: "pumpkinMimic",
          src: "img/artifacts/bossArts/pumpkinMimic.png",
          rarity: "blueviolet",
          title: "Голова Мимика",
          descr:
            "Вы заключает сделку с предвестником апокалипсиса. Увеличивает вашу атаку на 12, и силу крит.удара на 20% - взамен уменьшая ваше максимальное здоровье на 60",
        };
      case "darknessMimic":
        return {
          name: "darknessMimic",
          src: "img/artifacts/bossArts/darknessMimic.png",
          rarity: "blueviolet",
          title: "Cфера Мрака",
          descr:
            "При получнии урона, сфера может погрузить мир во тьму, повышая ваше уклонение на 25% на 3 хода и исцеляя вам 3% здоровья каждый ваш ход.",
        };
      case "fangOrk":
        return {
          name: "fangOrk",
          src: "img/artifacts/bossArts/fangOrk.png",
          rarity: "blueviolet",
          title: "Клык вождя орков",
          descr: "Повышает атаку на 25% от текущей, и шанс крит.удара на 6%",
        };
      case "bloodOrk":
        return {
          name: "bloodOrk",
          src: "img/artifacts/bossArts/bloodOrk.png",
          rarity: "blueviolet",
          title: "Кровь вождя орков",
          descr:
            "Если здоровье падает ниже 25%, вы исцеляетесь на 10% от вашего макс.здоровья и наносите врагу столько же урона. Срабатывает один раз за бой",
        };
      case "apple":
        return {
          name: "apple",
          src: "img/artifacts/apple.png",
          rarity: "limegreen",
          title: "Яблочко",
          descr: "Исцеляет на 150 очков здоровья и увеличивает удачу на 5",
        };
      case "goldBelt":
        return {
          name: "goldBelt",
          src: "img/artifacts/goldBelt.png",
          rarity: "limegreen",
          title: "Золотой Пояс",
          descr: "Увеличивает максимальное здоровье на 50 и удачу на 4",
        };
      case "dwarfHammer":
        return {
          name: "dwarfHammer",
          src: "img/artifacts/dwarfHammer.png",
          rarity: "limegreen",
          title: "Молот Дворфов",
          descr: "Увеличивает атаку на 6 и максимальное здоровье на 40, но снижает адаптацию на 8% ",
        };
      case "iceAxe":
        return {
          name: "iceAxe",
          src: "img/artifacts/iceAxe.png",
          rarity: "limegreen",
          title: "Топор Варвара",
          descr: "Увеличивает атаку на 5, а шанс крит.удара на 3%",
        };
      case "goldCrown":
        return {
          name: "goldCrown",
          src: "img/artifacts/goldCrown.png",
          rarity: "royalblue",
          title: "Золотая Корона",
          descr: "Увеличивает получаемое золото на 20%",
        };
      case "redDagger":
        return {
          name: "redDagger",
          src: "img/artifacts/redDagger.png",
          rarity: "gold",
          title: "Алый Кинжал",
          descr: "Увеличивает атаку на 7, также при атаке есть шанс проигнорировать защиту противника",
        };
      case "gnomeShield":
        return {
          name: "gnomeShield",
          src: "img/artifacts/gnomeShield.png",
          rarity: "gold",
          title: "Щит Гномов",
          descr: "Увеличивает защиту на 4, также дает шанс заблокировать атаку противника",
        };
      case "blackRaven":
        return {
          name: "blackRaven",
          src: "img/artifacts/blackRaven.png",
          rarity: "gold",
          title: "Ворон Смерти",
          descr:
            "С некоторой вероятностью при атаке ворон проклинает вашего врага, после чего он умирает, а вы получаете 20% ущерба от нанесенного урона вороном",
        };
      case "boots":
        return {
          name: "boots",
          src: "img/artifacts/boots.png",
          rarity: "limegreen",
          title: "Сапожки",
          descr: "Увеличивает защиту на 1 и повышает уклонение на 6%",
        };
      case "bronzeAxe":
        return {
          name: "bronzeAxe",
          src: "img/artifacts/bronzeAxe.png",
          rarity: "limegreen",
          title: "Бронзовый Топор",
          descr: "Увеличивает максимальную aтаку на 4, а минимальную атаку на 9",
        };
      case "fieryHand":
        return {
          name: "fieryHand",
          src: "img/artifacts/fieryHand.png",
          rarity: "gold",
          title: "Огненная Кожа",
          descr:
            "Увеличивает защиту на 3, также при получении урона есть шанс нанести часть этого урона в противника",
        };
      case "shieldAndSword":
        return {
          name: "shieldAndSword",
          src: "img/artifacts/shieldAndSword.png",
          rarity: "limegreen",
          title: "Щит и Меч",
          descr: "Увеличивает защиту на 2, и атаку на 5",
        };
      case "cursedSkull":
        return {
          name: "cursedSkull",
          src: "img/artifacts/cursedSkull.png",
          rarity: "gold",
          title: "Проклятый Череп",
          descr:
            "Вы разово теряете 80 здоровья на усиление атаки на 10 и силы крит.удара на 25%, а защита снижается на 3",
        };
      case "fieryFist":
        return {
          name: "fieryFist",
          src: "img/artifacts/fieryFist.png",
          rarity: "gold",
          title: "Кулак Ярости",
          descr: "Увеличивает атаку на 6, если здоровье в бою ниже 30%, то получаете еще дополнительно 30 атаки",
        };
      case "flacon":
        return {
          name: "flacon",
          src: "img/artifacts/flacon.png",
          rarity: "royalblue",
          title: "Флакон Здоровья",
          descr: "Полностью исцеляет при получении и пассивно увеличивает регенерацию здоровья после боя",
        };
      case "spear":
        return {
          name: "spear",
          src: "img/artifacts/spear.png",
          rarity: "limegreen",
          title: "Копьё Рыцаря",
          descr: "Увеличивает максимальную атаку на 7 и силу крит.удара на 20%",
        };
      case "ironArmor":
        return {
          name: "ironArmor",
          src: "img/artifacts/ironArmor.png",
          rarity: "limegreen",
          title: "Железная Кираса",
          descr: "Увеличивает защиту на 3 и максимальное здоровье на 30",
        };
      case "clover":
        return {
          name: "clover",
          src: "img/artifacts/clover.png",
          rarity: "limegreen",
          title: "Клевер",
          descr: "Увеличивает удачу на 8",
        };
      case "amulet":
        return {
          name: "amulet",
          src: "img/artifacts/amulet.png",
          rarity: "limegreen",
          title: "Aмулет Жизни",
          descr:
            "Увеличивает максимальный запас здоровья на 35, силу магии на 4 и регенерацию здоровья после боя.",
        };
      case "dagger":
        return {
          name: "dagger",
          src: "img/artifacts/dagger.png",
          rarity: "limegreen",
          title: "Кинжал",
          descr: "Увеличивает шанс крит.удара на 7%",
        };
      case "heart":
        return {
          name: "heart",
          src: "img/artifacts/heart.png",
          rarity: "limegreen",
          title: "Сердце",
          descr: "Увеличивает максимальное здоровье на 65",
        };
      case "phoenix":
        return {
          name: "phoenix",
          src: "img/artifacts/phoenix.png",
          rarity: "royalblue",
          title: "Крылья Феника",
          descr: "Возрождает вас единожды после смерти",
        };
      case "sword":
        return {
          name: "sword",
          src: "img/artifacts/sword.png",
          rarity: "limegreen",
          title: "Меч",
          descr: "Увеличивает атаку на 7",
        };
      case "mace":
        return {
          name: "mace",
          src: "img/artifacts/mace.png",
          rarity: "limegreen",
          title: "Булава",
          descr: "Увеличивает максимальную атаку на 13",
        };
      case "magicBall":
        return {
          name: "magicBall",
          src: "img/artifacts/magic_ball.png",
          rarity: "limegreen",
          title: "Магический Шар",
          descr: "Увеличивает уклонение, адаптацию на 5%, и силу магии на 5",
        };
      case "vampiric":
        return {
          name: "vampiric",
          src: "img/artifacts/vampiric.png",
          rarity: "royalblue",
          title: "Клыки Вампира",
          descr: "Восстанавливает здоровье при атаке в размере 8%",
        };
      case "goldSword":
        return {
          name: "goldSword",
          src: "img/artifacts/gold_sword.png",
          rarity: "gold",
          title: "Золотой Меч",
          descr: "Увеличивает атаку на 12",
        };
      case "helmet":
        return {
          name: "helmet",
          src: "img/artifacts/helmet.png",
          rarity: "gold",
          title: "Шлем Варвара",
          descr: "Увеличивает защиту на 2 и вампиризм +10%",
        };
      case "eyeFirst":
        return {
          name: "eyeFirst",
          src: "img/artifacts/eye_first.png",
          rarity: "gold",
          title: "Левый глаз демона",
          descr: "Увеличивает максимальное здоровье на 75 и адаптацию на 15%",
        };
      case "eyeSecond":
        return {
          name: "eyeSecond",
          src: "img/artifacts/eye_second.png",
          rarity: "gold",
          title: "Правый глаз демона",
          descr: "Увеличивает шанс крит. удара на 9% и адаптацию на 15%",
        };
      case "knightArmor":
        return {
          name: "knightArmor",
          src: "img/artifacts/knightArmor.png",
          rarity: "royalblue",
          title: "Доспех Рыцаря",
          descr: "Увеличивает защиту на 4 и удачу на 2",
        };
      case "leatherArmor":
        return {
          name: "leatherArmor",
          src: "img/artifacts/leatherArmor.png",
          rarity: "limegreen",
          title: "Кожаный Доспех",
          descr: "Увеличивает защиту на 2 и уклонение на 4%",
        };
      case "gauntletGloves":
        return {
          name: "gauntletGloves",
          src: "img/artifacts/gauntletGloves.png",
          rarity: "limegreen",
          title: "Железные Перчатки",
          descr: "Увеличивает защиту на 2 и адаптацию на 8%",
        };
      default:
        console.log("что-то не так");
    }
  }

  function useArtifact(art, hero) {
    let hpMax = document.querySelector(".hero_hp").getAttribute("data-hp");
    let mpMax = document.querySelector(".hero_mp").getAttribute("data-mp");

    function icnMaxHPHero(hpMax, value) {
      hpMax = +hpMax + value;
      (0,_update_stats__WEBPACK_IMPORTED_MODULE_2__["default"])(".hpMax", value);
      document.querySelector(".hero_hp").setAttribute("data-hp", hpMax);
    }

    function incAttackHero(minAttack, maxAttack) {
      hero.attack[0] += minAttack;
      (0,_update_stats__WEBPACK_IMPORTED_MODULE_2__["default"])(".attackMax", minAttack);
      hero.attack[1] += maxAttack;
      (0,_update_stats__WEBPACK_IMPORTED_MODULE_2__["default"])(".attackMin", maxAttack);
    }

    function incSecondaryStatHero(stat, value) {
      hero[stat] += value;
      (0,_update_stats__WEBPACK_IMPORTED_MODULE_2__["default"])(`.${stat}`, value);
    }

    switch (art) {
      case "thunderHammer":
        incAttackHero(5, 5);
        incSecondaryStatHero("magicPower", 5);

        hero.thunderHammer = true;
        alert("вы получили Громовой Молот");
        break;
      case "staffOfHealing":
        incSecondaryStatHero("magicPower", 5);
        icnMaxHPHero(hpMax, 25);
        hero.hp += 25;
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
        hero.regeneration += 20;
        alert("вы получили Посох Исцеления");
        break;
      case "flameBook":
        incSecondaryStatHero("magicPower", 16);
        alert("вы получили Огненную Книгу");
        break;
      case "magicBook":
        incSecondaryStatHero("magicPower", 10);
        incSecondaryStatHero("adapt", 5);

        alert("вы получили Книгу Магии");
        break;
      case "robberyCloak":
        hero.robberyCloak = true;
        incSecondaryStatHero("dodge", 5);
        alert("вы получили Плащ Разбойника");
        break;
      case "handKingHell":
        hero.handKingHell = true;
        alert("вы получили Адские когти");
        break;
      case "swordKingHell":
        incAttackHero(5, 5);
        hero.swordKingHell = true;
        alert("вы получили Меч Короля Ада");
        break;
      case "potion_Hp_Mp":
        hero.potion_Hp_Mp = true;
        alert("вы получили Зелье Регенерации");
        break;
      case "magicShield":
        incSecondaryStatHero("def", 2);
        icnMaxHPHero(hpMax, 20);
        hero.hp += 20;
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
        hero.magicshield = true;
        alert("вы получили Магический Щит");
        break;
      case "frostSword":
        incAttackHero(4, 4);
        hero.frostsword = true;
        alert("вы получили Ледяной меч");
        break;

      case "leatherBracers":
        incSecondaryStatHero("def", 1);
        incSecondaryStatHero("dodge", 1);
        incSecondaryStatHero("adapt", 10);
        alert("вы получили Кожанные Наручи");
        break;

      case "glassesMiner":
        incSecondaryStatHero("def", 1);
        incSecondaryStatHero("luck", 1);
        incSecondaryStatHero("adapt", 10);
        alert("вы получили Очки Пилота");
        break;

      case "sphereOfPower":
        incAttackHero(2, 2);
        incSecondaryStatHero("magicPower", 2);
        !hero.bonusMP ? (hero.bonusMP = 1) : (hero.bonusMP += 1);
        alert("Вы получили Cферу Силы");
        break;

      case "spark":
        icnMaxHPHero(hpMax, 35);
        hero.hp += 35;
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
        hero.mp += 35;
        mpMax = +mpMax + 35;
        document.querySelector(".hero_mp").setAttribute("data-mp", mpMax);
        (0,_calc_mp__WEBPACK_IMPORTED_MODULE_1__["default"])(+document.querySelector(".current_mp").textContent);
        alert("Вы получили Волшебную Исрку");
        break;
      case "dwarfHammer":
        icnMaxHPHero(hpMax, 40);
        hero.hp += 40;
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
        incAttackHero(6, 6);
        incSecondaryStatHero("adapt", -8);
        alert("вы получили Молот Дворфов");
        break;
      case "sphereDM":
        incSecondaryStatHero("adapt", 10);
        hero.sphereDM = true;
        alert("вы получили Сердце Алмазного Гиганта");
        break;
      case "iceDM":
        incSecondaryStatHero("def", 7);
        incSecondaryStatHero("luck", 3);
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
        alert("вы получили Первородный Алмаз");
        break;
      case "staffOmbal":
        incSecondaryStatHero("magicPower", 5);
        hero.staffOmbal = true;
        alert("вы получили Жезл Омбала");
        break;
      case "ringOmbal":
        icnMaxHPHero(hpMax, 110);
        hero.hp += 110;
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
        alert("вы получили Кольцо Жизненной Силы");
        break;
      case "pumpkinMimic":
        icnMaxHPHero(hpMax, -60);
        hero.hp -= 60;
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
        incAttackHero(12, 12);
        incSecondaryStatHero("critPower", 20);
        alert("вы получили Голову Мимика");
        break;
      case "darknessMimic":
        hero.darknessMimic = true;
        alert("вы получили Сферу Мрака");
        break;
      case "fangOrk":
        let buffAttack0 = Math.round(hero.attack[0] * 0.25);
        let buffAttack1 = Math.round(hero.attack[1] * 0.25);

        incAttackHero(buffAttack0, buffAttack1);
        incSecondaryStatHero("critChance", 6);

        alert("вы получили Клык Вождя Орков");

        break;
      case "bloodOrk":
        hero.bloodOrk = true;
        alert("вы получили Кровь Вождя Орков");
        break;
      case "apple":
        hero.hp += 175;
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
        incSecondaryStatHero("luck", 5);
        alert("вы получили Яблочко и скушали его");
        break;
      case "goldBelt":
        icnMaxHPHero(hpMax, 50);
        hero.hp += 50;
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
        incSecondaryStatHero("luck", 4);
        alert("вы получили Золотой Пояс");
        break;
      case "iceAxe":
        incAttackHero(5, 5);
        incSecondaryStatHero("critChance", 3);
        alert("вы получили Топор Варвара");
        break;
      case "gauntletGloves":
        incSecondaryStatHero("def", 2);
        incSecondaryStatHero("adapt", 8);
        alert("вы получили Железные Перчатки");
        break;
      case "goldCrown":
        !hero.goldMod ? (hero.goldMod = 0.2) : (hero.goldMod += 0.2);
        alert("вы получили Золотую Корону");
        break;
      case "redDagger":
        incAttackHero(7, 7);
        hero.redDagger = true;
        alert("вы получили Алый Кинжал");
        break;
      case "gnomeShield":
        incSecondaryStatHero("def", 4);
        hero.block = true;
        alert("вы получили Щит Гномов");
        break;
      case "blackRaven":
        hero.touchOfDeath = true;
        alert("вы получили Ворона Смерти");
        break;
      case "boots":
        incSecondaryStatHero("def", 1);
        incSecondaryStatHero("dodge", 6);
        alert("вы получили Сапожки");
        break;
      case "leatherArmor":
        incSecondaryStatHero("def", 2);
        incSecondaryStatHero("dodge", 4);
        alert("вы получили Кожаный Доспех");
        break;
      case "bronzeAxe":
        incAttackHero(9, 4);
        alert("вы получили Бронзовый Топор");
        break;

      case "fieryHand":
        incSecondaryStatHero("def", 3);
        hero.reflect = true;
        alert("вы получили Огненную Кожу");

        break;
      case "shieldAndSword":
        incSecondaryStatHero("def", 2);
        incAttackHero(5, 5);
        alert("вы получили Щит и Mеч");

        break;
      case "cursedSkull":
        hero.hp -= 80;
        hero.def -= 3;
        incSecondaryStatHero("critPower", 25);
        incSecondaryStatHero("def", -3);
        incAttackHero(10, 10);
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
        alert("вы получили Проклятый Череп");

        break;
      case "amulet":
        incSecondaryStatHero("magicPower", 4);
        icnMaxHPHero(hpMax, 35);
        hero.hp += 35;
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
        hero.regeneration += 10;
        alert("вы получили Амулет Жизни");

        break;
      case "flacon":
        hero.hp = hpMax;
        hero.regeneration += 20;
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
        alert("вы получили Флакон Здоровья");

        break;
      case "fieryFist":
        hero.fieryFist = true;
        incAttackHero(6, 6);
        alert("вы получили Кулак Ярости");

        break;
      case "goldSword":
        incAttackHero(12, 12);
        alert("вы получили Золотой Меч");

        break;
      case "helmet":
        !hero.vampiric ? (hero.vampiric = 10) : (hero.vampiric += 10);
        incSecondaryStatHero("def", 2);
        alert("вы получили Шлем Варвара");

        break;
      case "eyeFirst":
        icnMaxHPHero(hpMax, 75);
        hero.hp += 75;
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
        incSecondaryStatHero("adapt", 15);
        alert("вы получили Левый Глаз Демона");

        break;
      case "eyeSecond":
        incSecondaryStatHero("critChance", 9);
        incSecondaryStatHero("adapt", 15);
        alert("вы получили Правый Глаз Демона");

        break;
      case "spear":
        hero.attack[1] += 7;
        (0,_update_stats__WEBPACK_IMPORTED_MODULE_2__["default"])(".attackMax", 7);
        incSecondaryStatHero("critPower", 20);
        alert("вы получили Копьё Рыцаря");

        break;
      case "ironArmor":
        icnMaxHPHero(hpMax, 30);
        hero.hp += 30;
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
        incSecondaryStatHero("def", 3);
        alert("вы получили Железную Кирасу");
        break;
      case "knightArmor":
        incSecondaryStatHero("def", 4);
        incSecondaryStatHero("luck", 2);
        alert("вы получили Доспех Рыцаря");
        break;
      case "clover":
        incSecondaryStatHero("luck", 8);
        alert("вы получили Клевер");

        break;
      case "dagger":
        incSecondaryStatHero("critChance", 7);
        alert("вы получили Кинжал");

        break;
      case "heart":
        icnMaxHPHero(hpMax, 65);
        hero.hp += 65;
        alert("вы получили Сердце");
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);

        break;
      case "phoenix":
        hero.phoenix = true;
        alert("вы получили Крылья Феника");

        break;
      case "sword":
        incAttackHero(7, 7);
        alert("вы получили Меч");

        break;
      case "mace":
        hero.attack[1] += 13;
        (0,_update_stats__WEBPACK_IMPORTED_MODULE_2__["default"])(".attackMax", 13);
        alert("вы получили Булаву");

        break;
      case "magicBall":
        incSecondaryStatHero("magicPower", 5);
        incSecondaryStatHero("dodge", 5);
        incSecondaryStatHero("adapt", 5);
        alert("вы получили Магический Шар");

        break;
      case "vampiric":
        !hero.vampiric ? (hero.vampiric = 8) : (hero.vampiric += 8);
        alert("вы получили Клыки Вампира");

        break;
    }
  }

  // Окно выбора артефакта
  // function artsGetStyle(art, ImgArt) {
  //   art.append(ImgArt);
  // }

  function chooseArt(firstArtObject, secondArtObject) {
    let artItems = document.querySelectorAll(".art-item");
    const btnArtChoose = document.querySelector(".btn__chooseArt");

    //// тут
    function artsGetStyle(art, artObject) {
      art.setAttribute("art-name", artObject.name);
      art.style.backgroundColor = artObject.rarity;
      getArt(artObject, art);
    }

    artsGetStyle(artItems[0], firstArtObject);
    artsGetStyle(artItems[1], secondArtObject);

    artWindow.style.display = "block";
    document.body.style.overflow = "hidden";
    artItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();

        btnArtChoose.style.display = "block";
        artItems.forEach((art) => {
          art.setAttribute("data-art", 0);
          art.style.border = "2px solid";
          art.style.boxShadow = "none";
        });

        item.setAttribute("data-art", 1);
        item.style.border = "4px solid red";
        item.style.boxShadow = "0 0 20px red";
      });
    });

    btnArtChoose.addEventListener(
      "click",
      (e) => {
        artItems.forEach((item) => {
          if (item.getAttribute("data-art") == 1) {
            let art = item.getAttribute("art-name");
            artContent.appendChild(item.firstChild);
            useArtifact(art, hero);
          } else {
            if (item.style.backgroundColor === "gold") {
              artifactsLegends.push(item.getAttribute("art-name"));
            } else if (item.style.backgroundColor === "blueviolet") {
              null;
            } else {
              artifacts.push(item.getAttribute("art-name"));
            }
            item.firstChild.remove();
          }
        });

        document.body.style.overflow = "";
        artWindow.style.display = "none";
      },
      { once: true }
    );
  }

  // Получение артефакта
  // function getArt(img, title, descr, content = artContent) {
  //   const artElem = document.createElement("div"),
  //     artImg = document.createElement("img"),
  //     artDescr = document.createElement("span"),
  //     artTitle = document.createElement("p");

  //   artElem.classList.add("art__item");
  //   artImg.setAttribute("src", img);
  //   artDescr.classList.add("art__text");

  //   content.append(artElem);
  //   artElem.append(artImg);

  //   artTitle.textContent = title;
  //   artDescr.textContent = descr;
  //   artElem.append(artDescr);
  //   artDescr.prepend(artTitle);
  // }
}

function getArt(artObj, content = artContent) {
  const artElem = document.createElement("div"),
    artImg = document.createElement("img"),
    artDescr = document.createElement("span"),
    artTitle = document.createElement("p");

  artElem.classList.add("art__container");
  artElem.style.backgroundColor = artObj.rarity;
  artImg.setAttribute("src", artObj.src);
  artDescr.classList.add("art__text");

  content.append(artElem);
  artElem.append(artImg);

  artTitle.textContent = artObj.title;
  artDescr.textContent = artObj.descr;
  artElem.append(artDescr);
  artDescr.prepend(artTitle);
}
// name: "eyeSecond",
//           src: "img/artifacts/eye_second.png",
//           rarity: "gold",
//           title: "Левый глаз демона",
//           descr: "Увеличивает максимальное здоровье на 100 и уклонение на 10%",

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getXp);


/***/ }),

/***/ "./src/js/modules/buff.js":
/*!********************************!*\
  !*** ./src/js/modules/buff.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _update_stats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./update_stats */ "./src/js/modules/update_stats.js");
/* harmony import */ var _calc_hp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calc_hp */ "./src/js/modules/calc_hp.js");



const arrBuffs = [
  {
    name: "attack",
    title: "Метка Ястреба",
    descr: "Атака + 14%",
    value: { inc: 14, percent: true, buff: ["attack"], selector: [".attackMin", ".attackMax"] },
  },
  {
    name: "def",
    title: "Метка Черепахи",
    descr: "Защита + 16%",
    value: { inc: 16, percent: true, buff: ["def"], selector: [".def"] },
  },
  {
    name: "maxHp",
    title: "Метка Медведя",
    descr: "Запас Здоровья + 14%",
    value: { inc: 14, percent: true, buff: ["hp"], selector: [".hpMax"] },
  },
  {
    name: "dodge",
    title: "Метка Обезьяны",
    descr: "Уклонение + 16%",
    value: { inc: 16, percent: true, buff: ["dodge"], selector: [".dodge"] },
  },
  {
    name: "сrit",
    title: "Метка Тигра",
    descr: "Шанс крит.удара и Сила крит.удара + 7%",
    value: { inc: 7, percent: true, buff: ["critChance", "critPower"], selector: [".critChance", ".critPower"] },
  },
  {
    name: "adapt",
    title: "Метка Eнота",
    descr: "Адаптация + 16%",
    value: { inc: 16, percent: true, buff: ["adapt"], selector: [".adapt"] },
  },
  {
    name: "luck",
    title: "Метка Лягушки",
    descr: "Удача + 16%",
    value: { inc: 16, percent: true, buff: ["luck"], selector: [".luck"] },
  },
  {
    name: "attack-def",
    title: "Метка Носорога",
    descr: "Атака + 8% <br> Защита + 8%",
    value: { inc: 8, percent: true, buff: ["attack", "def"], selector: [".attackMin", ".attackMax", ".def"] },
  },
  {
    name: "attack-adapt",
    title: "Метка Гиены",
    descr: "Атака + 8% <br> Адаптация + 8%",
    value: { inc: 8, percent: true, buff: ["attack", "adapt"], selector: [".attackMin", ".attackMax", ".adapt"] },
  },
  {
    name: "def-maxHp",
    title: "Метка Льва",
    descr: "Запас Здоровья + 8% <br> Защита + 8%",
    value: { inc: 8, percent: true, buff: ["hp", "def"], selector: [".hpMax", ".def"] },
  },
  {
    name: "dodge-maxHp",
    title: "Метка Волка",
    descr: "Запас Здоровья + 8% <br> Уклонение + 8%",
    value: { inc: 8, percent: true, buff: ["hp", "dodge"], selector: [".hpMax", ".dodge"] },
  },
  {
    name: "luck-maxHp",
    title: "Метка Eжа",
    descr: "Запас Здоровья + 8% <br> Удача + 8%",
    value: { inc: 8, percent: true, buff: ["hp", "luck"], selector: [".hpMax", ".luck"] },
  },
  {
    name: "luck-dodge",
    title: "Метка Дельфина",
    descr: "Уклонение + 9% <br> Удача + 9%",
    value: { inc: 9, percent: true, buff: ["dodge", "luck"], selector: [".dodge", ".luck"] },
  },
  {
    name: "attack-dodge",
    title: "Метка Лисы",
    descr: "Aтака + 8% <br> Уклонение + 8%",
    value: { inc: 8, percent: true, buff: ["attack", "dodge"], selector: [".attackMin", ".attackMax", ".dodge"] },
  },
  {
    name: "def-adapt",
    title: "Метка Зубра",
    descr: `Защита + 9% <br> Адаптация + 9%`,
    value: { inc: 9, percent: true, buff: ["def", "adapt"], selector: [".def", ".adapt"] },
  },
  {
    name: "attack-magicPower",
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
    name: "adapt-magicPower",
    title: "Метка Зубра",
    descr: `Адаптация + 9% <br> Сила Магии + 9%`,
    value: { inc: 9, percent: true, buff: ["adapt", "magicPower"], selector: [".adapt", ".magicPower"] },
  },
  {
    name: "luck-magicPower",
    title: "Метка Зубра",
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
        console.log(hero[item], "hero item");
        const calcBuff = Math.round(hero[item] * (buffObj.value.inc / 100));
        hero[item] += calcBuff;

        if (item == "hp") {
          hpMax = +hpMax + calcBuff;
          document.querySelector(".hero_hp").setAttribute("data-hp", hpMax);
          (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".hero_hp", hero.hp);
        }
      }
    });
    // hero[buffObj.value.buff] += Math.round(hero[buffObj.value.buff] * (buffObj.value.inc / 100));
    let count = 0;
    buffObj.value.selector.forEach((item) => {
      if (item == ".attackMin") {
        (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(`${item}`, hero[buffObj.value.buff[0]][0], true);
      } else if (item == ".attackMax") {
        (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(`${item}`, hero[buffObj.value.buff[count++]][1], true);
      } else if (item == ".hpMax") {
        (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(`${item}`, hpMax, true);
        count++;
      } else {
        (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(`${item}`, hero[buffObj.value.buff[count++]], true);
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
    buffImg.setAttribute("src", "img/icons/buffs/mark_buff.png");
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buff);


/***/ }),

/***/ "./src/js/modules/calc_hp.js":
/*!***********************************!*\
  !*** ./src/js/modules/calc_hp.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

    // console.log(totalHp);
  }

  function setAttrHp(numHp) {
    hpBar.setAttribute("data-current_hp", numHp);
  }

  setAttrHp(numHp);
  calcDescrHP(numHp);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calcHp);


/***/ }),

/***/ "./src/js/modules/calc_mp.js":
/*!***********************************!*\
  !*** ./src/js/modules/calc_mp.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calcMp);


/***/ }),

/***/ "./src/js/modules/enemy.js":
/*!*********************************!*\
  !*** ./src/js/modules/enemy.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _heroes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./heroes */ "./src/js/modules/heroes.js");


let maxLimit = 3;
let minLimit = 1;
let chanceGoldBox = 0;
function searchEnemy(luck) {
  const checkLuck = Math.floor(Math.random() * 100) + 1;
  const modLuck = checkLuck * 1.1 + chanceGoldBox;

  console.log(`${minLimit} - ${maxLimit}`);
  if (modLuck <= luck) {
    console.log(`удача ${checkLuck} ${chanceGoldBox}`);
    chanceGoldBox++;
    return (0,_heroes__WEBPACK_IMPORTED_MODULE_0__["default"])("enemy", 0);
  } else {
    // const enemyNum = Math.floor(Math.random() * (0 - difficulty + 1)) + difficulty;
    const enemyNum = Math.floor(minLimit + Math.random() * (maxLimit + 1 - minLimit));
    if (maxLimit < (0,_heroes__WEBPACK_IMPORTED_MODULE_0__["default"])("count")) {
      // maxLimit += 1;
      maxLimit += 0.75;
    }
    if (minLimit < (0,_heroes__WEBPACK_IMPORTED_MODULE_0__["default"])("count") - 2) {
      // minLimit += 0.5;
      minLimit += 0.7;
    }

    return (0,_heroes__WEBPACK_IMPORTED_MODULE_0__["default"])("enemy", enemyNum);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (searchEnemy);

// createHeroes("count")


/***/ }),

/***/ "./src/js/modules/fight.js":
/*!*********************************!*\
  !*** ./src/js/modules/fight.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _calc_hp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calc_hp */ "./src/js/modules/calc_hp.js");
/* harmony import */ var _calc_mp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calc_mp */ "./src/js/modules/calc_mp.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text */ "./src/js/modules/text.js");
/* harmony import */ var _artifacts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./artifacts */ "./src/js/modules/artifacts.js");
/* harmony import */ var _gold_coin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gold_coin */ "./src/js/modules/gold_coin.js");
/* harmony import */ var _update_stats__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./update_stats */ "./src/js/modules/update_stats.js");
/* harmony import */ var _skills__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./skills */ "./src/js/modules/skills.js");
/* harmony import */ var _buff__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./buff */ "./src/js/modules/buff.js");









let mana = 0;

let berserk = false;
let regenDryad = 5;
let comboMechanic;
let manaRegen = 5;

const textRaidLvl = document.querySelector(".text__raid span");

let enemyCount = 0;

const critPowerMod = (critPower) => Math.round(critPower * 0.85);
const critСhanceMod = (critChance) => Math.round(critChance * 0.85);
const dodgeMod = (dodge) => Math.round(dodge * 0.85);
const defMod = (def) => Math.round(def * 0.85);
const adaptMod = (adapt) => Math.round(adapt * 0.35);

function fight(target, assaulter, btnsHidden, btnReload, btnDisplay) {
  let maxHPHero = +document.querySelector(".hero_hp").getAttribute("data-hp");
  let maxHPEnemy = +document.querySelector(".enemy_hp").getAttribute("data-hp");
  target.maxHPEnemy = maxHPEnemy;
  assaulter.maxHPHero = maxHPHero;
  let maxMP = assaulter.mp;
  comboMechanic = 0;
  let buffAttack = 0;
  let buffDodge = 0;
  let bloodOrkTrigger = false;
  let darknessStep;
  let staffOmbalStep = 0;
  let sphereDMStep = false;

  function battle(target, assaulter) {
    // Вычисление атаки
    function attack(att, def, critChance, critPower, dodge, adapt, absorb = 0) {
      const checkDodge = Math.round(Math.random() * 100) + 1;

      if (checkDodge <= dodgeMod(dodge) - adaptMod(adapt)) {
        return "Промах";
      } else {
        const result = Math.floor(att[0] + Math.random() * (att[1] + 1 - att[0]));
        const сheckCrit = Math.round(Math.random() * 100) + 1;
        if (сheckCrit <= critСhanceMod(critChance) - adaptMod(adapt)) {
          if (Math.round(result * (critPowerMod(critPower) / 100) - defMod(def)) <= 0) {
            return { dmg: 2, crit: ` Критический удар!` };
          } else {
            return {
              dmg: Math.round(result * (critPower / 100) - defMod(def)) * ((100 - absorb) / 100),
              crit: ` Критический удар!`,
            };
          }
        }
        if (result - defMod(def) <= 0) {
          return { dmg: 1, crit: "" };
        } else {
          return { dmg: Math.round((result - defMod(def)) * ((100 - absorb) / 100)), crit: "" };
        }
      }
    }

    let ObjDmg = attack(
      assaulter.attack,
      target.def,
      assaulter.critChance,
      assaulter.critPower,
      target.dodge,
      assaulter.adapt
    );
    let ObjDmgEnemy = attack(
      target.attack,
      assaulter.def,
      target.critChance,
      target.critPower,
      assaulter.dodge + buffDodge,
      target.adapt,
      assaulter.absorbDamage
    );

    // Начало боя

    if (target.hp <= 0) {
      clearInterval(battleSetInterval);
      finishFight();
      return;
    }
    if (ObjDmg === "Промах") {
      (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])("Промах!", "orange");
      comboMechanic = 0;

      assaulter.swordKingHell ? swordKingHell(assaulter, target) : null;
    } else {
      let dmgHeroNum = ObjDmg.dmg;
      dmgHeroNum += redDagger(assaulter.redDagger, target.def);
      dmgHeroNum = CountComboMechanic(assaulter.name, dmgHeroNum) + buffAttack;

      // monk level_2 second
      assaulter.name == "monk" && assaulter.monkTiger && ObjDmg.crit ? monkTiger(assaulter, target) : null;
      // monk level_3 first
      assaulter.name == "monk" && assaulter.monkLotus ? monkLotus(assaulter, target) : null;
      // mechanic level_1 first
      assaulter.name == "mechanic" && assaulter.mechanicMaster
        ? assaulter.mechanicMaster(assaulter, target)
        : null;

      console.log(target.def);

      target.hp -= dmgHeroNum;
      touchOfDeath(assaulter, target);
      staffOmbal(assaulter, maxHPHero, target, staffOmbalStep);
      thunderHammer(assaulter, target);

      ObjDmg.crit && assaulter.handKingHell ? handKingHell(target, maxHPEnemy) : null;

      (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".enemy_hp", target.hp);

      // vampiric
      if (assaulter.vampiric) {
        assaulter.hp += vampiric(assaulter, dmgHeroNum);
        if (assaulter.hp > +maxHPHero) {
          assaulter.hp = +maxHPHero;
        }
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", assaulter.hp);
      }

      // MANA

      if (assaulter.mana < maxMP) {
        assaulter.bonusMP ? (assaulter.mana += manaRegen + assaulter.bonusMP) : (assaulter.mana += manaRegen);
        ObjDmg.crit && assaulter.frostsword ? (assaulter.mana += 2) : null;

        // monk level_1 first
        if (assaulter.name == "monk" && assaulter.monkSnakeStrikes) {
          assaulter.mana += assaulter.monkSnakeStrikes();
        }
        if (assaulter.mana > maxMP) {
          assaulter.mana = maxMP;
        }
        (0,_calc_mp__WEBPACK_IMPORTED_MODULE_1__["default"])(assaulter.mana);
      }

      //

      if (target.hp <= 0) {
        clearInterval(battleSetInterval);
        (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Вы нанесли${ObjDmg.crit} ${dmgHeroNum} урона и убили противника`, "white");
        //
        finishFight();
        return;
      }
      (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Вы нанесли${ObjDmg.crit} ${dmgHeroNum} урона`, "yellow");
    }

    staffOmbalStep++;

    setTimeout(() => {
      // target.hp = checkAttrHP(".enemy_hp");
      if (target.hp <= 0) {
        return;
      }
      if (target.stun) {
        (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])("Враг оглушен", "dodgerblue");
        target.stun = false;
        return;
      }
      if (ObjDmgEnemy === "Промах") {
        (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])("Вы увернулись", "green");

        assaulter.robberyCloak ? robberyCloak(assaulter) : null;
        // monk level_2 first
        assaulter.name == "monk" && assaulter.monkMantis ? monkMantis(assaulter, target) : null;
      } else {
        let dmgEnemyNum = Math.round(ObjDmgEnemy.dmg * target.multiplierDmg);

        if (assaulter.block) {
          dmgEnemyNum = gnomeShield(dmgEnemyNum);
        }

        assaulter.magicshield ? magicShield(assaulter) : null;

        assaulter.potion_Hp_Mp ? potion_Hp_Mp(assaulter, maxHPHero) : null;

        if (assaulter.sphereDM) {
          dmgEnemyNum = sphereDM(assaulter, dmgEnemyNum);
        }

        assaulter.hp -= dmgEnemyNum;
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", assaulter.hp);

        if (assaulter.reflect) {
          target.hp -= fieryHand(dmgEnemyNum);
          (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".enemy_hp", target.hp);
        }

        if (assaulter.bloodOrk && !bloodOrkTrigger) {
          bloodOrk(assaulter, maxHPHero, target);
        }

        if (assaulter.fieryFist) {
          buffAttack += fieryFist(assaulter, maxHPHero);
        }

        if (assaulter.hp <= 0) {
          if (assaulter.phoenix) {
            assaulter.hp = +maxHPHero;
            (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(
              `Противник убивает вас, ненеся${ObjDmgEnemy.crit} ${dmgEnemyNum}... но вы крылья феника возрождают вас`,
              "green"
            );
            assaulter.phoenix = false;
          } else {
            if (target.name === "boss") {
              assaulter.hp = Math.floor(+maxHPHero / 2);
              (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Противник нанес вам${ObjDmgEnemy.crit} ${dmgEnemyNum} урона`, "orange");
              (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Босс побеждает вас, но вам удается сбежать`, "green");
              setTimeout(() => {
                btnsHidden.forEach((btn) => {
                  btn.classList.remove("hidden");
                });
              }, 1000);
            } else {
              (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Противник нанес вам${ObjDmgEnemy.crit} ${dmgEnemyNum} урона и убил вас`, "red");
              btnReload.classList.remove("hidden");
            }
            clearInterval(battleSetInterval);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", assaulter.hp);
            return;
          }
        } else {
          (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Противник нанес вам${ObjDmgEnemy.crit} ${dmgEnemyNum} урона`, "orange");
        }
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", assaulter.hp);
      }
      if (assaulter.darknessMimic) {
        darknessMimic(assaulter, maxHPHero);
      }
    }, 700);
  }

  function finishFight() {
    let heal = healHP(assaulter);
    assaulter.hp += heal;
    //
    (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])("_______________________________КОНЕЦ БОЯ_________________________________", "red");
    setTimeout(() => {
      (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`вы отдыхаете после боя, восстанавливая ${heal} здоровья `, "green");
      (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", assaulter.hp);

      // jester level_1 first
      if (assaulter.name == "jester" && assaulter.jesterShifflDeck) {
        assaulter.mana += assaulter.jesterShifflDeck();
      }
      if (assaulter.mana > maxMP) {
        assaulter.mana = maxMP;
      }
      (0,_calc_mp__WEBPACK_IMPORTED_MODULE_1__["default"])(assaulter.mana);
    }, 900);
    checkNameEnemy(target, assaulter);
    setTimeout(() => {
      btnsHidden.forEach((btn) => {
        btn.classList.remove("hidden");
      });
    }, 1000);
    btnDisplay.classList.add("hidden");
  }

  const battleSetInterval = setInterval(() => battle(target, assaulter), 2000);

  function checkNameEnemy(enemy, hero) {
    if (enemy.name === "trader" && !(hero.traderMeeting == 2)) {
      (0,_artifacts__WEBPACK_IMPORTED_MODULE_3__["default"])(hero, true);
      !hero.traderMeeting ? (hero.traderMeeting = 1) : hero.traderMeeting++;
    } else if (enemy.name === "boss") {
      (0,_artifacts__WEBPACK_IMPORTED_MODULE_3__["default"])(hero, false, true);
      !hero.goldMod ? (hero.goldMod = 0.1) : (hero.goldMod += 0.1);
      textRaidLvl.textContent = +textRaidLvl.textContent + 5;
      hero.boss += 1;
    } else if (enemy.name === "unicorn" && !(hero.unicornMeeting == 2)) {
      setTimeout(() => {
        (0,_buff__WEBPACK_IMPORTED_MODULE_7__["default"])(hero);
        !hero.unicornMeeting ? (hero.unicornMeeting = 1) : hero.unicornMeeting++;
      }, 750);
    } else if (enemy.name === "masterOfMark" && !(hero.masterOfMarkMeeting == 2)) {
      setTimeout(() => {
        (0,_buff__WEBPACK_IMPORTED_MODULE_7__["default"])(hero);
        !hero.masterOfMarkMeeting ? (hero.masterOfMarkMeeting = 1) : hero.masterOfMarkMeeting++;
      }, 750);
    } else if (enemy.name === "goldBox") {
      null;
    } else {
      (0,_artifacts__WEBPACK_IMPORTED_MODULE_3__["default"])(hero);
      // buff(hero);
    }
    (0,_gold_coin__WEBPACK_IMPORTED_MODULE_4__["default"])(enemy.gold, hero.goldMod);
  }

  // Комбо механика
  function CountComboMechanic(name, dmg) {
    if (name === "mechanic") {
      comboMechanic++;

      if (comboMechanic == 4) {
        comboMechanic = 0;
        // addText(`комбо ${Math.floor(dmg * 1.5)} от обычного ${dmg}`, "gold");
        return Math.floor(dmg * 1.5);
      } else {
        return dmg;
      }
    }
    return dmg;
  }

  // monk level_2 first
  function monkMantis(hero, enemy) {
    let dmgMantis = hero.monkMantis(hero.dodge);
    if (dmgMantis > 0) {
      dmgMantis - defMod(enemy.def) <= 0 ? (dmgMantis = 1) : null;
      enemy.hp -= dmgMantis - defMod(enemy.def);
      (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Вы контратакавали врага нанеся ${dmgMantis} урона`, "cyan");
      (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".enemy_hp", enemy.hp);
    }
  }
  // monk level_2 second
  function monkTiger(hero, enemy) {
    setTimeout(() => {
      const dmg = hero.monkTiger(hero.attack);
      if (dmg > 0) {
        enemy.hp -= dmg - defMod(enemy.def);
        (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Вы быстро атакуете еще раз, нанося ${dmg} урона`, "cyan");
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".enemy_hp", enemy.hp);
      }
    }, 250);
  }
  // monk level_3 first
  function monkLotus(hero, enemy) {
    setTimeout(() => {
      const dmg = hero.monkLotus(enemy);
      if (dmg > 0) {
        enemy.hp -= dmg;
        enemy.stun = true;
        (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Вы используете технику лотоса, нанося ${dmg} урона, оглушив его`, "magenta");
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".enemy_hp", enemy.hp);
      }
    }, 150);
  }

  function healHP(hero) {
    console.log(hero.lvl);
    let extraHP = 35;
    if (hero.regeneration) {
      extraHP += hero.regeneration;
    }
    if (hero.name === "dryad") {
      regenDryad += 1;
      extraHP += regenDryad;
      if (hero.hp <= 60) {
        extraHP += extraHP;
      }
    }

    const heal = Math.round(maxHPHero / 6 + extraHP);

    if (hero.hp + heal > maxHPHero) {
      const newHeal = maxHPHero - hero.hp;
      return newHeal;
    } else {
      return heal;
    }
  }

  // Артефакты

  function thunderHammer(hero, enemy) {
    if (hero.thunderHammer) {
      let chance = Math.floor(Math.random() * 100) + 1;
      chance < 9 ? (enemy.stun = true) : null;
    }
  }

  function robberyCloak(hero) {
    hero.critChance += 30;
    (0,_update_stats__WEBPACK_IMPORTED_MODULE_5__["default"])(".critChance", hero.critChance, true);
    setTimeout(() => {
      hero.critChance -= 30;
      (0,_update_stats__WEBPACK_IMPORTED_MODULE_5__["default"])(".critChance", hero.critChance, true);
    }, 2000);
  }

  function handKingHell(enemy, maxHPEnemy) {
    let count = 0;
    let dmg = Math.round(maxHPEnemy / 50);
    (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])("Противник начинает гореть", "aqua");
    setTimeout(() => {
      const dot = setInterval(() => {
        count >= 3 || enemy.hp <= 0 ? clearInterval(dot) : count++;
        enemy.hp -= dmg;
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".enemy_hp", enemy.hp);
      }, 2000);
    }, 150);
  }

  function swordKingHell(hero, enemy) {
    let dmg = Math.round((hero.attack[0] + hero.attack[1]) / 4);
    setTimeout(() => {
      enemy.hp -= dmg;
      (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".enemy_hp", enemy.hp);
      (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Враг получает ${dmg} урона от огненного шлейфа меча`, "yellow");
    }, 100);
  }

  function potion_Hp_Mp(hero, maxHp) {
    let chance = Math.floor(Math.random() * 100) + 1;
    if (chance <= 8) {
      setTimeout(() => {
        hero.hp += Math.round(maxHp / 20);
        hero.mana += 10;
        (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])("Вы делаете глоток из зелья регенерации", "green");
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
        (0,_calc_mp__WEBPACK_IMPORTED_MODULE_1__["default"])(hero.mana);
      }, 200);
    }
  }

  function magicShield(hero) {
    let chance = Math.floor(Math.random() * 100) + 1;
    chance <= 20 ? (hero.mana += 1) : null;
    if (hero.mana > maxMP) {
      hero.mana = maxMP;
    }
    (0,_calc_mp__WEBPACK_IMPORTED_MODULE_1__["default"])(hero.mana);
  }

  function sphereDM(hero, dmg) {
    if (sphereDMStep < 2 && sphereDMStep) {
      sphereDMStep++;
      return 0;
    } else if (sphereDMStep === 2 && sphereDMStep) {
      return dmg;
    } else if (hero.hp - dmg <= 0) {
      // hero.hp += dmg;
      sphereDMStep = 1;
      if (sphereDMStep == 1) {
        (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])("Ваша кожа покрывается алмазной корой...", "blue");
      }
      return dmg + (hero.hp - dmg) - 1;
    }
    return dmg;
  }

  function staffOmbal(hero, maxHPHero, enemy, step) {
    if (hero.staffOmbal) {
      if (step >= 5 && enemy.hp >= 0) {
        setTimeout(() => {
          let dagon = Math.round(maxHPHero / (100 / 20));
          enemy.hp -= dagon;
          (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".enemy_hp", target.hp);
          (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Волшебный жезл высвобождает свою мощь во врага: ${dagon} урона `, "aqua");
          if (enemy.hp <= 0) {
            clearInterval(battleSetInterval);
            finishFight();
          }
        }, 300);
        staffOmbalStep = 0;
      }
    }
  }

  function darknessMimic(hero, maxHPHero) {
    let chance = Math.floor(Math.random() * 100) + 1;
    if (chance <= 5) {
      darknessStep = true;
    }
    if (darknessStep) {
      hero.dodge += 25;
      (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Вас обволакивает фиолетовый туман `, "darkviolet");
      (0,_update_stats__WEBPACK_IMPORTED_MODULE_5__["default"])(".dodge", hero.dodge, true);
      darknessStep = false;
      setTimeout(() => {
        hero.dodge -= 25;
        (0,_update_stats__WEBPACK_IMPORTED_MODULE_5__["default"])(".dodge", hero.dodge, true);
        clearInterval(darknessHeal);
      }, 6000);
      const darknessHeal = setInterval(() => {
        setTimeout(() => {
          hero.hp += Math.round(maxHPHero / (100 / 3));
          (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", assaulter.hp);
        }, 350);
      }, 2000);
    } else {
      // buffDodge = 0;
      // updateStats(".dodge", hero.dodge, true);
    }
  }

  function bloodOrk(hero, maxHPHero, enemy) {
    if (hero.hp < maxHPHero / (100 / 25)) {
      setTimeout(() => {
        let healBlood = Math.round(maxHPHero / (100 / 10));
        hero.hp += healBlood;
        enemy.hp -= healBlood;
        (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])("Кровь орка закипает в вашем теле", "green");
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", assaulter.hp);
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".enemy_hp", target.hp);
      }, 300);
      bloodOrkTrigger = true;
    }
  }

  function redDagger(redDagger, EnemyDef) {
    if (redDagger) {
      let chance = Math.floor(Math.random() * 100) + 1;
      if (chance <= 30) {
        console.log(`Игнор брони${EnemyDef}`);
        return EnemyDef;
      } else {
        return 0;
      }
    }
    return 0;
  }

  function gnomeShield(dmg) {
    let chance = Math.floor(Math.random() * 100) + 1;
    if (chance <= 12) {
      (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])("Вам удается поставить блок щитом...", "dodgerblue");
      return Math.floor(dmg * 0.3);
    } else {
      return dmg;
    }
  }

  function touchOfDeath(hero, enemy) {
    if (hero.touchOfDeath) {
      let chance = Math.floor(Math.random() * 100) + 1;
      if (chance <= 4) {
        let dmgToHero;
        let dmg;
        if (enemy.name === "boss") {
          dmg = Math.floor(maxHPEnemy / 4);
          enemy.hp -= dmg;
        } else {
          dmg = enemy.hp;
          enemy.hp -= dmg;
        }
        dmgToHero = Math.floor((dmg / 100) * 20);
        hero.hp -= dmgToHero;
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);

        (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])("Ворон смерти проклинает вашего врага...", "blueviolet");
      }
    }
  }
  // console.log(Math.floor(Math.random() * 100) + 1);

  function vampiric(hero, dmg) {
    let heal = Math.floor((dmg / (100 / hero.vampiric)) * 0.75);
    // console.log(`Вампиризи = ${heal}`);
    return heal;
  }

  function fieryFist(hero, maxHPHero) {
    if (hero.hp < maxHPHero / (100 / 33)) {
      if (berserk === false) {
        console.log("ЯРОСТЬ");
        berserk = true;
        return 30;
      }
    } else if (berserk === true) {
      berserk = false;
      console.log("ярость пропала");
      return 0;
    }
    return 0;
  }

  function fieryHand(dmg) {
    let reflect = 0;
    let chance = Math.floor(Math.random() * 100) + 1;
    if (chance <= 35) {
      reflect = Math.floor(dmg / 2);
    }
    return reflect;
  }

  // skill.initDescrBtn(assaulter.name);
  if (enemyCount === 0) {
    _skills__WEBPACK_IMPORTED_MODULE_6__["default"].initDescrBtn(assaulter.name);

    const btnSkill = document.querySelector(".btn__skill");
    btnSkill.addEventListener("click", () => {
      [assaulter.mana, target.hp] = _skills__WEBPACK_IMPORTED_MODULE_6__["default"].skills(assaulter, assaulter.mana);
      (0,_calc_mp__WEBPACK_IMPORTED_MODULE_1__["default"])(assaulter.mana);
      (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", assaulter.hp);
      (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".enemy_hp", target.hp);
    });
  }

  _skills__WEBPACK_IMPORTED_MODULE_6__["default"].updateInform(target, maxHPHero);

  function consoleName(name) {
    console.log(name);
  }

  function useSkill() {
    // assaulter.hp + 100 > maxHPHero ? (assaulter.hp = maxHPHero) : (assaulter.hp += 100);
    // assaulter.hp += 100;
    // target.hp = checkAttrHP(".enemy_hp");
    if (target.hp > 0) {
      if (target.hp <= 0) {
        clearInterval(battleSetInterval);
        // finishFight();
      }
      // mana -= 50;
    }

    (0,_calc_mp__WEBPACK_IMPORTED_MODULE_1__["default"])(assaulter.mana);
    console.log(assaulter.hp);
    console.log("хилка");
  }

  function checkAttrHP(barHP) {
    return document.querySelector(barHP).getAttribute("data-current_hp");
  }

  enemyCount++;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fight);


/***/ }),

/***/ "./src/js/modules/gold_coin.js":
/*!*************************************!*\
  !*** ./src/js/modules/gold_coin.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (goldCoin);


/***/ }),

/***/ "./src/js/modules/heroes.js":
/*!**********************************!*\
  !*** ./src/js/modules/heroes.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function createHeroes(part, hero) {
  class Hero {
    constructor(attack, hp, def, critChance, critPower, dodge, luck, adapt, magicPower, mp, name) {
      this.attack = attack;
      this.hp = hp;
      this.def = def;
      this.critChance = critChance;
      this.critPower = critPower;
      this.dodge = dodge;
      this.luck = luck;
      this.name = name;
      this.adapt = adapt;
      this.magicPower = magicPower;
      this.mp = mp;
      this.mana = 0;
      this.regeneration = 0;
      this.absorbDamage;
      this.lvl = 1;
      this.talentsPoint = 0;
    }
  }
  class Enemy {
    constructor(attack, hp, def, critChance, critPower, dodge, adapt, name, srcImg, gold) {
      this.attack = attack;
      this.hp = hp;
      this.def = def;
      this.critChance = critChance;
      this.critPower = critPower;
      this.dodge = dodge;
      this.srcImg = srcImg;
      this.name = name;
      this.gold = gold;
      this.adapt = adapt;
      this.multiplierDmg = 1;
    }
  }
  const heroes = [
    function warrior() {
      // return new Hero([700, 760], 700, 5, 17, 160, 5, 7, 11, 15, 160, "warrior");
      return new Hero([22, 28], 330, 6, 17, 160, 5, 6, 11, 15, 160, "warrior");
    },
    function rogue() {
      return new Hero([29, 36], 250, 2, 21, 175, 17, 9, 15, 14, 170, "rogue");
    },
    function monk() {
      return new Hero([22, 27], 340, 1, 15, 190, 24, 12, 21, 20, 200, "monk");
    },
    function jester() {
      return new Hero([21, 32], 270, 0, 16, 210, 18, 17, 10, 23, 200, "jester");
    },
    function dryad() {
      return new Hero([21, 26], 280, 1, 17, 160, 20, 13, 13, 39, 200, "dryad");
    },
    function mechanic() {
      return new Hero([23, 27], 280, 3, 18, 200, 11, 8, 16, 16, 175, "mechanic");
    },
    function witchmag() {
      return new Hero([26, 33], 260, 2, 18, 185, 14, 9, 17, 31, 180, "witchmag");
    },
  ];

  const enemy = [
    function goldBox() {
      return new Enemy([5, 5], 100, 5, 1, 1, 1, 1, "goldBox", "img/enemy/goldBox.png", 50);
    },
    function wolf() {
      return new Enemy([16, 21], 135, 1, 12, 175, 12, 10, "wolf", "img/enemy/wolf.png", 6);
    },
    function goblin() {
      return new Enemy([16, 23], 170, 2, 18, 150, 17, 12, "goblin", "img/enemy/goblin.png", 7);
    },
    function satyr() {
      return new Enemy([17, 23], 150, 1, 12, 150, 27, 10, "satyr", "img/enemy/satyr.png", 8);
    },
    function werewolf() {
      return new Enemy([16, 25], 200, 1, 25, 175, 15, 12, "werewolf", "img/enemy/werewolf.png", 9);
    },
    function ork() {
      return new Enemy([15, 20], 300, 4, 10, 200, 5, 10, "ork", "img/enemy/ork.png", 10);
    },
    function skeleton() {
      return new Enemy([19, 28], 200, 0, 18, 200, 21, 10, "skeleton", "img/enemy/skeleton.png", 11);
    },
    function gnome() {
      return new Enemy([9, 14], 140, 0, 33, 175, 80, 15, "gnome", "img/enemy/gnome.png", 12);
    },
    function behemoth() {
      return new Enemy([20, 28], 310, 7, 10, 150, 1, 25, "behemoth", "img/enemy/behemoth.png", 13);
    },
    function dragon() {
      return new Enemy([21, 32], 240, 4, 45, 150, 15, 15, "dragon", "img/enemy/dragon.png", 15);
    },
    function guard() {
      return new Enemy([21, 27], 370, 12, 10, 210, 1, 25, "guard", "img/enemy/guard.png", 17);
    },
    function stoneTroll() {
      return new Enemy([24, 30], 350, 9, 20, 175, 15, 25, "stoneTroll", "img/enemy/stoneTroll.png", 19);
    },
    function trader() {
      return new Enemy([12, 15], 160, 1, 1, 150, 5, 1, "trader", "img/enemy/trader.png", 5);
    },
    function greenMonster() {
      return new Enemy([27, 36], 260, 2, 30, 200, 38, 15, "greenMonster", "img/enemy/greenMonster.png", 21);
    },
    function fierySkeleton() {
      return new Enemy([35, 45], 290, 1, 20, 215, 25, 15, "fierySkeleton", "img/enemy/fierySkeleton.png", 23);
    },
    function cannibal() {
      return new Enemy([34, 42], 430, 6, 25, 150, 1, 20, "cannibal", "img/enemy/cannibal.png", 25);
    },
    function kikimora() {
      return new Enemy([40, 48], 320, 2, 24, 175, 35, 15, "kikimora", "img/enemy/kikimora.png", 27);
    },
    function spirit() {
      return new Enemy([40, 47], 270, 0, 27, 150, 67, 15, "spirit", "img/enemy/spirit.png", 29);
    },
    function unicorn() {
      return new Enemy([38, 50], 260, 0, 15, 225, 45, 5, "unicorn", "img/enemy/unicorn.png", 30);
    },
    function damn() {
      return new Enemy([42, 52], 330, 2, 45, 150, 40, 15, "damn", "img/enemy/damn.png", 32);
    },
    function dreamEater() {
      return new Enemy([42, 53], 380, 2, 40, 150, 40, 25, "dreamEater", "img/enemy/dreamEater.png", 34);
    },
    function giantZombie() {
      return new Enemy([47, 54], 480, 10, 33, 175, 1, 15, "giantZombie", "img/enemy/giantZombie.png", 35);
    },
    function cyclops() {
      return new Enemy([48, 58], 500, 7, 25, 175, 5, 3, "cyclops", "img/enemy/cyclops.png", 37);
    },
    function goldDragon() {
      return new Enemy([50, 58], 480, 22, 20, 190, 10, 35, "goldDragon", "img/enemy/goldDragon.png", 110);
    },
    function SeaZombie() {
      return new Enemy([62, 70], 380, 4, 25, 215, 30, 20, "SeaZombie", "img/enemy/SeaZombie.png", 40);
    },
    function viking() {
      return new Enemy([50, 58], 550, 12, 33, 150, 20, 25, "viking", "img/enemy/viking.png", 42);
    },
    function imps() {
      return new Enemy([48, 61], 450, 3, 45, 175, 55, 20, "imps", "img/enemy/imps.png", 45);
    },
    function titan() {
      return new Enemy([54, 68], 670, 16, 20, 215, 1, 30, "titan", "img/enemy/titan.png", 47);
    },
    function masterOfMark() {
      return new Enemy([57, 65], 530, 5, 25, 200, 35, 40, "masterOfMark", "img/enemy/masterOfMark.png", 50);
    },
    function diablo() {
      return new Enemy([60, 69], 700, 20, 15, 200, 20, 35, "diablo", "img/enemy/diablo.png", 53);
    },
    function blackDragon() {
      return new Enemy([67, 78], 590, 8, 35, 150, 40, 30, "blackDragon", "img/enemy/blackDragon.png", 56);
    },
    function stoneGiant() {
      return new Enemy([56, 62], 850, 32, 10, 200, 1, 40, "stoneGiant", "img/enemy/stoneGiant.png", 59);
    },
    function evilMonster() {
      return new Enemy([77, 87], 900, 15, 25, 200, 9, 25, "evilMonster", "img/enemy/evilMonster.png", 63);
    },
    function ghostKnight() {
      return new Enemy([82, 92], 880, 24, 35, 150, 18, 30, "evilMonster", "img/enemy/ghostKnight.png", 67);
    },
    function AncientButcher() {
      return new Enemy([77, 87], 1050, 13, 20, 235, 8, 35, "AncientButcher", "img/enemy/AncientButcher.png", 72);
    },
    function ermungand() {
      return new Enemy([79, 91], 1150, 22, 33, 175, 20, 40, "ermungand", "img/enemy/ermungand.png", 77);
    },
    function devourer() {
      return new Enemy([86, 96], 1400, 13, 20, 200, 5, 40, "devourer", "img/enemy/devourer.png", 83);
    },
    function demon() {
      return new Enemy([91, 100], 1400, 12, 10, 150, 10, 45, "demon", "img/enemy/demon.png", 88);
    },
    function devil() {
      return new Enemy([100, 115], 1400, 8, 35, 215, 35, 50, "devil", "img/enemy/devil.png", 94);
    },
    function angelFighter() {
      return new Enemy([95, 115], 1555, 15, 55, 155, 55, 55, "angelFighter", "img/enemy/angelFighter.png", 100);
    },
    function death() {
      return new Enemy([180, 190], 2077, 12, 70, 300, 45, 99, "death", "img/enemy/death.png", 120);
    },
  ];

  const boss = [
    function bossOrk() {
      return new Enemy([44, 49], 500, 10, 20, 175, 20, 25, "boss", "img/enemy/bossOrk.png", 50);
    },
    function mimic() {
      return new Enemy([60, 70], 590, 3, 25, 225, 40, 30, "boss", "img/enemy/boss/mimic.png", 75);
    },
    function ombal() {
      return new Enemy([71, 83], 1500, 10, 20, 200, 5, 45, "boss", "img/enemy/boss/ombal.png", 100);
    },
    function diamondMan() {
      return new Enemy([77, 87], 1750, 46, 10, 225, 5, 60, "boss", "img/enemy/boss/diamondMan.png", 125);
    },
    function kingHell() {
      return new Enemy([140, 150], 2100, 34, 35, 250, 20, 65, "boss", "img/enemy/boss/kingHell.png", 150);
    },
    function fireMinotaur() {
      return new Enemy([200, 220], 3200, 25, 40, 275, 10, 75, "boss", "img/enemy/boss/fireMinotaur.png", 500);
    },
  ];

  const countEnemy = enemy.length - 1;

  if (part === "count") {
    return calcEnemy();
  }
  function calcEnemy() {
    return +countEnemy;
  }

  if (part === "hero") {
    const res = heroes[hero];
    return res();
  }
  if (part === "enemy") {
    const res = enemy[hero];
    return res();
  }
  if (part === "boss") {
    if (hero >= boss.length) {
      const death = enemy[enemy.length - 1];
      return death();
    }
    const res = boss[hero];
    return res();
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createHeroes);


/***/ }),

/***/ "./src/js/modules/shop.js":
/*!********************************!*\
  !*** ./src/js/modules/shop.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "updateHero": () => (/* binding */ updateHero)
/* harmony export */ });
/* harmony import */ var _update_stats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./update_stats */ "./src/js/modules/update_stats.js");
/* harmony import */ var _calc_hp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calc_hp */ "./src/js/modules/calc_hp.js");



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
        (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(cardParametr, value);
      }
      if (parameter === "hpMax") {
        console.log(maxHpHero);
        maxHpHero += +value;
        document.querySelector(".hero_hp").setAttribute("data-hp", maxHpHero);
        objHero.hp += value;
      } else if (parameter === "attack") {
        objHero.attack[0] += value;
        objHero.attack[1] += value;
        (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMin", value);
        (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMax", value);
      } else if (parameter === "hp") {
        console.log("hp");
        objHero[parameter] += Math.round(maxHpHero / 4);
      } else {
        objHero[parameter] += value;
      }
      console.log(price.textContent);
      updateHero(objHero, maxHpHero);
      (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".hero_hp", objHero.hp);

      goldHero -= price.textContent;

      price.textContent = +price.textContent + 6;
      document.querySelector(".bar__coin span").textContent = goldHero;
    } else {
      alert("Не хватает золота");
    }
  });
}
//   console.log(goldHero);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shop);



/***/ }),

/***/ "./src/js/modules/skills.js":
/*!**********************************!*\
  !*** ./src/js/modules/skills.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initDescrBtn": () => (/* binding */ initDescrBtn),
/* harmony export */   "manaCost": () => (/* binding */ manaCost)
/* harmony export */ });
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text */ "./src/js/modules/text.js");
/* harmony import */ var _update_stats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./update_stats */ "./src/js/modules/update_stats.js");
/* harmony import */ var _calc_hp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calc_hp */ "./src/js/modules/calc_hp.js");
/* harmony import */ var _talents_talentsHeroes_warrior__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./talents/talentsHeroes/warrior */ "./src/js/modules/talents/talentsHeroes/warrior.js");
/* harmony import */ var _talents_talentsHeroes_rogue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./talents/talentsHeroes/rogue */ "./src/js/modules/talents/talentsHeroes/rogue.js");
/* harmony import */ var _talents_talentsHeroes_jester__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./talents/talentsHeroes/jester */ "./src/js/modules/talents/talentsHeroes/jester.js");
/* harmony import */ var _talents_talentsHeroes_dryad__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./talents/talentsHeroes/dryad */ "./src/js/modules/talents/talentsHeroes/dryad.js");
/* harmony import */ var _talents_talentsHeroes_mechanic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./talents/talentsHeroes/mechanic */ "./src/js/modules/talents/talentsHeroes/mechanic.js");
/* harmony import */ var _talents_talentsHeroes_witchmage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./talents/talentsHeroes/witchmage */ "./src/js/modules/talents/talentsHeroes/witchmage.js");










// Воин
// урон + защита

// Разбойник
// 2-ой удар - игнор брони

// Монах
// + уклон и криты

// Шут
//

// Друид
// исцеление

// Механик
// + статы

const skill = {
  manaCost: {
    // warrior: 5,
    warrior: 80,
    rogue: 80,
    // rogue: 10,
    monk: 45,
    jester: 60,
    // jester: 5,
    dryad: 90,
    // dryad: 40,
    mechanic: 75,
    witchmag: 70,
  },

  enemy: {},
  maxHPHero: 0,
  monkGates: 0,

  skills: function (hero, mana) {
    // target.hp = +document.querySelector(".enemy_hp").getAttribute("data-current_hp");
    switch (hero.name) {
      case "warrior":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.warrior) {
          let buffmagicPower = hero.magicPower * 0.012 + 1;
          // level_1 first
          let dmg = Math.round(45 + hero.def * 2.75 * buffmagicPower * _talents_talentsHeroes_warrior__WEBPACK_IMPORTED_MODULE_3__["default"].levels.level_1.first.init());
          // level_2 first
          _talents_talentsHeroes_warrior__WEBPACK_IMPORTED_MODULE_3__["default"].levels.level_2.first.init(this.enemy);

          this.enemy.hp -= dmg;
          (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Вы наносите удар щитом: ${dmg} урона, и ставите блок`, "cyan");

          if (this.enemy.hp > 0) {
            let buffdef = Math.round(hero.def * 0.8 * buffmagicPower) + 8;
            hero.def += buffdef;

            // level_2 second
            hero.absorbDamage = _talents_talentsHeroes_warrior__WEBPACK_IMPORTED_MODULE_3__["default"].levels.level_2.second.init();

            // level_3 first
            _talents_talentsHeroes_warrior__WEBPACK_IMPORTED_MODULE_3__["default"].levels.level_3.first.init(hero, this.maxHPHero);

            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".def", hero.def, true);
            setTimeout(() => {
              hero.def -= buffdef;
              (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".def", hero.def, true);

              hero.absorbDamage = 0;
            }, 8000);
          }
          mana -= this.manaCost.warrior;
          // mana = 0;
          // this.mana = 0;
        }
        return [mana, this.enemy.hp];

      case "rogue":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.rogue) {
          let buffmagicPower = hero.magicPower * 0.01 + 1;
          let dmg = Math.round(30 + (hero.attack[0] + hero.attack[1]) * 0.6 * buffmagicPower);
          // level_2 second

          dmg += _talents_talentsHeroes_rogue__WEBPACK_IMPORTED_MODULE_4__["default"].levels.level_2.second.init(this.enemy);
          console.log(dmg);

          this.enemy.hp -= dmg;
          const enemyDef = this.enemy.def;
          const enemyName = this.enemy.name;
          // level_2 first
          this.enemy.def -= Math.round(this.enemy.def / _talents_talentsHeroes_rogue__WEBPACK_IMPORTED_MODULE_4__["default"].levels.level_2.first.init());
          (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Вы совершаете быстрый, двойной удар: ${dmg} урона`, "cyan");

          // level_3 first
          _talents_talentsHeroes_rogue__WEBPACK_IMPORTED_MODULE_4__["default"].levels.level_3.first.init(hero, dmg, this.maxHPHero);
          // level_3 second
          _talents_talentsHeroes_rogue__WEBPACK_IMPORTED_MODULE_4__["default"].levels.level_3.second.init(hero);

          setTimeout(() => {
            if (enemyName == this.enemy.name) {
              this.enemy.def = enemyDef;
            }
          }, 6000);
          mana -= this.manaCost.rogue;
        }
        return [mana, this.enemy.hp];

      case "monk":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.monk) {
          let buffmagicPower = hero.magicPower * 0.011 + 1;
          const initBuffStats = Math.round(11 * buffmagicPower);
          const buffOfGate = Math.round(this.monkGates * 1.75);
          const finishBuff = initBuffStats + buffOfGate;

          hero.dodge += finishBuff;
          hero.critChance += finishBuff;
          hero.adapt += finishBuff;
          this.monkGates++;
          console.log(this.monkGates, "gate");
          switch (this.monkGates) {
            case 1:
              (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`1: Врата Начала открыты... +${finishBuff} к характеристикам `, "cyan");
              break;
            case 2:
              (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`2 :Врата Жизни открыты... +${finishBuff} к характеристикам`, "cyan");
              break;
            case 3:
              (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`3: Врата Боли открыты... +${finishBuff} к характеристикам`, "cyan");
              break;
            case 4:
              (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`4: Врата Предела открыты... +${finishBuff} к характеристикам`, "cyan");
              break;
            case 5:
              (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`5: Врата Прозрения открыты... +${finishBuff} к характеристикам`, "cyan");
              break;
            case 6:
              (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`6: Врата Чуда открыты... +${finishBuff} к характеристикам`, "cyan");
              break;
            case 7:
              (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`7: Врата Смерти открыты... +${finishBuff} к характеристикам`, "cyan");
              break;
            default:
              break;
          }
          (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".dodge", hero.dodge, true);
          (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".critChance", hero.critChance, true);
          (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".adapt", hero.adapt, true);

          setTimeout(() => {
            hero.dodge -= finishBuff;
            hero.critChance -= finishBuff;
            hero.adapt -= finishBuff;
            this.monkGates--;
            console.log(this.monkGates, "gate");
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".dodge", hero.dodge, true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".critChance", hero.critChance, true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".adapt", hero.adapt, true);
          }, 12000);

          mana -= this.manaCost.monk;
        }
        return [mana, this.enemy.hp];

      case "jester":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.jester) {
          let buffmagicPower = hero.magicPower * 0.012 + 1;
          let bonusChance = hero.luck * 0.2;
          let chance = Math.random() * 100 + 1 + bonusChance;
          if (chance <= 33) {
            let bonus = hero.luck * 1.25;
            let heal = 35 + Math.round((this.maxHPHero / 12 + bonus) * buffmagicPower);
            hero.hp + heal > this.maxHPHero ? (hero.hp = this.maxHPHero) : (hero.hp += heal);
            (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`карта:Валет, вы исцеляетесь на ${heal}`, "cyan");
          } else if (chance > 33 && chance <= 58) {
            let bonus = hero.luck * 1.35;
            let dmg = 35 + Math.round((this.enemy.hp / 11 + bonus) * buffmagicPower);
            this.enemy.hp -= dmg;
            (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`карта:Дама, вы наносите врагу ${dmg} урона`, "cyan");
          } else if (chance > 58 && chance <= 77) {
            const duration = Math.round(5000 * buffmagicPower);

            hero.dodge += 100;
            (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`карта:Король, уклонение повышено на 100% на ${(duration / 1000).toFixed()} секунд`, "cyan");
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".dodge", hero.dodge, true);
            setTimeout(() => {
              hero.dodge -= 100;
              (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".dodge", hero.dodge, true);
            }, duration);
          } else if (chance > 77 && chance <= 95) {
            let bonus = hero.luck * 1.45;
            let dmgHeal = 35 + Math.round((this.enemy.hp / 16 + bonus) * buffmagicPower);
            hero.hp + dmgHeal > this.maxHPHero ? (hero.hp = this.maxHPHero) : (hero.hp += dmgHeal);
            this.enemy.hp -= dmgHeal;
            (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Карта:Туз, вы наносите врагу ${dmgHeal} урона и исцеляетесь`, "cyan");
          } else if (chance > 95) {
            let bonus = hero.luck * 1.6;
            let dmg = 35 + Math.round((this.maxHPHero / 13 + bonus) * buffmagicPower);
            this.enemy.hp -= dmg;
            if (this.enemy.hp <= 0) {
              let heal = 35 + Math.round(this.maxHPHero / 13 + bonus);
              hero.hp + heal > this.maxHPHero ? (hero.hp = this.maxHPHero) : (hero.hp += heal);
              mana += 50;
            }
            (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Карта:Джокер, наносит ${dmg} урона, если враг убит исцеляетесь и получаете 50 маны`, "cyan");
          }
          // level_3 first
          _talents_talentsHeroes_jester__WEBPACK_IMPORTED_MODULE_5__["default"].levels.level_3.first.init(this.enemy);
          // level_3 second
          _talents_talentsHeroes_jester__WEBPACK_IMPORTED_MODULE_5__["default"].levels.level_3.second.init(hero);

          mana -= this.manaCost.jester;
        }
        return [mana, this.enemy.hp];

      case "dryad":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.dryad) {
          let heal;
          let buffmagicPower = hero.magicPower * 0.022 + 1;
          if (hero.hp <= this.maxHPHero / 5) {
            heal = 70 + Math.round((this.maxHPHero / 13) * buffmagicPower);
          } else {
            heal = 45 + Math.round((this.maxHPHero / 14) * buffmagicPower);
          }
          hero.hp + heal > this.maxHPHero ? (hero.hp = this.maxHPHero) : (hero.hp += heal);
          let dmg = Math.round(heal / 2);
          // level_2 second
          dmg = Math.round(dmg * _talents_talentsHeroes_dryad__WEBPACK_IMPORTED_MODULE_6__["default"].levels.level_2.second.init());

          this.enemy.hp -= dmg;
          (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Вы исцеляете себя на ${heal}, а враг получает ${dmg} урона`, "cyan");

          // level_1 first
          _talents_talentsHeroes_dryad__WEBPACK_IMPORTED_MODULE_6__["default"].levels.level_1.first.init(hero, this.maxHPHero);
          // level_3 first
          _talents_talentsHeroes_dryad__WEBPACK_IMPORTED_MODULE_6__["default"].levels.level_3.first.init(this.enemy);

          mana -= this.manaCost.dryad;
        }
        return [mana, this.enemy.hp];

      case "mechanic":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.mechanic) {
          let buffmagicPower = hero.magicPower * 0.011 + 1;
          const buffAttack = Math.round(buffmagicPower * 21);
          const buffMinAttack = Math.round(hero.attack[0] * (buffAttack / 100));
          const buffMaxAttack = Math.round(hero.attack[1] * (buffAttack / 100));
          const buffDefTalent = _talents_talentsHeroes_mechanic__WEBPACK_IMPORTED_MODULE_7__["default"].levels.level_3.second.init();
          const buffDef = Math.round((hero.def * 0.2 + 5 + buffDefTalent) * buffmagicPower);
          const buffAdapt = 30 + _talents_talentsHeroes_mechanic__WEBPACK_IMPORTED_MODULE_7__["default"].levels.level_2.first.init();
          const duration = Math.round(8000 + _talents_talentsHeroes_mechanic__WEBPACK_IMPORTED_MODULE_7__["default"].levels.level_2.second.init());
          hero.def += buffDef;
          hero.adapt += buffAdapt;
          hero.attack[0] += buffMinAttack;
          hero.attack[1] += buffMaxAttack;
          (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(
            `Режим турбо: атака + ${buffAttack}%, защита + ${buffDef}, адаптивность + ${buffAdapt}% (${(
              duration / 1000
            ).toFixed()} секунд)`,
            "cyan"
          );
          (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".def", hero.def, true);
          (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".adapt", hero.adapt, true);
          (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".attackMin", hero.attack[0], true);
          (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".attackMax", hero.attack[1], true);
          setTimeout(() => {
            hero.def -= buffDef;
            hero.adapt -= buffAdapt;
            hero.attack[0] -= buffMinAttack;
            hero.attack[1] -= buffMaxAttack;
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".def", hero.def, true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".adapt", hero.adapt, true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".attackMin", hero.attack[0], true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".attackMax", hero.attack[1], true);
          }, duration);
          mana -= this.manaCost.mechanic;
        }
        return [mana, this.enemy.hp];

      case "witchmag":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.witchmag) {
          let buffmagicPower = hero.magicPower * 0.02 + 1;

          // level_1 first
          const factorDmg = _talents_talentsHeroes_witchmage__WEBPACK_IMPORTED_MODULE_8__["default"].levels.level_1.first.init();
          let dmg = 16 + Math.round((this.enemy.maxHPEnemy / 55) * buffmagicPower * factorDmg);

          // level_2 second
          const duration = _talents_talentsHeroes_witchmage__WEBPACK_IMPORTED_MODULE_8__["default"].levels.level_2.second.init();
          let count = 0;
          (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Вы накладываете проклятие на противника`, "cyan");

          setTimeout(() => {
            // level_3 first
            hero.witchmagEnchBlade ? hero.witchmagEnchBlade(true) : null;

            const dot = setInterval(() => {
              if (count >= duration || this.enemy.hp <= 0 || hero.hp < 0) {
                clearInterval(dot);

                hero.witchmagEnchBlade ? hero.witchmagEnchBlade(false) : null;
              } else {
                this.enemy.hp -= dmg;
                hero.hp += dmg;
                count++;

                // level_2 first
                _talents_talentsHeroes_witchmage__WEBPACK_IMPORTED_MODULE_8__["default"].levels.level_2.first.init(hero);
                // count >= 3 || this.enemy.hp <= 0 ? clearInterval(dot) : count++;
                (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`проклятие высасывает у врага ${dmg} жизненной силы,`, "cyan");
                count >= duration ? _talents_talentsHeroes_witchmage__WEBPACK_IMPORTED_MODULE_8__["default"].levels.level_3.second.init(this.enemy) : null;
                (0,_calc_hp__WEBPACK_IMPORTED_MODULE_2__["default"])(".enemy_hp", this.enemy.hp);
                (0,_calc_hp__WEBPACK_IMPORTED_MODULE_2__["default"])(".hero_hp", hero.hp);
              }
            }, 2000);
          }, 150);

          mana -= this.manaCost.witchmag;
        }
        return [mana, this.enemy.hp];
    }
  },

  initDescrBtn: function (name) {
    const skillBlock = document.querySelector(".hero__parametrs .skill__block"),
      skillTitle = skillBlock.querySelector(".skill__block_title").textContent,
      skillDescr = skillBlock.querySelector("span").textContent,
      SkillBtn = document.querySelector(".text__skill .btn__descr");

    SkillBtn.querySelector("span").textContent = skillTitle;
    SkillBtn.querySelector("p").textContent = skillDescr;
    SkillBtn.querySelector("small").textContent = this.manaCost[name];
  },

  updateInform: function (enemy, maxHPHero) {
    (this.enemy = enemy), (this.maxHPHero = maxHPHero);
  },
};

// export default skills;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (skill);

const { manaCost, initDescrBtn } = skill;


/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const sliderHero = (slides, prev, next) => {
  const slidesElem = document.querySelectorAll(slides),
    arrowPrev = document.querySelector(prev),
    arrowNext = document.querySelector(next);

  let slideIndex = 0;
  const allSlider = slidesElem.length;

  goSlide(slideIndex);

  function plusSlide(n) {
    goSlide((slideIndex += n));
  }

  function goSlide(n) {
    arrowPrev.style.display = "block";
    arrowNext.style.display = "block";
    if (n > allSlider - 5) {
      arrowNext.style.display = "none";
    }
    if (n <= 0) {
      arrowPrev.style.display = "none";
    }
  }

  arrowNext.addEventListener("click", () => {
    slidesElem[slideIndex].classList.add("hidden");
    slidesElem[slideIndex + 4].classList.remove("hidden");
    plusSlide(1);
  });

  arrowPrev.addEventListener("click", () => {
    plusSlide(-1);
    slidesElem[slideIndex].classList.remove("hidden");
    slidesElem[slideIndex + 4].classList.add("hidden");
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliderHero);


/***/ }),

/***/ "./src/js/modules/talents/accordion.js":
/*!*********************************************!*\
  !*** ./src/js/modules/talents/accordion.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function accordion(
  headActive = "talents__accordion-head--active",
  contentActive = "talents__accordion-content--active",
  paddings = 280
) {
  const container = document.querySelector(".talents__container");
  const head = document.querySelector(".talents__accordion-head");
  head.addEventListener("click", () => {
    head.classList.toggle(headActive);
    head.previousElementSibling.classList.toggle(contentActive);

    if (head.classList.contains(headActive)) {
      head.previousElementSibling.style.maxWidth = paddings + "px";
      //   container.style.backgroundColor = "black";
    } else {
      head.previousElementSibling.style.maxWidth = "0px";
      //   container.style.backgroundColor = "";
    }
  });
}

accordion();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (accordion);


/***/ }),

/***/ "./src/js/modules/talents/core-talents.js":
/*!************************************************!*\
  !*** ./src/js/modules/talents/core-talents.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _talentsHeroes_rogue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./talentsHeroes/rogue */ "./src/js/modules/talents/talentsHeroes/rogue.js");
/* harmony import */ var _talentsHeroes_warrior__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./talentsHeroes/warrior */ "./src/js/modules/talents/talentsHeroes/warrior.js");
/* harmony import */ var _talentsHeroes_monk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./talentsHeroes/monk */ "./src/js/modules/talents/talentsHeroes/monk.js");
/* harmony import */ var _talentsHeroes_jester__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./talentsHeroes/jester */ "./src/js/modules/talents/talentsHeroes/jester.js");
/* harmony import */ var _talentsHeroes_dryad__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./talentsHeroes/dryad */ "./src/js/modules/talents/talentsHeroes/dryad.js");
/* harmony import */ var _talentsHeroes_mechanic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./talentsHeroes/mechanic */ "./src/js/modules/talents/talentsHeroes/mechanic.js");
/* harmony import */ var _talentsHeroes_witchmage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./talentsHeroes/witchmage */ "./src/js/modules/talents/talentsHeroes/witchmage.js");








const coreTalents = {
  hero: {},

  setDescr: function (objTalent) {
    const level_1_First = document.querySelector(".talents-item.level-1.first"),
      level_2_First = document.querySelector(".talents-item.level-2.first"),
      level_2_Second = document.querySelector(".talents-item.level-2.second"),
      level_3_First = document.querySelector(".talents-item.level-3.first"),
      level_3_Second = document.querySelector(".talents-item.level-3.second");

    const descr_1_1 = level_1_First.querySelectorAll(".descr .text"),
      descr_2_1 = level_2_First.querySelectorAll(".descr .text"),
      descr_2_2 = level_2_Second.querySelectorAll(".descr .text"),
      descr_3_1 = level_3_First.querySelectorAll(".descr .text"),
      descr_3_2 = level_3_Second.querySelectorAll(".descr .text");

    const descrArrs = [descr_1_1, descr_2_1, descr_2_2, descr_3_1, descr_3_2];

    level_1_First.style.backgroundImage = objTalent.level_1.first.img;
    level_2_First.style.backgroundImage = objTalent.level_2.first.img;
    level_2_Second.style.backgroundImage = objTalent.level_2.second.img;
    level_3_First.style.backgroundImage = objTalent.level_3.first.img;
    level_3_Second.style.backgroundImage = objTalent.level_3.second.img;

    level_1_First.querySelector(".talents__title").textContent = objTalent.level_1.first.title;
    level_2_First.querySelector(".talents__title").textContent = objTalent.level_2.first.title;
    level_2_Second.querySelector(".talents__title").textContent = objTalent.level_2.second.title;
    level_3_First.querySelector(".talents__title").textContent = objTalent.level_3.first.title;
    level_3_Second.querySelector(".talents__title").textContent = objTalent.level_3.second.title;

    descrArrs.forEach((arr) => {
      let count = 0;

      arr.forEach((descr) => {
        const talantLevel = descr.getAttribute("data-talent-level");
        const talantNum = descr.getAttribute("data-talent");
        descr.textContent = objTalent[talantLevel][talantNum].descr[count++];
      });
    });

    this.setEvent([level_1_First, level_2_First, level_2_Second, level_3_First, level_3_Second]);
  },

  setEvent: function (items) {
    // const totalTalents = document.querySelector(".talents__value span");

    items.forEach((item) => {
      let count = 0;

      item.addEventListener("click", (e) => {
        if (this.hero.talentsPoint <= 0) {
          alert("Недостаточно очков");
        } else {
          const current = +item.querySelector("span").textContent.slice(0, 1);
          const total = +item.querySelector("span").textContent.slice(2, 3);

          if (current < total) {
            item.setAttribute("data-point", count + 1);

            // console.log(item);
            this.learnTalent(item);

            this.hero.talentsPoint -= 1;
            this.incTalent(this.hero.talentsPoint);

            item.querySelector("span").textContent = current + 1 + "/" + total;

            e.target.querySelectorAll(".descr .text").forEach((item) => {
              item.classList.remove("active");
            });
            e.target.querySelectorAll(".descr .text")[count++].classList.add("active");

            if (
              +item.querySelector("span").textContent.slice(0, 1) ==
              +item.querySelector("span").textContent.slice(2, 3)
            ) {
              const level = item.getAttribute("level-unlock");
              const branch = item.getAttribute("branch");

              document.querySelectorAll(`.${level}`).forEach((item) => {
                if (level == "level-2") {
                  item.removeAttribute("disabled");
                } else {
                  if (item.classList.contains(`${branch}`)) {
                    item.removeAttribute("disabled");
                  }
                }
                //
              });

              // items.map(item, () => {
              //   if (item.classList.contains(`${level}`)) {
              //     console.log(item);
              //   }
              // });
            }
          } else {
            alert("Максимальный уровень таланта");
          }
        }
      });
    });
  },

  learnTalent: function (item) {
    switch (this.hero.name) {
      case "warrior":
        _talentsHeroes_warrior__WEBPACK_IMPORTED_MODULE_1__["default"].init(item, this.hero);
        break;
      case "rogue":
        _talentsHeroes_rogue__WEBPACK_IMPORTED_MODULE_0__["default"].init(item, this.hero);
        break;
      case "monk":
        _talentsHeroes_monk__WEBPACK_IMPORTED_MODULE_2__["default"].init(item, this.hero);
        break;
      case "jester":
        _talentsHeroes_jester__WEBPACK_IMPORTED_MODULE_3__["default"].init(item, this.hero);
        break;
      case "dryad":
        _talentsHeroes_dryad__WEBPACK_IMPORTED_MODULE_4__["default"].init(item, this.hero);
        break;
      case "mechanic":
        _talentsHeroes_mechanic__WEBPACK_IMPORTED_MODULE_5__["default"].init(item, this.hero);
        break;
      case "witchmag":
        _talentsHeroes_witchmage__WEBPACK_IMPORTED_MODULE_6__["default"].init(item, this.hero);
        break;
    }
  },

  incTalent: function (points) {
    const talentsTitle = document.querySelector(".talents__value span");
    talentsTitle.textContent = points;
  },

  init: function (hero) {
    this.hero = hero;
    switch (hero.name) {
      case "warrior":
        this.setDescr({
          level_1: {
            first: {
              title: "Адский крик",
              descr: [
                "1: Увеличивает урон от Боевого крика на 15%",
                "2: Увеличивает урон от Боевого крика на 20%",
                "3: Увеличивает урон от Боевого крика на 25%",
              ],
              img: "url(../../img/icons/talents/warrior/talent_warrior_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Оглушающий рев",
              descr: ["Боевой Крик оглушает противника на 1 ход и навсегда снижает его уклонение на 15%"],
              img: "url(../../img/icons/talents/warrior/talent_warrior_2_1.png)",
            },
            second: {
              title: "Защитная стойка",
              descr: ["Блок после Боевого Крика дополнительно уменьшает получаемый урон на 25%"],
              img: "url(../../img/icons/talents/warrior/talent_warrior_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Ни шагу назад",
              descr: [
                "1: Боевой Крик восстанавливает 10% от макс.запаса здоровья ",
                "2: Боевой Крик восстанавливает 12.5% от макс.запаса здоровья ",
                "3: Боевой Крик восстанавливает 15% от макс.запаса здоровья ",
              ],
              img: "url(../../img/icons/talents/warrior/talent_warrior_3_1.png)",
            },
            second: {
              title: "Укрепленный доспех",
              descr: ["1: Увеличивает защиту на 3", "2: Увеличивает защиту на 6", "3: Увеличивает защиту на 9"],
              img: "url(../../img/icons/talents/warrior/talent_warrior_3_2.png)",
            },
          },
        });
        break;
      case "rogue":
        this.setDescr({
          level_1: {
            first: {
              title: "Острый кинжал",
              descr: [
                "1: Увеличивает атаку на 3 и шанс крит.удара на 3%",
                "2: Увеличивает атаку на 5 и шанс крит.удара на 4%",
                "3: Увеличивает атаку на 7 и шанс крит.удара на 5%",
              ],
              img: "url(../../img/icons/talents/rogue/talent_rogue_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Сокрушение брони",
              descr: ["После Двойного удара ваши атаки игнорируют защиту врага на 100%"],
              img: "url(../../img/icons/talents/rogue/talent_rogue_2_1.png)",
            },
            second: {
              title: "Удар в сердце",
              descr: ["Двойной удар наносит дополнительно 12%(боссу: 6%) от макс.здоровья врага"],
              img: "url(../../img/icons/talents/rogue/talent_rogue_2_2.png)",
            },
          },

          level_3: {
            first: {
              descr: [
                "1: Двойной удар исцеляет на 25% от нанесенного урона",
                "2: Двойной удар исцеляет на 30% от нанесенного урона",
                "3: Двойной удар исцеляет на 35% от нанесенного урона",
              ],
              img: "url(../../img/icons/talents/rogue/talent_rogue_3_1.png)",
            },
            second: {
              descr: [
                "1: После Двойного удара уклонение повышается на 40% на 6 секунд",
                "2: После Двойного удара уклонение повышается на 55% на 6 секунд",
                "3: После Двойного удара уклонение повышается на 70% на 6 секунд",
              ],
              img: "url(../../img/icons/talents/rogue/talent_rogue_3_2.png)",
            },
          },
        });
        break;
      case "monk":
        this.setDescr({
          level_1: {
            first: {
              title: "Удары змеи",
              descr: [
                "1: Увеличивает атаку на 2. Даёт 30% шанс получить единицу маны при атаке",
                "2: Увеличивает атаку на 4. Даёт 40% шанс получить единицу маны при атаке",
                "3: Увеличивает атаку на 6. Даёт 50% шанс получить единицу маны при атаке",
              ],
              img: "url(../../img/icons/talents/monk/talent_monk_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Стиль богомола",
              descr: [
                "Дает 33% шанс при уклонении героя, нанести врагу дополнительный удар, равный вашему уклонению",
              ],
              img: "url(../../img/icons/talents/monk/talent_monk_2_1.png)",
            },
            second: {
              title: "Стиль Тигра",
              descr: ["Дает 33% шанс при крит.ударе, нанести врагу дополнительный удар, равный вашей атаке"],
              img: "url(../../img/icons/talents/monk/talent_monk_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Техника лотоса",
              descr: [
                "1: Дает 6% шанс при атаке, нанести врагу урон 16%(боссу: 10%) от его макс.запаса здоровья и оглушить на 1 ход",
                "2: Дает 7% шанс при атаке, нанести врагу урон 18%(боссу: 10%) от его макс.запаса здоровья и оглушить на 1 ход",
                "3: Дает 8% шанс при атаке, нанести врагу урон 20%(боссу: 10%) от его макс.запаса здоровья и оглушить на 1 ход",
              ],
              img: "url(../../img/icons/talents/monk/talent_monk_3_1.png)",
            },
            second: {
              title: "Синергия чакр",
              descr: [
                "1: Увеличивает макс.запас здоровья и маны на 35, и регенерацию после боя на 15",
                "2: Увеличивает макс.запас здоровья и маны на 50, и регенерацию после боя на 20",
                "3: Увеличивает макс.запас здоровья и маны на 65, и регенерацию после боя на 25",
              ],
              img: "url(../../img/icons/talents/monk/talent_monk_3_2.png)",
            },
          },
        });
        break;

      case "jester":
        this.setDescr({
          level_1: {
            first: {
              title: "Перетасовка колоды",
              descr: [
                "1: После каждого боя герой воостанавливает 18 маны",
                "2: После каждого боя герой воостанавливает 24 маны",
                "3: После каждого боя герой воостанавливает 28 маны",
              ],
              img: "url(../../img/icons/talents/jester/talent_jester_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Везучий тип",
              descr: ["Увеличивает удачу героя на 10"],
              img: "url(../../img/icons/talents/jester/talent_jester_2_1.png)",
            },
            second: {
              title: "С молотом наперевес",
              descr: ["Увеличивает атаку на 7, и шанс крит.удара на 7%"],
              img: "url(../../img/icons/talents/jester/talent_jester_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Шарик в подарок",
              descr: [
                "1: Есть 50% шанс после использования способности, уменьшить атаку противника на 30% на 3 хода",
                "2: Есть 60% шанс после использования способности, уменьшить атаку противника на 35% на 3 хода",
                "3: Есть 70% шанс после использования способности, уменьшить атаку противника на 40% на 3 хода",
              ],
              img: "url(../../img/icons/talents/jester/talent_jester_3_1.png)",
            },
            second: {
              title: "Мухлёж",
              descr: [
                "1: Есть 18% шанс после использования способности восстановить 40 маны",
                "2: Есть 20% шанс после использования способности восстановить 50 маны",
                "3: Есть 22% шанс после использования способности восстановить 60 маны",
              ],
              img: "url(../../img/icons/talents/jester/talent_jester_3_2.png)",
            },
          },
        });
        break;
      case "dryad":
        this.setDescr({
          level_1: {
            first: {
              title: "Целительное прикосновение",
              descr: [
                "1: После использования способности, герой восстанавливает каждый ход 3% макс.запаса здоровья в течении 6 секунд",
                "2: После использования способности, герой восстанавливает каждый ход 4% макс.запаса здоровья в течении 6 секунд",
                "3: После использования способности, герой восстанавливает каждый ход 5% макс.запаса здоровья в течении 6 секунд",
              ],
              img: "url(../../img/icons/talents/dryad/talent_dryad_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Знак дикой природы",
              descr: ["Увеличивает атаку на 7, защиту на 2 и адаптацию на 18%"],
              img: "url(../../img/icons/talents/dryad/talent_dryad_2_1.png)",
            },
            second: {
              title: "Бузиновый посох",
              descr: ["Урон от Вмешательства природы увеличен на 50%"],
              img: "url(../../img/icons/talents/dryad/talent_dryad_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Дубовая кожа",
              descr: [
                "1: Вмешательства природы уменьшает получаемый урон на 40% на 2 хода",
                "2: Вмешательства природы уменьшает получаемый урон на 50% на 2 хода",
                "3: Вмешательства природы уменьшает получаемый урон на 60% на 2 хода",
              ],
              img: "url(../../img/icons/talents/dryad/talent_dryad_3_1.png)",
            },
            second: {
              title: "Наставление друида",
              descr: [
                "1: Увеличивает силу Магии на 4 и уменьшает на 5 стоимость маны: Вмешательства природы ",
                "2: Увеличивает силу Магии на 6 и уменьшает на 10 стоимость маны: Вмешательства природы ",
                "3: Увеличивает силу Магии на 8 и уменьшает на 15 стоимость маны: Вмешательства природы ",
              ],
              img: "url(../../img/icons/talents/dryad/talent_dryad_3_2.png)",
            },
          },
        });
        break;
      case "mechanic":
        this.setDescr({
          level_1: {
            first: {
              title: "Мастер-ломастер",
              descr: [
                "1: С 15% шансом ваши атаки уменьшают защиту противника на 3, увеличивая вашу, на 2 хода",
                "2: С 18% шансом ваши атаки уменьшают защиту противника на 4, увеличивая вашу, на 2 хода",
                "3: С 21% шансом ваши атаки уменьшают защиту противника на 5, увеличивая вашу, на 2 хода",
              ],
              img: "url(../../img/icons/talents/mechanic/talent_mechanic_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Мозговой чип",
              descr: ["Режим Турбо дополнительно увеличивает адаптацию на 35%"],
              img: "url(../../img/icons/talents/mechanic/talent_mechanic_2_1.png)",
            },
            second: {
              title: "Экономия энергии",
              descr: ["Продлевает длительность Режима Турбо на 3 секунды"],
              img: "url(../../img/icons/talents/mechanic/talent_mechanic_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Усовершенственные нейроны",
              descr: [
                "1: Увеличивает уклонение на 6% и макс.запас здоровья на 30",
                "2: Увеличивает уклонение на 8% и макс.запас здоровья на 40",
                "3: Увеличивает уклонение на 10% и макс.запас здоровья на 50",
              ],
              img: "url(../../img/icons/talents/mechanic/talent_mechanic_3_1.png)",
            },
            second: {
              title: "Броне-пластины",
              descr: [
                "1: Режим Турбо дополнительно увеличивает защиту на 6",
                "2: Режим Турбо дополнительно увеличивает защиту на 9",
                "3: Режим Турбо дополнительно увеличивает защиту на 12",
              ],
              img: "url(../../img/icons/talents/mechanic/talent_mechanic_3_2.png)",
            },
          },
        });

        break;
      case "witchmag":
        this.setDescr({
          level_1: {
            first: {
              title: "Усиленные чары",
              descr: [
                "1: Усиливает урон Чароплетсво на 15%",
                "2: Усиливает урон Чароплетсво на 20%",
                "3: Усиливает урон Чароплетсво на 25%",
              ],
              img: "url(../../img/icons/talents/witchmag/talent_witchmag_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Кража ресурсов",
              descr: ["Чароплетсво также крадет 3 маны каждый ход"],
              img: "url(../../img/icons/talents/witchmag/talent_witchmag_2_1.png)",
            },
            second: {
              title: "Глубокая связь",
              descr: ["Продлевает длительность Чароплетсво на 1 ход"],
              img: "url(../../img/icons/talents/witchmag/talent_witchmag_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Зачарованный клинок",
              descr: [
                "1: Атака пассивно усилена на 6, а во время Чароплетства еще на 6",
                "2: Атака пассивно усилена на 8, а во время Чароплетства еще на 8",
                "3: Атака пассивно усилена на 10, а во время Чароплетства еще на 10",
              ],
              img: "url(../../img/icons/talents/witchmag/talent_witchmag_3_1.png)",
            },
            second: {
              title: "Смертельный ритуал",
              descr: [
                "1: После окончания Чароплетства враг получает 25%(боссу: 12.5%) от его макс.запаса здоровья",
                "2: После окончания Чароплетства враг получает 30%(боссу: 15%) от его макс.запаса здоровья",
                "3: После окончания Чароплетства враг получает 35%(боссу: 17.5%) от его макс.запаса здоровья",
              ],
              img: "url(../../img/icons/talents/witchmag/talent_witchmag_3_2.png)",
            },
          },
        });
        break;
      default:
        null;
    }
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (coreTalents);


/***/ }),

/***/ "./src/js/modules/talents/talentsHeroes/dryad.js":
/*!*******************************************************!*\
  !*** ./src/js/modules/talents/talentsHeroes/dryad.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _update_stats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../update_stats */ "./src/js/modules/update_stats.js");
/* harmony import */ var _calc_hp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../calc_hp */ "./src/js/modules/calc_hp.js");
/* harmony import */ var _skills__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../skills */ "./src/js/modules/skills.js");


// import calcMp from "../../calc_mp";
// import addText from "../../text";


const talentDryad = {
  hero: {},

  levels: {
    level_1: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero, maxHp) {
          if (this.learn) {
            let healProcent = 0;
            let count = 0;
            switch (this.amount) {
              case 1: {
                healProcent = 3;
                break;
              }
              case 2: {
                healProcent = 4;
                break;
              }
              case 3: {
                healProcent = 5;
                break;
              }
              default:
                null;
            }
            setTimeout(() => {
              const healing = setInterval(() => {
                if (count >= 3 || hero.hp < 0) {
                  clearInterval(healing);
                } else {
                  hero.hp += Math.round(maxHp / (100 / healProcent));
                  count++;
                  (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".hero_hp", hero.hp);
                }
              }, 2000);
            }, 150);
          }
        },
      },
    },
    level_2: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            hero.attack[0] += 7;
            hero.attack[1] += 7;
            hero.def += 2;
            hero.adapt += 18;

            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMin", hero.attack[0], true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMax", hero.attack[1], true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".def", hero.def, true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".adapt", hero.adapt, true);
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function () {
          if (this.learn) {
            return 1.5;
          } else {
            return 1;
          }
        },
      },
    },
    level_3: {
      first: {
        learn: false,
        amount: 0,
        init: function (enemy) {
          if (this.learn) {
            let factorDmg = 1;
            switch (this.amount) {
              case 1:
                factorDmg = 0.6;
                break;
              case 2:
                factorDmg = 0.5;
                break;
              case 3:
                factorDmg = 0.4;
                break;
            }
            enemy.multiplierDmg = factorDmg;
            setTimeout(() => {
              enemy.multiplierDmg = 1;
            }, 4000);
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            const changeDescr = _skills__WEBPACK_IMPORTED_MODULE_2__.initDescrBtn.bind({ manaCost: _skills__WEBPACK_IMPORTED_MODULE_2__.manaCost });
            switch (this.amount) {
              case 1:
                hero.magicPower += 4;
                _skills__WEBPACK_IMPORTED_MODULE_2__.manaCost.dryad -= 5;
                changeDescr(hero.name);
                break;
              case 2:
                hero.magicPower += 2;
                _skills__WEBPACK_IMPORTED_MODULE_2__.manaCost.dryad -= 5;
                changeDescr(hero.name);
                break;
              case 3:
                hero.magicPower += 2;
                _skills__WEBPACK_IMPORTED_MODULE_2__.manaCost.dryad -= 5;
                changeDescr(hero.name);
                break;
            }
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".magicPower", hero.magicPower, true);
          }
        },
      },
    },
  },

  init(talent, hero) {
    const level = talent.getAttribute("level-current");
    const branch = talent.getAttribute("branch");
    console.log(level, branch);
    this.levels[level][branch].learn = true;
    this.levels[level][branch].amount += 1;

    this.hero = hero;

    // if (level == "level_1" && branch == "first") {
    //   this.levels.level_1.first.init(hero);
    // }
    if (level == "level_2" && branch == "first") {
      this.levels.level_2.first.init(hero);
    }
    if (level == "level_3" && branch == "second") {
      this.levels.level_3.second.init(hero);
    }

    console.log(this.levels);
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (talentDryad);


/***/ }),

/***/ "./src/js/modules/talents/talentsHeroes/jester.js":
/*!********************************************************!*\
  !*** ./src/js/modules/talents/talentsHeroes/jester.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _update_stats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../update_stats */ "./src/js/modules/update_stats.js");
/* harmony import */ var _calc_mp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../calc_mp */ "./src/js/modules/calc_mp.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../text */ "./src/js/modules/text.js");

// import calcHp from "../../calc_hp";



const talentJester = {
  hero: {},

  levels: {
    level_1: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let bonusMana = 0;
            switch (this.amount) {
              case 1: {
                bonusMana = 18;
                break;
              }
              case 2: {
                bonusMana = 24;
                break;
              }
              case 3: {
                bonusMana = 28;
                break;
              }
              default:
                null;
            }
            hero.jesterShifflDeck = function () {
              return bonusMana;
            };
          }
        },
      },
    },
    level_2: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            hero.luck += 10;
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".luck", hero.luck, true);
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            hero.attack[0] += 7;
            hero.attack[1] += 7;
            hero.critChance += 7;
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMin", hero.attack[0], true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMax", hero.attack[1], true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".critChance", hero.critChance, true);
          }
        },
      },
    },
    level_3: {
      first: {
        learn: false,
        amount: 0,
        init: function (enemy) {
          if (this.learn) {
            let chance = 0;
            let factorDmg = 1;
            switch (this.amount) {
              case 1:
                chance = 50;
                factorDmg = 0.7;
                break;
              case 2:
                chance = 60;
                factorDmg = 0.65;
                break;
              case 3:
                chance = 70;
                factorDmg = 0.6;
                break;
            }
            const chanceTotal = Math.random() * 100 + 1;
            if (chance > chanceTotal) {
              (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Атака врага уменьшена на 3 хода`, "magenta");
              enemy.multiplierDmg = factorDmg;
              setTimeout(() => {
                enemy.multiplierDmg = 1;
              }, 6000);
            }

            //   return 0;
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let chance = 0,
              bonusMana = 0;
            switch (this.amount) {
              case 1:
                chance = 18;
                bonusMana = 40;
                break;
              case 2:
                chance = 20;
                bonusMana = 50;
                break;
              case 3:
                chance = 22;
                bonusMana = 60;
                break;
            }
            const chanceTotal = Math.random() * 100 + 1;
            if (chance > chanceTotal) {
              setTimeout(() => {
                hero.mana += bonusMana;
                (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Враг смухлевали и восстановили ${bonusMana} маны`, "magenta");
                (0,_calc_mp__WEBPACK_IMPORTED_MODULE_1__["default"])(hero.mana);
              }, 400);
            }
          }
        },
      },
    },
  },

  init(talent, hero) {
    const level = talent.getAttribute("level-current");
    const branch = talent.getAttribute("branch");
    console.log(level, branch);
    this.levels[level][branch].learn = true;
    this.levels[level][branch].amount += 1;

    this.hero = hero;

    if (level == "level_1" && branch == "first") {
      this.levels.level_1.first.init(hero);
    }
    if (level == "level_2" && branch == "first") {
      this.levels.level_2.first.init(hero);
    }
    if (level == "level_2" && branch == "second") {
      this.levels.level_2.second.init(hero);
    }

    console.log(this.levels);
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (talentJester);


/***/ }),

/***/ "./src/js/modules/talents/talentsHeroes/mechanic.js":
/*!**********************************************************!*\
  !*** ./src/js/modules/talents/talentsHeroes/mechanic.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _update_stats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../update_stats */ "./src/js/modules/update_stats.js");
/* harmony import */ var _calc_hp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../calc_hp */ "./src/js/modules/calc_hp.js");


// import calcMp from "../../calc_mp";
// import addText from "../../text";
// import { manaCost, initDescrBtn } from "../../skills";

const talentMechanic = {
  hero: {},

  levels: {
    level_1: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let chance = 0;
            let decDef = 0;
            switch (this.amount) {
              case 1: {
                chance = 15;
                decDef = 3;
                break;
              }
              case 2: {
                chance = 18;
                decDef = 4;
                break;
              }
              case 3: {
                chance = 21;
                decDef = 5;
                break;
              }
              default:
                null;
            }
            hero.mechanicMaster = function (hero, enemy) {
              const chanceTotal = Math.random() * 100 + 1;
              if (chance > chanceTotal) {
                const enemyDef = enemy.def;
                const enemyName = enemy.name;
                if (enemy.def - decDef < 0) {
                  enemy.def = 0;
                } else {
                  enemy.def -= decDef;
                }
                hero.def += decDef;
                (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".def", hero.def, true);
                setTimeout(() => {
                  enemy.def += enemyDef;
                  hero.def -= decDef;
                  (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".def", hero.def, true);
                }, 4000);
              }
            };
          }
        },
      },
    },
    level_2: {
      first: {
        learn: false,
        amount: 0,
        init: function () {
          if (this.learn) {
            return 35;
          } else {
            return 0;
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function () {
          if (this.learn) {
            return 3000;
          } else {
            return 0;
          }
        },
      },
    },
    level_3: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let bonusDodge = 0,
              bonusHp = 0;
            switch (this.amount) {
              case 1:
                bonusDodge = 6;
                bonusHp = 30;
                break;
              case 2:
                bonusDodge = 2;
                bonusHp = 10;
                break;
              case 3:
                bonusDodge = 2;
                bonusHp = 10;
                break;
            }
            hero.dodge += bonusDodge;
            hero.maxHPHero += bonusHp;
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".hpMax", bonusHp);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".dodge", hero.dodge, true);
            document.querySelector(".hero_hp").setAttribute("data-hp", hero.maxHPHero);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".hero_hp", hero.hp);
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function () {
          if (this.learn) {
            let bonusDef = 0;
            switch (this.amount) {
              case 1:
                bonusDef = 6;
                break;
              case 2:
                bonusDef = 9;
                break;
              case 3:
                bonusDef = 12;
                break;
            }
            return bonusDef;
          } else {
            return 0;
          }
        },
      },
    },
  },

  init(talent, hero) {
    const level = talent.getAttribute("level-current");
    const branch = talent.getAttribute("branch");
    console.log(level, branch);
    this.levels[level][branch].learn = true;
    this.levels[level][branch].amount += 1;

    this.hero = hero;

    if (level == "level_1" && branch == "first") {
      this.levels.level_1.first.init(hero);
    }
    if (level == "level_3" && branch == "first") {
      this.levels.level_3.first.init(hero);
    }
    // if (level == "level_3" && branch == "second") {
    //   this.levels.level_3.second.init(hero);
    // }

    console.log(this.levels);
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (talentMechanic);


/***/ }),

/***/ "./src/js/modules/talents/talentsHeroes/monk.js":
/*!******************************************************!*\
  !*** ./src/js/modules/talents/talentsHeroes/monk.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _update_stats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../update_stats */ "./src/js/modules/update_stats.js");
/* harmony import */ var _calc_hp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../calc_hp */ "./src/js/modules/calc_hp.js");
/* harmony import */ var _calc_mp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../calc_mp */ "./src/js/modules/calc_mp.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../text */ "./src/js/modules/text.js");





const talentMonk = {
  hero: {},

  levels: {
    level_1: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let chance = 0;
            switch (this.amount) {
              case 1: {
                chance = 30;
                hero.attack[0] += 2;
                hero.attack[1] += 2;
                break;
              }
              case 2: {
                chance = 40;
                hero.attack[0] += 2;
                hero.attack[1] += 2;
                break;
              }
              case 3: {
                chance = 50;
                hero.attack[0] += 2;
                hero.attack[1] += 2;
                break;
              }
              default:
                null;
            }
            hero.monkSnakeStrikes = function () {
              const chanceTotal = Math.random() * 100 + 1;
              console.log(chance);
              if (chance > chanceTotal) {
                return 1;
              } else {
                return 0;
              }
            };

            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMin", hero.attack[0], true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMax", hero.attack[1], true);
          }
        },
      },
    },
    level_2: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            hero.monkMantis = function (heroDodge) {
              const chance = Math.random() * 100 + 1;
              let dmg = 0;
              if (chance < 33) {
                dmg = heroDodge;
              }
              return dmg;
            };

            //   return 0;
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            hero.monkTiger = function (heroAttack) {
              let dmg = 0;
              const chance = Math.random() * 100 + 1;

              if (chance < 33) {
                dmg = Math.round((heroAttack[0] + heroAttack[1]) / 2);
              }
              return dmg;
            };

            //   return 0;
          }
        },
      },
    },
    level_3: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let chance = 0;
            let factorDmg = 1;
            switch (this.amount) {
              case 1:
                chance = 6;
                factorDmg = 16;
                break;
              case 2:
                chance = 7;
                factorDmg = 17;
                break;
              case 3:
                chance = 8;
                factorDmg = 18;
                break;
            }
            hero.monkLotus = function (enemy) {
              const chanceTotal = Math.random() * 100 + 1;

              if (chance > chanceTotal) {
                let mod = 1;
                enemy.name == "boss" ? (mod = 0.5) : null;
                if (enemy.hp > 0) {
                  return enemy.maxHPEnemy / (100 / (factorDmg * mod));
                } else {
                  return 0;
                }
              } else {
                return 0;
              }
            };

            //   return 0;
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let bonusHp = 0,
              bonusMp = 0,
              bonusRegen = 0;
            switch (this.amount) {
              case 1:
                bonusMp = 35;
                bonusHp = 35;
                bonusRegen = 15;
                break;
              case 2:
                bonusMp = 15;
                bonusHp = 15;
                bonusRegen = 5;
                break;
              case 3:
                bonusMp = 15;
                bonusHp = 15;
                bonusRegen = 5;
                break;
            }
            hero.maxHPHero += bonusHp;
            hero.mp += bonusMp;
            hero.regeneration += bonusRegen;
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".hpMax", bonusHp);
            document.querySelector(".hero_hp").setAttribute("data-hp", hero.maxHPHero);
            // const mpMax = document.querySelector(".hero_mp").getAttribute("data-mp");
            document.querySelector(".hero_mp").setAttribute("data-mp", hero.mp);
            (0,_calc_mp__WEBPACK_IMPORTED_MODULE_2__["default"])(hero.mana);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".hero_hp", hero.hp);
          }
        },
      },
    },
  },

  init(talent, hero) {
    const level = talent.getAttribute("level-current");
    const branch = talent.getAttribute("branch");
    console.log(level, branch);
    this.levels[level][branch].learn = true;
    this.levels[level][branch].amount += 1;

    this.hero = hero;

    if (level == "level_1" && branch == "first") {
      this.levels.level_1.first.init(hero);
    }
    if (level == "level_2" && branch == "first") {
      this.levels.level_2.first.init(hero);
    }
    if (level == "level_2" && branch == "second") {
      this.levels.level_2.second.init(hero);
    }
    if (level == "level_3" && branch == "first") {
      this.levels.level_3.first.init(hero);
    }
    if (level == "level_3" && branch == "second") {
      this.levels.level_3.second.init(hero);
    }

    console.log(this.levels);
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (talentMonk);


/***/ }),

/***/ "./src/js/modules/talents/talentsHeroes/rogue.js":
/*!*******************************************************!*\
  !*** ./src/js/modules/talents/talentsHeroes/rogue.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _update_stats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../update_stats */ "./src/js/modules/update_stats.js");
/* harmony import */ var _calc_hp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../calc_hp */ "./src/js/modules/calc_hp.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../text */ "./src/js/modules/text.js");




const talentRogue = {
  hero: {},

  levels: {
    level_1: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            switch (this.amount) {
              case 1: {
                hero.attack[0] += 3;
                hero.attack[1] += 3;
                hero.critChance += 3;
                break;
              }
              case 2: {
                hero.attack[0] += 2;
                hero.attack[1] += 2;
                hero.critChance += 1;
                break;
              }
              case 3: {
                hero.attack[0] += 2;
                hero.attack[1] += 2;
                hero.critChance += 1;
                break;
              }
              default:
                null;
            }
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMin", hero.attack[0], true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMax", hero.attack[1], true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".critChance", hero.critChance, true);
          }
        },
      },
    },
    level_2: {
      first: {
        learn: false,
        amount: 0,
        init: function () {
          if (this.learn) {
            return 1;
          } else {
            return 2;
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (enemy) {
          if (this.learn) {
            let mod = 1;
            enemy.name == "boss" ? (mod = 0.5) : null;
            console.log(enemy.maxHPEnemy / (100 / (12 * mod)));
            return enemy.maxHPEnemy / (100 / (12 * mod));
          } else {
            return 0;
          }
        },
      },
    },
    level_3: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero, dmg, maxHp) {
          if (this.learn) {
            let heal = 0;
            switch (this.amount) {
              case 1:
                heal = Math.round(dmg / (100 / 25));
                console.log(heal);
                break;
              case 2:
                heal = Math.round(dmg / (100 / 30));
                break;
              case 3:
                heal = Math.round(dmg / (100 / 35));
                break;
            }
            hero.hp + heal > maxHp ? (hero.hp = maxHp) : (hero.hp += heal);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".hero_hp", hero.hp);
            (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Двойной также исцеляет вас на ${heal} здоровья`, "cyan");
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let bonus = 0;
            switch (this.amount) {
              case 1:
                bonus = 40;
                break;
              case 2:
                bonus = 55;
                break;
              case 3:
                bonus = 70;
                break;
            }
            hero.dodge += bonus;
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".dodge", hero.dodge, true);
            setTimeout(() => {
              hero.dodge -= bonus;
              (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".dodge", hero.dodge, true);
            }, 6000);
          }
        },
      },
    },
  },

  init(talent, hero) {
    const level = talent.getAttribute("level-current");
    const branch = talent.getAttribute("branch");
    console.log(level, branch);
    this.levels[level][branch].learn = true;
    this.levels[level][branch].amount += 1;

    this.hero = hero;

    if (level == "level_1" && branch == "first") {
      // this.incStat(hero);
      this.levels.level_1.first.init(hero);
    }

    console.log(this.levels);
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (talentRogue);


/***/ }),

/***/ "./src/js/modules/talents/talentsHeroes/warrior.js":
/*!*********************************************************!*\
  !*** ./src/js/modules/talents/talentsHeroes/warrior.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _update_stats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../update_stats */ "./src/js/modules/update_stats.js");
/* harmony import */ var _calc_hp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../calc_hp */ "./src/js/modules/calc_hp.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../text */ "./src/js/modules/text.js");




const talentWarrior = {
  hero: {},

  levels: {
    level_1: {
      first: {
        learn: false,
        amount: 0,
        init: function () {
          if (this.learn) {
            if (this.amount == 1) {
              return 1.15;
            }
            if (this.amount == 2) {
              return 1.2;
            }
            if (this.amount == 3) {
              return 1.25;
            }
          } else {
            return 1;
          }
        },
      },
    },
    level_2: {
      first: {
        learn: false,
        amount: 0,
        init: function (enemy) {
          if (this.learn) {
            enemy.stun = true;
            enemy.dodge -= 15;
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function () {
          if (this.learn) {
            return 25;
          } else {
            return 0;
          }
        },
      },
    },
    level_3: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero, maxHp) {
          if (this.learn) {
            let heal = 0;
            if (this.amount == 1) {
              heal = Math.round(maxHp / (100 / 10));
            }
            if (this.amount == 2) {
              heal = Math.round(maxHp / (100 / 10));
            }
            if (this.amount == 3) {
              heal = Math.round(maxHp / (100 / 10));
            }
            console.log(hero);

            hero.hp + heal > maxHp ? (hero.hp = maxHp) : (hero.hp += heal);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".hero_hp", hero.hp);
            (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Боевой крик также исцеляет вас на ${heal} здоровья`, "cyan");
          } else {
            null;
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            switch (this.amount) {
              case 1: {
                hero.def += 3;
                break;
              }
              case 2: {
                hero.def += 3;
                break;
              }
              case 3: {
                hero.def += 3;
                break;
              }
              default:
                null;
            }
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".def", hero.def, true);
          }
        },
      },
    },
  },

  init(talent, hero) {
    const level = talent.getAttribute("level-current");
    const branch = talent.getAttribute("branch");
    console.log(level, branch);
    this.levels[level][branch].learn = true;
    this.levels[level][branch].amount += 1;

    this.hero = hero;

    if (level == "level_3" && branch == "second") {
      // this.incStat(hero);
      this.levels.level_3.second.init(hero);
    }

    console.log(this.levels);
  },

  // incStat(hero) {
  //   if (this.levels.level_3.second.learn) {
  //     console.log(this.levels.level_3.second.amount);
  //     switch (this.levels.level_3.second.amount) {
  //       case 1: {
  //         hero.def += 3;
  //         break;
  //       }
  //       case 2: {
  //         hero.def += 3;
  //         break;
  //       }
  //       case 3: {
  //         hero.def += 3;
  //         break;
  //       }
  //       default:
  //         null;
  //     }
  //     updateStats(".def", hero.def, true);
  //   }
  // },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (talentWarrior);


/***/ }),

/***/ "./src/js/modules/talents/talentsHeroes/witchmage.js":
/*!***********************************************************!*\
  !*** ./src/js/modules/talents/talentsHeroes/witchmage.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _update_stats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../update_stats */ "./src/js/modules/update_stats.js");
/* harmony import */ var _calc_mp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../calc_mp */ "./src/js/modules/calc_mp.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../text */ "./src/js/modules/text.js");

// import calcHp from "../../calc_hp";



const talentWitchmag = {
  hero: {},

  levels: {
    level_1: {
      first: {
        learn: false,
        amount: 0,
        init: function () {
          if (this.learn) {
            let factorDmg = 1;
            switch (this.amount) {
              case 1:
                factorDmg = 1.15;
                break;
              case 2:
                factorDmg = 1.2;
                break;
              case 3:
                factorDmg = 1.25;
                break;
            }
            return factorDmg;
          } else {
            return 1;
          }
        },
      },
    },
    level_2: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            hero.mana += 3;
            (0,_calc_mp__WEBPACK_IMPORTED_MODULE_1__["default"])(hero.mana);
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function () {
          if (this.learn) {
            return 5;
          } else {
            return 4;
          }
        },
      },
    },
    level_3: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let bonusAttack = 0,
              buffAttack;
            switch (this.amount) {
              case 1:
                buffAttack = 6;
                bonusAttack = 6;
                break;
              case 2:
                buffAttack = 2;
                bonusAttack = 8;
                break;
              case 3:
                buffAttack = 2;
                bonusAttack = 10;
                break;
            }
            hero.attack[0] += buffAttack;
            hero.attack[1] += buffAttack;
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMin", hero.attack[0], true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMax", hero.attack[1], true);
            hero.witchmagEnchBlade = function (boolean) {
              if (boolean) {
                hero.attack[0] += bonusAttack;
                hero.attack[1] += bonusAttack;
              } else {
                hero.attack[0] -= bonusAttack;
                hero.attack[1] -= bonusAttack;
              }
              (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMin", hero.attack[0], true);
              (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMax", hero.attack[1], true);
            };
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (enemy) {
          if (this.learn) {
            let factor = 0;
            let mod = 1;
            switch (this.amount) {
              case 1:
                factor = 25;
                break;
              case 2:
                factor = 30;
                break;
              case 3:
                factor = 35;
                break;
            }
            enemy.name == "boss" ? (mod = 0.5) : null;
            const dmg = Math.round((enemy.maxHPEnemy / (100 / factor)) * mod);
            enemy.hp -= dmg;
            // calcHp(".enemy_hp", enemy.hp);
            (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Враг получает ${dmg} урона от смертельного ритула`, "magenta");
          }
        },
      },
    },
  },

  init(talent, hero) {
    const level = talent.getAttribute("level-current");
    const branch = talent.getAttribute("branch");
    console.log(level, branch);
    this.levels[level][branch].learn = true;
    this.levels[level][branch].amount += 1;

    this.hero = hero;

    // if (level == "level_1" && branch == "first") {
    //   this.levels.level_1.first.init(hero);
    // }
    if (level == "level_3" && branch == "first") {
      this.levels.level_3.first.init(hero);
    }
    // if (level == "level_3" && branch == "second") {
    //   this.levels.level_3.second.init(hero);
    // }

    console.log(this.levels);
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (talentWitchmag);


/***/ }),

/***/ "./src/js/modules/text.js":
/*!********************************!*\
  !*** ./src/js/modules/text.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addText);

// const level = item.getAttribute("level");
//               const branch = item.getAttribute("branch");

//               unlocksTalents: {
//                 level_1_1: true,
//                 level_2_1: false,
//                 level_2_2: false,
//                 level_3_1: false
//                 level_3_2: false
//               },


/***/ }),

/***/ "./src/js/modules/update_stats.js":
/*!****************************************!*\
  !*** ./src/js/modules/update_stats.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateStats);


/***/ }),

/***/ "./src/js/modules/xp.js":
/*!******************************!*\
  !*** ./src/js/modules/xp.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (heroXp);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_heroes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/heroes */ "./src/js/modules/heroes.js");
/* harmony import */ var _modules_fight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/fight */ "./src/js/modules/fight.js");
/* harmony import */ var _modules_enemy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/enemy */ "./src/js/modules/enemy.js");
/* harmony import */ var _modules_calc_hp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/calc_hp */ "./src/js/modules/calc_hp.js");
/* harmony import */ var _modules_calc_mp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc_mp */ "./src/js/modules/calc_mp.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_shop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/shop */ "./src/js/modules/shop.js");
/* harmony import */ var _modules_talents_accordion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/talents/accordion */ "./src/js/modules/talents/accordion.js");
/* harmony import */ var _modules_talents_core_talents__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/talents/core-talents */ "./src/js/modules/talents/core-talents.js");












window.addEventListener("DOMContentLoaded", () => {
  let hero;
  let maxHpHero;
  let maxMpHero;
  let enemy;

  //
  const btnStart = document.querySelector(".btn__start");
  const content = document.querySelector(".base__wrapper");

  btnStart.addEventListener("click", () => {
    content.classList.add("show", "fade");
    btnStart.remove();
  });

  //

  const allHeroes = document.querySelectorAll(".base__container_hero"),
    imgHero = document.querySelectorAll(".img__hero"),
    cardHero = document.querySelectorAll(".base__hero_card");

  function choose(items) {
    items.forEach((element) => {
      element.addEventListener("click", () => {
        const atr = element.getAttribute("data");
        imgHero[atr].classList.add("hidden");
        cardHero[atr].classList.remove("hidden");
        btnTalents.classList.remove("hidden");
      });
    });
  }
  choose(allHeroes);

  const baseActive = document.querySelector(".base-active__wrapper"),
    talentsContainer = document.querySelector(".talents__container"),
    btnBack = document.querySelectorAll(".btn__back"),
    btnSelect = document.querySelectorAll(".btn__select"),
    bars = document.querySelector(".base-active__header"),
    textcontent = document.querySelector(".text__container"),
    enemycontent = document.querySelector(".enemy-container"),
    btnsSex = document.querySelectorAll(".base__btn-sex"),
    btnTalents = talentsContainer.querySelector(".btn-talents");

  btnBack.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.stopPropagation();
      const atr = e.target.closest(".base__container_hero").getAttribute("data");
      imgHero[atr].classList.remove("hidden");
      cardHero[atr].classList.add("hidden");
      btnTalents.classList.add("hidden");
    });
  });

  btnSelect.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const atr = e.target.closest(".base__container_hero").getAttribute("data");
      bars.classList.remove("hidden");
      allHeroes.forEach((item) => {
        item.classList.add("hidden");
      });
      allHeroes[atr].classList.remove("hidden");
      baseActive.prepend(allHeroes[atr]);
      baseActive.prepend(talentsContainer);
      talentsContainer.classList.remove("hidden");
      content.remove();
      imgHero[atr].classList.remove("hidden");
      cardHero[atr].classList.add("hidden");
      textcontent.classList.remove("hidden");
      btnTalents.classList.add("hidden");
      btnsSex.forEach((btn) => {
        btn.remove();
      });
      btnSelect[atr].remove();
      // Создание героя
      hero = (0,_modules_heroes__WEBPACK_IMPORTED_MODULE_0__["default"])("hero", atr);
      // назначение дата атрибута НР
      hpHero.setAttribute("data-hp", hero.hp);
      maxHpHero = hpHero.getAttribute("data-hp");
      (0,_modules_calc_hp__WEBPACK_IMPORTED_MODULE_3__["default"])(".hero_hp", maxHpHero);

      hero.boss = 0;

      mpHero.setAttribute("data-mp", hero.mp);
      maxMpHero = mpHero.getAttribute("data-mp");
      (0,_modules_calc_mp__WEBPACK_IMPORTED_MODULE_4__["default"])(0);

      _modules_talents_core_talents__WEBPACK_IMPORTED_MODULE_8__["default"].init(hero);

      // buff();
    });
  });

  // const barHpHero = document.querySelector(".bar__hp-f");
  const hpHero = document.querySelector(".hero_hp");
  const mpHero = document.querySelector(".hero_mp");
  const hpEnemy = document.querySelector(".enemy_hp");
  const btnGo = document.querySelector(".btn__go");
  const btnFight = document.querySelector(".btn__fight");
  const btnReload = document.querySelector(".btn__reload");
  const btnRaid = document.querySelector(".btn__raid");
  const btnSkill = document.querySelector(".btn__skill");
  btnGo.addEventListener("click", () => {
    enemy = (0,_modules_enemy__WEBPACK_IMPORTED_MODULE_2__["default"])(hero.luck);
    createEnemy();
  });

  btnFight.addEventListener("click", () => {
    btnFight.classList.add("hidden");
    (0,_modules_fight__WEBPACK_IMPORTED_MODULE_1__["default"])(enemy, hero, [btnGo, btnShopOpen, btnRaid], btnReload, btnSkill);
    btnSkill.classList.remove("hidden");
  });

  btnReload.addEventListener("click", () => {
    location.reload();
    btnStart.click();
  });

  const btnArtOpen = document.querySelector(".btn__open-art"),
    overlayArt = document.querySelector(".overlay__arts"),
    btnArtClose = document.querySelector(".btn__art-close");

  btnArtOpen.addEventListener("click", () => {
    overlayArt.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  btnArtClose.addEventListener("click", () => {
    overlayArt.style.display = "none";

    document.body.style.overflow = "";
  });

  const btnShopOpen = document.querySelector(".btn__open-shop"),
    overlayShop = document.querySelector(".overlay__shop"),
    btnShopClose = document.querySelector(".btn__shop-close");

  btnShopOpen.addEventListener("click", () => {
    overlayShop.style.display = "block";
    document.body.style.overflow = "hidden";
    (0,_modules_shop__WEBPACK_IMPORTED_MODULE_6__.updateHero)(hero, hpHero.getAttribute("data-hp"));
  });

  btnShopClose.addEventListener("click", () => {
    overlayShop.style.display = "none";
    document.body.style.overflow = "";
  });

  const overlayRaid = document.querySelector(".overlay__raid"),
    btnRaidYes = overlayRaid.querySelector(".btn__raid_yes"),
    btnRaidNo = overlayRaid.querySelector(".btn__raid_no");

  btnRaid.addEventListener("click", () => {
    overlayRaid.style.display = "block";
  });
  btnRaidNo.addEventListener("click", () => {
    overlayRaid.style.display = "none";
  });
  btnRaidYes.addEventListener("click", () => {
    overlayRaid.style.display = "none";
    (0,_modules_heroes__WEBPACK_IMPORTED_MODULE_0__["default"])("boss", 0);
    console.log("boss");

    enemy = (0,_modules_heroes__WEBPACK_IMPORTED_MODULE_0__["default"])("boss", hero.boss);
    // boss++;
    createEnemy();
  });

  // вставка противника в контейнер
  function createEnemy() {
    if (enemycontent.childElementCount > 1) {
      enemycontent.lastChild.remove();
    }
    const enemyImg = document.createElement("img");
    enemyImg.setAttribute("src", enemy.srcImg);
    enemycontent.append(enemyImg);
    enemycontent.classList.remove("hidden");
    hpEnemy.setAttribute("data-hp", enemy.hp);
    (0,_modules_calc_hp__WEBPACK_IMPORTED_MODULE_3__["default"])(".enemy_hp", hpEnemy.getAttribute("data-hp"));
    btnGo.classList.add("hidden");
    btnRaid.classList.add("hidden");
    btnShopOpen.classList.add("hidden");
    btnFight.classList.remove("hidden");
  }
  // магазин
  (0,_modules_shop__WEBPACK_IMPORTED_MODULE_6__["default"])();

  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])(".base__container_hero", ".arrow_left", ".arrow_right");

  const btnSex = document.querySelectorAll(".btn-sex");

  btnSex.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      let sex = e.target.getAttribute("data-sex");
      let src = btn.closest(".base__container_hero").querySelector(".img__hero").getAttribute("src");

      if (sex == "man" && src.substring(src.length - 9) === "Woman.png") {
        // src = btn.closest(".base__container_hero").querySelector(".img__hero").getAttribute("src");
        btn
          .closest(".base__container_hero")
          .querySelector(".img__hero")
          .setAttribute("src", `${src.slice(0, -9)}.png`);
        console.log(src.substring(src.length - 9));
      }
      if (sex == "woman" && src.substring(src.length - 9) !== "Woman.png") {
        // src = btn.closest(".base__container_hero").querySelector(".img__hero").getAttribute("src");
        btn
          .closest(".base__container_hero")
          .querySelector(".img__hero")
          .setAttribute("src", `${src.slice(0, -4)}Woman.png`);
        console.log(src.substring(src.length - 9));
      }
    });
  });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map