class Pipe {
    constructor() {
        this.elem = document.querySelector('#pipe');
    }

    addClass(clazz) { this.elem.classList.add(clazz); }
    removeClass(clazz) { this.elem.classList.remove(clazz); }

    getPosition() {
        return this.elem.offsetLeft;
    }

    getHeight() {
        return this.elem.height;
    }

    scoreZone() {
        const elemWidth = this.elem.width;
        const left = this.elem.offsetLeft;
        return left > 0 && left <= elemWidth;
    }

    move() {
        this.elem.style.left = null;
        this.addClass('pipe-move');
    }

    stop() {
        const position = this.getPosition();
        this.elem.style.left = `${position}px`;
        this.removeClass('pipe-move');
    }
}