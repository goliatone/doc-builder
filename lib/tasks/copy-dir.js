'use strict';
const fx = require('fs-extra');

function copyDir({source, target, logger}) {
    return fx.copy(source, target);
}

module.exports = copyDir;