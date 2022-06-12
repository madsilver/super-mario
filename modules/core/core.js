class Core {
    constructor(name) {
        this.elem = document.querySelector(`#${name}`);
        this.name = name;
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
        this.addClass(`${this.name}-move`);
    }

    stop() {
        const position = this.fromLeft();
        this.elem.style.left = `${position}px`;
        this.removeClass(`${this.name}-move`);
    }
}