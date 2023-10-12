import talentRogue from "./talentsHeroes/rogue";
import talentWarrior from "./talentsHeroes/warrior";
import talentMonk from "./talentsHeroes/monk";
import talentJester from "./talentsHeroes/jester";
import talentDryad from "./talentsHeroes/dryad";
import talentMechanic from "./talentsHeroes/mechanic";
import talentWitchmag from "./talentsHeroes/witchmag";
import talentMage from "./talentsHeroes/mage";

const coreTalents = {
  hero: {},

  setText: function (objTalent) {
    // const level_1_First = document.querySelector(".talents-item.level_1.first"),
    //   level_2_First = document.querySelector(".talents-item.level_2.first"),
    //   level_2_Second = document.querySelector(".talents-item.level_2.second"),
    //   level_3_First = document.querySelector(".talents-item.level_3.first"),
    //   level_3_Second = document.querySelector(".talents-item.level_3.second"),
    //   level_4_First = document.querySelector(".talents-item.level_4.first"),
    //   level_4_Second = document.querySelector(".talents-item.level_4.second");

    let descrArr = [];
    function getItems() {
      const arrItems = document.querySelectorAll(".talents-item");
      arrItems.forEach((item) => {
        const level = item.getAttribute("level-current");
        const branch = item.getAttribute("branch");
        item.style.backgroundImage = objTalent[level][branch].img;
        item.querySelector(".talents__title").textContent = objTalent[level][branch].title;
        descrArr.push(item.querySelectorAll(".descr .text"));
      });
      setDescr();
      return arrItems;
    }

    // const descr_1_1 = level_1_First.querySelectorAll(".descr .text"),
    //   descr_2_1 = level_2_First.querySelectorAll(".descr .text"),
    //   descr_2_2 = level_2_Second.querySelectorAll(".descr .text"),
    //   descr_3_1 = level_3_First.querySelectorAll(".descr .text"),
    //   descr_3_2 = level_3_Second.querySelectorAll(".descr .text"),
    //   descr_4_1 = level_4_First.querySelectorAll(".descr .text"),
    //   descr_4_2 = level_4_Second.querySelectorAll(".descr .text");

    // const descrArrs = [descr_1_1, descr_2_1, descr_2_2, descr_3_1, descr_3_2, descr_4_1, descr_4_2];
    // console.log(descrArrs);

    // level_1_First.style.backgroundImage = objTalent.level_1.first.img;
    // level_2_First.style.backgroundImage = objTalent.level_2.first.img;
    // level_2_Second.style.backgroundImage = objTalent.level_2.second.img;
    // level_3_First.style.backgroundImage = objTalent.level_3.first.img;
    // level_3_Second.style.backgroundImage = objTalent.level_3.second.img;
    // level_4_First.style.backgroundImage = objTalent.level_4.first.img;
    // level_4_Second.style.backgroundImage = objTalent.level_4.second.img;

    // level_1_First.querySelector(".talents__title").textContent = objTalent.level_1.first.title;
    // level_2_First.querySelector(".talents__title").textContent = objTalent.level_2.first.title;
    // level_2_Second.querySelector(".talents__title").textContent = objTalent.level_2.second.title;
    // level_3_First.querySelector(".talents__title").textContent = objTalent.level_3.first.title;
    // level_3_Second.querySelector(".talents__title").textContent = objTalent.level_3.second.title;
    // level_4_First.querySelector(".talents__title").textContent = objTalent.level_4.first.title;
    // level_4_Second.querySelector(".talents__title").textContent = objTalent.level_4.second.title;

    // console.log(descrArrs);

    function setDescr() {
      descrArr.forEach((arr) => {
        let count = 0;

        arr.forEach((descr) => {
          const talantLevel = descr.getAttribute("data-talent-level");
          const talantNum = descr.getAttribute("data-talent");
          descr.textContent = objTalent[talantLevel][talantNum].descr[count++];
        });
      });
    }

    this.setEvent(getItems());
  },

  setEvent: function (items) {
    // const totalTalents = document.querySelector(".talents__value span");

    items.forEach((item) => {
      let count = 0;

      item.addEventListener("click", (e) => {
        if (this.hero.talentsPoint <= 0) {
          alert("Недостаточно очков");
        } else {
          const current = +item.querySelector("span").textContent.slice(0, 1);
          const total = +item.querySelector("span").textContent.slice(2, 3);

          if (current < total) {
            item.setAttribute("data-point", count + 1);

            // console.log(item);
            this.learnTalent(item);

            this.hero.talentsPoint -= 1;
            this.incTalent(this.hero.talentsPoint);

            item.querySelector("span").textContent = current + 1 + "/" + total;

            e.target.querySelectorAll(".descr .text").forEach((item) => {
              item.classList.remove("active");
            });
            e.target.querySelectorAll(".descr .text")[count++].classList.add("active");

            if (
              +item.querySelector("span").textContent.slice(0, 1) ==
              +item.querySelector("span").textContent.slice(2, 3)
            ) {
              const level = item.getAttribute("level-unlock");
              const branch = item.getAttribute("branch");

              document.querySelectorAll(`.${level}`).forEach((item) => {
                if (level == "level_2") {
                  item.removeAttribute("disabled");
                } else {
                  if (item.classList.contains(`${branch}`)) {
                    item.removeAttribute("disabled");
                  }
                }
                //
              });

              // items.map(item, () => {
              //   if (item.classList.contains(`${level}`)) {
              //     console.log(item);
              //   }
              // });
            }
          } else {
            alert("Максимальный уровень таланта");
          }
        }
      });
    });
  },

  learnTalent: function (item) {
    switch (this.hero.name) {
      case "warrior":
        talentWarrior.init(item, this.hero);
        break;
      case "rogue":
        talentRogue.init(item, this.hero);
        break;
      case "monk":
        talentMonk.init(item, this.hero);
        break;
      case "jester":
        talentJester.init(item, this.hero);
        break;
      case "dryad":
        talentDryad.init(item, this.hero);
        break;
      case "mechanic":
        talentMechanic.init(item, this.hero);
        break;
      case "witchmag":
        talentWitchmag.init(item, this.hero);
        break;
      case "mage":
        talentMage.init(item, this.hero);
        break;
    }
  },

  incTalent: function (points) {
    const talentsTitle = document.querySelector(".talents__value span");
    talentsTitle.textContent = points;
  },

  init: function (hero) {
    this.hero = hero;
    switch (hero.name) {
      case "warrior":
        this.setText({
          level_1: {
            first: {
              title: "Тежёлый металл",
              descr: [
                "1: Увеличивает урон от Удара щитом на 20%",
                "2: Увеличивает урон от Удара щитом на 28%",
                "3: Увеличивает урон от Удара щитом на 36%",
              ],
              img: "url(./img/icons/talents/warrior/talent_warrior_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Сотрясение",
              descr: ["Удар щитом оглушает противника на 1 ход и навсегда снижает его уклонение на 20%"],
              img: "url(./img/icons/talents/warrior/talent_warrior_2_1.png)",
            },
            second: {
              title: "Защитная стойка",
              descr: ["Блок после Удара щитом дополнительно уменьшает получаемый урон на 25%"],
              img: "url(./img/icons/talents/warrior/talent_warrior_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Ни шагу назад",
              descr: [
                "1: Удар щитом восстанавливает 10% от макс.запаса здоровья ",
                "2: Удар щитом восстанавливает 13% от макс.запаса здоровья ",
                "3: Удар щитом восстанавливает 16% от макс.запаса здоровья ",
              ],
              img: "url(./img/icons/talents/warrior/talent_warrior_3_1.png)",
            },
            second: {
              title: "Укрепленный доспех",
              descr: ["1: Увеличивает защиту на 3", "2: Увеличивает защиту на 6", "3: Увеличивает защиту на 9"],
              img: "url(./img/icons/talents/warrior/talent_warrior_3_2.png)",
            },
          },

          level_4: {
            first: {
              title: "Стойкость берсерка",
              descr: [
                "1: Снижает получаемый урон на 6%, Стойкость к боли снижает критичексий урон на ещё 5% ",
                "2: Снижает получаемый урон на 9%, Стойкость к боли снижает критичексий урон на ещё 10% ",
                "3: Снижает получаемый урон на 12%, Стойкость к боли снижает критичексий урон на ещё 15% ",
              ],
              img: "url(./img/icons/talents/warrior/talent_warrior_4_1.png)",
            },
            second: {
              title: "Реванш",
              descr: [
                "1: При получении критического урона есть 50% шанс нанести врагу удар в размере 100% от атаки героя",
                "2: При получении критического урона есть 60% шанс нанести врагу удар в размере 130% от атаки героя",
                "3: При получении критического урона есть 70% шанс нанести врагу удар в размере 160% от атаки героя",
              ],
              img: "url(./img/icons/talents/warrior/talent_warrior_4_2.png)",
            },
          },
        });
        break;
      case "rogue":
        this.setText({
          level_1: {
            first: {
              title: "Острый кинжал",
              descr: [
                "1: Увеличивает атаку на 3 и шанс крит.удара на 3%",
                "2: Увеличивает атаку на 5 и шанс крит.удара на 4%",
                "3: Увеличивает атаку на 7 и шанс крит.удара на 5%",
              ],
              img: "url(./img/icons/talents/rogue/talent_rogue_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Сокрушение брони",
              descr: ["После Двойного удара ваши атаки игнорируют защиту врага на 100%"],
              img: "url(./img/icons/talents/rogue/talent_rogue_2_1.png)",
            },
            second: {
              title: "Удар в сердце",
              descr: ["Двойной удар наносит дополнительно 14%(боссу: 7%) от макс.здоровья врага"],
              img: "url(./img/icons/talents/rogue/talent_rogue_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Кровавый пир",
              descr: [
                "1: Двойной удар исцеляет на 25% от нанесенного урона",
                "2: Двойной удар исцеляет на 30% от нанесенного урона",
                "3: Двойной удар исцеляет на 35% от нанесенного урона",
              ],
              img: "url(./img/icons/talents/rogue/talent_rogue_3_1.png)",
            },
            second: {
              title: "Уход в тень",
              descr: [
                "1: После Двойного удара уклонение повышается на 40% на 6 секунд",
                "2: После Двойного удара уклонение повышается на 55% на 6 секунд",
                "3: После Двойного удара уклонение повышается на 70% на 6 секунд",
              ],
              img: "url(./img/icons/talents/rogue/talent_rogue_3_2.png)",
            },
          },

          level_4: {
            first: {
              title: "Серия ударов",
              descr: [
                "1: Снижает стоимость маны на Двойной удар на 10",
                "2: Снижает стоимость маны на Двойной удар на 15",
                "3: Снижает стоимость маны на Двойной удар на 20",
              ],
              img: "url(./img/icons/talents/rogue/talent_rogue_4_1.png)",
            },
            second: {
              title: "Награда за расправу",
              descr: [
                "1: Убивая противника, вы исцеляетесь на 8% от его макс.здоровья",
                "2: Убивая противника, вы исцеляетесь на 12% от его макс.здоровья",
                "3: Убивая противника, вы исцеляетесь на 16% от его макс.здоровья",
              ],
              img: "url(./img/icons/talents/rogue/talent_rogue_4_2.png)",
            },
          },
        });
        break;
      case "monk":
        this.setText({
          level_1: {
            first: {
              title: "Удары змеи",
              descr: [
                "1: Увеличивает атаку на 3. Даёт 30% шанс получить единицу маны при атаке",
                "2: Увеличивает атаку на 5. Даёт 40% шанс получить единицу маны при атаке",
                "3: Увеличивает атаку на 7. Даёт 50% шанс получить единицу маны при атаке",
              ],
              img: "url(./img/icons/talents/monk/talent_monk_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Стиль богомола",
              descr: [
                "Дает 33% шанс при уклонении героя, нанести врагу дополнительный удар, равный вашему уклонению",
              ],
              img: "url(./img/icons/talents/monk/talent_monk_2_1.png)",
            },
            second: {
              title: "Стиль Тигра",
              descr: ["Дает 33% шанс при крит.ударе, нанести врагу дополнительный удар, равный вашей атаке"],
              img: "url(./img/icons/talents/monk/talent_monk_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Техника лотоса",
              descr: [
                "1: Дает 6% шанс при атаке, нанести врагу урон 16%(боссу: 10%) от его макс.запаса здоровья и оглушить на 1 ход",
                "2: Дает 7% шанс при атаке, нанести врагу урон 18%(боссу: 10%) от его макс.запаса здоровья и оглушить на 1 ход",
                "3: Дает 8% шанс при атаке, нанести врагу урон 20%(боссу: 10%) от его макс.запаса здоровья и оглушить на 1 ход",
              ],
              img: "url(./img/icons/talents/monk/talent_monk_3_1.png)",
            },
            second: {
              title: "Синергия чакр",
              descr: [
                "1: Увеличивает макс.запас здоровья и маны на 40, и регенерацию после боя на 15",
                "2: Увеличивает макс.запас здоровья и маны на 60, и регенерацию после боя на 25",
                "3: Увеличивает макс.запас здоровья и маны на 80, и регенерацию после боя на 35",
              ],
              img: "url(./img/icons/talents/monk/talent_monk_3_2.png)",
            },
          },
          level_4: {
            first: {
              title: "Подавление боли",
              descr: [
                "1: С шансом 18% при получении удара, вы получаете на 20% меньше урона",
                "2: С шансом 22% при получении удара, вы получаете на 25% меньше урона",
                "3: С шансом 26% при получении удара, вы получаете на 30% меньше урона",
              ],
              img: "url(./img/icons/talents/monk/talent_monk_4_1.png)",
            },
            second: {
              title: "Уязвимое место",
              descr: [
                "1: Увеличивает шанс оглушения от Удара по почкам на 2%",
                "2: Увеличивает шанс оглушения от Удара по почкам на 3%",
                "3: Увеличивает шанс оглушения от Удара по почкам на 4%",
              ],
              img: "url(./img/icons/talents/monk/talent_monk_4_2.png)",
            },
          },
        });
        break;

      case "jester":
        this.setText({
          level_1: {
            first: {
              title: "Перетасовка колоды",
              descr: [
                "1: После каждого боя герой воостанавливает 20 маны",
                "2: После каждого боя герой воостанавливает 24 маны",
                "3: После каждого боя герой воостанавливает 28 маны",
              ],
              img: "url(./img/icons/talents/jester/talent_jester_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Везучий тип",
              descr: ["Увеличивает удачу героя на 10"],
              img: "url(./img/icons/talents/jester/talent_jester_2_1.png)",
            },
            second: {
              title: "С молотом наперевес",
              descr: ["Увеличивает атаку на 7, и шанс крит.удара на 7%"],
              img: "url(./img/icons/talents/jester/talent_jester_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Шарик в подарок",
              descr: [
                "1: Есть 50% шанс после использования способности, уменьшить атаку противника на 30% на 3 хода",
                "2: Есть 60% шанс после использования способности, уменьшить атаку противника на 35% на 3 хода",
                "3: Есть 70% шанс после использования способности, уменьшить атаку противника на 40% на 3 хода",
              ],
              img: "url(./img/icons/talents/jester/talent_jester_3_1.png)",
            },
            second: {
              title: "Мухлёж",
              descr: [
                "1: Есть 18% шанс после использования способности восстановить 40 маны",
                "2: Есть 20% шанс после использования способности восстановить 50 маны",
                "3: Есть 22% шанс после использования способности восстановить 60 маны",
              ],
              img: "url(./img/icons/talents/jester/talent_jester_3_2.png)",
            },
          },
          level_4: {
            first: {
              title: "Взрывной подарок",
              descr: [
                "1: С шансом 23% при использовании способности вы наносите врагу 16%(боссу: 8%) от его макс.здоровья",
                "2: С шансом 28% при использовании способности вы наносите врагу 18%(боссу: 9%) от его макс.здоровья",
                "3: С шансом 33% при использовании способности вы наносите врагу 20%(боссу: 10%) от его макс.здоровья",
              ],
              img: "url(./img/icons/talents/jester/talent_jester_4_1.png)",
            },
            second: {
              title: "Изворотливость",
              descr: [
                "1: Увеличивает уклонение и адаптацию на 6% ",
                "2: Увеличивает уклонение и адаптацию на 9% ",
                "3: Увеличивает уклонение и адаптацию на 12% ",
              ],
              img: "url(./img/icons/talents/jester/talent_jester_4_2.png)",
            },
          },
        });
        break;
      case "dryad":
        this.setText({
          level_1: {
            first: {
              title: "Целительное прикосновение",
              descr: [
                "1: После использования способности, герой восстанавливает каждый ход 4% макс.запаса здоровья в течении 2 ходов",
                "2: После использования способности, герой восстанавливает каждый ход 5% макс.запаса здоровья в течении 2 ходов",
                "3: После использования способности, герой восстанавливает каждый ход 6% макс.запаса здоровья в течении 2 ходов",
              ],
              img: "url(./img/icons/talents/dryad/talent_dryad_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Знак дикой природы",
              descr: ["Увеличивает атаку на 7, защиту на 2 и адаптацию на 18%"],
              img: "url(./img/icons/talents/dryad/talent_dryad_2_1.png)",
            },
            second: {
              title: "Бузиновый посох",
              descr: ["Урон от Вмешательства природы увеличен на 50%"],
              img: "url(./img/icons/talents/dryad/talent_dryad_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Дубовая кожа",
              descr: [
                "1: Вмешательства природы уменьшает получаемый урон на 40% на 2 хода",
                "2: Вмешательства природы уменьшает получаемый урон на 55% на 2 хода",
                "3: Вмешательства природы уменьшает получаемый урон на 70% на 2 хода",
              ],
              img: "url(./img/icons/talents/dryad/talent_dryad_3_1.png)",
            },
            second: {
              title: "Наставление друида",
              descr: [
                "1: Увеличивает силу Магии на 4 и уменьшает на 5 стоимость маны: Вмешательства природы ",
                "2: Увеличивает силу Магии на 6 и уменьшает на 10 стоимость маны: Вмешательства природы ",
                "3: Увеличивает силу Магии на 8 и уменьшает на 15 стоимость маны: Вмешательства природы ",
              ],
              img: "url(./img/icons/talents/dryad/talent_dryad_3_2.png)",
            },
          },
          level_4: {
            first: {
              title: "Облик медведя",
              descr: [
                "1: Увеличивает ваш макс.запас здоровья на 70 и защиту на 3, но уменьшает уклонение на 3%",
                "2: Увеличивает ваш макс.запас здоровья на 105 и защиту на 5, но уменьшает уклонение на 5%",
                "3: Увеличивает ваш макс.запас здоровья на 140 и защиту на 7, но уменьшает уклонение на 7%",
              ],
              img: "url(./img/icons/talents/dryad/talent_dryad_4_1.png)",
            },
            second: {
              title: "Лунный огонь",
              descr: [
                "1: С шансом 16% перед атакой вы наносите дополнительно 80% урона от вашей силы магии",
                "2: С шансом 20% перед атакой вы наносите дополнительно 100% урона от вашей силы магии",
                "3: С шансом 24% перед атакой вы наносите дополнительно 120% урона от вашей силы магии",
              ],
              img: "url(./img/icons/talents/dryad/talent_dryad_4_2.png)",
            },
          },
        });
        break;
      case "mechanic":
        this.setText({
          level_1: {
            first: {
              title: "Мастер-ломастер",
              descr: [
                "1: С 17% шансом ваши атаки уменьшают защиту противника на 4, увеличивая вашу, на 2 хода",
                "2: С 20% шансом ваши атаки уменьшают защиту противника на 5, увеличивая вашу, на 2 хода",
                "3: С 23% шансом ваши атаки уменьшают защиту противника на 6, увеличивая вашу, на 2 хода",
              ],
              img: "url(./img/icons/talents/mechanic/talent_mechanic_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Мозговой чип",
              descr: ["Режим Турбо дополнительно увеличивает адаптацию на 40%"],
              img: "url(./img/icons/talents/mechanic/talent_mechanic_2_1.png)",
            },
            second: {
              title: "Экономия энергии",
              descr: ["Продлевает длительность Режима Турбо на 4 секунды"],
              img: "url(./img/icons/talents/mechanic/talent_mechanic_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Усовершенственные нейроны",
              descr: [
                "1: Увеличивает уклонение на 6% и макс.запас здоровья на 45",
                "2: Увеличивает уклонение на 8% и макс.запас здоровья на 60",
                "3: Увеличивает уклонение на 10% и макс.запас здоровья на 75",
              ],
              img: "url(./img/icons/talents/mechanic/talent_mechanic_3_1.png)",
            },
            second: {
              title: "Броне-пластины",
              descr: [
                "1: Режим Турбо дополнительно увеличивает защиту на 7",
                "2: Режим Турбо дополнительно увеличивает защиту на 10",
                "3: Режим Турбо дополнительно увеличивает защиту на 13",
              ],
              img: "url(./img/icons/talents/mechanic/talent_mechanic_3_2.png)",
            },
          },
          level_4: {
            first: {
              title: "Мощный бум",
              descr: [
                "1: Комбо-удар наносит дополнительно 20% урона и с шансом 18% оглушает врага на 1 ход",
                "2: Комбо-удар наносит дополнительно 30% урона и с шансом 23% оглушает врага на 1 ход",
                "3: Комбо-удар наносит дополнительно 40% урона и с шансом 28% оглушает врага на 1 ход",
              ],
              img: "url(./img/icons/talents/mechanic/talent_mechanic_4_1.png)",
            },
            second: {
              title: "На полную мощность",
              descr: [
                "1: Активация Режима Турбо исцеляет вас на 10% от макс.здоровья, а после завершения наносит врагу столько же урона, оглушая вас на 1 ход ",
                "2: Активация Режима Турбо исцеляет вас на 14% от макс.здоровья, а после завершения наносит врагу столько же урона, оглушая вас на 1 ход ",
                "3: Активация Режима Турбо исцеляет вас на 18% от макс.здоровья, а после завершения наносит врагу столько же урона, оглушая вас на 1 ход ",
              ],
              img: "url(./img/icons/talents/mechanic/talent_mechanic_4_2.png)",
            },
          },
        });

        break;
      case "witchmag":
        this.setText({
          level_1: {
            first: {
              title: "Усиленные чары",
              descr: [
                "1: Усиливает урон Чароплетсво на 18%",
                "2: Усиливает урон Чароплетсво на 25%",
                "3: Усиливает урон Чароплетсво на 32%",
              ],
              img: "url(./img/icons/talents/witchmag/talent_witchmag_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Кража ресурсов",
              descr: ["Чароплетсво также крадет 3 маны каждый ход"],
              img: "url(./img/icons/talents/witchmag/talent_witchmag_2_1.png)",
            },
            second: {
              title: "Глубокая связь",
              descr: ["Продлевает длительность Чароплетсво на 1 ход"],
              img: "url(./img/icons/talents/witchmag/talent_witchmag_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Зачарованный клинок",
              descr: [
                "1: Атака пассивно усилена на 6, а во время Чароплетства еще на 6",
                "2: Атака пассивно усилена на 9, а во время Чароплетства еще на 9",
                "3: Атака пассивно усилена на 12, а во время Чароплетства еще на 12",
              ],
              img: "url(./img/icons/talents/witchmag/talent_witchmag_3_1.png)",
            },
            second: {
              title: "Смертельный ритуал",
              descr: [
                "1: После окончания Чароплетства враг получает 25%(боссу: 12.5%) от его макс.запаса здоровья",
                "2: После окончания Чароплетства враг получает 30%(боссу: 15%) от его макс.запаса здоровья",
                "3: После окончания Чароплетства враг получает 35%(боссу: 17.5%) от его макс.запаса здоровья",
              ],
              img: "url(./img/icons/talents/witchmag/talent_witchmag_3_2.png)",
            },
          },
          level_4: {
            first: {
              title: "Жажда клинка",
              descr: [
                "1: С шансом 8% при атаке вы наносите дополнительный удар в размере 50% от атаки и исцеляетсь на такое же значение ",
                "2: С шансом 10% при атаке вы наносите дополнительный удар в размере 65% от атаки и исцеляетсь на такое же значение",
                "3: С шансом 12% при атаке вы наносите дополнительный удар в размере 80% от атаки и исцеляетсь на такое же значение",
              ],
              img: "url(./img/icons/talents/witchmag/talent_witchmag_4_1.png)",
            },
            second: {
              title: "Проклятие слабости",
              descr: [
                "1: Чароплетство уменьшает атаку и защиту противника на 22%",
                "2: Чароплетство уменьшает атаку и защиту противника на 28%",
                "3: Чароплетство уменьшает атаку и защиту противника на 34%",
              ],
              img: "url(./img/icons/talents/witchmag/talent_witchmag_4_2.png)",
            },
          },
        });
        break;
      case "mage":
        this.setText({
          level_1: {
            first: {
              title: "Сконцентрированный взмах",
              descr: [
                "1: Увеличивает шанс крит.удара на 3% и силу магии 4",
                "2: Увеличивает шанс крит.удара на 4% и силу магии 6",
                "3: Увеличивает шанс крит.удара на 5% и силу магии 8",
              ],
              img: "url(./img/icons/talents/mage/talent_mage_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Школа магии льда",
              descr: [
                "Пока активен ледяной щит, атакующий вас враг получает урон в размере 40% от вашей силы магии",
              ],
              img: "url(./img/icons/talents/mage/talent_mage_2_1.png)",
            },
            second: {
              title: "Школа магии огня",
              descr: ["Огненный шар поджигает врага на 3 хода"],
              img: "url(./img/icons/talents/mage/talent_mage_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Искусный волшебник",
              descr: [
                "1: При уклонении или при получении крит.урона, вы получаете ледяной щит, поглощающий 8% от макс.здоровья героя, суммируется",
                "2: При уклонении или при получении крит.урона, вы получаете ледяной щит, поглощающий 11% от макс.здоровья героя, суммируется",
                "3: При уклонении или при получении крит.урона, вы получаете ледяной щит, поглощающий 14% от макс.здоровья героя, суммируется",
              ],
              img: "url(./img/icons/talents/mage/talent_mage_3_1.png)",
            },
            second: {
              title: "Зельеварение",
              descr: [
                "1: После каждого боя вы варите зелье и восстанавливаете 12% здровья и 15 маны.",
                "2: После каждого боя вы варите зелье и восстанавливаете 14% здровья и 20 маны.",
                "3: После каждого боя вы варите зелье и восстанавливаете 16% здровья и 25 маны.",
              ],
              img: "url(./img/icons/talents/mage/talent_mage_3_2.png)",
            },
          },
          level_4: {
            first: {
              title: "Громовой раскат",
              descr: [
                "1: Удар молнии добавляет 10% от макс.здоровья к прочности ледяного щита и с шансом 40% может оглушить на 2 хода",
                "2: Удар молнии добавляет 13% от макс.здоровья к прочности ледяного щита и с шансом 50% может оглушить на 2 хода",
                "3: Удар молнии добавляет 16% от макс.здоровья к прочности ледяного щита и с шансом 60% может оглушить на 2 хода",
              ],
              img: "url(./img/icons/talents/mage/talent_mage_4_1.png)",
            },
            second: {
              title: "Огненная защита",
              descr: [
                "1: Огненный шар окружает вас огнем на 3 хода, поглощая 25% входящего урона и наносит атакующему 30% урона от силы магии",
                "2: Огненный шар окружает вас огнем на 3 хода, поглощая 35% входящего урона и наносит атакующему 40% урона от силы магии ",
                "3: Огненный шар окружает вас огнем на 3 хода, поглощая 45% входящего урона и наносит атакующему 50% урона от силы магии ",
              ],
              img: "url(./img/icons/talents/mage/talent_mage_4_2.png)",
            },
          },
        });
        break;
      default:
        null;
    }
  },
};

export default coreTalents;
