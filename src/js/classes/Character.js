import Vector from './math/Vector';

export default class Character {
    constructor(posX, posY) {
        this.type = 'NPC',
        this.width = 12,
        this.height = 12,
        this.position = new Vector(posX, posY),
        this.renderPosition = this.position,
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
        this.state = 'moveLeft';
        this.velocity.setX(-this.speed);
    }

    moveRight() {
        this.state = 'moveRight';
        this.velocity.setX(this.speed);
    }

    // Temp

    moveUp() {
        this.velocity.setY(-this.speed);
    }

    moveDown() {
        this.velocity.setY(this.speed);
    }

    stop() {
        if (this.state === 'moveRight' || this.state === 'idleRight') {
            this.state = 'idleRight';
        }

        if (this.state === 'moveLeft' || this.state === 'idleLeft') {
            this.state = 'idleLeft';
        }
        
        this.velocity.setX(0);
        this.velocity.setY(0);
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

    update(step, time) {
        // update position
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // console.log(this.position.x);
    }

    render(context, offsetX, offsetY) {
        context.fillStyle = 'red';
        context.fillRect((this.position.x - offsetX), (this.position.y - offsetY), this.width, this.height);
    }
}