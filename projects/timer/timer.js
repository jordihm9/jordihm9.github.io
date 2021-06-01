'use strict';

const SEC = $('#sec');
const MIN = $('#min');
const HOUR = $('#hour');

let active = SEC;

let running = false;
let timeLeft; // in seconds
let timer; // interval
let hour = 0, min = 0, sec = 0;

updateDisplay();

$('#start-button').on('click', run);

$('#stop-button').on('click', stop);

$('#erase-button').on('click', clear);

/**
 * Listen for click in 'hour', 'minutes' or 'seconds' display to set edit
 */
$('#display span').on('click', (e)=> {
	if (running) return;
	active = $(e.target);

	SEC.removeClass('active');
	MIN.removeClass('active');
	HOUR.removeClass('active');

	active.addClass('active');
});

/**
 * Listen for click in buttons to set the timer
 */
$('.num-button').on('click', (e)=> {
	if (running) return;

	let num = parseInt($(e.target).text());

	if (active.text().substring(0, 1) == 0) {
		active.text(active.text().substring(1,2).toString() + num);
	} else {
		active.text('0'+ num);
	}

	updateValues();
    let calcTmp;
    if (sec >= 60) {
        calcTmp = min + parseInt(sec / 60);
        MIN.text(formatTime(calcTmp));

        calcTmp = parseInt(sec % 60);
        SEC.text(formatTime(calcTmp));
    }

    updateValues();
    if (min >= 60) {
        calcTmp = hour + parseInt(min / 60);
        HOUR.text(formatTime(calcTmp));

        calcTmp = parseInt(min % 60);
        MIN.text(formatTime(calcTmp));
    }
});

/**
 * Start the timer
 */
function run() {
	if (running || (hour === 0 && min === 0 && sec === 0)) {
		return;
	}

	active.removeClass('active');

	calcInitialTime();

	timer = setInterval(()=> {
		running = true;
		timeLeft--;

		sec = parseInt(timeLeft % 60);
		min = parseInt(timeLeft / 60);
		if (min >= 60) {
			min %= 60;
		}
		hour = parseInt(timeLeft / 3600);

		if (timeLeft <= 0) {
			stop();
			alert('Timer ended!');
		}

		updateDisplay();
	}, 1000);
}

/**
 * Stop the timer
 */
function stop() {
	running = false;
	clearInterval(timer);
}

/**
 * Clear the timer back to 0
 */
function clear() {
	if (running) return;
	hour = 0, min = 0, sec = 0;
	updateDisplay();
}

/**
 * Update the values from the display
 */
 function updateDisplay() {
	SEC.text(formatTime(sec));
	MIN.text(formatTime(min));
	HOUR.text(formatTime(hour));
}

function updateValues() {
    sec = parseInt(SEC.text());
    min = parseInt(MIN.text());
    hour = parseInt(HOUR.text());
}

/**
 * Calculate in seconds how much time it will be the timer
 */
function calcInitialTime() {
    timeLeft = sec + (min * 60) + (hour * 3600); // total time in seconds
}

/**
 * Add 0 before the number if it's less than 10 (to force 2 digits)
 * @param {number} value 
 * @returns 
 */
function formatTime(value) {
    return value < 10 ? "0" + value : value;
}