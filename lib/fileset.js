'use strict';
const extend = require('gextend');
const FileDescriptor = require('./filedescriptor');
const _isIterable = require('./utils').isIterable;

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

        if(_isIterable(options)) {
            options = {files: options};
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
    filterByExt(ext) {
        return this.filter((fd) => fd.ext === ext);
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
        for(let file of this) {
            try {
                await cb(file);
            } catch (error) {
                throw error;
            }
        }
    }
}

module.exports = FileSet;