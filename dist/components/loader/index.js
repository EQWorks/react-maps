"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.useLoader = exports.convertCSVtoJSON = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDropzone = require("react-dropzone");

var _goober = require("goober");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _goober.setup)(_react["default"].createElement);

var convertCSVtoJSON = function convertCSVtoJSON(f) {
  // first row is readers
  var rows = f.split('\n');
  var headers = rows[0].split(',');
  return rows.slice(1).filter(function (r) {
    return r.length;
  }).map(function (r) {
    return r.split(',').reduce(function (agg, ele, i) {
      return _objectSpread(_objectSpread({}, agg), {}, _defineProperty({}, headers[i], parseFloat(ele) ? parseFloat(ele) : ele));
    }, {});
  });
};

exports.convertCSVtoJSON = convertCSVtoJSON;

var useLoader = function useLoader(_ref) {
  var setData = _ref.setData,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? 'text' : _ref$mode,
      accept = _ref.accept;
  var onDrop = (0, _react.useCallback)(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 1),
        file = _ref3[0];

    // single file handling only for now
    if (!file) {
      return;
    }

    var reader = new FileReader();

    reader.onerror = function () {
      console.error('file reading has failed');
    };

    reader.onload = function () {
      setData(reader.result);
    };

    reader[mode === 'text' ? 'readAsText' : 'readAsArrayBuffer'](file);
  }, [setData, mode]);
  return (0, _reactDropzone.useDropzone)({
    onDrop: onDrop,
    accept: accept,
    multiple: false
  });
};

exports.useLoader = useLoader;
var Container = (0, _goober.styled)('div', _react.forwardRef)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]))); // TODO: style this

var Loader = function Loader(_ref4) {
  var setData = _ref4.setData,
      mode = _ref4.mode,
      accept = _ref4.accept,
      children = _ref4.children,
      prompt = _ref4.prompt,
      activePrompt = _ref4.activePrompt;

  var _useLoader = useLoader({
    setData: setData,
    mode: mode,
    accept: accept
  }),
      getRootProps = _useLoader.getRootProps,
      getInputProps = _useLoader.getInputProps,
      isDragActive = _useLoader.isDragActive;

  return /*#__PURE__*/_react["default"].createElement(Container, getRootProps(), /*#__PURE__*/_react["default"].createElement("input", getInputProps()), children ? children({
    isDragActive: isDragActive
  }) : /*#__PURE__*/_react["default"].createElement("p", null, isDragActive ? activePrompt : prompt));
};

Loader.propTypes = {
  setData: _propTypes["default"].func,
  mode: _propTypes["default"].oneOf(['text', 'binary', 'bin']),
  accept: _propTypes["default"].string,
  children: _propTypes["default"].func,
  prompt: _propTypes["default"].string,
  activePrompt: _propTypes["default"].string
};
Loader.defaultProps = {
  setData: function setData() {},
  mode: 'text',
  accept: null,
  children: null,
  prompt: "Drag 'n' drop a file here, or click to select files",
  activePrompt: 'Drop the file here ...'
};
var _default = Loader;
exports["default"] = _default;