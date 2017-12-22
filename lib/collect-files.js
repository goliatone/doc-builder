'use strict';

const fs = require('fs');
const path = require('path');
const extend = require('gextend');

const FileSet = require('./fileset');
const FileDesriptor = require('./filedescriptor');

const fx = require('./fx');
const flatten = require('./utils').flatten;

async function createPathTree(source, options = {}, currentDepth = 0) {
    const stats = await (options.followSymlinks
        ? fx.lstat(source)
        : fx.stat(source));

    if (currentDepth > 0 && stats.isFile()) {
        return [new FileDesriptor({ cwd: options.cwd, source, stats })];
    }

    // if (currentDepth > 0 && !stats.isFile()) {
    //     return [new FileDesriptor({cwd: options.cwd, source, stats})];
    // }

    if (currentDepth > options.depth) {
        return null;
    }

    const files = await fx.readdir(source);

    const promisePathTree = files.map(el => {
        const fd = path.join(source, el);

        if (options.shouldExclude(fd, stats, options)) {
            return null;
        }

        return createPathTree(fd, options, currentDepth + 1);
    });

    return Promise.all(promisePathTree);
}

const defaults = {
    shouldExclude(source, stats, options = {}) {
        if (options instanceof RegExp) {
            return options.test(source);
        }

        if (options instanceof Function) {
            return Boolean(options(source));
        }

        return false;
    },
    filterFiles(files, options = {}) {
        if (options instanceof RegExp) {
            return files.filter(el => options.test(el));
        }

        if (options instanceof Function) {
            return files.filter(options);
        }

        return files;
    },
    relative: false
};

/**
 * Collect all files in a given directory.
 * options:
 * - {Number}  depth [undefined] Max levels of recursion.
 * - {Boolean} relative [false] If true, call resolve(source)
 * - {Function} filterFiles 
 * - {Function} shouldExclude
 * @param {String} source Path to source dir
 * @param {Object} options Configuration options
 * @return {FileSet} A FileSet instance containing
 * 
 */
module.exports.collectFileDescriptors = async function collectFileDescriptors(source, options = {}) {
    options = extend({}, defaults, options);

    source = options.relative ? source : path.resolve(source);

    options.cwd = source;

    const tree = await createPathTree(source, options);

    const list = flatten(tree).filter(fd => fd != null);

    const filtered = options.filterFiles(list, options.filter);

    return new FileSet(filtered);
};