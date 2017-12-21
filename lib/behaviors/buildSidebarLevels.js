'use strict';

module.exports = function buildSidebarLevels(file = this) {
    let levels = file.name.match(/(\d+\.?\d+)?_/);
    if (levels) {
        levels = levels[1].split('.');
        levels = levels.map(v => parseInt(v, 10));
        file.set('levels', levels);
    }
    return file;
};