'use strict';

const fs = require('fs');
const extend = require('gextend');

const collectFiles = require('./lib/collect-files').collectFileDescriptors;
const FileDesriptor = require('./lib/filedescriptor');

const renderMarkdown = require('./lib/behaviors/renderMarkdown');
const parseGrayMatter = require('./lib/behaviors/parseGrayMatter');
const renderHtml = require('./lib/behaviors/renderHtml');
const addMetadata = require('./lib/behaviors/addMetadata');
const buildOutputName = require('./lib/behaviors/buildOutputName');
const buildSidebarLevels = require('./lib/behaviors/buildSidebarLevels');
const buildTemplateName = require('./lib/behaviors/buildTemplateName');

var filepath;

(async () => {
    /**
     * TODO: For this to work, we need to add 
     * plugins before we create an instance. 
     * This is not what we want.
     * 
     * TODO: How do we configure behaviors?
     * 
     * `use` is overloaded to take multiple
     * signatures:
     * name, function: 
     * function/1
     * function/1
     */
    FileDesriptor.use(addMetadata);
    FileDesriptor.use(renderMarkdown);
    FileDesriptor.use( buildSidebarLevels);

    FileDesriptor.use('render', renderHtml);
    FileDesriptor.use('parseGrayMatter', parseGrayMatter);

    FileDesriptor.use(buildTemplateName({
        templatesPath: './templates'
    }));

    FileDesriptor.use(buildOutputName({
        basePath: './output/documentation'
    }));

    let files = await collectFiles('./docs', {
        /**
         * Select only the files that follow the pattern:
         * `../{0-9}.{0-9}?_[filename].md`
         */
        filter: function(fd) {
            return fd.source.match(/.*\d+[\.\d+]?_.*md$/);
        }
    });

    let sidebar = {};
    sidebar.items = [];

    async function processFile(file, options) {

        file.defaultMetadata({
            templateName: 'index',
            templateExt: '.swig'
        });

        await file.readFile();

        file.buildSidebarLevels();
        file.buildTemplateName();
        file.buildOutputName();

        //TODO: we should process.
        file.parseGrayMatter();

        /////////
        let target = new FileDesriptor(file.target);
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
