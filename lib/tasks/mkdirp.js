'use sctric';
const mkdirp = require('mkdirp-promise');

/**
 * 
 * @param {String} target Path to directory to clean
 * @param {Boolean} [doClean=true] - This task is optional
 * @returns {Promise} 
 */
function clean(target, doMake=true) {
    if(!doMake) return Promise.resolve();
    return mkdirp(target);
}

module.exports = clean;