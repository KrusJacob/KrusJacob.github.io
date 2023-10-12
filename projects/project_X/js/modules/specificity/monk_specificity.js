// const chance = 3;
// const monkSpecificity = (enemy) => {
//   const chanceTotal = Math.random() * 100 + 1;
//   if (chance >= chanceTotal) {
//     enemy.stun++;
//   }
// };

const monkSpecificity = {
  chance: 3,
  use: function (enemy) {
    const chanceTotal = Math.random() * 100 + 1;
    if (this.chance >= chanceTotal) {
      enemy.stun++;
    }
  },
};

export default monkSpecificity;
