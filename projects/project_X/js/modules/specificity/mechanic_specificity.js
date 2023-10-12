// const mod = 1.5;
// let mechanicCombo = 1;
// const mechanicSpecificity = (dmgHero) => {
//   if (dmgHero) {
//     if (mechanicCombo > 3) {
//       mechanicCombo = 1;

//       const dmg = Math.round(dmgHero * mod);
//       return dmg;
//     } else {
//       mechanicCombo++;

//       return dmgHero;
//     }
//   } else {
//     mechanicCombo = 1;
//   }
// };

const mechanicSpecificity = {
  mod: 1.5,
  mechanicCombo: 1,
  chanceToStun: 0,
  use: function (dmgHero, enemy) {
    if (dmgHero) {
      if (this.mechanicCombo > 3) {
        const chanceTotal = Math.random() * 100 + 1;
        if (this.chanceToStun >= chanceTotal) {
          enemy.stun++;
        }
        this.mechanicCombo = 1;
        const dmg = Math.round(dmgHero * this.mod);
        return dmg;
      } else {
        this.mechanicCombo++;
        return dmgHero;
      }
    } else {
      this.mechanicCombo = 1;
    }
  },
};

export default mechanicSpecificity;
