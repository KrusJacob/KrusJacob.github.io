import updateStats from "../../update_stats";
import calcHp from "../../calc_hp";
// import calcMp from "../../calc_mp";
// import addText from "../../text";
import { manaCost, initDescrBtn } from "../../skills";

const talentDryad = {
  hero: {},

  levels: {
    level_1: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero, maxHp) {
          if (this.learn) {
            let healProcent = 0;
            let count = 0;
            switch (this.amount) {
              case 1: {
                healProcent = 3;
                break;
              }
              case 2: {
                healProcent = 4;
                break;
              }
              case 3: {
                healProcent = 5;
                break;
              }
              default:
                null;
            }
            setTimeout(() => {
              const healing = setInterval(() => {
                if (count >= 3 || hero.hp < 0) {
                  clearInterval(healing);
                } else {
                  hero.hp += Math.round(maxHp / (100 / healProcent));
                  count++;
                  calcHp(".hero_hp", hero.hp);
                }
              }, 2000);
            }, 150);
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
            hero.attack[0] += 7;
            hero.attack[1] += 7;
            hero.def += 2;
            hero.adapt += 18;

            updateStats(".attackMin", hero.attack[0], true);
            updateStats(".attackMax", hero.attack[1], true);
            updateStats(".def", hero.def, true);
            updateStats(".adapt", hero.adapt, true);
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function () {
          if (this.learn) {
            return 1.5;
          } else {
            return 1;
          }
        },
      },
    },
    level_3: {
      first: {
        learn: false,
        amount: 0,
        init: function (enemy) {
          if (this.learn) {
            let factorDmg = 1;
            switch (this.amount) {
              case 1:
                factorDmg = 0.6;
                break;
              case 2:
                factorDmg = 0.5;
                break;
              case 3:
                factorDmg = 0.4;
                break;
            }
            enemy.multiplierDmg = factorDmg;
            setTimeout(() => {
              enemy.multiplierDmg = 1;
            }, 4000);
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            const changeDescr = initDescrBtn.bind({ manaCost });
            switch (this.amount) {
              case 1:
                hero.magicPower += 4;
                manaCost.dryad -= 5;
                changeDescr(hero.name);
                break;
              case 2:
                hero.magicPower += 2;
                manaCost.dryad -= 5;
                changeDescr(hero.name);
                break;
              case 3:
                hero.magicPower += 2;
                manaCost.dryad -= 5;
                changeDescr(hero.name);
                break;
            }
            updateStats(".magicPower", hero.magicPower, true);
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
    if (level == "level_2" && branch == "first") {
      this.levels.level_2.first.init(hero);
    }
    if (level == "level_3" && branch == "second") {
      this.levels.level_3.second.init(hero);
    }

    console.log(this.levels);
  },
};

export default talentDryad;
