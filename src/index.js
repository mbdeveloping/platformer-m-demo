// Test import of an asset
// import webpackLogo from './images/webpack-logo.svg';

// Test import of a JavaScript function
import Display from './js/classes/Display';
import Engine from './js/classes/Engine';
import Game from './js/classes/Game';

// Test import of styles
import './styles/index.scss';

const display = new Display();
display.insertCanvasIntoDOM('#root');

const game = new Game(display);

const engine = new Engine(game);
// engine.start(game.update, game.render);
engine.start();

// Events
window.addEventListener('resize', () => game.resize());