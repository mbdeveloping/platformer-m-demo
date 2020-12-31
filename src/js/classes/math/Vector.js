export default class Vector {
    constructor(x = 0, y = 0) {
        this.x = x,
        this.y = y
    }

    get getX() {
        return this.x;
    }

    get getY() {
        return this.y;
    }

    setX(posX) {
        this.x = posX;
    }

    setY(posY) {
        this.y = posY;
    }
}