const startButton = document.getElementById('startButton');
const dot = document.getElementById('dot');

let timer;

window.onload = function () {
    startButton.style.display = 'block'; 
};

startButton.addEventListener('click', function () {
    startButton.style.display = 'none'; 
    startGame();
});

function startGame() {
    const minTime = 1000; 
    const maxTime = 5000; 
    const randomTime = Math.floor(Math.random() * (maxTime - minTime)) + minTime; 

    timer = setTimeout(() => {
        showDot();
    }, randomTime);
}

function showDot() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const randomX = Math.floor(Math.random() * (screenWidth - 30)); 
    const randomY = Math.floor(Math.random() * (screenHeight - 30));

    dot.style.left = `${randomX}px`;
    dot.style.top = `${randomY}px`;
    dot.style.display = 'block'; 

    dot.addEventListener('click', function () {
        dot.style.display = 'none'; 
        alert("You clicked the dot!"); 
        resetGame();
    });
}

function resetGame() {
    clearTimeout(timer);
    startButton.style.display = 'block'; 
}
