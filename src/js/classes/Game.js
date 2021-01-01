import World from './World';

export default class Game {
    constructor(display) {
        this.display = display,
        // this.levelBuffer = new Buffer();
        this.tileSize = 16,
        this.worlds = [
            new World('Earth', this.tileSize),
        ],
        this.activeWorldIndex = 0,
        // this.tiles = {
        //     0: { color:'#d8f4f4' }, // sky
        //     1: { color:'#ffffff' }, // cloud
        //     2: { color:'#3e611e' }, // grass
        //     3: { color:'#412823' }  // dirt
        // };
        // this.levels = [
        //     {
        //         columns: 16,
        //         rows: 14,
        //         height: 14 * this.tileSize,
        //         width: 16 * this.tileSize,
        //         width_height_ratio: 16 / 14,
        //         tiles: [1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,
        //                 0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,
        //                 0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,0,
        //                 0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,
        //                 0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,
        //                 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        //                 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        //                 0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,
        //                 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        //                 0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,
        //                 2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        //                 2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
        //                 3,2,2,2,2,2,2,0,0,0,2,2,2,2,2,2,
        //                 3,3,3,3,3,3,3,0,0,0,3,3,3,3,3,3]
        //       },
        // ],
        // this.activeLevelIndex = 0,
        this.init()
    }

    // renderTiles() {
    //     let map_index = 0;
    //     const levelBufferCtx = this.levelBuffer.context;

    //     for (let top = 0; top < this.levels[this.activeLevelIndex].height; top += this.tileSize) {
    //             for (let left = 0; left < this.levels[this.activeLevelIndex].width; left += this.tileSize) {
    //             const tile_value = this.levels[this.activeLevelIndex].tiles[map_index];
    //             const tile = this.tiles[tile_value];
                
    //             levelBufferCtx.fillStyle = tile.color;
    //             levelBufferCtx.fillRect(left, top, this.tileSize, this.tileSize);
    //             map_index ++;
    //         }
    //     }
    // }

    renderDisplay() {
        // @todo change this method to game camera which will show world (render tiles), follow player, etc
        // this.display.context.drawImage(this.levelBuffer.el, 0, 0);
        this.display.context.drawImage(this.worlds[this.activeWorldIndex].levelBuffer.el, 0, 0);
        // console.log(this.worlds[this.activeWorldIndex].levelBuffer.el);
    }

    resize() {
        // resize browser display screen/canvas
        // let height = document.documentElement.clientHeight;
        // let width  = document.documentElement.clientWidth;
        // const displayCanvas = this.display.el;

        // if (width / height < this.levels[this.activeLevelIndex].width_height_ratio) {
        //     height = Math.floor(width / this.levels[this.activeLevelIndex].width_height_ratio);
        // } else {
        //     width  = Math.floor(height * this.levels[this.activeLevelIndex].width_height_ratio);
        // }

        // displayCanvas.style.height = height + 'px';
        // displayCanvas.style.width  = width  + 'px';

        let height = document.documentElement.clientHeight;
        let width  = document.documentElement.clientWidth;
        const displayCanvas = this.display.el;
        const world = this.worlds[this.activeWorldIndex];

        if (width / height < world.levels[world.activeLevelIndex].ratio) {
            height = Math.floor(width / world.levels[world.activeLevelIndex].ratio);
        } else {
            width = Math.floor(height * world.levels[world.activeLevelIndex].ratio);
        }

        displayCanvas.style.height = height + 'px';
        displayCanvas.style.width = width  + 'px';
    }

    init() {
        // const levelBuffer = this.levelBuffer.el;
        // const levelBufferCtx = this.levelBuffer.context;
        // const displayCanvas = this.display.el;
        // const displayContext = this.display.context;

        // levelBuffer.width  = displayCanvas.width  = this.levels[this.activeLevelIndex].width;
        // levelBuffer.height = displayCanvas.height = this.levels[this.activeLevelIndex].height;

        // levelBufferCtx.imageSmoothingEnabled = false;
        // displayContext.imageSmoothingEnabled = false;

        // this.renderTiles();
        // this.renderDisplay();

        // this.resize();

        const world = this.worlds[this.activeWorldIndex];

        const levelBuffer = world.levelBuffer.el;
        const levelBufferCtx = world.levelBuffer.context;

        const displayCanvas = this.display.el;
        const displayContext = this.display.context;

        levelBuffer.width = displayCanvas.width = world.levels[world.activeLevelIndex].width;
        levelBuffer.height = displayCanvas.height = world.levels[world.activeLevelIndex].height;

        levelBufferCtx.imageSmoothingEnabled = false;
        displayContext.imageSmoothingEnabled = false;

        world.renderTiles();
        this.renderDisplay();

        this.resize();

        //tt
        // displayContext.fillRect(50, 50, 12, 12);
    }

    update() {

    }

    render() {
        // this.player.render();
    }
}