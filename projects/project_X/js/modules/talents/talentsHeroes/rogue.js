import updateStats from "../../update_stats";
import calcHp from "../../calc_hp";
import addText from "../../text";

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
            updateStats(".attackMin", hero.attack[0], true);
            updateStats(".attackMax", hero.attack[1], true);
            updateStats(".critChance", hero.critChance, true);
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
            calcHp(".hero_hp", hero.hp);
            addText(`Двойной также исцеляет вас на ${heal} здоровья`, "cyan");
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
            updateStats(".dodge", hero.dodge, true);
            setTimeout(() => {
              hero.dodge -= bonus;
              updateStats(".dodge", hero.dodge, true);
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

export default talentRogue;
