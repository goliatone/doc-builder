'use strict';

function _isString(src) {
    return typeof src === 'string';
}

module.exports.isString = _isString;

function _isIterable(obj) {
    if (obj == null) {
      return false;
    }

    return typeof obj[Symbol.iterator] === 'function';
}
module.exports.isIterable = _isIterable;

function flatten(ary, ret=[]) {
    for (var i = 0; i < ary.length; i++) {
        if (Array.isArray(ary[i])) {
            flatten(ary[i], ret);
        } else {
            ret.push(ary[i]);
        }
    }
    return ret;
}

module.exports.flatten = flatten;