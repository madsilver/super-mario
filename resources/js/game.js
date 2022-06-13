class Game {
    constructor() {
        this.enemies = [
            new Pipe(),
            new Pipe(),
            new Koopa()
        ];

        this.mario = new Mario();

        window.addEventListener('keypress', (e) => {
            if (e.key == "Enter") {
                e.preventDefault();
                this.start();
            }
        });

        window.addEventListener('mario-arrived', () => {
            if (this.mario.isScoreZone()) {
                this.scoreInc();
            }
            this.mario.setScoreZone(false);
        });

        this.score = document.querySelector('.score');
    }

    endGame() {
        this.mario.die();
        this.enemies.forEach(enemie => enemie.stop());        
    }

    hasTouched() {
        var touched = false;

        this.enemies.forEach((enemie) => {           
            if (enemie.scoreZone()) {
                this.mario.setScoreZone(true);
                touched = this.mario.getJumpHeight() <= enemie.getHeight();
            }
        });

        return touched;
    }

    start() {
        this.mario.reboot();
        this.score.innerHTML = 0;
        this.enemies.forEach(enemie => enemie.move());

        const loop = setInterval(() => {
            if (this.hasTouched()) {
                this.endGame();
                clearInterval(loop);
            }
        }, 10);
    }

    scoreInc() {
        var val = +this.score.innerHTML;
        this.score.innerHTML = ++val;
    }
}