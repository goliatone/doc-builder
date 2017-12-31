#!/usr/bin/env node

'use strict';
const clean = require('../lib/tasks/clean');
const copy = require('../lib/tasks/copy-dir');
const clone = require('../lib/tasks/get-repo');
const install = require('../lib/tasks/npm-install');
const runTaskfile = require('../lib/tasks/run-taskfile');


module.exports = async function gatherWebsite(options) {
    console.log('cloning repository...');

    await clean(options.clone);

    await clone(options.clone);

    console.log('npm install');

    await install(options.install);

    console.log('run taskfile');

    await runTaskfile(options.taskfile);

    try {
        await copy(options.copy);
    } catch (error) {
        console.error(error);
    }
};

(async () => {

    const target = '/tmp/core.io/website';

    module.exports({
        clone: {
            repository: 'goliatone/core.io-website', 
            wrapTarget: false,
            target
        },
        install: {
            dryRun: false,
            target: `${target}`
        },
        taskfile: {
            cwd: `${target}`,
            shell: false,
            stdio: 'inherit',
            argv: ['build:dist']
        },
        copy: {
            source: `${target}/dist`,
            target: '/tmp/core.io/output'
        }
    });
})();