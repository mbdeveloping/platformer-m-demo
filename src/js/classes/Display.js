export default class Display {
    constructor() {
        this.el = null,
        this.context = null,
        this.height = 224, // 14 * tileSize (16)
        this.width = 320, // 20 * tileSize (16)
        this.ratio = 20 / 14,
        this.init();
    }

    /**
     * 
     * @param {string} containerSelector 
     */
    insertCanvasIntoDOM(containerSelector) {
        const container = document.querySelector(containerSelector);
        container.append(this.el);
    }

    initCanvas() {
        const canavsEl = document.createElement('canvas');
        this.el = canavsEl;
        this.context = canavsEl.getContext('2d', { alpha: false, desynchronized: false });
    }

    init() {
        this.initCanvas();
    }
}