import World from './World';

export default class Game {
    constructor(display) {
        this.display = display,
        this.tileSize = 16,
        this.worlds = [
            new World('Earth', this.tileSize),
        ],
        this.activeWorldIndex = 0,
        this.init()
    }

    renderLevel() {
        // @todo change this method to game camera which will show world (render tiles), follow player, etc
        this.display.context.drawImage(this.worlds[this.activeWorldIndex].levelBuffer.el, 0, 0);
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
        displayCanvas.style.width = width  + 'px';
    }

    init() {
        const world = this.worlds[this.activeWorldIndex];

        const levelBuffer = world.levelBuffer.el;
        const levelBufferCtx = world.levelBuffer.context;

        const displayCanvas = this.display.el;
        const displayContext = this.display.context;

        levelBuffer.width = displayCanvas.width = this.display.width;
        levelBuffer.height = displayCanvas.height = this.display.height;

        levelBufferCtx.imageSmoothingEnabled = false;
        displayContext.imageSmoothingEnabled = false;

        world.renderTilesIntoBuffer();
        this.renderLevel();

        this.resize();

        //tt
        displayContext.fillRect(50, 50, 12, 12);
    }

    update() {

    }

    render() {
        // this.player.render();
    }
}