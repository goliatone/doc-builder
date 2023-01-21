'use strict';
const fx = require('./fx');
const path = require('path');
const Stats = require('fs').Stats;
const extend = require('gextend');
const _isString = require('./utils').isString;
const normalizeArguments = require('./arg-normalizer');

const defaults = {
    /**
     * If true we throw errors when
     * overriding while extending.
     */
    strict: false,
    autoinitialize: true,
    serializableAttributes: [
        'content',
        'metadata',
        'source',
        'target',
    ]
};

/**
 * TODO: we need to keep track of content type. e.g. to know if file is HTML
 */
class FileDescriptor {
    constructor(options = {}) {
        if (_isString(options)) {
            options = this.format(options);
        }

        options = extend({}, this.constructor.defaults, options);

        if (options.autoinitialize) {
            this.init(options);
        }
    }

    init(options = {}) {
        if (this.initialized) return;
        this.initialized = true;

        //TODO: We should ensure FileDescriptor.plugins get merged
        extend(this, { plugins: FileDescriptor.plugins.concat() }, options);

        /**
         * Add global plugins.
         */
        this.plugins.forEach(({ name, plugin }) => {
            this.use(name, plugin);
        });
    }

    /**
     * Add a plugin to the file descriptor.
     * We use plugins to process the file,
     * it's content or it's path.
     *
     * Plugin could also be a function's
     * `name` attribute.
     *
     * @example
     * ```js
     * descriptor.use('markdown', markdownParser);
     * ```
     *
     * @example
     * ```js
     * //This will be registered as "markdown"
     * function markdownParser(opts={}){
     *   return function markdown(){}
     * }
     * descriptor.use(markdownParser(conf));
     * ```
     *
     * @example
     * ```js
     * markdownParser.name = 'markdown';
     * descriptor.use(markdownParser);
     * ```
     *
     * @param {String} name Plugin name
     * @param {Function} plugin Middleware
     */
    use(name, plugin) {
        if (!name) return;
        if (name instanceof Function) {
            plugin = name;
            name = plugin.name;
        }

        if (plugin.autorun) {
            return plugin(this);
        }

        if (this.hasOwnProperty(name) && this.strict) {
            throw new Error('Overriding function');
        }

        this[name] = (...args) => {
            try {
                let [file, options] = normalizeArguments(this, args);
                return plugin(file, options);
            } catch (error) {
                throw error;
            }
        };
    }

    /**
     * Read a file from given `source` and save it's
     * contents in the `content` attribute.
     *
     * @param {String} [source=this.source] File source
     * @param {String} [options='utf-8']
     * @returns {Promise} Read file promise
     */
    readFile(source = this.source, options = 'utf-8') {
        return fx.readFile(source, options).then(data => {
            this.content = data;
            return data;
        });
    }

    /**
     * Writes `content` to the given
     * target path.
     * @param {String} target Filepath
     * @param {String} [content=this.content]
     * @returns {Promise} Write file promise
     */
    writeFile(target, content = this.content) {
        if (!target) {
            if (this.target) target = this.target;
            else target = this.source;
        }

        this.target = target;
        this.content = content;

        return fx.writeFile(target, content.toString()).catch(err => {
            console.log('writeFile error', err.message);
            return err;
        });
    }

    /**
     * Returns a file object with three
     * properties:
     * - `source`
     * - `content`
     * - `stats`
     *
     * @param {String} source File source
     * @returns {Object}
     */
    format(source) {
        return {
            source,
            content: this.content,
            stats: new Stats()
        };
    }

    /**
     * @returns {Boolean} True if this is file
     */
    isFile() {
        return this._stats.isFile();
    }

    /**
     * @returns {Boolean} True if this is directory
     */
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
            source: this.source,
            target: this.target,
            content: this.content,
            metadata: this.metadata,
        };
    }

    /**
     * Resolves a path segments from
     * the relative path of the file.
     *
     * @example ```js
     * let path = file.resolve('css', 'style.css');
     * console.log(path) //~/Project/css/style.css
     * ```
     * @param  {...any} args Array of path segments
     */
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
        //TODO: Changing any of these should change source/target values!
        this.basename = path.basename(value);
        this.dirname = path.dirname(value);
        this.name = this.basename.replace(this.ext, '');
        this._source = value;
    }

    get source() {
        return this._source || '';
    }

    get targetDir() {
        return path.dirname(this.target);
    }

    get extension() {
        return this.extname.replace('.', '');
    }

    get relativePath() {
        return this.source.replace(this.cwd, '');
    }

    set content(v) {
        if (!this.raw && v) this.raw = v;
        this._content = v;
    }

    get content() {
        return this._content;
    }
}

FileDescriptor.defaults = defaults;

FileDescriptor.plugins = [];

FileDescriptor.use = function(name, plugin) {
    if (name instanceof Function) {
        plugin = name;
        name = plugin.name;
    }
    FileDescriptor.plugins.push({ name, plugin });
};

module.exports = FileDescriptor;