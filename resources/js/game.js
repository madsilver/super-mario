class Game {
    constructor() {
        this.mario = new Mario();

        this.enemies = [
            new Pipe(),
            new Koopa()
        ]

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
        this.enemies.forEach(enemie => enemie.stop());        
        clearInterval(this.thread);
    }

    hasTouched() {
        var touched = false;

        this.enemies.forEach((enemie) => {
            if (enemie.scoreZone()) {
                touched = this.mario.getJumpHeight() <= enemie.getHeight();
            }
        });

        return touched;

        
    }

    start() {
        console.log('game start...');
        this.mario.reset();

        this.enemies.forEach(enemie => enemie.move());

        this.thread = setInterval(() => {
            if (this.hasTouched()) {
                this.endGame();
            }
        }, 10);
    }
}