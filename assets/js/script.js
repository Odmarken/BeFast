const startButton = document.getElementById('startButton');
const dot = document.getElementById('dot');

let timer;

window.onload = function () {
    startButton.style.display = 'block'; // Show start button
};

startButton.addEventListener('click', function () {
    startButton.style.display = 'none'; // Hide start button
    startGame();
});

function startGame() {
    const minTime = 1000; // minimum time in milliseconds
    const maxTime = 5000; // maximum time in milliseconds
    const randomTime = Math.floor(Math.random() * (maxTime - minTime)) + minTime; // Random time between min and max

    timer = setTimeout(() => {
        showDot();
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

    dot.addEventListener('click', function () {
        dot.style.display = 'none'; // Hide the dot
        alert("You clicked the dot!"); // Show alert when the dot is clicked
        resetGame();
    });
}

function resetGame() {
    clearTimeout(timer);
    startButton.style.display = 'block'; // Show start button again for replay
}
