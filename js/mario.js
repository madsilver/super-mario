const WALK_IMG = './images/mario/walk.gif';
const FLY_IMG = './images/mario/fly.gif';
const DIE_IMG = './images/mario/die.png';

class Mario extends Core {
    constructor() {
        super('mario', '/mario/walk.gif');

        this.died = false;
        this.scoreZone = false;

        window.addEventListener('keydown', (e) => {
            if (e.key == "ArrowUp") {
                this.jump();
            }
            if (e.key == "ArrowRight") {
                this.move(true);
            }
            if (e.key == "ArrowLeft") {
                this.move(false);
            }
        });
    }

    setImage(img) { this.elem.src = img; }

    getJumpHeight() {
        return +window.getComputedStyle(this.elem).bottom.replace('px','');
    }

    walk() {
        this.removeClass('die');
        this.addClass('walk');
        this.setImage(WALK_IMG);
    }

    move(dir) {
        if (this.elem.style.left == '') {
            this.elem.style.left = '10px';
            return;
        }

        var val = this.elem.style.left.replace('px','');
        if (dir) {
            val = +val + 10;
        } else {
            val = +val - 10;
        }
        this.elem.style.left = `${val}px`;
    }

    jump() {
        if (this.died) return;
        this.addClass('jump');
        this.setImage(FLY_IMG);
        setTimeout(() => {
            if (this.died) return;
            this.removeClass('jump');
            this.setImage(WALK_IMG);
            this.emitArrivedEvent();
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

    reboot() {
        this.died = false;
        this.elem.style.bottom = '0px';
        this.walk();
    }

    emitArrivedEvent() {
        const event = document.createEvent('Event');
        event.initEvent('mario-arrived', true, true);
        window.dispatchEvent(event);
    }

    setScoreZone(val) {
        this.scoreZone = val;
    }

    isScoreZone() {
        return this.scoreZone;
    }
}