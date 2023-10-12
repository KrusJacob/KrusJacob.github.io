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
  "emblemDragon",
  "boneDagger",
  "giantHammer",
  "spikedHorn",
  "tigerMask",
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
  "emblemWolf",
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

const artItems = document.querySelectorAll(".art-item");
const btnArtChoose = document.querySelector(".btn__chooseArt");

let artLength;
let xp = 0;
let totalXp = 1;
let arrArtifacts;
let numBoss = 0;

const staticChanceLegendArt = 3;
let upChanceLegendArt = staticChanceLegendArt;

(0,_xp__WEBPACK_IMPORTED_MODULE_3__["default"])(1);

function getXp(hero, guarantLegendArt = false, boss = false) {
  if (!boss) {
    xp += 1;
  }

  if (xp % 2 == 0) {
    xp = 0;
    totalXp += 1;
    if (totalXp % 3 == 0) {
      hero.talentsPoint += 1;
      _talents_core_talents__WEBPACK_IMPORTED_MODULE_4__["default"].incTalent(hero.talentsPoint);
    }

    hero.lvl += 1;
    hero.lvl % 20 == 0 ? (0,_buff__WEBPACK_IMPORTED_MODULE_5__["default"])(hero) : null;

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

    return art;
  }

  //
  function collectArt() {
    let firstArt = getDataArt(mathArtifacts(guarantLegendArt, boss));
    let secondArt = getDataArt(mathArtifacts(guarantLegendArt, boss));
    if (boss) numBoss++;
    chooseArt(firstArt, secondArt);
  }

  function getDataArt(artName) {
    switch (artName) {
      case "emblemWolf":
        return {
          name: "emblemWolf",
          src: "img/artifacts/emblemWolf.png",
          rarity: "gold",
          title: "Эмблема Волка",
          descr:
            "При атаке есть 20% шанс нанести противнику дополнительный урон, в размере 10 + 3% от его макс.здоровья",
          useArt: function () {
            hero.emblemWolf = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "tigerMask":
        return {
          name: "tigerMask",
          src: "img/artifacts/tigerMask.png",
          rarity: "royalblue",
          title: "Маска Тигра",
          descr: "Увеличивает вампиризм на 5%, защиту на 1 и адаптацию на 5%",
          useArt: function () {
            incSecondaryStatHero("def", 1);
            incSecondaryStatHero("adapt", 5);
            hero.vampiric += 5;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "spikedHorn":
        return {
          name: "spikedHorn",
          src: "img/artifacts/spikedHorn.png",
          rarity: "limegreen",
          title: "Шипастый Рог",
          descr: "Увеличивает адаптацию на 8%, уклонение на 3%, и регенерацию здоровья на 15",
          useArt: function () {
            incSecondaryStatHero("adapt", 8);
            incSecondaryStatHero("dodge", 3);

            hero.regeneration += 15;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "giantHammer":
        return {
          name: "giantHammer",
          src: "img/artifacts/giantHammer.png",
          rarity: "limegreen",
          title: "Гигантский Молот",
          descr: "Повышает атаку на 6, и макс.запас здоровья на 25",
          useArt: function () {
            incMaxHPHero(25);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            incAttackHero(6, 6);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "boneDagger":
        return {
          name: "boneDagger",
          src: "img/artifacts/boneDagger.png",
          rarity: "limegreen",
          title: "Костяной кинжал",
          descr: "Повышает крит.шанс на 4% и удачу на 4",
          useArt: function () {
            incSecondaryStatHero("critChance", 4);
            incSecondaryStatHero("luck", 4);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "emblemDragon":
        return {
          name: "emblemDragon",
          src: "img/artifacts/emblemDragon.png",
          rarity: "royalblue",
          title: "Эмблема Дракона",
          descr: "При получении крит.удара, увеличивает защиту и атаку на 5 в течении 3 ходов",
          useArt: function () {
            hero.arts.emblemDragon = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "thunderHammer":
        return {
          name: "thunderHammer",
          src: "img/artifacts/thunderHammer.png",
          rarity: "gold",
          title: "Громовой Молот",
          descr: "Увеличивает атаку и силу магии на 5, есть шанс, что ваша атака может оглушить врага на 1 ход",
          useArt: function () {
            incAttackHero(5, 5);
            incSecondaryStatHero("magicPower", 5);
            hero.arts.thunderHammer = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "staffOfHealing":
        return {
          name: "staffOfHealing",
          src: "img/artifacts/staffOfHealing.png",
          rarity: "royalblue",
          title: "Посох Исцеления",
          descr: "Увеличивает силу магии на 5, макс.здоровье на 25 и повышает регенерацию здоровья на 20",
          useArt: function () {
            incSecondaryStatHero("magicPower", 5);
            incMaxHPHero(25);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            hero.regeneration += 20;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "flameBook":
        return {
          name: "flameBook",
          src: "img/artifacts/flameBook.png",
          rarity: "gold",
          title: "Огненная Книга",
          descr: "Увеличивает силу магии на 15",
          useArt: function () {
            incSecondaryStatHero("magicPower", 15);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "magicBook":
        return {
          name: "magicBook",
          src: "img/artifacts/magicBook.png",
          rarity: "royalblue",
          title: "Книга Магии",
          descr: "Увеличивает силу магии на 10 и адаптацию на 5%",
          useArt: function () {
            incSecondaryStatHero("magicPower", 10);
            incSecondaryStatHero("adapt", 5);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "robberyCloak":
        return {
          name: "robberyCloak",
          src: "img/artifacts/robbery_cloak.png",
          rarity: "gold",
          title: "Плащ Разбойника",
          descr: "Увеличивает уклонение на 5%. При успешном уклонении повышает шанс крит.удара на 30% на 1 ход",
          useArt: function () {
            hero.arts.robberyCloak = true;
            incSecondaryStatHero("dodge", 5);
            alert(`вы получили: ${this.title}`);
          },
        };

      case "handKingHell":
        return {
          name: "handKingHell",
          src: "img/artifacts/bossArts/handKingHell.png",
          rarity: "blueviolet",
          title: "Адские Когти",
          descr:
            "Ваши критические атаки могут поджечь противинка, от чего он будет терять здоровье в течении 4 ходов",
          useArt: function () {
            hero.arts.handKingHell = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "swordKingHell":
        return {
          name: "swordKingHell",
          src: "img/artifacts/bossArts/swordKingHell.png",
          rarity: "blueviolet",
          title: "Меч Короля Ада",
          descr:
            "Увеличивает атаку и силу магии на 5. При промахе, огненный шлейф от взмаха меча наносит врагу 50% от атаки",
          useArt: function () {
            incAttackHero(5, 5);
            incSecondaryStatHero("magicPower", 5);
            hero.arts.swordKingHell = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "potion_Hp_Mp":
        return {
          name: "potion_Hp_Mp",
          src: "img/artifacts/potion_Hp_Mp.png",
          rarity: "royalblue",
          title: "Зелье Регенерации",
          descr:
            "С некоторым шансом, при получении урона, вы можете выпить зелье, восстановив 5% здоровья и 10 маны",
          useArt: function () {
            hero.arts.potion_Hp_Mp = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "magicShield":
        return {
          name: "magicShield",
          src: "img/artifacts/magicShield.png",
          rarity: "royalblue",
          title: "Магический Щит",
          descr:
            "Увеличивает защиту на 2 и макс.здоровье на 25, также при получении урона, есть шанс получить 1 к мане",
          useArt: function () {
            incSecondaryStatHero("def", 2);
            incMaxHPHero(25);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            hero.arts.magicshield = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "frostSword":
        return {
          name: "frostSword",
          src: "img/artifacts/frostSword.png",
          rarity: "royalblue",
          title: "Ледяной Меч",
          descr: "Увеличивает атаку на 4, ваши критические удары генерируют 2 маны",
          useArt: function () {
            incAttackHero(4, 4);
            hero.arts.frostsword = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "leatherBracers":
        return {
          name: "leatherBracers",
          src: "img/artifacts/leatherBracers.png",
          rarity: "limegreen",
          title: "Кожанные Наручи",
          descr: "Увеличивает защиту и уклонение на 1 и адаптацию на 10%",
          useArt: function () {
            incSecondaryStatHero("def", 1);
            incSecondaryStatHero("dodge", 1);
            incSecondaryStatHero("adapt", 10);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "glassesMiner":
        return {
          name: "glassesMiner",
          src: "img/artifacts/glassesMiner.png",
          rarity: "limegreen",
          title: "Очки Шахтера",
          descr: "Увеличивает защиту и удачу на 1 и адаптацию на 10%",
          useArt: function () {
            incSecondaryStatHero("def", 1);
            incSecondaryStatHero("luck", 1);
            incSecondaryStatHero("adapt", 10);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "sphereOfPower":
        return {
          name: "sphereOfPower",
          src: "img/artifacts/sphereOfPower.png",
          rarity: "gold",
          title: "Сфера Силы",
          descr: "Увеличивает атаку и силу магии на 2, а также получение маны за удар увеличено на 1",
          useArt: function () {
            incAttackHero(2, 2);
            incSecondaryStatHero("magicPower", 2);
            !hero.bonusMP ? (hero.bonusMP = 1) : (hero.bonusMP += 1);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "spark":
        return {
          name: "spark",
          src: "img/artifacts/spark.png",
          rarity: "limegreen",
          title: "Волшебная Искра",
          descr: "Увеличивает ваше максимальное здоровье и ману на 35, и сразу исцеляет вас на 70",
          useArt: function () {
            incMaxHPHero(35);
            changeHpHero(70);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            incMaxMPHero(35);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "sphereDM":
        return {
          name: "sphereDM",
          src: "img/artifacts/bossArts/sphereDM.png",
          rarity: "blueviolet",
          title: "Сердце алмазного гиганта",
          descr: "При получении смертельного урона, наделяет неуязвимостью на 2 хода",
          useArt: function () {
            incSecondaryStatHero("adapt", 10);
            hero.arts.sphereDM = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "iceDM":
        return {
          name: "iceDM",
          src: "img/artifacts/bossArts/iceDM.png",
          rarity: "blueviolet",
          title: "Первородный Алмаз",
          descr: "Увеличивает вашу защиту на 7 и удачу на 3%",
          useArt: function () {
            incSecondaryStatHero("def", 7);
            incSecondaryStatHero("luck", 3);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "staffOmbal":
        return {
          name: "staffOmbal",
          src: "img/artifacts/bossArts/staffOmbal.png",
          rarity: "blueviolet",
          title: "Жезл Омбала",
          descr:
            "Сила магии + 5. После каждых 5 ходов жезл выплескивает накопившуюся в себе волшебную силу и наносит врагу урон в размере 20% вашего макс.здоровья",
          useArt: function () {
            incSecondaryStatHero("magicPower", 5);
            hero.arts.staffOmbal = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "ringOmbal":
        return {
          name: "ringOmbal",
          src: "img/artifacts/bossArts/ringOmbal.png",
          rarity: "blueviolet",
          title: "Кольцо жизненной силы",
          descr: "Увеличивает максимальный запас здоровье на 110",
          useArt: function () {
            incMaxHPHero(110);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "pumpkinMimic":
        return {
          name: "pumpkinMimic",
          src: "img/artifacts/bossArts/pumpkinMimic.png",
          rarity: "blueviolet",
          title: "Голова Мимика",
          descr:
            "Вы заключает сделку с предвестником апокалипсиса. Увеличивает вашу атаку на 12, и силу крит.удара на 20% - взамен уменьшая ваше максимальное здоровье на 60",
          useArt: function () {
            incMaxHPHero(-60);
            changeHpHero(-60);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            incAttackHero(12, 12);
            incSecondaryStatHero("critPower", 20);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "darknessMimic":
        return {
          name: "darknessMimic",
          src: "img/artifacts/bossArts/darknessMimic.png",
          rarity: "blueviolet",
          title: "Cфера Мрака",
          descr:
            "При получнии урона, сфера может погрузить мир во тьму, повышая ваше уклонение на 25% на 3 хода и исцеляя вам 3% здоровья каждый ваш ход.",
          useArt: function () {
            hero.arts.darknessMimic = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "fangOrk":
        return {
          name: "fangOrk",
          src: "img/artifacts/bossArts/fangOrk.png",
          rarity: "blueviolet",
          title: "Клык вождя орков",
          descr: "Повышает атаку на 25% от текущей, и шанс крит.удара на 6%",
          useArt: function () {
            let buffAttack0 = Math.round(hero.attack[0] * 0.25);
            let buffAttack1 = Math.round(hero.attack[1] * 0.25);
            incAttackHero(buffAttack0, buffAttack1);
            incSecondaryStatHero("critChance", 6);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "bloodOrk":
        return {
          name: "bloodOrk",
          src: "img/artifacts/bossArts/bloodOrk.png",
          rarity: "blueviolet",
          title: "Кровь вождя орков",
          descr:
            "Если здоровье падает ниже 25%, вы исцеляетесь на 10% от вашего макс.здоровья и наносите врагу столько же урона. Срабатывает один раз за бой",
          useArt: function () {
            hero.arts.bloodOrk = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "apple":
        return {
          name: "apple",
          src: "img/artifacts/apple.png",
          rarity: "limegreen",
          title: "Яблочко",
          descr: "Исцеляет на 175 очков здоровья и увеличивает удачу на 5",
          useArt: function () {
            changeHpHero(175);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            incSecondaryStatHero("luck", 5);
            alert("вы получили Яблочко и скушали его");
          },
        };
      case "goldBelt":
        return {
          name: "goldBelt",
          src: "img/artifacts/goldBelt.png",
          rarity: "limegreen",
          title: "Золотой Пояс",
          descr: "Увеличивает максимальное здоровье на 50 и удачу на 4",
          useArt: function () {
            incMaxHPHero(50);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            incSecondaryStatHero("luck", 4);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "dwarfHammer":
        return {
          name: "dwarfHammer",
          src: "img/artifacts/dwarfHammer.png",
          rarity: "limegreen",
          title: "Молот Дворфов",
          descr: "Увеличивает атаку на 4 и максимальное здоровье на 60, но снижает адаптацию на 8% ",
          useArt: function () {
            incMaxHPHero(60);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            incAttackHero(4, 4);
            incSecondaryStatHero("adapt", -8);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "iceAxe":
        return {
          name: "iceAxe",
          src: "img/artifacts/iceAxe.png",
          rarity: "limegreen",
          title: "Топор Варвара",
          descr: "Увеличивает атаку на 5, а шанс крит.удара на 3%",
          useArt: function () {
            incAttackHero(5, 5);
            incSecondaryStatHero("critChance", 3);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "goldCrown":
        return {
          name: "goldCrown",
          src: "img/artifacts/goldCrown.png",
          rarity: "royalblue",
          title: "Золотая Корона",
          descr: "Увеличивает получаемое золото на 20%",
          useArt: function () {
            hero.goldMod += 0.2;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "redDagger":
        return {
          name: "redDagger",
          src: "img/artifacts/redDagger.png",
          rarity: "gold",
          title: "Алый Кинжал",
          descr: "Увеличивает атаку на 7, также при атаке есть шанс проигнорировать защиту противника",
          useArt: function () {
            incAttackHero(7, 7);
            hero.arts.redDagger = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "gnomeShield":
        return {
          name: "gnomeShield",
          src: "img/artifacts/gnomeShield.png",
          rarity: "gold",
          title: "Щит Гномов",
          descr: "Увеличивает защиту на 4, также дает шанс заблокировать атаку противника",
          useArt: function () {
            incSecondaryStatHero("def", 4);
            hero.arts.gnomeShield = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "blackRaven":
        return {
          name: "blackRaven",
          src: "img/artifacts/blackRaven.png",
          rarity: "gold",
          title: "Ворон Смерти",
          descr:
            "С некоторой вероятностью при атаке ворон проклинает вашего врага, после чего он умирает, а вы получаете 20% ущерба от нанесенного урона вороном",
          useArt: function () {
            hero.arts.blackRaven = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "boots":
        return {
          name: "boots",
          src: "img/artifacts/boots.png",
          rarity: "limegreen",
          title: "Сапожки",
          descr: "Увеличивает защиту на 1 и повышает уклонение на 6%",
          useArt: function () {
            incSecondaryStatHero("def", 1);
            incSecondaryStatHero("dodge", 6);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "bronzeAxe":
        return {
          name: "bronzeAxe",
          src: "img/artifacts/bronzeAxe.png",
          rarity: "limegreen",
          title: "Бронзовый Топор",
          descr: "Увеличивает максимальную aтаку на 4, а минимальную атаку на 9",
          useArt: function () {
            incAttackHero(9, 4);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "fieryHand":
        return {
          name: "fieryHand",
          src: "img/artifacts/fieryHand.png",
          rarity: "gold",
          title: "Огненная Кожа",
          descr: "Увеличивает защиту на 3, также при получении урона есть шанс вернуть часть урона в противника",
          useArt: function () {
            incSecondaryStatHero("def", 3);
            hero.arts.fieryHand = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "shieldAndSword":
        return {
          name: "shieldAndSword",
          src: "img/artifacts/shieldAndSword.png",
          rarity: "limegreen",
          title: "Щит и Меч",
          descr: "Увеличивает защиту на 2, и атаку на 5",
          useArt: function () {
            incSecondaryStatHero("def", 2);
            incAttackHero(5, 5);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "cursedSkull":
        return {
          name: "cursedSkull",
          src: "img/artifacts/cursedSkull.png",
          rarity: "gold",
          title: "Проклятый Череп",
          descr:
            "Вы разово теряете 80 здоровья на усиление атаки на 10 и силы крит.удара на 25%, а защита снижается на 3",
          useArt: function () {
            changeHpHero(-80);
            hero.def -= 3;
            incSecondaryStatHero("critPower", 25);
            incSecondaryStatHero("def", -3);
            incAttackHero(10, 10);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "fieryFist":
        return {
          name: "fieryFist",
          src: "img/artifacts/fieryFist.png",
          rarity: "gold",
          title: "Кулак Ярости",
          descr: "Увеличивает атаку на 6, если здоровье в бою ниже 30%, то получаете еще дополнительно 30 атаки",
          useArt: function () {
            hero.arts.fieryFist = true;
            incAttackHero(6, 6);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "flacon":
        return {
          name: "flacon",
          src: "img/artifacts/flacon.png",
          rarity: "royalblue",
          title: "Флакон Здоровья",
          descr: "Полностью исцеляет при получении и пассивно увеличивает регенерацию здоровья на 20",
          useArt: function () {
            changeHpHero(hero.maxHPHero);
            hero.regeneration += 20;
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "spear":
        return {
          name: "spear",
          src: "img/artifacts/spear.png",
          rarity: "limegreen",
          title: "Копьё Рыцаря",
          descr: "Увеличивает максимальную атаку на 7 и силу крит.удара на 20%",
          useArt: function () {
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_2__["default"])(".attackMax", 7);
            incSecondaryStatHero("critPower", 20);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "ironArmor":
        return {
          name: "ironArmor",
          src: "img/artifacts/ironArmor.png",
          rarity: "limegreen",
          title: "Железная Кираса",
          descr: "Увеличивает защиту на 3 и максимальное здоровье на 25",
          useArt: function () {
            incMaxHPHero(25);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            incSecondaryStatHero("def", 3);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "clover":
        return {
          name: "clover",
          src: "img/artifacts/clover.png",
          rarity: "limegreen",
          title: "Клевер",
          descr: "Увеличивает удачу на 8",
          useArt: function () {
            incSecondaryStatHero("luck", 8);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "amulet":
        return {
          name: "amulet",
          src: "img/artifacts/amulet.png",
          rarity: "limegreen",
          title: "Aмулет Жизни",
          descr: "Увеличивает максимальный запас здоровья на 40, силу магии на 4 и регенерацию здоровья на 10",
          useArt: function () {
            incSecondaryStatHero("magicPower", 4);
            incMaxHPHero(40);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            hero.regeneration += 10;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "dagger":
        return {
          name: "dagger",
          src: "img/artifacts/dagger.png",
          rarity: "limegreen",
          title: "Кинжал",
          descr: "Увеличивает шанс крит.удара на 7%",
          useArt: function () {
            incSecondaryStatHero("critChance", 7);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "heart":
        return {
          name: "heart",
          src: "img/artifacts/heart.png",
          rarity: "limegreen",
          title: "Сердце",
          descr: "Увеличивает максимальное здоровье на 70, и сразу же исцеляет на 70",
          useArt: function () {
            changeHpHero(70);
            incMaxHPHero(70);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "phoenix":
        return {
          name: "phoenix",
          src: "img/artifacts/phoenix.png",
          rarity: "royalblue",
          title: "Крылья Феника",
          descr: "Возрождает вас единожды после смерти",
          useArt: function () {
            hero.arts.phoenix = true;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "sword":
        return {
          name: "sword",
          src: "img/artifacts/sword.png",
          rarity: "limegreen",
          title: "Меч",
          descr: "Увеличивает атаку на 7",
          useArt: function () {
            incAttackHero(7, 7);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "mace":
        return {
          name: "mace",
          src: "img/artifacts/mace.png",
          rarity: "limegreen",
          title: "Булава",
          descr: "Увеличивает максимальную атаку на 13",
          useArt: function () {
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_2__["default"])(".attackMax", 13);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "magicBall":
        return {
          name: "magicBall",
          src: "img/artifacts/magic_ball.png",
          rarity: "limegreen",
          title: "Магический Шар",
          descr: "Увеличивает уклонение, адаптацию на 5%, и силу магии на 5",
          useArt: function () {
            incSecondaryStatHero("magicPower", 5);
            incSecondaryStatHero("dodge", 5);
            incSecondaryStatHero("adapt", 5);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "vampiric":
        return {
          name: "vampiric",
          src: "img/artifacts/vampiric.png",
          rarity: "royalblue",
          title: "Клыки Вампира",
          descr: "Увеличивает вампиризм на 8%",
          useArt: function () {
            hero.vampiric += 8;
            alert(`вы получили: ${this.title}`);
          },
        };
      case "goldSword":
        return {
          name: "goldSword",
          src: "img/artifacts/gold_sword.png",
          rarity: "gold",
          title: "Золотой Меч",
          descr: "Увеличивает атаку на 12",
          useArt: function () {
            incAttackHero(12, 12);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "helmet":
        return {
          name: "helmet",
          src: "img/artifacts/helmet.png",
          rarity: "gold",
          title: "Шлем Варвара",
          descr: "Увеличивает защиту на 3 и вампиризм на 9%",
          useArt: function () {
            hero.vampiric += 9;
            incSecondaryStatHero("def", 3);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "eyeFirst":
        return {
          name: "eyeFirst",
          src: "img/artifacts/eye_first.png",
          rarity: "gold",
          title: "Левый глаз демона",
          descr: "Увеличивает максимальное здоровье на 75 и адаптацию на 15%",
          useArt: function () {
            incMaxHPHero(75);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            incSecondaryStatHero("adapt", 15);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "eyeSecond":
        return {
          name: "eyeSecond",
          src: "img/artifacts/eye_second.png",
          rarity: "gold",
          title: "Правый глаз демона",
          descr: "Увеличивает шанс крит. удара на 9% и адаптацию на 15%",
          useArt: function () {
            incSecondaryStatHero("critChance", 9);
            incSecondaryStatHero("adapt", 15);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "knightArmor":
        return {
          name: "knightArmor",
          src: "img/artifacts/knightArmor.png",
          rarity: "royalblue",
          title: "Доспех Рыцаря",
          descr: "Увеличивает защиту на 4 и удачу на 2",
          useArt: function () {
            incSecondaryStatHero("def", 4);
            incSecondaryStatHero("luck", 2);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "leatherArmor":
        return {
          name: "leatherArmor",
          src: "img/artifacts/leatherArmor.png",
          rarity: "limegreen",
          title: "Кожаный Доспех",
          descr: "Увеличивает защиту на 2 и уклонение на 4%",
          useArt: function () {
            incSecondaryStatHero("def", 2);
            incSecondaryStatHero("dodge", 4);
            alert(`вы получили: ${this.title}`);
          },
        };
      case "gauntletGloves":
        return {
          name: "gauntletGloves",
          src: "img/artifacts/gauntletGloves.png",
          rarity: "limegreen",
          title: "Железные Перчатки",
          descr: "Увеличивает защиту на 2 и адаптацию на 8%",
          useArt: function () {
            incSecondaryStatHero("def", 2);
            incSecondaryStatHero("adapt", 8);
            alert(`вы получили: ${this.title}`);
          },
        };
      default:
        console.log("что-то не так");
    }

    function incMaxHPHero(value) {
      let hpMax = hero.maxHPHero;
      hpMax = +hpMax + value;
      (0,_update_stats__WEBPACK_IMPORTED_MODULE_2__["default"])(".hpMax", value);
      document.querySelector(".hero_hp").setAttribute("data-hp", hpMax);
    }

    function incMaxMPHero(value) {
      hero.MaxMPHero = +hero.maxMPHero + +value;
      document.querySelector(".hero_mp").setAttribute("data-mp", hero.MaxMPHero);
      (0,_calc_mp__WEBPACK_IMPORTED_MODULE_1__["default"])(hero.mana);
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

    function changeHpHero(value) {
      hero.hp + value > hero.maxHPHero ? (hero.hp = hero.maxHPHero) : (hero.hp += value);
    }
  }

  function chooseArt(firstArtObject, secondArtObject) {
    //// тут

    function artsGetStyle(artObject, artWpapper) {
      artWpapper.setAttribute("art-name", artObject.name);

      artWpapper.style.backgroundColor = artObject.rarity;
      appendArt(artObject, artWpapper);
    }

    artsGetStyle(firstArtObject, artItems[0]);
    artsGetStyle(secondArtObject, artItems[1]);

    artWindow.style.display = "block";
    // document.body.style.overflow = "hidden";

    btnArtChoose.addEventListener(
      "click",
      () => {
        artItems.forEach((item) => {
          if (item.getAttribute("data-art") == 1) {
            let artName = item.getAttribute("art-name");
            artContent.appendChild(item.firstChild);
            // useArtifact(artName, hero);
            getDataArt(artName).useArt();
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
}

artItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log(item);

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

function appendArt(artObj, content = artContent) {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getXp);


/***/ }),

/***/ "./src/js/modules/audio/audio.js":
/*!***************************************!*\
  !*** ./src/js/modules/audio/audio.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "setAudioToHero": () => (/* binding */ setAudioToHero)
/* harmony export */ });
// Main
const AudioBackground = new Audio("./audio/background.mp3");
decVolume(AudioBackground, 0.1);
const AudioClickSliderArrows = new Audio("./audio/click_slider-arrows.mp3");
decVolume(AudioClickSliderArrows, 0.5);
const AudioHeroChosen = new Audio("./audio/hero_chosen.mp3");
decVolume(AudioHeroChosen, 0.3);
// sword Strikes
const AudioSwordStrike = new Audio("./audio/sword_strike.mp3");
decVolume(AudioSwordStrike, 0.1);
const AudioSwordStrike2 = new Audio("./audio/sword_strike_2.mp3");
decVolume(AudioSwordStrike2, 0.1);
const AudioSwordStrike3 = new Audio("./audio/sword_strike_3.mp3");
decVolume(AudioSwordStrike3, 0.1);
const AudioSwordCrit = new Audio("./audio/sword_strike_crit.mp3");
decVolume(AudioSwordCrit, 0.2);
// punch Strikes
const AudioPunchStrike = new Audio("./audio/punch_strike.mp3");
decVolume(AudioPunchStrike, 0.1);
const AudioPunchStrike2 = new Audio("./audio/punch_strike_2.mp3");
decVolume(AudioPunchStrike2, 0.1);
const AudioPunchStrike3 = new Audio("./audio/punch_strike_3.mp3");
decVolume(AudioPunchStrike3, 0.1);
const AudioPunchCrit = new Audio("./audio/punch_strike_crit.mp3");
decVolume(AudioPunchCrit, 0.2);
// staff Strikes
const AudioStaffStrike = new Audio("./audio/staff_strike.mp3");
decVolume(AudioStaffStrike, 0.1);
const AudioStaffStrike2 = new Audio("./audio/staff_strike_2.mp3");
decVolume(AudioStaffStrike2, 0.1);
const AudioStaffStrike3 = new Audio("./audio/staff_strike_3.mp3");
decVolume(AudioStaffStrike3, 0.1);
const AudioStaffCrit = new Audio("./audio/staff_strike_crit.mp3");
decVolume(AudioStaffCrit, 0.2);
// Miss Attack
const AudioMissAttack = new Audio("./audio/miss_attack.mp3");
decVolume(AudioMissAttack, 0.2);
// get Demage Man
const AudioGetDemageMan = new Audio("./audio/get_demage_man.mp3");
decVolume(AudioGetDemageMan, 0.1);
const AudioGetDemageMan2 = new Audio("./audio/get_demage_man_2.mp3");
decVolume(AudioGetDemageMan2, 0.1);
const AudioGetDemageMan3 = new Audio("./audio/get_demage_man_3.mp3");
decVolume(AudioGetDemageMan3, 0.1);
const AudioGetDemageMan4 = new Audio("./audio/get_demage_man_4.mp3");
decVolume(AudioGetDemageMan4, 0.1);
// get Demage Woman
const AudioGetDemageWoman = new Audio("./audio/get_demage_woman.mp3");
decVolume(AudioGetDemageWoman, 0.1);
const AudioGetDemageWoman2 = new Audio("./audio/get_demage_woman_2.mp3");
decVolume(AudioGetDemageWoman2, 0.1);
const AudioGetDemageWoman3 = new Audio("./audio/get_demage_woman_3.mp3");
decVolume(AudioGetDemageWoman3, 0.1);
const AudioGetDemageWoman4 = new Audio("./audio/get_demage_woman_4.mp3");
decVolume(AudioGetDemageWoman4, 0.1);
// skills
const AudioSkillWarrior = new Audio("./audio/skills/skill_warrior.mp3");
decVolume(AudioSkillWarrior, 0.3);
const AudioSkillRogue = new Audio("./audio/skills/skill_rogue.mp3");
decVolume(AudioSkillRogue, 0.7);
const AudioSkillMonk = new Audio("./audio/skills/skill_monk.mp3");
decVolume(AudioSkillMonk, 0.3);
const AudioSkillJester = new Audio("./audio/skills/skill_jester.mp3");
decVolume(AudioSkillJester, 0.9);
const AudioSkillDryad = new Audio("./audio/skills/skill_dryad.mp3");
decVolume(AudioSkillDryad, 0.4);
const AudioSkillMechanic = new Audio("./audio/skills/skill_mechanic.mp3");
decVolume(AudioSkillMechanic, 0.5);
const AudioSkillWitchmag = new Audio("./audio/skills/skill_witchmag.mp3");
decVolume(AudioSkillWitchmag, 0.5);

const AudioSkillMageFire = new Audio("./audio/skills/skill_mage_fire.mp3");
decVolume(AudioSkillMageFire, 0.5);
const AudioSkillMageIceBlock = new Audio("./audio/skills/skill_mage_ice_block.mp3");
decVolume(AudioSkillMageIceBlock, 0.3);
const AudioSkillMageIceDestr = new Audio("./audio/skills/skill_mage_ice_destr.mp3");
decVolume(AudioSkillMageIceDestr, 0.5);
const AudioSkillMageIceCreate = new Audio("./audio/skills/skill_mage_ice_create.mp3");
decVolume(AudioSkillMageIceCreate, 0.3);
const AudioSkillMageLightning = new Audio("./audio/skills/skill_mage_lightning.mp3");
decVolume(AudioSkillMageLightning, 0.5);

function decVolume(audio, volume) {
  audio.volume = volume;
}

function AudioAction(audio, action) {
  if (action === "loop") {
    getAudio(audio).loop = true;
  } else if (action === "stop") {
    getAudio(audio).pause();
  } else {
    getAudio(audio).play();
  }

  function getAudio(audio) {
    switch (audio) {
      case "background":
        return AudioBackground;
      case "heroChosen":
        return AudioHeroChosen;
      case "clickSliderArrow":
        return AudioClickSliderArrows;
      case "swordStrike":
        const audioSwordArr = [AudioSwordStrike, AudioSwordStrike2, AudioSwordStrike3];
        const audioSwordNum = Math.floor(Math.random() * audioSwordArr.length);
        return audioSwordArr[audioSwordNum];
      case "swordCrit":
        return AudioSwordCrit;
      case "punchStrike":
        const audioPunchArr = [AudioPunchStrike, AudioPunchStrike2, AudioPunchStrike3];
        const audioPunchNum = Math.floor(Math.random() * audioPunchArr.length);
        return audioPunchArr[audioPunchNum];
      case "punchCrit":
        return AudioPunchCrit;
      case "staffStrike":
        const audioStaffArr = [AudioStaffStrike, AudioStaffStrike2, AudioStaffStrike3];
        const audioStaffNum = Math.floor(Math.random() * audioStaffArr.length);
        return audioStaffArr[audioStaffNum];
      case "staffCrit":
        return AudioStaffCrit;
      case "getDemageMan":
        const audioManArr = [AudioGetDemageMan, AudioGetDemageMan2, AudioGetDemageMan3];
        const audioManNum = Math.floor(Math.random() * audioManArr.length);
        return audioManArr[audioManNum];
      case "getCritDemageMan":
        return AudioGetDemageMan4;
      case "getDemageWoman":
        const audioWomanArr = [AudioGetDemageWoman, AudioGetDemageWoman2, AudioGetDemageWoman3];
        const audioWomanNum = Math.floor(Math.random() * audioWomanArr.length);
        return audioWomanArr[audioWomanNum];
      case "getCritDemageWoman":
        return AudioGetDemageWoman4;
      case "missAttack":
        return AudioMissAttack;
      case "skillWARRIOR":
        return AudioSkillWarrior;
      case "skillROGUE":
        return AudioSkillRogue;
      case "skillMONK":
        return AudioSkillMonk;
      case "skillJESTER":
        return AudioSkillJester;
      case "skillDRYAD":
        return AudioSkillDryad;
      case "skillMECHANIC":
        return AudioSkillMechanic;
      case "skillWITCHMAG":
        return AudioSkillWitchmag;
      case "skillMAGE_fire":
        return AudioSkillMageFire;
      case "skillMAGE_iceCreate":
        return AudioSkillMageIceCreate;
      case "skillMAGE_iceBlock":
        return AudioSkillMageIceBlock;
      case "skillMAGE_iceDestr":
        return AudioSkillMageIceDestr;
      case "skillMAGE_lightning":
        return AudioSkillMageLightning;
    }
  }
}

function setAudioToHero(hero) {
  hero.audio = {};
  switch (hero.name) {
    case "warrior":
    case "rogue":
    case "witchmag":
      hero.audio.attack = () => AudioAction("swordStrike");
      hero.audio.crit = () => AudioAction("swordCrit");
      break;
    case "monk":
    case "jester":
    case "mechanic":
      hero.audio.attack = () => AudioAction("punchStrike");
      hero.audio.crit = () => AudioAction("punchCrit");
      break;
    case "dryad":
    case "mage":
      hero.audio.attack = () => AudioAction("staffStrike");
      hero.audio.crit = () => AudioAction("staffCrit");
      break;
  }

  switch (hero.sex) {
    case "man":
      hero.audio.getDemage = () => AudioAction("getDemageMan");
      hero.audio.getCrit = () => AudioAction("getCritDemageMan");
      break;
    case "woman":
      hero.audio.getDemage = () => AudioAction("getDemageWoman");
      hero.audio.getCrit = () => AudioAction("getCritDemageWoman");
      break;
  }

  hero.audio.miss = () => AudioAction("missAttack");

  switch (hero.name) {
    case "warrior":
    case "rogue":
    case "monk":
    case "jester":
    case "dryad":
    case "mechanic":
    case "witchmag":
      hero.audio.skill = () => AudioAction(`skill${hero.name.toUpperCase()}`);
      break;
    case "mage":
      hero.audio.skill = {};
      hero.audio.skill.iceCreate = () => AudioAction("skillMAGE_iceCreate");
      hero.audio.skill.iceBlock = () => AudioAction("skillMAGE_iceBlock");
      hero.audio.skill.iceDestr = () => AudioAction("skillMAGE_iceDestr");
      hero.audio.skill.fire = () => AudioAction("skillMAGE_fire");
      hero.audio.skill.lightning = () => AudioAction("skillMAGE_lightning");
      break;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AudioAction);



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
  const barrierBar = hpBar.parentNode.querySelector(".bar__hp-f-barrier");

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
function calcMp(numMp = 0) {
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

/***/ "./src/js/modules/changeBg.js":
/*!************************************!*\
  !*** ./src/js/modules/changeBg.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const mainBg = document.body;
const changeBg = (enemyName) => {
  switch (enemyName) {
    case "greenMonster":
    case "fierySkeleton":
      mainBg.classList.add("dark_forest");
      break;
    case "imps":
    case "titan":
      mainBg.classList.add("hell");
      break;
    case "angelFighter":
    case "whiteDragon":
      mainBg.classList.add("paradise");
      break;
    default:
      null;
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (changeBg);


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

  if (modLuck <= luck) {
    chanceGoldBox++;
    return (0,_heroes__WEBPACK_IMPORTED_MODULE_0__["default"])("enemy", 0);
  } else {
    // const enemyNum = Math.floor(Math.random() * (0 - difficulty + 1)) + difficulty;
    const enemyNum = Math.floor(minLimit + Math.random() * (maxLimit + 1 - minLimit));
    console.log(`${minLimit} - ${maxLimit}`, `: enemy = ${enemyNum}`);

    if (maxLimit <= (0,_heroes__WEBPACK_IMPORTED_MODULE_0__["default"])("count") - 1) {
      // maxLimit += 1;
      maxLimit += 0.75;
    }
    if (minLimit <= (0,_heroes__WEBPACK_IMPORTED_MODULE_0__["default"])("count") - 2) {
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
/* harmony import */ var _mods_mods__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mods/mods */ "./src/js/modules/mods/mods.js");
/* harmony import */ var _specificity_heroes_specificity__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./specificity/heroes_specificity */ "./src/js/modules/specificity/heroes_specificity.js");
/* harmony import */ var _audio_audio__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./audio/audio */ "./src/js/modules/audio/audio.js");










// import monkSpecificity from "./specificity/monk_specificity";



//

//

let regenDryad = 5;
// let comboMechanic;

let manaRegen = 5;

const textRaidLvl = document.querySelector(".text__raid span");

let enemyCount = 0;

function fight(target, assaulter, btnsHidden, btnReload, btnDisplay) {
  let maxHPHero = +document.querySelector(".hero_hp").getAttribute("data-hp");
  let maxHPEnemy = +document.querySelector(".enemy_hp").getAttribute("data-hp");
  target.maxHPEnemy = maxHPEnemy;
  assaulter.maxHPHero = maxHPHero;
  let maxMP = assaulter.maxMPHero;
  // comboMechanic = 0;
  let buffAttack = 0;
  let buffDodge = 0;
  let bloodOrkTrigger = false;
  let darknessStep;
  let staffOmbalStep = 0;
  let sphereDMStep = false;
  _specificity_heroes_specificity__WEBPACK_IMPORTED_MODULE_9__.mechanicSpecificity.use();

  assaulter.stun = 0;

  function battle(target, assaulter) {
    // Вычисление атаки
    function attack(att, def, critChance, critPower, dodge, adapt, absorb = 0) {
      const checkDodge = Math.round(Math.random() * 100) + 1;

      if (checkDodge <= (0,_mods_mods__WEBPACK_IMPORTED_MODULE_8__.dodgeMod)(dodge) - (0,_mods_mods__WEBPACK_IMPORTED_MODULE_8__.adaptMod)(adapt)) {
        return "Промах";
      } else {
        const result = Math.floor(att[0] + Math.random() * (att[1] + 1 - att[0]));
        const сheckCrit = Math.round(Math.random() * 100) + 1;
        if (сheckCrit <= (0,_mods_mods__WEBPACK_IMPORTED_MODULE_8__["critСhanceMod"])(critChance) - (0,_mods_mods__WEBPACK_IMPORTED_MODULE_8__.adaptMod)(adapt)) {
          if (Math.round(result * ((0,_mods_mods__WEBPACK_IMPORTED_MODULE_8__.critPowerMod)(critPower) / 100) - (0,_mods_mods__WEBPACK_IMPORTED_MODULE_8__.defMod)(def)) <= 0) {
            return { dmg: 2, crit: ` Критический удар!` };
          } else {
            return {
              dmg: Math.round(result * (critPower / 100) - (0,_mods_mods__WEBPACK_IMPORTED_MODULE_8__.defMod)(def)) * ((100 - absorb) / 100),
              crit: ` Критический удар!`,
            };
          }
        }
        if (result - (0,_mods_mods__WEBPACK_IMPORTED_MODULE_8__.defMod)(def) <= 0) {
          return { dmg: 1, crit: "" };
        } else {
          return { dmg: Math.round((result - (0,_mods_mods__WEBPACK_IMPORTED_MODULE_8__.defMod)(def)) * ((100 - absorb) / 100)), crit: "" };
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
    if (assaulter.stun) {
      (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Вы оглушены (${assaulter.stun} ход)`, "orange");
      assaulter.stun--;
    } else {
      if (ObjDmg === "Промах") {
        // AudioAction("missAttack");
        assaulter.audio.miss();
        (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])("Промах!", "orange");
        _specificity_heroes_specificity__WEBPACK_IMPORTED_MODULE_9__.mechanicSpecificity.use();

        assaulter.arts.swordKingHell ? swordKingHell(assaulter, target) : null;
      } else {
        // ObjDmg.crit ? AudioAction("swordCrit") : AudioAction("swordStrike");
        ObjDmg.crit ? assaulter.audio.crit() : assaulter.audio.attack();

        let dmgHeroNum = ObjDmg.dmg + buffAttack;

        dmgHeroNum += redDagger(assaulter.arts.redDagger, target.def);
        // mechanic specificify
        useUtilityByHeroName("mechanic", () => (dmgHeroNum = _specificity_heroes_specificity__WEBPACK_IMPORTED_MODULE_9__.mechanicSpecificity.use(dmgHeroNum, target)), []);
        // jester specificify
        useUtilityByHeroName(
          "jester",
          () => (dmgHeroNum = (0,_specificity_heroes_specificity__WEBPACK_IMPORTED_MODULE_9__.jesterSpecificity)(assaulter, dmgHeroNum, target.def)),
          []
        );
        // witchmag specificify
        useUtilityByHeroName(
          "witchmag",
          () => (dmgHeroNum = dmgHeroNum + (0,_specificity_heroes_specificity__WEBPACK_IMPORTED_MODULE_9__.witchmagSpecificity)(assaulter.magicPower)),
          []
        );
        // monk level_2 second
        useUtilityByHeroName("monk", () => monkTiger(assaulter, target), [assaulter.monkTiger, ObjDmg.crit]);
        // monk level_3 first
        useUtilityByHeroName("monk", () => monkLotus(assaulter, target), [assaulter.monkLotus]);
        // monk specificity
        useUtilityByHeroName("monk", () => _specificity_heroes_specificity__WEBPACK_IMPORTED_MODULE_9__.monkSpecificity.use(target), []);
        // mechanic level_1 first
        useUtilityByHeroName("mechanic", () => assaulter.mechanicMaster(assaulter, target), [
          assaulter.mechanicMaster,
        ]);
        // dryad level_4 second
        useUtilityByHeroName("dryad", () => assaulter.dryadMoonlight(assaulter, target), [
          assaulter.dryadMoonlight,
        ]);
        // witchmag level_4 first
        useUtilityByHeroName("witchmag", () => assaulter.witchmagThirstBlade(assaulter, target), [
          assaulter.witchmagThirstBlade,
        ]);

        target.hp -= dmgHeroNum;
        blackRaven(assaulter, target);
        staffOmbal(assaulter, maxHPHero, target, staffOmbalStep);
        thunderHammer(assaulter, target);
        emblemWolf(assaulter, target);

        ObjDmg.crit && assaulter.arts.handKingHell ? handKingHell(target, maxHPEnemy) : null;

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
          ObjDmg.crit && assaulter.arts.frostsword ? (assaulter.mana += 2) : null;
          // assaulter.name == "mage" ? (assaulter.mana += 1) : null;

          // monk level_1 first
          // if (assaulter.name == "monk" && assaulter.monkSnakeStrikes) {
          //   assaulter.mana += assaulter.monkSnakeStrikes();
          // }

          useUtilityByHeroName("monk", () => assaulter.monkSnakeStrikes(), [assaulter.monkSnakeStrikes]);

          if (assaulter.mana > maxMP) {
            assaulter.mana = maxMP;
          }
          (0,_calc_mp__WEBPACK_IMPORTED_MODULE_1__["default"])(assaulter.mana);
        }

        //

        if (target.hp <= 0) {
          clearInterval(battleSetInterval);
          (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Вы нанесли${ObjDmg.crit} ${dmgHeroNum} урона и убили противника`, "white");
          useUtilityByHeroName("rogue", () => assaulter.rogueRewardKill(assaulter, maxHPHero, maxHPEnemy), [
            assaulter.rogueRewardKill,
          ]);
          //
          finishFight();
          return;
        }
        (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Вы нанесли${ObjDmg.crit} ${dmgHeroNum} урона`, "yellow");
      }
    }

    // specificity mage
    if (assaulter.mana < maxMP && assaulter.name == "mage") {
      assaulter.mana += (0,_specificity_heroes_specificity__WEBPACK_IMPORTED_MODULE_9__.mageSpecificity)();
      (0,_calc_mp__WEBPACK_IMPORTED_MODULE_1__["default"])(assaulter.mana);
    }
    staffOmbalStep++;

    setTimeout(() => {
      if (target.hp <= 0) {
        return;
      }
      if (target.stun) {
        (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Враг оглушен (${target.stun} ход)`, "dodgerblue");
        target.stun--;
        return;
      }
      if (ObjDmgEnemy === "Промах") {
        (0,_audio_audio__WEBPACK_IMPORTED_MODULE_10__["default"])("missAttack");
        (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])("Вы увернулись", "green");

        assaulter.arts.robberyCloak ? robberyCloak(assaulter) : null;
        // monk level_2 first
        useUtilityByHeroName("monk", () => monkMantis(assaulter, target), [assaulter.monkMantis]);
        // mage level_3 first
        useUtilityByHeroName("mage", () => mageSkillMage(assaulter), [assaulter.mageSkillMage]);
      } else {
        let dmgEnemyNum = Math.round(ObjDmgEnemy.dmg * target.multiplierDmg);

        if (assaulter.arts.gnomeShield) {
          dmgEnemyNum = gnomeShield(dmgEnemyNum);
        }

        assaulter.arts.magicshield ? magicShield(assaulter) : null;

        assaulter.arts.potion_Hp_Mp ? potion_Hp_Mp(assaulter, maxHPHero) : null;

        if (assaulter.arts.sphereDM) {
          dmgEnemyNum = sphereDM(assaulter, dmgEnemyNum);
        }

        // warrior specificity
        // assaulter.name == "warrior" && ObjDmgEnemy.crit ? (dmgEnemyNum = warriorSpecificity(dmgEnemyNum)) : null;
        useUtilityByHeroName("warrior", () => (dmgEnemyNum = _specificity_heroes_specificity__WEBPACK_IMPORTED_MODULE_9__.warriorSpecificity.use(dmgEnemyNum)), [
          ObjDmgEnemy.crit,
        ]);
        // monk level_4 first
        useUtilityByHeroName("monk", () => (dmgEnemyNum = assaulter.monkPainSuppression(dmgEnemyNum)), [
          assaulter.monkPainSuppression,
        ]);
        // level_4 second
        useUtilityByHeroName("mage", () => assaulter.mageFireShield.takeDmg(target), [assaulter.mageFireShield]);

        // barrier

        function barrier(hero) {
          dmgEnemyNum = Math.round(dmgEnemyNum * 0.75);
          if (hero.barrier - dmgEnemyNum > 0) {
            hero.barrier -= dmgEnemyNum;
            (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Ледяной щит поглотил ${dmgEnemyNum} урона. Прочность: ${hero.barrier}`, "aqua");
            dmgEnemyNum = 0;
            hero.audio.skill.iceBlock();
          } else {
            dmgEnemyNum = -(hero.barrier - dmgEnemyNum);
            hero.hp -= dmgEnemyNum;
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", hero.hp);
            (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Ледяной щит поглотил ${hero.barrier} урона и был разбит`, "aqua");
            hero.barrier = 0;

            hero.mageOnIceShield = false;
            hero.audio.skill.iceDestr();
          }
          // mage level_2 first
          if (hero.name == "mage" && hero.mageShieldReflect) {
            target.hp -= hero.mageShieldReflect();
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".enemy_hp", target.hp);
          }
        }

        if (assaulter.barrier) {
          barrier(assaulter);
        } else {
          assaulter.hp -= dmgEnemyNum;
          (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", assaulter.hp);
        }

        if (dmgEnemyNum > 0) {
          ObjDmgEnemy.crit ? assaulter.audio.getCrit() : assaulter.audio.getDemage();
        }

        // mage level_3 first
        ObjDmgEnemy.crit && assaulter.name == "mage" && assaulter.mageSkillMage ? mageSkillMage(assaulter) : null;

        ObjDmgEnemy.crit && assaulter.arts.emblemDragon ? emblemDragon(assaulter) : null;

        // assaulter.hp -= dmgEnemyNum;
        // calcHp(".hero_hp", assaulter.hp);

        if (assaulter.arts.fieryHand) {
          target.hp -= fieryHand(dmgEnemyNum);
          (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".enemy_hp", target.hp);
        }

        assaulter.arts.bloodOrk && !bloodOrkTrigger ? bloodOrk(assaulter, maxHPHero, target) : null;

        assaulter.arts.fieryFist ? (buffAttack = fieryFist(assaulter, maxHPHero)) : null;

        if (assaulter.hp <= 0) {
          if (assaulter.arts.phoenix) {
            assaulter.hp = +maxHPHero;
            (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(
              `Противник убивает вас, ненеся${ObjDmgEnemy.crit} ${dmgEnemyNum}... но вы крылья феника возрождают вас`,
              "green"
            );
            assaulter.arts.phoenix = false;
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
          // warrior level_4 second
          useUtilityByHeroName("warrior", () => assaulter.warriorRevenge(assaulter, target), [
            assaulter.warriorRevenge,
            ObjDmgEnemy.crit,
          ]);
        }
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".hero_hp", assaulter.hp);
      }
      if (assaulter.arts.darknessMimic) {
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
      useUtilityByHeroName("jester", () => (assaulter.mana += assaulter.jesterShifflDeck()), [
        assaulter.jesterShifflDeck,
      ]);
      if (assaulter.mana > maxMP) {
        assaulter.mana = maxMP;
      }
      (0,_calc_mp__WEBPACK_IMPORTED_MODULE_1__["default"])(assaulter.mana);
    }, 900);

    // mage level_3 second
    useUtilityByHeroName("mage", () => assaulter.magePotionsCooking(), [assaulter.magePotionsCooking]);

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
      hero.goldMod += 0.1;
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

  function useUtilityByHeroName(name, callback, [...trigers]) {
    if (
      assaulter.name === name &&
      !([...trigers].includes(false) || [...trigers].includes(undefined) || [...trigers].includes(""))
    ) {
      callback();
    }
  }

  // mage level_3 first
  function mageSkillMage(hero) {
    hero.mageSkillMage();
  }

  // monk level_2 first
  function monkMantis(hero, enemy) {
    let dmgMantis = hero.monkMantis(hero.dodge);
    if (dmgMantis > 0) {
      dmgMantis - (0,_mods_mods__WEBPACK_IMPORTED_MODULE_8__.defMod)(enemy.def) <= 0 ? (dmgMantis = 1) : null;
      enemy.hp -= dmgMantis - (0,_mods_mods__WEBPACK_IMPORTED_MODULE_8__.defMod)(enemy.def);
      (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Вы контратакавали врага нанеся ${dmgMantis} урона`, "cyan");
      (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".enemy_hp", enemy.hp);
    }
  }
  // monk level_2 second
  function monkTiger(hero, enemy) {
    setTimeout(() => {
      const dmg = hero.monkTiger(hero.attack);
      if (dmg > 0) {
        enemy.hp -= dmg - (0,_mods_mods__WEBPACK_IMPORTED_MODULE_8__.defMod)(enemy.def);
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
        enemy.stun++;
        (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Вы используете технику лотоса, нанося ${dmg} урона, оглушив его`, "magenta");
        (0,_calc_hp__WEBPACK_IMPORTED_MODULE_0__["default"])(".enemy_hp", enemy.hp);
      }
    }, 150);
  }

  function healHP(hero) {
    let extraHP = 35;
    if (hero.regeneration) {
      extraHP += hero.regeneration;
    }
    if (hero.name === "dryad") {
      regenDryad += 1.25;
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

  function emblemWolf(hero, enemy) {
    if (hero.emblemWolf) {
      let chance = Math.floor(Math.random() * 100) + 1;
      if (chance <= 20) {
        const dmg = Math.floor(10 + (maxHPEnemy / 100) * 3);
        enemy.hp -= dmg;
        (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Противник получает дополнительный урон: ${dmg} `, "aqua");
      }
    }
  }

  function emblemDragon(hero) {
    hero.attack[0] += 5;
    hero.attack[1] += 5;
    hero.def += 5;
    (0,_update_stats__WEBPACK_IMPORTED_MODULE_5__["default"])(".attackMin", hero.attack[0], true);
    (0,_update_stats__WEBPACK_IMPORTED_MODULE_5__["default"])(".attackMax", hero.attack[1], true);
    (0,_update_stats__WEBPACK_IMPORTED_MODULE_5__["default"])(".def", hero.def, true);
    setTimeout(() => {
      hero.attack[0] -= 5;
      hero.attack[1] -= 5;
      hero.def -= 5;
      (0,_update_stats__WEBPACK_IMPORTED_MODULE_5__["default"])(".attackMin", hero.attack[0], true);
      (0,_update_stats__WEBPACK_IMPORTED_MODULE_5__["default"])(".attackMax", hero.attack[1], true);
      (0,_update_stats__WEBPACK_IMPORTED_MODULE_5__["default"])(".def", hero.def, true);
    }, 6000);
  }

  function thunderHammer(hero, enemy) {
    if (hero.thunderHammer) {
      let chance = Math.floor(Math.random() * 100) + 1;
      chance < 9 ? enemy.stun++ : null;
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
    if (hero.arts.staffOmbal) {
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

  function blackRaven(hero, enemy) {
    if (hero.arts.blackRaven) {
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
    // let heal = Math.floor((dmg / (100 / hero.vampiric)) * 0.75);
    let heal = Math.floor(dmg * (0,_mods_mods__WEBPACK_IMPORTED_MODULE_8__.vampiricMod)(hero.vampiric));
    // console.log(`Вампиризи = ${heal}`);
    return heal;
  }

  function fieryFist(hero, maxHPHero) {
    if (hero.hp < maxHPHero / (100 / 33)) {
      console.log("берсерк");
      return 30;
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
    constructor(attack, hp, def, critChance, critPower, dodge, luck, adapt, magicPower, maxMp, name) {
      this.attack = attack;
      this.hp = hp;
      this.maxHPHero = hp;
      this.maxMPHero = maxMp;
      this.def = def;
      this.critChance = critChance;
      this.critPower = critPower;
      this.dodge = dodge;
      this.luck = luck;
      this.name = name;
      this.adapt = adapt;
      this.magicPower = magicPower;
      // this.mp = maxMp;
      this.mana = 0;
      this.regeneration = 0;
      this.absorbDamage = 0;
      this.vampiric = 0;
      this.lvl = 1;
      this.talentsPoint = 0;
      this.barrier = 0;
      this.name === "rogue" ? (this.goldMod = 1.1) : (this.goldMod = 1);
      this.stun = 0;
      this.arts = {};
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
      this.stun = 0;
    }
  }
  const heroes = [
    function warrior() {
      // return new Hero([17001, 12760], 700, 5, 17, 160, 5, 7, 11, 15, 160, "warrior");
      return new Hero([25, 32], 350, 7, 17, 155, 5, 6, 11, 15, 160, "warrior");
    },
    function rogue() {
      return new Hero([32, 39], 275, 3, 21, 170, 17, 9, 15, 14, 170, "rogue");
    },
    function monk() {
      return new Hero([23, 28], 340, 1, 15, 175, 24, 12, 21, 20, 200, "monk");
    },
    function jester() {
      return new Hero([22, 35], 300, 0, 16, 200, 18, 17, 10, 23, 200, "jester");
    },
    function dryad() {
      return new Hero([22, 29], 310, 1, 17, 150, 20, 13, 13, 39, 200, "dryad");
    },
    function mechanic() {
      return new Hero([25, 31], 315, 4, 18, 200, 11, 8, 18, 16, 175, "mechanic");
    },
    function witchmag() {
      return new Hero([26, 34], 285, 2, 18, 175, 14, 9, 17, 31, 180, "witchmag");
    },
    function mage() {
      return new Hero([15, 21], 270, 1, 20, 150, 12, 12, 14, 45, 250, "mage");
    },
  ];

  const enemy = [
    function goldBox() {
      return new Enemy([5, 5], 100, 5, 1, 1, 1, 1, "goldBox", "img/enemy/goldBox.png", 50);
    },
    function wolf() {
      return new Enemy([17, 24], 170, 1, 13, 170, 12, 10, "wolf", "img/enemy/wolf.png", 7);
    },
    function goblin() {
      return new Enemy([18, 25], 200, 2, 18, 150, 17, 12, "goblin", "img/enemy/goblin.png", 8);
    },
    function satyr() {
      return new Enemy([20, 25], 170, 1, 14, 150, 27, 10, "satyr", "img/enemy/satyr.png", 9);
    },
    function werewolf() {
      return new Enemy([17, 27], 230, 2, 25, 170, 15, 12, "werewolf", "img/enemy/werewolf.png", 10);
    },
    function ork() {
      return new Enemy([16, 23], 330, 4, 11, 190, 5, 10, "ork", "img/enemy/ork.png", 12);
    },
    function skeleton() {
      return new Enemy([23, 31], 220, 0, 18, 200, 21, 10, "skeleton", "img/enemy/skeleton.png", 13);
    },
    function gnome() {
      return new Enemy([9, 15], 160, 0, 33, 170, 80, 15, "gnome", "img/enemy/gnome.png", 14);
    },
    function tramp() {
      return new Enemy([20, 28], 270, 3, 25, 170, 40, 15, "tramp", "img/enemy/tramp.png", 15);
    },
    function behemoth() {
      return new Enemy([23, 32], 350, 7, 10, 150, 1, 25, "behemoth", "img/enemy/behemoth.png", 16);
    },
    function dragon() {
      return new Enemy([24, 36], 260, 5, 45, 150, 15, 15, "dragon", "img/enemy/dragon.png", 17);
    },
    function guard() {
      return new Enemy([25, 31], 390, 12, 10, 200, 1, 25, "guard", "img/enemy/guard.png", 18);
    },
    function ancientSatyr() {
      return new Enemy([31, 38], 300, 3, 25, 200, 45, 35, "ancientSatyr", "img/enemy/ancientSatyr.png", 19);
    },
    function stoneTroll() {
      return new Enemy([30, 36], 380, 13, 20, 170, 15, 30, "stoneTroll", "img/enemy/stoneTroll.png", 20);
    },
    function trader() {
      return new Enemy([15, 17], 180, 1, 1, 150, 5, 1, "trader", "img/enemy/trader.png", 5);
    },
    function greenMonster() {
      return new Enemy([33, 42], 290, 3, 30, 200, 40, 20, "greenMonster", "img/enemy/greenMonster.png", 21);
    },
    function fierySkeleton() {
      return new Enemy([37, 47], 330, 1, 20, 210, 25, 20, "fierySkeleton", "img/enemy/fierySkeleton.png", 22);
    },
    function cannibal() {
      return new Enemy([38, 48], 480, 9, 25, 150, 1, 20, "cannibal", "img/enemy/cannibal.png", 23);
    },
    function kikimora() {
      return new Enemy([43, 52], 350, 3, 24, 170, 35, 20, "kikimora", "img/enemy/kikimora.png", 25);
    },
    function giantTroll() {
      return new Enemy([46, 53], 510, 10, 30, 150, 22, 20, "giantTroll", "img/enemy/giantTroll.png", 27);
    },
    function spirit() {
      return new Enemy([43, 49], 300, 0, 28, 150, 65, 15, "spirit", "img/enemy/spirit.png", 29);
    },
    function unicorn() {
      return new Enemy([43, 54], 290, 2, 15, 215, 45, 5, "unicorn", "img/enemy/unicorn.png", 31);
    },
    function damn() {
      return new Enemy([48, 58], 370, 4, 45, 150, 40, 25, "damn", "img/enemy/damn.png", 33);
    },
    function dreamEater() {
      return new Enemy([44, 55], 450, 4, 40, 150, 40, 25, "dreamEater", "img/enemy/dreamEater.png", 35);
    },
    function lich() {
      return new Enemy([52, 58], 450, 8, 30, 200, 35, 30, "lich", "img/enemy/lich.png", 37);
    },
    function giantZombie() {
      return new Enemy([48, 59], 570, 16, 33, 175, 1, 20, "giantZombie", "img/enemy/giantZombie.png", 39);
    },
    function cyclops() {
      return new Enemy([52, 60], 580, 13, 25, 175, 5, 5, "cyclops", "img/enemy/cyclops.png", 41);
    },
    function goldDragon() {
      return new Enemy([52, 62], 550, 25, 20, 190, 10, 35, "goldDragon", "img/enemy/goldDragon.png", 100);
    },
    function SeaZombie() {
      return new Enemy([63, 73], 430, 7, 25, 210, 30, 25, "SeaZombie", "img/enemy/SeaZombie.png", 43);
    },
    function viking() {
      return new Enemy([54, 67], 610, 16, 33, 150, 20, 30, "viking", "img/enemy/viking.png", 45);
    },
    function imps() {
      return new Enemy([54, 65], 480, 6, 45, 175, 55, 25, "imps", "img/enemy/imps.png", 47);
    },
    function titan() {
      return new Enemy([59, 72], 700, 20, 20, 210, 1, 30, "titan", "img/enemy/titan.png", 49);
    },
    function masterOfMark() {
      return new Enemy([57, 66], 570, 7, 25, 200, 35, 40, "masterOfMark", "img/enemy/masterOfMark.png", 51);
    },
    function diablo() {
      return new Enemy([62, 73], 750, 23, 15, 200, 20, 40, "diablo", "img/enemy/diablo.png", 53);
    },
    function blackDragon() {
      return new Enemy([69, 80], 650, 13, 35, 150, 40, 35, "blackDragon", "img/enemy/blackDragon.png", 55);
    },
    function stoneGiant() {
      return new Enemy([56, 68], 940, 34, 10, 200, 1, 45, "stoneGiant", "img/enemy/stoneGiant.png", 57);
    },
    function evilMonster() {
      return new Enemy([77, 91], 1000, 18, 25, 200, 9, 35, "evilMonster", "img/enemy/evilMonster.png", 59);
    },
    function ghostKnight() {
      return new Enemy([85, 95], 1000, 27, 35, 150, 18, 40, "evilMonster", "img/enemy/ghostKnight.png", 61);
    },
    function AncientButcher() {
      return new Enemy([82, 90], 1150, 15, 20, 225, 8, 45, "AncientButcher", "img/enemy/AncientButcher.png", 63);
    },
    function ermungand() {
      return new Enemy([79, 94], 1200, 27, 33, 175, 20, 50, "ermungand", "img/enemy/ermungand.png", 65);
    },
    function devourer() {
      return new Enemy([88, 96], 1500, 14, 20, 200, 5, 55, "devourer", "img/enemy/devourer.png", 68);
    },
    function demon() {
      return new Enemy([90, 105], 1550, 12, 10, 150, 10, 50, "demon", "img/enemy/demon.png", 71);
    },
    function devil() {
      return new Enemy([105, 120], 1700, 8, 35, 215, 35, 60, "devil", "img/enemy/devil.png", 74);
    },
    function angelFighter() {
      return new Enemy([115, 125], 1555, 15, 55, 155, 55, 55, "angelFighter", "img/enemy/angelFighter.png", 78);
    },
    function whiteDragon() {
      return new Enemy([105, 115], 1800, 20, 30, 175, 60, 60, "whiteDragon", "img/enemy/whiteDragon.png", 82);
    },
    function archangelWarrior() {
      return new Enemy(
        [125, 135],
        1900,
        28,
        25,
        180,
        30,
        60,
        "archangelWarrior",
        "img/enemy/archangelWarrior.png",
        85
      );
    },
    function archangelKnight() {
      return new Enemy(
        [125, 140],
        2050,
        25,
        40,
        175,
        40,
        65,
        "archangelKnight",
        "img/enemy/archangelKnight.png",
        87
      );
    },
    function archangelChampion() {
      return new Enemy(
        [150, 165],
        2100,
        37,
        35,
        200,
        20,
        65,
        "archangelChampion",
        "img/enemy/archangelChampion.png",
        90
      );
    },
    function death() {
      return new Enemy([200, 210], 2500, 15, 70, 300, 55, 99, "death", "img/enemy/death.png", 110);
    },
  ];

  // console.log(enemy.length);
  // console.log(enemy[enemy.length]);

  const boss = [
    function bossOrk() {
      return new Enemy([48, 56], 580, 11, 20, 175, 20, 25, "boss", "img/enemy/bossOrk.png", 50);
    },
    function mimic() {
      return new Enemy([68, 78], 650, 5, 25, 215, 45, 35, "boss", "img/enemy/boss/mimic.png", 75);
    },
    function ombal() {
      return new Enemy([75, 87], 1600, 13, 20, 215, 5, 55, "boss", "img/enemy/boss/ombal.png", 100);
    },
    function diamondMan() {
      return new Enemy([84, 94], 1900, 47, 10, 225, 5, 65, "boss", "img/enemy/boss/diamondMan.png", 125);
    },
    function kingHell() {
      return new Enemy([140, 150], 2350, 35, 35, 250, 20, 75, "boss", "img/enemy/boss/kingHell.png", 150);
    },
    function fireMinotaur() {
      return new Enemy([200, 220], 3400, 28, 40, 275, 10, 85, "boss", "img/enemy/boss/fireMinotaur.png", 250);
    },
    function godDevourer() {
      return new Enemy([280, 350], 5000, 25, 30, 250, 5, 120, "boss", "img/enemy/boss/godDevourer.png", 350);
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

/***/ "./src/js/modules/mods/mods.js":
/*!*************************************!*\
  !*** ./src/js/modules/mods/mods.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "adaptMod": () => (/* binding */ adaptMod),
/* harmony export */   "critPowerMod": () => (/* binding */ critPowerMod),
/* harmony export */   "critСhanceMod": () => (/* binding */ critСhanceMod),
/* harmony export */   "defMod": () => (/* binding */ defMod),
/* harmony export */   "dodgeMod": () => (/* binding */ dodgeMod),
/* harmony export */   "vampiricMod": () => (/* binding */ vampiricMod)
/* harmony export */ });
const critPowerMod = (critPower) => Math.round(critPower * 0.85);
const critСhanceMod = (critChance) => Math.round(critChance * 0.85);
const dodgeMod = (dodge) => Math.round(dodge * 0.85);
const defMod = (def) => Math.round(def * 0.8);
const adaptMod = (adapt) => Math.round(adapt * 0.35);
const vampiricMod = (vampiric) => (vampiric * 0.8) / 100;


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
        maxHpHero += +value;
        document.querySelector(".hero_hp").setAttribute("data-hp", maxHpHero);
        objHero.hp += value;
      } else if (parameter === "attack") {
        objHero.attack[0] += value;
        objHero.attack[1] += value;
        (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMin", value);
        (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".attackMax", value);
      } else if (parameter === "hp") {
        objHero[parameter] += Math.round(maxHpHero / 4);
      } else {
        objHero[parameter] += value;
      }

      updateHero(objHero, maxHpHero);
      (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".hero_hp", objHero.hp);

      goldHero -= price.textContent;

      price.textContent = +price.textContent + 7;
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
/* harmony import */ var _talents_talentsHeroes_witchmag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./talents/talentsHeroes/witchmag */ "./src/js/modules/talents/talentsHeroes/witchmag.js");
/* harmony import */ var _talents_talentsHeroes_mage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./talents/talentsHeroes/mage */ "./src/js/modules/talents/talentsHeroes/mage.js");
/* harmony import */ var _mods_mods__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mods/mods */ "./src/js/modules/mods/mods.js");













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
    mechanic: 70,
    witchmag: 70,
    mage: 30,
  },

  active: false,
  enemy: {},
  maxHPHero: 0,
  monkGates: 0,
  onIceShield: false,

  skills: function (hero, mana) {
    // target.hp = +document.querySelector(".enemy_hp").getAttribute("data-current_hp");
    switch (hero.name) {
      case "warrior":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.warrior) {
          let buffmagicPower = hero.magicPower * 0.0115 + 1;
          // level_1 first
          let dmg = Math.round(50 + hero.def * 2.6 * buffmagicPower * _talents_talentsHeroes_warrior__WEBPACK_IMPORTED_MODULE_3__["default"].levels.level_1.first.init());
          // level_2 first
          _talents_talentsHeroes_warrior__WEBPACK_IMPORTED_MODULE_3__["default"].levels.level_2.first.init(this.enemy);

          this.enemy.hp -= dmg;
          (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Вы наносите удар щитом: ${dmg} урона, и ставите блок`, "cyan");

          if (this.enemy.hp > 0) {
            let buffdef = Math.round(hero.def * 0.8 * buffmagicPower) + 10;
            hero.def += buffdef;

            // level_2 second
            let absorbDmg = _talents_talentsHeroes_warrior__WEBPACK_IMPORTED_MODULE_3__["default"].levels.level_2.second.init();
            hero.absorbDamage += absorbDmg;

            // level_3 first
            _talents_talentsHeroes_warrior__WEBPACK_IMPORTED_MODULE_3__["default"].levels.level_3.first.init(hero, this.maxHPHero);

            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".def", hero.def, true);
            setTimeout(() => {
              hero.def -= buffdef;
              (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".def", hero.def, true);

              hero.absorbDamage -= absorbDmg;
            }, 8000);
          }
          mana -= this.manaCost.warrior;
          hero.audio.skill();
          // mana = 0;
          // this.mana = 0;
        }
        return [mana, this.enemy.hp];

      case "rogue":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.rogue) {
          let buffmagicPower = hero.magicPower * 0.01 + 1;
          let dmg = Math.round(25 + (hero.attack[0] + hero.attack[1]) * 0.6 * buffmagicPower);
          // level_2 second

          dmg += _talents_talentsHeroes_rogue__WEBPACK_IMPORTED_MODULE_4__["default"].levels.level_2.second.init(this.enemy);

          this.enemy.hp -= dmg;
          // level_2 first
          const decDef = Math.round(this.enemy.def / _talents_talentsHeroes_rogue__WEBPACK_IMPORTED_MODULE_4__["default"].levels.level_2.first.init());
          const enemyName = this.enemy.name;
          this.enemy.def -= decDef;
          (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Вы совершаете быстрый, двойной удар: ${dmg} урона`, "cyan");

          // level_3 first
          _talents_talentsHeroes_rogue__WEBPACK_IMPORTED_MODULE_4__["default"].levels.level_3.first.init(hero, dmg, this.maxHPHero);
          // level_3 second
          _talents_talentsHeroes_rogue__WEBPACK_IMPORTED_MODULE_4__["default"].levels.level_3.second.init(hero);

          setTimeout(() => {
            if (enemyName == this.enemy.name) {
              this.enemy.def += decDef;
            }
          }, 6000);
          mana -= this.manaCost.rogue;
          hero.audio.skill();
        }
        return [mana, this.enemy.hp];

      case "monk":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.monk) {
          let buffmagicPower = hero.magicPower * 0.011 + 1;
          const initBuffStats = Math.round(10 * buffmagicPower);
          const buffOfGate = Math.round(this.monkGates * 1.75);
          const finishBuff = initBuffStats + buffOfGate;

          hero.dodge += finishBuff;
          hero.critChance += finishBuff;
          hero.adapt += finishBuff;
          this.monkGates++;

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

            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".dodge", hero.dodge, true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".critChance", hero.critChance, true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".adapt", hero.adapt, true);
          }, 12000);

          mana -= this.manaCost.monk;
          hero.audio.skill();
        }
        return [mana, this.enemy.hp];

      case "jester":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.jester) {
          let buffmagicPower = hero.magicPower * 0.0115 + 1;
          let bonusChance = hero.luck * 0.2;
          let chance = Math.random() * 100 + 1 + bonusChance;
          if (chance <= 33) {
            let bonus = hero.luck * 1.2;
            let heal = 35 + Math.round((this.maxHPHero / 13 + bonus) * buffmagicPower);
            hero.hp + heal > this.maxHPHero ? (hero.hp = this.maxHPHero) : (hero.hp += heal);
            (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`карта:Валет, вы исцеляетесь на ${heal}`, "cyan");
          } else if (chance > 33 && chance <= 58) {
            let bonus = hero.luck * 1.35;
            let dmg = 35 + Math.round((this.enemy.hp / 12 + bonus) * buffmagicPower);
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
          } else if (chance > 77 && chance <= 97) {
            let bonus = hero.luck * 1.45;
            let dmgHeal = 45 + Math.round((this.enemy.hp / 17 + bonus) * buffmagicPower);
            hero.hp + dmgHeal > this.maxHPHero ? (hero.hp = this.maxHPHero) : (hero.hp += dmgHeal);
            this.enemy.hp -= dmgHeal;
            (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Карта:Туз, вы наносите врагу ${dmgHeal} урона и исцеляетесь`, "cyan");
          } else if (chance > 97) {
            let bonus = hero.luck * 1.6;
            let dmg = 50 + Math.round((this.maxHPHero / 14 + bonus) * buffmagicPower);
            this.enemy.hp -= dmg;
            this.enemy.stun += 2;
            (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Карта:Джокер, наносит ${dmg} урона, и оглушает противника на 2 хода`, "cyan");
          }
          // level_3 first
          _talents_talentsHeroes_jester__WEBPACK_IMPORTED_MODULE_5__["default"].levels.level_3.first.init(this.enemy);
          // level_3 second
          _talents_talentsHeroes_jester__WEBPACK_IMPORTED_MODULE_5__["default"].levels.level_3.second.init(hero);
          // level_4 first
          _talents_talentsHeroes_jester__WEBPACK_IMPORTED_MODULE_5__["default"].levels.level_4.first.init(this.enemy);

          mana -= this.manaCost.jester;
          hero.audio.skill();
        }
        return [mana, this.enemy.hp];

      case "dryad":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.dryad) {
          let heal;
          let buffmagicPower = hero.magicPower * 0.022 + 1;
          if (hero.hp <= this.maxHPHero / 5) {
            heal = 60 + Math.round((this.maxHPHero / 13) * buffmagicPower);
          } else {
            heal = 40 + Math.round((this.maxHPHero / 14) * buffmagicPower);
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
          _talents_talentsHeroes_dryad__WEBPACK_IMPORTED_MODULE_6__["default"].levels.level_3.first.init(hero);

          mana -= this.manaCost.dryad;
          hero.audio.skill();
        }
        return [mana, this.enemy.hp];

      case "mechanic":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.mechanic && !this.active) {
          let buffmagicPower = hero.magicPower * 0.011 + 1;
          const buffAttack = Math.round(buffmagicPower * 21);
          const buffMinAttack = Math.round(hero.attack[0] * (buffAttack / 100));
          const buffMaxAttack = Math.round(hero.attack[1] * (buffAttack / 100));
          const buffDefTalent = _talents_talentsHeroes_mechanic__WEBPACK_IMPORTED_MODULE_7__["default"].levels.level_3.second.init();
          const buffDef = Math.round((hero.def * 0.2 + 6 + buffDefTalent) * buffmagicPower);
          const buffAdapt = 30 + _talents_talentsHeroes_mechanic__WEBPACK_IMPORTED_MODULE_7__["default"].levels.level_2.first.init();
          const duration = Math.round(8000 + _talents_talentsHeroes_mechanic__WEBPACK_IMPORTED_MODULE_7__["default"].levels.level_2.second.init());
          this.active = true;
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
          // level_4 second
          hero.mechanicFullCapacity ? hero.mechanicFullCapacity.activate(this.maxHPHero) : null;
          setTimeout(() => {
            hero.def -= buffDef;
            hero.adapt -= buffAdapt;
            hero.attack[0] -= buffMinAttack;
            hero.attack[1] -= buffMaxAttack;
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".def", hero.def, true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".adapt", hero.adapt, true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".attackMin", hero.attack[0], true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_1__["default"])(".attackMax", hero.attack[1], true);
            this.active = false;
            hero.mechanicFullCapacity ? hero.mechanicFullCapacity.deactivate(this.maxHPHero, this.enemy) : null;
          }, duration);
          mana -= this.manaCost.mechanic;
          hero.audio.skill();
        }
        return [mana, this.enemy.hp];

      case "witchmag":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.witchmag) {
          let buffmagicPower = hero.magicPower * 0.018 + 1;

          // level_1 first
          const factorDmg = _talents_talentsHeroes_witchmag__WEBPACK_IMPORTED_MODULE_8__["default"].levels.level_1.first.init();
          let dmg = 17 + Math.round((this.enemy.maxHPEnemy / 60) * buffmagicPower * factorDmg);

          // level_2 second
          const duration = _talents_talentsHeroes_witchmag__WEBPACK_IMPORTED_MODULE_8__["default"].levels.level_2.second.init();
          let count = 0;
          (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Вы накладываете проклятие на противника`, "cyan");

          setTimeout(() => {
            // level_3 first
            hero.witchmagEnchBlade ? hero.witchmagEnchBlade(true) : null;
            hero.witchmagCurseWeakness ? hero.witchmagCurseWeakness.activate(this.enemy) : null;

            const dot = setInterval(() => {
              if (count >= duration || this.enemy.hp <= 0 || hero.hp < 0) {
                clearInterval(dot);
                hero.witchmagCurseWeakness ? hero.witchmagCurseWeakness.deactivate(this.enemy) : null;
                hero.witchmagEnchBlade ? hero.witchmagEnchBlade(false) : null;
              } else {
                this.enemy.hp -= dmg;
                hero.hp += dmg;
                count++;

                // level_2 first
                _talents_talentsHeroes_witchmag__WEBPACK_IMPORTED_MODULE_8__["default"].levels.level_2.first.init(hero);
                // count >= 3 || this.enemy.hp <= 0 ? clearInterval(dot) : count++;
                (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`проклятие высасывает у врага ${dmg} жизненной силы,`, "cyan");
                count >= duration ? _talents_talentsHeroes_witchmag__WEBPACK_IMPORTED_MODULE_8__["default"].levels.level_3.second.init(this.enemy) : null;
                (0,_calc_hp__WEBPACK_IMPORTED_MODULE_2__["default"])(".enemy_hp", this.enemy.hp);
                (0,_calc_hp__WEBPACK_IMPORTED_MODULE_2__["default"])(".hero_hp", hero.hp);
              }
            }, 2000);
          }, 150);

          mana -= this.manaCost.witchmag;
          hero.audio.skill();
        }
        return [mana, this.enemy.hp];

      case "mage":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.mage) {
          let buffmagicPower = hero.magicPower * 0.0255 + 1;

          const fireBoll = () => {
            let dmg = Math.round(5 + (35 + hero.lvl) * buffmagicPower);
            const сheckCrit = Math.round(Math.random() * 100) + 1;
            if (сheckCrit <= (0,_mods_mods__WEBPACK_IMPORTED_MODULE_10__["critСhanceMod"])(hero.critChance) - (0,_mods_mods__WEBPACK_IMPORTED_MODULE_10__.adaptMod)(this.enemy.adapt)) {
              dmg = Math.round(dmg * ((0,_mods_mods__WEBPACK_IMPORTED_MODULE_10__.critPowerMod)(hero.critPower) / 100));
              this.enemy.hp -= dmg;
              (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Вы запускаете огромный огненный шар во врага, нанося ${dmg} урона`, "cyan");
            } else {
              this.enemy.hp -= dmg;
              (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Вы запускаете огненный шар во врага, нанося ${dmg} урона`, "cyan");
            }
            // mage level_2 second
            _talents_talentsHeroes_mage__WEBPACK_IMPORTED_MODULE_9__["default"].levels.level_2.second.init(hero, this.enemy);
            // mage level_4 second
            hero.mageFireShield ? hero.mageFireShield.use() : null;

            hero.audio.skill.fire();
          };
          const iceShield = () => {
            hero.barrier = Math.round(10 + (hero.magicPower + hero.lvl) * 1.1);
            hero.mageOnIceShield = true;
            (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Вы создаете ледяной щит. Прочность: ${hero.barrier}`, "cyan");
            // setTimeout(() => {
            //   hero.absorbDamage = 0;
            //   hero.mageOnIceShield = false;
            // }, 8000);
            hero.audio.skill.iceCreate();
          };
          const thunderСlap = () => {
            const сheckCrit = Math.round(Math.random() * 100) + 1;
            let dmg = Math.round((25 + hero.lvl) * buffmagicPower);
            if (сheckCrit <= (0,_mods_mods__WEBPACK_IMPORTED_MODULE_10__["critСhanceMod"])(hero.critChance) - (0,_mods_mods__WEBPACK_IMPORTED_MODULE_10__.adaptMod)(this.enemy.adapt)) {
              dmg = Math.round(dmg * ((0,_mods_mods__WEBPACK_IMPORTED_MODULE_10__.critPowerMod)(hero.critPower) / 100));
              this.enemy.hp -= dmg;
              (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Вы паражаете врага серией ударов молнии, нанося ${dmg} урона и оглушая его`, "cyan");
            } else {
              this.enemy.hp -= dmg;
              (0,_text__WEBPACK_IMPORTED_MODULE_0__["default"])(`Вы паражаете врага ударом молнии, нанося ${dmg} урона и оглушая его`, "cyan");
            }
            // mage level_4 first
            _talents_talentsHeroes_mage__WEBPACK_IMPORTED_MODULE_9__["default"].levels.level_4.first.init(hero, this.enemy);
            this.enemy.stun++;
            hero.audio.skill.lightning();
          };

          hero.hp > this.maxHPHero / 2 ? fireBoll() : hero.mageOnIceShield ? thunderСlap() : iceShield();

          mana -= this.manaCost.mage;
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
/* harmony import */ var _audio_audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audio/audio */ "./src/js/modules/audio/audio.js");


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
    (0,_audio_audio__WEBPACK_IMPORTED_MODULE_0__["default"])("clickSliderArrow");
  });

  arrowPrev.addEventListener("click", () => {
    plusSlide(-1);
    slidesElem[slideIndex].classList.remove("hidden");
    slidesElem[slideIndex + 4].classList.add("hidden");
    (0,_audio_audio__WEBPACK_IMPORTED_MODULE_0__["default"])("clickSliderArrow");
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliderHero);


/***/ }),

/***/ "./src/js/modules/specificity/heroes_specificity.js":
/*!**********************************************************!*\
  !*** ./src/js/modules/specificity/heroes_specificity.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "jesterSpecificity": () => (/* reexport safe */ _jester_specificity__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "mageSpecificity": () => (/* reexport safe */ _mage_specificity__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "mechanicSpecificity": () => (/* reexport safe */ _mechanic_specificity__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "monkSpecificity": () => (/* reexport safe */ _monk_specificity__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "warriorSpecificity": () => (/* reexport safe */ _warrior_specificity__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "witchmagSpecificity": () => (/* reexport safe */ _witchmag_specificity__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _warrior_specificity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./warrior_specificity */ "./src/js/modules/specificity/warrior_specificity.js");
/* harmony import */ var _monk_specificity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./monk_specificity */ "./src/js/modules/specificity/monk_specificity.js");
/* harmony import */ var _jester_specificity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jester_specificity */ "./src/js/modules/specificity/jester_specificity.js");
/* harmony import */ var _witchmag_specificity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./witchmag_specificity */ "./src/js/modules/specificity/witchmag_specificity.js");
/* harmony import */ var _mechanic_specificity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mechanic_specificity */ "./src/js/modules/specificity/mechanic_specificity.js");
/* harmony import */ var _mage_specificity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mage_specificity */ "./src/js/modules/specificity/mage_specificity.js");















/***/ }),

/***/ "./src/js/modules/specificity/jester_specificity.js":
/*!**********************************************************!*\
  !*** ./src/js/modules/specificity/jester_specificity.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let jesterCombo = 1;
const jesterSpecificity = (hero, dmgHero, enemyDef) => {
  if (jesterCombo < 4) {
    jesterCombo++;
    return dmgHero;
  } else {
    let dmg = Math.round(dmgHero + enemyDef);
    jesterCombo = 1;
    hero.mana += 2;
    return dmg;
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (jesterSpecificity);


/***/ }),

/***/ "./src/js/modules/specificity/mage_specificity.js":
/*!********************************************************!*\
  !*** ./src/js/modules/specificity/mage_specificity.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const bonusMana = 1;
const mageSpecificity = () => {
  return bonusMana;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mageSpecificity);


/***/ }),

/***/ "./src/js/modules/specificity/mechanic_specificity.js":
/*!************************************************************!*\
  !*** ./src/js/modules/specificity/mechanic_specificity.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// const mod = 1.5;
// let mechanicCombo = 1;
// const mechanicSpecificity = (dmgHero) => {
//   if (dmgHero) {
//     if (mechanicCombo > 3) {
//       mechanicCombo = 1;

//       const dmg = Math.round(dmgHero * mod);
//       return dmg;
//     } else {
//       mechanicCombo++;

//       return dmgHero;
//     }
//   } else {
//     mechanicCombo = 1;
//   }
// };

const mechanicSpecificity = {
  mod: 1.5,
  mechanicCombo: 1,
  chanceToStun: 0,
  use: function (dmgHero, enemy) {
    if (dmgHero) {
      if (this.mechanicCombo > 3) {
        const chanceTotal = Math.random() * 100 + 1;
        if (this.chanceToStun >= chanceTotal) {
          enemy.stun++;
        }
        this.mechanicCombo = 1;
        const dmg = Math.round(dmgHero * this.mod);
        return dmg;
      } else {
        this.mechanicCombo++;
        return dmgHero;
      }
    } else {
      this.mechanicCombo = 1;
    }
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mechanicSpecificity);


/***/ }),

/***/ "./src/js/modules/specificity/monk_specificity.js":
/*!********************************************************!*\
  !*** ./src/js/modules/specificity/monk_specificity.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// const chance = 3;
// const monkSpecificity = (enemy) => {
//   const chanceTotal = Math.random() * 100 + 1;
//   if (chance >= chanceTotal) {
//     enemy.stun++;
//   }
// };

const monkSpecificity = {
  chance: 3,
  use: function (enemy) {
    const chanceTotal = Math.random() * 100 + 1;
    if (this.chance >= chanceTotal) {
      enemy.stun++;
    }
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (monkSpecificity);


/***/ }),

/***/ "./src/js/modules/specificity/warrior_specificity.js":
/*!***********************************************************!*\
  !*** ./src/js/modules/specificity/warrior_specificity.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// let mod = 20;
// const warriorSpecificity = (dmg) => {
//   console.log(`${dmg}`, `= ${dmg - dmg * (mod / 100)}`);
//   return Math.round(dmg - dmg * (mod / 100));
// };

const warriorSpecificity = {
  mod: 20,
  use: function (dmg) {
    return Math.round(dmg - dmg * (this.mod / 100));
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (warriorSpecificity);


/***/ }),

/***/ "./src/js/modules/specificity/witchmag_specificity.js":
/*!************************************************************!*\
  !*** ./src/js/modules/specificity/witchmag_specificity.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const witchmagSpecificity = (magicPowerHero) => {
  const mod = 0.1;
  const bonusDmg = Math.round(magicPowerHero * mod);
  console.log(bonusDmg);
  return bonusDmg;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (witchmagSpecificity);


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
  // const container = document.querySelector(".talents__container");
  const head = document.querySelector(".talents__accordion-head");
  head.addEventListener("click", () => {
    console.log("sss");
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
/* harmony import */ var _talentsHeroes_witchmag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./talentsHeroes/witchmag */ "./src/js/modules/talents/talentsHeroes/witchmag.js");
/* harmony import */ var _talentsHeroes_mage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./talentsHeroes/mage */ "./src/js/modules/talents/talentsHeroes/mage.js");









const coreTalents = {
  hero: {},

  setText: function (objTalent) {
    // const level_1_First = document.querySelector(".talents-item.level_1.first"),
    //   level_2_First = document.querySelector(".talents-item.level_2.first"),
    //   level_2_Second = document.querySelector(".talents-item.level_2.second"),
    //   level_3_First = document.querySelector(".talents-item.level_3.first"),
    //   level_3_Second = document.querySelector(".talents-item.level_3.second"),
    //   level_4_First = document.querySelector(".talents-item.level_4.first"),
    //   level_4_Second = document.querySelector(".talents-item.level_4.second");

    let descrArr = [];
    function getItems() {
      const arrItems = document.querySelectorAll(".talents-item");
      arrItems.forEach((item) => {
        const level = item.getAttribute("level-current");
        const branch = item.getAttribute("branch");
        item.style.backgroundImage = objTalent[level][branch].img;
        item.querySelector(".talents__title").textContent = objTalent[level][branch].title;
        descrArr.push(item.querySelectorAll(".descr .text"));
      });
      setDescr();
      return arrItems;
    }

    // const descr_1_1 = level_1_First.querySelectorAll(".descr .text"),
    //   descr_2_1 = level_2_First.querySelectorAll(".descr .text"),
    //   descr_2_2 = level_2_Second.querySelectorAll(".descr .text"),
    //   descr_3_1 = level_3_First.querySelectorAll(".descr .text"),
    //   descr_3_2 = level_3_Second.querySelectorAll(".descr .text"),
    //   descr_4_1 = level_4_First.querySelectorAll(".descr .text"),
    //   descr_4_2 = level_4_Second.querySelectorAll(".descr .text");

    // const descrArrs = [descr_1_1, descr_2_1, descr_2_2, descr_3_1, descr_3_2, descr_4_1, descr_4_2];
    // console.log(descrArrs);

    // level_1_First.style.backgroundImage = objTalent.level_1.first.img;
    // level_2_First.style.backgroundImage = objTalent.level_2.first.img;
    // level_2_Second.style.backgroundImage = objTalent.level_2.second.img;
    // level_3_First.style.backgroundImage = objTalent.level_3.first.img;
    // level_3_Second.style.backgroundImage = objTalent.level_3.second.img;
    // level_4_First.style.backgroundImage = objTalent.level_4.first.img;
    // level_4_Second.style.backgroundImage = objTalent.level_4.second.img;

    // level_1_First.querySelector(".talents__title").textContent = objTalent.level_1.first.title;
    // level_2_First.querySelector(".talents__title").textContent = objTalent.level_2.first.title;
    // level_2_Second.querySelector(".talents__title").textContent = objTalent.level_2.second.title;
    // level_3_First.querySelector(".talents__title").textContent = objTalent.level_3.first.title;
    // level_3_Second.querySelector(".talents__title").textContent = objTalent.level_3.second.title;
    // level_4_First.querySelector(".talents__title").textContent = objTalent.level_4.first.title;
    // level_4_Second.querySelector(".talents__title").textContent = objTalent.level_4.second.title;

    // console.log(descrArrs);

    function setDescr() {
      descrArr.forEach((arr) => {
        let count = 0;

        arr.forEach((descr) => {
          const talantLevel = descr.getAttribute("data-talent-level");
          const talantNum = descr.getAttribute("data-talent");
          descr.textContent = objTalent[talantLevel][talantNum].descr[count++];
        });
      });
    }

    this.setEvent(getItems());
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
                if (level == "level_2") {
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
        _talentsHeroes_witchmag__WEBPACK_IMPORTED_MODULE_6__["default"].init(item, this.hero);
        break;
      case "mage":
        _talentsHeroes_mage__WEBPACK_IMPORTED_MODULE_7__["default"].init(item, this.hero);
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
        this.setText({
          level_1: {
            first: {
              title: "Тежёлый металл",
              descr: [
                "1: Увеличивает урон от Удара щитом на 20%",
                "2: Увеличивает урон от Удара щитом на 28%",
                "3: Увеличивает урон от Удара щитом на 36%",
              ],
              img: "url(./img/icons/talents/warrior/talent_warrior_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Сотрясение",
              descr: ["Удар щитом оглушает противника на 1 ход и навсегда снижает его уклонение на 20%"],
              img: "url(./img/icons/talents/warrior/talent_warrior_2_1.png)",
            },
            second: {
              title: "Защитная стойка",
              descr: ["Блок после Удара щитом дополнительно уменьшает получаемый урон на 25%"],
              img: "url(./img/icons/talents/warrior/talent_warrior_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Ни шагу назад",
              descr: [
                "1: Удар щитом восстанавливает 10% от макс.запаса здоровья ",
                "2: Удар щитом восстанавливает 13% от макс.запаса здоровья ",
                "3: Удар щитом восстанавливает 16% от макс.запаса здоровья ",
              ],
              img: "url(./img/icons/talents/warrior/talent_warrior_3_1.png)",
            },
            second: {
              title: "Укрепленный доспех",
              descr: ["1: Увеличивает защиту на 3", "2: Увеличивает защиту на 6", "3: Увеличивает защиту на 9"],
              img: "url(./img/icons/talents/warrior/talent_warrior_3_2.png)",
            },
          },

          level_4: {
            first: {
              title: "Стойкость берсерка",
              descr: [
                "1: Снижает получаемый урон на 6%, Стойкость к боли снижает критичексий урон на ещё 5% ",
                "2: Снижает получаемый урон на 9%, Стойкость к боли снижает критичексий урон на ещё 10% ",
                "3: Снижает получаемый урон на 12%, Стойкость к боли снижает критичексий урон на ещё 15% ",
              ],
              img: "url(./img/icons/talents/warrior/talent_warrior_4_1.png)",
            },
            second: {
              title: "Реванш",
              descr: [
                "1: При получении критического урона есть 50% шанс нанести врагу удар в размере 100% от атаки героя",
                "2: При получении критического урона есть 60% шанс нанести врагу удар в размере 130% от атаки героя",
                "3: При получении критического урона есть 70% шанс нанести врагу удар в размере 160% от атаки героя",
              ],
              img: "url(./img/icons/talents/warrior/talent_warrior_4_2.png)",
            },
          },
        });
        break;
      case "rogue":
        this.setText({
          level_1: {
            first: {
              title: "Острый кинжал",
              descr: [
                "1: Увеличивает атаку на 3 и шанс крит.удара на 3%",
                "2: Увеличивает атаку на 5 и шанс крит.удара на 4%",
                "3: Увеличивает атаку на 7 и шанс крит.удара на 5%",
              ],
              img: "url(./img/icons/talents/rogue/talent_rogue_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Сокрушение брони",
              descr: ["После Двойного удара ваши атаки игнорируют защиту врага на 100%"],
              img: "url(./img/icons/talents/rogue/talent_rogue_2_1.png)",
            },
            second: {
              title: "Удар в сердце",
              descr: ["Двойной удар наносит дополнительно 14%(боссу: 7%) от макс.здоровья врага"],
              img: "url(./img/icons/talents/rogue/talent_rogue_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Кровавый пир",
              descr: [
                "1: Двойной удар исцеляет на 25% от нанесенного урона",
                "2: Двойной удар исцеляет на 30% от нанесенного урона",
                "3: Двойной удар исцеляет на 35% от нанесенного урона",
              ],
              img: "url(./img/icons/talents/rogue/talent_rogue_3_1.png)",
            },
            second: {
              title: "Уход в тень",
              descr: [
                "1: После Двойного удара уклонение повышается на 40% на 6 секунд",
                "2: После Двойного удара уклонение повышается на 55% на 6 секунд",
                "3: После Двойного удара уклонение повышается на 70% на 6 секунд",
              ],
              img: "url(./img/icons/talents/rogue/talent_rogue_3_2.png)",
            },
          },

          level_4: {
            first: {
              title: "Серия ударов",
              descr: [
                "1: Снижает стоимость маны на Двойной удар на 10",
                "2: Снижает стоимость маны на Двойной удар на 15",
                "3: Снижает стоимость маны на Двойной удар на 20",
              ],
              img: "url(./img/icons/talents/rogue/talent_rogue_4_1.png)",
            },
            second: {
              title: "Награда за расправу",
              descr: [
                "1: Убивая противника, вы исцеляетесь на 8% от его макс.здоровья",
                "2: Убивая противника, вы исцеляетесь на 12% от его макс.здоровья",
                "3: Убивая противника, вы исцеляетесь на 16% от его макс.здоровья",
              ],
              img: "url(./img/icons/talents/rogue/talent_rogue_4_2.png)",
            },
          },
        });
        break;
      case "monk":
        this.setText({
          level_1: {
            first: {
              title: "Удары змеи",
              descr: [
                "1: Увеличивает атаку на 3. Даёт 30% шанс получить единицу маны при атаке",
                "2: Увеличивает атаку на 5. Даёт 40% шанс получить единицу маны при атаке",
                "3: Увеличивает атаку на 7. Даёт 50% шанс получить единицу маны при атаке",
              ],
              img: "url(./img/icons/talents/monk/talent_monk_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Стиль богомола",
              descr: [
                "Дает 33% шанс при уклонении героя, нанести врагу дополнительный удар, равный вашему уклонению",
              ],
              img: "url(./img/icons/talents/monk/talent_monk_2_1.png)",
            },
            second: {
              title: "Стиль Тигра",
              descr: ["Дает 33% шанс при крит.ударе, нанести врагу дополнительный удар, равный вашей атаке"],
              img: "url(./img/icons/talents/monk/talent_monk_2_2.png)",
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
              img: "url(./img/icons/talents/monk/talent_monk_3_1.png)",
            },
            second: {
              title: "Синергия чакр",
              descr: [
                "1: Увеличивает макс.запас здоровья и маны на 40, и регенерацию после боя на 15",
                "2: Увеличивает макс.запас здоровья и маны на 60, и регенерацию после боя на 25",
                "3: Увеличивает макс.запас здоровья и маны на 80, и регенерацию после боя на 35",
              ],
              img: "url(./img/icons/talents/monk/talent_monk_3_2.png)",
            },
          },
          level_4: {
            first: {
              title: "Подавление боли",
              descr: [
                "1: С шансом 18% при получении удара, вы получаете на 20% меньше урона",
                "2: С шансом 22% при получении удара, вы получаете на 25% меньше урона",
                "3: С шансом 26% при получении удара, вы получаете на 30% меньше урона",
              ],
              img: "url(./img/icons/talents/monk/talent_monk_4_1.png)",
            },
            second: {
              title: "Уязвимое место",
              descr: [
                "1: Увеличивает шанс оглушения от Удара по почкам на 2%",
                "2: Увеличивает шанс оглушения от Удара по почкам на 3%",
                "3: Увеличивает шанс оглушения от Удара по почкам на 4%",
              ],
              img: "url(./img/icons/talents/monk/talent_monk_4_2.png)",
            },
          },
        });
        break;

      case "jester":
        this.setText({
          level_1: {
            first: {
              title: "Перетасовка колоды",
              descr: [
                "1: После каждого боя герой воостанавливает 20 маны",
                "2: После каждого боя герой воостанавливает 24 маны",
                "3: После каждого боя герой воостанавливает 28 маны",
              ],
              img: "url(./img/icons/talents/jester/talent_jester_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Везучий тип",
              descr: ["Увеличивает удачу героя на 10"],
              img: "url(./img/icons/talents/jester/talent_jester_2_1.png)",
            },
            second: {
              title: "С молотом наперевес",
              descr: ["Увеличивает атаку на 7, и шанс крит.удара на 7%"],
              img: "url(./img/icons/talents/jester/talent_jester_2_2.png)",
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
              img: "url(./img/icons/talents/jester/talent_jester_3_1.png)",
            },
            second: {
              title: "Мухлёж",
              descr: [
                "1: Есть 18% шанс после использования способности восстановить 40 маны",
                "2: Есть 20% шанс после использования способности восстановить 50 маны",
                "3: Есть 22% шанс после использования способности восстановить 60 маны",
              ],
              img: "url(./img/icons/talents/jester/talent_jester_3_2.png)",
            },
          },
          level_4: {
            first: {
              title: "Взрывной подарок",
              descr: [
                "1: С шансом 23% при использовании способности вы наносите врагу 16%(боссу: 8%) от его макс.здоровья",
                "2: С шансом 28% при использовании способности вы наносите врагу 18%(боссу: 9%) от его макс.здоровья",
                "3: С шансом 33% при использовании способности вы наносите врагу 20%(боссу: 10%) от его макс.здоровья",
              ],
              img: "url(./img/icons/talents/jester/talent_jester_4_1.png)",
            },
            second: {
              title: "Изворотливость",
              descr: [
                "1: Увеличивает уклонение и адаптацию на 6% ",
                "2: Увеличивает уклонение и адаптацию на 9% ",
                "3: Увеличивает уклонение и адаптацию на 12% ",
              ],
              img: "url(./img/icons/talents/jester/talent_jester_4_2.png)",
            },
          },
        });
        break;
      case "dryad":
        this.setText({
          level_1: {
            first: {
              title: "Целительное прикосновение",
              descr: [
                "1: После использования способности, герой восстанавливает каждый ход 4% макс.запаса здоровья в течении 2 ходов",
                "2: После использования способности, герой восстанавливает каждый ход 5% макс.запаса здоровья в течении 2 ходов",
                "3: После использования способности, герой восстанавливает каждый ход 6% макс.запаса здоровья в течении 2 ходов",
              ],
              img: "url(./img/icons/talents/dryad/talent_dryad_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Знак дикой природы",
              descr: ["Увеличивает атаку на 7, защиту на 2 и адаптацию на 18%"],
              img: "url(./img/icons/talents/dryad/talent_dryad_2_1.png)",
            },
            second: {
              title: "Бузиновый посох",
              descr: ["Урон от Вмешательства природы увеличен на 50%"],
              img: "url(./img/icons/talents/dryad/talent_dryad_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Дубовая кожа",
              descr: [
                "1: Вмешательства природы уменьшает получаемый урон на 40% на 2 хода",
                "2: Вмешательства природы уменьшает получаемый урон на 55% на 2 хода",
                "3: Вмешательства природы уменьшает получаемый урон на 70% на 2 хода",
              ],
              img: "url(./img/icons/talents/dryad/talent_dryad_3_1.png)",
            },
            second: {
              title: "Наставление друида",
              descr: [
                "1: Увеличивает силу Магии на 4 и уменьшает на 5 стоимость маны: Вмешательства природы ",
                "2: Увеличивает силу Магии на 6 и уменьшает на 10 стоимость маны: Вмешательства природы ",
                "3: Увеличивает силу Магии на 8 и уменьшает на 15 стоимость маны: Вмешательства природы ",
              ],
              img: "url(./img/icons/talents/dryad/talent_dryad_3_2.png)",
            },
          },
          level_4: {
            first: {
              title: "Облик медведя",
              descr: [
                "1: Увеличивает ваш макс.запас здоровья на 70 и защиту на 3, но уменьшает уклонение на 3%",
                "2: Увеличивает ваш макс.запас здоровья на 105 и защиту на 5, но уменьшает уклонение на 5%",
                "3: Увеличивает ваш макс.запас здоровья на 140 и защиту на 7, но уменьшает уклонение на 7%",
              ],
              img: "url(./img/icons/talents/dryad/talent_dryad_4_1.png)",
            },
            second: {
              title: "Лунный огонь",
              descr: [
                "1: С шансом 16% перед атакой вы наносите дополнительно 80% урона от вашей силы магии",
                "2: С шансом 20% перед атакой вы наносите дополнительно 100% урона от вашей силы магии",
                "3: С шансом 24% перед атакой вы наносите дополнительно 120% урона от вашей силы магии",
              ],
              img: "url(./img/icons/talents/dryad/talent_dryad_4_2.png)",
            },
          },
        });
        break;
      case "mechanic":
        this.setText({
          level_1: {
            first: {
              title: "Мастер-ломастер",
              descr: [
                "1: С 17% шансом ваши атаки уменьшают защиту противника на 4, увеличивая вашу, на 2 хода",
                "2: С 20% шансом ваши атаки уменьшают защиту противника на 5, увеличивая вашу, на 2 хода",
                "3: С 23% шансом ваши атаки уменьшают защиту противника на 6, увеличивая вашу, на 2 хода",
              ],
              img: "url(./img/icons/talents/mechanic/talent_mechanic_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Мозговой чип",
              descr: ["Режим Турбо дополнительно увеличивает адаптацию на 40%"],
              img: "url(./img/icons/talents/mechanic/talent_mechanic_2_1.png)",
            },
            second: {
              title: "Экономия энергии",
              descr: ["Продлевает длительность Режима Турбо на 4 секунды"],
              img: "url(./img/icons/talents/mechanic/talent_mechanic_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Усовершенственные нейроны",
              descr: [
                "1: Увеличивает уклонение на 6% и макс.запас здоровья на 45",
                "2: Увеличивает уклонение на 8% и макс.запас здоровья на 60",
                "3: Увеличивает уклонение на 10% и макс.запас здоровья на 75",
              ],
              img: "url(./img/icons/talents/mechanic/talent_mechanic_3_1.png)",
            },
            second: {
              title: "Броне-пластины",
              descr: [
                "1: Режим Турбо дополнительно увеличивает защиту на 7",
                "2: Режим Турбо дополнительно увеличивает защиту на 10",
                "3: Режим Турбо дополнительно увеличивает защиту на 13",
              ],
              img: "url(./img/icons/talents/mechanic/talent_mechanic_3_2.png)",
            },
          },
          level_4: {
            first: {
              title: "Мощный бум",
              descr: [
                "1: Комбо-удар наносит дополнительно 20% урона и с шансом 18% оглушает врага на 1 ход",
                "2: Комбо-удар наносит дополнительно 30% урона и с шансом 23% оглушает врага на 1 ход",
                "3: Комбо-удар наносит дополнительно 40% урона и с шансом 28% оглушает врага на 1 ход",
              ],
              img: "url(./img/icons/talents/mechanic/talent_mechanic_4_1.png)",
            },
            second: {
              title: "На полную мощность",
              descr: [
                "1: Активация Режима Турбо исцеляет вас на 10% от макс.здоровья, а после завершения наносит врагу столько же урона, оглушая вас на 1 ход ",
                "2: Активация Режима Турбо исцеляет вас на 14% от макс.здоровья, а после завершения наносит врагу столько же урона, оглушая вас на 1 ход ",
                "3: Активация Режима Турбо исцеляет вас на 18% от макс.здоровья, а после завершения наносит врагу столько же урона, оглушая вас на 1 ход ",
              ],
              img: "url(./img/icons/talents/mechanic/talent_mechanic_4_2.png)",
            },
          },
        });

        break;
      case "witchmag":
        this.setText({
          level_1: {
            first: {
              title: "Усиленные чары",
              descr: [
                "1: Усиливает урон Чароплетсво на 18%",
                "2: Усиливает урон Чароплетсво на 25%",
                "3: Усиливает урон Чароплетсво на 32%",
              ],
              img: "url(./img/icons/talents/witchmag/talent_witchmag_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Кража ресурсов",
              descr: ["Чароплетсво также крадет 3 маны каждый ход"],
              img: "url(./img/icons/talents/witchmag/talent_witchmag_2_1.png)",
            },
            second: {
              title: "Глубокая связь",
              descr: ["Продлевает длительность Чароплетсво на 1 ход"],
              img: "url(./img/icons/talents/witchmag/talent_witchmag_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Зачарованный клинок",
              descr: [
                "1: Атака пассивно усилена на 6, а во время Чароплетства еще на 6",
                "2: Атака пассивно усилена на 9, а во время Чароплетства еще на 9",
                "3: Атака пассивно усилена на 12, а во время Чароплетства еще на 12",
              ],
              img: "url(./img/icons/talents/witchmag/talent_witchmag_3_1.png)",
            },
            second: {
              title: "Смертельный ритуал",
              descr: [
                "1: После окончания Чароплетства враг получает 25%(боссу: 12.5%) от его макс.запаса здоровья",
                "2: После окончания Чароплетства враг получает 30%(боссу: 15%) от его макс.запаса здоровья",
                "3: После окончания Чароплетства враг получает 35%(боссу: 17.5%) от его макс.запаса здоровья",
              ],
              img: "url(./img/icons/talents/witchmag/talent_witchmag_3_2.png)",
            },
          },
          level_4: {
            first: {
              title: "Жажда клинка",
              descr: [
                "1: С шансом 8% при атаке вы наносите дополнительный удар в размере 50% от атаки и исцеляетсь на такое же значение ",
                "2: С шансом 10% при атаке вы наносите дополнительный удар в размере 65% от атаки и исцеляетсь на такое же значение",
                "3: С шансом 12% при атаке вы наносите дополнительный удар в размере 80% от атаки и исцеляетсь на такое же значение",
              ],
              img: "url(./img/icons/talents/witchmag/talent_witchmag_4_1.png)",
            },
            second: {
              title: "Проклятие слабости",
              descr: [
                "1: Чароплетство уменьшает атаку и защиту противника на 22%",
                "2: Чароплетство уменьшает атаку и защиту противника на 28%",
                "3: Чароплетство уменьшает атаку и защиту противника на 34%",
              ],
              img: "url(./img/icons/talents/witchmag/talent_witchmag_4_2.png)",
            },
          },
        });
        break;
      case "mage":
        this.setText({
          level_1: {
            first: {
              title: "Сконцентрированный взмах",
              descr: [
                "1: Увеличивает шанс крит.удара на 3% и силу магии 4",
                "2: Увеличивает шанс крит.удара на 4% и силу магии 6",
                "3: Увеличивает шанс крит.удара на 5% и силу магии 8",
              ],
              img: "url(./img/icons/talents/mage/talent_mage_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Школа магии льда",
              descr: [
                "Пока активен ледяной щит, атакующий вас враг получает урон в размере 40% от вашей силы магии",
              ],
              img: "url(./img/icons/talents/mage/talent_mage_2_1.png)",
            },
            second: {
              title: "Школа магии огня",
              descr: ["Огненный шар поджигает врага на 3 хода"],
              img: "url(./img/icons/talents/mage/talent_mage_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Искусный волшебник",
              descr: [
                "1: При уклонении или при получении крит.урона, вы получаете ледяной щит, поглощающий 8% от макс.здоровья героя, суммируется",
                "2: При уклонении или при получении крит.урона, вы получаете ледяной щит, поглощающий 11% от макс.здоровья героя, суммируется",
                "3: При уклонении или при получении крит.урона, вы получаете ледяной щит, поглощающий 14% от макс.здоровья героя, суммируется",
              ],
              img: "url(./img/icons/talents/mage/talent_mage_3_1.png)",
            },
            second: {
              title: "Зельеварение",
              descr: [
                "1: После каждого боя вы варите зелье и восстанавливаете 12% здровья и 15 маны.",
                "2: После каждого боя вы варите зелье и восстанавливаете 14% здровья и 20 маны.",
                "3: После каждого боя вы варите зелье и восстанавливаете 16% здровья и 25 маны.",
              ],
              img: "url(./img/icons/talents/mage/talent_mage_3_2.png)",
            },
          },
          level_4: {
            first: {
              title: "Громовой раскат",
              descr: [
                "1: Удар молнии добавляет 10% от макс.здоровья к прочности ледяного щита и с шансом 40% может оглушить на 2 хода",
                "2: Удар молнии добавляет 13% от макс.здоровья к прочности ледяного щита и с шансом 50% может оглушить на 2 хода",
                "3: Удар молнии добавляет 16% от макс.здоровья к прочности ледяного щита и с шансом 60% может оглушить на 2 хода",
              ],
              img: "url(./img/icons/talents/mage/talent_mage_4_1.png)",
            },
            second: {
              title: "Огненная защита",
              descr: [
                "1: Огненный шар окружает вас огнем на 3 хода, поглощая 25% входящего урона и наносит атакующему 30% урона от силы магии",
                "2: Огненный шар окружает вас огнем на 3 хода, поглощая 35% входящего урона и наносит атакующему 40% урона от силы магии ",
                "3: Огненный шар окружает вас огнем на 3 хода, поглощая 45% входящего урона и наносит атакующему 50% урона от силы магии ",
              ],
              img: "url(./img/icons/talents/mage/talent_mage_4_2.png)",
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
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../text */ "./src/js/modules/text.js");
/* harmony import */ var _skills__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../skills */ "./src/js/modules/skills.js");


// import calcMp from "../../calc_mp";



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
                healProcent = 4;
                break;
              }
              case 2: {
                healProcent = 5;
                break;
              }
              case 3: {
                healProcent = 6;
                break;
              }
              default:
                null;
            }
            setTimeout(() => {
              const healing = setInterval(() => {
                if (count >= 2 || hero.hp < 0) {
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
        init: function (hero) {
          if (this.learn) {
            let absorbDmg = 0;
            switch (this.amount) {
              case 1:
                absorbDmg = 40;
                break;
              case 2:
                absorbDmg = 55;
                break;
              case 3:
                absorbDmg = 70;
                break;
            }
            hero.absorbDamage += absorbDmg;
            setTimeout(() => {
              hero.absorbDamage -= absorbDmg;
            }, 4000);
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            const changeDescr = _skills__WEBPACK_IMPORTED_MODULE_3__.initDescrBtn.bind({ manaCost: _skills__WEBPACK_IMPORTED_MODULE_3__.manaCost });
            switch (this.amount) {
              case 1:
                hero.magicPower += 4;
                _skills__WEBPACK_IMPORTED_MODULE_3__.manaCost.dryad -= 5;
                changeDescr(hero.name);
                break;
              case 2:
                hero.magicPower += 2;
                _skills__WEBPACK_IMPORTED_MODULE_3__.manaCost.dryad -= 5;
                changeDescr(hero.name);
                break;
              case 3:
                hero.magicPower += 2;
                _skills__WEBPACK_IMPORTED_MODULE_3__.manaCost.dryad -= 5;
                changeDescr(hero.name);
                break;
            }
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".magicPower", hero.magicPower, true);
          }
        },
      },
    },
    level_4: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let bonusHp = 0,
              bonusDef = 0,
              reduceDodge = 0;
            switch (this.amount) {
              case 1:
                bonusHp = 70;
                bonusDef = 3;
                reduceDodge = 3;
                break;
              case 2:
                bonusHp = 35;
                bonusDef = 2;
                reduceDodge = 2;
                break;
              case 3:
                bonusHp = 35;
                bonusDef = 2;
                reduceDodge = 2;
                break;
            }
            hero.maxHPHero += bonusHp;
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".hpMax", bonusHp);
            document.querySelector(".hero_hp").setAttribute("data-hp", +hero.maxHPHero);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".hero_hp", hero.hp);
            hero.def += bonusDef;
            hero.dodge -= reduceDodge;
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".def", hero.def, true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".dodge", hero.dodge, true);
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let chance = 0,
              factorDmg = 0;

            switch (this.amount) {
              case 1:
                chance = 16;
                factorDmg = 0.8;
                break;
              case 2:
                chance = 20;
                factorDmg = 1;
                break;
              case 3:
                chance = 24;
                factorDmg = 1.2;
                break;
            }
            hero.dryadMoonlight = function (hero, enemy) {
              const chanceTotal = Math.random() * 100 + 1;
              if (chance > chanceTotal) {
                if (enemy.hp > 0) {
                  const dmg = Math.round(hero.magicPower * factorDmg);
                  enemy.hp -= dmg;
                  (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Лунный огонь наносит врагу ${dmg} урона`, "magenta");
                }
              }
            };
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
    if (level == "level_4" && branch == "first") {
      this.levels.level_4.first.init(hero);
    }
    if (level == "level_4" && branch == "second") {
      this.levels.level_4.second.init(hero);
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
                bonusMana = 16;
                break;
              }
              case 2: {
                bonusMana = 21;
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
                (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Вы смухлевали и восстановили ${bonusMana} маны`, "magenta");
                (0,_calc_mp__WEBPACK_IMPORTED_MODULE_1__["default"])(hero.mana);
              }, 400);
            }
          }
        },
      },
    },
    level_4: {
      first: {
        learn: false,
        amount: 0,
        init: function (enemy) {
          if (this.learn) {
            let chance = 0;
            let factorDmg = 0;
            switch (this.amount) {
              case 1:
                chance = 23;
                factorDmg = 16;
                break;
              case 2:
                chance = 28;
                factorDmg = 18;
                break;
              case 3:
                chance = 33;
                factorDmg = 20;
                break;
            }
            const chanceTotal = Math.random() * 100 + 1;
            if (chance > chanceTotal) {
              let mod = 1;
              enemy.name == "boss" ? (mod = 0.5) : null;
              if (enemy.hp > 0) {
                const dmg = Math.round(enemy.maxHPEnemy / (100 / (factorDmg * mod)));
                enemy.hp -= dmg;
                (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Подсунув Взрывной подарок вы наносите ${dmg} урона`, "magenta");
              }
            }
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let bonusDodge = 0,
              bonusAdapt = 0;
            switch (this.amount) {
              case 1:
                bonusDodge = 6;
                bonusAdapt = 6;
                break;
              case 2:
                bonusDodge = 3;
                bonusAdapt = 3;
                break;
              case 3:
                bonusDodge = 3;
                bonusAdapt = 3;
                break;
            }
            hero.dodge += bonusDodge;
            hero.adapt += bonusAdapt;
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".dodge", hero.dodge, true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".adapt", hero.adapt, true);
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
    if (level == "level_4" && branch == "second") {
      this.levels.level_4.second.init(hero);
    }

    console.log(this.levels);
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (talentJester);


/***/ }),

/***/ "./src/js/modules/talents/talentsHeroes/mage.js":
/*!******************************************************!*\
  !*** ./src/js/modules/talents/talentsHeroes/mage.js ***!
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





const talentMage = {
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
                hero.magicPower += 4;
                hero.critChance += 3;
                break;
              }
              case 2: {
                hero.magicPower += 2;
                hero.critChance += 1;
                break;
              }
              case 3: {
                hero.magicPower += 2;
                hero.critChance += 1;
                break;
              }
              default:
                null;
            }
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".magicPower", hero.magicPower, true);
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".critChance", hero.critChance, true);
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
            hero.mageShieldReflect = function () {
              return Math.round(hero.magicPower / (100 / 40));
            };
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero, enemy) {
          if (this.learn) {
            const duration = 3;
            let count = 0;
            let dmg = Math.floor(5 + hero.magicPower / 2);
            const dot = setInterval(() => {
              if (count >= duration || enemy.hp <= 0 || hero.hp < 0) {
                clearInterval(dot);
              } else {
                enemy.hp -= dmg;
                count++;
                (0,_text__WEBPACK_IMPORTED_MODULE_3__["default"])(`Враг горит и получает ${dmg} урона,`, "magenta");
                (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".enemy_hp", enemy.hp);
              }
            }, 2000);
          } else {
            return null;
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
            let factor = 0;
            switch (this.amount) {
              case 1:
                factor = 8;
                break;
              case 2:
                factor = 11;
                break;
              case 3:
                factor = 14;
                break;
            }
            hero.mageSkillMage = function () {
              const barrier = Math.round(hero.maxHPHero / (100 / factor));
              hero.barrier += barrier;

              hero.mageOnIceShield = true;
            };
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let factorHealHp = 0;
            let healMp = 0;
            switch (this.amount) {
              case 1:
                factorHealHp = 12;
                healMp = 15;
                break;
              case 2:
                factorHealHp = 14;
                healMp = 20;
                break;
              case 3:
                factorHealHp = 16;
                healMp = 25;
                break;
            }
            hero.magePotionsCooking = function () {
              let healHp = Math.round(hero.maxHPHero / (100 / factorHealHp));
              if (hero.hp + healHp > hero.maxHPHero) {
                healHp = hero.maxHPHero - hero.hp;
              }
              hero.hp += healHp;
              hero.mana += healMp;

              (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".hero_hp", hero.hp);
              (0,_calc_mp__WEBPACK_IMPORTED_MODULE_2__["default"])(hero.mana);
              (0,_text__WEBPACK_IMPORTED_MODULE_3__["default"])(
                `Вы выпиваете сваренное зелье и восстанавливаете себе ${healHp} здоровья и ${healMp} ману`,
                "aqua"
              );
            };
          }
        },
      },
    },
    level_4: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero, enemy) {
          if (this.learn) {
            let factor = 0,
              chance = 0;
            switch (this.amount) {
              case 1:
                factor = 10;
                chance = 40;
                break;
              case 2:
                factor = 13;
                chance = 50;
                break;
              case 3:
                factor = 16;
                chance = 60;
                break;
            }
            const bonusBarrier = Math.round(hero.maxHPHero / (100 / factor));
            hero.barrier += bonusBarrier;
            const chanceTotal = Math.random() * 100 + 1;
            if (chance > chanceTotal) {
              enemy.stun++;
            }
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let duration = 6000;
            let absorb = 0;
            let reflectFactor = 0;
            let timeout;
            switch (this.amount) {
              case 1:
                hero.mageFireShield = {};
                hero.mageFireShield.active = false;
                absorb = 25;
                reflectFactor = 0.3;
                break;
              case 2:
                absorb = 35;
                reflectFactor = 0.4;
                break;
              case 3:
                absorb = 45;
                reflectFactor = 0.5;
                break;
            }
            hero.mageFireShield.use = function () {
              !hero.mageFireShield.active ? (hero.absorbDamage += absorb) : null;
              hero.mageFireShield.active = true;

              clearTimeout(timeout);
              timeout = setTimeout(() => {
                hero.absorbDamage -= absorb;
                hero.mageFireShield.active = false;
              }, duration);
            };
            hero.mageFireShield.takeDmg = function (enemy) {
              if (hero.mageFireShield.active) {
                const dmg = Math.round(hero.magicPower * reflectFactor);
                (0,_text__WEBPACK_IMPORTED_MODULE_3__["default"])(`Огненный щит наносит врагу ${dmg} урона`, "magenta");
                enemy.hp -= dmg;
                (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".enemy_hp", enemy.hp);
              }
            };
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
    if (level == "level_3" && branch == "first") {
      this.levels.level_3.first.init(hero);
    }
    if (level == "level_3" && branch == "second") {
      this.levels.level_3.second.init(hero);
    }
    if (level == "level_4" && branch == "second") {
      this.levels.level_4.second.init(hero);
    }

    console.log(this.levels);
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (talentMage);


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
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../text */ "./src/js/modules/text.js");
/* harmony import */ var _specificity_mechanic_specificity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../specificity/mechanic_specificity */ "./src/js/modules/specificity/mechanic_specificity.js");


// import calcMp from "../../calc_mp";

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
            let factorDef = 0;
            switch (this.amount) {
              case 1: {
                chance = 17;
                factorDef = 4;
                break;
              }
              case 2: {
                chance = 20;
                factorDef = 5;
                break;
              }
              case 3: {
                chance = 23;
                factorDef = 6;
                break;
              }
              default:
                null;
            }
            hero.mechanicMaster = function (hero, enemy) {
              const chanceTotal = Math.random() * 100 + 1;
              if (chance > chanceTotal) {
                //  const enemyDef = enemy.def;
                // const enemyName = enemy.name;
                let decDef = factorDef;
                if (enemy.def - factorDef < 0) {
                  decDef = enemy.def;
                  enemy.def = decDef;
                } else {
                  enemy.def -= factorDef;
                }
                hero.def += factorDef;
                (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".def", hero.def, true);
                setTimeout(() => {
                  enemy.def += decDef;
                  hero.def -= factorDef;
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
            return 40;
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
            return 4000;
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
                bonusHp = 45;
                break;
              case 2:
                bonusDodge = 2;
                bonusHp = 15;
                break;
              case 3:
                bonusDodge = 2;
                bonusHp = 15;
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
                bonusDef = 7;
                break;
              case 2:
                bonusDef = 10;
                break;
              case 3:
                bonusDef = 13;
                break;
            }
            return bonusDef;
          } else {
            return 0;
          }
        },
      },
    },
    level_4: {
      first: {
        learn: false,
        amount: 0,
        init: function () {
          if (this.learn) {
            let bonusModDmg = 0,
              chanceToStun = 0;
            switch (this.amount) {
              case 1:
                bonusModDmg = 0.2;
                chanceToStun = 18;
                break;
              case 2:
                bonusModDmg = 0.1;
                chanceToStun = 23;
                break;
              case 3:
                bonusModDmg = 0.1;
                chanceToStun = 28;
                break;
            }
            _specificity_mechanic_specificity__WEBPACK_IMPORTED_MODULE_3__["default"].mod += bonusModDmg;
            _specificity_mechanic_specificity__WEBPACK_IMPORTED_MODULE_3__["default"].chanceToStun += chanceToStun;
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let factorHeal = 0;
            switch (this.amount) {
              case 1:
                hero.mechanicFullCapacity = {};
                factorHeal = 10;
                break;
              case 2:
                factorHeal = 14;
                break;
              case 3:
                factorHeal = 18;
                break;
            }
            hero.mechanicFullCapacity.activate = function (maxHPHero) {
              const heal = Math.round(maxHPHero / (100 / factorHeal));
              hero.hp + heal > maxHPHero ? (hero.hp = maxHPHero) : (hero.hp += heal);
              (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Режим Турбо восстанавливает вам ${heal} здоровья`, "green");
              (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".hero_hp", hero.hp);
            };
            hero.mechanicFullCapacity.deactivate = function (maxHPHero, enemy) {
              if (enemy.hp >= 0) {
                const dmg = Math.round(maxHPHero / (100 / factorHeal));
                enemy.hp -= dmg;
                (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`после завершения Режима Турбо вы наносите врагу ${dmg} урона и оглушаетесь`, "cyan");
                hero.stun++;
                (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".enemy_hp", enemy.hp);
              }
            };
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
    if (level == "level_4" && branch == "first") {
      this.levels.level_4.first.init(hero);
    }
    if (level == "level_4" && branch == "second") {
      this.levels.level_4.second.init(hero);
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
/* harmony import */ var _specificity_monk_specificity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../specificity/monk_specificity */ "./src/js/modules/specificity/monk_specificity.js");






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
                hero.attack[0] += 3;
                hero.attack[1] += 3;
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

              if (chance > chanceTotal) {
                hero.mana + 1;
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
                  return Math.round(enemy.maxHPEnemy / (100 / (factorDmg * mod)));
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
                bonusMp = 40;
                bonusHp = 40;
                bonusRegen = 15;
                break;
              case 2:
                bonusMp = 20;
                bonusHp = 20;
                bonusRegen = 10;
                break;
              case 3:
                bonusMp = 20;
                bonusHp = 20;
                bonusRegen = 10;
                break;
            }
            hero.maxHPHero += bonusHp;
            hero.mp += bonusMp;
            hero.regeneration += bonusRegen;
            (0,_update_stats__WEBPACK_IMPORTED_MODULE_0__["default"])(".hpMax", bonusHp);

            document.querySelector(".hero_hp").setAttribute("data-hp", +hero.maxHPHero);

            // const mpMax = document.querySelector(".hero_mp").getAttribute("data-mp");
            document.querySelector(".hero_mp").setAttribute("data-mp", hero.mp);
            (0,_calc_mp__WEBPACK_IMPORTED_MODULE_2__["default"])(hero.mana);
            (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".hero_hp", hero.hp);
          }
        },
      },
    },
    level_4: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let chance = 0;
            let reduceDmg = 0;
            switch (this.amount) {
              case 1: {
                chance = 18;
                reduceDmg = 20;
                break;
              }
              case 2: {
                chance = 22;
                reduceDmg = 25;
                break;
              }
              case 3: {
                chance = 26;
                reduceDmg = 30;
                break;
              }
              default:
                null;
            }
            hero.monkPainSuppression = function (dmg) {
              const chanceTotal = Math.random() * 100 + 1;
              if (chance > chanceTotal) {
                (0,_text__WEBPACK_IMPORTED_MODULE_3__["default"])(`Вы подавляете урон от следующего удара`, "cyan");
                return Math.round(dmg - dmg * (reduceDmg / 100));
              } else {
                return dmg;
              }
            };
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function () {
          if (this.learn) {
            let bonusChance = 0;
            switch (this.amount) {
              case 1: {
                bonusChance = 2;
                break;
              }
              case 2: {
                bonusChance = 1;
                break;
              }
              case 3: {
                bonusChance = 1;
                break;
              }
              default:
                null;
            }
            _specificity_monk_specificity__WEBPACK_IMPORTED_MODULE_4__["default"].chance += bonusChance;
            console.log(_specificity_monk_specificity__WEBPACK_IMPORTED_MODULE_4__["default"].chance);
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
    if (level == "level_4" && branch == "first") {
      this.levels.level_4.first.init(hero);
    }
    if (level == "level_4" && branch == "second") {
      this.levels.level_4.second.init();
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
/* harmony import */ var _skills__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../skills */ "./src/js/modules/skills.js");





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
            let modBoss = 1;
            let modDmg = 14;
            enemy.name == "boss" ? (modBoss = 0.5) : null;

            return Math.round(enemy.maxHPEnemy / (100 / (modDmg * modBoss)));
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
    level_4: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            const changeDescr = _skills__WEBPACK_IMPORTED_MODULE_3__.initDescrBtn.bind({ manaCost: _skills__WEBPACK_IMPORTED_MODULE_3__.manaCost });
            switch (this.amount) {
              case 1:
                _skills__WEBPACK_IMPORTED_MODULE_3__.manaCost.rogue -= 10;
                break;
              case 2:
                _skills__WEBPACK_IMPORTED_MODULE_3__.manaCost.rogue -= 5;
                break;
              case 3:
                _skills__WEBPACK_IMPORTED_MODULE_3__.manaCost.rogue -= 5;
                break;
            }
            changeDescr(hero.name);
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let modHeal = 0;
            switch (this.amount) {
              case 1:
                modHeal = 8;
                break;
              case 2:
                modHeal = 12;
                break;
              case 3:
                modHeal = 16;
                break;
            }
            hero.rogueRewardKill = function (hero, maxHPHero, maxHPEnemy) {
              console.log(maxHPHero, maxHPEnemy);
              const heal = Math.round(maxHPEnemy / (100 / modHeal));
              hero.hp + heal > maxHPHero ? (hero.hp = maxHPHero) : (hero.hp += heal);
              (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".hero_hp", hero.hp);
              (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`исцеление от Награды за расправу: ${heal} здоровья`, "cyan");
            };
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
    if (level == "level_4" && branch == "first") {
      this.levels.level_4.first.init(hero);
    }
    if (level == "level_4" && branch == "second") {
      this.levels.level_4.second.init(hero);
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
/* harmony import */ var _specificity_warrior_specificity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../specificity/warrior_specificity */ "./src/js/modules/specificity/warrior_specificity.js");






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
              return 1.2;
            }
            if (this.amount == 2) {
              return 1.28;
            }
            if (this.amount == 3) {
              return 1.36;
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
            enemy.stun++;
            enemy.dodge -= 20;
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
              heal = Math.round(maxHp / (100 / 13));
            }
            if (this.amount == 3) {
              heal = Math.round(maxHp / (100 / 16));
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
    level_4: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let bonusMod = 0;
            switch (this.amount) {
              case 1: {
                hero.absorbDamage += 6;
                bonusMod = 5;
                _specificity_warrior_specificity__WEBPACK_IMPORTED_MODULE_3__["default"].mod += bonusMod;
                break;
              }
              case 2: {
                hero.absorbDamage += 3;
                bonusMod = 5;
                _specificity_warrior_specificity__WEBPACK_IMPORTED_MODULE_3__["default"].mod += bonusMod;
                break;
              }
              case 3: {
                hero.absorbDamage += 3;
                bonusMod = 5;
                _specificity_warrior_specificity__WEBPACK_IMPORTED_MODULE_3__["default"].mod += bonusMod;
                break;
              }
              default:
                null;
            }
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let chance = 0;
            let modDmg = 0;
            switch (this.amount) {
              case 1: {
                chance = 50;
                modDmg = 1;
                break;
              }
              case 2: {
                chance = 60;
                modDmg = 1.3;
                break;
              }
              case 3: {
                chance = 70;
                modDmg = 1.6;
                break;
              }
              default:
                null;
            }
            hero.warriorRevenge = function (hero, enemy) {
              const chanceTotal = Math.random() * 100 + 1;
              if (chance > chanceTotal) {
                const dmg = Math.round(((hero.attack[0] + hero.attack[1]) / 2) * modDmg);
                setTimeout(() => {
                  enemy.hp -= dmg;
                  (0,_text__WEBPACK_IMPORTED_MODULE_2__["default"])(`Вы используете реванш, нанеся противнику ${dmg} урона`, "cyan");
                  hero.audio.crit();
                  (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".enemy_hp", enemy.hp);
                }, 200);
              }
            };
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
      this.levels.level_3.second.init(hero);
    }
    if (level == "level_4" && branch == "first") {
      this.levels.level_4.first.init(hero);
    }
    if (level == "level_4" && branch == "second") {
      this.levels.level_4.second.init(hero);
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

/***/ "./src/js/modules/talents/talentsHeroes/witchmag.js":
/*!**********************************************************!*\
  !*** ./src/js/modules/talents/talentsHeroes/witchmag.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _update_stats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../update_stats */ "./src/js/modules/update_stats.js");
/* harmony import */ var _calc_hp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../calc_hp */ "./src/js/modules/calc_hp.js");
/* harmony import */ var _calc_mp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../calc_mp */ "./src/js/modules/calc_mp.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../text */ "./src/js/modules/text.js");





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
                factorDmg = 1.18;
                break;
              case 2:
                factorDmg = 1.25;
                break;
              case 3:
                factorDmg = 1.32;
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
            (0,_calc_mp__WEBPACK_IMPORTED_MODULE_2__["default"])(hero.mana);
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function () {
          if (this.learn) {
            return 4;
          } else {
            return 3;
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
                buffAttack = 3;
                bonusAttack = 9;
                break;
              case 3:
                buffAttack = 3;
                bonusAttack = 12;
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
            (0,_text__WEBPACK_IMPORTED_MODULE_3__["default"])(`Враг получает ${dmg} урона от смертельного ритула`, "magenta");
          }
        },
      },
    },
    level_4: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let chance = 0,
              factor = 0;
            switch (this.amount) {
              case 1:
                chance = 8;
                factor = 0.6;
                break;
              case 2:
                chance = 10;
                factor = 0.8;
                break;
              case 3:
                chance = 12;
                factor = 1;
                break;
            }
            hero.witchmagThirstBlade = function (hero, enemy) {
              const chanceTotal = Math.random() * 100 + 1;
              console.log(chanceTotal);
              if (chance > chanceTotal) {
                let value = Math.round(((hero.attack[0] + hero.attack[1]) / 2) * factor);
                if (enemy.hp > 0) {
                  setTimeout(() => {
                    enemy.hp -= value;
                    hero.hp + value > hero.maxHPHero ? (hero.hp = hero.maxHPHero) : (hero.hp += value);
                    (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".hero_hp", hero.hp);
                    (0,_calc_hp__WEBPACK_IMPORTED_MODULE_1__["default"])(".enemy_hp", enemy.hp);
                    (0,_text__WEBPACK_IMPORTED_MODULE_3__["default"])(`Жажда клинка высасывает у врага ${value} здоровья`, "magenta");
                  }, 200);
                }
              }
            };
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let factor = 0,
              currentDef = 0,
              currentMinAttack = 0,
              currentMaxAttack = 0;

            switch (this.amount) {
              case 1:
                hero.witchmagCurseWeakness = {};
                factor = 0.22;
                break;
              case 2:
                factor = 0.28;
                break;
              case 3:
                factor = 0.34;
                break;
            }
            hero.witchmagCurseWeakness.activate = function (enemy) {
              currentDef = enemy.def;
              currentMinAttack = enemy.attack[0];
              currentMaxAttack = enemy.attack[1];

              enemy.def -= Math.round(enemy.def * factor);
              enemy.attack[0] -= Math.round(enemy.attack[0] * factor);
              enemy.attack[1] -= Math.round(enemy.attack[1] * factor);
            };
            hero.witchmagCurseWeakness.deactivate = function (enemy) {
              enemy.def = currentDef;
              enemy.attack[0] -= currentMinAttack;
              enemy.attack[1] -= currentMaxAttack;
            };
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
    if (level == "level_4" && branch == "first") {
      this.levels.level_4.first.init(hero);
    }
    if (level == "level_4" && branch == "second") {
      this.levels.level_4.second.init(hero);
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
/* harmony import */ var _modules_talents_core_talents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/talents/core-talents */ "./src/js/modules/talents/core-talents.js");
/* harmony import */ var _modules_changeBg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/changeBg */ "./src/js/modules/changeBg.js");
/* harmony import */ var _modules_talents_accordion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/talents/accordion */ "./src/js/modules/talents/accordion.js");
/* harmony import */ var _modules_audio_audio__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/audio/audio */ "./src/js/modules/audio/audio.js");

















window.addEventListener("DOMContentLoaded", () => {
  let hero;
  let maxHpHero;
  let maxMpHero;
  let enemy;
  let sex = "man";

  (0,_modules_talents_accordion__WEBPACK_IMPORTED_MODULE_9__["default"])();

  //
  const btnStart = document.querySelector(".btn__start");
  const content = document.querySelector(".base__wrapper");

  btnStart.addEventListener("click", () => {
    content.classList.add("show", "fade");
    btnStart.remove();

    (0,_modules_audio_audio__WEBPACK_IMPORTED_MODULE_10__["default"])("background", "loop");
    (0,_modules_audio_audio__WEBPACK_IMPORTED_MODULE_10__["default"])("background");
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
      sex = e.target.closest(".base__container_hero").getAttribute("sex");
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
      hero.sex = sex;

      mpHero.setAttribute("data-mp", hero.maxMPHero);
      maxMpHero = mpHero.getAttribute("data-mp");
      (0,_modules_calc_mp__WEBPACK_IMPORTED_MODULE_4__["default"])();

      _modules_talents_core_talents__WEBPACK_IMPORTED_MODULE_7__["default"].init(hero);

      (0,_modules_audio_audio__WEBPACK_IMPORTED_MODULE_10__["default"])("heroChosen");
      (0,_modules_audio_audio__WEBPACK_IMPORTED_MODULE_10__["default"])("background", "stop");

      (0,_modules_audio_audio__WEBPACK_IMPORTED_MODULE_10__.setAudioToHero)(hero);
    });
  });

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

    (0,_modules_changeBg__WEBPACK_IMPORTED_MODULE_8__["default"])(enemy.name);
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
        btn
          .closest(".base__container_hero")
          .querySelector(".img__hero")
          .setAttribute("src", `${src.slice(0, -9)}.png`);

        btn.closest(".base__container_hero").setAttribute("sex", "man");
      }
      if (sex == "woman" && src.substring(src.length - 9) !== "Woman.png") {
        btn
          .closest(".base__container_hero")
          .querySelector(".img__hero")
          .setAttribute("src", `${src.slice(0, -4)}Woman.png`);

        btn.closest(".base__container_hero").setAttribute("sex", "woman");
      }
    });
  });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map