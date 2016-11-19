// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require_self
//= require react_ujs
//= require ./cable
//= require ./components

import React from 'react';
import ReactDOM from 'react-dom';
import Turbolinks from 'turbolinks';

// for react_component
window.React = React;
window.ReactDOM = ReactDOM;

// for material-ui
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

Turbolinks.start();
