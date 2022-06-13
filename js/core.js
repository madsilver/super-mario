class Core {
    constructor(name, img) {
        this.name = name;
        this.img = img;

        this.create();
    }

    addClass(clazz) { 
        this.elem.classList.add(clazz); 
    }

    removeClass(clazz) { 
        this.elem.classList.remove(clazz); 
    }
    
    getHeight() {
        return this.elem.height;
    }

    fromLeft() {
        return this.elem.offsetLeft;
    }

    scoreZone() {
        const fromLeft = this.fromLeft();
        return fromLeft > 0 && fromLeft <= this.elem.width;
    }

    move() {
        this.elem.style.left = null;

        const ms = Math.floor((Math.random() * 5) +1) * 1000;

        setTimeout(() => { 
            this.addClass(`${this.name}-move`);
        }, ms);
        
    }

    stop() {
        const position = this.fromLeft();
        this.elem.style.left = `${position}px`;
        this.removeClass(`${this.name}-move`);
    }

    create() {
        this.elem = document.createElement('img');
        this.elem.id = this.name;
        this.elem.src = `./images/${this.img}`;
        this.addClass(this.name);

        const gameBoard = document.querySelector('.game-board');
        gameBoard.appendChild(this.elem);

    }
}