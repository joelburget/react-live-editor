.PHONY: all install

all: edit.js pack.js

edit.js: install
	./node_modules/.bin/browserify -t [ reactify --es6 ] js/live-editor.jsx -o edit.js

index.js: install
	./node_modules/.bin/browserify -t [ reactify --es6 ] -r ./live-compile.jsx -r ./live-editor.jsx -r ./code-mirror-editor.jsx -o index.js

install:
	npm install
