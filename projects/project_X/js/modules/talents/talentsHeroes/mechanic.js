import updateStats from "../../update_stats";
import calcHp from "../../calc_hp";
// import calcMp from "../../calc_mp";
import addText from "../../text";
// import { manaCost, initDescrBtn } from "../../skills";
import mechanicSpecificity from "../../specificity/mechanic_specificity";

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
            let factorDef = 0;
            switch (this.amount) {
              case 1: {
                chance = 17;
                factorDef = 4;
                break;
              }
              case 2: {
                chance = 20;
                factorDef = 5;
                break;
              }
              case 3: {
                chance = 23;
                factorDef = 6;
                break;
              }
              default:
                null;
            }
            hero.mechanicMaster = function (hero, enemy) {
              const chanceTotal = Math.random() * 100 + 1;
              if (chance > chanceTotal) {
                //  const enemyDef = enemy.def;
                // const enemyName = enemy.name;
                let decDef = factorDef;
                if (enemy.def - factorDef < 0) {
                  decDef = enemy.def;
                  enemy.def = decDef;
                } else {
                  enemy.def -= factorDef;
                }
                hero.def += factorDef;
                updateStats(".def", hero.def, true);
                setTimeout(() => {
                  enemy.def += decDef;
                  hero.def -= factorDef;
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
            return 4000;
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
                bonusHp = 45;
                break;
              case 2:
                bonusDodge = 2;
                bonusHp = 15;
                break;
              case 3:
                bonusDodge = 2;
                bonusHp = 15;
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
                bonusDef = 7;
                break;
              case 2:
                bonusDef = 10;
                break;
              case 3:
                bonusDef = 13;
                break;
            }
            return bonusDef;
          } else {
            return 0;
          }
        },
      },
    },
    level_4: {
      first: {
        learn: false,
        amount: 0,
        init: function () {
          if (this.learn) {
            let bonusModDmg = 0,
              chanceToStun = 0;
            switch (this.amount) {
              case 1:
                bonusModDmg = 0.2;
                chanceToStun = 18;
                break;
              case 2:
                bonusModDmg = 0.1;
                chanceToStun = 23;
                break;
              case 3:
                bonusModDmg = 0.1;
                chanceToStun = 28;
                break;
            }
            mechanicSpecificity.mod += bonusModDmg;
            mechanicSpecificity.chanceToStun += chanceToStun;
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let factorHeal = 0;
            switch (this.amount) {
              case 1:
                hero.mechanicFullCapacity = {};
                factorHeal = 10;
                break;
              case 2:
                factorHeal = 14;
                break;
              case 3:
                factorHeal = 18;
                break;
            }
            hero.mechanicFullCapacity.activate = function (maxHPHero) {
              const heal = Math.round(maxHPHero / (100 / factorHeal));
              hero.hp + heal > maxHPHero ? (hero.hp = maxHPHero) : (hero.hp += heal);
              addText(`Режим Турбо восстанавливает вам ${heal} здоровья`, "green");
              calcHp(".hero_hp", hero.hp);
            };
            hero.mechanicFullCapacity.deactivate = function (maxHPHero, enemy) {
              if (enemy.hp >= 0) {
                const dmg = Math.round(maxHPHero / (100 / factorHeal));
                enemy.hp -= dmg;
                addText(`после завершения Режима Турбо вы наносите врагу ${dmg} урона и оглушаетесь`, "cyan");
                hero.stun++;
                calcHp(".enemy_hp", enemy.hp);
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

    if (level == "level_1" && branch == "first") {
      this.levels.level_1.first.init(hero);
    }
    if (level == "level_3" && branch == "first") {
      this.levels.level_3.first.init(hero);
    }
    if (level == "level_4" && branch == "first") {
      this.levels.level_4.first.init(hero);
    }
    if (level == "level_4" && branch == "second") {
      this.levels.level_4.second.init(hero);
    }
    // if (level == "level_3" && branch == "second") {
    //   this.levels.level_3.second.init(hero);
    // }

    console.log(this.levels);
  },
};

export default talentMechanic;
