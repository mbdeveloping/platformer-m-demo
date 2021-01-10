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

    follow(obj) {
        if (obj.position.x > ((this.width * 0.5)) && this.position.x >= 0) {
            obj.position.x = this.width / 2;
            this.position.x += obj.velocity.x;

            // console.log('tt');
        }

        // console.log(obj.velocity.x);
    }

    update() {
        this.xMin = Math.floor(this.position.x / this.world.tileSize);
        this.yMin = Math.floor(this.position.y / this.world.tileSize);
        this.xMax = Math.ceil((this.position.x + this.width) / this.world.tileSize);
        this.yMax = Math.ceil((this.position.y + this.height) / this.world.tileSize);

        // this.position.x += 1;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // if (this.position.x < 0) {
        //     this.position.x = 0;
        // }

        // console.log(this.position.x);
    }

    render(context) {
        
    }
}