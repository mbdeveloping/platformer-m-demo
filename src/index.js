// Test import of an asset
// import webpackLogo from './images/webpack-logo.svg';

// Test import of a JavaScript function
import Display from './js/display';

// Test import of styles
import './styles/index.scss';

const display = new Display();
display.insertCanvasIntoDOM('#root');
