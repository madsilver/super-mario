class Player extends Core {
    constructor(name, img) {
        super(name, `/${name}/${img}`);

        this.died = false;
        this.scoreZone = false;
        this.img = {
            walk: `./images/${name}/walk.gif`,
            jump: `./images/${name}/jump.gif`,
            die: `./images/${name}/die.png`
        };

        window.addEventListener('keydown', (e) => {
            if (e.key == "ArrowUp") {
                this.jump();
            }
            if (e.key == "ArrowRight") {
                this.playerMove(true);
            }
            if (e.key == "ArrowLeft") {
                this.playerMove(false);
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
        this.setImage(this.img.walk);
    }

    playerMove(dir) {
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
        this.setImage(this.img.jump);
        setTimeout(() => {
            if (this.died) return;
            this.removeClass('jump');
            this.setImage(this.img.walk);
            this.emitArrivedEvent();
        }, 500);
    }

    die() {
        this.died = true;
        this.addClass('die');
        this.setImage(this.img.die);
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
        event.initEvent('player-arrived', true, true);
        window.dispatchEvent(event);
    }

    setScoreZone(val) {
        this.scoreZone = val;
    }

    isScoreZone() {
        return this.scoreZone;
    }
}