import addText from "./text";
import updateStats from "./update_stats";
import calcHp from "./calc_hp";
import talentWarrior from "./talents/talentsHeroes/warrior";
import talentRogue from "./talents/talentsHeroes/rogue";
import talentJester from "./talents/talentsHeroes/jester";
import talentDryad from "./talents/talentsHeroes/dryad";
import talentMechanic from "./talents/talentsHeroes/mechanic";
import talentWitchmag from "./talents/talentsHeroes/witchmage";

// Воин
// урон + защита

// Разбойник
// 2-ой удар - игнор брони

// Монах
// + уклон и криты

// Шут
//

// Друид
// исцеление

// Механик
// + статы

const skill = {
  manaCost: {
    // warrior: 5,
    warrior: 80,
    rogue: 80,
    // rogue: 10,
    monk: 45,
    jester: 60,
    // jester: 5,
    dryad: 90,
    // dryad: 40,
    mechanic: 75,
    witchmag: 70,
  },

  enemy: {},
  maxHPHero: 0,
  monkGates: 0,

  skills: function (hero, mana) {
    // target.hp = +document.querySelector(".enemy_hp").getAttribute("data-current_hp");
    switch (hero.name) {
      case "warrior":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.warrior) {
          let buffmagicPower = hero.magicPower * 0.012 + 1;
          // level_1 first
          let dmg = Math.round(45 + hero.def * 2.75 * buffmagicPower * talentWarrior.levels.level_1.first.init());
          // level_2 first
          talentWarrior.levels.level_2.first.init(this.enemy);

          this.enemy.hp -= dmg;
          addText(`Вы наносите удар щитом: ${dmg} урона, и ставите блок`, "cyan");

          if (this.enemy.hp > 0) {
            let buffdef = Math.round(hero.def * 0.8 * buffmagicPower) + 8;
            hero.def += buffdef;

            // level_2 second
            hero.absorbDamage = talentWarrior.levels.level_2.second.init();

            // level_3 first
            talentWarrior.levels.level_3.first.init(hero, this.maxHPHero);

            updateStats(".def", hero.def, true);
            setTimeout(() => {
              hero.def -= buffdef;
              updateStats(".def", hero.def, true);

              hero.absorbDamage = 0;
            }, 8000);
          }
          mana -= this.manaCost.warrior;
          // mana = 0;
          // this.mana = 0;
        }
        return [mana, this.enemy.hp];

      case "rogue":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.rogue) {
          let buffmagicPower = hero.magicPower * 0.01 + 1;
          let dmg = Math.round(30 + (hero.attack[0] + hero.attack[1]) * 0.6 * buffmagicPower);
          // level_2 second

          dmg += talentRogue.levels.level_2.second.init(this.enemy);

          this.enemy.hp -= dmg;
          const enemyDef = this.enemy.def;
          const enemyName = this.enemy.name;
          // level_2 first
          this.enemy.def -= Math.round(this.enemy.def / talentRogue.levels.level_2.first.init());
          addText(`Вы совершаете быстрый, двойной удар: ${dmg} урона`, "cyan");

          // level_3 first
          talentRogue.levels.level_3.first.init(hero, dmg, this.maxHPHero);
          // level_3 second
          talentRogue.levels.level_3.second.init(hero);

          setTimeout(() => {
            if (enemyName == this.enemy.name) {
              this.enemy.def = enemyDef;
            }
          }, 6000);
          mana -= this.manaCost.rogue;
        }
        return [mana, this.enemy.hp];

      case "monk":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.monk) {
          let buffmagicPower = hero.magicPower * 0.011 + 1;
          const initBuffStats = Math.round(11 * buffmagicPower);
          const buffOfGate = Math.round(this.monkGates * 1.75);
          const finishBuff = initBuffStats + buffOfGate;

          hero.dodge += finishBuff;
          hero.critChance += finishBuff;
          hero.adapt += finishBuff;
          this.monkGates++;

          switch (this.monkGates) {
            case 1:
              addText(`1: Врата Начала открыты... +${finishBuff} к характеристикам `, "cyan");
              break;
            case 2:
              addText(`2 :Врата Жизни открыты... +${finishBuff} к характеристикам`, "cyan");
              break;
            case 3:
              addText(`3: Врата Боли открыты... +${finishBuff} к характеристикам`, "cyan");
              break;
            case 4:
              addText(`4: Врата Предела открыты... +${finishBuff} к характеристикам`, "cyan");
              break;
            case 5:
              addText(`5: Врата Прозрения открыты... +${finishBuff} к характеристикам`, "cyan");
              break;
            case 6:
              addText(`6: Врата Чуда открыты... +${finishBuff} к характеристикам`, "cyan");
              break;
            case 7:
              addText(`7: Врата Смерти открыты... +${finishBuff} к характеристикам`, "cyan");
              break;
            default:
              break;
          }
          updateStats(".dodge", hero.dodge, true);
          updateStats(".critChance", hero.critChance, true);
          updateStats(".adapt", hero.adapt, true);

          setTimeout(() => {
            hero.dodge -= finishBuff;
            hero.critChance -= finishBuff;
            hero.adapt -= finishBuff;
            this.monkGates--;

            updateStats(".dodge", hero.dodge, true);
            updateStats(".critChance", hero.critChance, true);
            updateStats(".adapt", hero.adapt, true);
          }, 12000);

          mana -= this.manaCost.monk;
        }
        return [mana, this.enemy.hp];

      case "jester":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.jester) {
          let buffmagicPower = hero.magicPower * 0.012 + 1;
          let bonusChance = hero.luck * 0.2;
          let chance = Math.random() * 100 + 1 + bonusChance;
          if (chance <= 33) {
            let bonus = hero.luck * 1.25;
            let heal = 35 + Math.round((this.maxHPHero / 12 + bonus) * buffmagicPower);
            hero.hp + heal > this.maxHPHero ? (hero.hp = this.maxHPHero) : (hero.hp += heal);
            addText(`карта:Валет, вы исцеляетесь на ${heal}`, "cyan");
          } else if (chance > 33 && chance <= 58) {
            let bonus = hero.luck * 1.35;
            let dmg = 35 + Math.round((this.enemy.hp / 11 + bonus) * buffmagicPower);
            this.enemy.hp -= dmg;
            addText(`карта:Дама, вы наносите врагу ${dmg} урона`, "cyan");
          } else if (chance > 58 && chance <= 77) {
            const duration = Math.round(5000 * buffmagicPower);

            hero.dodge += 100;
            addText(`карта:Король, уклонение повышено на 100% на ${(duration / 1000).toFixed()} секунд`, "cyan");
            updateStats(".dodge", hero.dodge, true);
            setTimeout(() => {
              hero.dodge -= 100;
              updateStats(".dodge", hero.dodge, true);
            }, duration);
          } else if (chance > 77 && chance <= 95) {
            let bonus = hero.luck * 1.45;
            let dmgHeal = 35 + Math.round((this.enemy.hp / 16 + bonus) * buffmagicPower);
            hero.hp + dmgHeal > this.maxHPHero ? (hero.hp = this.maxHPHero) : (hero.hp += dmgHeal);
            this.enemy.hp -= dmgHeal;
            addText(`Карта:Туз, вы наносите врагу ${dmgHeal} урона и исцеляетесь`, "cyan");
          } else if (chance > 95) {
            let bonus = hero.luck * 1.6;
            let dmg = 35 + Math.round((this.maxHPHero / 13 + bonus) * buffmagicPower);
            this.enemy.hp -= dmg;
            if (this.enemy.hp <= 0) {
              let heal = 35 + Math.round(this.maxHPHero / 13 + bonus);
              hero.hp + heal > this.maxHPHero ? (hero.hp = this.maxHPHero) : (hero.hp += heal);
              mana += 50;
            }
            addText(`Карта:Джокер, наносит ${dmg} урона, если враг убит исцеляетесь и получаете 50 маны`, "cyan");
          }
          // level_3 first
          talentJester.levels.level_3.first.init(this.enemy);
          // level_3 second
          talentJester.levels.level_3.second.init(hero);

          mana -= this.manaCost.jester;
        }
        return [mana, this.enemy.hp];

      case "dryad":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.dryad) {
          let heal;
          let buffmagicPower = hero.magicPower * 0.022 + 1;
          if (hero.hp <= this.maxHPHero / 5) {
            heal = 70 + Math.round((this.maxHPHero / 13) * buffmagicPower);
          } else {
            heal = 45 + Math.round((this.maxHPHero / 14) * buffmagicPower);
          }
          hero.hp + heal > this.maxHPHero ? (hero.hp = this.maxHPHero) : (hero.hp += heal);
          let dmg = Math.round(heal / 2);
          // level_2 second
          dmg = Math.round(dmg * talentDryad.levels.level_2.second.init());

          this.enemy.hp -= dmg;
          addText(`Вы исцеляете себя на ${heal}, а враг получает ${dmg} урона`, "cyan");

          // level_1 first
          talentDryad.levels.level_1.first.init(hero, this.maxHPHero);
          // level_3 first
          talentDryad.levels.level_3.first.init(this.enemy);

          mana -= this.manaCost.dryad;
        }
        return [mana, this.enemy.hp];

      case "mechanic":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.mechanic) {
          let buffmagicPower = hero.magicPower * 0.011 + 1;
          const buffAttack = Math.round(buffmagicPower * 21);
          const buffMinAttack = Math.round(hero.attack[0] * (buffAttack / 100));
          const buffMaxAttack = Math.round(hero.attack[1] * (buffAttack / 100));
          const buffDefTalent = talentMechanic.levels.level_3.second.init();
          const buffDef = Math.round((hero.def * 0.2 + 5 + buffDefTalent) * buffmagicPower);
          const buffAdapt = 30 + talentMechanic.levels.level_2.first.init();
          const duration = Math.round(8000 + talentMechanic.levels.level_2.second.init());
          hero.def += buffDef;
          hero.adapt += buffAdapt;
          hero.attack[0] += buffMinAttack;
          hero.attack[1] += buffMaxAttack;
          addText(
            `Режим турбо: атака + ${buffAttack}%, защита + ${buffDef}, адаптивность + ${buffAdapt}% (${(
              duration / 1000
            ).toFixed()} секунд)`,
            "cyan"
          );
          updateStats(".def", hero.def, true);
          updateStats(".adapt", hero.adapt, true);
          updateStats(".attackMin", hero.attack[0], true);
          updateStats(".attackMax", hero.attack[1], true);
          setTimeout(() => {
            hero.def -= buffDef;
            hero.adapt -= buffAdapt;
            hero.attack[0] -= buffMinAttack;
            hero.attack[1] -= buffMaxAttack;
            updateStats(".def", hero.def, true);
            updateStats(".adapt", hero.adapt, true);
            updateStats(".attackMin", hero.attack[0], true);
            updateStats(".attackMax", hero.attack[1], true);
          }, duration);
          mana -= this.manaCost.mechanic;
        }
        return [mana, this.enemy.hp];

      case "witchmag":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.witchmag) {
          let buffmagicPower = hero.magicPower * 0.02 + 1;

          // level_1 first
          const factorDmg = talentWitchmag.levels.level_1.first.init();
          let dmg = 16 + Math.round((this.enemy.maxHPEnemy / 55) * buffmagicPower * factorDmg);

          // level_2 second
          const duration = talentWitchmag.levels.level_2.second.init();
          let count = 0;
          addText(`Вы накладываете проклятие на противника`, "cyan");

          setTimeout(() => {
            // level_3 first
            hero.witchmagEnchBlade ? hero.witchmagEnchBlade(true) : null;

            const dot = setInterval(() => {
              if (count >= duration || this.enemy.hp <= 0 || hero.hp < 0) {
                clearInterval(dot);

                hero.witchmagEnchBlade ? hero.witchmagEnchBlade(false) : null;
              } else {
                this.enemy.hp -= dmg;
                hero.hp += dmg;
                count++;

                // level_2 first
                talentWitchmag.levels.level_2.first.init(hero);
                // count >= 3 || this.enemy.hp <= 0 ? clearInterval(dot) : count++;
                addText(`проклятие высасывает у врага ${dmg} жизненной силы,`, "cyan");
                count >= duration ? talentWitchmag.levels.level_3.second.init(this.enemy) : null;
                calcHp(".enemy_hp", this.enemy.hp);
                calcHp(".hero_hp", hero.hp);
              }
            }, 2000);
          }, 150);

          mana -= this.manaCost.witchmag;
        }
        return [mana, this.enemy.hp];
    }
  },

  initDescrBtn: function (name) {
    const skillBlock = document.querySelector(".hero__parametrs .skill__block"),
      skillTitle = skillBlock.querySelector(".skill__block_title").textContent,
      skillDescr = skillBlock.querySelector("span").textContent,
      SkillBtn = document.querySelector(".text__skill .btn__descr");

    SkillBtn.querySelector("span").textContent = skillTitle;
    SkillBtn.querySelector("p").textContent = skillDescr;
    SkillBtn.querySelector("small").textContent = this.manaCost[name];
  },

  updateInform: function (enemy, maxHPHero) {
    (this.enemy = enemy), (this.maxHPHero = maxHPHero);
  },
};

// export default skills;
export default skill;

export const { manaCost, initDescrBtn } = skill;
