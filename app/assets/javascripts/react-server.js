//= require_self
//= require ./components

let React = require("react");
let ReactDOM = require("react-dom");
let ReactDOMServer = require("react-dom/server");

window.React = React;
window.ReactDOM = ReactDOM;
window.ReactDOMServer = ReactDOMServer;

// for material-ui
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

// for material-ui
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
