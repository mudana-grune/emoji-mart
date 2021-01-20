"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _skins = _interopRequireDefault(require("./skins"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var focusOnElementBySkin = function focusOnElementBySkin(el, skin) {
  var currentSkinEl = el.querySelector("[data-skin=\"".concat(skin, "\"]"));
  currentSkinEl.focus();
};

var SkinsDot = /*#__PURE__*/function (_Skins) {
  (0, _inherits2["default"])(SkinsDot, _Skins);

  var _super = _createSuper(SkinsDot);

  function SkinsDot(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, SkinsDot);
    _this = _super.call(this, props);
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleMenuClick = _this.handleMenuClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleSkinKeyDown = _this.handleSkinKeyDown.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setSkinTonesRef = _this.setSkinTonesRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onClose = _this.onClose.bind((0, _assertThisInitialized2["default"])(_this));
    _this.skinTones = null;
    return _this;
  }

  (0, _createClass2["default"])(SkinsDot, [{
    key: "handleMenuClick",
    value: function handleMenuClick() {
      var skin = this.props.skin;
      focusOnElementBySkin(this.skinTones, skin);
      this.setState({
        opened: true
      });
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        this.handleMenuClick(event);
      }

      event.stopPropagation();
    }
  }, {
    key: "handleSkinKeyDown",
    value: function handleSkinKeyDown(e, skin) {
      var _this2 = this;

      var selectLeft = function selectLeft() {
        return focusOnElementBySkin(_this2.skinTones, skin - 1 < 1 ? 6 : skin - 1);
      };

      var selectRight = function selectRight() {
        return focusOnElementBySkin(_this2.skinTones, skin + 1 > 6 ? 1 : skin + 1);
      };

      switch (e.key) {
        case 'ArrowLeft':
          selectLeft();
          break;

        case 'ArrowRight':
          selectRight();
          break;

        case 'Tab':
          e.preventDefault();

          if (e.shiftKey) {
            selectLeft();
          } else {
            selectRight();
          }

          break;

        case 'Enter':
        case 'Space':
          this.handleClick(e);
          this.onClose(e);
          break;

        case 'Escape':
          this.onClose(e);
          break;

        default:
          break;
      }

      e.stopPropagation();
    }
  }, {
    key: "setSkinTonesRef",
    value: function setSkinTonesRef(c) {
      this.skinTones = c;
    }
  }, {
    key: "onClose",
    value: function onClose(e) {
      var _this3 = this;

      this.setState({
        opened: false
      }, function () {
        _this3.skinTones.focus();
      });
      e.stopPropagation();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          skin = _this$props.skin,
          i18n = _this$props.i18n;
      var opened = this.state.opened;
      var skinToneNodes = [];

      var _loop = function _loop(skinTone) {
        var selected = skinTone === skin;
        var visible = opened || selected;
        skinToneNodes.push( /*#__PURE__*/_react["default"].createElement("span", (0, _extends2["default"])({
          key: "skin-tone-".concat(skinTone),
          className: "emoji-mart-skin-swatch".concat(selected ? ' selected' : ''),
          "aria-label": i18n.skintones[skinTone],
          "aria-hidden": !visible
        }, opened ? {
          role: 'menuitem'
        } : {}), /*#__PURE__*/_react["default"].createElement("span", (0, _extends2["default"])({
          onClick: function onClick(e) {
            if (opened) {
              _this4.handleClick(e);

              _this4.onClose(e);
            }
          },
          onKeyDown: function onKeyDown(e) {
            return _this4.handleSkinKeyDown(e, skinTone);
          },
          tabIndex: opened ? '0' : '-1',
          role: "button"
        }, selected ? {
          'aria-haspopup': true,
          'aria-expanded': !!opened
        } : {}, opened ? {
          'aria-pressed': !!selected
        } : {}, {
          "aria-label": i18n.skintones[skinTone],
          title: i18n.skintones[skinTone],
          "data-skin": skinTone,
          className: "emoji-mart-skin emoji-mart-skin-tone-".concat(skinTone)
        }))));
      };

      for (var skinTone = 1; skinTone <= 6; skinTone++) {
        _loop(skinTone);
      }

      return /*#__PURE__*/_react["default"].createElement("section", {
        className: "emoji-mart-skin-swatches".concat(opened ? ' opened' : ''),
        "aria-label": i18n.skintext
      }, /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, opened ? {
        role: 'menubar'
      } : {}, {
        tabIndex: '0',
        onClick: this.handleMenuClick,
        onKeyDown: this.handleKeyDown,
        ref: this.setSkinTonesRef
      }), skinToneNodes));
    }
  }]);
  return SkinsDot;
}(_skins["default"]);

exports["default"] = SkinsDot;
SkinsDot.propTypes
/* remove-proptypes */
= {
  onChange: _propTypes["default"].func,
  skin: _propTypes["default"].number.isRequired,
  i18n: _propTypes["default"].object
};
SkinsDot.defaultProps = {
  onChange: function onChange() {}
};