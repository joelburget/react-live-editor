import React from 'react';
import CodeMirror from 'codemirror';
import JSParser from './code-mirror-highlighting/jsparser';
import stringStream from './code-mirror-highlighting/stringstream';

const indentUnit = 2;

function normaliseString(string) {
  var tab = "";
  for (var i = 0; i < indentUnit; i++) tab += " ";

  string = string.replace(/\t/g, tab).replace(/\u00a0/g, " ").replace(/\r\n?/g, "\n");
  var pos = 0, parts = [], lines = string.split("\n");
  for (var line = 0; line < lines.length; line++) {
    if (line != 0) parts.push("\n");
    parts.push(lines[line]);
  }

  return {
    next: function() {
      if (pos < parts.length) return parts[pos++];
      else throw StopIteration;
    }
  };
}

function highlightText(string, callback) {
  const parser = JSParser.make(stringStream(normaliseString(string)));
  const result = [];
  let i = 0;
  try {
    while (true) {
      var token = parser.next();
      result.push(
        token.value === '\n'
          ? <br key={i} />
          : <span key={i} className={token.style}>{token.value}</span>
      );
      i++;
    }
  }
  catch (e) {
    if (e != StopIteration) throw e;
  }
  return result;
}

export default function CodeMirrorHighlight({codeText}) {
  return (
    <pre
      style={{overflow: 'scroll'}}
      className="CodeMirror cm-s-solarized-light"
    >
      {highlightText(codeText)}
    </pre>
  );
}
