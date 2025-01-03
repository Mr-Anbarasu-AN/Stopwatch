let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateTime() {
  const currentTime = new Date().getTime();
  elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!isRunning) {
    startTime = new Date().getTime() - elapsedTime;
    timer = setInterval(updateTime, 10);
    isRunning = true;
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  display.textContent = formatTime(elapsedTime);
  lapsList.innerHTML = '';
}

function lapTimer() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
  }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);