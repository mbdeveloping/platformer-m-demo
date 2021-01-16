export default class Engine {
    constructor(game) {
        this.game = game,
        this.currentTime = 0,
        this.deltaTime = 0,
        this.lastTime = this.timestamp(),
        this.step = 1/60
    }

     timestamp() {
        return window.performance && window.performance.currentTime ? window.performance.currentTime() : new Date().getTime();
    }

    gameLoop() {
        this.game.display.context.clearRect(0, 0, this.game.display.width, this.game.display.height);
        this.currentTime = this.timestamp();
        this.deltaTime = this.deltaTime + Math.min(1, (this.currentTime - this.lastTime) / 1000);

        while(this.deltaTime > this.step) {
            this.game.update(this.step, this.currentTime);
            this.deltaTime = this.deltaTime - this.step;
        }

        this.game.render();
        this.lastTime = this.currentTime;
        requestAnimationFrame(() => this.gameLoop());
    }

    start() {
        requestAnimationFrame(() => this.gameLoop());
    }
}