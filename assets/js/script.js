const startButton = document.getElementById('startButton');
const dot = document.getElementById('dot');
const instructions = document.getElementById('instructions');
const leaderboard = document.getElementById('leaderboard');
const reactionTimesList = document.getElementById('reactionTimes');

let timer;
let reactionStart;
let reactionTimes = []; // Store reaction times

window.onload = function () {
    startButton.style.display = 'block'; // Show start button
    instructions.style.display = 'block'; // Show instructions initially
    leaderboard.style.display = 'block'; // Show leaderboard initially
    displayLeaderboard(); // Display leaderboard when page loads
};

startButton.addEventListener('click', function () {
    startButton.style.display = 'none'; // Hide start button
    instructions.style.display = 'none'; // Hide instructions
    leaderboard.style.display = 'none'; // Hide leaderboard
    startGame();
});

function startGame() {
    const minTime = 1000; // minimum time in milliseconds
    const maxTime = 5000; // maximum time in milliseconds
    const randomTime = Math.floor(Math.random() * (maxTime - minTime)) + minTime; // Random time between min and max

    timer = setTimeout(() => {
        showDot();
        reactionStart = new Date().getTime(); // Record the time when the dot appears
    }, randomTime);
}

function showDot() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const randomX = Math.floor(Math.random() * (screenWidth - 30)); // Subtract 30 to account for dot size
    const randomY = Math.floor(Math.random() * (screenHeight - 30));

    dot.style.left = `${randomX}px`;
    dot.style.top = `${randomY}px`;
    dot.style.display = 'block'; // Show the dot

    dot.addEventListener('click', registerReaction); // Register the click
}

function registerReaction() {
    const reactionEnd = new Date().getTime(); // Record the time when the dot is clicked
    const reactionTime = reactionEnd - reactionStart; // Calculate reaction time
    dot.style.display = 'none'; // Hide the dot

    alert(`You clicked the dot! Reaction time: ${reactionTime} ms`);
    reactionTimes.push(reactionTime); // Add reaction time to array
    saveReactionTimes(); // Save the reaction time in session storage
    resetGame(); // Reset the game
}

function saveReactionTimes() {
    sessionStorage.setItem('reactionTimes', JSON.stringify(reactionTimes)); // Save reaction times in session storage
}

function displayLeaderboard() {
    reactionTimesList.innerHTML = ''; // Clear the list

    const savedTimes = sessionStorage.getItem('reactionTimes'); // Get saved reaction times
    if (savedTimes) {
        reactionTimes = JSON.parse(savedTimes); // Parse saved reaction times
    }

    reactionTimes.forEach((time, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `#${index + 1}: ${time} ms`;
        reactionTimesList.appendChild(listItem);
    });
}

function resetGame() {
    clearTimeout(timer);
    startButton.style.display = 'block'; // Show start button again for replay
    instructions.style.display = 'block'; // Show instructions again after the game ends
    leaderboard.style.display = 'block'; // Show leaderboard again after the game ends
    displayLeaderboard(); // Refresh the leaderboard with the latest times
}
