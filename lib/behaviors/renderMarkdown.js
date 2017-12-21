'use strict';
const MarkdownIt = require('markdown-it');

module.exports = function renderMarkdown(file=this) {
    let md = new MarkdownIt();
    
    file.content = md.render(file.content);
    return file;
};
