let running = false;
let lvl = 0;
let gameSeq = [];
let userSeq = [];
let btn_map = [document.getElementById("b1"), 
                document.getElementById("b2"), 
                document.getElementById("b3"), 
                document.getElementById("b4")];
let h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
    if (!running) {
        console.log("Game started");
        running = true;

        gameSeq = [];  // Reset sequence
        userSeq = [];
        lvl = 0;

        lvlup();
    }
});

function lvlup() {
    lvl++;
    h2.innerText = `Level ${lvl}`;

    userSeq = []; // Reset user input for new level

    // Show the previous sequence with delays
    gameSeq.forEach((btnIndex, i) => {
        setTimeout(() => {
            flashBtn(btn_map[btnIndex]);
        }, i * 600);
    });

    // Add a new random button to the sequence
    setTimeout(() => {
        let randomBtn = Math.floor(Math.random() * 4);
        flashBtn(btn_map[randomBtn]);
        gameSeq.push(randomBtn);
        console.log("Game Sequence:", gameSeq);
    }, gameSeq.length * 600 + 500);
}

// Function to flash a button
function flashBtn(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 500);
}

// Attach event listeners for user input (only once)
btn_map.forEach((btn, index) => {
    btn.addEventListener("click", () => addToSeq(index));
});

function addToSeq(index) {
    flashBtn(btn_map[index]);
    userSeq.push(index);
    console.log("User Sequence:", userSeq);

    // Check if the user sequence is correct so far
    if (userSeq[userSeq.length - 1] !== gameSeq[userSeq.length - 1]) {
        gameOver();
        return;
    }

    // If user completes the sequence, go to next level
    if (userSeq.length === gameSeq.length) {
        setTimeout(lvlup, 1000);
    }
}

function gameOver() {
    h2.innerText = "Game Over. Press any key to restart. \n Score : " + `${lvl-1}`;
    running = false;
}
