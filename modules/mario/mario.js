const WALK_IMG = './modules/mario/walk.gif';
const FLY_IMG = './modules/mario/fly.gif';
const DIE_IMG = './modules/mario/die.png';

class Mario {
    constructor() {
        this.elem = document.querySelector('#mario');
        this.loose = false;

        window.addEventListener('keydown', () =>  this.jump());
    }

    getJumpHeight() {
        return +window.getComputedStyle(this.elem).bottom.replace('px','');
    }

    jump() {
        this.elem.classList.add('jump');
        this.elem.src = FLY_IMG;
        setTimeout(() => {
            if (this.loose) return;
            this.elem.classList.remove('jump');
            this.elem.src = WALK_IMG;
        }, 500);
    }

    die() {
        this.loose = true;
        this.elem.classList.remove('jump');
        const jumpHeight = this.getJumpHeight();

        this.elem.style.bottom = `${jumpHeight}px`;
        this.elem.src = DIE_IMG;
        this.elem.style.width = '75px';
        this.elem.style.marginLeft = '50px';
    }

    reset() {
        this.loose = false;

        this.elem.classList.remove('jump');
        this.elem.style.width = '150px';
        this.elem.style.marginLeft = '0px';
        this.elem.style.bottom = '0px';
        this.elem.src = WALK_IMG;
    }
}