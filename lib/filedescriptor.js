'use strict';
const fx = require('./fx');
const path = require('path');
const Stats = require('fs').Stats;
const extend = require('gextend');
const _isString = require('./utils').isString;


class FileDesriptor {

    constructor(options={}) {

        if(_isString(options)) {
            options = this.format(options);
        }

        extend(this, {plugins: FileDesriptor.plugins}, options);
        
        /**
         * Add global plugins.
         */
        this.plugins.forEach(({name, plugin}) => {
            this.use(name, plugin);
        });
    }

    use(name, plugin) {
        if(name instanceof Function) {
            plugin = name;
            name = plugin.name;
        }

        if(plugin.autorun) {
            return plugin(this);
        }

        this[name] = (...args) => {
            try {
                return plugin.apply(this, args);    
            } catch (error) {
                throw error;
            }
        };
    }

    readFile(source=this.source, options) {
        return fx.readFile(source, options).then((data)=>{
            this.content = data;
            return data;
        });
    }

    writeFile(target, content=this.content) {
        if(!target) {
            if(this.target) target = this.target;
            else target = this.source;
        }

        this.target = target;
        this.content = content;

        return fx.writeFile(target, content.toString()).catch((err)=>{
            console.log('writeFile error', err.message);
            return err;
        });
    }

    format(source) {
        return {
            source,
            content: this.content,
            stats: new Stats()
        };
    }

    isFile() {
        return this._stats.isFile();
    }

    isDirectory() {
        return this._stats.isDirectory();
    }

    isBlockDevice() {
        return this._stats.isBlockDevice();
    }

    isCharacterDevice() {
        return this._stats.isCharacterDevice();
    }

    isSymbolicLink() {
        return this._stats.isSymbolicLink && this._stats.isSymbolicLink();
    }

    isFIFO() {
        return this._stats.isFIFO();
    }

    isSocket() {
        return this._stats.isSocket();
    }

    isAbsolute() {
        return path.isAbsolute(this._source);
    }

    // @experimental
    toString() {
        return JSON.stringify(this.toJSON());
    }

    // @experimental
    toJSON() {
        return {
            source: this.source
        };
    }

    resolve(...args) {
        args.splice(0, 0, this.dirname);
        return path.resolve(...args);
    }

    set stats(value) {
        this._stats = value;
    }

    get stats() {
        return this._stats;
    }

    set source(value) {
        //TODO: Remove ext!
        this.ext = path.extname(value);
        this.extname = path.extname(value);
        this.basename = path.basename(value);
        this.dirname = path.dirname(value);
        this.name = this.basename.replace(this.ext, '');
        this._source = value;
    }

    get extension() {
        return this.extname.replace('.', '');
    }

    get source() {
        return this._source || '';
    }

    get relativePath() {
        return this.source.replace(this.cwd, '');
    }

    set content(v) {
        if(!this.raw && v) {
            console.log(v);
            this.raw = v;
        }
        this._content = v;
    }

    get content() {
        return this._content;
    }
}

FileDesriptor.plugins = [];
FileDesriptor.use = function(name, plugin) {
    if(name instanceof Function) {
        plugin = name;
        name = plugin.name;
    }
    FileDesriptor.plugins.push({name, plugin});
};

module.exports = FileDesriptor;