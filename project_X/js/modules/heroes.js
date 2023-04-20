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
      this.absorbDamage = 0;
      this.lvl = 1;
      this.talentsPoint = 0;
      this.barrier = 0;
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
      return new Hero([25, 32], 350, 7, 17, 155, 5, 6, 11, 15, 160, "warrior");
    },
    function rogue() {
      return new Hero([32, 39], 275, 3, 21, 170, 17, 9, 15, 14, 170, "rogue");
    },
    function monk() {
      return new Hero([24, 30], 365, 2, 15, 175, 24, 12, 21, 20, 200, "monk");
    },
    function jester() {
      return new Hero([23, 35], 300, 0, 16, 200, 18, 17, 10, 23, 200, "jester");
    },
    function dryad() {
      return new Hero([23, 29], 310, 1, 17, 150, 20, 13, 13, 39, 200, "dryad");
    },
    function mechanic() {
      return new Hero([25, 31], 315, 4, 18, 190, 11, 8, 16, 16, 175, "mechanic");
    },
    function witchmag() {
      return new Hero([28, 35], 285, 2, 18, 175, 14, 9, 17, 31, 180, "witchmag");
    },
    function mage() {
      return new Hero([15, 21], 270, 1, 20, 150, 13, 12, 14, 45, 250, "mage");
    },
  ];

  const enemy = [
    function goldBox() {
      return new Enemy([5, 5], 100, 5, 1, 1, 1, 1, "goldBox", "img/enemy/goldBox.png", 50);
    },
    function wolf() {
      return new Enemy([17, 23], 160, 1, 13, 170, 12, 10, "wolf", "img/enemy/wolf.png", 6);
    },
    function goblin() {
      return new Enemy([18, 25], 200, 2, 18, 150, 17, 12, "goblin", "img/enemy/goblin.png", 7);
    },
    function satyr() {
      return new Enemy([20, 25], 165, 1, 14, 150, 27, 10, "satyr", "img/enemy/satyr.png", 8);
    },
    function werewolf() {
      return new Enemy([17, 27], 215, 1, 25, 170, 15, 12, "werewolf", "img/enemy/werewolf.png", 9);
    },
    function ork() {
      return new Enemy([16, 22], 320, 4, 10, 190, 5, 10, "ork", "img/enemy/ork.png", 10);
    },
    function skeleton() {
      return new Enemy([21, 30], 210, 0, 18, 200, 21, 10, "skeleton", "img/enemy/skeleton.png", 11);
    },
    function gnome() {
      return new Enemy([9, 15], 150, 0, 33, 170, 80, 15, "gnome", "img/enemy/gnome.png", 12);
    },
    function behemoth() {
      return new Enemy([22, 30], 330, 7, 10, 150, 1, 25, "behemoth", "img/enemy/behemoth.png", 13);
    },
    function dragon() {
      return new Enemy([22, 34], 240, 5, 45, 150, 15, 15, "dragon", "img/enemy/dragon.png", 15);
    },
    function guard() {
      return new Enemy([24, 29], 380, 12, 10, 200, 1, 25, "guard", "img/enemy/guard.png", 17);
    },
    function stoneTroll() {
      return new Enemy([26, 33], 370, 9, 20, 170, 15, 25, "stoneTroll", "img/enemy/stoneTroll.png", 19);
    },
    function trader() {
      return new Enemy([13, 16], 175, 1, 1, 150, 5, 1, "trader", "img/enemy/trader.png", 5);
    },
    function greenMonster() {
      return new Enemy([29, 38], 280, 3, 30, 200, 38, 15, "greenMonster", "img/enemy/greenMonster.png", 21);
    },
    function fierySkeleton() {
      return new Enemy([37, 47], 300, 1, 20, 210, 25, 15, "fierySkeleton", "img/enemy/fierySkeleton.png", 23);
    },
    function cannibal() {
      return new Enemy([35, 45], 440, 9, 25, 150, 1, 20, "cannibal", "img/enemy/cannibal.png", 25);
    },
    function kikimora() {
      return new Enemy([42, 50], 330, 3, 24, 170, 35, 15, "kikimora", "img/enemy/kikimora.png", 27);
    },
    function spirit() {
      return new Enemy([41, 49], 280, 0, 27, 150, 67, 15, "spirit", "img/enemy/spirit.png", 29);
    },
    function unicorn() {
      return new Enemy([40, 50], 285, 1, 15, 215, 45, 5, "unicorn", "img/enemy/unicorn.png", 30);
    },
    function damn() {
      return new Enemy([43, 53], 360, 4, 45, 150, 40, 15, "damn", "img/enemy/damn.png", 32);
    },
    function dreamEater() {
      return new Enemy([44, 55], 400, 4, 40, 150, 40, 25, "dreamEater", "img/enemy/dreamEater.png", 34);
    },
    function giantZombie() {
      return new Enemy([48, 55], 520, 15, 33, 175, 1, 15, "giantZombie", "img/enemy/giantZombie.png", 35);
    },
    function cyclops() {
      return new Enemy([50, 58], 540, 12, 25, 175, 5, 3, "cyclops", "img/enemy/cyclops.png", 37);
    },
    function goldDragon() {
      return new Enemy([51, 60], 500, 25, 20, 190, 10, 35, "goldDragon", "img/enemy/goldDragon.png", 100);
    },
    function SeaZombie() {
      return new Enemy([63, 72], 410, 7, 25, 210, 30, 20, "SeaZombie", "img/enemy/SeaZombie.png", 40);
    },
    function viking() {
      return new Enemy([50, 60], 580, 16, 33, 150, 20, 25, "viking", "img/enemy/viking.png", 42);
    },
    function imps() {
      return new Enemy([50, 61], 470, 6, 45, 175, 55, 20, "imps", "img/enemy/imps.png", 45);
    },
    function titan() {
      return new Enemy([56, 70], 700, 19, 20, 210, 1, 30, "titan", "img/enemy/titan.png", 47);
    },
    function masterOfMark() {
      return new Enemy([57, 65], 550, 7, 25, 200, 35, 40, "masterOfMark", "img/enemy/masterOfMark.png", 49);
    },
    function diablo() {
      return new Enemy([60, 71], 720, 23, 15, 200, 20, 40, "diablo", "img/enemy/diablo.png", 51);
    },
    function blackDragon() {
      return new Enemy([69, 79], 600, 13, 35, 150, 40, 35, "blackDragon", "img/enemy/blackDragon.png", 54);
    },
    function stoneGiant() {
      return new Enemy([56, 66], 880, 34, 10, 200, 1, 45, "stoneGiant", "img/enemy/stoneGiant.png", 57);
    },
    function evilMonster() {
      return new Enemy([77, 89], 940, 18, 25, 200, 9, 25, "evilMonster", "img/enemy/evilMonster.png", 60);
    },
    function ghostKnight() {
      return new Enemy([83, 93], 950, 27, 35, 150, 18, 35, "evilMonster", "img/enemy/ghostKnight.png", 63);
    },
    function AncientButcher() {
      return new Enemy([77, 88], 1150, 14, 20, 225, 8, 45, "AncientButcher", "img/enemy/AncientButcher.png", 67);
    },
    function ermungand() {
      return new Enemy([79, 90], 1200, 27, 33, 175, 20, 50, "ermungand", "img/enemy/ermungand.png", 71);
    },
    function devourer() {
      return new Enemy([86, 96], 1500, 14, 20, 200, 5, 55, "devourer", "img/enemy/devourer.png", 75);
    },
    function demon() {
      return new Enemy([90, 99], 1480, 12, 10, 150, 10, 50, "demon", "img/enemy/demon.png", 80);
    },
    function devil() {
      return new Enemy([105, 110], 1500, 8, 35, 215, 35, 60, "devil", "img/enemy/devil.png", 85);
    },
    function angelFighter() {
      return new Enemy([95, 115], 1555, 15, 55, 155, 55, 55, "angelFighter", "img/enemy/angelFighter.png", 91);
    },
    function whiteDragon() {
      return new Enemy([100, 113], 1650, 18, 30, 175, 60, 60, "whiteDragon", "img/enemy/whiteDragon.png", 97);
    },
    function death() {
      return new Enemy([180, 200], 2077, 15, 70, 300, 45, 99, "death", "img/enemy/death.png", 120);
    },
  ];

  // console.log(enemy.length);
  // console.log(enemy[enemy.length]);

  const boss = [
    function bossOrk() {
      return new Enemy([44, 49], 520, 10, 20, 175, 20, 25, "boss", "img/enemy/bossOrk.png", 50);
    },
    function mimic() {
      return new Enemy([60, 70], 610, 5, 25, 225, 40, 35, "boss", "img/enemy/boss/mimic.png", 75);
    },
    function ombal() {
      return new Enemy([72, 84], 1500, 12, 20, 200, 5, 50, "boss", "img/enemy/boss/ombal.png", 100);
    },
    function diamondMan() {
      return new Enemy([78, 89], 1780, 47, 10, 225, 5, 65, "boss", "img/enemy/boss/diamondMan.png", 125);
    },
    function kingHell() {
      return new Enemy([140, 150], 2100, 35, 35, 250, 20, 75, "boss", "img/enemy/boss/kingHell.png", 150);
    },
    function fireMinotaur() {
      return new Enemy([200, 220], 3200, 28, 40, 275, 10, 85, "boss", "img/enemy/boss/fireMinotaur.png", 500);
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
