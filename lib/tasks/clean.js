'use sctric';
const rmfr = require('rmfr');

/**
 * @param {Object} context
 * @param {String} context.target Path to directory to clean
 * @param {Boolean} [context.doClean=true] - This task is optional
 * @returns {Promise} 
 */
function clean({target, doClean=true}) {
    if(!doClean) return Promise.resolve();
    return rmfr(target);
}

module.exports = clean;