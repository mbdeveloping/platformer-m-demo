export default class Engine {
    constructor() {
        this.currentTime = 0,
        this.deltaTime = 0,
        this.lastTime = this.timestamp(),
        this.step = 1/60
    }

     timestamp() {
        return window.performance && window.performance.currentTime ? window.performance.currentTime() : new Date().getTime();
    }

    gameLoop(updateCallback, renderCallback) {
        this.currentTime = this.timestamp();
        this.deltaTime = this.deltaTime + Math.min(1, (this.currentTime - this.lastTime) / 1000);

        while(this.deltaTime > this.step) {
            updateCallback(this.step, this.currentTime);
            this.deltaTime = this.deltaTime - this.step;
        }

        renderCallback();
        this.lastTime = this.currentTime;
        requestAnimationFrame(() => this.gameLoop(updateCallback, renderCallback));
    }

    start(updateCallback, renderCallback) {
        requestAnimationFrame(() => this.gameLoop(updateCallback, renderCallback));
    }
}