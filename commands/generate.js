'use strict';

const extend = require('gextend');
const BaseCommand = require('base-cli-commands').BaseCommand;
const { resolve, join } = require('path');

const clean = require('../lib/tasks/clean');
const mkdirp = require('../lib/tasks/mkdirp');
const generate = require('../lib/generator');

class GenerateCommand extends BaseCommand {
    async execute(event) {
        event = extend({}, GenerateCommand.DEFAULTS, event);

        event.source = event.pathSolver(event.source);
        event.output = event.pathSolver(event.output);

        event.options.templates = event.pathSolver(event.options.templates);

        const basePath = join(event.output, 'documentation');

        this.logger.info('templates', event.options.templates);
        this.logger.info('basePath', basePath);

        let o = event.options;

        await mkdirp({ target: basePath });

        this.logger.info('source', event.source);
        this.logger.info('output', event.output);
        this.logger.info('basePath', basePath);

        try {
            let files = await generate({
                logger: this.logger,
                debug: o.debug,
                source: event.source,
                target: event.target,
                templates: o.templates,
                basePath
            });
            this.logger.info('Generated %s files.', files.size);
        } catch (error) {
            this.logger.error(error);
            this.logger.error('Generate error...');
        }

        return Promise.resolve();
    }

    static describe(prog, cmd) {
        cmd.argument(
            '[source]',
            'Path to directory with documentation files',
            /.*/,
            GenerateCommand.DEFAULTS.source
        );

        cmd.argument(
            '[output]',
            'Target directory where files will be created',
            /.*/,
            GenerateCommand.DEFAULTS.output
        );

        cmd.option(
            '--clean',
            'Should the contents of [output] be removed before running',
            prog.BOOL,
            GenerateCommand.DEFAULTS.options.clean
        );

        cmd.option(
            '--debug',
            'Will produce a menu.json file containing the sidebar',
            prog.BOOL,
            GenerateCommand.DEFAULTS.options.debug
        );

        cmd.option(
            '--templates <path>',
            '<path> to template files',
            null,
            GenerateCommand.DEFAULTS.options.templates
        );
    }
}

GenerateCommand.DEFAULTS = {
    output: './output',
    source: './docs',
    pathSolver: resolve,
    options: {
        clean: false,
        debug: false,
        templates: join(__dirname, '../templates')
    }
};

GenerateCommand.COMMAND_NAME = 'generate';
GenerateCommand.DESCRIPTION = 'Generate documentation from Markdown files.';

module.exports = GenerateCommand;
