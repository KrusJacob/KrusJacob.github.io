import updateStats from "../../update_stats";
import calcHp from "../../calc_hp";
import addText from "../../text";

import warriorSpecificity from "../../specificity/warrior_specificity";

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
              return 1.2;
            }
            if (this.amount == 2) {
              return 1.28;
            }
            if (this.amount == 3) {
              return 1.36;
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
            enemy.stun++;
            enemy.dodge -= 20;
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
              heal = Math.round(maxHp / (100 / 13));
            }
            if (this.amount == 3) {
              heal = Math.round(maxHp / (100 / 16));
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
    level_4: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let bonusMod = 0;
            switch (this.amount) {
              case 1: {
                hero.absorbDamage += 6;
                bonusMod = 5;
                warriorSpecificity.mod += bonusMod;
                break;
              }
              case 2: {
                hero.absorbDamage += 3;
                bonusMod = 5;
                warriorSpecificity.mod += bonusMod;
                break;
              }
              case 3: {
                hero.absorbDamage += 3;
                bonusMod = 5;
                warriorSpecificity.mod += bonusMod;
                break;
              }
              default:
                null;
            }
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let chance = 0;
            let modDmg = 0;
            switch (this.amount) {
              case 1: {
                chance = 50;
                modDmg = 1;
                break;
              }
              case 2: {
                chance = 60;
                modDmg = 1.3;
                break;
              }
              case 3: {
                chance = 70;
                modDmg = 1.6;
                break;
              }
              default:
                null;
            }
            hero.warriorRevenge = function (hero, enemy) {
              const chanceTotal = Math.random() * 100 + 1;
              if (chance > chanceTotal) {
                const dmg = Math.round(((hero.attack[0] + hero.attack[1]) / 2) * modDmg);
                setTimeout(() => {
                  enemy.hp -= dmg;
                  addText(`Вы используете реванш, нанеся противнику ${dmg} урона`, "cyan");
                  hero.audio.crit();
                  calcHp(".enemy_hp", enemy.hp);
                }, 200);
              }
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

    if (level == "level_3" && branch == "second") {
      this.levels.level_3.second.init(hero);
    }
    if (level == "level_4" && branch == "first") {
      this.levels.level_4.first.init(hero);
    }
    if (level == "level_4" && branch == "second") {
      this.levels.level_4.second.init(hero);
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
