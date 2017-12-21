'use strict';
const fs = require('fs');
const TX = require('jstransformer');
//https://node-swig.github.io/swig-templates/docs/filters/
const engine = require('jstransformer-swig');

module.exports = function render(file=this) {
    let template = fs.readFileSync(file.template, 'utf-8');
    let trans = TX(engine);
    let output = trans.render(template, file);
    file.content = output.body;
    return file;
};