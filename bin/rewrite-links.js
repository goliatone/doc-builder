'use strict';

const fx = require('../lib/fx');
const {basename} = require('path');
const cheerio = require('cheerio');
const collectFiles = require('../lib/collect-files').collectFileDescriptors;

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

const links = [{
    description: 'Replace index.html for a /',
    match:function(str){
        return str.match(/.*(index.html)$/);
    }, 
    replace: function(src){
        return src.replace('index.html', '/');
    }
}, {
    description: 'Remove .html',
    match: function(str) {
        return !!str.match(/^(.*)\.html$/);
    }, replace: function(src) {
        return src.replace('.html', '');
    }
}, {
    description: 'Remove trailing slash',
    match: function(str) {
        if(str === '/') return false;
        return str.match(/\/$/);
    }, 
    replace: function(src){
        return src.replace(/\/$/, '');
    }
}, {
    description: 'Make relative links absolute',
    match: isRelative,
    replace: function(src) {
        return '/' + src;
    }
}];

// const filename = './output/documentation/api/index.html';
const filename = './output/documentation/api/index.html';
fx.readFile(filename, 'utf-8').then( async (html) => {

    const $ = cheerio.load(html);

    let files, collection;

    collection = await collectFiles('./output');

    files = collection.filterByExt('.js');

    // files.forEach((fd) => console.log('name', fd.basename, fd.relativePath));
    
    //Ensure all scripts are pointing to the right thing:
    $('script').each(function(index, el) {
        let src = $(el).attr('src');
        if(!isRelative(src)) return;
        let fd = files.findOneIncludingPath(src);

        if(fd) {
            src = fd.relativePath;
        }

        $(el).attr('src', src);
        console.log($(el).attr('src'));
    });

    //ensure logo:
    // let logo = $('img[src$="c_core.svg"]').attr('src');
    // logo = removeInitialSlash(logo);
    // $('img[src$="c_core.svg"]').attr('src', '/documentation/api/' + logo);

    files = collection.filterByExt('jpg', 'svg', 'png');
    // files.forEach((fd) => console.log('name', fd.basename, fd.relativePath));

    $('img').each(function(i, el) {
        let src = $(el).attr('src');
        let fd = files.findOneIncludingPath(src, false);
        console.log(src, fd.relativePath);

        if(fd) {
            src = fd.relativePath;
        }

        $(el).attr('src', src);
    });

    files = collection.filterByExt('.html');

    console.log('----- Make pretty links, also ensure no relative links');
    $('a').each(function(i, el) {
        let href = $(el).attr('href');
        if(!href) return;
        /**
         * TODO: this might not be what we want! We can have an absolute
         * href but from a child directory: ./output/docs/api/index.html
         * href = /assets/logo.svg should be /docs/api/assets/logo.svg
         */
        if(!href || !isRelative(href)) return;
        let fd = files.findOneIncludingPath(href);

        if(fd) {
            href = fd.relativePath;
        }

        links.map((rule)=> {
            if((rule.match(href))){
                href = rule.replace(href);
            }
        });

        $(el).attr('href', href);

        console.log('  update', $(el).html(), href);
    });

    files = collection.filterByExt('.css');

    //ensure link:
    console.log('---------- replace links ------');
    $('link').each(function(index, el) {
        let href = $(el).attr('href');
        
        let fd = files.findOneIncludingPath(href, false);

        if(fd) {
            href = fd.relativePath;
        }
        // href = removeInitialSlash(href);
        $(el).attr('href', href);
        console.log($(el).attr('href'));
    });
    console.log('---------------------------------');
    // console.log(isRelative('#'))
    // console.log(isRelative('/'))
    // console.log(isRelative('/quickstart'))
    // console.log(isRelative('http://localhost:9090/quickstart'))
    // console.log(isRelative('quickstart/assets/peperone'))

    // console.log($.html())
    await fx.writeFile('./output/documentation/api/index2.html', $.html());
    console.log('done!');
}).catch(console.error);

function ensureIsInPath(uri, path) {

}

function removeInitialSlash(str='') {
    return str.replace(/^\//, '');
}

function isAbsolute(url) {
    return /^[a-z][a-z0-9+.-]*:/.test(url);
}

function isRelative(url='') {
    return !isAbsolute(url) && !isHash(url) && !isLocal(url);
}

function isHash(url=''){
    return url.indexOf('#') === 0;
}

function isLocal(url='') {
    return url.indexOf('/') === 0;
}