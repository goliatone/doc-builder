'use strict';
const extend = require('gextend');
const Keypath = require('gkeypath');

/**
 * This behavior we want to run on
 * initialization.
 *
 * @param {FileDescriptor} file
 */
module.exports = function addMetadata(file = this) {

    if (!file.metadata) {
        file.metadata = {};
    }

    file.defaultMetadata = function(data) {
        this.metadata = extend({}, data, this.metadata);
    };

    file.get = function(key, def) {
        return Keypath.get(this.metadata, key, def);
    };

    file.set = function(key, val) {
        return Keypath.set(this.metadata, key, val);
    };

    return file;
};

/**
 * This ensures this behavior extends
 * the FileDescriptor when the plugin
 * is loaded.
 */
module.exports.autorun = true;