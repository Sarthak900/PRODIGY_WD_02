// Declare global variables
let running = false; // Is the stopwatch running?
let time = 0; // Time in seconds
let interval; // Holds the setInterval function to update time

// Grab elements from the DOM
const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startButton'); // Start button
const stopButton = document.getElementById('stopButton'); // Stop button
const resetButton = document.getElementById('resetButton'); // Reset button
const lapButton = document.getElementById('lapButton'); // Lap button
const lapsDisplay = document.getElementById('laps');

// Function to start the stopwatch
function start() {
    if (!running) {
        interval = setInterval(updateTime, 1000); // Update time every 1000ms (1 second)
        running = true; // Set the running state to true
        startButton.disabled = true; // Disable the start button
        stopButton.disabled = false; // Enable the stop button
    }
}

// Function to stop the stopwatch
function stop() {
    clearInterval(interval); // Stop the timer
    running = false; // Set the running state to false
    startButton.disabled = false; // Enable the start button
    stopButton.disabled = true; // Disable the stop button
}

// Function to update the time every 1 second
function updateTime() {
    time++; // Increment time by 1 second
    const hours = Math.floor(time / 3600); // Calculate hours (3600 seconds = 1 hour)
    const minutes = Math.floor((time % 3600) / 60); // Calculate minutes (60 seconds = 1 minute)
    const seconds = time % 60; // Get the remaining seconds

    // Update the time display (formatted as HH:MM:SS)
    timeDisplay.textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}

// Function to format hours, minutes, and seconds
function formatTime(unit) {
    return unit < 10 ? '0' + unit : unit;
}

// Function to reset the stopwatch
function reset() {
    clearInterval(interval); // Stop the timer
    running = false; // Set the running state to false
    time = 0; // Reset time to 0
    timeDisplay.textContent = '00:00:00'; // Reset display
    startButton.disabled = false; // Enable the start button
    stopButton.disabled = true; // Disable the stop button
    lapsDisplay.innerHTML = ''; // Clear laps
}

// Function to record a lap time
function recordLap() {
    if (!running) return; // Don't record laps if the stopwatch isn't running
    
    // Format current time for the lap
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const lapTime = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);

    // Create a new lap item and add it to the display
    const lapItem = document.createElement('div');
    lapItem.textContent = 'Lap: ' + lapTime;
    lapsDisplay.appendChild(lapItem);
}
