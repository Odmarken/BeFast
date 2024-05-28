/*--- Function to Generate a Random Color ---- */

/**
 * Generates a random hexadecimal color code.
 * @returns {string} A random color in the format "#RRGGBB".
 */
function getRandomColor() {
    let letters = "0123456789ABCDEF".split('');
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

/*----- Variables for Reaction Timer ---- */

// Timestamp when the box was clicked
let clickedTime;
// Timestamp when the box was created
let createdTime;
// Time taken by the user to click the box (in seconds)
let reactionTime;

/*--- Function to Create and Display a Box with Random Position and Color --- */

/**
 * Creates a box with random position, shape, and color, then displays it on the screen
 * after a random delay.
 */
function makeBox() {
    // Generate a random time delay between 0 and 1000 milliseconds
    let time = Math.random();
    time = time * 1000;

    // Set a timeout to display the box after the random delay
    setTimeout(function () {
        // Randomly decide if the box should be circular or square
        if (Math.random() > 0.5) {
            document.getElementById("box").style.borderRadius = "100px"; // Circular
        } else {
            document.getElementById("box").style.borderRadius = "0"; // Square
        }

        // Generate random top and left positions for the box
        let top = Math.random() * 250;
        let left = Math.random() * 300;

        // Set the box's position and background color
        document.getElementById("box").style.top = top + "px";
        document.getElementById("box").style.left = left + "px";
        document.getElementById("box").style.backgroundColor = getRandomColor();
        document.getElementById("box").style.display = "block";

        // Record the time when the box was created
        createdTime = Date.now();
    }, time);
}

/*--- Event Listener for Box Clicks to Measure Reaction Time --- */

/**
 * Event listener for clicks on the box element.
 * Calculates the reaction time and displays it, then hides the box and creates a new one.
 */
document.getElementById("box").onclick = function () {
    // Record the time when the box was clicked
    clickedTime = Date.now();

    // Calculate the reaction time in seconds
    reactionTime = (clickedTime - createdTime) / 1000;

    // Display the reaction time to the user
    document.getElementById("printReactionTime").innerHTML = "You can do better!: " + reactionTime + " seconds";

    // Hide the box
    this.style.display = "none";

    // Create a new box
    makeBox();
}

// Initialize the first box
makeBox();

/*---- Rules Hidden Timer (Not implemented) -----*/
