import Vector from './math/Vector';

export default class Camera {
    constructor(x, y, width, height, world) {
        this.position = new Vector(x, y),
        this.velocity = new Vector(),
        this.width = width,
        this.height = height,
        this.world = world,
        this.xMin = null,
        this.yMin = null,
        this.xMax = null,
        this.yMax = null
    }

    follow(x, y) {
        this.position.x = x - this.width * 0.5;
        this.position.y = y - this.height * 0.5;
    }

    update() {
        this.xMin = Math.floor(this.position.x / this.world.tileSize);
        this.yMin = Math.floor(this.position.y / this.world.tileSize);
        this.xMax = Math.ceil((this.position.x + this.width) / this.world.tileSize);
        this.yMax = Math.ceil((this.position.y + this.height) / this.world.tileSize);

        // this.position.x += 1;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    render(context) {
        
    }
}