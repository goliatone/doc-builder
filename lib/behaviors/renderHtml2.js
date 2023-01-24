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

module.exports = function makeRenderer(config = {}, defaults = false) {
    _makeLoader(config);
    _makeLoader(defaults);

    if (defaults) {
        swig.setDefaults(defaults);
    }

    const engine = new swig.Swig(config);

    return function renderHtml(file = this, options = {}) {
        let template = file.template || file.get('template') || options.template;
        file.content = engine.renderFile(template, file.metadata);
        return file;
    };
};

function _makeLoader(options = {}) {
    if (options.templates) {
        options.loader = swig.loaders.fs(options.templates);
    }
}