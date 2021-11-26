"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _layers = require("@deck.gl/layers");

// https://deck.gl/docs/api-reference/layers/scatterplot-layer
var Scatterplot = function Scatterplot(props) {
  return new _layers.ScatterplotLayer(props);
};

var _default = Scatterplot;
exports["default"] = _default;