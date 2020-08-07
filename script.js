// Setting const values refered to HTML elements. 
// Typing window boarding, Typing window, Text to repeat, Button element, Timer

const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const mistakeCounter = document.querySelector(".mistakes");

// Setting variables needed for time measurement.

var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var mistakes = 0;
var key;

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

  // floor is used to not get any decimals
  timer[0] = Math.floor((timer[3] / 100) / 60); // Minutes
  timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60)); // Seconds
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000)); // Miliseconds

}

// Match the text entered with the provided text on the page.
function spellCheck() {
  let textEntered = testArea.value;
  // Substring treats string as an array (where to start, how many charakters we want to return). Give characters, which refers to typed.
  let originTextMatch = originText.substring(0, textEntered.length);


  if (textEntered == originText) {
    clearInterval(interval);
    testWrapper.style.borderColor = "#04E762";
    console.log(mistakes);
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "#00A896";
    } else {
      testWrapper.style.borderColor = "#960200"
      if (!(event.keyCode == 8)) {
        mistakes++;
      }
      //mistakes++;
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
  // key = event.keyCode;
  //console.log(textEnterdLength);
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

// Event listeners to operate application.
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);