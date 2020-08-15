// Setting const values refered to HTML elements. 

const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const mistakeCounter = document.querySelector(".mistakes");
const typeSpeed = document.querySelector(".count");
const bestScores = document.querySelector(".board");
const saveButton = document.querySelector(".zero");
const zeroButton = document.querySelector("#delete");

// Setting variables needed for time measurement.

var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var mistakes = 0;
var key;
var speed;

// Add leading zero to numbers 9 or below (for aesthetics).
function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  // Floor is used to not get any decimals.
  timer[0] = Math.floor((timer[3] / 100) / 60); // Minutes
  timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60)); // Seconds
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000)); // Miliseconds

}

// Match the text entered with the provided text on the page.
function spellCheck() {
  let textEntered = testArea.value;

  // Substring treats string as an array (where to start, how many charakters we want to return). Gives characters, which refers to typed ones.
  let originTextMatch = originText.substring(0, textEntered.length);

  if (textEntered == originText) {
    clearInterval(interval);
    testWrapper.style.borderColor = "#04E762";
    speedCount();

  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "#00A896";
    } else {
      testWrapper.style.borderColor = "#960200"
      if (!(event.keyCode == 8)) {
        mistakes++;
      }
      mistakeCounter.innerHTML = mistakes;
    }
  }

}

// Start the timer. It starts when 1st letter is typed and timer is not already running.
function start() {
  let textEnterdLength = testArea.value.length;
  if (textEnterdLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
}

// Reset everything:
function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerRunning = false;
  mistakes = 0;

  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "#BABFD1";
  mistakeCounter.innerHTML = "0";
}

// Clear High score board.
function resetBoard() {
  localStorage.clear();
  bestScores.innerHTML = '';
}

// Calculate average speed of typing, during test.
function speedCount() {
  let text = originText.split(' ');
  let min = timer[3] / 6000;
  speed = text.length / min;
  typeSpeed.innerHTML = speed.toFixed(1);
}

// Loads previous saved results and adds new one.
function updateScore() {

  let current = parseInt(typeSpeed.innerHTML);
  let scores = false;

  if (localStorage["high-scores"]) {

    scores = JSON.parse(localStorage["high-scores"]);
    scores = scores.sort(function (a, b) { return parseInt(b) - parseInt(a) });

    for (let i = 0; i < 10; i++) {
      let s = parseInt(scores[i]);

      let val = (!isNaN(s) ? s : 0);
      if (current > val) {
        val = current;
        scores.splice(i, 0, parseInt(current));
        break;
      }
    }
    localStorage["high-scores"] = JSON.stringify(scores);

  } else {
    scores = new Array();
    scores[0] = current;
    localStorage["high-scores"] = JSON.stringify(scores);
  }

  bestScores.innerHTML = '';
  scores = JSON.parse(localStorage["high-scores"]);
  scores = scores.sort(function (a, b) { return parseInt(b) - parseInt(a) });

  for (var i = 0; i < 10; i++) {
    var s = scores[i];
    var fragment = document.createElement('li');
    fragment.innerHTML = (typeof (s) != "undefined" ? s : "");
    bestScores.appendChild(fragment);
  }
}

// Event listeners to operate application.
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
zeroButton.addEventListener("click", resetBoard, false);
saveButton.addEventListener("click", updateScore, false);