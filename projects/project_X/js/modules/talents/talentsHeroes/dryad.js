import updateStats from "../../update_stats";
import calcHp from "../../calc_hp";
// import calcMp from "../../calc_mp";
import addText from "../../text";
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
                healProcent = 4;
                break;
              }
              case 2: {
                healProcent = 5;
                break;
              }
              case 3: {
                healProcent = 6;
                break;
              }
              default:
                null;
            }
            setTimeout(() => {
              const healing = setInterval(() => {
                if (count >= 2 || hero.hp < 0) {
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
        init: function (hero) {
          if (this.learn) {
            let absorbDmg = 0;
            switch (this.amount) {
              case 1:
                absorbDmg = 40;
                break;
              case 2:
                absorbDmg = 55;
                break;
              case 3:
                absorbDmg = 70;
                break;
            }
            hero.absorbDamage += absorbDmg;
            setTimeout(() => {
              hero.absorbDamage -= absorbDmg;
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
    level_4: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let bonusHp = 0,
              bonusDef = 0,
              reduceDodge = 0;
            switch (this.amount) {
              case 1:
                bonusHp = 70;
                bonusDef = 3;
                reduceDodge = 3;
                break;
              case 2:
                bonusHp = 35;
                bonusDef = 2;
                reduceDodge = 2;
                break;
              case 3:
                bonusHp = 35;
                bonusDef = 2;
                reduceDodge = 2;
                break;
            }
            hero.maxHPHero += bonusHp;
            updateStats(".hpMax", bonusHp);
            document.querySelector(".hero_hp").setAttribute("data-hp", +hero.maxHPHero);
            calcHp(".hero_hp", hero.hp);
            hero.def += bonusDef;
            hero.dodge -= reduceDodge;
            updateStats(".def", hero.def, true);
            updateStats(".dodge", hero.dodge, true);
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let chance = 0,
              factorDmg = 0;

            switch (this.amount) {
              case 1:
                chance = 16;
                factorDmg = 0.8;
                break;
              case 2:
                chance = 20;
                factorDmg = 1;
                break;
              case 3:
                chance = 24;
                factorDmg = 1.2;
                break;
            }
            hero.dryadMoonlight = function (hero, enemy) {
              const chanceTotal = Math.random() * 100 + 1;
              if (chance > chanceTotal) {
                if (enemy.hp > 0) {
                  const dmg = Math.round(hero.magicPower * factorDmg);
                  enemy.hp -= dmg;
                  addText(`Лунный огонь наносит врагу ${dmg} урона`, "magenta");
                }
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

    // if (level == "level_1" && branch == "first") {
    //   this.levels.level_1.first.init(hero);
    // }
    if (level == "level_2" && branch == "first") {
      this.levels.level_2.first.init(hero);
    }
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
};

export default talentDryad;
