import updateStats from "../../update_stats";
// import calcHp from "../../calc_hp";
import calcMp from "../../calc_mp";
import addText from "../../text";

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
            calcMp(hero.mana);
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
            updateStats(".attackMin", hero.attack[0], true);
            updateStats(".attackMax", hero.attack[1], true);
            hero.witchmagEnchBlade = function (boolean) {
              if (boolean) {
                hero.attack[0] += bonusAttack;
                hero.attack[1] += bonusAttack;
              } else {
                hero.attack[0] -= bonusAttack;
                hero.attack[1] -= bonusAttack;
              }
              updateStats(".attackMin", hero.attack[0], true);
              updateStats(".attackMax", hero.attack[1], true);
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
            addText(`Враг получает ${dmg} урона от смертельного ритула`, "magenta");
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

export default talentWitchmag;
