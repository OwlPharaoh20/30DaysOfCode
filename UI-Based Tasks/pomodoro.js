/*
Javascript 30 days of code 
Day 29
Project details: Pomodoro Timer
Javascript concept : Event Handling, DOM manipulation
*/

// Timer variables
let timeInSeconds = 25 * 60; // Default to 25 minutes
let timerInterval;
let isPaused = false;

// DOM Elements
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const workSessionBtn = document.getElementById('workSession');
const shortBreakBtn = document.getElementById('shortBreak');
const longBreakBtn = document.getElementById('longBreak');

// Format time function
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Update the timer display
function updateDisplay() {
    timerDisplay.textContent = formatTime(timeInSeconds);
}

// Timer countdown logic
function startTimer() {
    if (timerInterval) return; // Prevent multiple intervals
    
    timerInterval = setInterval(() => {
        if (!isPaused && timeInSeconds > 0) {
            timeInSeconds--;
            updateDisplay();
        } else if (timeInSeconds === 0) {
            clearInterval(timerInterval);
            alert('Time is up!');
        }
    }, 1000);
}

// Event listeners
startBtn.addEventListener('click', () => {
    isPaused = false;
    startTimer();
});

pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused; // Toggle pause/resume
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timeInSeconds = 25 * 60; // Reset to 25 minutes
    isPaused = false;
    updateDisplay();
});

// Session buttons
workSessionBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timeInSeconds = 25 * 60;
    updateDisplay();
});

shortBreakBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timeInSeconds = 5 * 60;
    updateDisplay();
});

longBreakBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timeInSeconds = 15 * 60;
    updateDisplay();
});

// Initial display
updateDisplay();
