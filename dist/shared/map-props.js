"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POIMapDefaultProps = exports.POIMapProps = exports.tooltipDefaultProps = exports.tooltipPropTypes = exports.typographyDefaultProps = exports.typographyPropTypes = exports.commonDefaultProps = exports.commonProps = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var commonProps = {
  mapboxApiAccessToken: _propTypes["default"].string.isRequired
};
exports.commonProps = commonProps;
var commonDefaultProps = {
  mapboxApiAccessToken: 'no-token'
};
exports.commonDefaultProps = commonDefaultProps;
var typographyPropTypes = {
  typography: _propTypes["default"].shape({
    fontFamily: _propTypes["default"].string.isRequired,
    fontSize: _propTypes["default"].string.isRequired,
    textColor: _propTypes["default"].string.isRequired
  })
};
exports.typographyPropTypes = typographyPropTypes;
var typographyDefaultProps = {
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '12px',
    textColor: 'black'
  }
};
exports.typographyDefaultProps = typographyDefaultProps;
var tooltipPropTypes = {
  tooltipKeys: _propTypes["default"].oneOfType([_propTypes["default"].PropTypes.shape({
    name: _propTypes["default"].string,
    id: _propTypes["default"].string,
    metricKeys: _propTypes["default"].array,
    nameAccessor: _propTypes["default"].func,
    idAccessor: _propTypes["default"].func,
    metricAliases: _propTypes["default"].object
  }), _propTypes["default"].array]),
  tooltipProps: _propTypes["default"].shape({
    backgroundColor: _propTypes["default"].string.isRequired,
    boxShadow: _propTypes["default"].string.isRequired,
    border: _propTypes["default"].string.isRequired,
    borderRadius: _propTypes["default"].string.isRequired,
    padding: _propTypes["default"].string.isRequired
  })
};
exports.tooltipPropTypes = tooltipPropTypes;
var tooltipDefaultProps = {
  tooltipKeys: {
    name: '',
    id: '',
    metricKeys: undefined,
    nameAccessor: function nameAccessor(d) {
      return d;
    },
    idAccessor: function idAccessor(d) {
      return d;
    },
    metricAccessor: function metricAccessor(d) {
      return d;
    },
    metricAliases: {}
  },
  tooltipProps: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 8px 0 rgba(12, 12, 13, 0.15)',
    border: '1px solid rgba(255, 255, 255)',
    borderRadius: '3px',
    padding: '8px'
  }
};
exports.tooltipDefaultProps = tooltipDefaultProps;
var POIMapProps = {
  mapProps: _propTypes["default"].shape({
    fillColour: _propTypes["default"].array.isRequired,
    polygonFillColour: _propTypes["default"].array.isRequired,
    lineColour: _propTypes["default"].array.isRequired,
    lineWidth: _propTypes["default"].number.isRequired,
    opacity: _propTypes["default"].number.isRequired
  })
};
exports.POIMapProps = POIMapProps;
var POIMapDefaultProps = {
  mapProps: {
    fillColour: [250, 198, 175],
    polygonFillColour: [229, 118, 99],
    polygonLineColour: [212, 62, 52],
    editFillColour: [212, 62, 52],
    editLineColour: [182, 38, 40],
    lineColour: [242, 157, 132],
    lineWidth: 2,
    opacity: 0.2
  }
};
exports.POIMapDefaultProps = POIMapDefaultProps;