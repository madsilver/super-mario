const WALK_IMG = './modules/mario/walk.gif';
const FLY_IMG = './modules/mario/fly.gif';
const DIE_IMG = './modules/mario/die.png';

class Mario {
    constructor() {
        this.elem = document.querySelector('#mario');
        this.died = false;

        window.addEventListener('keydown', (e) => {
            if (e.key == "ArrowUp") {
                this.jump();
            }
        });
    }

    addClass(clazz) { this.elem.classList.add(clazz); }
    removeClass(clazz) { this.elem.classList.remove(clazz); }
    setImage(img) { this.elem.src = img; }

    getJumpHeight() {
        return +window.getComputedStyle(this.elem).bottom.replace('px','');
    }

    walk() {
        this.removeClass('die');
        this.addClass('walk');
        this.setImage(WALK_IMG);
    }

    jump() {
        if (this.died) return;
        this.addClass('jump');
        this.setImage(FLY_IMG);
        setTimeout(() => {
            if (this.died) return;
            this.removeClass('jump');
            this.setImage(WALK_IMG);
        }, 500);
    }

    die() {
        this.died = true;
        this.addClass('die');
        this.setImage(DIE_IMG);
        const jumpHeight = this.getJumpHeight();
        this.elem.style.bottom = `${jumpHeight}px`;
        this.removeClass('jump');
    }

    reset() {
        this.died = false;
        this.elem.style.bottom = '0px';
        this.walk();
    }
}