let score = 0;
let cross = true;
let gameIsOver = false;

const audio = new Audio('music.mp3');
const audiogo = new Audio('mario.mp3');

setTimeout(() => {
    audio.play().catch(err => console.warn("Autoplay failed:", err));
}, 2000);

document.onkeydown = function (e) {
    if (gameIsOver) return; // Prevent movement after game is over

    const chota = document.querySelector('.chota');

    switch (e.keyCode) {
        case 38: // Jump
            if (!chota.classList.contains('animatechota')) {
                chota.classList.add('animatechota');
                setTimeout(() => {
                    chota.classList.remove('animatechota');
                }, 700);
            }
            break;

        case 37: // Left
            {
                let left = parseInt(window.getComputedStyle(chota).getPropertyValue('left'));
                if (left > 0) chota.style.left = (left - 20) + 'px';
            }
            break;

        case 39: // Right
            {
                let left = parseInt(window.getComputedStyle(chota).getPropertyValue('left'));
                if (left < 800) chota.style.left = (left + 20) + 'px';
            }
            break;
    }
};

function mybutton() {
    location.reload();
}

const interval = setInterval(() => {
    if (gameIsOver) return;

    const chota = document.querySelector('.chota');
    const gameover = document.querySelector('.gameover');
    const obstacle = document.querySelector('.obstacle');
    const btns = document.querySelector('.btns');

    const cx = parseInt(window.getComputedStyle(chota).getPropertyValue('left'));
    const cy = parseInt(window.getComputedStyle(chota).getPropertyValue('top'));
    const ox = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    const oy = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));

    const offsetx = Math.abs(cx - ox);
    const offsety = Math.abs(cy - oy);

    if (offsetx < 190 && offsety < 185) {
        gameIsOver = true;
        gameover.style.visibility = 'visible';
        btns.style.visibility = 'visible';
        obstacle.classList.remove('obstacleani');
        audiogo.play();

        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);

    } else if (cross && offsetx < 200) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
    }
}, 100);

function updateScore(score) {
    const scorecount = document.getElementById("scorecount");
    scorecount.innerHTML = "Your score: " + score;
}