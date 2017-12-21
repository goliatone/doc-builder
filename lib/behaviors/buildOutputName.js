'use strict';

module.exports = function buildOutputName(file = this) {
    let name = file.name;
    name = name.toLowerCase();
    name = name.replace(/(\d+\.?\d+)?_/, '');
    file.nicename = name;
    // let levels = name.
    file.target = `./output/documentation/${name}.html`;
};