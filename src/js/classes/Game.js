/*
    Temporarly code from World clas has been added here
    
    Todo:
    - Smooth out camera;
    - Add player sprite animations;
    - Add background parallax layers;
    - Add collectable items;
    - Add enemies;
    - Refactor code to seperate classes;
*/

import Vector from './math/Vector';
import Player from './Player';

export default class Game {
    constructor(display, controller) {
        this.display = display,
        this.controller = controller,
        // World
        this.tileSize = 16,
        this.friction = .9,
        this.gravity = .4,
        this.visibleTiles = { x: 20, y: 14 },
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
            position: new Vector(null, null),
            offset: new Vector(null, null),
            renderTile: {
                min: new Vector(null, null),
                max: new Vector(null, null)
            }
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
        for (let y = this.camera.renderTile.min.y - 1; y < this.camera.renderTile.max.y + 1; y++) {
            for (let x = this.camera.renderTile.min.x - 1; x < this.camera.renderTile.max.x + 1; x++) {
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
            obj.velocity.x = 0;
            obj.position.x = (this.visibleTiles.x * this.tileSize) + this.camera.offset.x - obj.width;
        }

        if (obj.position.y <= 0) {
            obj.velocity.y = 0;
            obj.position.y = 0;
        }

        if ((obj.position.y - this.camera.offset.y) + obj.height >= this.visibleTiles.y * this.tileSize) {
            obj.velocity.y = 0;
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

    update(step) {
        this.player.velocity.y += this.gravity;

        this.player.update(step);

        // if (this.player.isGrounded) {
        //     this.player.velocity.x *= this.friction;
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
                this.player.velocity.x = 0;
                newPlayerPosX = (Math.floor(newPlayerPosX / this.tileSize) + 1) * this.tileSize;
            }
        }

        // Right
        if (this.player.velocity.x > 0) {
            if (this.getTile(Math.floor((newPlayerPosX + this.player.width) / this.tileSize), Math.floor(this.player.position.y / this.tileSize)) === 2 || 
            this.getTile(Math.floor((newPlayerPosX + this.player.width) / this.tileSize), Math.floor((this.player.position.y + this.player.height - this.gravity) / this.tileSize)) === 2) {
                // console.log('Right coliding!');
                this.player.velocity.x = 0;
                newPlayerPosX = (Math.floor(newPlayerPosX / this.tileSize) + 1) * this.tileSize - this.player.width;
            }
        }

        // Top
        if (this.player.velocity.y < 0) {
            if (this.getTile(Math.floor(newPlayerPosX / this.tileSize), Math.floor(newPlayerPosY / this.tileSize)) === 2 ||
            this.getTile(Math.floor((newPlayerPosX + this.player.width - 0.9) / this.tileSize), Math.floor(newPlayerPosY / this.tileSize)) === 2) {
                // console.log('Top colliding!');
                this.player.velocity.y = 0;
                newPlayerPosY = (Math.floor(newPlayerPosY / this.tileSize) + 1) * this.tileSize;
            }
        }

        // Bottom
        if (this.player.velocity.y > 0) {
            if (this.getTile(Math.floor(newPlayerPosX / this.tileSize), Math.floor((newPlayerPosY + this.player.height - this.gravity) / this.tileSize)) === 2 ||
            this.getTile(Math.floor((newPlayerPosX + this.player.width - 0.9) / this.tileSize), Math.floor((newPlayerPosY + this.player.height - this.gravity) / this.tileSize)) === 2) {
                // console.log('Bottom colliding!');
                this.player.isGrounded = true;
                this.player.velocity.y = 0;
                newPlayerPosY = (Math.floor(newPlayerPosY / this.tileSize) + 1) * this.tileSize - this.player.height;
            } else {
                this.player.isGrounded = false;
            }
        }
        
        // Apply new position
        this.player.position.x = newPlayerPosX;
        this.player.position.y = newPlayerPosY;

        // Camera
        this.camera.renderTile.min.x = Math.floor(this.camera.offset.x / this.tileSize);
        this.camera.renderTile.max.x = Math.ceil((this.camera.offset.x / this.tileSize) + this.visibleTiles.x);
        this.camera.renderTile.min.y = Math.floor(this.camera.offset.y / this.tileSize);
        this.camera.renderTile.max.y = Math.ceil((this.camera.offset.y / this.tileSize) + this.visibleTiles.y);

        this.camera.position.x = Math.round(this.player.position.x);
        this.camera.position.y = Math.round(this.player.position.y);

        // Tile offset
        this.camera.offset.x = this.camera.position.x - (this.visibleTiles.x / 2) * this.tileSize;
        this.camera.offset.y = this.camera.position.y - (this.visibleTiles.y / 2) * this.tileSize;

        if (this.camera.offset.x < 0) this.camera.offset.x = 0;
        if (this.camera.offset.y < 0) this.camera.offset.y = 0;
        if (this.camera.offset.x > (this.levels[this.activeLevelIndex].width - this.visibleTiles.x) * this.tileSize) this.camera.offset.x  = (this.levels[this.activeLevelIndex].width - this.visibleTiles.x) * this.tileSize;
        if (this.camera.offset.y > (this.levels[this.activeLevelIndex].height - this.visibleTiles.y) * this.tileSize) this.camera.offset.y = (this.levels[this.activeLevelIndex].height - this.visibleTiles.y) * this.tileSize;

        // console.log(this.controller.jump);
    }

    render() {
        const displayContext = this.display.context;

        this.renderLevel(displayContext);
        this.player.render(displayContext, this.camera.offset.x, this.camera.offset.y);
    }
}