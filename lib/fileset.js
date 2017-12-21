'use strict';
const extend = require('gextend');
const FileDescriptor = require('./filedescriptor');
const _isIterable = require('./utils').isIterable;

const defaults = {
    files: []
};

class FileSet extends Set {

    constructor(options = {}) {
        if(_isIterable(options)) {
            options = {files: options};
        }

        super(options.files);
    }

    add(file) {
        file = new FileDescriptor(file);
        return super.add(file);
    }

    filter(cb) {
        return new FileSet(this.asArray().filter(cb));
    }

    filterByExt(ext) {
        return this.filter((fd) => fd.ext === ext);
    }

    asArray() {
        return Array.from(this.values());
    }
}

module.exports = FileSet;

// let files = new FileSet(['a.js', 'b.txt', 'c.js']);
// files.add({basename: 'test.md', ext: '.md'});
// files = files.filter((f)=>{
//     return require('path').extname(f) === '.js';
// });

// let files = new FileSet([{
//     basename:'a.js',
//     ext: '.js'
//  },{
//      basename: 'b.txt',
//      ext: '.txt'
//  }, {
//      basename: 'c.js',
//      ext: '.js'
//  }]);

//  files.add({basename: 'test.md', ext: '.md'});
//  files = files.filterByExt('.js');


//  files.forEach((fd)=>console.log(fd.toString())) ;