'use strict';
const extend = require('gextend');
const matter = require('gray-matter');

module.exports = function parseGrayMatter(file = this) {

    let out = matter(file.content);
    file.content = out.content;
    file.metadata = extend({}, file.metadata, out.data);
    return file;
};