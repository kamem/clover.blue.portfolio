/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactRedux = __webpack_require__(4);

	var _reactRouter = __webpack_require__(5);

	var _history = __webpack_require__(6);

	var _configureStore = __webpack_require__(7);

	var _configureStore2 = _interopRequireDefault(_configureStore);

	var _Main = __webpack_require__(17);

	var _Main2 = _interopRequireDefault(_Main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var store = (0, _configureStore2.default)();

	// Components

	var history = (0, _reactRouter.useRouterHistory)(_history.createHashHistory)({ queryKey: false });

	(0, _reactDom.render)(_react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(
	        _reactRouter.Router,
	        { history: history },
	        _react2.default.createElement(_reactRouter.Route, { path: '/', category: 'top', component: _Main2.default })
	    )
	), document.getElementById('root'));

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = React;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = ReactDOM;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = ReactRedux;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = ReactRouter;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = History;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = configureStore;

	var _redux = __webpack_require__(8);

	var _reduxThunk = __webpack_require__(9);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reducer = __webpack_require__(10);

	var _reducer2 = _interopRequireDefault(_reducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function configureStore(initialState) {
	    var createStoreWithMiddleware = (0, _redux.compose)((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : function (f) {
	        return f;
	    })(_redux.createStore);

	    var store = createStoreWithMiddleware(_reducer2.default);
	    return store;
	}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = Redux;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	function thunkMiddleware(_ref) {
	  var dispatch = _ref.dispatch;
	  var getState = _ref.getState;

	  return function (next) {
	    return function (action) {
	      return typeof action === 'function' ? action(dispatch, getState) : next(action);
	    };
	  };
	}

	module.exports = thunkMiddleware;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(8);

	var _OekakiCanvasActionsReducer = __webpack_require__(11);

	var _OekakiCanvasActionsReducer2 = _interopRequireDefault(_OekakiCanvasActionsReducer);

	var _ConfirmModalActionsReducer = __webpack_require__(13);

	var _ConfirmModalActionsReducer2 = _interopRequireDefault(_ConfirmModalActionsReducer);

	var _OekakiWindowActionsReducer = __webpack_require__(15);

	var _OekakiWindowActionsReducer2 = _interopRequireDefault(_OekakiWindowActionsReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
	    OekakiCanvasActionsReducer: _OekakiCanvasActionsReducer2.default,
	    ConfirmModalActionsReducer: _ConfirmModalActionsReducer2.default,
	    OekakiWindowActionsReducer: _OekakiWindowActionsReducer2.default
	});

	exports.default = rootReducer;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = OekakiCanvasActionsReducer;

	var _OekakiCanvasActions = __webpack_require__(12);

	var ActionTypes = _interopRequireWildcard(_OekakiCanvasActions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var initialState = {
	  stage: {},
	  oekaki: {},
	  history: {},
	  mini: {},
	  miniOekaki: {},
	  x_miniOekaki: {},
	  layers: [],
	  colors: []
	};

	function OekakiCanvasActionsReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  switch (action.type) {
	    case ActionTypes.CHANGE_HISTORY:
	      return Object.assign({}, state, {
	        history: action.history
	      });
	    case ActionTypes.CHANGE_STAGE:
	      return Object.assign({}, state, {
	        stage: action.stage
	      });
	    case ActionTypes.CHANGE_LAYERS:
	      return Object.assign({}, state, {
	        layers: action.layers
	      });

	    case ActionTypes.CHANGE_OEKAKI:
	      return Object.assign({}, state, {
	        oekaki: action.oekaki
	      });

	    case ActionTypes.CHANGE_MINI_OEKAKI:
	      return Object.assign({}, state, {
	        miniOekaki: action.miniOekaki
	      });
	    case ActionTypes.CHANGE_X_MINI_OEKAKI:
	      return Object.assign({}, state, {
	        x_miniOekaki: action.x_miniOekaki
	      });

	    case ActionTypes.CHANGE_COLORS:
	      return Object.assign({}, state, {
	        colors: action.colors
	      });

	    default:
	      return state;
	  }
	}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.changeHistory = changeHistory;
	exports.changeStage = changeStage;
	exports.changeLayers = changeLayers;
	exports.changeOekaki = changeOekaki;
	exports.changeMiniOekaki = changeMiniOekaki;
	exports.changeXminiOekaki = changeXminiOekaki;
	exports.changeColors = changeColors;
	var CHANGE_HISTORY = exports.CHANGE_HISTORY = "CHANGE_HISTORY";
	function changeHistory(history) {
	    return {
	        type: CHANGE_HISTORY,
	        history: history
	    };
	}

	var CHANGE_STAGE = exports.CHANGE_STAGE = "CHANGE_STAGE";
	function changeStage(stage) {
	    return {
	        type: CHANGE_STAGE,
	        stage: stage
	    };
	}

	var CHANGE_LAYERS = exports.CHANGE_LAYERS = "CHANGE_LAYERS";
	function changeLayers(layers) {
	    return {
	        type: CHANGE_LAYERS,
	        layers: layers
	    };
	}

	var CHANGE_OEKAKI = exports.CHANGE_OEKAKI = "CHANGE_OEKAKI";
	function changeOekaki(oekaki) {
	    return {
	        type: CHANGE_OEKAKI,
	        oekaki: oekaki
	    };
	}

	var CHANGE_MINI_OEKAKI = exports.CHANGE_MINI_OEKAKI = "CHANGE_MINI_OEKAKI";
	function changeMiniOekaki(miniOekaki) {
	    return {
	        type: CHANGE_MINI_OEKAKI,
	        miniOekaki: miniOekaki
	    };
	}

	var CHANGE_X_MINI_OEKAKI = exports.CHANGE_X_MINI_OEKAKI = "CHANGE_X_MINI_OEKAKI";
	function changeXminiOekaki(x_miniOekaki) {
	    return {
	        type: CHANGE_X_MINI_OEKAKI,
	        x_miniOekaki: x_miniOekaki
	    };
	}

	var CHANGE_COLORS = exports.CHANGE_COLORS = "CHANGE_COLORS";
	function changeColors(colors) {
	    return {
	        type: CHANGE_COLORS,
	        colors: colors
	    };
	}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = ConfirmModalActionsReducer;

	var _ConfirmModalActions = __webpack_require__(14);

	var ActionTypes = _interopRequireWildcard(_ConfirmModalActions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var initialState = {
	    isVisible: false,
	    title: null,
	    body: null,
	    showCancelBtn: true,
	    callback: function callback() {}
	};

	function ConfirmModalActionsReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];

	    switch (action.type) {
	        case ActionTypes.SHOW_CONFIRM_MODAL:
	            return Object.assign({}, state, {
	                isVisible: true,
	                size: action.size,
	                title: action.title,
	                body: action.body,
	                callback: action.callback || function () {},
	                showCancelBtn: action.showCancelBtn
	            });
	        case ActionTypes.HIDE_CONFIRM_MODAL:
	            return Object.assign({}, state, {
	                isVisible: false,
	                title: null,
	                body: null,
	                showCancelBtn: true,
	                callback: function callback() {}
	            });

	        default:
	            return state;
	    }
	}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.showModal = showModal;
	exports.hideModal = hideModal;
	var SHOW_CONFIRM_MODAL = exports.SHOW_CONFIRM_MODAL = "SHOW_CONFIRM_MODAL";
	var HIDE_CONFIRM_MODAL = exports.HIDE_CONFIRM_MODAL = "HIDE_CONFIRM_MODAL";

	function showModal(_ref) {
	    var size = _ref.size,
	        title = _ref.title,
	        body = _ref.body,
	        callback = _ref.callback,
	        _ref$showCancelBtn = _ref.showCancelBtn,
	        showCancelBtn = _ref$showCancelBtn === undefined ? true : _ref$showCancelBtn;

	    return {
	        type: SHOW_CONFIRM_MODAL,
	        size: size,
	        title: title,
	        body: body,
	        callback: callback,
	        showCancelBtn: showCancelBtn
	    };
	}

	function hideModal() {
	    return {
	        type: HIDE_CONFIRM_MODAL
	    };
	}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = OekakiWindowActionsReducer;

	var _OekakiWindowActions = __webpack_require__(16);

	var ActionTypes = _interopRequireWildcard(_OekakiWindowActions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var initialState = {
	  zIndex: parseInt(localStorage['window_zindex']) || 0
	};

	function OekakiWindowActionsReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  switch (action.type) {
	    case ActionTypes.CHENGE_WINDOW_Z_INDEX:
	      {
	        return Object.assign({}, state, {
	          zIndex: action.zIndex
	        });
	      }

	    default:
	      return state;
	  }
	}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.changeZindex = changeZindex;
	var CHENGE_WINDOW_Z_INDEX = exports.CHENGE_WINDOW_Z_INDEX = "CHENGE_WINDOW_Z_INDEX";
	function changeZindex(zIndex) {
	    return {
	        type: CHENGE_WINDOW_Z_INDEX,
	        zIndex: zIndex
	    };
	}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _lodash = __webpack_require__(18);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(8);

	var _reactRedux = __webpack_require__(4);

	var _Cards = __webpack_require__(19);

	var _Cards2 = _interopRequireDefault(_Cards);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Components


	var Main = function (_React$Component) {
		_inherits(Main, _React$Component);

		function Main() {
			_classCallCheck(this, Main);

			return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
		}

		_createClass(Main, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				var _this2 = this;

				this.setState({
					width: window.innerWidth,
					height: window.innerHeight
				});

				window.addEventListener('resize', function () {
					_this2.setState({
						width: window.innerWidth,
						height: window.innerHeight
					});
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				var children = _react2.default.Children.map(this.props.children, function (child) {
					return _react2.default.cloneElement(child, { category: _this3.props.route.category });
				});

				var category = this.props.route.category;
				var _state = this.state,
				    width = _state.width,
				    height = _state.height;

				var test = 'test';
				return _react2.default.createElement(
					'main',
					{ id: 'main' },
					_react2.default.createElement(
						'article',
						null,
						children,
						_react2.default.createElement(_Cards2.default, {
							category: category,
							width: width,
							height: height
						})
					)
				);
			}
		}]);

		return Main;
	}(_react2.default.Component);

	function mapStateToProps(state) {
		return {};
	}

	function mapDispatchToProps(dispatch) {
		return {};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Main);

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = _;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Card = exports.Cards = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(18);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _redux = __webpack_require__(8);

	var _reactRedux = __webpack_require__(4);

	var _animation = __webpack_require__(22);

	var _animation2 = _interopRequireDefault(_animation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// utils

	// Actions

	// Components

	// styles


	var Cards = exports.Cards = function (_React$Component) {
		_inherits(Cards, _React$Component);

		function Cards() {
			_classCallCheck(this, Cards);

			return _possibleConstructorReturn(this, (Cards.__proto__ || Object.getPrototypeOf(Cards)).apply(this, arguments));
		}

		_createClass(Cards, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.setState({
					marks: {
						spade: '♠',
						heart: '♥',
						clover: '♣',
						dia: '♦'
					}
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props = this.props,
				    category = _props.category,
				    width = _props.width,
				    height = _props.height;


				return _react2.default.createElement(
					'ul',
					{ className: (0, _classnames2.default)(_animation2.default[category], _animation2.default.cards)
					},
					function () {
						var cards = [];
						_lodash2.default.each(_this2.state.marks, function (mark, name) {
							for (var i = 1; i <= 13; i++) {
								cards.push(_react2.default.createElement(Card, {
									mark: mark,
									name: name,
									num: i,

									key: name + i
								}));
							}
						});
						return cards;
					}()
				);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {}
		}]);

		return Cards;
	}(_react2.default.Component);

	var Card = exports.Card = function (_React$Component2) {
		_inherits(Card, _React$Component2);

		function Card() {
			_classCallCheck(this, Card);

			return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
		}

		_createClass(Card, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.setState({
					selected: false
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this4 = this;

				var _props2 = this.props,
				    mark = _props2.mark,
				    num = _props2.num,
				    name = _props2.name;
				var selected = this.state.selected;


				return _react2.default.createElement(
					'li',
					{ className: (0, _classnames2.default)(_defineProperty({}, _animation2.default.selected, selected), _animation2.default.card, _animation2.default[name], _animation2.default[mark + '_' + num], _animation2.default['num_' + num], 'card', mark, mark + '_' + num, 'num_' + num),
						onClick: function onClick() {
							return _this4.setState({ selected: !selected });
						}
					},
					_react2.default.createElement(
						'div',
						{ className: (0, _classnames2.default)(_animation2.default.inner, 'inner') },
						_react2.default.createElement(
							'div',
							{ className: 'front' },
							_react2.default.createElement(
								'i',
								{ className: 'mark' },
								mark
							)
						),
						_react2.default.createElement('div', { className: 'back' })
					)
				);
			}
		}]);

		return Card;
	}(_react2.default.Component);

	function mapStateToProps(state) {
		return {};
	}

	function mapDispatchToProps(dispatch) {
		return {};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Cards);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames() {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

				if (argType === 'string' || argType === 'number') {
					classes.push(this && this[arg] || arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(this, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(this && this[key] || key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if ("function" === 'function' && _typeof(__webpack_require__(21)) === 'object' && __webpack_require__(21)) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	})();

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(23);
	if (typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(25)(content, {});
	if (content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if (false) {
		// When the styles change, update the <style> tags
		if (!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js?modules&localIdentName=[name]__[local]___[hash:base64:5]!../../node_modules/postcss-loader/index.js!./animation.css", function () {
				var newContent = require("!!../../node_modules/css-loader/index.js?modules&localIdentName=[name]__[local]___[hash:base64:5]!../../node_modules/postcss-loader/index.js!./animation.css");
				if (typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function () {
			update();
		});
	}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, ".animation__cards___3TqmX {\n\twidth: 100%;\n\theight: 100%;\n}\n\n.animation__card___31xSx {\n\t-webkit-transform-origin: 50% calc(356px + 500px);\n\t        transform-origin: 50% calc(356px + 500px);\n\tmargin: auto;\n\ttop: calc(356px / -2 - 500px);\n\tright: 0;\n\tbottom: calc(356px / 2 + 500px);\n\tleft: 0;\n\n\ttransition-property: all;\n\ttransition-duration:1s;\n\ttransition-timing-function: ease-in-out\n}\n\n.animation__card___31xSx:not(.animation__selected___2L6jR):hover .animation__inner___2Nr5J {\n\t-webkit-transform: rotateY( 180deg );\n\ttransform: rotateY( 180deg );\n}\n\n.animation__name___Emkpz {\n}\n\n.animation__top___3wqo6 .animation__card___31xSx {\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(1):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 1 * 4)) scale(calc(1 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 1 * 4)) scale(calc(1 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(2):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 2 * 4)) scale(calc(2 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 2 * 4)) scale(calc(2 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(3):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 3 * 4)) scale(calc(3 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 3 * 4)) scale(calc(3 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(4):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 4 * 4)) scale(calc(4 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 4 * 4)) scale(calc(4 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(5):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 5 * 4)) scale(calc(5 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 5 * 4)) scale(calc(5 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(6):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 6 * 4)) scale(calc(6 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 6 * 4)) scale(calc(6 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(7):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 7 * 4)) scale(calc(7 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 7 * 4)) scale(calc(7 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(8):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 8 * 4)) scale(calc(8 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 8 * 4)) scale(calc(8 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(9):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 9 * 4)) scale(calc(9 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 9 * 4)) scale(calc(9 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(10):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 10 * 4)) scale(calc(10 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 10 * 4)) scale(calc(10 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(11):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 11 * 4)) scale(calc(11 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 11 * 4)) scale(calc(11 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(12):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 12 * 4)) scale(calc(12 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 12 * 4)) scale(calc(12 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(13):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 13 * 4)) scale(calc(13 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 13 * 4)) scale(calc(13 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(14):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 14 * 4)) scale(calc(14 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 14 * 4)) scale(calc(14 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(15):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 15 * 4)) scale(calc(15 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 15 * 4)) scale(calc(15 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(16):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 16 * 4)) scale(calc(16 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 16 * 4)) scale(calc(16 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(17):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 17 * 4)) scale(calc(17 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 17 * 4)) scale(calc(17 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(18):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 18 * 4)) scale(calc(18 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 18 * 4)) scale(calc(18 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(19):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 19 * 4)) scale(calc(19 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 19 * 4)) scale(calc(19 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(20):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 20 * 4)) scale(calc(20 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 20 * 4)) scale(calc(20 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(21):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 21 * 4)) scale(calc(21 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 21 * 4)) scale(calc(21 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(22):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 22 * 4)) scale(calc(22 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 22 * 4)) scale(calc(22 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(23):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 23 * 4)) scale(calc(23 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 23 * 4)) scale(calc(23 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(24):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 24 * 4)) scale(calc(24 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 24 * 4)) scale(calc(24 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(25):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 25 * 4)) scale(calc(25 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 25 * 4)) scale(calc(25 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(26):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 26 * 4)) scale(calc(26 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 26 * 4)) scale(calc(26 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(27):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 27 * 4)) scale(calc(27 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 27 * 4)) scale(calc(27 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(28):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 28 * 4)) scale(calc(28 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 28 * 4)) scale(calc(28 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(29):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 29 * 4)) scale(calc(29 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 29 * 4)) scale(calc(29 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(30):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 30 * 4)) scale(calc(30 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 30 * 4)) scale(calc(30 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(31):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 31 * 4)) scale(calc(31 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 31 * 4)) scale(calc(31 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(32):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 32 * 4)) scale(calc(32 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 32 * 4)) scale(calc(32 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(33):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 33 * 4)) scale(calc(33 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 33 * 4)) scale(calc(33 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(34):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 34 * 4)) scale(calc(34 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 34 * 4)) scale(calc(34 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(35):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 35 * 4)) scale(calc(35 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 35 * 4)) scale(calc(35 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(36):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 36 * 4)) scale(calc(36 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 36 * 4)) scale(calc(36 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(37):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 37 * 4)) scale(calc(37 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 37 * 4)) scale(calc(37 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(38):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 38 * 4)) scale(calc(38 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 38 * 4)) scale(calc(38 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(39):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 39 * 4)) scale(calc(39 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 39 * 4)) scale(calc(39 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(40):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 40 * 4)) scale(calc(40 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 40 * 4)) scale(calc(40 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(41):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 41 * 4)) scale(calc(41 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 41 * 4)) scale(calc(41 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(42):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 42 * 4)) scale(calc(42 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 42 * 4)) scale(calc(42 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(43):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 43 * 4)) scale(calc(43 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 43 * 4)) scale(calc(43 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(44):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 44 * 4)) scale(calc(44 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 44 * 4)) scale(calc(44 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(45):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 45 * 4)) scale(calc(45 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 45 * 4)) scale(calc(45 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(46):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 46 * 4)) scale(calc(46 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 46 * 4)) scale(calc(46 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(47):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 47 * 4)) scale(calc(47 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 47 * 4)) scale(calc(47 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(48):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 48 * 4)) scale(calc(48 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 48 * 4)) scale(calc(48 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(49):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 49 * 4)) scale(calc(49 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 49 * 4)) scale(calc(49 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(50):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 50 * 4)) scale(calc(50 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 50 * 4)) scale(calc(50 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(51):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 51 * 4)) scale(calc(51 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 51 * 4)) scale(calc(51 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__card___31xSx:nth-child(52):not(.animation__selected___2L6jR) {\n\t-webkit-transform: rotate(calc((360deg / 52) * 52 * 4)) scale(calc(52 * (100 / 52) / 180 + 0.05));\n\ttransform: rotate(calc((360deg / 52) * 52 * 4)) scale(calc(52 * (100 / 52) / 180 + 0.05));\n}\n\n.animation__top___3wqo6 .animation__selected___2L6jR {\n\t-webkit-transform-origin: 50%;\n\ttransform-origin: 50%;\n\t-webkit-transform: rotate(0) rotateY( 0 );\n\ttransform: rotate(0) rotateY( 0 );\n\ttop: 0;\n\tbottom: 0;\n\tz-index: 1;\n}\n", ""]);

	// exports
	exports.locals = {
		"cards": "animation__cards___3TqmX",
		"card": "animation__card___31xSx",
		"selected": "animation__selected___2L6jR",
		"inner": "animation__inner___2Nr5J",
		"name": "animation__name___Emkpz",
		"top": "animation__top___3wqo6"
	};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ })
/******/ ]);