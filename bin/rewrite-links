#!/usr/bin/env node

'use strict';

const fx = require('../lib/fx');
const { basename, resolve } = require('path');
const cheerio = require('cheerio');
const FileDescriptor = require('../lib/filedescriptor');
const collectFiles = require('../lib/collect-files').collectFileDescriptors;

const _prepend = function(str, char) {
    if (str[0] !== char) return char + str;
    return str;
};

//Elements that have url:
//img -> src
//a -> href
//script -> src
//link -> href

//menus => main-nav & footer-menu
//Ensure the active link is selected:
//source html: documentation.html, documentation/api/index.html
//Ensure that links are absolute

const assets = ['img/', 'js/', 'css/'];

const LINK_RULES = [
    {
        description: 'Replace index.html for a /',
        match: function(str) {
            return str.match(/.*(index.html)$/);
        },
        replace: function(src) {
            return src.replace('index.html', '/');
        }
    },
    {
        description: 'Remove .html',
        match: function(str) {
            return !!str.match(/^(.*)\.html$/);
        },
        replace: function(src) {
            return src.replace('.html', '');
        }
    },
    {
        description: 'Remove trailing slash',
        match: function(str) {
            if (str === '/') return false;
            return str.match(/\/$/);
        },
        replace: function(src) {
            return src.replace(/\/$/, '');
        }
    },
    {
        description: 'Make relative links absolute',
        match: (x) => true,
        replace: function(src) {
            console.log('prepend', src);
            return _prepend(src, '/');
        }
    }
];

// processDirectory('./output', process.cwd() + '/output');

processDirectory('/tmp/core.io/output', '/tmp/core.io/output');

async function processDirectory(dirpath, cwd) {

    let collection = await collectFiles(dirpath);

    let htmlFiles = collection.filterByExt('.html');

    // let file = new FileDescriptor({source: './output/documentation/api/index.html', cwd});
    
    // try {
    //     await processFile(file, collection);
    // } catch (error) {
    //     console.log('error', error);
    // }

    // process.exit();

    htmlFiles.forEachAsync(async (fd)=>{
        fd.cwd = cwd;
        try {
            await processFile(fd, collection);
        } catch (error) {
            console.log('error', error);
        }
    });
}

//TODO: Collect all changes. from: {} to: {}
//TODO: Collect all files referenced by a, img, script, link.
//TODO: Assert that referenced files exist.
//TODO: Show which files  where not referenced.
async function processFile(indexFile, collection) {
    try {
        console.log('processing file ', indexFile.source, indexFile.name);
        await indexFile.readFile();
        console.log('... start html processor');
        await processHtml(indexFile, collection);
    } catch (error) {
        console.log('processFile error!');
        console.error(error);
        throw error;
    }
}

async function processHtml(indexFile, collection) {

    const $ = cheerio.load(indexFile.content.toString());

    console.log('processing HTML ', indexFile.name);

    processScriptTags($, collection);
    processImageTags($, collection);
    processAnchorTags($, collection, indexFile);
    processLinkTags($, collection);

    indexFile.content = $.html();
    await indexFile.writeFile();

    console.log('*********************************');
    console.log('done: ', indexFile.relativePath);
    console.log('saved file:', indexFile.source);
}

function processScriptTags($, collection) {
    let files = collection.filterByExt('.js');
    $('script').each(function(index, el) {
        let src = $(el).attr('src');
        if (!src) return;
        if (!isRelative(src)) return;
        let fd = files.findOneIncludingPath(src);

        if (fd) {
            src = fd.relativePath;
        }

        $(el).attr('src', src);
        console.log($(el).attr('src'));
    });
}

function processImageTags($, collection) {
    let files = collection.filterByExt('jpg', 'svg', 'png');
    $('img').each(function(i, el) {
        let src = $(el).attr('src');
        let fd = files.findOneIncludingPath(src, false);

        console.log(src, fd && fd.relativePath);

        if (fd) {
            src = fd.relativePath;
        }

        $(el).attr('src', src);
    });
}

function processAnchorTags($, collection, indexFile) {
    console.log('----- Make pretty links, also ensure no relative links');

    let files = collection.filterByExt('.html');
    $('a').each(function(i, el) {
        let href = $(el).attr('href');
        if (!href || href === '/') return;
        /**
         * TODO: this might not be what we want! We can have an absolute
         * href but from a child directory: ./output/docs/api/index.html
         * href = /assets/logo.svg should be /docs/api/assets/logo.svg
         */
        if (!isRelative(href)) return console.log('skipping %s', href);

        let fd = files.findOneIncludingPath(href);

        if (fd) {
            href = fd.relativePath;
        }

        LINK_RULES.map(rule => {
            if (rule.match(href)) {
                href = rule.replace(href);
            }
        });

        //Include path in class.
        // $(el).addClass(href.replace(/\//g, '-').replace(/^-/, ''));

        /**
         * If link is /documentation/api we should select both
         * /documentation and /documentation/api
         */
        if (indexFile.relativePath.replace('.html', '') === href) {
            //Select parents as well :)
            //if we are in /documentation/about.html then select:
            //   /documentation
            //   /documentation/about
            console.log('::::::::::::::::::::::::::::::');
            console.log('href %s  %s filename ', href, indexFile.relativePath);
            console.log('::::::::::::::::::::::::::::::');
            $(el).addClass('selected');
            href = '#';
        }

        $(el).attr('href', href);

        console.log('  update', $(el).html(), href);
    });
}

function processLinkTags($, collection) {
    //ensure link:
    console.log('---------- replace links ------');
    let files = collection.filterByExt('.css');
    $('link').each(function(index, el) {
        let href = $(el).attr('href');

        let fd = files.findOneIncludingPath(href, false);

        if (fd) {
            href = fd.relativePath;
        }

        $(el).attr('href', href);
        console.log($(el).attr('href'));
    });
    console.log('---------------------------------');
}
    

function ensureIsInPath(uri, path) {}

function removeInitialSlash(str = '') {
    return str.replace(/^\//, '');
}

function isAbsolute(url) {
    return /^[a-z][a-z0-9+.-]*:/.test(url);
}

function isRelative(url = '') {
    return !isAbsolute(url) && !isHash(url)// && !isLocal(url);
}

function isHash(url = '') {
    return url.indexOf('#') === 0;
}

function isLocal(url = '') {
    return url.indexOf('/') === 0;
}
