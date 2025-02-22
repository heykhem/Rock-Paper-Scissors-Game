let rhand = document.querySelector(".rimg");
let lhand = document.querySelector(".limg");
let resultText = document.querySelector("#result");
let para = document.querySelector(".para")
let p2choiceText = document.querySelector("#p2choice");
let limages = ["Assets/rock.png", "Assets/paper.png", "Assets/scissors.png",];
let rimages = ["Assets/Rrock.png", "Assets/Rpaper.png", "Assets/Rscissors.png",];

// let index = 0;
let cycleInterval;

var pressbutton = document.querySelectorAll(".btn");
pressbutton.forEach((element) => {
    element.addEventListener('click', (event) => {
        let btnIndex = Array.from(pressbutton).indexOf(event.currentTarget);
        playRound(btnIndex);
    })
})

function playRound(player1) {
    let choice = ["Rock", "Paper", "Scissors"];
    var player2;
    resultText.innerHTML = 'Opponent is thinking...';
    para.innerHTML = 'Opponent is choosing...';
    p2choiceText.text = '';
    var cstop = cycleImages();

    var finalRes = winCheck(player1, player2);

    setTimeout(() => {
        rhand.src = rimages[player1];
        clearInterval(cstop);

        player2 = pThink();
        para.innerHTML = `Opponent is choosing a ${choice[player2]}`
        let finalRes = winCheck(player1, player2);
        rhand.src = rimages[player1];
        resultText.innerHTML = `${finalRes}`
        p2choiceText.innerHTML = `${choice[player2]}`

        gsap.fromTo(
            rhand,
            {
                rotation: 45,
                opacity: 0,
            },
            {
                rotation: 0, duration: 0.5,
                opacity: 1,
                ease: "power1.inOut", transformOrigin: "right center"
            }
        );
        lhand.src = limages[player2]
    }, 2000)
}

function pThink() {
    var randomIndex = Math.floor(Math.random() * 3);
    lhand.src = limages[randomIndex];
    gsap.fromTo(
        lhand,
        { rotation: -45 },
        { rotation: 0, duration: 0.5, ease: "power1.inOut", transformOrigin: "left center" }
    );
    return randomIndex
}

function winCheck(x, y) {
    return x === y
        ? "It's Draw"
        : x === (y + 1) % 3
            ? "You Win"
            : "You Lose";
}

function cycleImages() {
    if (cycleInterval) clearInterval(cycleInterval);
    let index = 0;
    cycleInterval = setInterval(function () {
        gsap.fromTo(
            lhand,
            {
                rotation: -45,
                opacity: 0 // Start invisible 
            },
            {
                rotation: 0,
                opacity: 1, // Fade in
                duration: 0.3,
                transformOrigin: "left center"
            }
        );
        index = (index + 1) % limages.length;
        lhand.src = limages[index];
    }, 300);
    return cycleInterval;
}

// Sound to make choice
function playSound() {
    let audio = new Audio("Assets/Sounds/start.mp3");
    audio.play();
}
