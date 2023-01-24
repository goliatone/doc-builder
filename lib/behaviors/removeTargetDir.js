'use strict';
const rm = require('rimraf');

/**
 * This behavior we want to run on
 * initialization.
 *
 * @param {FileDescriptor} file
 */
module.exports = function removeTargetDir(file = this) {
    if (file.targetDir) return rm(file.targetDir);
    return file;
};