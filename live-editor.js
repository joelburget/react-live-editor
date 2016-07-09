var React = require("react");

var CodeMirrorEditor = require("./code-mirror-editor");
var ComponentPreview = require("./live-compile");

var ReactPlayground = React.createClass({
  propTypes: {
    codeText: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      code: this.props.codeText
    };
  },

  handleCodeChange: function(code) {
    this.setState({ code });
  },

  render: function() {
    const {code} = this.state;

    return <div className="playground">
      <div className="playgroundCode">
        <CodeMirrorEditor
          onChange={this.handleCodeChange}
          className="playgroundStage"
          codeText={code}
        />
      </div>
      <div className="playgroundPreview">
        <ComponentPreview code={code} />
      </div>
    </div>;
  },
});

module.exports = ReactPlayground;
