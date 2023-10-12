// "use strict";

// let t = 10;
// const k = setInterval(() => {
//   t -= 1;
//   console.log(t);
//   if (t <= 0) {
//     clearInterval(k);
//     console.log("Время вышло");
//   }
// }, 1000);

// console.log(Math.floor(Math.random() * (14 - 22 + 1)) + 22);

// let a = {
//   dmg: 20,
//   crit: "",
// };

// let b = {
//   dmg: 40,
//   crit: ` Критический удар!`,
// };

// let c = {
//   dmg: Math.round(15 * (150 / 100) - 5),
//   crit: ` Критический удар!`,
// };

// console.log(`вы нанесли${a.crit} ${a.dmg} урона`);
// console.log(`вы нанесли${b.crit} ${b.dmg} урона`);
// console.log(`вы нанесли${c.crit} ${c.dmg} урона`);

// console.log(false <= 4);

// if (1 < 3 && 1) {
//   console.log("da");
// } else {
//   console.log("net");
// }
const hero = {
  name: "war",
  arg: true,
  arg2: true,
  arg3: "",
};
function res() {
  console.log("res");
}

ff("war", res, [hero.arg, hero.arg3]);

function ff(name, fn, [...trigers]) {
  if (
    hero.name === name &&
    !([...trigers].includes(false) || [...trigers].includes(undefined) || [...trigers].includes(""))
  ) {
    fn();
  } else {
    console.log("no");
  }
}

const sss = {
  stun: 0,
};

sss.stun++;
console.log(sss.stun);

sss.stun ? sss.stun-- : null;
console.log(sss.stun);
sss.stun ? sss.stun-- : null;
console.log(sss.stun);
