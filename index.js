const mask = (number) => {
  return String(Math.floor(number / 1000 / 60)).padStart(2, "0")
    .concat(":")
    .concat(String(Math.floor(number / 1000) - Math.floor((number / 1000) / 60) * 60).padStart(2, "0"))
    .concat(`<p class="ms">${String(number % 1000)
      .padStart(3, "0")}</p>`);
}

document.addEventListener("DOMContentLoaded", () => {
  const btnStart = document.getElementById("start")
  const btnStop = document.getElementById("stop")
  const btnClear = document.getElementById("clear");
  const btnLap = document.getElementById("lap");
  const timer = document.getElementById("timer");
  let laps = [];

  const updateTimerInScreen = () => {
    document.getElementById("timer").innerHTML = mask(timerInMiliseconds)
  }

  const toggleClearAndStop = () => {
    let clearOn = btnStop.style.display === "none" ? false : true;
    btnStop.style.display = clearOn ? "none" : "block"
    btnClear.style.display = !clearOn ? "none" : "block"

    if(clearOn) btnLap.style.display = "block"
  }


  let timerInMiliseconds = 0; // 55s
  let updater = undefined;
  timer.innerHTML = mask(timerInMiliseconds)

  btnStop.onclick = () => {
    if (!updater && timerInMiliseconds === 0) return;
    if (updater) clearInterval(updater);
    updater = undefined;
    toggleClearAndStop()
  }

  btnClear.onclick = () => {
    timerInMiliseconds = 0;
    toggleClearAndStop()
    updateTimerInScreen()
    btnLap.style.display = "none"
    document.querySelector(".laps").innerHTML = "<div></div>";
    laps = [];
  }

  btnStart.onclick = () => {
    btnLap.style.display = "block"
    if (updater) clearInterval(updater)
    if (timerInMiliseconds !== 0 && !updater) toggleClearAndStop()
    updater = setInterval(() => {
      timerInMiliseconds = timerInMiliseconds + 94;
      updateTimerInScreen()
    }, 94);
  }

  const renderLaps = () => {
    let toRender = ""
    laps.forEach((l, index) => {
      toRender = toRender.concat(`<div class="lap">Volta ${index + 1} marcada ás ${l}</div>`).concat("\n")
    })
    let wLaps = document.querySelector(".laps");
    wLaps.innerHTML = toRender;
    wLaps.scrollTo(0, Number.MAX_SAFE_INTEGER)
  }

  btnLap.onclick = () => {
    laps.push(mask(timerInMiliseconds));
    renderLaps();
  }
})