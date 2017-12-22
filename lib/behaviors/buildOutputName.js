'use strict';

/**
 * This plugins needs to be configured.
 * It takes an opbject with a `basePath`
 * attribute.
 * 
 * @param {Object} config Options for plugin
 */
module.exports = function plugin(config) {

    const {basePath} = config;

    return function buildOutputName(file = this) {
        let name = file.name;
        name = name.toLowerCase();
        name = name.replace(/(\d+\.?\d+)?_/, '');
        file.nicename = name;
        // let levels = name.
        file.target = `${basePath}/${name}.html`;
    };
};