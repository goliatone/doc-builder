const API = {
    getModuleList: () => {
        const uri =
            'http://npmsearch.com/query?q=core.io&fields=name,author,readme,keywords,description,version,modified';
        return fetch(uri).then(res => res.json()).then((json)=> {
            //transform
            let out = {};
            out.total = json.total;
            out.from = json.from;
            out.modules = json.results.map((mod)=>{
                mod.readme = mod.readme[0];
                mod.author = mod.author[0];
                mod.name = mod.name[0];
                mod.description = mod.description[0];
                
                return mod;
            });
            //Just for now, so we can have await working
            //in ModulesPage.
            return out.modules;
        }).then(out => {
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    resolve(out);
                },1000);
            });
        });
    }
};

//https://github.com/pschroen/rollup-plugin-bundleutils
// rollup-plugin-serve
//watch 'svelte compile --format iife -i js/components -o js/dist' ./js/components/
//live-server
//svelte compile --format iife -i js/components -o js/dist
const SearchBoxComponent = new SearchBox({
    target: document.getElementById('searchBox'),
    data: {}
});

let request = API.getModuleList();

const SearchPageComponent = new SearchPage({
    target: document.querySelector('.posts'),

    data: {
        modules: request,
        filter: '',
        total: 0,
        from: 0
    }
});

request.then((result)=>{
    console.log('done');
    SearchPageComponent.set({modules:result});
});

SearchBoxComponent.on('search', (query) =>{
    console.log('tell it to filter', query);
    SearchPageComponent.set({query});
});

const PaginationComponent = new Pagination({
    target: document.getElementById('pagination')
});
