import Display from './js/classes/Display';
import Engine from './js/classes/Engine';
import Game from './js/classes/Game';

import './styles/index.scss';

const display = new Display();
display.insertCanvasIntoDOM('#root');

const game = new Game(display);

const engine = new Engine(game);
engine.start();

// Events
window.addEventListener('resize', () => game.resize());