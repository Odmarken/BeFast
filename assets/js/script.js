/*--- Colour Function ---- */
function getRandomColor() {
    let letters = "0123456789ABCDEF".split('');
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

/*----- Reaction Timer Variables ---- */
let clickedTime;
let createdTime;
let reactionTime;
let scores = []; 

/*--- Scaling for how fast the boxes should appear --- */
function makeBox() {
    let time = Math.random() * 1000; 

    setTimeout(function () {
        let box = document.getElementById("box");
        if (Math.random() > 0.5) {
            box.style.borderRadius = "100px"; 
        } else {
            box.style.borderRadius = "0"; 
        }

        let top = Math.random() * 250;
        let left = Math.random() * 300;

        box.style.top = top + "px";
        box.style.left = left + "px";
        box.style.backgroundColor = getRandomColor();
        box.style.display = "block";

        createdTime = Date.now();
    }, time);
}

/*--- Reaction timer and score display --- */
document.getElementById("box").onclick = function () {
    clickedTime = Date.now();
    reactionTime = (clickedTime - createdTime) / 1000;

    scores.push(reactionTime); 
    if (scores.length > 2) {
        scores.shift(); 
    }


    document.getElementById("printReactionTime").innerHTML = "Reaction Time: " + reactionTime + " seconds.";
    document.getElementById("scoreBoard").innerHTML = "Last two scores: " + scores.join(", ");

    this.style.display = "none";
    makeBox();
}

makeBox(); 
