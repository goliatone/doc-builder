'use strict';
const MarkdownIt = require('markdown-it');

module.exports = function renderMarkdown(file=this) {
    let md = new MarkdownIt();
    /**
     * Store the source content.
     */
    file.md = file.content;
    file.content = md.render(file.content);
    return file;
};
