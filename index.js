'use strict';

const fs = require('fs');
const extend = require('gextend');

const collectFiles = require('./lib/collect-files').listFilepaths;
const FileDesriptor = require('./lib/filedescriptor');

const renderMarkdown = require('./lib/behaviors/renderMarkdown');
const parseGrayMatter = require('./lib/behaviors/parseGrayMatter');
const renderHtml = require('./lib/behaviors/renderHtml');
const addMetadata = require('./lib/behaviors/addMetadata');

var filepath;

(async () => {
    //For this to work, we need to add plugins before
    //we create an instance. This is not what we want.
    FileDesriptor.use(addMetadata);
    FileDesriptor.use('render', renderHtml);
    FileDesriptor.use('parseGrayMatter', parseGrayMatter);
    FileDesriptor.use(renderMarkdown);

    let files = await collectFiles('./docs');
    files = files.filterByExt('.md');

    let sidebar = {};
    sidebar.items = [];

    async function processFile(file, options) {

        file.defaultMetadata({
            templateName: 'index',
            templateExt: '.swig'
        });

        file.use(function buildMenuLevels(file = this) {
            let levels = file.name.match(/(\d+\.?\d+)?_/);
            if (levels) {
                levels = levels[1].split('.');
                levels = levels.map(v => parseInt(v, 10));
                file.set('levels', levels);
            }
        });

        file.use(function buildOutputName(file = this) {
            let name = file.name;
            name = name.toLowerCase();
            name = name.replace(/(\d+\.?\d+)?_/, '');
            file.nicename = name;
            // let levels = name.
            file.target = `./output/documentation/${name}.html`;
        });

        file.use(function buildTemplateName(file = this) {
            let templateName = this.get('templateName', 'index');
            let templateExt = this.get('templateExt', '.swig');
            file.template = `./templates/${templateName}${templateExt}`;
            return file;
        });

        await file.readFile();

        file.buildMenuLevels();
        file.buildTemplateName();
        file.buildOutputName();

        //TODO: we should process.
        file.parseGrayMatter();

        /////////
        var target = new FileDesriptor(file.target);
        file.set('link', target.basename);

        /**
         * Generate sidebar menu for content.
         *
         */
        let item = {
            name: file.get('title', file.nicename),
            link: file.get('link'),
            levels: file.get('levels', []),
            children: []
        };

        let [parent, child] = item.levels;

        if (item.levels.length === 1) {
            let li = sidebar.items[parent];
            sidebar.items[parent] = item;
            if (li) item.children = item.children.concat(li.children);
        }

        if (item.levels.length === 2) {
            if (!sidebar.items[parent]) {
                sidebar.items[parent] = {
                    children: []
                };
            }
            sidebar.items[parent].children[child] = item;
        }
    }

    console.log('process files');
    /**
     * Process all files, build paths
     * and create sidebar
     */
    for (let file of files) {
        await processFile(file);
    }

    console.log('render files');
    sidebar.items = sidebar.items.filter(Boolean);
    sidebar.items.forEach(child => {
        child.children = child.children.filter(Boolean);
    });

    /**
     * Render stage
     */
    var out = true;
    files.forEach(async (file) => {
        file.set('sidebar', sidebar);
        
        if (out) {
            console.log(JSON.stringify(sidebar, null, 4));
            out = false;
        }
        file.renderMarkdown();
        file.render();
    });

    console.log('write output');

    /**
     * Write output.
     */
    files.forEach(async file => {// jshint ignore:line
        await file.writeFile();// jshint ignore:line
    });

    // console.log(JSON.stringify(sidebar, null, 4));
})();
