export default class Display {
    constructor() {
        this.el = null,
        this.context = null,
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