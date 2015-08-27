webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rc-collapse/assets/index.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	__webpack_require__(2);
	var Collapse = __webpack_require__(3);
	var Panel = Collapse.Panel;
	var React = __webpack_require__(7);
	
	var text = '\n  A dog is a type of domesticated animal.\n  Known for its loyalty and faithfulness,\n  it can be found as a welcome guest in many households across the world.\n';
	
	function random() {
	  return parseInt(Math.random() * 10) + 1;
	}
	
	var Test = React.createClass({
	  displayName: 'Test',
	
	  getInitialState: function getInitialState() {
	    return {
	      time: random(),
	      accordion: false
	    };
	  },
	
	  getItems: function getItems() {
	    var items = [];
	    for (var i = 0, len = 3; i < len; i++) {
	      var key = i + 1;
	      items.push(React.createElement(
	        Panel,
	        { header: 'This is panel header ' + key, key: key },
	        React.createElement(
	          'p',
	          null,
	          text.repeat(this.state.time)
	        )
	      ));
	    }
	    items.push(React.createElement(
	      Panel,
	      { header: 'This is panel header 4', key: '4' },
	      React.createElement(
	        Collapse,
	        { defaultActiveKey: '1' },
	        React.createElement(
	          Panel,
	          { header: 'This is panel nest panel', key: '1' },
	          React.createElement(
	            'p',
	            null,
	            text
	          )
	        )
	      )
	    ));
	
	    return items;
	  },
	
	  toggle: function toggle() {
	    this.setState({ accordion: !this.state.accordion });
	  },
	
	  reRender: function reRender() {
	    this.setState({ time: random() });
	  },
	
	  setActivityKey: function setActivityKey() {
	    this.setState({ activeKey: ['2'] });
	  },
	
	  render: function render() {
	    var accordion = this.state.accordion;
	    var btn = accordion ? 'accordion' : 'collapse';
	    var activeKey = this.state.activeKey;
	    return React.createElement(
	      'div',
	      { style: { margin: 20, width: 400 } },
	      React.createElement(
	        'button',
	        { onClick: this.reRender },
	        'reRender'
	      ),
	      React.createElement(
	        'button',
	        { onClick: this.toggle },
	        btn
	      ),
	      React.createElement('br', null),
	      React.createElement('br', null),
	      React.createElement(
	        'button',
	        { onClick: this.setActivityKey },
	        'active header 2'
	      ),
	      React.createElement('br', null),
	      React.createElement('br', null),
	      React.createElement(
	        Collapse,
	        { accordion: accordion, activeKey: activeKey, defaultActiveKey: ['4'] },
	        this.getItems()
	      )
	    );
	  }
	});
	
	React.render(React.createElement(Test, null), document.getElementById('__react-content'));

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*! http://mths.be/repeat v0.2.0 by @mathias */
	if (!String.prototype.repeat) {
		(function() {
			'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
			var defineProperty = (function() {
				// IE 8 only supports `Object.defineProperty` on DOM elements
				try {
					var object = {};
					var $defineProperty = Object.defineProperty;
					var result = $defineProperty(object, object, object) && $defineProperty;
				} catch(error) {}
				return result;
			}());
			var repeat = function(count) {
				if (this == null) {
					throw TypeError();
				}
				var string = String(this);
				// `ToInteger`
				var n = count ? Number(count) : 0;
				if (n != n) { // better `isNaN`
					n = 0;
				}
				// Account for out-of-bounds indices
				if (n < 0 || n == Infinity) {
					throw RangeError();
				}
				var result = '';
				while (n) {
					if (n % 2 == 1) {
						result += string;
					}
					if (n > 1) {
						string += string;
					}
					n >>= 1;
				}
				return result;
			};
			if (defineProperty) {
				defineProperty(String.prototype, 'repeat', {
					'value': repeat,
					'configurable': true,
					'writable': true
				});
			} else {
				String.prototype.repeat = repeat;
			}
		}());
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(4);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// export this package's api
	'use strict';
	
	module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./Collapse\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	module.exports.Panel = __webpack_require__(6);

/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var React = __webpack_require__(7);
	var PropTypes = React.PropTypes;
	var createClass = React.createClass;
	var findDOMNode = React.findDOMNode;
	
	var classnames = __webpack_require__(8);
	var cssAnimation = __webpack_require__(9);
	var event = __webpack_require__(10);
	var isSupportCssAnimate = event.endEvents.length > 0;
	
	module.exports = createClass({
	
	  displayName: 'CollapsePanel',
	
	  propTypes: {
	    prefixCls: PropTypes.string,
	    header: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
	    isActive: PropTypes.bool,
	    onItemClick: PropTypes.func
	  },
	
	  getInitialState: function getInitialState() {
	    return { isActive: this.props.isActive };
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      isActive: false,
	      onItemClick: function onItemClick() {}
	    };
	  },
	
	  handleItemClick: function handleItemClick() {
	    this.props.onItemClick();
	  },
	
	  render: function render() {
	    var _classnames, _classnames2;
	
	    var _props = this.props;
	    var prefixCls = _props.prefixCls;
	    var header = _props.header;
	    var children = _props.children;
	    var isActive = _props.isActive;
	
	    var headerCls = prefixCls + '-header';
	    var contentCls = classnames((_classnames = {}, _defineProperty(_classnames, prefixCls + '-content', true), _defineProperty(_classnames, prefixCls + '-content-active', isActive), _classnames));
	    var itemCls = classnames((_classnames2 = {}, _defineProperty(_classnames2, prefixCls + '-item', true), _defineProperty(_classnames2, prefixCls + '-item-active', isActive), _classnames2));
	
	    return React.createElement(
	      'div',
	      { className: itemCls },
	      React.createElement(
	        'div',
	        { className: headerCls, onClick: this.handleItemClick,
	          role: 'tab', 'aria-expanded': isActive },
	        React.createElement('i', { className: 'arrow' }),
	        header
	      ),
	      React.createElement(
	        'div',
	        { className: contentCls, ref: 'content', role: 'tabpanel' },
	        React.createElement(
	          'div',
	          { className: prefixCls + '-content-box' },
	          children
	        )
	      )
	    );
	  },
	
	  componentDidMount: function componentDidMount() {
	    if (this.props.isActive) {
	      var el = findDOMNode(this.refs.content);
	      el.style.height = 'auto';
	    }
	  },
	
	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    var isActive = this.props.isActive;
	
	    // no change
	    if (prevProps.isActive === isActive) {
	      return;
	    }
	
	    this._anim(isActive ? 0 : 1);
	  },
	
	  _anim: function _anim(opacity) {
	    var el = findDOMNode(this.refs.content);
	    if (!isSupportCssAnimate) {
	      el.style.height = opacity ? 0 : '';
	      return;
	    }
	
	    var scrollHeight = el.scrollHeight + 'px';
	    var collapsing = this.props.prefixCls + '-collapsing';
	
	    cssAnimation.addClass(el, collapsing);
	
	    // start state
	    el.style.height = opacity ? scrollHeight : 0;
	
	    cssAnimation.setTransition(el, 'Property', 'height');
	    cssAnimation.style(el, {
	      height: opacity ? 0 : scrollHeight
	    }, function () {
	      el.style.height = opacity ? 0 : 'auto';
	      cssAnimation.setTransition(el, 'Property', '');
	      cssAnimation.removeClass(el, collapsing);
	    });
	  }
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	
	(function () {
		'use strict';
	
		function classNames () {
	
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if ('string' === argType || 'number' === argType) {
					classes += ' ' + arg;
	
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
	
				} else if ('object' === argType) {
					for (var key in arg) {
						if (arg.hasOwnProperty(key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true){
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	
	}());


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Event = __webpack_require__(10);
	var Css = __webpack_require__(11);
	
	var cssAnimation = function cssAnimation(node, transitionName, callback) {
	  var className = transitionName;
	  var activeClassName = className + '-active';
	
	  if (node.rcEndListener) {
	    node.rcEndListener();
	  }
	
	  node.rcEndListener = function (e) {
	    if (e && e.target !== node) {
	      return;
	    }
	
	    if (node.rcAnimTimeout) {
	      clearTimeout(node.rcAnimTimeout);
	      node.rcAnimTimeout = null;
	    }
	
	    Css.removeClass(node, className);
	    Css.removeClass(node, activeClassName);
	
	    Event.removeEndEventListener(node, node.rcEndListener);
	    node.rcEndListener = null;
	
	    // Usually this optional callback is used for informing an owner of
	    // a leave animation and telling it to remove the child.
	    if (callback) {
	      callback();
	    }
	  };
	
	  Event.addEndEventListener(node, node.rcEndListener);
	
	  Css.addClass(node, className);
	
	  node.rcAnimTimeout = setTimeout(function () {
	    Css.addClass(node, activeClassName);
	    node.rcAnimTimeout = null;
	  }, 0);
	};
	
	cssAnimation.style = function (node, style, callback) {
	  if (node.rcEndListener) {
	    node.rcEndListener();
	  }
	
	  node.rcEndListener = function (e) {
	    if (e && e.target !== node) {
	      return;
	    }
	
	    if (node.rcAnimTimeout) {
	      clearTimeout(node.rcAnimTimeout);
	      node.rcAnimTimeout = null;
	    }
	
	    Event.removeEndEventListener(node, node.rcEndListener);
	    node.rcEndListener = null;
	
	    // Usually this optional callback is used for informing an owner of
	    // a leave animation and telling it to remove the child.
	    if (callback) {
	      callback();
	    }
	  };
	
	  Event.addEndEventListener(node, node.rcEndListener);
	
	  node.rcAnimTimeout = setTimeout(function () {
	    for (var s in style) {
	      node.style[s] = style[s];
	    }
	    node.rcAnimTimeout = null;
	  }, 0);
	};
	
	cssAnimation.setTransition = function (node, property, v) {
	  property = property || '';
	  ['Webkit', 'Moz', 'O',
	  // ms is special .... !
	  'ms'].forEach(function (prefix) {
	    node.style[prefix + 'Transition' + property] = v;
	  });
	};
	
	cssAnimation.addClass = Css.addClass;
	cssAnimation.removeClass = Css.removeClass;
	
	module.exports = cssAnimation;

/***/ },
/* 10 */
/***/ function(module, exports) {

	
	'use strict';
	
	var EVENT_NAME_MAP = {
	  transitionend: {
	    transition: 'transitionend',
	    WebkitTransition: 'webkitTransitionEnd',
	    MozTransition: 'mozTransitionEnd',
	    OTransition: 'oTransitionEnd',
	    msTransition: 'MSTransitionEnd'
	  },
	
	  animationend: {
	    animation: 'animationend',
	    WebkitAnimation: 'webkitAnimationEnd',
	    MozAnimation: 'mozAnimationEnd',
	    OAnimation: 'oAnimationEnd',
	    msAnimation: 'MSAnimationEnd'
	  }
	};
	
	var endEvents = [];
	
	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;
	
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }
	
	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }
	
	  for (var baseEventName in EVENT_NAME_MAP) {
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}
	
	if (typeof window !== 'undefined') {
	  detectEvents();
	}
	
	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}
	
	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}
	
	var TransitionEvents = {
	  addEndEventListener: function addEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },
	
	  endEvents: endEvents,
	
	  removeEndEventListener: function removeEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};
	
	module.exports = TransitionEvents;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	var SPACE = ' ';
	var RE_CLASS = /[\n\t\r]/g;
	
	var norm = function norm(elemClass) {
	  return (SPACE + elemClass + SPACE).replace(RE_CLASS, SPACE);
	};
	
	module.exports = {
	  addClass: function addClass(elem, className) {
	    elem.className += ' ' + className;
	  },
	
	  removeClass: function removeClass(elem, needle) {
	    var elemClass = elem.className.trim();
	    var className = norm(elemClass);
	    needle = needle.trim();
	    needle = SPACE + needle + SPACE;
	    // 一个 cls 有可能多次出现：'link link2 link link3 link'
	    while (className.indexOf(needle) >= 0) {
	      className = className.replace(needle, SPACE);
	    }
	    elem.className = className.trim();
	  }
	};

/***/ }
]);
//# sourceMappingURL=simple.js.map