// let mod = 20;
// const warriorSpecificity = (dmg) => {
//   console.log(`${dmg}`, `= ${dmg - dmg * (mod / 100)}`);
//   return Math.round(dmg - dmg * (mod / 100));
// };

const warriorSpecificity = {
  mod: 20,
  use: function (dmg) {
    return Math.round(dmg - dmg * (this.mod / 100));
  },
};

export default warriorSpecificity;
