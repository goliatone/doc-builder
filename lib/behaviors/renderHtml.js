'use strict';
const fs = require('fs');
const TX = require('jstransformer');
//https://node-swig.github.io/swig-templates/docs/filters/
const engine = require('jstransformer-swig');

module.exports = function render(file = this, options = {}) {

    let tpl = options.template || file.get('template') || file.template;

    let template = fs.readFileSync(tpl, 'utf-8');

    let transformer = TX(engine);

    let output = transformer.render(template, file);

    file.content = output.body;

    return file;
};