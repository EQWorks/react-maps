"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUPERCLUSTER_ZOOM = exports.CLUSTER_SIZE_SCALE = exports.SCALES = exports.COLOURS = exports.TYPE_RADIUS = exports.TYPE_POLYGON = exports.days = exports.hours = exports.DATE_TYPES = void 0;

var _d3Scale = require("d3-scale");

var DATE_TYPES = {
  1: 'Daily',
  2: 'Weekly',
  3: 'Monthly'
};
exports.DATE_TYPES = DATE_TYPES;
var hours = new Array(24).fill(0).map(function (_, i) {
  return "".concat(i);
});
exports.hours = hours;
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
exports.days = days;
var TYPE_POLYGON = {
  code: 1,
  name: 'polygon',
  plural: 'polygons'
};
exports.TYPE_POLYGON = TYPE_POLYGON;
var TYPE_RADIUS = {
  code: 2,
  name: 'radius',
  plural: 'radii'
};
exports.TYPE_RADIUS = TYPE_RADIUS;
var COLOURS = ['#0062d9', '#f65b20', '#ffaa00', '#dd196b', '#9928b3', '#00b5c8', '#a8a8a8'];
exports.COLOURS = COLOURS;
var SCALES = {
  'linear': _d3Scale.scaleLinear,
  'log': _d3Scale.scaleLog,
  'quantile': _d3Scale.scaleQuantile,
  'quantize': _d3Scale.scaleQuantize
};
exports.SCALES = SCALES;
var CLUSTER_SIZE_SCALE = 40;
exports.CLUSTER_SIZE_SCALE = CLUSTER_SIZE_SCALE;
var SUPERCLUSTER_ZOOM = 20;
exports.SUPERCLUSTER_ZOOM = SUPERCLUSTER_ZOOM;