const witchmagSpecificity = (magicPowerHero) => {
  const mod = 0.1;
  const bonusDmg = Math.round(magicPowerHero * mod);
  console.log(bonusDmg);
  return bonusDmg;
};

export default witchmagSpecificity;
