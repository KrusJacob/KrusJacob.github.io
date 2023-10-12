import updateStats from "../../update_stats";
// import calcHp from "../../calc_hp";
import calcMp from "../../calc_mp";
import addText from "../../text";

const talentJester = {
  hero: {},

  levels: {
    level_1: {
      first: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let bonusMana = 0;
            switch (this.amount) {
              case 1: {
                bonusMana = 16;
                break;
              }
              case 2: {
                bonusMana = 21;
                break;
              }
              case 3: {
                bonusMana = 28;
                break;
              }
              default:
                null;
            }
            hero.jesterShifflDeck = function () {
              return bonusMana;
            };
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
            hero.luck += 10;
            updateStats(".luck", hero.luck, true);
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            hero.attack[0] += 7;
            hero.attack[1] += 7;
            hero.critChance += 7;
            updateStats(".attackMin", hero.attack[0], true);
            updateStats(".attackMax", hero.attack[1], true);
            updateStats(".critChance", hero.critChance, true);
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
            let chance = 0;
            let factorDmg = 1;
            switch (this.amount) {
              case 1:
                chance = 50;
                factorDmg = 0.7;
                break;
              case 2:
                chance = 60;
                factorDmg = 0.65;
                break;
              case 3:
                chance = 70;
                factorDmg = 0.6;
                break;
            }
            const chanceTotal = Math.random() * 100 + 1;
            if (chance > chanceTotal) {
              addText(`Атака врага уменьшена на 3 хода`, "magenta");
              enemy.multiplierDmg = factorDmg;
              setTimeout(() => {
                enemy.multiplierDmg = 1;
              }, 6000);
            }

            //   return 0;
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let chance = 0,
              bonusMana = 0;
            switch (this.amount) {
              case 1:
                chance = 18;
                bonusMana = 40;
                break;
              case 2:
                chance = 20;
                bonusMana = 50;
                break;
              case 3:
                chance = 22;
                bonusMana = 60;
                break;
            }
            const chanceTotal = Math.random() * 100 + 1;
            if (chance > chanceTotal) {
              setTimeout(() => {
                hero.mana += bonusMana;
                addText(`Вы смухлевали и восстановили ${bonusMana} маны`, "magenta");
                calcMp(hero.mana);
              }, 400);
            }
          }
        },
      },
    },
    level_4: {
      first: {
        learn: false,
        amount: 0,
        init: function (enemy) {
          if (this.learn) {
            let chance = 0;
            let factorDmg = 0;
            switch (this.amount) {
              case 1:
                chance = 23;
                factorDmg = 16;
                break;
              case 2:
                chance = 28;
                factorDmg = 18;
                break;
              case 3:
                chance = 33;
                factorDmg = 20;
                break;
            }
            const chanceTotal = Math.random() * 100 + 1;
            if (chance > chanceTotal) {
              let mod = 1;
              enemy.name == "boss" ? (mod = 0.5) : null;
              if (enemy.hp > 0) {
                const dmg = Math.round(enemy.maxHPEnemy / (100 / (factorDmg * mod)));
                enemy.hp -= dmg;
                addText(`Подсунув Взрывной подарок вы наносите ${dmg} урона`, "magenta");
              }
            }
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let bonusDodge = 0,
              bonusAdapt = 0;
            switch (this.amount) {
              case 1:
                bonusDodge = 6;
                bonusAdapt = 6;
                break;
              case 2:
                bonusDodge = 3;
                bonusAdapt = 3;
                break;
              case 3:
                bonusDodge = 3;
                bonusAdapt = 3;
                break;
            }
            hero.dodge += bonusDodge;
            hero.adapt += bonusAdapt;
            updateStats(".dodge", hero.dodge, true);
            updateStats(".adapt", hero.adapt, true);
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
    if (level == "level_4" && branch == "second") {
      this.levels.level_4.second.init(hero);
    }

    console.log(this.levels);
  },
};

export default talentJester;
