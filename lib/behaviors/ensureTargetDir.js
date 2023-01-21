'use strict';
const _mkdirp = require('mkdirp-promise');

/**
 * This behavior we want to run on
 * initialization.
 *
 * @param {FileDescriptor} file
 */
module.exports = function ensureTargetDir(file = this) {
    if (file.targetDir) return _mkdirp(file.targetDir);
    return file;
};