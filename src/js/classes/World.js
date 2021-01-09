export default class World {
    constructor(worldNanme, player) {
        this.name = worldNanme ?? 'Earth',
        this.tileSize = 16,
        this.friction = .8,
        this.gravity = 1,
        this.levels = [ // world places
            // level 1
            {
                tiles: {
                    0: { color:'#d8f4f4' }, // sky
                    1: { color:'#ffffff' }, // cloud
                    2: { color:'#3e611e' }, // grass
                    3: { color:'#412823' }  // dirt
                },
                tileMap: [
                            [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,  0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,  0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
                            [0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,  0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,  0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0],
                            [0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,  0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,  0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0],
                            [0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0],
                            [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
                            [2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,  2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,  2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2],
                            [3,3,3,3,3,3,0,0,3,3,3,3,3,3,3,3,3,3,3,3,  3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,  3,3,3,3,3,3,0,0,3,3,3,3,3,3,3,3,3,3,3,3],
                        ]
            },
            // level 2
            // ...
        ],
        this.activeLevelIndex = 0,
        this.player = player
    }

    getTile(x, y) {
        return (this.levels[this.activeLevelIndex].tileMap[y] && this.levels[this.activeLevelIndex].tileMap[y][x]) ? this.levels[this.activeLevelIndex].tileMap[y][x] : 0;
    }

    renderTilesIntoBuffer() {
        // this.levels[this.activeLevelIndex].tileMap.forEach((row, rowIndex) => {
        //     row.forEach((col, colIndex) => {
        //         const tile = this.levels[this.activeLevelIndex].tiles[col];
        //         let top = rowIndex * this.tileSize;
        //         let left = colIndex * this.tileSize;

        //         this.levelBuffer.context.fillStyle = tile.color;
        //         this.levelBuffer.context.fillRect(left, top, this.tileSize, this.tileSize);
        //     });
        // });
    }

    checkWorldBoundriesCollision(obj) {
        if (obj.position.x <= 0) {
            obj.velocity.x = 0;
            obj.position.x = 0;
        }
        if (obj.position.y + obj.height >= 224) {
            obj.velocity.y = 0;
            obj.position.y = 224 - obj.height;
            obj.isGrounded = true;
        }
    }

    update() {
        this.player.update(this.gravity, this.friction);

        this.checkWorldBoundriesCollision(this.player);
    }

    render (context) { 
        this.player.render(context);
    }
}