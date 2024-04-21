/*--- Colour Function ---- */

function getRandomColor() {
    let letters = "0123456789ABCDEF".split('');
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

/*----- Reaction Timer ---- */

let clickedTime;
let createdTime;
let reactionTime;

/*--- Scaling for how fast the boxes should appear and fitting them inside the centerBox --- */

function makeBox() {
    let time = Math.random();
    time = time * 2000;

    setTimeout(function () {
        let box = document.getElementById("box");
        let container = document.getElementById("centerBox"); // Ensure this element exists in your HTML

        // Update to the smaller size of the box
        box.style.width = "50px";
        box.style.height = "50px";

        if (Math.random() > 0.5) {
            box.style.borderRadius = "100px";
        } else {
            box.style.borderRadius = "0";
        }

        // Calculate position within the container bounds
        let maxWidth = container.clientWidth - box.clientWidth; // Use the actual width of the box
        let maxHeight = container.clientHeight - box.clientHeight; // Use the actual height of the box

        let top = Math.random() * maxHeight;
        let left = Math.random() * maxWidth;

        box.style.top = top + "px";
        box.style.left = left + "px";
        box.style.backgroundColor = getRandomColor();
        box.style.display = "block";

        createdTime = Date.now();
    }, time);
}

/*--- Reaction timer --- */
document.getElementById("box").onclick = function () {
    clickedTime = Date.now();

    reactionTime = (clickedTime - createdTime) / 1000;

    document.getElementById("printReactionTime").innerHTML = "You can do better!: " + reactionTime + " seconds";

    this.style.display = "none";

    makeBox();
}

makeBox(); // Initialize the box on page load


/*---- Rules hidden timer -----*/

document.addEventListener('DOMContentLoaded', function() {
    var rules = document.getElementById('Rules');
    rules.style.display = 'block'; // Show the rules

    setTimeout(function() {
        rules.style.display = 'none'; 
    }, 10000); 
});
