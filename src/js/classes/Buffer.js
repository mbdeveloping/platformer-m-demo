export default class Buffer {
    constructor() {
        this.el = null,
        this.context = null,
        this.init();
    }

    initBuffer() {
        const canavsEl = document.createElement('canvas');
        this.el = canavsEl;
        this.context = canavsEl.getContext('2d', { alpha: false, desynchronized: false });
    }

    init() {
        this.initBuffer();
    }
}