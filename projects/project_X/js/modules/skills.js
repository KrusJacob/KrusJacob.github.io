import addText from "./text";
import updateStats from "./update_stats";
import calcHp from "./calc_hp";
import talentWarrior from "./talents/talentsHeroes/warrior";
import talentRogue from "./talents/talentsHeroes/rogue";
import talentJester from "./talents/talentsHeroes/jester";
import talentDryad from "./talents/talentsHeroes/dryad";
import talentMechanic from "./talents/talentsHeroes/mechanic";
import talentWitchmag from "./talents/talentsHeroes/witchmag";
import talentMage from "./talents/talentsHeroes/mage";

import { critPowerMod, critСhanceMod, adaptMod } from "./mods/mods";

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
    mechanic: 70,
    witchmag: 70,
    mage: 30,
  },

  active: false,
  enemy: {},
  maxHPHero: 0,
  monkGates: 0,
  onIceShield: false,

  skills: function (hero, mana) {
    // target.hp = +document.querySelector(".enemy_hp").getAttribute("data-current_hp");
    switch (hero.name) {
      case "warrior":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.warrior) {
          let buffmagicPower = hero.magicPower * 0.0115 + 1;
          // level_1 first
          let dmg = Math.round(50 + hero.def * 2.6 * buffmagicPower * talentWarrior.levels.level_1.first.init());
          // level_2 first
          talentWarrior.levels.level_2.first.init(this.enemy);

          this.enemy.hp -= dmg;
          addText(`Вы наносите удар щитом: ${dmg} урона, и ставите блок`, "cyan");

          if (this.enemy.hp > 0) {
            let buffdef = Math.round(hero.def * 0.8 * buffmagicPower) + 10;
            hero.def += buffdef;

            // level_2 second
            let absorbDmg = talentWarrior.levels.level_2.second.init();
            hero.absorbDamage += absorbDmg;

            // level_3 first
            talentWarrior.levels.level_3.first.init(hero, this.maxHPHero);

            updateStats(".def", hero.def, true);
            setTimeout(() => {
              hero.def -= buffdef;
              updateStats(".def", hero.def, true);

              hero.absorbDamage -= absorbDmg;
            }, 8000);
          }
          mana -= this.manaCost.warrior;
          hero.audio.skill();
          // mana = 0;
          // this.mana = 0;
        }
        return [mana, this.enemy.hp];

      case "rogue":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.rogue) {
          let buffmagicPower = hero.magicPower * 0.01 + 1;
          let dmg = Math.round(25 + (hero.attack[0] + hero.attack[1]) * 0.6 * buffmagicPower);
          // level_2 second

          dmg += talentRogue.levels.level_2.second.init(this.enemy);

          this.enemy.hp -= dmg;
          // level_2 first
          const decDef = Math.round(this.enemy.def / talentRogue.levels.level_2.first.init());
          const enemyName = this.enemy.name;
          this.enemy.def -= decDef;
          addText(`Вы совершаете быстрый, двойной удар: ${dmg} урона`, "cyan");

          // level_3 first
          talentRogue.levels.level_3.first.init(hero, dmg, this.maxHPHero);
          // level_3 second
          talentRogue.levels.level_3.second.init(hero);

          setTimeout(() => {
            if (enemyName == this.enemy.name) {
              this.enemy.def += decDef;
            }
          }, 6000);
          mana -= this.manaCost.rogue;
          hero.audio.skill();
        }
        return [mana, this.enemy.hp];

      case "monk":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.monk) {
          let buffmagicPower = hero.magicPower * 0.011 + 1;
          const initBuffStats = Math.round(10 * buffmagicPower);
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
          hero.audio.skill();
        }
        return [mana, this.enemy.hp];

      case "jester":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.jester) {
          let buffmagicPower = hero.magicPower * 0.0115 + 1;
          let bonusChance = hero.luck * 0.2;
          let chance = Math.random() * 100 + 1 + bonusChance;
          if (chance <= 33) {
            let bonus = hero.luck * 1.2;
            let heal = 35 + Math.round((this.maxHPHero / 13 + bonus) * buffmagicPower);
            hero.hp + heal > this.maxHPHero ? (hero.hp = this.maxHPHero) : (hero.hp += heal);
            addText(`карта:Валет, вы исцеляетесь на ${heal}`, "cyan");
          } else if (chance > 33 && chance <= 58) {
            let bonus = hero.luck * 1.35;
            let dmg = 35 + Math.round((this.enemy.hp / 12 + bonus) * buffmagicPower);
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
          } else if (chance > 77 && chance <= 97) {
            let bonus = hero.luck * 1.45;
            let dmgHeal = 45 + Math.round((this.enemy.hp / 17 + bonus) * buffmagicPower);
            hero.hp + dmgHeal > this.maxHPHero ? (hero.hp = this.maxHPHero) : (hero.hp += dmgHeal);
            this.enemy.hp -= dmgHeal;
            addText(`Карта:Туз, вы наносите врагу ${dmgHeal} урона и исцеляетесь`, "cyan");
          } else if (chance > 97) {
            let bonus = hero.luck * 1.6;
            let dmg = 50 + Math.round((this.maxHPHero / 14 + bonus) * buffmagicPower);
            this.enemy.hp -= dmg;
            this.enemy.stun += 2;
            addText(`Карта:Джокер, наносит ${dmg} урона, и оглушает противника на 2 хода`, "cyan");
          }
          // level_3 first
          talentJester.levels.level_3.first.init(this.enemy);
          // level_3 second
          talentJester.levels.level_3.second.init(hero);
          // level_4 first
          talentJester.levels.level_4.first.init(this.enemy);

          mana -= this.manaCost.jester;
          hero.audio.skill();
        }
        return [mana, this.enemy.hp];

      case "dryad":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.dryad) {
          let heal;
          let buffmagicPower = hero.magicPower * 0.022 + 1;
          if (hero.hp <= this.maxHPHero / 5) {
            heal = 60 + Math.round((this.maxHPHero / 13) * buffmagicPower);
          } else {
            heal = 40 + Math.round((this.maxHPHero / 14) * buffmagicPower);
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
          talentDryad.levels.level_3.first.init(hero);

          mana -= this.manaCost.dryad;
          hero.audio.skill();
        }
        return [mana, this.enemy.hp];

      case "mechanic":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.mechanic && !this.active) {
          let buffmagicPower = hero.magicPower * 0.011 + 1;
          const buffAttack = Math.round(buffmagicPower * 21);
          const buffMinAttack = Math.round(hero.attack[0] * (buffAttack / 100));
          const buffMaxAttack = Math.round(hero.attack[1] * (buffAttack / 100));
          const buffDefTalent = talentMechanic.levels.level_3.second.init();
          const buffDef = Math.round((hero.def * 0.2 + 6 + buffDefTalent) * buffmagicPower);
          const buffAdapt = 30 + talentMechanic.levels.level_2.first.init();
          const duration = Math.round(8000 + talentMechanic.levels.level_2.second.init());
          this.active = true;
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
          // level_4 second
          hero.mechanicFullCapacity ? hero.mechanicFullCapacity.activate(this.maxHPHero) : null;
          setTimeout(() => {
            hero.def -= buffDef;
            hero.adapt -= buffAdapt;
            hero.attack[0] -= buffMinAttack;
            hero.attack[1] -= buffMaxAttack;
            updateStats(".def", hero.def, true);
            updateStats(".adapt", hero.adapt, true);
            updateStats(".attackMin", hero.attack[0], true);
            updateStats(".attackMax", hero.attack[1], true);
            this.active = false;
            hero.mechanicFullCapacity ? hero.mechanicFullCapacity.deactivate(this.maxHPHero, this.enemy) : null;
          }, duration);
          mana -= this.manaCost.mechanic;
          hero.audio.skill();
        }
        return [mana, this.enemy.hp];

      case "witchmag":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.witchmag) {
          let buffmagicPower = hero.magicPower * 0.018 + 1;

          // level_1 first
          const factorDmg = talentWitchmag.levels.level_1.first.init();
          let dmg = 17 + Math.round((this.enemy.maxHPEnemy / 60) * buffmagicPower * factorDmg);

          // level_2 second
          const duration = talentWitchmag.levels.level_2.second.init();
          let count = 0;
          addText(`Вы накладываете проклятие на противника`, "cyan");

          setTimeout(() => {
            // level_3 first
            hero.witchmagEnchBlade ? hero.witchmagEnchBlade(true) : null;
            hero.witchmagCurseWeakness ? hero.witchmagCurseWeakness.activate(this.enemy) : null;

            const dot = setInterval(() => {
              if (count >= duration || this.enemy.hp <= 0 || hero.hp < 0) {
                clearInterval(dot);
                hero.witchmagCurseWeakness ? hero.witchmagCurseWeakness.deactivate(this.enemy) : null;
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
          hero.audio.skill();
        }
        return [mana, this.enemy.hp];

      case "mage":
        if (hero.hp > 0 && this.enemy.hp > 0 && mana >= this.manaCost.mage) {
          let buffmagicPower = hero.magicPower * 0.0255 + 1;

          const fireBoll = () => {
            let dmg = Math.round(5 + (35 + hero.lvl) * buffmagicPower);
            const сheckCrit = Math.round(Math.random() * 100) + 1;
            if (сheckCrit <= critСhanceMod(hero.critChance) - adaptMod(this.enemy.adapt)) {
              dmg = Math.round(dmg * (critPowerMod(hero.critPower) / 100));
              this.enemy.hp -= dmg;
              addText(`Вы запускаете огромный огненный шар во врага, нанося ${dmg} урона`, "cyan");
            } else {
              this.enemy.hp -= dmg;
              addText(`Вы запускаете огненный шар во врага, нанося ${dmg} урона`, "cyan");
            }
            // mage level_2 second
            talentMage.levels.level_2.second.init(hero, this.enemy);
            // mage level_4 second
            hero.mageFireShield ? hero.mageFireShield.use() : null;

            hero.audio.skill.fire();
          };
          const iceShield = () => {
            hero.barrier = Math.round(10 + (hero.magicPower + hero.lvl) * 1.1);
            hero.mageOnIceShield = true;
            addText(`Вы создаете ледяной щит. Прочность: ${hero.barrier}`, "cyan");
            // setTimeout(() => {
            //   hero.absorbDamage = 0;
            //   hero.mageOnIceShield = false;
            // }, 8000);
            hero.audio.skill.iceCreate();
          };
          const thunderСlap = () => {
            const сheckCrit = Math.round(Math.random() * 100) + 1;
            let dmg = Math.round((25 + hero.lvl) * buffmagicPower);
            if (сheckCrit <= critСhanceMod(hero.critChance) - adaptMod(this.enemy.adapt)) {
              dmg = Math.round(dmg * (critPowerMod(hero.critPower) / 100));
              this.enemy.hp -= dmg;
              addText(`Вы паражаете врага серией ударов молнии, нанося ${dmg} урона и оглушая его`, "cyan");
            } else {
              this.enemy.hp -= dmg;
              addText(`Вы паражаете врага ударом молнии, нанося ${dmg} урона и оглушая его`, "cyan");
            }
            // mage level_4 first
            talentMage.levels.level_4.first.init(hero, this.enemy);
            this.enemy.stun++;
            hero.audio.skill.lightning();
          };

          hero.hp > this.maxHPHero / 2 ? fireBoll() : hero.mageOnIceShield ? thunderСlap() : iceShield();

          mana -= this.manaCost.mage;
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
