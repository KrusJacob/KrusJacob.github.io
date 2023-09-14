// 3d Scrool

let zSpacing = -1000,
  lastPoz = zSpacing / 5,
  //   $frames = document.getElementsByClassName("frame"),
  $frames = document.querySelectorAll(".frame"),
  frames = Array.from($frames),
  zVals = [];

window.onscroll = function () {
  let top = document.documentElement.scrollTop,
    delta = lastPoz - top;

  lastPoz = top;

  frames.forEach(function (n, i) {
    zVals.push(i * zSpacing + zSpacing);
    zVals[i] += delta * -5;
    let frame = frames[i],
      transformZ = `translateZ(${zVals[i]}px)`,
      opacity = zVals[i] < Math.abs(zSpacing) / 2 ? 1 : 0,
      scale = zVals[i] < Math.abs(zSpacing) / 2 ? 1 : 1.25;

    frame.setAttribute("style", `transform: ${transformZ} scale(${scale}); opacity: ${opacity}`);
  });
};

window.scrollTo(0, 1);

// Audio

let soundButton = document.querySelector(".sound-button"),
  audio = document.querySelector(".audio");

soundButton.addEventListener("click", (e) => {
  soundButton.classList.toggle("paused");
  audio.paused ? audio.play() : audio.pause();
});

window.onfocus = function () {
  soundButton.classList.contains("paused") ? audio.pause() : audio.play();
};

window.onblur = function () {
  audio.pause();
};
