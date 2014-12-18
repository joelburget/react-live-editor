.PHONY: all install

all: edit.js index.js

edit.js: install
	./node_modules/.bin/browserify -t [ reactify --es6 ] ./edit.jsx -s ReactPlayground -o edit.js

index.js: install
	./node_modules/.bin/browserify -t [ reactify --es6 ] ./live-compile.jsx ./live-editor.jsx ./code-mirror-editor.jsx -o index.js

install:
	npm install
