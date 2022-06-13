class Sonic extends Player {
    constructor() {
        const img = {
            idle: `./sonic-idle.gif`,
            walk: `./sonic-walk.gif`,
            jump: `./sonic-jump.gif`,
            die: `./sonic-die.png`
        };
        super('sonic', img);
    }
}