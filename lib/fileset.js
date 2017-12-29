'use strict';
const extend = require('gextend');
const FileDescriptor = require('./filedescriptor');
const _isIterable = require('./utils').isIterable;

const _getter = function(obj, attr) {
    if (typeof obj[attr] === 'function') {
        return obj[attr]();
    }
    return obj[attr];
};

const _path = function(rel, fd) {
    if (rel) return fd.relativePath;
    return fd.source;
};

const _prepend = function(str, char) {
    if (str[0] !== char) return char + str;
    return str;
};

const defaults = {
    files: []
};

/**
 * FileSet class.
 *
 * This class holds a Set of FileDescriptors.
 *
 * It provides convenience methods to manipulate
 * files.
 *
 * @example:
 * Example:
 *
 * ```js
 * let files = new FileSet(['a.js', 'b.txt', 'c.js']);
 * files.add({basename: 'test.md', ext: '.md'});
 * files = files.filter((f)=>{
 *     return require('path').extname(f) === '.js';
 * });
 * ```
 *
 * ```js
 *  let files = new FileSet([{
 *     basename:'a.js',
 *     ext: '.js'
 * },{
 *     basename: 'b.txt',
 *     ext: '.txt'
 * }, {
 *     basename: 'c.js',
 *     ext: '.js'
 * }]);
 *
 * files.add({basename: 'test.md', ext: '.md'});
 *
 * files = files.filterByExt('.js');
 * files.forEach((fd)=>console.log(fd.toString())) ;
 *```
 *
 * @extends {Set}
 * @constructor
 */
class FileSet extends Set {
    constructor(options = {}) {
        if (_isIterable(options)) {
            options = { files: options };
        }

        options = extend({}, defaults, options);

        super(options.files);

        extend(this, options);
    }

    add(file) {
        file = new FileDescriptor(file);
        return super.add(file);
    }

    /**
     * Filter contents of this FileSet and
     * return a new FileSet containing the
     * items not filtered out.
     * Returns a FileSet with potentially
     * different size.
     *
     * @param {Function} cb Filter callback
     * @return {FileSet}
     */
    filter(cb) {
        return new FileSet(this.asArray().filter(cb));
    }

    // — creates a new array with the results of
    // calling a provided function on every element
    // in the calling array.
    // map()

    /**
     * Convinience method to filter files
     * matching a given `ext`. It should
     * include the dot, e.g. **.txt**.
     *
     * @param {String} ext Extension string
     * @return {FileSet}
     */
    filterByExt(...ext) {
        function _makeRegExp(ext) {

            if(ext instanceof RegExp) {
                return ext;
            }

            ext = ext.map((str)=> {
                str = _prepend(str, '.');
                str = str.replace('.', '\.');
                return str;
            }).join('|');

            return new RegExp(ext, 'i');
        }

        ext = _makeRegExp(ext);
        
        return this.filter(fd => fd.ext.match(ext));
        // return this.filter(fd => fd.ext === ext);
    }

    filterImages(extensions=/^\.svg|png|gif|jpg|jpeg/i) {
        return this.filter(fd => fd.extname.match(extensions));
    }

    /**
     * Returns files that have an `attribute`
     * matching `value`.
     *
     * @param {String} attribute - Attribute name
     * @param {Mixed} value - Value used to compare with fd value.
     */
    findByAttribute(attribute, value) {
        return this.filter(fd => {
            return _getter(fd, attribute) === value;
        });
    }

    findOneByAttribute(attribute, value, maybe = true) {
        for (let file of this) {
            if (_getter(file, attribute) === value) {
                return file;
            }
        }

        if (maybe) {
            return new FileDescriptor();
        }

        return undefined;
    }

    findOneIncludingPath(path, relative = true, shortest=true, maybe = true) {
        //if we have index.html, ensure we have /index.html
        _prepend(path, '/');

        let matches = [];
        for (let file of this) {
            if (_path(relative, file).includes(path)) {
                matches.push(file);
            }
        }

        if (matches && shortest) {
            if(shortest) {
                /**
                 * ['/index.html', '/docs/index.html', '/docs/api/index.html']
                 */
                matches.sort((a, b) => a.source.length - b.source.length);
            } else {
                /**
                 * ['/docs/api/index.html', '/docs/index.html', '/index.html']
                 */
                matches.sort((a, b) => b.source.length - a.source.length);
            }   

            return matches[0];
        }

        if (maybe) {
            return new FileDescriptor();
        }

        return undefined;
    }

    asArray() {
        return Array.from(this.values());
    }

    /**
     * Simple wrapper for doing async
     * operations over the file set.
     * It is akin to doing a `for of` loop.
     *
     * @example
     * ```js
     * await files.forEachAsync(async file => {
     *  await file.writeFile();
     * });
     * ```
     * @see https://github.com/toniov/p-iteration/blob/master/lib/static-methods.js
     * @param {Function} cb - Callback function
     */
    async forEachAsync(cb) {
        for (let file of this) {
            try {
                await cb(file);
            } catch (error) {
                throw error;
            }
        }
    }
}

module.exports = FileSet;
