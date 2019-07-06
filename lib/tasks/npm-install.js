'use strict';
const npmi = require('npmi');
const extend = require('gextend');
const { dirname } = require('path');

const DEFAULTS = {
    logger: console,
    getPackageFilePath: function(context) {
        return context.package || context.options.path;
    },
    noNpm: false,
    dryRun: false,
    options: {
        path: '.',
        production: true
    }
};

/**
 * Execute `npm i` to a given package.
 *
 * @see https://github.com/maxleiko/npmi/blob/master/npmi.js
 *
 * @param {Object} context
 * @param {Function} [context.getPackageFilePath=function]
 * @param {Boolean} [context.noNpm=false]
 * @param {Boolean} [context.dryRun=false]
 * @param {Object} context.options
 * @param {String} [context.options.path='.']
 * @return {Promise}
 */
module.exports = function npmInstall(context) {
    context = extend({}, DEFAULTS, {options: {path:context.target}}, context);

    let target = context.getPackageFilePath(context);

    if (target.includes('packaje.json')) {
        target = dirname(target);
    }

    context.options.path = target;

    context.logger.info('Running npm install at %s', target);

    if (context.noNpm || context.dryRun) {
        context.logger.info('ran command with --dry-run, exit');
        return Promise.resolve(context);
    }
    return new Promise((resolve, reject) => {
        npmi(context.options, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
};
