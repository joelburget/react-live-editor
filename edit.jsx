var React = require("react");
var ReactPlayground = require('./live-editor.jsx');

var HELLO_COMPONENT = "\
\/\/ {{{\n\
var HelloMessage = React.createClass({\n\
  render: function() {\n\
    return <div>Hello {this.props.name}</div>;\n\
  }\n\
});\n\
\/\/ }}}\n\
\n\
return <HelloMessage name=\"John\" />;\
";

React.render(
  <ReactPlayground codeText={HELLO_COMPONENT} />,
  document.getElementById('jsxCompiler')
);
