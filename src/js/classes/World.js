import Player from './Player';

export default class World {
    constructor(worldNanme) {
        this.name = worldNanme ?? 'Earth',
        this.tileSize = 16,
        this.friction = .8,
        this.gravity = 1,
        this.visibleTiles = { x: 16, y: 14 },
        this.levels = [ // world places
            // level 1
            {
                width: 60, // units
                height: 14, // units
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
        this.player = new Player(100, 200),
        this.camera = {
            posX: 0,
            posY: 0
        },
        this.offetX = null,
        this.offetY = null
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

    // renderLevel(context) {
    //     for (let y = this.camera.yMin; y < this.camera.yMax; y++) {
    //         for (let x = this.camera.xMin; x < this.camera.xMax; x++) {
    //             let renderX = (x * this.tileSize) - this.camera.position.x;
    //             let renderY = (y * this.tileSize) - this.camera.position.y;
    //             const tile = this.getTile(x, y);

    //             context.fillStyle = this.levels[this.activeLevelIndex].tiles[tile].color;
    //             // context.fillRect(renderX, renderY, this.tileSize, this.tileSize);
    //             context.fillRect(Math.round(renderX), Math.round(renderY), this.tileSize, this.tileSize);
    //         }
    //     }
    // }

    renderLevel(context) {
        for (let y = 0; y < this.visibleTiles.y; y++) {
            for (let x = 0; x < this.visibleTiles.x; x++) {
                const tileID = this.getTile(x + this.offetX, y + this.offetY);
                let renderX = (x * this.tileSize);
                let renderY = (y * this.tileSize);

                context.fillStyle = this.levels[this.activeLevelIndex].tiles[tileID].color;
                context.fillRect(renderX, renderY, this.tileSize, this.tileSize);
            }
        }
    }

    addPlayer(playerObj) {
        this.player = playerObj;
    }

    // test
    checkWorldBoundriesCollision(obj) {
        if (obj.position.x <= 0) {
            obj.velocity.x = 0;
            obj.position.x = 0;
        }

        if ((obj.position.x - this.offetX) + obj.width >= this.visibleTiles.x * this.tileSize) {
            obj.position.x = (this.visibleTiles.x * this.tileSize) + this.offetX - obj.width;
            console.log(this.visibleTiles.x * this.tileSize);
        }

        if (obj.position.y + obj.height >= 224) {
            obj.velocity.y = 0;
            obj.position.y = 224 - obj.height;
            obj.isGrounded = true;
        }
    }

    update(step, time) {
        this.player.update(step, time);
        this.checkWorldBoundriesCollision(this.player);

        // Camera
        this.camera.posX = this.player.position.x;
        this.camera.posY = this.player.position.y;

        // Tile offset
        this.offetX = this.camera.posX - (this.visibleTiles.x / 2) * this.tileSize;
        this.offetY = this.camera.posY - (this.visibleTiles.y / 2) * this.tileSize;

        if (this.offetX < 0) this.offetX = 0;
        if (this.offety < 0) this.offetY = 0;
        if (this.offetX > this.levels[this.activeLevelIndex].width - this.visibleTiles.x) this.offetX = this.levels[this.activeLevelIndex].width - this.visibleTiles.x;
        if (this.offetY > this.levels[this.activeLevelIndex].height - this.visibleTiles.y) this.offetY = this.levels[this.activeLevelIndex].height - this.visibleTiles.y;

        console.log(`playerX: ${this.player.position.x}, offsetX: ${this.offetX}, playerDrawX: ${(this.player.position.x - this.offetX)}`);
    }

    render (context) { 
        this.renderLevel(context);
        this.player.render(context, this.offetX, this.offetY);
    }
}