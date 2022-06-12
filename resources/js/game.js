class Game {
    constructor() {
        this.enemies = [
            new Pipe(),
            new Pipe(),
            new Koopa()
        ]

        this.mario = new Mario();

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
        this.mario.reboot();

        this.enemies.forEach(enemie => enemie.move());

        const loop = setInterval(() => {
            if (this.hasTouched()) {
                this.endGame();
                clearInterval(loop);
            }
        }, 10);
    }
}