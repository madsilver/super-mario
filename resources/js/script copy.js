const MARIO_IMG = './images/mario.gif';
const MARIO_FLY_IMG = './images/fly.gif';
const MARIO_LOOSE_IMG = './images/game-over.png';

const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const score = document.querySelector('.score');

const marioDown = () => {
    mario.classList.remove('jump');
    mario.setAttribute('data-jump', false);
    if (!isMarioLoosed()) mario.src = MARIO_IMG;
}

const isMarioLoosed = () => {
    return mario.getAttribute("data-loose") != "false";
}

const jump = () => {
    if (isMarioLoosed()) return;

    mario.src = MARIO_FLY_IMG;
    mario.classList.add('jump');
    mario.setAttribute('data-jump', true);
    
    setTimeout(scoreInc, 250);
    setTimeout(marioDown, 500);
}

const hasTouched = (marioPos) => {
    var hasTouched = isPipeRegion() && marioPos < 100;
    mario.setAttribute('data-loose', hasTouched);
    return hasTouched;
}

const isPipeRegion = () => {
    var isRegion = pipe.offsetLeft <= 120 && pipe.offsetLeft > 0;
    pipe.setAttribute("data-score", isRegion);
    console.log(pipe.getAttribute("data-score"));
    return isRegion;
}

const scoreInc = () => {
    var isJump = mario.getAttribute("data-jump") != "false";
    var isRegionScore = pipe.getAttribute("data-score") != "false";

    if (isJump && isRegionScore && !isMarioLoosed()) {
        var val = +score.innerHTML;
        score.innerHTML = ++val;
    }
}

const stopPipe = (pipePos) => {
    pipe.classList.remove('pipe-move');
    pipe.style.left = `${pipePos}px`;
}

const marioLoose = (marioPos) => {
    // mario.style.animation = 'none'; // stop animation
    mario.style.bottom = `${marioPos}px`;
    mario.src = MARIO_LOOSE_IMG;
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';
}

document.addEventListener('keydown', jump);

const loop = setInterval(() => {
    const pipePos = pipe.offsetLeft;
    const marioPos = +window.getComputedStyle(mario).bottom.replace('px','');

    if (hasTouched(marioPos)) {
        stopPipe(pipePos)
        marioLoose(marioPos)

        clearInterval(loop);
    }
}, 10);

const reset = () => {
    mario.setAttribute('data-loose', false);
    mario.classList.remove('jump');
    mario.style.width = '150px';
    mario.style.marginLeft = '0px';
    mario.src = MARIO_IMG;

    pipe.style.left = '';
    pipe.classList.add('pipe-move');

    score.innerHTML = '0';
}

const initPipe = () => {
    pipe.style.left = '';
    pipe.classList.add('pipe-move');
}

const start = () => {
    initPipe();
    // window.location.reload();  
    
    // reset();
} 