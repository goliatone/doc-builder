/**
 * This function normalizes the behavior arguments.
 * We can call the function with different arguments:
 * - no arguments
 * - file instance
 * - options object
 * - file instance and options object
 *
 * If we use the behavior to extend a FileDescriptor then
 * we can call it with an options object.
 *
 * ```js
 * file.renderMarkdown({ html: true});
 * ```
 *
 * Or we can call it by itself:
 * ```js
 * renderMarkdown(file, { html: true});
 * ```
 *
 * @param {FileDescriptor} instance FileDescriptor instance
 * @param {Array} args Original arguments array
 * @returns {Array}
 */
module.exports = function normalizeArguments(instance, args) {
    const length = args.length;
    let file = args[0] || instance;
    let options = args[1] || {};

    if (length === 1) {
        if (file instanceof instance.constructor === false) {
            options = file;
            file = instance;
        }
    }

    return [file, options];
};