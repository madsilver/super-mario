class Game {
    constructor() {
        this.pipe = new Pipe();
        this.mario = new Mario();
        this.koopa = new Koopa();

        this.thread = null;

        window.addEventListener('keypress', (e) => {
            if (e.key == "Enter") {
                e.preventDefault();
                this.start();
            }
        });
    }

    endGame() {
        this.mario.die();
        this.pipe.stop();
        this.koopa.stop();
        
        clearInterval(this.thread);
    }

    touchedPipe() {
        if (this.pipe.scoreZone()) {
            return this.mario.getJumpHeight() <= this.pipe.getHeight();
        }

        if (this.koopa.scoreZone()) {
            return this.mario.getJumpHeight() <= this.koopa.getHeight();
        }

        return false;
    }

    start() {
        console.log('game start...');
        this.mario.reset();

        this.pipe.move();
        this.koopa.move();

        this.thread = setInterval(() => {
            if (this.touchedPipe()) {
                this.endGame();
            }
        }, 10);
    }
}