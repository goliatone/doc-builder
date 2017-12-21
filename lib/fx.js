"use strict";
const fs = require("fs");

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

function writeFile(target, data, options) {
    return new Promise((resolve, reject)=>{
        fs.writeFile(target, data, options, (err)=>{
            if(err) reject(err);
            else resolve();
        })
    });
}

const fx = {};
fx.stat = stat;
fx.lstat = lstat;
fx.readdir = readdir;
fx.readFile = readFile;
fx.writeFile = writeFile;

module.exports = fx;
