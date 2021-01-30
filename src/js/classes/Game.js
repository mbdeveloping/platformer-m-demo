import Player from './Player';

export default class Game {
    constructor(display, controller) {
        this.display = display,
        this.controller = controller,
        // World
        this.tileSize = 16,
        this.friction = .8,
        this.gravity = .4,
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
                            [0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            [0,0,2,2,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0],
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
        this.player = new Player(10, 100),
        this.camera = {
            position: { x: null, y: null },
            offset: { x: null, y: null }
        }
        this.init()
    }

    getTile(x, y) {
        return (this.levels[this.activeLevelIndex].tileMap[y] && this.levels[this.activeLevelIndex].tileMap[y][x]) ? this.levels[this.activeLevelIndex].tileMap[y][x] : 0;
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

                context.fillRect(Math.round(renderX), Math.round(renderY), this.tileSize, this.tileSize);
            }
        }
    }

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
        const displayCanvas = this.display.el;
        const displayContext = this.display.context;

        displayCanvas.width = this.display.width;
        displayCanvas.height = this.display.height;
        displayContext.imageSmoothingEnabled = false;

        this.resize();
    }

    update(step, time) {
        this.player.update(step);

        this.player.velocity.y += this.gravity;

        // if (this.player.isGrounded) {
        // }

        this.checkWorldBoundriesCollision(this.player);

        let newPlayerPosX = this.player.position.x + this.player.velocity.x;
        let newPlayerPosY = this.player.position.y + this.player.velocity.y;

        // Collision
        // Left
        if (this.player.velocity.x < 0) {
            if (this.getTile(Math.floor(newPlayerPosX / this.tileSize), Math.floor(this.player.position.y / this.tileSize)) === 2 || 
            this.getTile(Math.floor(newPlayerPosX / this.tileSize), Math.floor((this.player.position.y + this.player.height - this.gravity) / this.tileSize)) === 2) {
                // console.log('Left colliding!');
                newPlayerPosX = (Math.floor(newPlayerPosX / this.tileSize) + 1) * this.tileSize;
                this.player.velocity.x = 0;
            }
        }

        // Right
        if (this.player.velocity.x > 0) {
            if (this.getTile(Math.floor((newPlayerPosX + this.player.width) / this.tileSize), Math.floor(this.player.position.y / this.tileSize)) === 2 || 
            this.getTile(Math.floor((newPlayerPosX + this.player.width) / this.tileSize), Math.floor((this.player.position.y + this.player.height - this.gravity) / this.tileSize)) === 2) {
                // console.log('Right coliding!');
                newPlayerPosX = (Math.floor(newPlayerPosX / this.tileSize) + 1) * this.tileSize - this.player.width;
                this.player.velocity.x = 0;
            }
        }

        // Top
        if (this.player.velocity.y < 0) {
            if (this.getTile(Math.floor(newPlayerPosX / this.tileSize), Math.floor(newPlayerPosY / this.tileSize)) === 2 ||
            this.getTile(Math.floor((newPlayerPosX + this.player.width - 0.9) / this.tileSize), Math.floor(newPlayerPosY / this.tileSize)) === 2) {
                // console.log('Top colliding!');
                newPlayerPosY = (Math.floor(newPlayerPosY / this.tileSize) + 1) * this.tileSize;
                this.player.velocity.y = 0;
            }
        }

        // Bottom
        if (this.player.velocity.y > 0) {
            if (this.getTile(Math.floor(newPlayerPosX / this.tileSize), Math.floor((newPlayerPosY + this.player.height - this.gravity) / this.tileSize)) === 2 ||
            this.getTile(Math.floor((newPlayerPosX + this.player.width - 0.9) / this.tileSize), Math.floor((newPlayerPosY + this.player.height - this.gravity) / this.tileSize)) === 2) {
                // console.log('Bottom colliding!');
                this.player.isGrounded = true;
                newPlayerPosY = (Math.floor(newPlayerPosY / this.tileSize) + 1) * this.tileSize - this.player.height;
                this.player.velocity.y = 0;
            }
        }
        
        // Apply new position
        this.player.position.x = newPlayerPosX;
        this.player.position.y = newPlayerPosY;

        // Camera
        this.camera.position.x = Math.round(this.player.position.x);
        this.camera.position.y = Math.round(this.player.position.y);

        // Tile offset
        this.camera.offset.x = this.camera.position.x - (this.visibleTiles.x / 2) * this.tileSize;
        this.camera.offset.y = this.camera.position.y - (this.visibleTiles.y / 2) * this.tileSize;

        if (this.camera.offset.x < 0) this.camera.offset.x = 0;
        if (this.camera.offset.y < 0) this.camera.offset.y = 0;
        if (this.camera.offset.x > (this.levels[this.activeLevelIndex].width - this.visibleTiles.x) * this.tileSize) this.camera.offset.x  = (this.levels[this.activeLevelIndex].width - this.visibleTiles.x) * this.tileSize;
        if (this.camera.offset.y > (this.levels[this.activeLevelIndex].height - this.visibleTiles.y) * this.tileSize) this.camera.offset.y = (this.levels[this.activeLevelIndex].height - this.visibleTiles.y) * this.tileSize;
    }

    render() {
        const displayContext = this.display.context;

        this.renderLevel(displayContext);
        this.player.render(displayContext, this.camera.offset.x, this.camera.offset.y);
    }
}