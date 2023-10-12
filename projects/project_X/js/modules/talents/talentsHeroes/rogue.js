import updateStats from "../../update_stats";
import calcHp from "../../calc_hp";
import addText from "../../text";
import { manaCost, initDescrBtn } from "../../skills";

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
    level_4: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            const changeDescr = initDescrBtn.bind({ manaCost });
            switch (this.amount) {
              case 1:
                manaCost.rogue -= 10;
                break;
              case 2:
                manaCost.rogue -= 5;
                break;
              case 3:
                manaCost.rogue -= 5;
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
              calcHp(".hero_hp", hero.hp);
              addText(`исцеление от Награды за расправу: ${heal} здоровья`, "cyan");
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

export default talentRogue;
