/*--- Colour Function ---- */
function getRandomColor() {
    let letters = "0123456789ABCDEF".split('');
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

/*--- Global variables for reaction timer ---- */
let clickedTime;
let createdTime;
let reactionTime;

/*--- Function to create and position the box within the centerBox --- */
function makeBox() {
    let time = Math.random() * 2000;  

    setTimeout(function () {
        const box = document.getElementById("box");
        const centerBox = document.getElementById("centerBox");

        
        const maxTop = centerBox.clientHeight - box.clientHeight;
        const maxLeft = centerBox.clientWidth - box.clientWidth;

     
        box.style.top = Math.random() * maxTop + "px";
        box.style.left = Math.random() * maxLeft + "px";
        box.style.backgroundColor = getRandomColor();  
        box.style.display = "block";  

        
        if (Math.random() > 0.5) {
            box.style.borderRadius = "100px";  
        } else {
            box.style.borderRadius = "0"; 
        }

        createdTime = Date.now();
    }, time);
}

/*--- Reaction timer setup --- */
document.getElementById("box").onclick = function () {
    clickedTime = Date.now();
    reactionTime = (clickedTime - createdTime) / 1000;  
    document.getElementById("printReactionTime").innerHTML = "You can do better!: " + reactionTime + " seconds";
    this.style.display = "none";  
    makeBox();  
}

makeBox();  

/*---- Rules display and hide mechanics -----*/
document.addEventListener('DOMContentLoaded', function() {
    var rules = document.getElementById('Rules');
    rules.style.display = 'block'; 

    rules.addEventListener('click', function() {
        rules.style.display = 'none';  
    });
});
