import updateStats from "../../update_stats";
import calcHp from "../../calc_hp";
import addText from "../../text";

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
              return 1.15;
            }
            if (this.amount == 2) {
              return 1.2;
            }
            if (this.amount == 3) {
              return 1.25;
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
            enemy.stun = true;
            enemy.dodge -= 15;
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
              heal = Math.round(maxHp / (100 / 10));
            }
            if (this.amount == 3) {
              heal = Math.round(maxHp / (100 / 10));
            }
            console.log(hero);

            hero.hp + heal > maxHp ? (hero.hp = maxHp) : (hero.hp += heal);
            calcHp(".hero_hp", hero.hp);
            addText(`Боевой крик также исцеляет вас на ${heal} здоровья`, "cyan");
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
            updateStats(".def", hero.def, true);
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
      // this.incStat(hero);
      this.levels.level_3.second.init(hero);
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

export default talentWarrior;
