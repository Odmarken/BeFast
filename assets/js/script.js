function getRandomColor() {
    let letters = "0123456789ABCDEF".split('');
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

let clickedTime;
let createdTime;
let reactionTime;

function makeBox() {
    let time = Math.random();
    time = time * 1000;

    setTimeout(function () {
        if (Math.random() > 0.5) {
            document.getElementById("box").style.borderRadius = "100px";
        } else {
            document.getElementById("box").style.borderRadius = "0";
        }

        let top = Math.random();
        top = top * 700;
        let left = Math.random();
        left = left * 700; /

        document.getElementById("box").style.top = top + "px";
        document.getElementById("box").style.left = left + "px";
        document.getElementById("box").style.backgroundColor = getRandomColor();
        document.getElementById("box").style.display = "block";

        createdTime = Date.now();
    }, time);
}

document.getElementById("box").onclick = function () {
    clickedTime = Date.now();

    reactionTime = (clickedTime - createdTime) / 1000;

    document.getElementById("printReactionTime").innerHTML = "You can do better!: " + reactionTime + " seconds";

    this.style.display = "none";

    makeBox();
}

makeBox();