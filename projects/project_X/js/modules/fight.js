import calcHp from "./calc_hp";
import calcMp from "./calc_mp";
import addText from "./text";
import getXp from "./artifacts";
import goldCoin from "./gold_coin";
import updateStats from "./update_stats";
import skill from "./skills";
import buff from "./buff";
import { critPowerMod, critСhanceMod, dodgeMod, defMod, adaptMod, vampiricMod } from "./mods/mods";
import {
  warriorSpecificity,
  monkSpecificity,
  jesterSpecificity,
  witchmagSpecificity,
  mechanicSpecificity,
  mageSpecificity,
} from "./specificity/heroes_specificity";
// import monkSpecificity from "./specificity/monk_specificity";

import AudioAction from "./audio/audio";

//

//

let regenDryad = 5;
// let comboMechanic;

let manaRegen = 5;

const textRaidLvl = document.querySelector(".text__raid span");

let enemyCount = 0;

function fight(target, assaulter, btnsHidden, btnReload, btnDisplay) {
  let maxHPHero = +document.querySelector(".hero_hp").getAttribute("data-hp");
  let maxHPEnemy = +document.querySelector(".enemy_hp").getAttribute("data-hp");
  target.maxHPEnemy = maxHPEnemy;
  assaulter.maxHPHero = maxHPHero;
  let maxMP = assaulter.maxMPHero;
  // comboMechanic = 0;
  let buffAttack = 0;
  let buffDodge = 0;
  let bloodOrkTrigger = false;
  let darknessStep;
  let staffOmbalStep = 0;
  let sphereDMStep = false;
  mechanicSpecificity.use();

  assaulter.stun = 0;

  function battle(target, assaulter) {
    // Вычисление атаки
    function attack(att, def, critChance, critPower, dodge, adapt, absorb = 0) {
      const checkDodge = Math.round(Math.random() * 100) + 1;

      if (checkDodge <= dodgeMod(dodge) - adaptMod(adapt)) {
        return "Промах";
      } else {
        const result = Math.floor(att[0] + Math.random() * (att[1] + 1 - att[0]));
        const сheckCrit = Math.round(Math.random() * 100) + 1;
        if (сheckCrit <= critСhanceMod(critChance) - adaptMod(adapt)) {
          if (Math.round(result * (critPowerMod(critPower) / 100) - defMod(def)) <= 0) {
            return { dmg: 2, crit: ` Критический удар!` };
          } else {
            return {
              dmg: Math.round(result * (critPower / 100) - defMod(def)) * ((100 - absorb) / 100),
              crit: ` Критический удар!`,
            };
          }
        }
        if (result - defMod(def) <= 0) {
          return { dmg: 1, crit: "" };
        } else {
          return { dmg: Math.round((result - defMod(def)) * ((100 - absorb) / 100)), crit: "" };
        }
      }
    }

    let ObjDmg = attack(
      assaulter.attack,
      target.def,
      assaulter.critChance,
      assaulter.critPower,
      target.dodge,
      assaulter.adapt
    );
    let ObjDmgEnemy = attack(
      target.attack,
      assaulter.def,
      target.critChance,
      target.critPower,
      assaulter.dodge + buffDodge,
      target.adapt,
      assaulter.absorbDamage
    );

    // Начало боя

    if (target.hp <= 0) {
      clearInterval(battleSetInterval);
      finishFight();
      return;
    }
    if (assaulter.stun) {
      addText(`Вы оглушены (${assaulter.stun} ход)`, "orange");
      assaulter.stun--;
    } else {
      if (ObjDmg === "Промах") {
        // AudioAction("missAttack");
        assaulter.audio.miss();
        addText("Промах!", "orange");
        mechanicSpecificity.use();

        assaulter.arts.swordKingHell ? swordKingHell(assaulter, target) : null;
      } else {
        // ObjDmg.crit ? AudioAction("swordCrit") : AudioAction("swordStrike");
        ObjDmg.crit ? assaulter.audio.crit() : assaulter.audio.attack();

        let dmgHeroNum = ObjDmg.dmg + buffAttack;

        dmgHeroNum += redDagger(assaulter.arts.redDagger, target.def);
        // mechanic specificify
        useUtilityByHeroName("mechanic", () => (dmgHeroNum = mechanicSpecificity.use(dmgHeroNum, target)), []);
        // jester specificify
        useUtilityByHeroName(
          "jester",
          () => (dmgHeroNum = jesterSpecificity(assaulter, dmgHeroNum, target.def)),
          []
        );
        // witchmag specificify
        useUtilityByHeroName(
          "witchmag",
          () => (dmgHeroNum = dmgHeroNum + witchmagSpecificity(assaulter.magicPower)),
          []
        );
        // monk level_2 second
        useUtilityByHeroName("monk", () => monkTiger(assaulter, target), [assaulter.monkTiger, ObjDmg.crit]);
        // monk level_3 first
        useUtilityByHeroName("monk", () => monkLotus(assaulter, target), [assaulter.monkLotus]);
        // monk specificity
        useUtilityByHeroName("monk", () => monkSpecificity.use(target), []);
        // mechanic level_1 first
        useUtilityByHeroName("mechanic", () => assaulter.mechanicMaster(assaulter, target), [
          assaulter.mechanicMaster,
        ]);
        // dryad level_4 second
        useUtilityByHeroName("dryad", () => assaulter.dryadMoonlight(assaulter, target), [
          assaulter.dryadMoonlight,
        ]);
        // witchmag level_4 first
        useUtilityByHeroName("witchmag", () => assaulter.witchmagThirstBlade(assaulter, target), [
          assaulter.witchmagThirstBlade,
        ]);

        target.hp -= dmgHeroNum;
        blackRaven(assaulter, target);
        staffOmbal(assaulter, maxHPHero, target, staffOmbalStep);
        thunderHammer(assaulter, target);
        emblemWolf(assaulter, target);

        ObjDmg.crit && assaulter.arts.handKingHell ? handKingHell(target, maxHPEnemy) : null;

        calcHp(".enemy_hp", target.hp);

        // vampiric
        if (assaulter.vampiric) {
          assaulter.hp += vampiric(assaulter, dmgHeroNum);
          if (assaulter.hp > +maxHPHero) {
            assaulter.hp = +maxHPHero;
          }
          calcHp(".hero_hp", assaulter.hp);
        }

        // MANA

        if (assaulter.mana < maxMP) {
          assaulter.bonusMP ? (assaulter.mana += manaRegen + assaulter.bonusMP) : (assaulter.mana += manaRegen);
          ObjDmg.crit && assaulter.arts.frostsword ? (assaulter.mana += 2) : null;
          // assaulter.name == "mage" ? (assaulter.mana += 1) : null;

          // monk level_1 first
          // if (assaulter.name == "monk" && assaulter.monkSnakeStrikes) {
          //   assaulter.mana += assaulter.monkSnakeStrikes();
          // }

          useUtilityByHeroName("monk", () => assaulter.monkSnakeStrikes(), [assaulter.monkSnakeStrikes]);

          if (assaulter.mana > maxMP) {
            assaulter.mana = maxMP;
          }
          calcMp(assaulter.mana);
        }

        //

        if (target.hp <= 0) {
          clearInterval(battleSetInterval);
          addText(`Вы нанесли${ObjDmg.crit} ${dmgHeroNum} урона и убили противника`, "white");
          useUtilityByHeroName("rogue", () => assaulter.rogueRewardKill(assaulter, maxHPHero, maxHPEnemy), [
            assaulter.rogueRewardKill,
          ]);
          //
          finishFight();
          return;
        }
        addText(`Вы нанесли${ObjDmg.crit} ${dmgHeroNum} урона`, "yellow");
      }
    }

    // specificity mage
    if (assaulter.mana < maxMP && assaulter.name == "mage") {
      assaulter.mana += mageSpecificity();
      calcMp(assaulter.mana);
    }
    staffOmbalStep++;

    setTimeout(() => {
      if (target.hp <= 0) {
        return;
      }
      if (target.stun) {
        addText(`Враг оглушен (${target.stun} ход)`, "dodgerblue");
        target.stun--;
        return;
      }
      if (ObjDmgEnemy === "Промах") {
        AudioAction("missAttack");
        addText("Вы увернулись", "green");

        assaulter.arts.robberyCloak ? robberyCloak(assaulter) : null;
        // monk level_2 first
        useUtilityByHeroName("monk", () => monkMantis(assaulter, target), [assaulter.monkMantis]);
        // mage level_3 first
        useUtilityByHeroName("mage", () => mageSkillMage(assaulter), [assaulter.mageSkillMage]);
      } else {
        let dmgEnemyNum = Math.round(ObjDmgEnemy.dmg * target.multiplierDmg);

        if (assaulter.arts.gnomeShield) {
          dmgEnemyNum = gnomeShield(dmgEnemyNum);
        }

        assaulter.arts.magicshield ? magicShield(assaulter) : null;

        assaulter.arts.potion_Hp_Mp ? potion_Hp_Mp(assaulter, maxHPHero) : null;

        if (assaulter.arts.sphereDM) {
          dmgEnemyNum = sphereDM(assaulter, dmgEnemyNum);
        }

        // warrior specificity
        // assaulter.name == "warrior" && ObjDmgEnemy.crit ? (dmgEnemyNum = warriorSpecificity(dmgEnemyNum)) : null;
        useUtilityByHeroName("warrior", () => (dmgEnemyNum = warriorSpecificity.use(dmgEnemyNum)), [
          ObjDmgEnemy.crit,
        ]);
        // monk level_4 first
        useUtilityByHeroName("monk", () => (dmgEnemyNum = assaulter.monkPainSuppression(dmgEnemyNum)), [
          assaulter.monkPainSuppression,
        ]);
        // level_4 second
        useUtilityByHeroName("mage", () => assaulter.mageFireShield.takeDmg(target), [assaulter.mageFireShield]);

        // barrier

        function barrier(hero) {
          dmgEnemyNum = Math.round(dmgEnemyNum * 0.75);
          if (hero.barrier - dmgEnemyNum > 0) {
            hero.barrier -= dmgEnemyNum;
            addText(`Ледяной щит поглотил ${dmgEnemyNum} урона. Прочность: ${hero.barrier}`, "aqua");
            dmgEnemyNum = 0;
            hero.audio.skill.iceBlock();
          } else {
            dmgEnemyNum = -(hero.barrier - dmgEnemyNum);
            hero.hp -= dmgEnemyNum;
            calcHp(".hero_hp", hero.hp);
            addText(`Ледяной щит поглотил ${hero.barrier} урона и был разбит`, "aqua");
            hero.barrier = 0;

            hero.mageOnIceShield = false;
            hero.audio.skill.iceDestr();
          }
          // mage level_2 first
          if (hero.name == "mage" && hero.mageShieldReflect) {
            target.hp -= hero.mageShieldReflect();
            calcHp(".enemy_hp", target.hp);
          }
        }

        if (assaulter.barrier) {
          barrier(assaulter);
        } else {
          assaulter.hp -= dmgEnemyNum;
          calcHp(".hero_hp", assaulter.hp);
        }

        if (dmgEnemyNum > 0) {
          ObjDmgEnemy.crit ? assaulter.audio.getCrit() : assaulter.audio.getDemage();
        }

        // mage level_3 first
        ObjDmgEnemy.crit && assaulter.name == "mage" && assaulter.mageSkillMage ? mageSkillMage(assaulter) : null;

        ObjDmgEnemy.crit && assaulter.arts.emblemDragon ? emblemDragon(assaulter) : null;

        // assaulter.hp -= dmgEnemyNum;
        // calcHp(".hero_hp", assaulter.hp);

        if (assaulter.arts.fieryHand) {
          target.hp -= fieryHand(dmgEnemyNum);
          calcHp(".enemy_hp", target.hp);
        }

        assaulter.arts.bloodOrk && !bloodOrkTrigger ? bloodOrk(assaulter, maxHPHero, target) : null;

        assaulter.arts.fieryFist ? (buffAttack = fieryFist(assaulter, maxHPHero)) : null;

        if (assaulter.hp <= 0) {
          if (assaulter.arts.phoenix) {
            assaulter.hp = +maxHPHero;
            addText(
              `Противник убивает вас, ненеся${ObjDmgEnemy.crit} ${dmgEnemyNum}... но вы крылья феника возрождают вас`,
              "green"
            );
            assaulter.arts.phoenix = false;
          } else {
            if (target.name === "boss") {
              assaulter.hp = Math.floor(+maxHPHero / 2);
              addText(`Противник нанес вам${ObjDmgEnemy.crit} ${dmgEnemyNum} урона`, "orange");
              addText(`Босс побеждает вас, но вам удается сбежать`, "green");
              setTimeout(() => {
                btnsHidden.forEach((btn) => {
                  btn.classList.remove("hidden");
                });
              }, 1000);
            } else {
              addText(`Противник нанес вам${ObjDmgEnemy.crit} ${dmgEnemyNum} урона и убил вас`, "red");
              btnReload.classList.remove("hidden");
            }
            clearInterval(battleSetInterval);
            calcHp(".hero_hp", assaulter.hp);
            return;
          }
        } else {
          addText(`Противник нанес вам${ObjDmgEnemy.crit} ${dmgEnemyNum} урона`, "orange");
          // warrior level_4 second
          useUtilityByHeroName("warrior", () => assaulter.warriorRevenge(assaulter, target), [
            assaulter.warriorRevenge,
            ObjDmgEnemy.crit,
          ]);
        }
        calcHp(".hero_hp", assaulter.hp);
      }
      if (assaulter.arts.darknessMimic) {
        darknessMimic(assaulter, maxHPHero);
      }
    }, 700);
  }

  function finishFight() {
    let heal = healHP(assaulter);
    assaulter.hp += heal;
    //
    addText("_______________________________КОНЕЦ БОЯ_________________________________", "red");
    setTimeout(() => {
      addText(`вы отдыхаете после боя, восстанавливая ${heal} здоровья `, "green");
      calcHp(".hero_hp", assaulter.hp);

      // jester level_1 first
      useUtilityByHeroName("jester", () => (assaulter.mana += assaulter.jesterShifflDeck()), [
        assaulter.jesterShifflDeck,
      ]);
      if (assaulter.mana > maxMP) {
        assaulter.mana = maxMP;
      }
      calcMp(assaulter.mana);
    }, 900);

    // mage level_3 second
    useUtilityByHeroName("mage", () => assaulter.magePotionsCooking(), [assaulter.magePotionsCooking]);

    checkNameEnemy(target, assaulter);
    setTimeout(() => {
      btnsHidden.forEach((btn) => {
        btn.classList.remove("hidden");
      });
    }, 1000);
    btnDisplay.classList.add("hidden");
  }

  const battleSetInterval = setInterval(() => battle(target, assaulter), 2000);

  function checkNameEnemy(enemy, hero) {
    if (enemy.name === "trader" && !(hero.traderMeeting == 2)) {
      getXp(hero, true);
      !hero.traderMeeting ? (hero.traderMeeting = 1) : hero.traderMeeting++;
    } else if (enemy.name === "boss") {
      getXp(hero, false, true);
      hero.goldMod += 0.1;
      textRaidLvl.textContent = +textRaidLvl.textContent + 5;
      hero.boss += 1;
    } else if (enemy.name === "unicorn" && !(hero.unicornMeeting == 2)) {
      setTimeout(() => {
        buff(hero);
        !hero.unicornMeeting ? (hero.unicornMeeting = 1) : hero.unicornMeeting++;
      }, 750);
    } else if (enemy.name === "masterOfMark" && !(hero.masterOfMarkMeeting == 2)) {
      setTimeout(() => {
        buff(hero);
        !hero.masterOfMarkMeeting ? (hero.masterOfMarkMeeting = 1) : hero.masterOfMarkMeeting++;
      }, 750);
    } else if (enemy.name === "goldBox") {
      null;
    } else {
      getXp(hero);
      // buff(hero);
    }
    goldCoin(enemy.gold, hero.goldMod);
  }

  function useUtilityByHeroName(name, callback, [...trigers]) {
    if (
      assaulter.name === name &&
      !([...trigers].includes(false) || [...trigers].includes(undefined) || [...trigers].includes(""))
    ) {
      callback();
    }
  }

  // mage level_3 first
  function mageSkillMage(hero) {
    hero.mageSkillMage();
  }

  // monk level_2 first
  function monkMantis(hero, enemy) {
    let dmgMantis = hero.monkMantis(hero.dodge);
    if (dmgMantis > 0) {
      dmgMantis - defMod(enemy.def) <= 0 ? (dmgMantis = 1) : null;
      enemy.hp -= dmgMantis - defMod(enemy.def);
      addText(`Вы контратакавали врага нанеся ${dmgMantis} урона`, "cyan");
      calcHp(".enemy_hp", enemy.hp);
    }
  }
  // monk level_2 second
  function monkTiger(hero, enemy) {
    setTimeout(() => {
      const dmg = hero.monkTiger(hero.attack);
      if (dmg > 0) {
        enemy.hp -= dmg - defMod(enemy.def);
        addText(`Вы быстро атакуете еще раз, нанося ${dmg} урона`, "cyan");
        calcHp(".enemy_hp", enemy.hp);
      }
    }, 250);
  }
  // monk level_3 first
  function monkLotus(hero, enemy) {
    setTimeout(() => {
      const dmg = hero.monkLotus(enemy);
      if (dmg > 0) {
        enemy.hp -= dmg;
        enemy.stun++;
        addText(`Вы используете технику лотоса, нанося ${dmg} урона, оглушив его`, "magenta");
        calcHp(".enemy_hp", enemy.hp);
      }
    }, 150);
  }

  function healHP(hero) {
    let extraHP = 35;
    if (hero.regeneration) {
      extraHP += hero.regeneration;
    }
    if (hero.name === "dryad") {
      regenDryad += 1.25;
      extraHP += regenDryad;
      if (hero.hp <= 60) {
        extraHP += extraHP;
      }
    }

    const heal = Math.round(maxHPHero / 6 + extraHP);

    if (hero.hp + heal > maxHPHero) {
      const newHeal = maxHPHero - hero.hp;
      return newHeal;
    } else {
      return heal;
    }
  }

  // Артефакты

  function emblemWolf(hero, enemy) {
    if (hero.emblemWolf) {
      let chance = Math.floor(Math.random() * 100) + 1;
      if (chance <= 20) {
        const dmg = Math.floor(10 + (maxHPEnemy / 100) * 3);
        enemy.hp -= dmg;
        addText(`Противник получает дополнительный урон: ${dmg} `, "aqua");
      }
    }
  }

  function emblemDragon(hero) {
    hero.attack[0] += 5;
    hero.attack[1] += 5;
    hero.def += 5;
    updateStats(".attackMin", hero.attack[0], true);
    updateStats(".attackMax", hero.attack[1], true);
    updateStats(".def", hero.def, true);
    setTimeout(() => {
      hero.attack[0] -= 5;
      hero.attack[1] -= 5;
      hero.def -= 5;
      updateStats(".attackMin", hero.attack[0], true);
      updateStats(".attackMax", hero.attack[1], true);
      updateStats(".def", hero.def, true);
    }, 6000);
  }

  function thunderHammer(hero, enemy) {
    if (hero.thunderHammer) {
      let chance = Math.floor(Math.random() * 100) + 1;
      chance < 9 ? enemy.stun++ : null;
    }
  }

  function robberyCloak(hero) {
    hero.critChance += 30;
    updateStats(".critChance", hero.critChance, true);
    setTimeout(() => {
      hero.critChance -= 30;
      updateStats(".critChance", hero.critChance, true);
    }, 2000);
  }

  function handKingHell(enemy, maxHPEnemy) {
    let count = 0;
    let dmg = Math.round(maxHPEnemy / 50);
    addText("Противник начинает гореть", "aqua");
    setTimeout(() => {
      const dot = setInterval(() => {
        count >= 3 || enemy.hp <= 0 ? clearInterval(dot) : count++;
        enemy.hp -= dmg;
        calcHp(".enemy_hp", enemy.hp);
      }, 2000);
    }, 150);
  }

  function swordKingHell(hero, enemy) {
    let dmg = Math.round((hero.attack[0] + hero.attack[1]) / 4);
    setTimeout(() => {
      enemy.hp -= dmg;
      calcHp(".enemy_hp", enemy.hp);
      addText(`Враг получает ${dmg} урона от огненного шлейфа меча`, "yellow");
    }, 100);
  }

  function potion_Hp_Mp(hero, maxHp) {
    let chance = Math.floor(Math.random() * 100) + 1;
    if (chance <= 8) {
      setTimeout(() => {
        hero.hp += Math.round(maxHp / 20);
        hero.mana += 10;
        addText("Вы делаете глоток из зелья регенерации", "green");
        calcHp(".hero_hp", hero.hp);
        calcMp(hero.mana);
      }, 200);
    }
  }

  function magicShield(hero) {
    let chance = Math.floor(Math.random() * 100) + 1;
    chance <= 20 ? (hero.mana += 1) : null;
    if (hero.mana > maxMP) {
      hero.mana = maxMP;
    }
    calcMp(hero.mana);
  }

  function sphereDM(hero, dmg) {
    if (sphereDMStep < 2 && sphereDMStep) {
      sphereDMStep++;
      return 0;
    } else if (sphereDMStep === 2 && sphereDMStep) {
      return dmg;
    } else if (hero.hp - dmg <= 0) {
      // hero.hp += dmg;
      sphereDMStep = 1;
      if (sphereDMStep == 1) {
        addText("Ваша кожа покрывается алмазной корой...", "blue");
      }
      return dmg + (hero.hp - dmg) - 1;
    }
    return dmg;
  }

  function staffOmbal(hero, maxHPHero, enemy, step) {
    if (hero.arts.staffOmbal) {
      if (step >= 5 && enemy.hp >= 0) {
        setTimeout(() => {
          let dagon = Math.round(maxHPHero / (100 / 20));
          enemy.hp -= dagon;
          calcHp(".enemy_hp", target.hp);
          addText(`Волшебный жезл высвобождает свою мощь во врага: ${dagon} урона `, "aqua");
          if (enemy.hp <= 0) {
            clearInterval(battleSetInterval);
            finishFight();
          }
        }, 300);
        staffOmbalStep = 0;
      }
    }
  }

  function darknessMimic(hero, maxHPHero) {
    let chance = Math.floor(Math.random() * 100) + 1;
    if (chance <= 5) {
      darknessStep = true;
    }
    if (darknessStep) {
      hero.dodge += 25;
      addText(`Вас обволакивает фиолетовый туман `, "darkviolet");
      updateStats(".dodge", hero.dodge, true);
      darknessStep = false;
      setTimeout(() => {
        hero.dodge -= 25;
        updateStats(".dodge", hero.dodge, true);
        clearInterval(darknessHeal);
      }, 6000);
      const darknessHeal = setInterval(() => {
        setTimeout(() => {
          hero.hp += Math.round(maxHPHero / (100 / 3));
          calcHp(".hero_hp", assaulter.hp);
        }, 350);
      }, 2000);
    } else {
      // buffDodge = 0;
      // updateStats(".dodge", hero.dodge, true);
    }
  }

  function bloodOrk(hero, maxHPHero, enemy) {
    if (hero.hp < maxHPHero / (100 / 25)) {
      setTimeout(() => {
        let healBlood = Math.round(maxHPHero / (100 / 10));
        hero.hp += healBlood;
        enemy.hp -= healBlood;
        addText("Кровь орка закипает в вашем теле", "green");
        calcHp(".hero_hp", assaulter.hp);
        calcHp(".enemy_hp", target.hp);
      }, 300);
      bloodOrkTrigger = true;
    }
  }

  function redDagger(redDagger, EnemyDef) {
    if (redDagger) {
      let chance = Math.floor(Math.random() * 100) + 1;
      if (chance <= 30) {
        return EnemyDef;
      } else {
        return 0;
      }
    }
    return 0;
  }

  function gnomeShield(dmg) {
    let chance = Math.floor(Math.random() * 100) + 1;
    if (chance <= 12) {
      addText("Вам удается поставить блок щитом...", "dodgerblue");
      return Math.floor(dmg * 0.3);
    } else {
      return dmg;
    }
  }

  function blackRaven(hero, enemy) {
    if (hero.arts.blackRaven) {
      let chance = Math.floor(Math.random() * 100) + 1;
      if (chance <= 4) {
        let dmgToHero;
        let dmg;
        if (enemy.name === "boss") {
          dmg = Math.floor(maxHPEnemy / 4);
          enemy.hp -= dmg;
        } else {
          dmg = enemy.hp;
          enemy.hp -= dmg;
        }
        dmgToHero = Math.floor((dmg / 100) * 20);
        hero.hp -= dmgToHero;
        calcHp(".hero_hp", hero.hp);

        addText("Ворон смерти проклинает вашего врага...", "blueviolet");
      }
    }
  }
  // console.log(Math.floor(Math.random() * 100) + 1);

  function vampiric(hero, dmg) {
    // let heal = Math.floor((dmg / (100 / hero.vampiric)) * 0.75);
    let heal = Math.floor(dmg * vampiricMod(hero.vampiric));
    // console.log(`Вампиризи = ${heal}`);
    return heal;
  }

  function fieryFist(hero, maxHPHero) {
    if (hero.hp < maxHPHero / (100 / 33)) {
      console.log("берсерк");
      return 30;
    }
    return 0;
  }

  function fieryHand(dmg) {
    let reflect = 0;
    let chance = Math.floor(Math.random() * 100) + 1;
    if (chance <= 35) {
      reflect = Math.floor(dmg / 2);
    }
    return reflect;
  }

  // skill.initDescrBtn(assaulter.name);
  if (enemyCount === 0) {
    skill.initDescrBtn(assaulter.name);

    const btnSkill = document.querySelector(".btn__skill");
    btnSkill.addEventListener("click", () => {
      [assaulter.mana, target.hp] = skill.skills(assaulter, assaulter.mana);
      calcMp(assaulter.mana);
      calcHp(".hero_hp", assaulter.hp);
      calcHp(".enemy_hp", target.hp);
    });
  }

  skill.updateInform(target, maxHPHero);

  function checkAttrHP(barHP) {
    return document.querySelector(barHP).getAttribute("data-current_hp");
  }

  enemyCount++;
}

export default fight;
