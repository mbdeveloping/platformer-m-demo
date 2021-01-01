export default class Display {
    constructor() {
        this.canvas = {
            el: null,
            context: null,
        };
        this.init();
    }

    /**
     * 
     * @param {string} containerSelector 
     */
    insertCanvasIntoDOM(containerSelector) {
        const container = document.querySelector(containerSelector);
        container.append(this.canvas.el);
    }

    initCanvas() {
        const canavsEl = document.createElement('canvas');
        this.canvas.el = canavsEl;
        this.canvas.context = canavsEl.getContext('2d', { alpha: false, desynchronized: false });
    }

    init() {
        this.initCanvas();
    }
}