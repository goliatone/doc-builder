'use strict';

const Generate = require('./generate');

/**
 * Attach commands to given application context,
 * if a `namespace` is given then commands will
 * be added as sub-commands under that namespace:
 * ```
 * $0 generate
 * $0 my-namespace generate
 * ```
 * 
 * @param {CliApp} app CLI Application instance
 * @param {String} namespace Namespace for commands.
 */
module.exports.attach = function $attach(app, namespace) {
    const context = {
        namespace,
        prog: app.prog
    };

    Generate.attach(context);
};