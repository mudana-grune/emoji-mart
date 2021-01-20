"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var icons = _interopRequireWildcard(require("../../svgs"));

var _store = _interopRequireDefault(require("../../utils/store"));

var _frequently = _interopRequireDefault(require("../../utils/frequently"));

var _utils = require("../../utils");

var _data = require("../../utils/data");

var _sharedProps = require("../../utils/shared-props");

var _anchors = _interopRequireDefault(require("../anchors"));

var _category = _interopRequireDefault(require("../category"));

var _preview = _interopRequireDefault(require("../preview"));

var _search = _interopRequireDefault(require("../search"));

var _sharedDefaultProps = require("../../utils/shared-default-props");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var I18N = {
  search: 'Search',
  clear: 'Clear',
  // Accessible label on "clear" button
  notfound: 'No Emoji Found',
  skintext: 'Choose your default skin tone',
  categories: {
    search: 'Search Results',
    recent: 'Frequently Used',
    people: 'Smileys & People',
    nature: 'Animals & Nature',
    foods: 'Food & Drink',
    activity: 'Activity',
    places: 'Travel & Places',
    objects: 'Objects',
    symbols: 'Symbols',
    flags: 'Flags',
    custom: 'Custom'
  },
  categorieslabel: 'Emoji categories',
  // Accessible title for the list of categories
  skintones: {
    1: 'Default Skin Tone',
    2: 'Light Skin Tone',
    3: 'Medium-Light Skin Tone',
    4: 'Medium Skin Tone',
    5: 'Medium-Dark Skin Tone',
    6: 'Dark Skin Tone'
  }
};

var NimblePicker = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(NimblePicker, _React$PureComponent);

  var _super = _createSuper(NimblePicker);

  function NimblePicker(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, NimblePicker);
    _this = _super.call(this, props);
    _this.CUSTOM = [];
    _this.RECENT_CATEGORY = {
      id: 'recent',
      name: 'Recent',
      emojis: null
    };
    _this.SEARCH_CATEGORY = {
      id: 'search',
      name: 'Search',
      emojis: null,
      anchor: false
    };

    if (props.data.compressed) {
      (0, _data.uncompress)(props.data);
    }

    _this.data = props.data;
    _this.i18n = (0, _utils.deepMerge)(I18N, props.i18n);
    _this.icons = (0, _utils.deepMerge)(icons, props.icons);
    _this.state = {
      firstRender: true,
      emoji: null
    };
    _this.categories = [];
    var allCategories = [].concat(_this.data.categories);

    if (props.custom.length > 0) {
      var customCategories = {};
      var customCategoriesCreated = 0;
      props.custom.forEach(function (emoji) {
        if (!customCategories[emoji.customCategory]) {
          customCategories[emoji.customCategory] = {
            id: emoji.customCategory ? "custom-".concat(emoji.customCategory) : 'custom',
            name: emoji.customCategory || 'Custom',
            emojis: [],
            anchor: customCategoriesCreated === 0
          };
          customCategoriesCreated++;
        }

        var category = customCategories[emoji.customCategory];

        var customEmoji = _objectSpread(_objectSpread({}, emoji), {}, {
          // `<Category />` expects emoji to have an `id`.
          id: emoji.short_names[0],
          custom: true
        });

        category.emojis.push(customEmoji);

        _this.CUSTOM.push(customEmoji);
      });
      allCategories = allCategories.concat(Object.keys(customCategories).map(function (key) {
        return customCategories[key];
      }));
    }

    _this.hideRecent = true;

    if (props.include != undefined) {
      allCategories.sort(function (a, b) {
        if (props.include.indexOf(a.id) > props.include.indexOf(b.id)) {
          return 1;
        }

        return -1;
      });
    }

    for (var categoryIndex = 0; categoryIndex < allCategories.length; categoryIndex++) {
      var category = allCategories[categoryIndex];
      var isIncluded = props.include && props.include.length ? props.include.indexOf(category.id) > -1 : true;
      var isExcluded = props.exclude && props.exclude.length ? props.exclude.indexOf(category.id) > -1 : false;

      if (!isIncluded || isExcluded) {
        continue;
      }

      if (props.emojisToShowFilter) {
        var newEmojis = [];
        var emojis = category.emojis;

        for (var emojiIndex = 0; emojiIndex < emojis.length; emojiIndex++) {
          var emoji = emojis[emojiIndex];

          if (props.emojisToShowFilter(_this.data.emojis[emoji] || emoji)) {
            newEmojis.push(emoji);
          }
        }

        if (newEmojis.length) {
          var newCategory = {
            emojis: newEmojis,
            name: category.name,
            id: category.id
          };

          _this.categories.push(newCategory);
        }
      } else {
        _this.categories.push(category);
      }
    }

    var includeRecent = props.include && props.include.length ? props.include.indexOf(_this.RECENT_CATEGORY.id) > -1 : true;
    var excludeRecent = props.exclude && props.exclude.length ? props.exclude.indexOf(_this.RECENT_CATEGORY.id) > -1 : false;

    if (includeRecent && !excludeRecent) {
      _this.hideRecent = false;

      _this.categories.unshift(_this.RECENT_CATEGORY);
    }

    if (_this.categories[0]) {
      _this.categories[0].first = true;
    }

    _this.categories.unshift(_this.SEARCH_CATEGORY);

    _this.getEmojiIndex = _this.getEmojiIndex.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getEmojiElement = _this.getEmojiElement.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getEmojiToPreview = _this.getEmojiToPreview.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getEmojisInCategory = _this.getEmojisInCategory.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setAnchorsRef = _this.setAnchorsRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleAnchorClick = _this.handleAnchorClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setSearchRef = _this.setSearchRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleSearch = _this.handleSearch.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setScrollRef = _this.setScrollRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleScroll = _this.handleScroll.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleScrollPaint = _this.handleScrollPaint.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleEmojiOver = _this.handleEmojiOver.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleEmojiLeave = _this.handleEmojiLeave.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleEmojiClick = _this.handleEmojiClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleEmojiSelect = _this.handleEmojiSelect.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleEmojiKeyDown = _this.handleEmojiKeyDown.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setPreviewRef = _this.setPreviewRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleSkinChange = _this.handleSkinChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleDarkMatchMediaChange = _this.handleDarkMatchMediaChange.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(NimblePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.state.firstRender) {
        this.testStickyPosition();
        this.firstRenderTimeout = setTimeout(function () {
          _this2.setState({
            firstRender: false
          });
        }, 60);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateCategoriesSize();
      this.handleScroll();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.SEARCH_CATEGORY.emojis = null;
      clearTimeout(this.leaveTimeout);
      clearTimeout(this.firstRenderTimeout);

      if (this.darkMatchMedia) {
        this.darkMatchMedia.removeListener(this.handleDarkMatchMediaChange);
      }
    }
  }, {
    key: "testStickyPosition",
    value: function testStickyPosition() {
      var stickyTestElement = document.createElement('div');
      var prefixes = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
      prefixes.forEach(function (prefix) {
        return stickyTestElement.style.position = "".concat(prefix, "sticky");
      });
      this.hasStickyPosition = !!stickyTestElement.style.position.length;
    }
  }, {
    key: "getPreferredTheme",
    value: function getPreferredTheme() {
      if (this.props.theme != 'auto') return this.props.theme;
      if (this.state.theme) return this.state.theme;
      if (typeof matchMedia !== 'function') return _sharedDefaultProps.PickerDefaultProps.theme;

      if (!this.darkMatchMedia) {
        this.darkMatchMedia = matchMedia('(prefers-color-scheme: dark)');
        this.darkMatchMedia.addListener(this.handleDarkMatchMediaChange);
      }

      if (this.darkMatchMedia.media.match(/^not/)) return _sharedDefaultProps.PickerDefaultProps.theme;
      return this.darkMatchMedia.matches ? 'dark' : 'light';
    }
  }, {
    key: "getEmojiElement",
    value: function getEmojiElement(categoryIndex, emojiIndex) {
      var categoryRef = this.categoryRefs["category-".concat(categoryIndex)];
      var cells = categoryRef.emojiTableRef.querySelectorAll('button');
      return cells[emojiIndex];
    }
  }, {
    key: "getEmojiToPreview",
    value: function getEmojiToPreview(categoryIndex, emojiIndex) {
      var emojis = this.getEmojisInCategory(categoryIndex);
      var emoji = emojis[emojiIndex];
      var emojiToPreview = (0, _utils.getSanitizedData)(emoji, this.state.skin, this.props.set, this.props.data);
      var preview = this.preview;

      if (!preview) {
        return;
      }

      var emojiData = this.CUSTOM.filter(function (customEmoji) {
        return customEmoji.id === emojiToPreview.id;
      })[0];

      for (var key in emojiData) {
        if (emojiData.hasOwnProperty(key)) {
          emoji[key] = emojiData[key];
        }
      }

      this.setState({
        emoji: emojiToPreview
      });
    }
  }, {
    key: "getEmojisInCategory",
    value: function getEmojisInCategory(categoryIndex) {
      return categoryIndex === 1 ? _frequently["default"].get(this.props.perLine) : this.categories[categoryIndex].emojis;
    }
  }, {
    key: "getEmojiIndex",
    value: function getEmojiIndex(row, column) {
      var perLine = this.props.perLine;
      return row * perLine + column;
    }
  }, {
    key: "handleDarkMatchMediaChange",
    value: function handleDarkMatchMediaChange() {
      this.setState({
        theme: this.darkMatchMedia.matches ? 'dark' : 'light'
      });
    }
  }, {
    key: "handleEmojiOver",
    value: function handleEmojiOver(emoji) {
      var preview = this.preview;

      if (!preview) {
        return;
      } // Use Array.prototype.find() when it is more widely supported.


      var emojiData = this.CUSTOM.filter(function (customEmoji) {
        return customEmoji.id === emoji.id;
      })[0];

      for (var key in emojiData) {
        if (emojiData.hasOwnProperty(key)) {
          emoji[key] = emojiData[key];
        }
      }

      this.setState({
        emoji: emoji
      });
      clearTimeout(this.leaveTimeout);
    }
  }, {
    key: "handleEmojiLeave",
    value: function handleEmojiLeave(emoji) {
      var _this3 = this;

      var preview = this.preview;

      if (!preview) {
        return;
      }

      this.leaveTimeout = setTimeout(function () {
        _this3.setState({
          emoji: null
        });
      }, 16);
    }
  }, {
    key: "handleEmojiKeyDown",
    value: function handleEmojiKeyDown(e, currentEmoji, _ref) {
      var _this4 = this;

      var category = _ref.category,
          row = _ref.row,
          column = _ref.column;
      var perLine = this.props.perLine;
      var categoryIndex = this.categories.findIndex(function (_ref2) {
        var id = _ref2.id;
        return id === category;
      });

      var getLastEmojiIndex = function getLastEmojiIndex(categoryIndex) {
        var emojisInCategory = _this4.getEmojisInCategory(categoryIndex);

        var lastEmojiIndex = emojisInCategory.length - 1;
        return lastEmojiIndex;
      };

      var newRow;
      var newColumn;
      var newCategoryIndex = categoryIndex;
      var emojiIndex;
      var lastEmojiIndex = getLastEmojiIndex(categoryIndex);

      switch (e.key) {
        case 'Enter':
          this.handleEmojiSelect(currentEmoji);
          e.stopPropagation();
          return;

        case 'Tab':
          // Focus on first category anchor
          this.anchors.buttons.firstChild.focus();
          this.setState({
            emoji: null
          });
          return;

        case 'ArrowLeft':
          newRow = row;
          newColumn = column - 1; // Get Emoji at (row, column - 1) or (row - 1, lastColumn)

          emojiIndex = this.getEmojiIndex(newRow, newColumn);

          if (emojiIndex < 0) {
            newCategoryIndex = categoryIndex - 1;

            if (newCategoryIndex < 1) {
              return;
            } // Get last Emoji in previous category


            emojiIndex = getLastEmojiIndex(newCategoryIndex);
          }

          break;

        case 'ArrowUp':
          newRow = row - 1;
          newColumn = column; // Get Emoji at (row - 1, column)

          emojiIndex = this.getEmojiIndex(newRow, newColumn);

          if (emojiIndex < 0) {
            newCategoryIndex = categoryIndex - 1;

            if (newCategoryIndex < 1) {
              return;
            }

            var numOfItemsOnLastRow = this.getEmojisInCategory(newCategoryIndex).length % perLine;

            if (numOfItemsOnLastRow === 0) {
              // If last row of previous category is full
              // Get Emoji in previous category at (lastRow, column)
              newRow = Math.floor(this.getEmojisInCategory(newCategoryIndex).length / perLine) - 1;
              emojiIndex = this.getEmojiIndex(newRow, newColumn);
            } else if (newColumn >= numOfItemsOnLastRow) {
              // If last row of previous category doesn't have items above current item
              // Get last Emoji in previous category
              emojiIndex = getLastEmojiIndex(newCategoryIndex);
            } else {
              // If last row of previous category has items above current item
              // Get Emoji in previous category at (lastRow, column)
              newRow = Math.floor(this.getEmojisInCategory(newCategoryIndex).length / perLine);
              emojiIndex = this.getEmojiIndex(newRow, newColumn);
            }
          }

          break;

        case 'ArrowRight':
          newRow = row;
          newColumn = column + 1; // Get Emoji at (row, column + 1) or on (row + 1, 0)

          emojiIndex = this.getEmojiIndex(newRow, newColumn);

          if (emojiIndex > lastEmojiIndex) {
            newCategoryIndex = categoryIndex + 1;

            if (newCategoryIndex >= this.categories.length) {
              return;
            } // Get first Emoji in next category


            emojiIndex = 0;
          }

          break;

        case 'ArrowDown':
          newRow = row + 1;
          newColumn = column; // Get Emoji at (row + 1, column)

          emojiIndex = this.getEmojiIndex(newRow, newColumn);

          if (emojiIndex > lastEmojiIndex) {
            newCategoryIndex = categoryIndex + 1;

            if (newCategoryIndex >= this.categories.length) {
              return;
            } // Get Emoji in next category at (0, column)


            emojiIndex = this.getEmojiIndex(0, newColumn);
          }

          break;

        default:
          return;
      }

      e.preventDefault();
      e.stopPropagation();
      var emojiEl = this.getEmojiElement(newCategoryIndex, emojiIndex);
      emojiEl.focus();
      this.getEmojiToPreview(newCategoryIndex, emojiIndex);
      clearTimeout(this.leaveTimeout);
    }
  }, {
    key: "handleEmojiClick",
    value: function handleEmojiClick(emoji, e) {
      this.props.onClick(emoji, e);
      this.handleEmojiSelect(emoji);
    }
  }, {
    key: "handleEmojiSelect",
    value: function handleEmojiSelect(emoji) {
      var _this5 = this;

      this.props.onSelect(emoji);
      if (!this.hideRecent && !this.props.recent) _frequently["default"].add(emoji);
      var component = this.categoryRefs['category-1'];

      if (component) {
        var maxMargin = component.maxMargin;

        if (this.props.enableFrequentEmojiSort) {
          component.forceUpdate();
        }

        requestAnimationFrame(function () {
          if (!_this5.scroll) return;
          component.memoizeSize();
          if (maxMargin == component.maxMargin) return;

          _this5.updateCategoriesSize();

          _this5.handleScrollPaint();

          if (_this5.SEARCH_CATEGORY.emojis) {
            component.updateDisplay('none');
          }
        });
      }
    }
  }, {
    key: "handleScroll",
    value: function handleScroll() {
      if (!this.waitingForPaint) {
        this.waitingForPaint = true;
        requestAnimationFrame(this.handleScrollPaint);
      }
    }
  }, {
    key: "handleScrollPaint",
    value: function handleScrollPaint() {
      this.waitingForPaint = false;

      if (!this.scroll) {
        return;
      }

      var activeCategory = null;

      if (this.SEARCH_CATEGORY.emojis) {
        activeCategory = this.SEARCH_CATEGORY;
      } else {
        var target = this.scroll,
            scrollTop = target.scrollTop,
            scrollingDown = scrollTop > (this.scrollTop || 0),
            minTop = 0;

        for (var i = 0, l = this.categories.length; i < l; i++) {
          var ii = scrollingDown ? this.categories.length - 1 - i : i,
              category = this.categories[ii],
              component = this.categoryRefs["category-".concat(ii)];

          if (component) {
            var active = component.handleScroll(scrollTop);

            if (!minTop || component.top < minTop) {
              if (component.top > 0) {
                minTop = component.top;
              }
            }

            if (active && !activeCategory) {
              activeCategory = category;
            }
          }
        }

        if (scrollTop < minTop) {
          activeCategory = this.categories.filter(function (category) {
            return !(category.anchor === false);
          })[0];
        } else if (scrollTop + this.clientHeight >= this.scrollHeight) {
          activeCategory = this.categories[this.categories.length - 1];
        }
      }

      if (activeCategory) {
        var anchors = this.anchors,
            _activeCategory = activeCategory,
            categoryName = _activeCategory.name;

        if (anchors.state.selected != categoryName) {
          anchors.setState({
            selected: categoryName
          });
        }
      }

      this.scrollTop = scrollTop;
    }
  }, {
    key: "handleSearch",
    value: function handleSearch(emojis) {
      this.SEARCH_CATEGORY.emojis = emojis;

      for (var i = 0, l = this.categories.length; i < l; i++) {
        var component = this.categoryRefs["category-".concat(i)];

        if (component && component.props.name != 'Search') {
          var display = emojis ? 'none' : 'inherit';
          component.updateDisplay(display);
        }
      }

      this.forceUpdate();

      if (this.scroll) {
        this.scroll.scrollTop = 0;
      }

      this.handleScroll();
    }
  }, {
    key: "handleAnchorClick",
    value: function handleAnchorClick(category, i) {
      var component = this.categoryRefs["category-".concat(i)],
          scroll = this.scroll,
          anchors = this.anchors,
          scrollToComponent = null;

      scrollToComponent = function scrollToComponent() {
        if (component) {
          var top = component.top;

          if (category.first) {
            top = 0;
          } else {
            top += 1;
          }

          scroll.scrollTop = top;
        }
      };

      if (this.SEARCH_CATEGORY.emojis) {
        this.handleSearch(null);
        this.search.clear();
        requestAnimationFrame(scrollToComponent);
      } else {
        scrollToComponent();
      }

      var emojiEl = this.getEmojiElement(i, 0);
      emojiEl.focus();
      this.getEmojiToPreview(i, 0);
    }
  }, {
    key: "handleSkinChange",
    value: function handleSkinChange(skin) {
      var newState = {
        skin: skin
      },
          onSkinChange = this.props.onSkinChange;
      this.setState(newState);

      _store["default"].update(newState);

      onSkinChange(skin);
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      var handled = false;

      switch (e.key) {
        case 'Enter':
          if (this.SEARCH_CATEGORY.emojis && this.SEARCH_CATEGORY.emojis.length) {
            var _emojiEl = this.getEmojiElement(0, 0);

            _emojiEl.focus();

            this.getEmojiToPreview(0, 0);
            handled = true;
          }

          break;

        case 'Escape':
          // Jump to search text input
          this.search.input.focus();
          handled = true;
          break;

        case 'ArrowDown':
          var activeCategory = this.anchors.state.selected;
          var activeCategoryIndex = this.categories.findIndex(function (_ref3) {
            var name = _ref3.name;
            return name === activeCategory;
          });
          var emojiEl = this.getEmojiElement(activeCategoryIndex, 0);
          emojiEl.focus();
          this.getEmojiToPreview(activeCategoryIndex, 0);
          handled = true;
          break;

        default:
          break;
      }

      if (handled) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }, {
    key: "updateCategoriesSize",
    value: function updateCategoriesSize() {
      for (var i = 0, l = this.categories.length; i < l; i++) {
        var component = this.categoryRefs["category-".concat(i)];
        if (component) component.memoizeSize();
      }

      if (this.scroll) {
        var target = this.scroll;
        this.scrollHeight = target.scrollHeight;
        this.clientHeight = target.clientHeight;
      }
    }
  }, {
    key: "getCategories",
    value: function getCategories() {
      return this.state.firstRender ? this.categories.slice(0, 3) : this.categories;
    }
  }, {
    key: "setAnchorsRef",
    value: function setAnchorsRef(c) {
      this.anchors = c;
    }
  }, {
    key: "setSearchRef",
    value: function setSearchRef(c) {
      this.search = c;
    }
  }, {
    key: "setPreviewRef",
    value: function setPreviewRef(c) {
      this.preview = c;
    }
  }, {
    key: "setScrollRef",
    value: function setScrollRef(c) {
      this.scroll = c;
    }
  }, {
    key: "setCategoryRef",
    value: function setCategoryRef(name, c) {
      if (!this.categoryRefs) {
        this.categoryRefs = {};
      }

      this.categoryRefs[name] = c;
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$props = this.props,
          perLine = _this$props.perLine,
          emojiSize = _this$props.emojiSize,
          set = _this$props.set,
          sheetSize = _this$props.sheetSize,
          sheetColumns = _this$props.sheetColumns,
          sheetRows = _this$props.sheetRows,
          style = _this$props.style,
          title = _this$props.title,
          idleEmoji = _this$props.emoji,
          color = _this$props.color,
          _native = _this$props["native"],
          backgroundImageFn = _this$props.backgroundImageFn,
          emojisToShowFilter = _this$props.emojisToShowFilter,
          showPreview = _this$props.showPreview,
          showSkinTones = _this$props.showSkinTones,
          emojiTooltip = _this$props.emojiTooltip,
          useButton = _this$props.useButton,
          include = _this$props.include,
          exclude = _this$props.exclude,
          recent = _this$props.recent,
          autoFocus = _this$props.autoFocus,
          skinEmoji = _this$props.skinEmoji,
          notFound = _this$props.notFound,
          notFoundEmoji = _this$props.notFoundEmoji;
      var emoji = this.state.emoji;
      var pickerId = 'emoji-mart-picker';
      var width = perLine * (emojiSize + 12) + 12 + 2 + (0, _utils.measureScrollbar)();
      var theme = this.getPreferredTheme();
      var skin = this.props.skin || this.state.skin || _store["default"].get('skin') || this.props.defaultSkin;
      return /*#__PURE__*/_react["default"].createElement("section", {
        style: _objectSpread({
          width: width
        }, style),
        className: "emoji-mart emoji-mart-".concat(theme),
        "aria-label": title,
        onKeyDown: this.handleKeyDown
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "emoji-mart-bar"
      }, /*#__PURE__*/_react["default"].createElement(_anchors["default"], {
        ref: this.setAnchorsRef,
        data: this.data,
        i18n: this.i18n,
        color: color,
        categories: this.categories,
        onAnchorClick: this.handleAnchorClick,
        icons: this.icons
      })), /*#__PURE__*/_react["default"].createElement(_search["default"], {
        ref: this.setSearchRef,
        onSearch: this.handleSearch,
        data: this.data,
        i18n: this.i18n,
        emojisToShowFilter: emojisToShowFilter,
        emoji: emoji,
        include: include,
        exclude: exclude,
        custom: this.CUSTOM,
        autoFocus: autoFocus,
        pickerId: pickerId
      }), /*#__PURE__*/_react["default"].createElement("div", {
        id: pickerId,
        ref: this.setScrollRef,
        className: "emoji-mart-scroll",
        onScroll: this.handleScroll
      }, this.getCategories().map(function (category, i) {
        return /*#__PURE__*/_react["default"].createElement(_category["default"], {
          ref: _this6.setCategoryRef.bind(_this6, "category-".concat(i)),
          key: category.name,
          id: category.id,
          name: category.name,
          emojis: category.emojis,
          perLine: perLine,
          "native": _native,
          hasStickyPosition: _this6.hasStickyPosition,
          data: _this6.data,
          i18n: _this6.i18n,
          recent: category.id == _this6.RECENT_CATEGORY.id ? recent : undefined,
          custom: category.id == _this6.RECENT_CATEGORY.id ? _this6.CUSTOM : undefined,
          emojiProps: {
            "native": _native,
            skin: skin,
            size: emojiSize,
            set: set,
            sheetSize: sheetSize,
            sheetColumns: sheetColumns,
            sheetRows: sheetRows,
            forceSize: _native,
            tooltip: emojiTooltip,
            backgroundImageFn: backgroundImageFn,
            useButton: useButton,
            onOver: _this6.handleEmojiOver,
            onLeave: _this6.handleEmojiLeave,
            onClick: _this6.handleEmojiClick,
            onKeyDown: _this6.handleEmojiKeyDown
          },
          notFound: notFound,
          notFoundEmoji: notFoundEmoji
        });
      })), (showPreview || showSkinTones) && /*#__PURE__*/_react["default"].createElement("div", {
        className: "emoji-mart-bar"
      }, /*#__PURE__*/_react["default"].createElement(_preview["default"], {
        ref: this.setPreviewRef,
        data: this.data,
        title: title,
        emoji: emoji,
        idleEmoji: idleEmoji,
        onShowPreview: this.props.onShowPreview,
        onHidePreview: this.props.onHidePreview,
        showSkinTones: showSkinTones,
        showPreview: showPreview,
        emojiProps: {
          "native": _native,
          size: 38,
          skin: skin,
          set: set,
          sheetSize: sheetSize,
          sheetColumns: sheetColumns,
          sheetRows: sheetRows,
          backgroundImageFn: backgroundImageFn
        },
        skinsProps: {
          skin: skin,
          onChange: this.handleSkinChange,
          skinEmoji: skinEmoji
        },
        i18n: this.i18n
      })));
    }
  }]);
  return NimblePicker;
}(_react["default"].PureComponent);

NimblePicker.propTypes
/* remove-proptypes */
= _objectSpread(_objectSpread({}, _sharedProps.PickerPropTypes), {}, {
  data: _propTypes["default"].object.isRequired
});
NimblePicker.defaultProps = _objectSpread({}, _sharedDefaultProps.PickerDefaultProps);
var _default = NimblePicker;
exports["default"] = _default;