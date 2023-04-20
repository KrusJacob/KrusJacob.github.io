let mainBg = document.body;
const changeBg = (enemyName) => {
  switch (enemyName) {
    case "greenMonster":
    case "fierySkeleton":
      mainBg.classList.add("dark_forest");
      break;
    case "imps":
    case "titan":
      mainBg.classList.add("hell");
      break;
    case "angelFighter":
      mainBg.classList.add("paradise");
      break;
    default:
      null;
  }
};

export default changeBg;
