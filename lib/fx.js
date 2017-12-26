'use strict';
const fs = require('fs');
const { dirname } = require('path');
const { R_OK, W_OK, X_OK, F_OK } = require('fs').constants;

function readdir(source) {
    return new Promise((resolve, reject) => {
        fs.readdir(source, (err, files) => {
            if (err) reject(err);
            else resolve(files);
        });
    });
}

function stat(source) {
    return new Promise((resolve, reject) => {
        fs.stat(source, (err, stats) => {
            if (err) reject(err);
            else resolve(stats);
        });
    });
}

function lstat(source) {
    return new Promise((resolve, reject) => {
        fs.lstat(source, (err, stats) => {
            if (err) reject(err);
            else resolve(stats);
        });
    });
}

function readFile(source, options) {
    return new Promise((resolve, reject) => {
        fs.readFile(source, options, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function writeFile(target, data, options = 'utf8') {
    return new Promise((resolve, reject) => {
        fs.writeFile(target, data, options, err => {
            if (err) reject(err);
            else resolve();
        });
    });
}

function exists(filename, mode = R_OK | W_OK) {
    return new Promise((resolve, reject) => {
        fs.access(filename, mode, (err, stats) => {
            if (err && err.code !== 'ENOENT') reject(err);
            else resolve(!err);
        });
    });
}

function isRoot(dir) {
    return dirname(dir) === dir;
}

const fx = {};
fx.stat = stat;
fx.lstat = lstat;
fx.readdir = readdir;
fx.readFile = readFile;
fx.writeFile = writeFile;
fx.exists = exists;
fx.isRoot = isRoot;

module.exports = fx;
