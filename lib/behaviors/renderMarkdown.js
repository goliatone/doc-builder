'use strict';
const MarkdownIt = require('markdown-it');

module.exports = function renderMarkdown(file = this, options = {}) {

    let plugins = options.plugins || [];

    delete options.plugins;

    let md = new MarkdownIt(options);

    for (const definition of plugins) {
        md.use(definition.plugin, definition.options);
    }

    /**
     * Store the source content.
     */
    file.md = file.content;
    file.content = md.render(file.content);
    return file;
};