import createHeroes from "./heroes";

let maxLimit = 3;
let minLimit = 1;
let chanceGoldBox = 0;
function searchEnemy(luck) {
  const checkLuck = Math.floor(Math.random() * 100) + 1;
  const modLuck = checkLuck * 1.1 + chanceGoldBox;

  if (modLuck <= luck) {
    chanceGoldBox++;
    return createHeroes("enemy", 0);
  } else {
    // const enemyNum = Math.floor(Math.random() * (0 - difficulty + 1)) + difficulty;
    const enemyNum = Math.floor(minLimit + Math.random() * (maxLimit + 1 - minLimit));
    console.log(`${minLimit} - ${maxLimit}`, `: enemy = ${enemyNum}`);

    if (maxLimit <= createHeroes("count") - 1) {
      // maxLimit += 1;
      maxLimit += 0.75;
    }
    if (minLimit <= createHeroes("count") - 2) {
      // minLimit += 0.5;
      minLimit += 0.7;
    }

    return createHeroes("enemy", enemyNum);
  }
}

export default searchEnemy;

// createHeroes("count")
