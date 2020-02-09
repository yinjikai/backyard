(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([[5],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _taroWeapp = __webpack_require__(0);

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

__webpack_require__(11);

var _api = __webpack_require__(1);

var service = _interopRequireWildcard(_api);

var _index = __webpack_require__(2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_Taro$Component) {
  _inherits(Index, _Taro$Component);

  function Index() {
    _classCallCheck(this, Index);

    var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).apply(this, arguments));

    _this.$usedState = ["anonymousState__temp", "loopArray0", "userInfo", "showAuthBtn", "bookingList"];
    _this.anonymousFunc2Map = {};
    _this.customComponents = [];
    return _this;
  }

  _createClass(Index, [{
    key: '_constructor',
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), '_constructor', this).call(this, props);
      this.$$refs = new _taroWeapp2.default.RefsArray();
    }
  }, {
    key: '_createData',
    value: function _createData() {
      var _this2 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _useState = (0, _taroWeapp.useState)(null),
          _useState2 = _slicedToArray(_useState, 2),
          bookingList = _useState2[0],
          setBookingList = _useState2[1];

      var _useState3 = (0, _taroWeapp.useState)(null),
          _useState4 = _slicedToArray(_useState3, 2),
          userInfo = _useState4[0],
          setUserInfo = _useState4[1];

      var _useState5 = (0, _taroWeapp.useState)(false),
          _useState6 = _slicedToArray(_useState5, 2),
          showAuthBtn = _useState6[0],
          setShowAuthBtn = _useState6[1];

      var _useState7 = (0, _taroWeapp.useState)(''),
          _useState8 = _slicedToArray(_useState7, 2),
          token = _useState8[0],
          setToken = _useState8[1];

      (0, _taroWeapp.useEffect)(function () {
        getBookingList(userInfo);
      }, [userInfo, token]);
      var getBookingList = function getBookingList(userInfo) {
        if (userInfo && token) {
          _taroWeapp2.default.request({
            url: "" + service.getBookingList(userInfo.nickName),
            header: {
              authorization: (0, _index.genToken)(token),
              daad: 1111
            }
          }).then(function (res) {
            var _res$data = res.data,
                code = _res$data.code,
                result = _res$data.data;

            if (code == 200) {
              setBookingList(result || []);
            }
          });
        }
      };
      (0, _taroWeapp.useEffect)(function () {
        login();
      }, []);
      var login = function login() {
        _taroWeapp2.default.login().then(function (res) {
          var code = res.code;

          if (code) {
            getUserInfoFromServer(code);
          }
        });
      };
      var getUserInfoFromServer = function getUserInfoFromServer(code) {
        _taroWeapp2.default.request({
          url: service.getUserInfo(code)
        }).then(function (res) {
          var token = res.data.token;

          _taroWeapp2.default.setStorageSync('token', token);
          setToken(token);
        });
      };
      (0, _taroWeapp.useEffect)(function () {
        _taroWeapp2.default.getSetting().then(function (res) {
          if (res.authSetting["scope.userInfo"]) {
            getUserInfo();
          } else {
            //手动授权
            setShowAuthBtn(true);
          }
        }).catch(function (err) {
          console.log(err);
        });
      }, []);
      var getUserInfo = function getUserInfo() {
        _taroWeapp2.default.getUserInfo().then(function (res) {
          setUserInfo(res.userInfo);
          _taroWeapp2.default.setStorageSync('userInfo', res.userInfo);
        });
      };
      var handleBookingBtnClick = function handleBookingBtnClick() {
        if (_taroWeapp2.default.getStorageSync('userInfo')) {
          _taroWeapp2.default.navigateTo({ url: '/pages/booking/index' });
        }
      };
      var getUserInfoManual = function getUserInfoManual(e) {
        var _e$detail = e.detail,
            userInfo = _e$detail.userInfo,
            errMsg = _e$detail.errMsg;

        if (errMsg == 'getUserInfo:ok') {
          setUserInfo(userInfo);
          _taroWeapp2.default.setStorageSync('userInfo', userInfo);
        }
      };
      var cancelBooking = function cancelBooking(id) {
        return function () {
          _taroWeapp2.default.request({
            url: service.cancelBooking(id),
            method: 'POST',
            data: { id: id },
            header: {
              'content-type': 'application/json',
              authorization: (0, _index.genToken)(token)
            }
          }).then(function (res) {
            var code = res.data.code;

            if (code == 200) {
              _taroWeapp2.default.showToast({
                title: '已取消',
                icon: 'success',
                duration: 2000
              }).then(function (res) {
                getBookingList(userInfo);
              });
            } else {
              _taroWeapp2.default.showToast({
                title: '请求出错',
                icon: 'none',
                duration: 2000
              });
            }
          });
        };
      };
      this.anonymousFunc0 = handleBookingBtnClick;
      this.anonymousFunc1 = getUserInfoManual;
      var anonymousState__temp = _taroWeapp2.default.getStorageSync('userInfo') && bookingList && bookingList.length > 0;
      var loopArray0 = anonymousState__temp ? bookingList.map(function (item, __index2) {
        item = {
          $original: (0, _taroWeapp.internal_get_original)(item)
        };
        var _item$$original = item.$original,
            project = _item$$original.project,
            timeRange = _item$$original.timeRange,
            _id = _item$$original._id;

        var _$indexKey = "azzzz" + __index2;
        _this2.anonymousFunc2Map[_$indexKey] = cancelBooking(_id);
        return {
          project: project,
          timeRange: timeRange,
          _id: _id,
          _$indexKey: _$indexKey,
          $original: item.$original
        };
      }) : [];
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        loopArray0: loopArray0,
        userInfo: userInfo,
        showAuthBtn: showAuthBtn,
        bookingList: bookingList
      });
      return this.__state;
    }
  }, {
    key: 'anonymousFunc0',
    value: function anonymousFunc0(e) {
      ;
    }
  }, {
    key: 'anonymousFunc1',
    value: function anonymousFunc1(e) {
      ;
    }
  }, {
    key: 'anonymousFunc2',
    value: function anonymousFunc2(_$indexKey) {
      var _anonymousFunc2Map;

      ;

      for (var _len = arguments.length, e = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        e[_key - 1] = arguments[_key];
      }

      return this.anonymousFunc2Map[_$indexKey] && (_anonymousFunc2Map = this.anonymousFunc2Map)[_$indexKey].apply(_anonymousFunc2Map, e);
    }
  }]);

  return Index;
}(_taroWeapp2.default.Component);

Index.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2"];
Index.$$componentPath = "pages/index/index";
exports.default = Index;

Component(__webpack_require__(0).default.createComponent(Index, true));

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[10,0,1]]]);