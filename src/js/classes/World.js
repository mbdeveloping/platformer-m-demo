export default class World {
    constructor(worldNanme) {
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
                    3: { color:'#412823' },  // dirt
                    4: { color:'#3e611e' }, // platform
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
                            [0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0],
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
        this.player = null,
        this.camera = null
    }

    getTile(x, y) {
        return (this.levels[this.activeLevelIndex].tileMap[y] && this.levels[this.activeLevelIndex].tileMap[y][x]) ? this.levels[this.activeLevelIndex].tileMap[y][x] : 0;
    }

    // renderTilesIntoBuffer() {
    //     this.levels[this.activeLevelIndex].tileMap.forEach((row, rowIndex) => {
    //         row.forEach((col, colIndex) => {
    //             const tile = this.levels[this.activeLevelIndex].tiles[col];
    //             let top = rowIndex * this.tileSize;
    //             let left = colIndex * this.tileSize;

    //             this.levelBuffer.context.fillStyle = tile.color;
    //             this.levelBuffer.context.fillRect(left, top, this.tileSize, this.tileSize);
    //         });
    //     });
    // }

    renderLevel(context) {
        for (let y = this.camera.yMin; y < this.camera.yMax; y++) {
            for (let x = this.camera.xMin; x < this.camera.xMax; x++) {
                let renderX = (x * this.tileSize) - this.camera.position.x;
                let renderY = (y * this.tileSize) - this.camera.position.y;
                const tile = this.getTile(x, y);

                context.fillStyle = this.levels[this.activeLevelIndex].tiles[tile].color;
                context.fillRect(renderX, renderY, this.tileSize, this.tileSize);
            }
        }
    }

    addPlayer(playerObj) {
        this.player = playerObj;
    }

    addCamera(cameraObj) {
        this.camera = cameraObj;
    }

    // test
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

        this.camera.update();
    }

    render (context) { 
        this.renderLevel(context);
        this.player.render(context);
    }
}