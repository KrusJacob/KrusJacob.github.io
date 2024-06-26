// Main
const AudioBackground = new Audio("./audio/background.mp3");
decVolume(AudioBackground, 0.1);
const AudioClickSliderArrows = new Audio("./audio/click_slider-arrows.mp3");
decVolume(AudioClickSliderArrows, 0.5);
const AudioHeroChosen = new Audio("./audio/hero_chosen.mp3");
decVolume(AudioHeroChosen, 0.3);
// sword Strikes
const AudioSwordStrike = new Audio("./audio/sword_strike.mp3");
decVolume(AudioSwordStrike, 0.1);
const AudioSwordStrike2 = new Audio("./audio/sword_strike_2.mp3");
decVolume(AudioSwordStrike2, 0.1);
const AudioSwordStrike3 = new Audio("./audio/sword_strike_3.mp3");
decVolume(AudioSwordStrike3, 0.1);
const AudioSwordCrit = new Audio("./audio/sword_strike_crit.mp3");
decVolume(AudioSwordCrit, 0.2);
// punch Strikes
const AudioPunchStrike = new Audio("./audio/punch_strike.mp3");
decVolume(AudioPunchStrike, 0.1);
const AudioPunchStrike2 = new Audio("./audio/punch_strike_2.mp3");
decVolume(AudioPunchStrike2, 0.1);
const AudioPunchStrike3 = new Audio("./audio/punch_strike_3.mp3");
decVolume(AudioPunchStrike3, 0.1);
const AudioPunchCrit = new Audio("./audio/punch_strike_crit.mp3");
decVolume(AudioPunchCrit, 0.2);
// staff Strikes
const AudioStaffStrike = new Audio("./audio/staff_strike.mp3");
decVolume(AudioStaffStrike, 0.1);
const AudioStaffStrike2 = new Audio("./audio/staff_strike_2.mp3");
decVolume(AudioStaffStrike2, 0.1);
const AudioStaffStrike3 = new Audio("./audio/staff_strike_3.mp3");
decVolume(AudioStaffStrike3, 0.1);
const AudioStaffCrit = new Audio("./audio/staff_strike_crit.mp3");
decVolume(AudioStaffCrit, 0.2);
// Miss Attack
const AudioMissAttack = new Audio("./audio/miss_attack.mp3");
decVolume(AudioMissAttack, 0.2);
// get Demage Man
const AudioGetDemageMan = new Audio("./audio/get_demage_man.mp3");
decVolume(AudioGetDemageMan, 0.1);
const AudioGetDemageMan2 = new Audio("./audio/get_demage_man_2.mp3");
decVolume(AudioGetDemageMan2, 0.1);
const AudioGetDemageMan3 = new Audio("./audio/get_demage_man_3.mp3");
decVolume(AudioGetDemageMan3, 0.1);
const AudioGetDemageMan4 = new Audio("./audio/get_demage_man_4.mp3");
decVolume(AudioGetDemageMan4, 0.1);
// get Demage Woman
const AudioGetDemageWoman = new Audio("./audio/get_demage_woman.mp3");
decVolume(AudioGetDemageWoman, 0.1);
const AudioGetDemageWoman2 = new Audio("./audio/get_demage_woman_2.mp3");
decVolume(AudioGetDemageWoman2, 0.1);
const AudioGetDemageWoman3 = new Audio("./audio/get_demage_woman_3.mp3");
decVolume(AudioGetDemageWoman3, 0.1);
const AudioGetDemageWoman4 = new Audio("./audio/get_demage_woman_4.mp3");
decVolume(AudioGetDemageWoman4, 0.1);
// skills
const AudioSkillWarrior = new Audio("./audio/skills/skill_warrior.mp3");
decVolume(AudioSkillWarrior, 0.3);
const AudioSkillRogue = new Audio("./audio/skills/skill_rogue.mp3");
decVolume(AudioSkillRogue, 0.7);
const AudioSkillMonk = new Audio("./audio/skills/skill_monk.mp3");
decVolume(AudioSkillMonk, 0.3);
const AudioSkillJester = new Audio("./audio/skills/skill_jester.mp3");
decVolume(AudioSkillJester, 0.9);
const AudioSkillDryad = new Audio("./audio/skills/skill_dryad.mp3");
decVolume(AudioSkillDryad, 0.4);
const AudioSkillMechanic = new Audio("./audio/skills/skill_mechanic.mp3");
decVolume(AudioSkillMechanic, 0.5);
const AudioSkillWitchmag = new Audio("./audio/skills/skill_witchmag.mp3");
decVolume(AudioSkillWitchmag, 0.5);

const AudioSkillMageFire = new Audio("./audio/skills/skill_mage_fire.mp3");
decVolume(AudioSkillMageFire, 0.5);
const AudioSkillMageIceBlock = new Audio("./audio/skills/skill_mage_ice_block.mp3");
decVolume(AudioSkillMageIceBlock, 0.3);
const AudioSkillMageIceDestr = new Audio("./audio/skills/skill_mage_ice_destr.mp3");
decVolume(AudioSkillMageIceDestr, 0.5);
const AudioSkillMageIceCreate = new Audio("./audio/skills/skill_mage_ice_create.mp3");
decVolume(AudioSkillMageIceCreate, 0.3);
const AudioSkillMageLightning = new Audio("./audio/skills/skill_mage_lightning.mp3");
decVolume(AudioSkillMageLightning, 0.5);

function decVolume(audio, volume) {
  audio.volume = volume;
}

function AudioAction(audio, action) {
  if (action === "loop") {
    getAudio(audio).loop = true;
  } else if (action === "stop") {
    getAudio(audio).pause();
  } else {
    getAudio(audio).play();
  }

  function getAudio(audio) {
    switch (audio) {
      case "background":
        return AudioBackground;
      case "heroChosen":
        return AudioHeroChosen;
      case "clickSliderArrow":
        return AudioClickSliderArrows;
      case "swordStrike":
        const audioSwordArr = [AudioSwordStrike, AudioSwordStrike2, AudioSwordStrike3];
        const audioSwordNum = Math.floor(Math.random() * audioSwordArr.length);
        return audioSwordArr[audioSwordNum];
      case "swordCrit":
        return AudioSwordCrit;
      case "punchStrike":
        const audioPunchArr = [AudioPunchStrike, AudioPunchStrike2, AudioPunchStrike3];
        const audioPunchNum = Math.floor(Math.random() * audioPunchArr.length);
        return audioPunchArr[audioPunchNum];
      case "punchCrit":
        return AudioPunchCrit;
      case "staffStrike":
        const audioStaffArr = [AudioStaffStrike, AudioStaffStrike2, AudioStaffStrike3];
        const audioStaffNum = Math.floor(Math.random() * audioStaffArr.length);
        return audioStaffArr[audioStaffNum];
      case "staffCrit":
        return AudioStaffCrit;
      case "getDemageMan":
        const audioManArr = [AudioGetDemageMan, AudioGetDemageMan2, AudioGetDemageMan3];
        const audioManNum = Math.floor(Math.random() * audioManArr.length);
        return audioManArr[audioManNum];
      case "getCritDemageMan":
        return AudioGetDemageMan4;
      case "getDemageWoman":
        const audioWomanArr = [AudioGetDemageWoman, AudioGetDemageWoman2, AudioGetDemageWoman3];
        const audioWomanNum = Math.floor(Math.random() * audioWomanArr.length);
        return audioWomanArr[audioWomanNum];
      case "getCritDemageWoman":
        return AudioGetDemageWoman4;
      case "missAttack":
        return AudioMissAttack;
      case "skillWARRIOR":
        return AudioSkillWarrior;
      case "skillROGUE":
        return AudioSkillRogue;
      case "skillMONK":
        return AudioSkillMonk;
      case "skillJESTER":
        return AudioSkillJester;
      case "skillDRYAD":
        return AudioSkillDryad;
      case "skillMECHANIC":
        return AudioSkillMechanic;
      case "skillWITCHMAG":
        return AudioSkillWitchmag;
      case "skillMAGE_fire":
        return AudioSkillMageFire;
      case "skillMAGE_iceCreate":
        return AudioSkillMageIceCreate;
      case "skillMAGE_iceBlock":
        return AudioSkillMageIceBlock;
      case "skillMAGE_iceDestr":
        return AudioSkillMageIceDestr;
      case "skillMAGE_lightning":
        return AudioSkillMageLightning;
    }
  }
}

function setAudioToHero(hero) {
  hero.audio = {};
  switch (hero.name) {
    case "warrior":
    case "rogue":
    case "witchmag":
      hero.audio.attack = () => AudioAction("swordStrike");
      hero.audio.crit = () => AudioAction("swordCrit");
      break;
    case "monk":
    case "jester":
    case "mechanic":
      hero.audio.attack = () => AudioAction("punchStrike");
      hero.audio.crit = () => AudioAction("punchCrit");
      break;
    case "dryad":
    case "mage":
      hero.audio.attack = () => AudioAction("staffStrike");
      hero.audio.crit = () => AudioAction("staffCrit");
      break;
  }

  switch (hero.sex) {
    case "man":
      hero.audio.getDemage = () => AudioAction("getDemageMan");
      hero.audio.getCrit = () => AudioAction("getCritDemageMan");
      break;
    case "woman":
      hero.audio.getDemage = () => AudioAction("getDemageWoman");
      hero.audio.getCrit = () => AudioAction("getCritDemageWoman");
      break;
  }

  hero.audio.miss = () => AudioAction("missAttack");

  switch (hero.name) {
    case "warrior":
    case "rogue":
    case "monk":
    case "jester":
    case "dryad":
    case "mechanic":
    case "witchmag":
      hero.audio.skill = () => AudioAction(`skill${hero.name.toUpperCase()}`);
      break;
    case "mage":
      hero.audio.skill = {};
      hero.audio.skill.iceCreate = () => AudioAction("skillMAGE_iceCreate");
      hero.audio.skill.iceBlock = () => AudioAction("skillMAGE_iceBlock");
      hero.audio.skill.iceDestr = () => AudioAction("skillMAGE_iceDestr");
      hero.audio.skill.fire = () => AudioAction("skillMAGE_fire");
      hero.audio.skill.lightning = () => AudioAction("skillMAGE_lightning");
      break;
  }
}

export default AudioAction;
export { setAudioToHero };
