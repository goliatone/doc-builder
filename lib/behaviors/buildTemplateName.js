'use strict';

/**
 * This plugin needs to be configured.
 * It expects an object with a `templatesPath`.
 * 
 * @param {Object} config Plugins options
 * @throws Error    It no `templatesPath`
 */
module.exports = function plugin(config) {
    const { templatesPath } = config;

    return function buildTemplateName(file = this) {
        let templateName = this.get('templateName', 'index');
        let templateExt = this.get('templateExt', '.swig');
        file.template = `${templatesPath}/${templateName}${templateExt}`;
        return file;
    };
};