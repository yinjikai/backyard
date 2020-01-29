(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([[4],{

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _react = __webpack_require__(14);

var _react2 = _interopRequireDefault(_react);

var _taroWeapp = __webpack_require__(0);

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

__webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var containerTop = 15;

var TimeRangePicker = (_temp2 = _class = function (_BaseComponent) {
  _inherits(TimeRangePicker, _BaseComponent);

  function TimeRangePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TimeRangePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TimeRangePicker.__proto__ || Object.getPrototypeOf(TimeRangePicker)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp16", "anonymousState__temp11", "anonymousState__temp12", "anonymousState__temp13", "anonymousState__temp14", "anonymousState__temp15", "from", "to", "time", "scrollTop", "disableTime", "handleCancel"], _this.generateTimeRange = function () {
      var _this$state = _this.state,
          from = _this$state.from,
          to = _this$state.to;

      var fromTime = void 0,
          toTime = void 0,
          hour = void 0,
          min = void 0,
          _hour = void 0,
          _min = 0;
      if (from > to) {
        //向上
        hour = Math.floor(to / 80);
        min = from % 80 / 20 * 15;
        _hour = Math.floor(from / 80);
        _min = from % 80 / 20 * 15;
      } else {
        //向下

        hour = Math.floor(from / 80);
        min = from % 80 / 20 * 15;
        _hour = Math.floor(to / 80);
        _min = to % 80 / 20 * 15;
      }
      fromTime = _this.formatTime(hour, min);
      toTime = _this.formatTime(_hour, _min);
      _this.setState({
        time: fromTime + "~" + toTime
      });
    }, _this.formatTime = function (hour, min) {
      return ("" + hour).padStart(2, "0") + ":" + ("" + min).padStart(2, "0");
    }, _this.checkTime = function (time) {
      var _from = _this.state.from;
      var disableTime = _this.props.disableTime;

      var result = true;
      for (var i = 0; i < disableTime.length; i++) {
        var item = disableTime[i];

        var _item$split = item.split("~"),
            from = _item$split[0],
            to = _item$split[1];

        var start = +from.slice(0, 2) * 80 + +from.slice(-2) / 15 * 20;
        var end = +to.slice(0, 2) * 80 + +to.slice(-2) / 15 * 20;
        if (time > start && time < end || _from <= start && time >= end && _from !== 0 && time !== 0) {
          result = false;
          break;
        }
      }

      return result;
    }, _this.handleTouchMove = function (e) {
      var scrollTop = _this.state.scrollTop;

      var pageY = e.touches[0].pageY - containerTop + scrollTop;
      var _to = pageY % 20 >= 10 ? Math.ceil(pageY / 20) * 20 : Math.floor(pageY / 20) * 20;
      if (!_this.checkTime(_to)) {
        return;
      }
      _this.setState({
        to: _to
      }, function () {
        _this.generateTimeRange();
      });
    }, _this.handleTouchStart = function (e) {
      e.stopPropagation();
      var scrollTop = _this.state.scrollTop;

      var pageY = e.touches[0].pageY - containerTop + scrollTop;
      var _from = pageY % 20 >= 10 ? Math.ceil(pageY / 20) * 20 : Math.floor(pageY / 20) * 20;
      if (!_this.checkTime(_from)) {
        return false;
      }_this.setState({
        from: _from,
        to: _from + 20
      }, function () {
        _this.generateTimeRange();
      });
    }, _this.handleCancel = function (e) {
      e.stopPropagation();
      var handleCancel = _this.props.handleCancel;

      if (typeof handleCancel === "function") {
        handleCancel();
      }
      _this.handleReset();
    }, _this.handleSubmit = function (e) {
      e.stopPropagation();
      var time = _this.state.time;
      var onChange = _this.props.onChange;

      if (typeof onChange === "function") {
        _this.props.onChange(time);
      }
      _this.handleReset();
    }, _this.handleReset = function () {
      _this.setState({
        from: 0,
        to: 0
      });
    }, _this.handleBtnTouchStart = function (e) {
      e.stopPropagation();
    }, _this.onScroll = function (e) {
      e.stopPropagation();
      _this.setState({ scrollTop: e.target.scrollTop });
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TimeRangePicker, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(TimeRangePicker.prototype.__proto__ || Object.getPrototypeOf(TimeRangePicker.prototype), "_constructor", this).call(this, props);

      this.state = {
        from: 0,
        to: 0,
        time: "",
        scrollTop: 0
      };
      this.wrap = _taroWeapp2.default.createRef();
      this.$$refs = new _taroWeapp2.default.RefsArray();
    }
  }, {
    key: "_createHourViewData",
    value: function _createHourViewData(_$uid) {
      return function () {
        var $anonymousCallee__78 = Array(24).fill("");
        var loopArray150 = Array(24).fill("").map(function (item, index) {
          item = {
            $original: (0, _taroWeapp.internal_get_original)(item)
          };
          var $loopState__temp2 = (0, _taroWeapp.internal_inline_style)({ top: 80 * index + "px" });
          return {
            $loopState__temp2: $loopState__temp2,
            $original: item.$original
          };
        });
        return {
          loopArray150: loopArray150,
          $anonymousCallee__78: $anonymousCallee__78
        };
      };
    }
  }, {
    key: "_createCurrentTimeViewData",
    value: function _createCurrentTimeViewData(_$uid) {
      return function () {
        var hour = new Date().getHours();
        var min = new Date().getMinutes();
        var top = hour * 80 + min / 15 * 20;
        var anonymousState__temp3 = (0, _taroWeapp.internal_inline_style)({ top: top + "px" });
        var anonymousState__temp4 = ("" + hour).padStart(2, "0") + ":" + ("" + min).padStart(2, "0");
        return {
          anonymousState__temp3: anonymousState__temp3,
          anonymousState__temp4: anonymousState__temp4
        };
      };
    }
  }, {
    key: "_createFifTeenViewData",
    value: function _createFifTeenViewData(_$uid) {
      return function () {
        var $anonymousCallee__79 = Array(96).fill("");
        var loopArray151 = Array(96).fill("").map(function (item, index) {
          item = {
            $original: (0, _taroWeapp.internal_get_original)(item)
          };

          if (index % 4 == 0) {
            return "";
          }var $loopState__temp6 = (0, _taroWeapp.internal_inline_style)({ top: 20 * index + "px" });
          return {
            $loopState__temp6: $loopState__temp6,
            $original: item.$original
          };
        });
        return {
          loopArray151: loopArray151,
          $anonymousCallee__79: $anonymousCallee__79
        };
      };
    }
  }, {
    key: "_createBgData",
    value: function _createBgData(_$uid) {
      var _this2 = this;

      return function () {
        var anonymousState__temp7 = _this2._createFifTeenViewData(_$uid + "chdzzzzzzz")();

        return {
          anonymousState__temp7: anonymousState__temp7
        };
      };
    }
  }, {
    key: "_createDisableTimeData",
    value: function _createDisableTimeData(_$uid) {
      var _this3 = this;

      return function () {
        var disableTime = _this3.props.disableTime;

        var loopArray152 = disableTime ? disableTime.map(function (item, _anonIdx) {
          item = {
            $original: (0, _taroWeapp.internal_get_original)(item)
          };

          var _item$$original$split = item.$original.split("~"),
              from = _item$$original$split[0],
              to = _item$$original$split[1];

          var start = +from.slice(0, 2) * 80 + +from.slice(-2) / 15 * 20;
          var end = +to.slice(0, 2) * 80 + +to.slice(-2) / 15 * 20;
          var $loopState__temp9 = disableTime ? (0, _taroWeapp.internal_inline_style)({ top: start + "px", height: end - start + "px" }) : null;
          return {
            start: start,
            end: end,
            $loopState__temp9: $loopState__temp9,
            $original: item.$original
          };
        }) : [];
        return {
          loopArray152: loopArray152,
          disableTime: disableTime
        };
      };
    }
  }, {
    key: "_createSelectedRangeData",
    value: function _createSelectedRangeData(_$uid) {
      var _this4 = this;

      return function () {
        var _state = _this4.state,
            from = _state.from,
            to = _state.to,
            time = _state.time;

        var top = void 0,
            height = 0;
        if (from > to && from - to > 20) {
          //向上拖动
          top = to;
          height = from - to;
        } else {
          //向下拖动
          top = from;
          height = to - from;
        }
        var anonymousState__temp10 = (0, _taroWeapp.internal_inline_style)({
          top: top + "px",
          height: height + "px",
          display: to == 0 ? "none" : "block"
        });
        return {
          anonymousState__temp10: anonymousState__temp10,
          time: time
        };
      };
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var anonymousState__temp11 = this._createBgData(__prefix + "chezzzzzzz")();

      var anonymousState__temp12 = this._createHourViewData(__prefix + "chfzzzzzzz")();

      var anonymousState__temp13 = this._createCurrentTimeViewData(__prefix + "chgzzzzzzz")();

      var anonymousState__temp14 = this._createSelectedRangeData(__prefix + "chhzzzzzzz")();

      var anonymousState__temp15 = this._createDisableTimeData(__prefix + "chizzzzzzz")();

      var anonymousState__temp16 = (0, _taroWeapp.internal_inline_style)({ height: "100vh" });
      this.$$refs.pushRefs([{
        type: "dom",
        id: "chjzz",
        refName: "",
        fn: this.wrap
      }]);
      Object.assign(this.__state, {
        anonymousState__temp16: anonymousState__temp16,
        anonymousState__temp11: anonymousState__temp11,
        anonymousState__temp12: anonymousState__temp12,
        anonymousState__temp13: anonymousState__temp13,
        anonymousState__temp14: anonymousState__temp14,
        anonymousState__temp15: anonymousState__temp15
      });
      return this.__state;
    }
  }]);

  return TimeRangePicker;
}(_taroWeapp.Component), _class.$$events = ["handleCancel", "handleBtnTouchStart", "handleSubmit", "onScroll", "handleTouchMove", "handleTouchStart"], _class.$$componentPath = "pages/booking/picker", _temp2);
exports.default = TimeRangePicker;

Component(__webpack_require__(0).default.createComponent(TimeRangePicker));

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[13,0,1]]]);