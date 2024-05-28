/**
 * Generates a random hex color code.
 *
 * @returns {string} - A random hex color code.
 */
function generateRandomColor() {
    const hexDigits = "0123456789ABCDEF".split(''); // Split hex digits into an array
    let color = "#"; // Initialize color with '#'
    for (let i = 0; i < 6; i++) {
        color += hexDigits[Math.floor(Math.random() * 16)]; // Append a random hex digit 6 times
    }
    return color; // Return the generated color
}

// Declare variables to store time values
let startTime, endTime, responseTime;

/**
 * Displays a box at a random position on the screen after a random delay.
 */
function displayBox() {
    const delay = Math.random() * 3000; // Generate a random delay up to 3000 milliseconds (3 seconds)

    setTimeout(() => {
        const box = document.getElementById("box"); // Get the box element

        // Randomly set the border radius to create a circle or square
        box.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
        // Set the box's top and left position to random values within the window's dimensions
        box.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
        box.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
        // Set a random background color for the box
        box.style.backgroundColor = generateRandomColor();
        box.style.display = "block"; // Display the box

        startTime = Date.now(); // Record the time when the box is displayed
    }, delay); // Execute after the random delay
}

/**
 * Handles the click event on the box element, calculates reaction time,
 * displays the reaction time, hides the box, and calls displayBox() to display a new box.
 */
document.getElementById("box").addEventListener("click", function() {
    endTime = Date.now(); // Record the time when the box is clicked
    responseTime = (endTime - startTime) / 1000; // Calculate the reaction time in seconds

    // Display the reaction time
    document.getElementById("reactionTimeDisplay").innerText = `Reaction Time: ${responseTime} seconds`;

    this.style.display = "none"; // Hide the box

    displayBox(); // Call the function to display a new box
});

// Initial call to display the box when the script runs
displayBox();