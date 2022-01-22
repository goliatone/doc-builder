'use strict';
const { readFile, exists, isRoot } = require('../fx');
const { join, resolve, dirname } = require('path');
const execa = require('execa');
const extend = require('gextend');

const DEFAULTS = {
    logger: console,
    cmd: './taskfile',
    taskfile: 'taskfile',
    cwd: process.cwd(),
    env: process.env,
    stdio: [process.stdin, process.stdout, process.stderr],
    argv: []
};

async function runTaskfile(context) {
    context = extend({}, DEFAULTS, context);

    const { argv, cmd, env, logger, stdio } = context;

    const cwd = await findFile(context.taskfile, context.cwd, true);

    logger.info('cwd: "%s" command: "%s"', cwd, cmd);

    const options = {
        env,
        cwd,
        stdio
    };

    if(context.shell) {
        return execa.shell(cmd, options);
    }

    return execa(cmd, argv, options);
}

module.exports = runTaskfile;


async function findFile(filename = 'package.json', directory = process.cwd(), wantsCurDir=false) {
    let currentDir = resolve(directory);

    while (!isRoot(currentDir)) {
        const filepath = join(currentDir, filename);
        if (await exists(filepath)) {
            return wantsCurDir ? currentDir : filepath;
        }
        currentDir = dirname(currentDir);
    }
}
