'use strict';

const npm = require('global-npm');
const extend = require('gextend');

const DEFAULTS = {
    npmLoad: {},
    // source: __dirname,
    logger: console,
    argv: []
};

module.exports = function npmRun(context) {
    context = extend({}, DEFAULTS, context);
    
    const {source, script, argv} = context;

    const cmd = [script].concat(argv);

    return new Promise((resolve, reject)=>{
        npm.load(context.npmLoad, (err) => {
            const prefix = npm.prefix;
            if(source) npm.prefix = source;

            npm.commands.run(cmd, (err, res) => {
                npm.prefix = prefix;
                if(err) reject(err);
                else resolve(res);
            });
        });
    });
};