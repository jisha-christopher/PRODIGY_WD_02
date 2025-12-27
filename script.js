console.log("JavaScript connected ");

let min = 0;
let sec = 0;
let msec = 0;
let timer = null;
let running = false;
let lapCount = 0;

const minEl = document.getElementById("min");
const secEl = document.getElementById("sec");
const msecEl = document.getElementById("msec");
const lapsEl = document.getElementById("laps");

const playBtn = document.getElementById("play");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const clearBtn = document.getElementById("clear");

/* ▶️ PLAY / PAUSE */
playBtn.addEventListener("click", () => {
  if (!running) {
    running = true;
    playBtn.textContent = "Pause";
    timer = setInterval(runTimer, 10);
  } else {
    clearInterval(timer);
    running = false;
    playBtn.textContent = "Play";
  }
});

/* 🔄 RESET */
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  running = false;
  min = sec = msec = 0;
  lapCount = 0;
  updateTime();
  lapsEl.innerHTML = "";
  playBtn.textContent = "Play";
});

/* 🧾 LAP */
lapBtn.addEventListener("click", () => {
  if (!running) return;

  lapCount++;

  const li = document.createElement("li");
  li.className = "lap-item";
  li.innerHTML = `
    <span class="number">#${lapCount}</span>
    <span class="time-stamp">
      ${format(min)}:${format(sec)}:${format(msec)}
    </span>
  `;
  lapsEl.appendChild(li);
});

/* 🗑 CLEAR LAPS */
clearBtn.addEventListener("click", () => {
  lapsEl.innerHTML = "";
  lapCount = 0;
});

/* ⏱ TIMER */
function runTimer() {
  msec++;
  if (msec === 100) {
    msec = 0;
    sec++;
  }
  if (sec === 60) {
    sec = 0;
    min++;
  }
  updateTime();
}

/* 🖥 UPDATE UI */
function updateTime() {
  minEl.textContent = format(min) + ":";
  secEl.textContent = format(sec) + ":";
  msecEl.textContent = format(msec);
}

function format(val) {
  return val < 10 ? "0" + val : val;
}
