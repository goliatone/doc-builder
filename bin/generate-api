#!/usr/bin/env node 
'use strict';
const extend = require('gextend');

const renderHtml = require('../lib/behaviors/renderHtml');
const FileDescriptor = require('../lib/filedescriptor');
const addMetadata = require('../lib/behaviors/addMetadata');

const cheerio = require('cheerio');

async function generateApiDocs(options={}) {
    console.log('run taskfile');

    FileDescriptor.use(addMetadata);
    FileDescriptor.use('render', renderHtml);

    const siteMedata = {
        description: 'core.io the no framework for rapid prototyping',
        keywords: 'node.js,prototyping',
        author:'goliatone',
        library: {
            title: 'application-core',
            version: '0.8.1'
        }
    };

    let file = new FileDescriptor({
        cwd: options.cwd,
        source: options.source,
        template: options.template
    });

    // file.defaultMetadata(extend({}, siteMedata, {
    //     templateName: 'api/index',
    //     templateExt: '.swig'
    // }));

    file.use(function transformHtml(file=this){
        const html = this.content.toString();
        const $ = cheerio.load(html);
        this.content = $('.content > .cols').html();
        return this;
    });

    await file.readFile();    
    file.transformHtml();
    file.render();

    file.target = file.source;
    await file.writeFile();
}

module.exports = generateApiDocs;


// generateApiDocs({
//     cwd: '/tmp/core.io/output',
//     source: '/tmp/core.io/output/documentation/api/index.html'
// });