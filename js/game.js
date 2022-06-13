class Game {
    constructor() {
        this.enemies = [
            new Pipe(),
            new Pipe(),
            new Koopa()
        ];

        this.player = new Mario();

        window.addEventListener('keypress', (e) => {
            if (e.key == "Enter") {
                e.preventDefault();
                this.start();
            }
        });

        window.addEventListener('player-arrived', () => {
            if (this.player.isScoreZone()) {
                this.scoreInc();
            }
            this.player.setScoreZone(false);
        });

        this.score = document.querySelector('.score');
    }

    endGame() {
        this.player.die();
        this.enemies.forEach(enemie => enemie.stop());        
    }

    hasTouched() {
        var touched = false;

        this.enemies.forEach((enemie) => {           
            if (enemie.scoreZone()) {
                this.player.setScoreZone(true);
                touched = this.player.getJumpHeight() <= enemie.getHeight();
            }
        });

        return touched;
    }

    start() {
        this.player.reboot();
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