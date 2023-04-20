import updateStats from "../../update_stats";
import calcHp from "../../calc_hp";
import calcMp from "../../calc_mp";
import addText from "../../text";

const talentMage = {
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
                hero.magicPower += 4;
                hero.critChance += 3;
                break;
              }
              case 2: {
                hero.magicPower += 2;
                hero.critChance += 1;
                break;
              }
              case 3: {
                hero.magicPower += 2;
                hero.critChance += 1;
                break;
              }
              default:
                null;
            }
            updateStats(".magicPower", hero.magicPower, true);
            updateStats(".critChance", hero.critChance, true);
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
            hero.mageShieldReflect = function () {
              return Math.round(hero.magicPower / 2);
            };
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero, enemy) {
          if (this.learn) {
            const duration = 3;
            let count = 0;
            let dmg = Math.floor(10 + hero.magicPower / 2);
            const dot = setInterval(() => {
              if (count >= duration || enemy.hp <= 0 || hero.hp < 0) {
                clearInterval(dot);
              } else {
                enemy.hp -= dmg;
                count++;
                addText(`Враг горит и получает ${dmg} урона,`, "cyan");
                calcHp(".enemy_hp", enemy.hp);
              }
            }, 2000);
          } else {
            return null;
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
            let factor = 0;
            switch (this.amount) {
              case 1:
                factor = 12;
                break;
              case 2:
                factor = 15;
                break;
              case 3:
                factor = 18;
                break;
            }
            hero.mageSkillMage = function () {
              const barrier = Math.round(hero.maxHPHero / (100 / factor));
              hero.barrier += barrier;
              hero.mageOnIceShield = true;
            };
          }
        },
      },
      second: {
        learn: false,
        amount: 0,
        init: function (hero) {
          if (this.learn) {
            let factorHealHp = 0;
            let healMp = 0;
            switch (this.amount) {
              case 1:
                factorHealHp = 12;
                healMp = 15;
                break;
              case 2:
                factorHealHp = 14;
                healMp = 20;
                break;
              case 3:
                factorHealHp = 16;
                healMp = 25;
                break;
            }
            hero.magePotionsCooking = function () {
              let healHp = Math.round(hero.maxHPHero / (100 / factorHealHp));
              if (hero.hp + healHp > hero.maxHPHero) {
                healHp = hero.maxHPHero - hero.hp;
              }
              hero.hp += healHp;
              hero.mana += healMp;

              calcHp(".hero_hp", hero.hp);
              calcMp(hero.mana);
              addText(
                `Вы выпиваете сваренное зелье и восстанавливаете себе ${healHp} здоровья и ${healMp} ману`,
                "aqua"
              );
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
    if (level == "level_2" && branch == "first") {
      this.levels.level_2.first.init(hero);
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

export default talentMage;
