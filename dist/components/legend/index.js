"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mapProps = require("../../shared/map-props");

var _goober = require("goober");

var _legendItem = _interopRequireDefault(require("./legend-item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _goober.setup)(_react["default"].createElement);
var LegendContainer = (0, _goober.styled)('div')(function (_ref) {
  var num_legends = _ref.num_legends,
      position = _ref.position,
      typography = _ref.typography;
  return _objectSpread(_objectSpread({}, typography), {}, {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    cursor: num_legends > 1 ? 'pointer' : 'default',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '0 .75rem .75rem',
    borderRadius: '0.2rem',
    marginBottom: '.5rem'
  }, position);
});

var Legend = function Legend(_ref2) {
  var legendPosition = _ref2.legendPosition,
      legendSize = _ref2.legendSize,
      legends = _ref2.legends,
      typography = _ref2.typography;
  var objPosition = {};
  objPosition[legendPosition.split('-')[0]] = '.5rem';
  objPosition[legendPosition.split('-')[1]] = '.5rem'; // const [activeLegend, setActiveLegend] = useState(0)
  // const handleLegendChange = () => setActiveLegend(o => o === legends.length - 1 ? 0 : o + 1)

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(LegendContainer, {
    num_legends: legends.length // onClick={handleLegendChange}
    ,
    position: objPosition,
    typography: legendSize === 'full' ? typography : _objectSpread(_objectSpread({}, typography), {}, {
      fontSize: '10px'
    })
  }, legends.map(function (_ref3) {
    var type = _ref3.type,
        legendProps = _objectWithoutProperties(_ref3, ["type"]);

    return /*#__PURE__*/_react["default"].createElement(_legendItem["default"], {
      key: type,
      legendItemProps: _objectSpread({
        type: type,
        legendSize: legendSize
      }, legendProps)
    });
  })));
};

Legend.propTypes = _objectSpread({
  legendPosition: _propTypes["default"].oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  legendSize: _propTypes["default"].oneOf(['widget', 'full']),
  legends: _propTypes["default"].array.isRequired
}, _mapProps.typographyPropTypes);
Legend.defaultProps = _objectSpread({
  legendPosition: 'top-left',
  legendSize: 'full'
}, _mapProps.typographyDefaultProps);
var _default = Legend;
exports["default"] = _default;