const React = require('react');
const { PropTypes, createClass, findDOMNode } = React;

module.exports = createClass({

  displayName: 'CollapsePanel',

  propTypes: {
    prefixCls: PropTypes.string,
    header: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.node,
    ]),
    isActive: PropTypes.bool,
    onItemClick: PropTypes.func,
  },

  getInitialState() {
    return {isActive: this.props.isActive};
  },

  getDefaultProps() {
    return {
      isActive: false,
      onItemClick() {
      },
    };
  },

  handleItemClick() {
    this.props.onItemClick();
  },

  render() {
    const { prefixCls, header, children, isActive } = this.props;

    const headerCls = `${prefixCls}-header`;
    const contentCls = `${prefixCls}-content`;
    const itemCls = `${prefixCls}-item`;
    const itemActiveCls = isActive ? ` ${prefixCls}-item-active` : '';

    return (
      <div className={itemCls + itemActiveCls}>
        <div className={headerCls} onClick={this.handleItemClick}
             role="tab" aria-expanded={isActive}>
          <i className="arrow"></i>
          {header}
        </div>
        <div className={contentCls} ref="content" role="tabpanel" style={{height: isActive ? 'auto' : 0}}>
          <div className={`${prefixCls}-content-box`}>{children}</div>
        </div>
      </div>
    );
  },

  componentDidMount() {
    const el = findDOMNode(this.refs.content);
    if (this.props.isActive) {
      el.style.height = 'auto';
    } else {
      el.style.height = 0;
    }
  },

  componentDidUpdate(prevProps) {
    const isActive = this.props.isActive;
    // no change
    if (prevProps.isActive === isActive) {
      return;
    }

    this._anim();
  },

  _anim() {
    const el = findDOMNode(this.refs.content);
    const keyframeNames = 'random' + new Date().getTime();
    const scrollHeight = el.scrollHeight + 'px';
    let end = el.style.height;
    let start = 0;

    if (end === '0px') {
      start = scrollHeight;
    }
    if (end === 'auto') {
      end = scrollHeight;
    }

    function createKeyframe(keyframeName, startVal, endVal) {
      const domPrefixes = ['webkit', 'moz', 'o', 'ms'];
      let css = '';
      for (let i = 0, l = domPrefixes.length; i < l; i++) {
        css += '@-' + domPrefixes[i] + '-keyframes ' + keyframeName + ' {';
        css += '0%{height:' + startVal + ';}';
        css += '100%{height:' + endVal + ';}';
        css += '}';
      }
      return css;
    }

    let style = document.getElementById('random-keyframes');
    if (!style) {
      style = document.createElement('style');
      style.type = 'text/css';
      style.id = 'random-keyframes';
      document.getElementsByTagName('head')[0].appendChild(style);
    }
    style.innerHTML = createKeyframe(keyframeNames, start, end);
    el.style.animationName = keyframeNames;
    el.style.WebkitAnimationName = keyframeNames;// Safari
  },
});
