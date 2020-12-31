import Vector from './math/Vector';

export default class Character {
    constructor() {
        this.type = 'NPC',
        this.width = 12,
        this.height = 12,
        this.position = new Vector(),
        this.velocity = new Vector(),
        this.speed = 5,
        this.jumpDistance = 20,
        this.health = 100,
        this.isGrounded = false
    }

    get left() { 
        return this.position.x;
    }

    get right() {
        return this.position.x + this.width;
    }

    get top() {
        return this.position.y;
    }

    get bottom() {
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
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}