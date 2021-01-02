import Camera from './Camera';
import World from './World';

export default class Game {
    constructor(display) {
        this.display = display,
        this.tileSize = 16,
        this.worlds = [
            new World('Earth', this.tileSize),
        ],
        this.activeWorldIndex = 0,
        this.camera = new Camera(0, 0, this.display.width, this.display.height, this.worlds[this.activeWorldIndex]),
        this.init()
    }

    renderLevel(context) {
        const world = this.worlds[this.activeWorldIndex];
        
        for (let y = this.camera.yMin; y < this.camera.yMax; y++) {
            for (let x = this.camera.xMin; x < this.camera.xMax - 1; x++) {
                let renderX = (x * this.tileSize);
                let renderY = (y * this.tileSize);
                const tile = world.levels[world.activeLevelIndex].tileMap[y][x];

                context.fillStyle = world.levels[world.activeLevelIndex].tiles[tile].color;
                context.fillRect(renderX, renderY, this.tileSize, this.tileSize);
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
        // const world = this.worlds[this.activeWorldIndex];

        // const levelBuffer = world.levelBuffer.el;
        // const levelBufferCtx = world.levelBuffer.context;

        const displayCanvas = this.display.el;
        const displayContext = this.display.context;

        displayCanvas.width = this.display.width;
        displayCanvas.height = this.display.height;

        // levelBuffer.width = world.levels[world.activeLevelIndex].tileMap[0].length * this.tileSize; // @todo add width/height to the map
        // levelBuffer.height = world.levels[world.activeLevelIndex].tileMap.length * this.tileSize;

        // levelBufferCtx.imageSmoothingEnabled = false;
        displayContext.imageSmoothingEnabled = false;

        // world.renderTilesIntoBuffer();
        // this.renderLevel();

        this.resize();
    }

    update() {
        this.camera.update();
    }

    render() {
        const displayContext = this.display.context;

        this.renderLevel(displayContext);

        //tt
        displayContext.fillStyle = 'black';
        displayContext.fillRect(50, 50, 12, 12);
    }
}