"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reportWI = void 0;

var _constants = require("./constants");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// NOTE: predefine dataset meta & metric keys to streamline
// grouping, filtering
// dynamic visualizations (a la Kepler), e.g. radius based on visits
var reportWI = {
  META_FIELDS: ['address_city', 'address_country', 'address_label', 'address_line1', 'address_line2', 'address_postalcode', 'address_region', 'address_unit', 'category', 'chain_id', 'date_type', 'end_date', 'start_date', 'repeat_id', 'lat', 'lon', 'name', 'poi_id', 'report_id', 'time_zone', 'type'],
  // TODO confirm if these are ever sent: 'unique_visitors_dow', 'unique_visitors_hod' 
  DATA_FIELDS: ['repeat_type', 'repeat_visitors', 'repeat_visitors_hh', 'repeat_visits', 'report_id', 'unique_hh', 'unique_visitors', 'unique_visitors_multi_visit', 'unique_visitors_single_visit', 'unique_xdevice', 'visits'].concat(_toConsumableArray(_constants.days), _toConsumableArray(_constants.hours))
};
exports.reportWI = reportWI;