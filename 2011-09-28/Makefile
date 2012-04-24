JS = $(shell find public/javascripts -type f \( -iname "*.js" ! -name "*.min.js" \) )
MINIFY = $(JS:.js=.min.js)

all: clean $(MINIFY)

clean:
	rm -f $(MINIFY)

%.min.js: %.js
	node ./node_modules/uglify-js/bin/uglifyjs -o $@ $<

.PHONY: clean js minify
