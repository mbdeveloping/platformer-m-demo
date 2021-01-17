import World from './World';
import Player from './Player';
import Camera from './Camera';

export default class Game {
    constructor(display, controller) {
        this.display = display,
        this.controller = controller,
        // this.player = new Player(0, 0),
        this.worlds = [
            new World('Earth'),
        ],
        this.activeWorldIndex = 0,
        this.activeWorld = this.worlds[this.activeWorldIndex],
        this.init()
    }

    resize() {
        // resize browser screen/canvas
        let height = document.documentElement.clientHeight;
        let width  = document.documentElement.clientWidth;
        const displayCanvas = this.display.el;

        if (width / height < this.display.ratio) {
            height = Math.floor(width / this.display.ratio);
        } else {
            width = Math.floor(height * this.display.ratio);
        }

        displayCanvas.style.height = height + 'px';
        displayCanvas.style.width = width + 'px';
    }

    init() {
        const displayCanvas = this.display.el;
        const displayContext = this.display.context;

        displayCanvas.width = this.display.width;
        displayCanvas.height = this.display.height;
        displayContext.imageSmoothingEnabled = false;

        this.resize();
    }
    
    playerMovementChecks() {
        if (this.controller.left.active) {
            this.activeWorld.player.moveLeft();
        } else if (this.controller.right.active) {
            this.activeWorld.player.moveRight();
        } else if (this.controller.up.active) {
            this.activeWorld.player.moveUp();
        } else if (this.controller.down.active) {
            this.activeWorld.player.moveDown();
        } else {
            this.activeWorld.player.stop();
        }

        if (this.controller.jump.active) {
            this.activeWorld.player.jump();
        }
    }

    update(step, time) {
        this.playerMovementChecks();
        this.activeWorld.update(step, time);
    }

    render() {
        const displayContext = this.display.context;

        this.activeWorld.render(displayContext);
    }
}