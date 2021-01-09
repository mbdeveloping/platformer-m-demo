import Vector from './math/Vector';

export default class Character {
    constructor() {
        this.type = 'NPC',
        this.width = 12,
        this.height = 12,
        this.position = new Vector(),
        this.velocity = new Vector(),
        this.acceleration = new Vector(),
        this.velocityMax = { x: 2, y: 5 },
        this.speed = 1,
        this.state = 'idleRight', //states: idleRight, idleLeft, moveRight, moveLeft, jumpRight, jumpLeft, attackRight, attackLeft, hurt
        this.jumpDistance = 13,
        this.health = 100,
        this.isGrounded = false
    }

    getLeft() { 
        return this.position.x;
    }

    getRight() {
        return this.position.x + this.width;
    }

    getTop() {
        return this.position.y;
    }

    getBottom() {
        return this.position.y + this.height;
    }

    moveLeft() {
        this.acceleration.setX(-this.speed);
    }

    moveRight() {
        // this.velocity.setX(this.speed);
        this.acceleration.setX(this.speed);
    }

    moveUp() {
        // this.velocity.setY(-this.speed);
        this.acceleration.setY(this.speed);
    }

    moveDown() {
        this.acceleration.setY(this.speed);
    }

    stop() {
        this.acceleration.setX(0);
        this.acceleration.setY(0);
    }

    jump() {
        if (this.isGrounded) {
            this.isGrounded = false;
            this.velocity.y -= this.jumpDistance;
            console.log('jumping!');
        }
        
    }

    attack() {
        console.log('attacking!');
    }

    update(gravity, friction) {
        // apply gravity
        this.velocity.y += gravity;

        // apply friction
        this.velocity.x *= friction;
        // this.velocity.y *= friction;

        // update velocity
        this.velocity.x += this.acceleration.x;
        // this.velocity.y += this.acceleration.y;

        if (Math.abs(this.velocity.x) > this.velocityMax.x)
        this.velocity.x = this.velocityMax.x * Math.sign(this.velocity.x);
    
        // if (Math.abs(this.velocity.y) > this.velocityMax.y)
        // this.velocity.y = this.velocityMax.y * Math.sign(this.velocity.y);

        // update position
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    render(context) {
        context.fillStyle = 'black';
        context.fillRect(Math.round(this.position.x), Math.round(this.position.y), this.width, this.height);
    }
}