"use strict";
import createHeroes from "./modules/heroes";
import fight from "./modules/fight";
import searchEnemy from "./modules/enemy";
import calcHp from "./modules/calc_hp";
import calcMp from "./modules/calc_mp";
import sliderHero from "./modules/slider";
import shop from "./modules/shop";
import { updateHero } from "./modules/shop";

import coreTalents from "./modules/talents/core-talents";
import changeBg from "./modules/changeBg";

import accordion from "./modules/talents/accordion";

import AudioAction, { setAudioToHero } from "./modules/audio/audio";

window.addEventListener("DOMContentLoaded", () => {
  let hero;
  let maxHpHero;
  let maxMpHero;
  let enemy;
  let sex = "man";

  accordion();

  //
  const btnStart = document.querySelector(".btn__start");
  const content = document.querySelector(".base__wrapper");

  btnStart.addEventListener("click", () => {
    content.classList.add("show", "fade");
    btnStart.remove();

    AudioAction("background", "loop");
    AudioAction("background");
  });

  //

  const allHeroes = document.querySelectorAll(".base__container_hero"),
    imgHero = document.querySelectorAll(".img__hero"),
    cardHero = document.querySelectorAll(".base__hero_card");

  function choose(items) {
    items.forEach((element) => {
      element.addEventListener("click", () => {
        const atr = element.getAttribute("data");
        imgHero[atr].classList.add("hidden");
        cardHero[atr].classList.remove("hidden");
        btnTalents.classList.remove("hidden");
      });
    });
  }
  choose(allHeroes);

  const baseActive = document.querySelector(".base-active__wrapper"),
    talentsContainer = document.querySelector(".talents__container"),
    btnBack = document.querySelectorAll(".btn__back"),
    btnSelect = document.querySelectorAll(".btn__select"),
    bars = document.querySelector(".base-active__header"),
    textcontent = document.querySelector(".text__container"),
    enemycontent = document.querySelector(".enemy-container"),
    btnsSex = document.querySelectorAll(".base__btn-sex"),
    btnTalents = talentsContainer.querySelector(".btn-talents");

  btnBack.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.stopPropagation();
      const atr = e.target.closest(".base__container_hero").getAttribute("data");
      imgHero[atr].classList.remove("hidden");
      cardHero[atr].classList.add("hidden");
      btnTalents.classList.add("hidden");
    });
  });

  btnSelect.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const atr = e.target.closest(".base__container_hero").getAttribute("data");
      sex = e.target.closest(".base__container_hero").getAttribute("sex");
      bars.classList.remove("hidden");
      allHeroes.forEach((item) => {
        item.classList.add("hidden");
      });
      allHeroes[atr].classList.remove("hidden");
      baseActive.prepend(allHeroes[atr]);
      baseActive.prepend(talentsContainer);
      talentsContainer.classList.remove("hidden");
      content.remove();
      imgHero[atr].classList.remove("hidden");
      cardHero[atr].classList.add("hidden");
      textcontent.classList.remove("hidden");
      btnTalents.classList.add("hidden");
      btnsSex.forEach((btn) => {
        btn.remove();
      });
      btnSelect[atr].remove();
      // Создание героя
      hero = createHeroes("hero", atr);
      // назначение дата атрибута НР
      hpHero.setAttribute("data-hp", hero.hp);
      maxHpHero = hpHero.getAttribute("data-hp");
      calcHp(".hero_hp", maxHpHero);

      hero.boss = 0;
      hero.sex = sex;

      mpHero.setAttribute("data-mp", hero.maxMPHero);
      maxMpHero = mpHero.getAttribute("data-mp");
      calcMp();

      coreTalents.init(hero);

      AudioAction("heroChosen");
      AudioAction("background", "stop");

      setAudioToHero(hero);
    });
  });

  const hpHero = document.querySelector(".hero_hp");
  const mpHero = document.querySelector(".hero_mp");
  const hpEnemy = document.querySelector(".enemy_hp");
  const btnGo = document.querySelector(".btn__go");
  const btnFight = document.querySelector(".btn__fight");
  const btnReload = document.querySelector(".btn__reload");
  const btnRaid = document.querySelector(".btn__raid");
  const btnSkill = document.querySelector(".btn__skill");
  btnGo.addEventListener("click", () => {
    enemy = searchEnemy(hero.luck);

    createEnemy();

    changeBg(enemy.name);
  });

  btnFight.addEventListener("click", () => {
    btnFight.classList.add("hidden");
    fight(enemy, hero, [btnGo, btnShopOpen, btnRaid], btnReload, btnSkill);
    btnSkill.classList.remove("hidden");
  });

  btnReload.addEventListener("click", () => {
    location.reload();
    btnStart.click();
  });

  const btnArtOpen = document.querySelector(".btn__open-art"),
    overlayArt = document.querySelector(".overlay__arts"),
    btnArtClose = document.querySelector(".btn__art-close");

  btnArtOpen.addEventListener("click", () => {
    overlayArt.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  btnArtClose.addEventListener("click", () => {
    overlayArt.style.display = "none";

    document.body.style.overflow = "";
  });

  const btnShopOpen = document.querySelector(".btn__open-shop"),
    overlayShop = document.querySelector(".overlay__shop"),
    btnShopClose = document.querySelector(".btn__shop-close");

  btnShopOpen.addEventListener("click", () => {
    overlayShop.style.display = "block";
    document.body.style.overflow = "hidden";
    updateHero(hero, hpHero.getAttribute("data-hp"));
  });

  btnShopClose.addEventListener("click", () => {
    overlayShop.style.display = "none";
    document.body.style.overflow = "";
  });

  const overlayRaid = document.querySelector(".overlay__raid"),
    btnRaidYes = overlayRaid.querySelector(".btn__raid_yes"),
    btnRaidNo = overlayRaid.querySelector(".btn__raid_no");

  btnRaid.addEventListener("click", () => {
    overlayRaid.style.display = "block";
  });
  btnRaidNo.addEventListener("click", () => {
    overlayRaid.style.display = "none";
  });
  btnRaidYes.addEventListener("click", () => {
    overlayRaid.style.display = "none";
    createHeroes("boss", 0);
    console.log("boss");

    enemy = createHeroes("boss", hero.boss);
    // boss++;
    createEnemy();
  });

  // вставка противника в контейнер
  function createEnemy() {
    if (enemycontent.childElementCount > 1) {
      enemycontent.lastChild.remove();
    }
    const enemyImg = document.createElement("img");
    enemyImg.setAttribute("src", enemy.srcImg);
    enemycontent.append(enemyImg);
    enemycontent.classList.remove("hidden");
    hpEnemy.setAttribute("data-hp", enemy.hp);
    calcHp(".enemy_hp", hpEnemy.getAttribute("data-hp"));
    btnGo.classList.add("hidden");
    btnRaid.classList.add("hidden");
    btnShopOpen.classList.add("hidden");
    btnFight.classList.remove("hidden");
  }
  // магазин
  shop();

  sliderHero(".base__container_hero", ".arrow_left", ".arrow_right");

  const btnSex = document.querySelectorAll(".btn-sex");

  btnSex.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      let sex = e.target.getAttribute("data-sex");
      let src = btn.closest(".base__container_hero").querySelector(".img__hero").getAttribute("src");

      if (sex == "man" && src.substring(src.length - 9) === "Woman.png") {
        btn
          .closest(".base__container_hero")
          .querySelector(".img__hero")
          .setAttribute("src", `${src.slice(0, -9)}.png`);

        btn.closest(".base__container_hero").setAttribute("sex", "man");
      }
      if (sex == "woman" && src.substring(src.length - 9) !== "Woman.png") {
        btn
          .closest(".base__container_hero")
          .querySelector(".img__hero")
          .setAttribute("src", `${src.slice(0, -4)}Woman.png`);

        btn.closest(".base__container_hero").setAttribute("sex", "woman");
      }
    });
  });
});
