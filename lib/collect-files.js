'use strict';

const fs = require('fs');
const path = require('path');
const extend = require('gextend');

const FileSet = require('./fileset');
const FileDesriptor = require('./filedescriptor');

const fx = require('./fx');
const flatten = require('./utils').flatten;


async function createPathTree(source, options = {}, currentDepth = 0) {
    const stats = await (options.followSymlinks ? fx.lstat(source) :fx.stat(source));

    if (currentDepth > 0 && stats.isFile()) {
        return [new FileDesriptor({cwd: options.cwd, source, stats})];
    }

    // if (currentDepth > 0 && !stats.isFile()) {
    //     return [new FileDesriptor({cwd: options.cwd, source, stats})];
    // }

    if (currentDepth > options.depth) {
        return null;
    }

    const files = await fx.readdir(source);

    const promisePathTree = files.map((el) => {
        const fd = path.join(source, el);
        
        if(options.shouldReject(fd, stats, options)) {
            return null;
        }

        return createPathTree(fd, options, currentDepth + 1);
    });

    return Promise.all(promisePathTree);

}

const defaults = {
    shouldReject(source, stats, options={}) {
        if (options instanceof RegExp) {
            return options.test(source);
        }
        
        if (options instanceof Function) {
            return Boolean(options(source));
        }
        
        return false;
    },
    filterFiles(files, options={}) {
        if (options instanceof RegExp) {
            return files.filter(el => options.test(el));
        }
        
        if (options instanceof Function) {
            return files.filter(options);
        }
        return files;
    },
    relative: false,
};

async function listFilepaths(source, options = {}) {
    options = extend({}, defaults, options);

    source = options.relative ? source : path.resolve(source);
    
    options.cwd = source;

    const tree = await createPathTree(source, options);
    const list = flatten(tree).filter(fd => fd != null);
    
    const filtered = options.filterFiles(list, options);

    return new FileSet(filtered);
}

module.exports.listFilepaths = listFilepaths;

// (async ()=>{
//     let list = await listFilepaths('./docs');
//     list.forEach((fd)=> console.log(fd.name));
//     list = list.filterByExt('.txt');
//     list.forEach((fd)=>console.log(fd.toString()));
// })();

