class Mario extends Player {
    constructor() {
        const img = {
            idle: `./mario-walk.gif`, 
            walk: `./mario-walk.gif`,
            jump: `./mario-jump.gif`,
            die: `./mario-die.png`
        };
        super('mario', img);
    }
}