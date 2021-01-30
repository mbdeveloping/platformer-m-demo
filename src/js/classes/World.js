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
                height: 17, // units
                tiles: {
                    0: { color:'#d8f4f4' }, // sky
                    1: { color:'#ffffff' }, // cloud
                    2: { color:'#3e611e' }, // grass
                    3: { color:'#412823' },  // dirt
                    4: { color:'#3e611e' }, // platform
                },
                tileMap: [
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
        this.player = new Player(10, 50),
        this.camera = {
            position: { x: null, y: null },
            offset: { x: null, y: null }
        }
    }

    getTile(x, y) {
        return (this.levels[this.activeLevelIndex].tileMap[y] && this.levels[this.activeLevelIndex].tileMap[y][x]) ? this.levels[this.activeLevelIndex].tileMap[y][x] : 0;
        // if (this.levels[this.activeLevelIndex].tileMap[y] && this.levels[this.activeLevelIndex].tileMap[y][x]) {
        //     console.log(`Returning tile ${this.levels[this.activeLevelIndex].tileMap[y][x]}`);
        //     return this.levels[this.activeLevelIndex].tileMap[y][x];
        // } else {
        //     console.log('Failed to return tile!');
        //     return 0;
        // }
    }

    setTile(x, y, tile) {
        this.levels[this.activeLevelIndex].tileMap[y][x] = tile;
    }

    renderLevel(context) {
        for (let y = 0; y < this.visibleTiles.y + this.camera.offset.y; y++) {
            for (let x = 0; x < this.visibleTiles.x + this.camera.offset.x; x++) {
                const tileID = this.getTile(x, y);
                let renderX = (x * this.tileSize) - this.camera.offset.x;
                let renderY = (y * this.tileSize) - this.camera.offset.y;

                context.fillStyle = this.levels[this.activeLevelIndex].tiles[tileID].color;

                context.fillRect(renderX, renderY, this.tileSize, this.tileSize);
            }
        }
    }

    // test
    checkWorldBoundriesCollision(obj) {
        if (obj.position.x <= 0) {
            obj.velocity.x = 0;
            obj.position.x = 0;
        }

        if ((obj.position.x - this.camera.offset.x) + obj.width >= this.visibleTiles.x * this.tileSize) {
            obj.position.x = (this.visibleTiles.x * this.tileSize) + this.camera.offset.x - obj.width;
        }

        if (obj.position.y <= 0) {
            obj.velocity.y = 0;
            obj.position.y = 0;
        }

        if ((obj.position.y - this.camera.offset.y) + obj.height >= this.visibleTiles.y * this.tileSize) {
            obj.position.y = (this.visibleTiles.y * this.tileSize) + this.camera.offset.y - obj.height;
        }
    }

    update(step, time) {
        // this.player.velocity.y += 2;
        
        this.player.update(step, time);
        this.checkWorldBoundriesCollision(this.player);

        // console.log(this.player.velocity.y);

        // console.log(`posX: ${this.player.position.x}, coordX: ${Math.floor(this.player.position.x / this.tileSize)}`);

        // Collision
        // Left
        if (this.player.velocity.x < 0) {
            if (this.getTile(Math.floor(this.player.position.x / this.tileSize), Math.floor(this.player.position.y / this.tileSize)) === 2 || 
            this.getTile(Math.floor(this.player.position.x / this.tileSize), Math.floor((this.player.position.y + this.player.height - 0.9) / this.tileSize)) === 2) {
                console.log('Left colliding!');
                this.player.position.x = (Math.floor(this.player.position.x / this.tileSize) + 1) * this.tileSize;
                this.player.velocity.x = 0;
            }
        }

        // Right
        if (this.player.velocity.x > 0) {
            if (this.getTile(Math.floor((this.player.position.x + this.player.width) / this.tileSize), Math.floor(this.player.position.y / this.tileSize)) === 2 || 
            this.getTile(Math.floor((this.player.position.x + this.player.width) / this.tileSize), Math.floor((this.player.position.y + this.player.height - 0.9) / this.tileSize)) === 2) {
                console.log('Right coliding!');
                this.player.position.x = (Math.floor(this.player.position.x / this.tileSize) + 1) * this.tileSize - this.player.width;
                this.player.velocity.x = 0;
            }
        }

        // Top
        if (this.player.velocity.y < 0) {
            if (this.getTile(Math.floor(this.player.position.x / this.tileSize), Math.floor(this.player.position.y / this.tileSize)) === 2 ||
            this.getTile(Math.floor((this.player.position.x + this.player.width - 0.9) / this.tileSize), Math.floor(this.player.position.y / this.tileSize)) === 2) {
                console.log('Top colliding!');
                this.player.position.y = (Math.floor(this.player.position.y / this.tileSize) + 1) * this.tileSize;
                this.player.velocity.y = 0;
            }
        }

        // Bottom
        if (this.player.velocity.y > 0) {
            if (this.getTile(Math.floor(this.player.position.x / this.tileSize), Math.floor((this.player.position.y + this.player.height - 0.9) / this.tileSize)) === 2 ||
            this.getTile(Math.floor((this.player.position.x + this.player.width - 0.9) / this.tileSize), Math.floor((this.player.position.y + this.player.height - 0.9) / this.tileSize)) === 2) {
                console.log('Bottom colliding!');
                this.player.position.y = (Math.floor(this.player.position.y / this.tileSize) + 1) * this.tileSize - this.player.height;
                this.player.velocity.y = 0;
            }
        }

        // Camera
        this.camera.position.x = this.player.position.x;
        this.camera.position.y = this.player.position.y;

        // Tile offset
        this.camera.offset.x = this.camera.position.x - (this.visibleTiles.x / 2) * this.tileSize;
        this.camera.offset.y = this.camera.position.y - (this.visibleTiles.y / 2) * this.tileSize;

        if (this.camera.offset.x < 0) this.camera.offset.x = 0;
        if (this.camera.offset.y < 0) this.camera.offset.y = 0;
        if (this.camera.offset.x > (this.levels[this.activeLevelIndex].width - this.visibleTiles.x) * this.tileSize) this.camera.offset.x  = (this.levels[this.activeLevelIndex].width - this.visibleTiles.x) * this.tileSize;
        if (this.camera.offset.y > (this.levels[this.activeLevelIndex].height - this.visibleTiles.y) * this.tileSize) this.camera.offset.y = (this.levels[this.activeLevelIndex].height - this.visibleTiles.y) * this.tileSize;
        // console.log(`playerX: ${this.player.position.x}, offsetX: ${this.camera.offset.x}, playerDrawX: ${(this.player.position.x - this.camera.offset.x)}`);
        // console.log(`cam X: ${this.camera.offset.x}, cam Y: ${this.camera.offset.y}, playerX: ${this.player.position.x}, playerY: ${this.player.position.y}`);
    }

    render (context) { 
        this.renderLevel(context);
        this.player.render(context, this.camera.offset.x, this.camera.offset.y);
    }
}