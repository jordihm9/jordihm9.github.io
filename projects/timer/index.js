'use strict'

// html elements
let secSpan = document.getElementById("sec");
let minSpan = document.getElementById("min");
let hourSpan = document.getElementById("hour");

let activeSpan;

let timerActivated = false;
let timeLeft; // in seconds
let countDown; // interval
let hour, min, sec;

function updateValues() {
    sec = parseInt(secSpan.innerText);
    min = parseInt(minSpan.innerText);
    hour = parseInt(hourSpan.innerText);
}

function calcInitialTime() {
    updateValues();
    timeLeft = sec + (min * 60) + (hour * 3600); // total time in seconds

    console.log("hours: "+hour+". Minutes: "+min+". Seconds: "+sec);
    console.log(timeLeft + " seconds in total");
}

function formatTime(value) {
    return value < 10 ? "0" + value : value;
}

function updateDisplay() {
    sec = parseInt(timeLeft % 60);
    min = parseInt(timeLeft / 60);
    if (min >= 60) {
        min %= 60;
    }
    hour = parseInt(timeLeft / 3600);
    

    secSpan.innerText = formatTime(sec);
    minSpan.innerText = formatTime(min);
    hourSpan.innerText = formatTime(hour);
}

function clearTimer() {
    updateValues();
    if (!timerActivated) { // do not let clear if timer is active
        secSpan.innerText = "00";
        minSpan.innerText = "00";
        hourSpan.innerText = "00";

        console.log("Timer cleared");
    } else {
        console.log("Cannot clean because there is a timer active");
    }
}

function stopTimer() {
    if (timerActivated) {
        timerActivated = false;
        clearInterval(countDown);

        console.log("Timer stoped");
    } else {
        console.log("Timer is not active")
    }
}

function startTimer() {
    updateValues();
    if (timerActivated) { // if the timer is activated do not start again
        console.log("Timer is already active");
    } else if (sec == "00" && min == "00" && hour == "00") {
        console.log("Timer is not set")
    } else if (!timerActivated) {
        timerActivated = true;
        console.log("Timer started");

        // reset colors
        secSpan.style.color = "white";
        minSpan.style.color = "white";
        hourSpan.style.color = "white";

        calcInitialTime();
        countDown = setInterval(function () {
            timeLeft--;
            // if timer ended, stop loop, otherwise update display
            timeLeft <= 0 ? stopTimer() : updateDisplay();
            updateDisplay();
        }, 1000);
    }
}

// set the timer seconds, minutes or hours active to modify it
function activateModification(spanId) {
    activeSpan = document.getElementById(spanId);
    secSpan.style.color = "white";
    minSpan.style.color = "white";
    hourSpan.style.color = "white";
    activeSpan.style.color = "#3353D5"; // blue color
}

// user entry the timer time
function setTimer(number) {
    updateValues();
    if (activeSpan.innerText.substring(0,1) == 0) {
        activeSpan.innerText = activeSpan.innerText.substring(1,2).toString() + number;
    } else {
        activeSpan.innerText = "0"+number;
    }
    autoCorrectTimer();
}

// auto check and calculate the time if seconds or minutes are above 60
function autoCorrectTimer() {
    updateValues();
    let calcTmp;
    if (sec >= 60) {
        calcTmp = min + parseInt(sec / 60);
        minSpan.innerText = formatTime(calcTmp);

        calcTmp = parseInt(sec % 60);
        secSpan.innerText = formatTime(calcTmp);
    }

    updateValues();
    if ( min >= 60) {
        calcTmp = hour + parseInt(min / 60);
        hourSpan.innerText = formatTime(calcTmp);

        calcTmp = parseInt(min % 60);
        minSpan.innerText = formatTime(calcTmp);
    }
}