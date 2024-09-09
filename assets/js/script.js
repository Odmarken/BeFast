const startButton = document.getElementById('startButton'); // The 'Start' button
const dot = document.getElementById('dot'); // The dot that appears randomly on the screen
const instructions = document.getElementById('instructions'); // The instruction box
const leaderboard = document.getElementById('leaderboard'); // The leaderboard container
const reactionTimesList = document.getElementById('reactionTimes'); // The list of reaction times
const header = document.querySelector('header'); // The header section to avoid placing the dot there

/* 
    Variables to store game state 
*/
let timer; // Holds the timeout function for delaying dot appearance
let reactionStart; // Stores the time when the dot appears
let reactionTimes = []; // Array to store reaction times

/* 
    When the window finishes loading 
*/
window.onload = function () {
    startButton.style.display = 'block'; // Show the start button
    instructions.style.display = 'block'; // Show the instructions initially
    leaderboard.style.display = 'block'; // Show the leaderboard initially

    displayLeaderboard(); // Display the leaderboard based on previous results
};

/* 
    Event listener for the start button click 
*/
startButton.addEventListener('click', function () {
    startButton.style.display = 'none'; // Hide the start button
    instructions.style.display = 'none'; // Hide the instructions
    leaderboard.style.display = 'none'; // Hide the leaderboard

    startGame(); // Start the game
});

/* 
    Function that starts the game by displaying the dot after a random delay 
*/
function startGame() {
    const minTime = 1000; // Minimum wait time (1 second)
    const maxTime = 5000; // Maximum wait time (5 seconds)

    // Calculate a random delay time between 1 and 5 seconds
    const randomTime = Math.floor(Math.random() * (maxTime - minTime)) + minTime;

    // Set a timeout to show the dot after the random delay
    timer = setTimeout(() => {
        showDot();
        reactionStart = new Date().getTime(); // Record the time when the dot appears
    }, randomTime);
}

/* 
    Function to show the dot at a random position 
*/
function showDot() {
    const screenWidth = window.innerWidth; // Get the screen width
    const screenHeight = window.innerHeight; // Get the screen height

    // Calculate the height of the header to ensure the dot doesn't overlap it
    const headerHeight = header.offsetHeight;

    // Calculate random X and Y positions for the dot, ensuring Y is below the header
    const randomX = Math.floor(Math.random() * (screenWidth - 30)); // X coordinate (leave some space for the dot size)
    const randomY = Math.floor(Math.random() * (screenHeight - headerHeight - 30)) + headerHeight; // Y coordinate (leave space for the dot size and header)

    // Set the position of the dot and make it visible
    dot.style.left = `${randomX}px`;
    dot.style.top = `${randomY}px`;
    dot.style.display = 'block'; // Show the dot

    // Add an event listener to the dot to register the click
    dot.addEventListener('click', registerReaction); 
}

/* 
    Function to handle the click event on the dot 
*/
function registerReaction() {
    const reactionEnd = new Date().getTime(); // Get the time when the dot was clicked
    const reactionTime = reactionEnd - reactionStart; // Calculate the reaction time

    dot.style.display = 'none'; // Hide the dot after it is clicked

    alert(`You clicked the dot! Reaction time: ${reactionTime} ms`); // Show an alert with the reaction time

    reactionTimes.push(reactionTime); // Add the reaction time to the array

    saveReactionTimes(); // Save the reaction time in session storage
    resetGame(); // Reset the game
}

/* 
    Function to save the reaction times in session storage 
*/
function saveReactionTimes() {
    // Ensure only the last 3 reaction times are saved
    if (reactionTimes.length > 3) {
        reactionTimes = reactionTimes.slice(-3); // Keep only the last 3 entries
    }

    // Save the array of reaction times as a JSON string in session storage
    sessionStorage.setItem('reactionTimes', JSON.stringify(reactionTimes));
}

/* 
    Function to display the leaderboard 
*/
function displayLeaderboard() {
    reactionTimesList.innerHTML = ''; // Clear the leaderboard

    const savedTimes = sessionStorage.getItem('reactionTimes'); // Retrieve saved reaction times from session storage
    if (savedTimes) {
        reactionTimes = JSON.parse(savedTimes); // Parse the saved times (stored as JSON)
    }

    // Display only the last 3 reaction times
    const lastThreeTimes = reactionTimes.slice(-3); // Get the last 3 reaction times

    // Loop through the reaction times and add them to the leaderboard
    lastThreeTimes.forEach((time, index) => {
        const listItem = document.createElement('li'); // Create a new list item
        listItem.textContent = `#${index + 1}: ${time} ms`; // Set the text of the list item
        reactionTimesList.appendChild(listItem); // Add the list item to the leaderboard
    });
}

/* 
    Function to reset the game after each round 
*/
function resetGame() {
    clearTimeout(timer); // Clear the timer to avoid any delayed actions
    startButton.style.display = 'block'; // Show the start button again
    instructions.style.display = 'block'; // Show the instructions again
    leaderboard.style.display = 'block'; // Show the leaderboard again
    displayLeaderboard(); // Update the leaderboard with the latest reaction times
}
