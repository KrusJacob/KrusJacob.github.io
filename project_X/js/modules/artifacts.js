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

heroXp(1);

function getXp(hero, guarantLegendArt = false, boss = false) {
  if (!boss) {
    xp += 1;
  }

  if (xp % 2 == 0) {
    xp = 0;
    totalXp += 1;
    if (totalXp % 4 == 0) {
      hero.talentsPoint += 1;
      talents.incTalent(hero.talentsPoint);
    }

    hero.lvl += 1;
    hero.lvl % 15 == 0 ? buff(hero) : null;

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
      updateStats(".hpMax", value);
      document.querySelector(".hero_hp").setAttribute("data-hp", hpMax);
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
        calcHp(".hero_hp", hero.hp);
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
        calcHp(".hero_hp", hero.hp);
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
        calcHp(".hero_hp", hero.hp);
        hero.mp += 35;
        mpMax = +mpMax + 35;
        document.querySelector(".hero_mp").setAttribute("data-mp", mpMax);
        calcMp(+document.querySelector(".current_mp").textContent);
        alert("Вы получили Волшебную Исрку");
        break;
      case "dwarfHammer":
        icnMaxHPHero(hpMax, 40);
        hero.hp += 40;
        calcHp(".hero_hp", hero.hp);
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
        calcHp(".hero_hp", hero.hp);
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
        calcHp(".hero_hp", hero.hp);
        alert("вы получили Кольцо Жизненной Силы");
        break;
      case "pumpkinMimic":
        icnMaxHPHero(hpMax, -60);
        hero.hp -= 60;
        calcHp(".hero_hp", hero.hp);
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
        calcHp(".hero_hp", hero.hp);
        incSecondaryStatHero("luck", 5);
        alert("вы получили Яблочко и скушали его");
        break;
      case "goldBelt":
        icnMaxHPHero(hpMax, 50);
        hero.hp += 50;
        calcHp(".hero_hp", hero.hp);
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
        calcHp(".hero_hp", hero.hp);
        alert("вы получили Проклятый Череп");

        break;
      case "amulet":
        incSecondaryStatHero("magicPower", 4);
        icnMaxHPHero(hpMax, 35);
        hero.hp += 35;
        calcHp(".hero_hp", hero.hp);
        hero.regeneration += 10;
        alert("вы получили Амулет Жизни");

        break;
      case "flacon":
        hero.hp = hpMax;
        hero.regeneration += 20;
        calcHp(".hero_hp", hero.hp);
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
        calcHp(".hero_hp", hero.hp);
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
        updateStats(".attackMax", 7);
        incSecondaryStatHero("critPower", 20);
        alert("вы получили Копьё Рыцаря");

        break;
      case "ironArmor":
        icnMaxHPHero(hpMax, 30);
        hero.hp += 30;
        calcHp(".hero_hp", hero.hp);
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
        calcHp(".hero_hp", hero.hp);

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
        updateStats(".attackMax", 13);
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

export default getXp;
