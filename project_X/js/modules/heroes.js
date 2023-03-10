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

export default createHeroes;
