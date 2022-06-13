class Core {
    constructor(name, img) {
        this.name = name;
        this.img = img;

        this.create();
    }

    addClass(clazz) { 
        const elemClass = `${this.name}-${clazz}`;
        this.elem.classList.add(elemClass); 
    }

    removeClass(clazz) { 
        const elemClass = `${this.name}-${clazz}`;
        this.elem.classList.remove(elemClass); 
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
            this.addClass('move');
        }, ms);
    }

    stop() {
        const position = this.fromLeft();
        this.elem.style.left = `${position}px`;
        this.removeClass('move');
    }

    create() {
        this.elem = document.createElement('img');
        this.elem.id = this.name;
        this.elem.src = `./images/${this.img}`;
        this.addClass('idle');

        const gameBoard = document.querySelector('.game-board');
        gameBoard.appendChild(this.elem);

    }
}