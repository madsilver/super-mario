class Pipe {
    constructor() {
        this.elem = document.querySelector('#pipe');
    }

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
        this.elem.classList.add('pipe-move');
    }

    stop() {
        const position = this.getPosition();
        this.elem.style.left = `${position}px`;
        this.elem.classList.remove('pipe-move');
    }
}