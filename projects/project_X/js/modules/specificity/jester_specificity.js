let jesterCombo = 1;
const jesterSpecificity = (hero, dmgHero, enemyDef) => {
  if (jesterCombo < 4) {
    jesterCombo++;
    return dmgHero;
  } else {
    let dmg = Math.round(dmgHero + enemyDef);
    jesterCombo = 1;
    hero.mana += 2;
    return dmg;
  }
};

export default jesterSpecificity;
