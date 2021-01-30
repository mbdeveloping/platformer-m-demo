import Vector from './math/Vector';
import { controller } from '../../index';

export default class Character {
    constructor(posX, posY) {
        this.type = 'NPC',
        this.width = 12,
        this.height = 12,
        this.position = new Vector(posX, posY),
        this.renderPosition = this.position,
        this.velocity = new Vector(),
        this.acceleration = new Vector(),
        this.velocityMax = { x: 2, y: 10 },
        this.speed = .3,
        this.state = 'idleRight', //states: idleRight, idleLeft, moveRight, moveLeft, jumpRight, jumpLeft, attackRight, attackLeft, hurt
        this.jumpDistance = 6,
        this.isGrounded = false,
        this.controller = controller
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

    moveLeft(step) {
        this.state = 'moveLeft';
        // this.velocity.setX(-this.speed);
        this.velocity.x -= this.speed;
    }

    moveRight(step) {
        this.state = 'moveRight';
        // this.velocity.setX(this.speed);
        this.velocity.x += this.speed;
    }

    // Temp

    moveUp() {
        // this.velocity.setY(-this.speed);
        this.velocity.y -= this.speed;
    }

    moveDown() {
        // this.velocity.setY(this.speed);
        this.velocity.y += this.speed;
    }

    stop() {
        // if (this.state === 'moveRight' || this.state === 'idleRight') {
        //     this.state = 'idleRight';
        // }

        // if (this.state === 'moveLeft' || this.state === 'idleLeft') {
        //     this.state = 'idleLeft';
        // }
        
        this.velocity.setX(0);
        // this.velocity.setY(0);
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

    playerMovementChecks(step) {
        if (this.controller.left.active) {
            this.moveLeft(step);
        } else if (this.controller.right.active) {
            this.moveRight(step);
        } else if (this.controller.up.active) {
            this.moveUp();
        } else if (this.controller.down.active) {
            this.moveDown();
        } else {
            this.stop();
        }

        if (this.controller.jump.active) {
            this.jump();
        }
    }

    update(step) {
        // this.velocity.x = 0;
        // this.velocity.y = 0;
        // update position

        this.playerMovementChecks(step);
        // this.velocity.y += 1;

        this.position.x += this.velocity.x * step;
        this.position.y += this.velocity.y * step;

        // Clamp velocity
        if (this.velocity.y > this.velocityMax.y) this.velocity.y = this.velocityMax.y;
        if (this.velocity.y < -this.velocityMax.y) this.velocity.y = -this.velocityMax.y;
        if (this.velocity.x > this.velocityMax.x) this.velocity.x = this.velocityMax.x;
        if (this.velocity.x < -this.velocityMax.x) this.velocity.x = -this.velocityMax.x;

        // console.log(this.velocity.y);
        
    }

    render(context, offsetX, offsetY) {
        context.fillStyle = 'red';
        context.fillRect((Math.round(this.position.x) - offsetX), (Math.round(this.position.y) - offsetY), this.width, this.height);
    }
}