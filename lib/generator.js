'use strict';

const fs = require('fs');
const extend = require('gextend');

const collectFiles = require('./collect-files').collectFileDescriptors;
const FileDescriptor = require('./filedescriptor');

const renderHtml = require('./behaviors/renderHtml');
const addMetadata = require('./behaviors/addMetadata');
const renderMarkdown = require('./behaviors/renderMarkdown');
const buildOutputName = require('./behaviors/buildOutputName');
const parseGrayMatter = require('./behaviors/parseGrayMatter');
const buildTemplateName = require('./behaviors/buildTemplateName');
const buildSidebarLevels = require('./behaviors/buildSidebarLevels');

module.exports = async function generate({ source, target, templates, basePath, debug=false, logger = console }) {

    FileDescriptor.use(addMetadata);
    FileDescriptor.use(renderMarkdown);
    FileDescriptor.use(buildSidebarLevels);
    FileDescriptor.use('render', renderHtml);
    FileDescriptor.use(parseGrayMatter);

    FileDescriptor.use(buildTemplateName({
        templatesPath: templates
    }));

    FileDescriptor.use(buildOutputName({
        basePath: basePath
    }));


    let files = await collectFiles(source, {
        /**
         * Select only the files that follow the pattern:
         * `../{0-9}.{0-9}?_[filename].md`
         */
        filter: function (fd) {
            return fd.source.match(/.*\d+[\.\d+]?_.*md$/);
        }
    });

    //Collect metadata file
    const siteMedata = {
        description: 'core.io the no framework for rapid prototyping',
        keywords: 'node.js,prototyping',
        author:'goliatone',
        library: {
            title: 'application-core',
            version: '0.8.1'
        }
    };

    let filename;
    let sidebar = {};
    sidebar.items = [];

    async function processFile(file, options) {
        
        file.defaultMetadata(extend({}, siteMedata, {
            templateName: 'documentation/index',
            templateExt: '.swig'
        }));

        await file.readFile();

        file.buildSidebarLevels();
        file.buildTemplateName();
        file.buildOutputName();

        file.parseGrayMatter();

        logger.info('processing file "%s"...', file.nicename);

        let target = new FileDescriptor(file.target);
        file.set('link', target.basename);


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

    /**
     * Process all files, build paths
     * and create sidebar.
     */
    for (let file of files) {
        await processFile(file);
    }

    logger.info('Rendering files...');

    sidebar.items = sidebar.items.filter(Boolean);
    sidebar.items.forEach((child) => {
        child.children = child.children.filter(Boolean);
    });

    if (debug) {
        let menu = new FileDescriptor('./menu.json');
        menu.content = JSON.stringify(sidebar, null, 4);
        await menu.writeFile();
    }

    await files.forEachAsync(async (file) => {
        file.set('sidebar', sidebar);
        file.renderMarkdown();
        file.render();
    });

    logger.info('write output');

    await files.forEachAsync(async (file) => {
        await file.writeFile();
    });

    // var marked = require('marked');
    // var TerminalRenderer = require('marked-terminal');
    // marked.setOptions({
    //     // Define custom renderer 
    //     renderer: new TerminalRenderer()
    // });

    // try {
    //     files.forEach((file)=>{
    //         console.log(marked(file.raw.toString()));
    //     });    
    // } catch (error) {
    //     console.error(error);
    // }
    

    return Promise.resolve(files);

};