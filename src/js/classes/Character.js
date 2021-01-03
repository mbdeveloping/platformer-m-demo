import Vector from './math/Vector';

export default class Character {
    constructor() {
        this.type = 'NPC',
        this.width = 12,
        this.height = 12,
        this.position = new Vector(),
        this.velocity = new Vector(),
        this.speed = 1,
        this.state = 'idleRight', //states: idleRight, idleLeft, moveRight, moveLeft, jumpRight, jumpLeft, attackRight, attackLeft, hurt
        this.jumpDistance = 20,
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
        this.velocity.setX(-this.speed);
    }

    moveRight() {
        this.velocity.setX(this.speed);
    }

    moveUp() {
        this.velocity.setY(-this.speed);
    }

    moveDown() {
        this.velocity.setY(this.speed);
    }

    jump() {
        console.log('jumping!');

        if (this.velocity.y === 0 && this.isGrounded) {
            this.isGrounded = false;
            this.velocity.setY(-this.jumpDistance);
        }
        
    }

    attack() {
        console.log('attacking!');
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    render(context) {
        context.fillStyle = 'black';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}