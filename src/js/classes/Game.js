import Player from "./Player";

export default class Game {
    constructor(display) {
        this.display = display,
        this.bufferCanvas = this.display.buffer.el,
        this.bufferContext = this.display.buffer.context,
        this.displayCanvas = this.display.canvas.el,
        this.displayContext = this.display.canvas.context,
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
        this.player = new Player(),
        this.init()
    }

    renderTiles() {
        let map_index = 0;

        for (let top = 0; top < this.levels[this.activeLevelIndex].height; top += this.tileSize) {
                for (let left = 0; left < this.levels[this.activeLevelIndex].width; left += this.tileSize) {
                const tile_value = this.levels[this.activeLevelIndex].tiles[map_index];
                const tile = this.tiles[tile_value];
                
                this.bufferContext.fillStyle = tile.color;
                this.bufferContext.fillRect(left, top, this.tileSize, this.tileSize);
                map_index ++;
            }
        }
    }

    renderDisplay() {
        this.displayContext.drawImage(this.bufferCanvas, 0, 0);
    }

    resize() {
        let height = document.documentElement.clientHeight;
        let width  = document.documentElement.clientWidth;

        if (width / height < this.levels[this.activeLevelIndex].width_height_ratio) {
            height = Math.floor(width  / this.levels[this.activeLevelIndex].width_height_ratio);
        } else {
            width  = Math.floor(height * this.levels[this.activeLevelIndex].width_height_ratio);
        }

        this.displayCanvas.style.height = height + 'px';
        this.displayCanvas.style.width  = width  + 'px';
    }

    init() {
        this.bufferCanvas.width  = this.displayCanvas.width  = this.levels[this.activeLevelIndex].width;
        this.bufferCanvas.height = this.displayCanvas.height = this.levels[this.activeLevelIndex].height;

        this.bufferContext.imageSmoothingEnabled = false;
        this.displayContext.imageSmoothingEnabled = false;

        this.renderTiles();
        this.renderDisplay();

        this.resize();
    }

    update() {
        // console.log('Game is updating');
    }

    render() {
        // console.log('Game is rendering');
        this.player.render(this.displayContext);
    }
}