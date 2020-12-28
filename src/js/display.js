export default class Display {
  constructor() {
    this.canvas = {
      el: null,
      context: null,
      width: 500,
      height: 500
    };
    this.buffer = {
      el: null,
      context: null
    };
    this.init();
  }

  insertCanvasIntoDOM(containerSelector) {
    const container = document.querySelector(containerSelector);
    container.append(this.canvas.el);
  }

  initCanvas() {
    this.canvas.el = document.createElement('canvas');
    this.canvas.context = this.canvas.el.getContext('2d', { alpha: false, desynchronized: false });
    this.canvas.el.width = this.canvas.width;
    this.canvas.el.height = this.canvas.height;
  }

  initBuffer() {
    this.buffer.el = document.createElement('canvas');
    this.canvas.context = this.buffer.el.getContext('2d', { alpha: false, desynchronized: false });
  }

  init() {
    this.initCanvas();
    this.initBuffer();
  }
}