webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	__webpack_require__(6);
	__webpack_require__(8);
	var Accordion = __webpack_require__(10);
	var React = __webpack_require__(12);
	
	var items = [];
	
	var text = '\n  A dog is a type of domesticated animal.\n  Known for its loyalty and faithfulness,\n  it can be found as a welcome guest in many households across the world.\n';
	for (var i = 0, len = 3; i < len; i++) {
	  items.push({
	    header: 'This is panel header ' + i,
	    content: React.createElement(
	      'p',
	      null,
	      text.repeat(i + 1)
	    )
	  });
	}
	
	React.render(React.createElement(Accordion, { items: items }), document.getElementById('__react-content'));

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
		module.hot.accept("!!/Users/eward/code/accordion/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/eward/code/accordion/examples/simple.css", function() {
			var newContent = require("!!/Users/eward/code/accordion/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/eward/code/accordion/examples/simple.css");
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
	exports.push([module.id, "body {\n  padding: 60px 40px;\n}\n.rc-accordion {\n  width: 500px;\n}\np {\n  padding: 0;\n  margin: 0;\n}\n\n", ""]);

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

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(7);
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	exports.push([module.id, ".rc-accordion-content {\n  height: 0;\n  opacity: 0;\n  transition: all 0.3s ease-in;\n  overflow: hidden;\n}\n.rc-accordion-content-active {\n  opacity: 1;\n  height: auto;\n}\n", ""]);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/eward/code/accordion/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/eward/code/accordion/assets/ant.css", function() {
			var newContent = require("!!/Users/eward/code/accordion/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/eward/code/accordion/assets/ant.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	exports.push([module.id, ".rc-accordion {\n  background-color: #f3f5f7;\n  border-radius: 3px;\n  border-top: 1px solid #d9d9d9;\n  border-left: 1px solid #d9d9d9;\n  border-right: 1px solid #d9d9d9;\n}\n.rc-accordion-header {\n  height: 38px;\n  line-height: 38px;\n  text-indent: 16px;\n  color: #666;\n  border-bottom: 1px solid #d9d9d9;\n}\n.rc-accordion-header::before {\n  display: inline-block;\n  content: '\\20';\n  width: 0;\n  height: 0;\n  font-size: 0;\n  line-height: 0;\n  border-top: 3px solid transparent;\n  border-bottom: 3px solid transparent;\n  border-left: 4px solid #666666;\n  vertical-align: middle;\n  margin-right: 8px;\n}\n.rc-accordion-content {\n  color: #999;\n  padding: 0 16px;\n  background-color: #fbfbfb;\n}\n.rc-accordion-content-active {\n  padding: 16px;\n  border-bottom: 1px solid #d9d9d9;\n}\n.rc-accordion-item-active .rc-accordion-header::before {\n  border-left: 3px solid transparent;\n  border-right: 3px solid transparent;\n  border-top: 4px solid #666666;\n}\n", ""]);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// export this package's api
	'use strict';
	
	module.exports = __webpack_require__(11);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	  } else {
	    obj[key] = value;
	  }return obj;
	}
	
	var React = __webpack_require__(12);
	var classnames = __webpack_require__(13);
	
	module.exports = React.createClass({
	
	  displayName: 'Accordion',
	
	  propTypes: {
	    items: React.PropTypes.array,
	    prefixCls: React.PropTypes.string,
	    active: React.PropTypes.number
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      items: [],
	      prefixCls: 'rc-accordion',
	      active: 0
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      active: this.props.active,
	      height: 'auto'
	    };
	  },
	
	  handleClickItem: function handleClickItem(i) {
	    var _this = this;
	
	    return function (e) {
	      if (i === _this.state.active) {
	        return _this.setState({ active: -1 });
	      }
	      var height = e.target.nextSibling.scrollHeight;
	
	      _this.setState({ active: i, height: height });
	    };
	  },
	
	  getItems: function getItems() {
	    var _this2 = this;
	
	    var prefixCls = this.props.prefixCls;
	    var active = this.state.active;
	    return this.props.items.map(function (item, i) {
	      var _classnames, _classnames2;
	
	      var headerCls = prefixCls + '-header';
	      var key = item.key || i;
	      var isActive = active === i;
	      var contentCls = classnames((_classnames = {}, _defineProperty(_classnames, prefixCls + '-content', true), _defineProperty(_classnames, prefixCls + '-content-active', isActive), _classnames));
	
	      var style = isActive ? { height: _this2.state.height } : {};
	      var ref = isActive ? 'active' : null;
	
	      var itemCls = classnames((_classnames2 = {}, _defineProperty(_classnames2, prefixCls + '-item', true), _defineProperty(_classnames2, prefixCls + '-item-active', isActive), _classnames2));
	      return React.createElement('div', { className: itemCls, key: key }, React.createElement('div', { className: headerCls, onClick: _this2.handleClickItem(i) }, item.header), React.createElement('div', { className: contentCls, style: style, ref: ref }, item.content));
	    });
	  },
	
	  componentDidMount: function componentDidMount() {
	    var el = React.findDOMNode(this.refs.active);
	    el.style.height = el.clientHeight + 'px';
	  },
	
	  render: function render() {
	    var prefixCls = this.props.prefixCls;
	    return React.createElement('div', { className: prefixCls }, this.getItems());
	  }
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 13 */
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


/***/ }
]);
//# sourceMappingURL=simple.js.map