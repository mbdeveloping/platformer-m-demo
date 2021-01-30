import Controller from './js/classes/Controller';
import Display from './js/classes/Display';
import Engine from './js/classes/Engine';
import Game from './js/classes/Game';

import './styles/index.scss';

export const controller = new Controller();
const display = new Display();
display.insertCanvasIntoDOM('#root');

const game = new Game(display, controller);

const engine = new Engine(game);
engine.start();

// Events
window.addEventListener('resize', () => game.resize());
window.addEventListener('keydown', event => controller.keyEvent(event));
window.addEventListener('keyup', event => controller.keyEvent(event));