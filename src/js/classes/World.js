import Buffer from './Buffer';

export default class World {
    constructor(worldNanme, tileSize) {
        this.name = worldNanme ?? 'Earth',
        this.tileSize = tileSize,
        this.levels = [ // world places
            // level 1
            {
                columns: 16,
                rows: 14,
                height: 14 * this.tileSize,
                width: 16 * this.tileSize,
                ratio: 16 / 14,
                tiles: {
                    0: { color:'#d8f4f4' }, // sky
                    1: { color:'#ffffff' }, // cloud
                    2: { color:'#3e611e' }, // grass
                    3: { color:'#412823' }  // dirt
                },
                tileMap: [1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,
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
            // level 2
            // ...
        ],
        this.activeLevelIndex = 0,
        this.levelBuffer = new Buffer()
    }

    renderTiles() {
        let mapIndex = 0;

        for (let top = 0; top < this.levels[this.activeLevelIndex].height; top += this.tileSize) {
                for (let left = 0; left < this.levels[this.activeLevelIndex].width; left += this.tileSize) {
                const tileValue = this.levels[this.activeLevelIndex].tileMap[mapIndex];
                const tile = this.levels[this.activeLevelIndex].tiles[tileValue];
                
                this.levelBuffer.context.fillStyle = tile.color;
                this.levelBuffer.context.fillRect(left, top, this.tileSize, this.tileSize);
                mapIndex ++;
            }
        }
    }
}