const talents = {
  hero: {},

  setDescr: function (objTalent) {
    const level_1_First = document.querySelector(".talents-item.level-1.first"),
      level_2_First = document.querySelector(".talents-item.level-2.first"),
      level_2_Second = document.querySelector(".talents-item.level-2.second"),
      level_3_First = document.querySelector(".talents-item.level-3.first"),
      level_3_Second = document.querySelector(".talents-item.level-3.second");

    const descr_1_1 = level_1_First.querySelectorAll(".descr .text"),
      descr_2_1 = level_2_First.querySelectorAll(".descr .text"),
      descr_2_2 = level_2_Second.querySelectorAll(".descr .text"),
      descr_3_1 = level_3_First.querySelectorAll(".descr .text"),
      descr_3_2 = level_3_Second.querySelectorAll(".descr .text");

    const descrArrs = [descr_1_1, descr_2_1, descr_2_2, descr_3_1, descr_3_2];

    level_1_First.style.backgroundImage = objTalent.level_1.first.img;
    level_2_First.style.backgroundImage = objTalent.level_2.first.img;
    level_2_Second.style.backgroundImage = objTalent.level_2.second.img;
    level_3_First.style.backgroundImage = objTalent.level_3.first.img;
    level_3_Second.style.backgroundImage = objTalent.level_3.second.img;

    level_1_First.querySelector(".talents__title").textContent = objTalent.level_1.first.title;
    level_2_First.querySelector(".talents__title").textContent = objTalent.level_2.first.title;
    level_2_Second.querySelector(".talents__title").textContent = objTalent.level_2.second.title;
    level_3_First.querySelector(".talents__title").textContent = objTalent.level_3.first.title;
    level_3_Second.querySelector(".talents__title").textContent = objTalent.level_3.second.title;

    descrArrs.forEach((arr) => {
      let count = 0;

      arr.forEach((descr) => {
        const talantLevel = descr.getAttribute("data-talent-level");
        const talantNum = descr.getAttribute("data-talent");
        descr.textContent = objTalent[talantLevel][talantNum].descr[count++];
      });
    });

    this.setEvent([level_1_First, level_2_First, level_2_Second, level_3_First, level_3_Second]);
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

            console.log(item);
            console.log(this.hero.name);

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
                if (level == "level-2") {
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

  incTalent: function (points) {
    const talentsTitle = document.querySelector(".talents__value span");
    talentsTitle.textContent = points;
  },

  init: function (hero) {
    this.hero = hero;
    switch (hero.name) {
      case "warrior":
        this.setDescr({
          level_1: {
            first: {
              title: "Адский крик",
              descr: [
                "1: Увеличивает урон от Боевого крика на 15%",
                "2: Увеличивает урон от Боевого крика на 20%",
                "3: Увеличивает урон от Боевого крика на 25%",
              ],
              img: "url(../../img/icons/talents/warrior/talent_warrior_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Оглушающий рев",
              descr: ["Боевой Крик оглушает противника на 1 ход"],
              img: "url(../../img/icons/talents/warrior/talent_warrior_2_1.png)",
            },
            second: {
              title: "Защитная стойка",
              descr: ["Блок после Боевого Крика дополнительно уменьшает получаемый урон на 25%"],
              img: "url(../../img/icons/talents/warrior/talent_warrior_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Ни шагу назад",
              descr: [
                "1: Боевой Крик восстанавливает 10% от макс.запаса здоровья ",
                "2: Боевой Крик восстанавливает 12.5% от макс.запаса здоровья ",
                "3: Боевой Крик восстанавливает 15% от макс.запаса здоровья ",
              ],
              img: "url(../../img/icons/talents/warrior/talent_warrior_3_1.png)",
            },
            second: {
              title: "Укрепленный доспех",
              descr: ["1: Увеличивает защиту на 3", "2: Увеличивает защиту на 6", "3: Увеличивает защиту на 9"],
              img: "url(../../img/icons/talents/warrior/talent_warrior_3_2.png)",
            },
          },
        });
        break;
      case "rogue":
        this.setDescr({
          level_1: {
            first: {
              title: "Острый кинжал",
              descr: [
                "1: Увеличивает атаку на 3 и шанс крит.удара на 3%",
                "2: Увеличивает атаку на 5 и шанс крит.удара на 4%",
                "3: Увеличивает атаку на 7 и шанс крит.удара на 5%",
              ],
              img: "url(../../img/icons/talents/rogue/talent_rogue_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Сокрушение брони",
              descr: ["После Двойного удара ваши атаки игнорируют защиту врага на 100%"],
              img: "url(../../img/icons/talents/rogue/talent_rogue_2_1.png)",
            },
            second: {
              title: "Удар в сердце",
              descr: ["Двойной удар наносит дополнительно 12%(боссу: 6%) от макс.здоровья врага"],
              img: "url(../../img/icons/talents/rogue/talent_rogue_2_2.png)",
            },
          },

          level_3: {
            first: {
              descr: [
                "1: Двойной удар исцеляет на 25% от нанесенного урона",
                "2: Двойной удар исцеляет на 30% от нанесенного урона",
                "3: Двойной удар исцеляет на 35% от нанесенного урона",
              ],
              img: "url(../../img/icons/talents/rogue/talent_rogue_3_1.png)",
            },
            second: {
              descr: [
                "1: После Двойного удара уклонение повышается на 35% на 5 секунд",
                "2: После Двойного удара уклонение повышается на 50% на 5 секунд",
                "3: После Двойного удара уклонение повышается на 65% на 5 секунд",
              ],
              img: "url(../../img/icons/talents/rogue/talent_rogue_3_2.png)",
            },
          },
        });
        break;
      case "monk":
        this.setDescr({
          level_1: {
            first: {
              title: "Удары змеи",
              descr: [
                "1: Увеличивает атаку на 2. Даёт 30% шанс получить единицу маны при атаке",
                "2: Увеличивает атаку на 4. Даёт 45% шанс получить единицу маны при атаке",
                "3: Увеличивает атаку на 6. Даёт 60% шанс получить единицу маны при атаке",
              ],
              img: "url(../../img/icons/talents/monk/talent_monk_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Стиль богомола",
              descr: ["Дает 33% шанс при уклонении героя, нанести врагу урон, равный вашему уклонению"],
              img: "url(../../img/icons/talents/monk/talent_monk_2_1.png)",
            },
            second: {
              title: "Стиль Тигра",
              descr: ["Дает 33% шанс при крит.ударе, нанести врагу урон, равный вашей атаке"],
              img: "url(../../img/icons/talents/monk/talent_monk_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Техника лотоса",
              descr: [
                "1: Дает 6% шанс при атаке, нанести врагу урон 20%(боссу: 10%) от его макс.запаса здоровья и оглушить на 1 ход",
                "2: Дает 7% шанс при атаке, нанести врагу урон 20%(боссу: 10%) от его макс.запаса здоровья и оглушить на 1 ход",
                "3: Дает 8% шанс при атаке, нанести врагу урон 20%(боссу: 10%) от его макс.запаса здоровья и оглушить на 1 ход",
              ],
              img: "url(../../img/icons/talents/monk/talent_monk_3_1.png)",
            },
            second: {
              title: "Синергия чакр",
              descr: [
                "1: Увеличивает макс.запас здоровья и маны на 35, и регенерацию после боя на 15",
                "2: Увеличивает макс.запас здоровья и маны на 50, и регенерацию после боя на 25",
                "3: Увеличивает макс.запас здоровья и маны на 75, и регенерацию после боя на 35",
              ],
              img: "url(../../img/icons/talents/monk/talent_monk_3_2.png)",
            },
          },
        });
        break;

      case "jester":
        this.setDescr({
          level_1: {
            first: {
              title: "Перетасовка колоды",
              descr: [
                "1: После каждого боя герой воостанавливает 20 маны",
                "2: После каждого боя герой воостанавливает 25 маны",
                "3: После каждого боя герой воостанавливает 30 маны",
              ],
              img: "url(../../img/icons/talents/jester/talent_jester_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Везучий тип",
              descr: ["Увеличивает удачу героя на 10"],
              img: "url(../../img/icons/talents/jester/talent_jester_2_1.png)",
            },
            second: {
              title: "С молотом наперевес",
              descr: ["Увеличивает атаку на 7, и шанс крит.удара на 7%"],
              img: "url(../../img/icons/talents/jester/talent_jester_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Шарик в подарок",
              descr: [
                "1: Есть 40% шанс после использования способности, уменьшить атаку противника на 30% на 6 секунд",
                "2: Есть 55% шанс после использования способности, уменьшить атаку противника на 35% на 6 секунд",
                "3: Есть 70% шанс после использования способности, уменьшить атаку противника на 40% на 6 секунд",
              ],
              img: "url(../../img/icons/talents/jester/talent_jester_3_1.png)",
            },
            second: {
              title: "Мухлёж",
              descr: [
                "1: Есть 15% шанс после использования способности восстановить 40 маны",
                "2: Есть 18% шанс после использования способности восстановить 50 маны",
                "3: Есть 21% шанс после использования способности восстановить 60 маны",
              ],
              img: "url(../../img/icons/talents/jester/talent_jester_3_2.png)",
            },
          },
        });
        break;
      case "dryad":
        this.setDescr({
          level_1: {
            first: {
              title: "Целительное прикосновение",
              descr: [
                "1: После использования способности, герой восстанавливает каждый ход 5% макс.запаса здоровья в течении 6 секунд",
                "2: После использования способности, герой восстанавливает каждый ход 6% макс.запаса здоровья в течении 6 секунд",
                "3: После использования способности, герой восстанавливает каждый ход 7% макс.запаса здоровья в течении 6 секунд",
              ],
              img: "url(../../img/icons/talents/dryad/talent_dryad_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Знак дикой природы",
              descr: ["Увеличивает атаку на 5, защиту на 2 и адаптацию на 15%"],
              img: "url(../../img/icons/talents/dryad/talent_dryad_2_1.png)",
            },
            second: {
              title: "Бузиновый посох",
              descr: ["Урон от Вмешательства природы увеличен на 50%"],
              img: "url(../../img/icons/talents/dryad/talent_dryad_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Дубовая кожа",
              descr: [
                "1: Вмешательства природы уменьшает получаемый урон на 30% на 2 хода",
                "2: Вмешательства природы уменьшает получаемый урон на 40% на 2 хода",
                "3: Вмешательства природы уменьшает получаемый урон на 50% на 2 хода",
              ],
              img: "url(../../img/icons/talents/dryad/talent_dryad_3_1.png)",
            },
            second: {
              title: "Наставление друида",
              descr: [
                "1: Увеличивает силу Магии на 4 и уменьшает на 5 стоимость маны: Вмешательства природы ",
                "2: Увеличивает силу Магии на 9 и уменьшает на 5 стоимость маны: Вмешательства природы ",
                "3: Увеличивает силу Магии на 14 и уменьшает на 5 стоимость маны: Вмешательства природы ",
              ],
              img: "url(../../img/icons/talents/dryad/talent_dryad_3_2.png)",
            },
          },
        });
        break;
      case "mechanic":
        this.setDescr({
          level_1: {
            first: {
              title: "Мастер-ломастер",
              descr: [
                "1: С 20% шансом ваши атаки уменьшают защиту противника на 3, увеличивая вашу, на 2 хода",
                "2: С 25% шансом ваши атаки уменьшают защиту противника на 4, увеличивая вашу, на 2 хода",
                "3: С 30% шансом ваши атаки уменьшают защиту противника на 5, увеличивая вашу, на 2 хода",
              ],
              img: "url(../../img/icons/talents/mechanic/talent_mechanic_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Мозговой чип",
              descr: ["Режим Турбо дополнительно увеличивает адаптацию на 35%"],
              img: "url(../../img/icons/talents/mechanic/talent_mechanic_2_1.png)",
            },
            second: {
              title: "Экономия энергии",
              descr: ["Продлевает длительность Режима Турбо на 3 секунды"],
              img: "url(../../img/icons/talents/mechanic/talent_mechanic_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Усовершенственные нейроны",
              descr: [
                "1: Увеличивает уклонение на 6% и макс.запас здоровья на 30",
                "2: Увеличивает уклонение на 8% и макс.запас здоровья на 40",
                "3: Увеличивает уклонение на 10% и макс.запас здоровья на 50",
              ],
              img: "url(../../img/icons/talents/mechanic/talent_mechanic_3_1.png)",
            },
            second: {
              title: "Броне-пластины",
              descr: [
                "1: Режим Турбо дополнительно увеличивает защиту на 7",
                "2: Режим Турбо дополнительно увеличивает защиту на 10",
                "3: Режим Турбо дополнительно увеличивает защиту на 13",
              ],
              img: "url(../../img/icons/talents/mechanic/talent_mechanic_3_2.png)",
            },
          },
        });

        break;
      case "witchmag":
        this.setDescr({
          level_1: {
            first: {
              title: "Усиленные чары",
              descr: [
                "1: Усиливает Чароплетсво на 15%",
                "2: Усиливает Чароплетсво на 20%",
                "3: Усиливает Чароплетсво на 25%",
              ],
              img: "url(../../img/icons/talents/witchmag/talent_witchmag_1_1.png)",
            },
          },

          level_2: {
            first: {
              title: "Кража ресурсов",
              descr: ["Чароплетсво также крадет 3 маны каждый ход"],
              img: "url(../../img/icons/talents/witchmag/talent_witchmag_2_1.png)",
            },
            second: {
              title: "Глубокая связь",
              descr: ["Продлевает длительность Чароплетсво на 1 ход"],
              img: "url(../../img/icons/talents/witchmag/talent_witchmag_2_2.png)",
            },
          },

          level_3: {
            first: {
              title: "Зачарованный клинок",
              descr: [
                "1: Атака пассивно усилена на 3, а во время Чароплетства еще на 5",
                "2: Атака пассивно усилена на 5, а во время Чароплетства еще на 7",
                "3: Атака пассивно усилена на 7, а во время Чароплетства еще на 9",
              ],
              img: "url(../../img/icons/talents/witchmag/talent_witchmag_3_1.png)",
            },
            second: {
              title: "Смертельный ритуал",
              descr: [
                "1: После окончания Чароплетства враг получает 25%(боссу: 12.5%) от его макс.запаса здоровья",
                "2: После окончания Чароплетства враг получает 30%(боссу: 15%) от его макс.запаса здоровья",
                "3: После окончания Чароплетства враг получает 35%(боссу: 17.5%) от его макс.запаса здоровья",
              ],
              img: "url(../../img/icons/talents/witchmag/talent_witchmag_3_2.png)",
            },
          },
        });
        break;
      default:
        null;
    }
  },
};

export default talents;
