'use strict';
//https://node-swig.github.io/swig-templates/docs/filters/
const swig = require('swig');

const configAttributes = [
    'autoscape',
    'varControls',
    'tagControls',
    'cmtControls',
    'locals',
    'cache',
    'loader',
];

module.exports = function makeRenderer(options = {}, defaults = false) {
    _makeLoader(options);
    _makeLoader(defaults);

    if (defaults) {
        swig.setDefaults(defaults);
    }

    const engine = new swig.Swig(options);

    return function renderHtml(file = this) {
        file.content = engine.renderFile(file.template, file.metadata);
        return file;
    };
};

function _makeLoader(options = {}) {
    if (options.templates) {
        options.loader = swig.loaders.fs(options.templates);
    }
}