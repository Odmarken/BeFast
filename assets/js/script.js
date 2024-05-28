/**
 * Generates a random hex color.
 * @returns {string} - The random color in hex format.
 */
function getRandomColor() {
    let letters = "0123456789ABCDEF".split('');
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

// Variables to track timing for reaction
let clickedTime;
let createdTime;
let reactionTime;

/**
 * Creates a box at a random position on the screen after a random delay.
 * The box can be either a circle or a square and will have a random background color.
 */
function makeBox() {
    let time = Math.random() * 1000; // Random delay time up to 1000ms

    setTimeout(function () {
        // Randomly decide if the box should be a circle or a square
        if (Math.random() > 0.5) {
            document.getElementById("box").style.borderRadius = "100px";
        } else {
            document.getElementById("box").style.borderRadius = "0";
        }

        // Randomize the position of the box
        let top = Math.random() * 250;
        let left = Math.random() * 300;

        document.getElementById("box").style.top = top + "px";
        document.getElementById("box").style.left = left + "px";
        document.getElementById("box").style.backgroundColor = getRandomColor();
        document.getElementById("box").style.display = "block";

        // Record the time the box was created
        createdTime = Date.now();
    }, time);
}

/**
 * Calculates and displays the user's reaction time.
 * Hides the box and creates a new one.
 */
document.getElementById("box").onclick = function () {
    clickedTime = Date.now(); // Record the time the box was clicked

    reactionTime = (clickedTime - createdTime) / 1000; // Calculate reaction time in seconds

    document.getElementById("printReactionTime").innerHTML = "You can do better!: " + reactionTime + " seconds";

    this.style.display = "none"; // Hide the box

    makeBox(); // Create a new box
}

// Initialize the first box
makeBox();