'use strict';
var computeRootSize = require('./computeRootSize')
var FastClick = require('fastclick');
FastClick.attach(document.body);

var plugin = {
  exec: function (options) {
    computeRootSize(window, {
      designWidth: options.designWidth || 640,
      designHeight: options.designHeight || 1136,
      designFontSize: options.designFontSize || 20
    })
  }
}

module.exports = plugin;
