import World from './World';
import Player from './Player';
import Camera from './Camera';

export default class Game {
    constructor(display) {
        this.display = display,
        this.worlds = [
            new World('Earth'),
        ],
        this.activeWorldIndex = 0,
        this.camera = new Camera(0, 0, this.display.width, this.display.height, this.worlds[this.activeWorldIndex]),
        this.player = new Player(),
        this.init()
    }

    renderLevel(context) {
        const world = this.worlds[this.activeWorldIndex];

        for (let y = this.camera.yMin; y < this.camera.yMax; y++) {
            for (let x = this.camera.xMin; x < this.camera.xMax; x++) {
                let renderX = (x * world.tileSize) - this.camera.position.x;
                let renderY = (y * world.tileSize) - this.camera.position.y;
                const tile = world.getTile(x, y);

                context.fillStyle = world.levels[world.activeLevelIndex].tiles[tile].color;
                context.fillRect(renderX, renderY, world.tileSize, world.tileSize);
            }
        }
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

    update() {
        // this.player.moveRight();
        this.player.update();
        // this.camera.follow(this.player.position.x, this.player.position.y);
        this.camera.update();
    }

    render() {
        const displayContext = this.display.context;

        this.renderLevel(displayContext);
        this.player.render(displayContext);
    }
}