webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	var Collapse = __webpack_require__(6);
	var Panel = Collapse.Panel;
	var React = __webpack_require__(8);
	
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
	        { accordion: accordion, activeKey: activeKey, defaultActiveKey: ['3'] },
	        this.getItems()
	      )
	    );
	  }
	});
	
	React.render(React.createElement(Test, null), document.getElementById('__react-content'));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/eward/code/accordion/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/eward/code/accordion/assets/index.css", function() {
			var newContent = require("!!/Users/eward/code/accordion/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/eward/code/accordion/assets/index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	exports.push([module.id, ".rc-collapse-content {\n  height: 0;\n  opacity: 0;\n  transition-duration: .3s;\n  transition-timing-function: ease-in;\n  overflow: hidden;\n}\n.rc-collapse-content-active {\n  opacity: 1;\n  height: auto;\n}\n.rc-collapse {\n  background-color: #f3f5f7;\n  border-radius: 3px;\n  border-top: 1px solid #d9d9d9;\n  border-left: 1px solid #d9d9d9;\n  border-right: 1px solid #d9d9d9;\n}\n.rc-collapse-header {\n  height: 38px;\n  line-height: 38px;\n  text-indent: 16px;\n  color: #666;\n  border-bottom: 1px solid #d9d9d9;\n}\n.rc-collapse-header::before {\n  display: inline-block;\n  content: '\\20';\n  width: 0;\n  height: 0;\n  font-size: 0;\n  line-height: 0;\n  border-top: 3px solid transparent;\n  border-bottom: 3px solid transparent;\n  border-left: 4px solid #666666;\n  vertical-align: middle;\n  margin-right: 8px;\n}\n.rc-collapse-content {\n  color: #999;\n  padding: 0 16px;\n  background-color: #fbfbfb;\n}\n.rc-collapse-content-active {\n  border-bottom: 1px solid #d9d9d9;\n}\n.rc-collapse-item-active .rc-collapse-header::before {\n  border-left: 3px solid transparent;\n  border-right: 3px solid transparent;\n  border-top: 4px solid #666666;\n}\n", ""]);

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

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
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();
	
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
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
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
	
	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
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
		var sourceMap = obj.sourceMap;
	
		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}
	
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// export this package's api
	'use strict';
	
	module.exports = __webpack_require__(7);
	module.exports.Panel = __webpack_require__(9);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _require = __webpack_require__(8);
	
	var PropTypes = _require.PropTypes;
	var createClass = _require.createClass;
	var Children = _require.Children;
	
	var CollapsePanel = __webpack_require__(9);
	
	if (!Array.isArray) {
	  Array.isArray = function (arg) {
	    return Object.prototype.toString.call(arg) === '[object Array]';
	  };
	}
	
	module.exports = createClass({
	
	  displayName: 'Collapse',
	
	  propTypes: {
	    prefixCls: PropTypes.string,
	    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	    defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	    onChange: PropTypes.func,
	    accordion: PropTypes.bool
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      prefixCls: 'rc-collapse',
	      onChange: function onChange() {},
	      accordion: false
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    var _props = this.props;
	    var defaultActiveKey = _props.defaultActiveKey;
	    var activeKey = _props.activeKey;
	    var accordion = _props.accordion;
	
	    // If is not accordion mode, then, defaultActiveKey should be an array
	    if (!accordion) {
	      defaultActiveKey = defaultActiveKey || [];
	    }
	
	    return {
	      activeKey: activeKey || defaultActiveKey
	    };
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if ('activeKey' in nextProps) {
	      this.setState({
	        activeKey: nextProps.activeKey
	      });
	    }
	  },
	
	  handleClickItem: function handleClickItem(key) {
	    var _this = this;
	
	    return function () {
	      if (_this.props.accordion) {
	        _this.setState({
	          activeKey: key
	        });
	      } else {
	
	        var activeKey = _this._getActivityKey();
	        var index = activeKey.indexOf(key);
	        var isActive = index > -1;
	        if (isActive) {
	          // remove active state
	          activeKey.splice(index, 1);
	        } else {
	          activeKey.push(key);
	        }
	
	        _this.setState({ activeKey: activeKey });
	      }
	      _this.props.onChange(key);
	    };
	  },
	
	  _getActivityKey: function _getActivityKey() {
	    var activeKey = this.state.activeKey;
	    var accordion = this.props.accordion;
	
	    if (accordion && Array.isArray(activeKey)) {
	      activeKey = activeKey[0];
	    }
	
	    if (!accordion && !Array.isArray(activeKey)) {
	      activeKey = activeKey ? [activeKey] : [];
	    }
	    return activeKey;
	  },
	
	  getItems: function getItems() {
	    var _this2 = this;
	
	    var activeKey = this._getActivityKey();
	    var _props2 = this.props;
	    var prefixCls = _props2.prefixCls;
	    var accordion = _props2.accordion;
	
	    return Children.map(this.props.children, function (child, i) {
	      // If there is no key provide, use the panel order as default key
	      var key = child.key || i;
	      var header = child.props.header;
	      var isActive = false;
	      if (accordion) {
	        isActive = !activeKey ? !i : activeKey === key;
	      } else {
	        isActive = activeKey.indexOf(key) > -1;
	      }
	
	      var props = {
	        key: key,
	        header: header,
	        isActive: isActive,
	        prefixCls: prefixCls,
	        children: child.props.children,
	        onItemClick: _this2.handleClickItem(key).bind(_this2)
	      };
	
	      return React.createElement(CollapsePanel, props);
	    });
	  },
	
	  render: function render() {
	    var prefixCls = this.props.prefixCls;
	    return React.createElement('div', { className: prefixCls }, this.getItems());
	  }
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	  } else {
	    obj[key] = value;
	  }return obj;
	}
	
	var _require = __webpack_require__(8);
	
	var createClass = _require.createClass;
	var PropTypes = _require.PropTypes;
	var findDOMNode = _require.findDOMNode;
	
	var classnames = __webpack_require__(10);
	var cssAnimation = __webpack_require__(11);
	
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
	
	    return React.createElement('div', { className: itemCls }, React.createElement('div', { className: headerCls, onClick: this.handleItemClick }, header), React.createElement('div', { className: contentCls, ref: 'content' }, children));
	  },
	
	  componentDidMount: function componentDidMount() {
	    if (this.props.isActive) {
	      var el = findDOMNode(this.refs.content);
	      el.style.height = el.scrollHeight + 'px';
	    }
	  },
	
	  componentDidUpdate: function componentDidUpdate(prevProps) {
	
	    var isActive = this.props.isActive;
	
	    // no change
	    if (prevProps.isActive === isActive) {
	      return;
	    }
	
	    // current isActive
	    if (!isActive) {
	      var preNode = findDOMNode(this.refs.content);
	      preNode.style.height = preNode.scrollHeight + 'px';
	      preNode.style.opacity = 1;
	      cssAnimation.setTransition(preNode, 'Property', 'height ,opacity');
	      cssAnimation.style(preNode, {
	        height: 0,
	        opacity: 0
	      }, function () {
	        preNode.style.height = '';
	        preNode.style.opacity = '';
	        cssAnimation.setTransition(preNode, 'Property', '');
	      });
	    } else {
	      // from isActive to hide
	      var currentNode = findDOMNode(this.refs.content);
	      currentNode.style.height = 0;
	      cssAnimation.setTransition(currentNode, 'Property', 'height ,opacity');
	      cssAnimation.style(currentNode, {
	        height: currentNode.scrollHeight + 'px',
	        opacity: 1
	      }, function () {
	        currentNode.style.height = 'auto';
	        currentNode.style.opacity = 1;
	        cssAnimation.setTransition(currentNode, 'Property', '');
	      });
	    }
	  }
	});

/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Event = __webpack_require__(12);
	var Css = __webpack_require__(13);
	
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
/* 12 */
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
/* 13 */
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