.PHONY: css
css:
	mkdir -p bundle
	postcss --watch --use autoprefixer --use postcss-import css/app.css --output bundle/app.css

.PHONY: server
server:
	browser-sync start --server --files='index.html,bundle/app.css,js/app.js,build/main.js'

.PHONY: js
js:
	babel --watch js/main.jsx -o build/main.js


.PHONY: clean
clean:
	rm -r bundle

.PHONY: dev
dev:
	make server & make css & make js & wait