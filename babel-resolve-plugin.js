import template from 'babel-template';
import * as t from "babel-types";

// TODO generateUidIdentifier

// replace `require(x)` with `modulemapping[x]`
const buildRequire = template(`modulemapping[NAME]`);

// replace `import x from 'y'` with `var x = modulemapping[y]`
const buildImport = template(`var LNAME = modulemapping[RNAME].PNAME;`);

export default function(mapping) {
  const visitor = {
    ImportDeclaration(path) {
      const source = path.node.source.value;
      const specifiers = path.node.specifiers;

      const statements = [];

      for (let specifier of specifiers) {
        if (specifier.type === 'ImportSpecifier') {
          const name = t.identifier(specifier.local.name);
          statements.push(
            buildImport({
              LNAME: name,
              RNAME: t.stringLiteral(source),
              PNAME: name,
            })
          );
        } else if (specifier.type === 'ImportDefaultSpecifier') {
          statements.push(
            buildImport({
              LNAME: t.identifier(specifier.local.name),
              RNAME: t.stringLiteral(source),
              PNAME: t.identifier('default'),
            })
          );
        }
      }

      if (mapping[source]) {
        path.replaceWithMultiple(statements);
      }
    },

    CallExpression(path) {
      const cexpr = path.node;
      if (cexpr.arguments.length === 1) {
        const callee = cexpr.callee;
        if (callee.type === 'Identifier' && callee.name === 'require') {
          const arg = cexpr.arguments[0];
          if (arg.type === 'StringLiteral') {
            const source = arg.value;
            if (mapping[source]) {
              path.replaceWith(buildRequire({NAME: t.stringLiteral(source)}));
            }
          }
        }
      }
    },
  };

  return function plugin() {
    return {visitor};
  }
}
