var React = require('react');
var ReactDOM = require("react-dom");
var ReactPlayground = require('./live-editor');

var HELLO_COMPONENT = "\
import upper from 'upper';\n\
\/\/ {{{\n\
var HelloMessage = React.createClass({\n\
  render: function() {\n\
    return <div>Hello {this.props.name}</div>;\n\
  }\n\
});\n\
\/\/ }}}\n\
\n\
export default <HelloMessage name=\"John\" />;\
";

ReactDOM.render(
  <ReactPlayground
    codeText={HELLO_COMPONENT}
    resolveModules={{
      upper: {default: str => str.toUpperCase()},
      lower: {lower: str => str.toLowerCase()},
    }}
  />,
  document.getElementById('inject')
);
