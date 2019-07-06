'use strict';
const fetch = require('node-fetch');

function getModulesInfo(url){
    return fetch(url).then((res)=>res.json());
}

/**
 * someorjowej
 * @param {Object} json Object
 */
function transformResults(json) {
    let out = json.results.map((item)=>{
        let mod = {};
        mod.title = item.name[0];
        mod.description = item.description[0];
        mod.author = item.author[0];
        mod.version = item.version[0];
        mod.labels = (item.keywords || []).map((txt)=>{
            return {
                txt,
                type: 'light-gray'
            }
        });

        return mod;
    });

    return Promise.resolve(out);
}

let uri = 'http://npmsearch.com/query?q=core.io&fields=name,author,readme,keywords,description,version,modified';

(async ()=> {
    let result = await getModulesInfo(uri);
    result = await transformResults(result);
    console.log(JSON.stringify(result, null, 4));
})()
