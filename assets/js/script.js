/*--- Function to Generate a Random Color ---- */

/**
 * Creates a random hex color code.
 * @returns {string} A hex color in the format "#RRGGBB".
 */
function generateRandomColor() {
    const hexChars = "0123456789ABCDEF".split('');
    let colorCode = "#";
    for (let i = 0; i < 6; i++) {
        colorCode += hexChars[Math.floor(Math.random() * 16)];
    }
    return colorCode;
}

/*----- Variables for Reaction Timer ---- */

// Time when the user clicks the box
let clickTimestamp;
// Time when the box is displayed
let displayTimestamp;
// User's reaction time in seconds
let userReactionTime;

/*--- Function to Create and Display a Box with Random Position and Color --- */

/**
 * Displays a box with a random position, shape, and color on the screen after a random delay.
 */
function createRandomBox() {
    // Time delay in milliseconds before displaying the box
    const delay = Math.random() * 1000;

    setTimeout(() => {
        // Determine box shape: circle or square
        document.getElementById("box").style.borderRadius = Math.random() > 0.5 ? "100px" : "0";

        // Set random positions for the box
        const topPosition = Math.random() * 125;
        const leftPosition = Math.random() * 125;

        // Apply the position and random color to the box
        document.getElementById("box").style.top = topPosition + "px";
        document.getElementById("box").style.left = leftPosition + "px";
        document.getElementById("box").style.backgroundColor = generateRandomColor();
        document.getElementById("box").style.display = "block";

        // Record the time when the box is shown
        displayTimestamp = Date.now();
    }, delay);
}

/*--- Event Listener for Box Clicks to Measure Reaction Time --- */

/**
 * Handles the click event on the box element.
 * Calculates the reaction time and displays it, then hides the box and creates a new one.
 */
document.getElementById("box").addEventListener("click", function () {
    // Record the click time
    clickTimestamp = Date.now();

    // Compute the reaction time in seconds
    userReactionTime = (clickTimestamp - displayTimestamp) / 1000;

    // Display the reaction time to the user
    document.getElementById("printReactionTime").textContent = `You can do better!: ${userReactionTime} seconds`;

    // Hide the box
    this.style.display = "none";

    // Create a new box
    createRandomBox();
});

// Display the initial box
createRandomBox();

/*---- Hidden Timer Rules (Not implemented) -----*/
