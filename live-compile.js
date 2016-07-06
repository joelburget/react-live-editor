var React = require("react");
var ReactDOM = require("react-dom");
var babel = require('babel-core');

var selfCleaningTimeout = {
  componentDidUpdate: function() {
    clearTimeout(this.timeoutID);
  },

  setTimeout: function() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  }
};

var ComponentPreview = React.createClass({
    propTypes: {
      code: React.PropTypes.string.isRequired
    },

    mixins: [selfCleaningTimeout],

    render: function() {
        return <div ref="mount" />;
    },

    componentDidMount: function() {
      this.executeCode();
    },

    componentDidUpdate: function(prevProps) {
      // execute code only when the state's not being updated by switching tab
      // this avoids re-displaying the error, which comes after a certain delay
      if (this.props.code !== prevProps.code) {
        this.executeCode();
      }
    },

    compileCode: function() {
      return babel.transform(
        '(function() {' +
            this.props.code +
        '\n})();',
        { presets: [require('babel-preset-es2015'), require('babel-preset-react')] }
      ).code;
    },

    executeCode: function() {
      var mountNode = this.refs.mount;

      try {
        ReactDOM.unmountComponentAtNode(mountNode);
      } catch (e) { }

      try {
        var compiledCode = this.compileCode();
        ReactDOM.render(eval(compiledCode), mountNode);
      } catch (err) {
        this.setTimeout(function() {
          ReactDOM.render(
            <div className="playgroundError">{err.toString()}</div>,
            mountNode
          );
        }, 500);
      }
    }
});

module.exports = ComponentPreview;
