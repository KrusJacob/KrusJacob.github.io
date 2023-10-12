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

export default createHeroes;
