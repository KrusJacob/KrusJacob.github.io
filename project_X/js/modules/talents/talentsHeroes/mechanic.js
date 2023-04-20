import updateStats from "../../update_stats";
import calcHp from "../../calc_hp";
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
                chance = 17;
                decDef = 3;
                break;
              }
              case 2: {
                chance = 20;
                decDef = 4;
                break;
              }
              case 3: {
                chance = 23;
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
                updateStats(".def", hero.def, true);
                setTimeout(() => {
                  enemy.def += enemyDef;
                  hero.def -= decDef;
                  updateStats(".def", hero.def, true);
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
            updateStats(".hpMax", bonusHp);
            updateStats(".dodge", hero.dodge, true);
            document.querySelector(".hero_hp").setAttribute("data-hp", hero.maxHPHero);
            calcHp(".hero_hp", hero.hp);
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

export default talentMechanic;
