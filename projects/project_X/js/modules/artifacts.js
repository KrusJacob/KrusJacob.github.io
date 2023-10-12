import calcHp from "./calc_hp";
import calcMp from "./calc_mp";
import updateStats from "./update_stats";
import heroXp from "./xp";
import talents from "./talents/core-talents";
import buff from "./buff";

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

heroXp(1);

function getXp(hero, guarantLegendArt = false, boss = false) {
  if (!boss) {
    xp += 1;
  }

  if (xp % 2 == 0) {
    xp = 0;
    totalXp += 1;
    if (totalXp % 3 == 0) {
      hero.talentsPoint += 1;
      talents.incTalent(hero.talentsPoint);
    }

    hero.lvl += 1;
    hero.lvl % 20 == 0 ? buff(hero) : null;

    heroXp(totalXp);
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
            calcHp(".hero_hp", hero.hp);
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
            calcHp(".hero_hp", hero.hp);
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
            calcHp(".hero_hp", hero.hp);
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
            calcHp(".hero_hp", hero.hp);
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
            calcHp(".hero_hp", hero.hp);
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
            calcHp(".hero_hp", hero.hp);
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
            calcHp(".hero_hp", hero.hp);
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
            calcHp(".hero_hp", hero.hp);
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
            calcHp(".hero_hp", hero.hp);
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
            calcHp(".hero_hp", hero.hp);
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
            calcHp(".hero_hp", hero.hp);
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
            updateStats(".attackMax", 7);
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
            calcHp(".hero_hp", hero.hp);
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
            calcHp(".hero_hp", hero.hp);
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
            calcHp(".hero_hp", hero.hp);
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
            updateStats(".attackMax", 13);
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
            calcHp(".hero_hp", hero.hp);
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
      updateStats(".hpMax", value);
      document.querySelector(".hero_hp").setAttribute("data-hp", hpMax);
    }

    function incMaxMPHero(value) {
      hero.MaxMPHero = +hero.maxMPHero + +value;
      document.querySelector(".hero_mp").setAttribute("data-mp", hero.MaxMPHero);
      calcMp(hero.mana);
    }

    function incAttackHero(minAttack, maxAttack) {
      hero.attack[0] += minAttack;
      updateStats(".attackMax", minAttack);
      hero.attack[1] += maxAttack;
      updateStats(".attackMin", maxAttack);
    }

    function incSecondaryStatHero(stat, value) {
      hero[stat] += value;
      updateStats(`.${stat}`, value);
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

export default getXp;
