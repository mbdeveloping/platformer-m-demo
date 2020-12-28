export default class Game {
    constructor(display) {
        this.display = display,
        this.tileSize = 16,
        this.tiles = {
            0: { color:'#d8f4f4' }, // sky
            1: { color:'#ffffff' }, // cloud
            2: { color:'#3e611e' }, // grass
            3: { color:'#412823' }  // dirt
        }
        this.levels = [
            {
                columns: 16,
                rows: 14,
                height: 14 * this.tileSize,
                width: 16 * this.tileSize,
                width_height_ratio: 16 / 14,
                tiles: [1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,
                        0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,
                        0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,0,
                        0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,
                        0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,
                        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,
                        2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                        2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
                        3,2,2,2,2,2,2,0,0,0,2,2,2,2,2,2,
                        3,3,3,3,3,3,3,0,0,0,3,3,3,3,3,3]
              },
        ],
        this.activeLevelIndex = 0,
        this.init()
    }

    renderTiles() {
        let map_index = 0;
        const bufferContext = this.display.buffer.context;

        for (let top = 0; top < this.levels[this.activeLevelIndex].height; top += this.tileSize) {
                for (let left = 0; left < this.levels[this.activeLevelIndex].width; left += this.tileSize) {
                const tile_value = this.levels[this.activeLevelIndex].tiles[map_index];
                const tile = this.tiles[tile_value];
                
                bufferContext.fillStyle = tile.color;
                bufferContext.fillRect(left, top, this.tileSize, this.tileSize);
                map_index ++;
            }
        }
    }

    renderDisplay() {
        this.display.canvas.context.drawImage(this.display.buffer.el, 0, 0);
    }

    init() {
        const bufferCanvas = this.display.buffer.el;
        const bufferContext = this.display.buffer.context;
        const displayCanvas = this.display.canvas.el;
        const displayContext = this.display.canvas.context;

        bufferCanvas.width  = displayCanvas.width  = this.levels[this.activeLevelIndex].width;
        bufferCanvas.height = displayCanvas.height = this.levels[this.activeLevelIndex].height;

        bufferContext.imageSmoothingEnabled = false;
        displayContext.imageSmoothingEnabled = false;

        this.renderTiles();
        this.renderDisplay();
    }
}