'use strict';
const _mkdirp = require('mkdirp-promise');

/**
 * @param {Object} context
 * @param {String} context.target Path to directory to clean
 * @param {Boolean} [context.doClean=true] - This task is optional
 * @returns {Promise}
 */
function mkdirp({target, doMake=true}) {
    if(!doMake) return Promise.resolve();
    return _mkdirp(target);
}

module.exports = mkdirp;
