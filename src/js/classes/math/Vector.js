export default class Vector {
    constructor(x = 0, y = 0) {
        this.x = x,
        this.y = y
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(posX) {
        this.x = posX;
    }

    setY(posY) {
        this.y = posY;
    }
}