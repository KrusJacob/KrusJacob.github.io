import updateStats from "../../update_stats";
import calcHp from "../../calc_hp";
import calcMp from "../../calc_mp";
import addText from "../../text";

const talentMonk = {
  hero: {},

  levels: {
    level_1: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let chance = 0;
            switch (this.amount) {
              case 1: {
                chance = 30;
                hero.attack[0] += 2;
                hero.attack[1] += 2;
                break;
              }
              case 2: {
                chance = 40;
                hero.attack[0] += 2;
                hero.attack[1] += 2;
                break;
              }
              case 3: {
                chance = 50;
                hero.attack[0] += 2;
                hero.attack[1] += 2;
                break;
              }
              default:
                null;
            }
            hero.monkSnakeStrikes = function () {
              const chanceTotal = Math.random() * 100 + 1;
              console.log(chance);
              if (chance > chanceTotal) {
                return 1;
              } else {
                return 0;
              }
            };

            updateStats(".attackMin", hero.attack[0], true);
            updateStats(".attackMax", hero.attack[1], true);
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
            hero.monkMantis = function (heroDodge) {
              const chance = Math.random() * 100 + 1;
              let dmg = 0;
              if (chance < 33) {
                dmg = heroDodge;
              }
              return dmg;
            };

            //   return 0;
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            hero.monkTiger = function (heroAttack) {
              let dmg = 0;
              const chance = Math.random() * 100 + 1;

              if (chance < 33) {
                dmg = Math.round((heroAttack[0] + heroAttack[1]) / 2);
              }
              return dmg;
            };

            //   return 0;
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
            let chance = 0;
            let factorDmg = 1;
            switch (this.amount) {
              case 1:
                chance = 6;
                factorDmg = 16;
                break;
              case 2:
                chance = 7;
                factorDmg = 17;
                break;
              case 3:
                chance = 8;
                factorDmg = 18;
                break;
            }
            hero.monkLotus = function (enemy) {
              const chanceTotal = Math.random() * 100 + 1;

              if (chance > chanceTotal) {
                let mod = 1;
                enemy.name == "boss" ? (mod = 0.5) : null;
                if (enemy.hp > 0) {
                  return enemy.maxHPEnemy / (100 / (factorDmg * mod));
                } else {
                  return 0;
                }
              } else {
                return 0;
              }
            };

            //   return 0;
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let bonusHp = 0,
              bonusMp = 0,
              bonusRegen = 0;
            switch (this.amount) {
              case 1:
                bonusMp = 35;
                bonusHp = 35;
                bonusRegen = 15;
                break;
              case 2:
                bonusMp = 15;
                bonusHp = 15;
                bonusRegen = 5;
                break;
              case 3:
                bonusMp = 15;
                bonusHp = 15;
                bonusRegen = 5;
                break;
            }
            hero.maxHPHero += bonusHp;
            hero.mp += bonusMp;
            hero.regeneration += bonusRegen;
            updateStats(".hpMax", bonusHp);
            document.querySelector(".hero_hp").setAttribute("data-hp", hero.maxHPHero);
            // const mpMax = document.querySelector(".hero_mp").getAttribute("data-mp");
            document.querySelector(".hero_mp").setAttribute("data-mp", hero.mp);
            calcMp(hero.mana);
            calcHp(".hero_hp", hero.hp);
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
    if (level == "level_2" && branch == "first") {
      this.levels.level_2.first.init(hero);
    }
    if (level == "level_2" && branch == "second") {
      this.levels.level_2.second.init(hero);
    }
    if (level == "level_3" && branch == "first") {
      this.levels.level_3.first.init(hero);
    }
    if (level == "level_3" && branch == "second") {
      this.levels.level_3.second.init(hero);
    }

    console.log(this.levels);
  },
};

export default talentMonk;
