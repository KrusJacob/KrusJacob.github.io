import updateStats from "../../update_stats";
import calcHp from "../../calc_hp";
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
                factorDmg = 1.18;
                break;
              case 2:
                factorDmg = 1.25;
                break;
              case 3:
                factorDmg = 1.32;
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
            return 4;
          } else {
            return 3;
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
                buffAttack = 3;
                bonusAttack = 9;
                break;
              case 3:
                buffAttack = 3;
                bonusAttack = 12;
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
    level_4: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let chance = 0,
              factor = 0;
            switch (this.amount) {
              case 1:
                chance = 8;
                factor = 0.6;
                break;
              case 2:
                chance = 10;
                factor = 0.8;
                break;
              case 3:
                chance = 12;
                factor = 1;
                break;
            }
            hero.witchmagThirstBlade = function (hero, enemy) {
              const chanceTotal = Math.random() * 100 + 1;
              console.log(chanceTotal);
              if (chance > chanceTotal) {
                let value = Math.round(((hero.attack[0] + hero.attack[1]) / 2) * factor);
                if (enemy.hp > 0) {
                  setTimeout(() => {
                    enemy.hp -= value;
                    hero.hp + value > hero.maxHPHero ? (hero.hp = hero.maxHPHero) : (hero.hp += value);
                    calcHp(".hero_hp", hero.hp);
                    calcHp(".enemy_hp", enemy.hp);
                    addText(`Жажда клинка высасывает у врага ${value} здоровья`, "magenta");
                  }, 200);
                }
              }
            };
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let factor = 0,
              currentDef = 0,
              currentMinAttack = 0,
              currentMaxAttack = 0;

            switch (this.amount) {
              case 1:
                hero.witchmagCurseWeakness = {};
                factor = 0.22;
                break;
              case 2:
                factor = 0.28;
                break;
              case 3:
                factor = 0.34;
                break;
            }
            hero.witchmagCurseWeakness.activate = function (enemy) {
              currentDef = enemy.def;
              currentMinAttack = enemy.attack[0];
              currentMaxAttack = enemy.attack[1];

              enemy.def -= Math.round(enemy.def * factor);
              enemy.attack[0] -= Math.round(enemy.attack[0] * factor);
              enemy.attack[1] -= Math.round(enemy.attack[1] * factor);
            };
            hero.witchmagCurseWeakness.deactivate = function (enemy) {
              enemy.def = currentDef;
              enemy.attack[0] -= currentMinAttack;
              enemy.attack[1] -= currentMaxAttack;
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

export default talentWitchmag;
