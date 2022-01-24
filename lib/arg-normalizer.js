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
 * @param {Int} length Arguments length
 * @param {FileDescriptor} instance FileDescriptor instance
 * @param {FileDescriptor|Object} file Either a FileDescriptor or a config object
 * @param {Object} options Configuration object
 * @returns {Object}
 */
module.exports = function normalizeArguments(length, instance, file, options) {
    if (length === 1) {
        if (file instanceof instance.constructor === false) {
            options = file;
            file = instance;
        }
    }
    return { file, options };
};