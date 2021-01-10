import World from './World';
import Player from './Player';
import Camera from './Camera';

export default class Game {
    constructor(display, controller) {
        this.display = display,
        this.controller = controller,
        this.player = new Player(0, 0),
        this.worlds = [
            new World('Earth'),
        ],
        this.activeWorldIndex = 0,
        this.activeWorld = this.worlds[this.activeWorldIndex],
        this.camera = new Camera(0, 0, this.display.width, this.display.height, this.activeWorld),
        this.init()
    }

    // renderWorld(context) {
    //     const world = this.activeWorld;

    //     for (let y = this.camera.yMin; y < this.camera.yMax; y++) {
    //         for (let x = this.camera.xMin; x < this.camera.xMax; x++) {
    //             let renderX = (x * world.tileSize) - this.camera.position.x;
    //             let renderY = (y * world.tileSize) - this.camera.position.y;
    //             const tile = world.getTile(x, y);

    //             context.fillStyle = world.levels[world.activeLevelIndex].tiles[tile].color;
    //             context.fillRect(renderX, renderY, world.tileSize, world.tileSize);
    //         }
    //     }
    // }


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

        this.activeWorld.addPlayer(this.player);
        this.activeWorld.addCamera(this.camera);

        this.resize();
    }
    
    playerMovementChecks() {
        if (this.controller.left.active) {
            this.activeWorld.player.moveLeft();
        } else if (this.controller.right.active) {
            this.activeWorld.player.moveRight();
        } else {
            this.activeWorld.player.stop();
        }

        if (this.controller.jump.active) {
            this.activeWorld.player.jump();
        }
    }

    update(step, time) {
        this.playerMovementChecks();
        this.activeWorld.update();
    }

    render() {
        const displayContext = this.display.context;

        this.activeWorld.render(displayContext);
    }
}