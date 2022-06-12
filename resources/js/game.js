class Game {
    constructor() {
        this.pipe = new Pipe();
        this.mario = new Mario();
        this.thread = null;

        window.addEventListener('keypress', (e) => {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                this.start();
            }
        });
    }

    endGame() {
        this.mario.die();
        this.pipe.stop();
        
        clearInterval(this.thread);
        console.log(this.mario.getJumpHeight());
    }

    touchedPipe() {
        if (this.pipe.scoreZone()) {
            return this.mario.getJumpHeight() < this.pipe.getHeight();
        }
        return false;
    }

    start() {
        console.log('game start...');
        this.mario.reset();

        this.pipe.move();

        this.thread = setInterval(() => {
            if (this.touchedPipe()) {
                this.endGame();
            }
        }, 10);
    }
}