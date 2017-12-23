

https://api.github.com/repos/{{user}}/{{repo}}/{{endpoint}}

https://api.github.com/repos/goliatone/application-core/tags

Query to get (latest) release:
```
https://api.github.com/repos/goliatone/application-core/releases(/latest)
```

```json
{
  "url": "https://api.github.com/repos/andev-software/graphql-ide/releases/7784959",
  "assets_url": "https://api.github.com/repos/andev-software/graphql-ide/releases/7784959/assets",
  "upload_url": "https://uploads.github.com/repos/andev-software/graphql-ide/releases/7784959/assets{?name,label}",
  "html_url": "https://github.com/andev-software/graphql-ide/releases/tag/v1.1.1",
  "id": 7784959,
  "tag_name": "v1.1.1",
  "target_commitish": "master",
  "name": "Version 1.1.1",
  "draft": false,
  "author": {
    "login": "olivierandriessen",
    "id": 3968358,
    "avatar_url": "https://avatars0.githubusercontent.com/u/3968358?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/olivierandriessen",
    "html_url": "https://github.com/olivierandriessen",
    "followers_url": "https://api.github.com/users/olivierandriessen/followers",
    "following_url": "https://api.github.com/users/olivierandriessen/following{/other_user}",
    "gists_url": "https://api.github.com/users/olivierandriessen/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/olivierandriessen/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/olivierandriessen/subscriptions",
    "organizations_url": "https://api.github.com/users/olivierandriessen/orgs",
    "repos_url": "https://api.github.com/users/olivierandriessen/repos",
    "events_url": "https://api.github.com/users/olivierandriessen/events{/privacy}",
    "received_events_url": "https://api.github.com/users/olivierandriessen/received_events",
    "type": "User",
    "site_admin": false
  },
  "prerelease": false,
  "created_at": "2017-09-17T20:01:49Z",
  "published_at": "2017-09-17T20:34:22Z",
  "assets": [
    {
      "url": "https://api.github.com/repos/andev-software/graphql-ide/releases/assets/4846798",
      "id": 4846798,
      "name": "GraphQL.IDE.zip",
      "label": null,
      "uploader": {
        "login": "olivierandriessen",
        "id": 3968358,
        "avatar_url": "https://avatars0.githubusercontent.com/u/3968358?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/olivierandriessen",
        "html_url": "https://github.com/olivierandriessen",
        "followers_url": "https://api.github.com/users/olivierandriessen/followers",
        "following_url": "https://api.github.com/users/olivierandriessen/following{/other_user}",
        "gists_url": "https://api.github.com/users/olivierandriessen/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/olivierandriessen/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/olivierandriessen/subscriptions",
        "organizations_url": "https://api.github.com/users/olivierandriessen/orgs",
        "repos_url": "https://api.github.com/users/olivierandriessen/repos",
        "events_url": "https://api.github.com/users/olivierandriessen/events{/privacy}",
        "received_events_url": "https://api.github.com/users/olivierandriessen/received_events",
        "type": "User",
        "site_admin": false
      },
      "content_type": "application/zip",
      "state": "uploaded",
      "size": 49826713,
      "download_count": 842,
      "created_at": "2017-09-17T20:05:34Z",
      "updated_at": "2017-09-17T20:06:44Z",
      "browser_download_url": "https://github.com/andev-software/graphql-ide/releases/download/v1.1.1/GraphQL.IDE.zip"
    }
  ],
  "tarball_url": "https://api.github.com/repos/andev-software/graphql-ide/tarball/v1.1.1",
  "zipball_url": "https://api.github.com/repos/andev-software/graphql-ide/zipball/v1.1.1",
  "body": "Merges PR's:\r\n- #17 debounce executing while typing\r\n- #20 upgrade to webpack 2\r\n- #24 fix screenshots in readme\r\n- #26 update readme\r\n"
}
```

## npmsearch.com

Using npmsearch API:

```
http://npmsearch.com/query?q=core.io&fields=name,author,readme,keywords,description,version,modified
```

### Available fields

* __author__
* __created__
* __dependencies__
* __description__
* __devDependencies__
* __homepage__
* __keywords__
* __maintainers__
* __modified__
* __name__
* __readme__
* __repository__
* __scripts__
* __times__
* __version__
* __rating__ - computed rating as per [bin/rating.js](bin/rating.js)


```json
{
    "results": [
        {
            "name": [
                "core.io-data-manager"
            ],
            "description": [
                "core.io data manager module"
            ],
            "readme": [
                "## core.io Data Manager\n\n\n### Known Issues\nIf we are doing an `updateOrCreate` and no `identityFields` are present in the POJO used to hydrate the model then we won't be able to find the record.\n\nOne way to get around this would be to collect all unique attributes in the model definition and use any of those.\n\n\nModel definitions in JSON files for data.sync must have all [required] properties defined. `defaultsTo` is not being applied.\n\nValidation errors impede a record from being created.\n"
            ],
            "keywords": [
                "core.io",
                "data-manager"
            ],
            "author": [
                "goliatone"
            ]
        },
        {
            "name": [
                "core.io-pubsub-mqtt"
            ],
            "description": [
                "core.io PubSub transport layer providing MQTT suppor"
            ],
            "readme": [
                "## core.io PubSub MQTT\nThis package is part of the [core.io][core.io] set of libraries, meaning it can be used independently or inside an **core.io** application.\n\nTo install\n\n```\n$ npm i -S core.io-pubsub-mqtt\n```\n\n### Documentation\n\n\nRequest/respond:\n\n* client.js:\n\n```js\npubsub.request('ci/registry/list').then((event)=>{\n\n}).catch((err)=>{\n    \n});\n```\n\n* server.js:\n\n```js\npubsub.subscribe('ci/registry/list', (event) => {\n    //...perform logic to generate a result object\n    event.respond({result});\n});\n```\n\nRequests have a valid\n\n\n## License\nÂ® License MIT 2017 by goliatone\n"
            ],
            "keywords": [
                "core.io"
            ],
            "author": [
                "goliatone"
            ]
        },
        {
            "name": [
                "core.io"
            ],
            "description": [
                "Application core utilities"
            ],
            "readme": [
                ""
            ],
            "author": [
                "goliatone"
            ]
        },
        {
            "name": [
                "core.io-filesync"
            ],
            "description": [
                "core.io file sync module"
            ],
            "readme": [
                "## core.io filesync\n\n[core.io][io] Module to manage file sync.\n\n### TODO\n- [ ] Expose default commands.\n\n\n\n[io]:https://www.npmjs.com/package/core.io\n"
            ],
            "keywords": [
                "core.io",
                "s3",
                "filesync"
            ],
            "author": [
                "goliatone"
            ]
        },
        {
            "name": [
                "core.io-persistence"
            ],
            "description": [
                "core.io persistence module"
            ],
            "readme": [
                "## core.io-persistence\n\n[core.io][core.io] module to integrate [Waterline][wjs] into your applications.\n\n\n### TODO\nCurrently we load models from a single directory. Ideally we want to be able to load models from core.io modules, i.e. core.io-passport should be able to register a `Passport` and a `PassportUser` models.\n\n[core.io]: https://npmjs.com/package/core.io\n[wjs]: https://github.com/balderdashy/waterline\n"
            ],
            "keywords": [
                "core.io",
                "persistence",
                "waterline"
            ],
            "author": [
                "goliatone"
            ]
        },
        {
            "name": [
                "core.io-express-auth"
            ],
            "description": [
                "Module providing Passport.js auth for express"
            ],
            "readme": [
                "## core.io-auth\n\n\n#### Routes\n\n- `GET  /login`: Show login form.\n- `POST /login`: Handle local strategy login.\n- `GET  /logout`: Destroy session.\n- `GET  /signup`: Show signup form.\n- `POST /signup`:\n- `GET /auth/:`\n\n\n- `POST /register`: 'UserController.create',\n- `POST /logout`:  'AuthController.logout',\n\n- `POST /auth/local`: 'AuthController.callback',\n- `POST /auth/local/:action`: 'AuthController.callback',\n\n- `POST /auth/:provider`: 'AuthController.callback',\n- `POST /auth/:provider/:action`: 'AuthController.callback',\n\n- `GET /auth/:provider`: 'AuthController.provider',\n- `GET /auth/:provider/callback`: 'AuthController.callback',\n- `GET /auth/:provider/:action`: 'AuthController.callback'\n\n\n#### Custom Error views\n\nIf our sub-app has the following view structure:\n\n```\n.\nâ”œâ”€â”€ views\nâ”‚Â Â  â”œâ”€â”€ error-layout.ejs\nâ”‚Â Â  â”œâ”€â”€ 401.ejs\nâ”‚Â Â  â””â”€â”€ 403.ejs\n```\n\nThe error view will be rendered with the following locals:\n\n```js\nlet locals = {\n    isErrorView: true,\n    status: status,\n    message: err.message,\n    error: err\n};\n```\n\n### TODO\n- [ ] Integrate with **sockets.io**\n- [x] Manage locals index.js L-482\n- [ ] Pull routes from config\n- [ ] Normalize config:\n    - config.passport -> config.auth | config\n- [ ] Make filters so that we handle `restrictToDomain` as a generic filter\n    - i.e check that a user who's been banned doesn't log in again.\n- [ ] Check how we should use scope in oAuth2 to restrict by domain.\n\n\n<!--\nhttps://github.com/trailsjs/sails-permissions\n\nhttps://github.com/jfromaniello/passport.socketio\nhttps://github.com/FilipLukac/passport-socketio-redis\nhttps://www.npmjs.com/package/deployd\n-->\n"
            ],
            "keywords": [
                "core.io",
                "passport",
                "auth"
            ],
            "author": [
                "goliatone"
            ]
        },
        {
            "name": [
                "waterline-to-json-schema"
            ],
            "description": [
                "WaterlineJS to JSON schema generator"
            ],
            "readme": [
                "## WaterlineJS to JSON schema converter\n\nConvert Waterline model definitions to [JSON schema][js]. You can then use this generated JSON with tools such as [core.io-cli-view-generator][core.io-cli-view-generator].\n\n### CLI\nThis library provides a cli utility, `waterline-schema`, with two commands:\n\n* `collect `\n* `generate`\n\n```\nwaterline-schema 0.2.1 - WaterlineJS to JSON schema generator\n\nUSAGE\n\n  waterline-schema <command> [options]\n\nCOMMANDS\n\n  collect [source] [output]       Collect metadata from waterline models and generates a JSON schema file\n  generate [source] [output]      Generate schema from model data                                        \n  help <command>                  Display help for a specific command                                    \n\nGLOBAL OPTIONS\n\n  -h, --help         Display help                                      \n  -V, --version      Display version                                   \n  --no-color         Disable colors                                    \n  --quiet            Quiet mode - only displays warn and error messages\n  -v, --verbose      Verbose mode - will also output debug messages   \n```  \n\n#### Collect\nCollect will go over all files in a given directory and generate a JSON file with all the model definitions. Note that for now, the command relies on the models exposing an `schema` object.\n\n```js\nconst schema = {\n    identity: 'user',\n    attributes: {\n        id: {\n            type: 'text',\n            primaryKey: true\n        },\n        name: {\n            type: 'string',\n            label: 'Name'\n        }\n    }\n};\n\nconst Model = Waterline.Collection.extend(schema);\n\nmodule.exports = Model;\nmodule.exports.schema = schema;\n```\n\n#### Generate\nThe generate command will take a JSON file with definitions of Waterline models, turn it into a valid JSON schema object, and save it to a file.\n\n\n### TODO\n\n- [ ] Do swagger output from schema?\n- [ ] Remove `\"required\": []` if empty.\n- [ ] Identify primary key\n    - [ ] if not pk show warning.\n- [ ] generate report with:\n    - [ ] errors\n    - [ ] warnings\n- [ ] Filter out fields or mark them as private?\n    - password field, we don't want to show in GUI but want to have in Swagger\n- [ ] _inputs_\n    - [ ] form:\n        - [ ] ensure we have a default for items or provide one\n\n[js]:http://json-schema.org/\n[core.io-cli-view-generator]:https://github.com/goliatone/core.io-cli-view-generator\n\n<!--\nhttps://github.com/marcelklehr/waterline-to-jsonapi\n\nhttps://github.com/raml2html/raml2html\nhttps://www.npmjs.com/package/raml-jsonschema-expander\n\nhttps://www.npmjs.com/package/json-schema-ref-parser\n\nhttps://www.npmjs.com/package/json-schema-docs-generator\n-->\n"
            ],
            "keywords": [
                "json-schema",
                "waterline"
            ],
            "author": [
                "goliatone"
            ]
        },
        {
            "name": [
                "core.io-cli"
            ],
            "description": [
                "core.io CLI toolbelt manager"
            ],
            "readme": [
                "## core.io CLI\n\nThis is a sample project. To get started:\n\n```\n$ npm i core.io-cli\n```\n\n## License\nÂ® License MIT 2017 by goliatone\n"
            ],
            "author": [
                "goliatone"
            ]
        },
        {
            "name": [
                "core.io-cli-local-env"
            ],
            "description": [
                "CLI utility to create local development environments"
            ],
            "readme": [
                "## core.io-cli-local-env\n\ncore.io cli tool to manage local environments for development.\n\n## Local Development Environment\n\n### CLI \n\n```\n   shuttle 0.0.1 - CLI utility to create local development environments\n\n   USAGE\n\n     shuttle <command> [options]\n\n   COMMANDS\n\n     install                     Install all dependencies\n     list                        List all local domains\n     open <domain>               Open domain in default browser\n     share <project>             Generate a shareable URL for a project\n     restart                     Restart Caddy and Dnsmasq services\n     stop                        Stop Caddy and Dnsmasq services\n     start                       Start Caddy and Dnsmasq services\n     serve <domain> <proxy>      Proxy a local domain and save it for quick access\n     update                      Update toolchain\n     help <command>              Display help for a specific command\n\n   GLOBAL OPTIONS\n\n     -h, --help         Display help\n     -V, --version      Display version\n     --no-color         Disable colors\n     --quiet            Quiet mode - only displays warn and error messages\n     -v, --verbose      Verbose mode - will also output debug messages\n\n   MORE INFO\n\n     This program uses Caddy server and Dnsmasq. It generates various files and uses brew to install dnsmasq.\n```     \n\n### MacOS\n\n#### Local domains\n\nSince browsers [started forcing][1] **.dev** domains to HTTPS via preloaded HSTS\nit became apparent that using **.dev** for local development might not be a good idea.\n\nAnother popular option are **.local** domains, but those might have name resolution issues with multicast DNS software- e.g. Bonjour.\n\nWe are going to use **.test** domains.\n\nFor each development domain you want to support you need to create a entry in your mac's resolvers directory- you might need to create the directory if not present:\n\n```\n$ sudo mkdir /etc/resolver\n```\n\nCreate a file with the name of the domain, **test** in our case, and add the following line `nameserver 127.0.0.1`. A quick way of doing this:\n\n```\n$ sudo echo \"nameserver 127.0.0.1\" > /etc/resolver/test\n```\n\nAfter you add the file if you `scutil --dns` you should see an entry:\n\n```\nresolver #11\n  domain   : test\n  nameserver[0] : 127.0.0.1\n  flags    : Request A records, Request AAAA records\n  reach    : Reachable, Local Address, Directly Reachable Address\n```\n\n#### Reverse Proxy\n\nWe use [Caddy][caddy] server as a reverse proxy.\n\nCaddy is distributed as a single binary file and has a simple configuration similar to nginx's.\n\n#### DNS\nDnsmasq is a lightweight DNS forwarder and DHCP server. We use [dnsmasq][dnsmasq] for DNS resolution.\n\n[1]:https://ma.ttias.be/chrome-force-dev-domains-https-via-preloaded-hsts/\n[caddy]:https://caddyserver.com/\n[dnsmasq]: http://www.thekelleys.org.uk/dnsmasq/doc.html\n[marina-cli]: https://github.com/shnhrrsn/marina-cli\n\n#### Ngrok\nNgrok is used to share local URLs.\n\n\n### Credits\n\nThis is a rework of [marina-cli][marina-cli] with small modifications to suit a different setup.\n\n## License\nÂ® License MIT by goliatone\n"
            ],
            "author": [
                "goliatone"
            ]
        },
        {
            "name": [
                "core.io-express-server"
            ],
            "description": [
                "core.io Express server module"
            ],
            "readme": [
                "## core.io-express\n\nExpress server module.\n\n\n### Config\n\n- `port`:\n    - `process.env.PORT`\n    - `process.env.NODE_APP_PORT`\n    - 3000\n- `basedir`: Used to create the path to `views` and `public`.\n- `locals`: It will be made available to all requests through [app.locals](http://expressjs.com/en/api.html#app.locals).\n- `routeLocas`:  Specify locals per route. Example:\n```js\nrouteLocals: {\n    '/admin': {\n        layout: require('path').resolve('./modules/dashboard/views/layout.ejs')\n    }\n}\n```\n\nNOTE: Good idea to name all functions passed to `app.use` or `router.use`. Makes it easier to debug, which is true in general, since otherwise you would see `<anonymous>` as the output.\n\n### TODO\n- [ ] Handle unique assets, like favicon.\n    config: { favicon: <ABSOLUTE_PATH>}\n- [ ] Provide a way to override layout for error.ejs\n- [ ] Default app: take config options\n    - merge middleware\n- [ ] Asset pipeline:\n    - [mincer][mincer] package\n\n[mincer]:https://github.com/nodeca/mincer\n\n\n### Final Error Handler\nFor API calls:\n\n```js\nres.send({\n    success: false,\n    message: error.message\n});\n```\n#### Custom Error views\n\nIf our sub-app has the following view structure:\n\n```\n.\nâ”œâ”€â”€ views\nâ”‚Â Â  â”œâ”€â”€ error-layout.ejs\nâ”‚Â Â  â”œâ”€â”€ 401.ejs\nâ”‚Â Â  â””â”€â”€ 403.ejs\n```\n\nThe error view will be rendered with the following locals:\n\n```js\nlet locals = {\n    isErrorView: true,\n    status: status,\n    message: err.message,\n    error: err\n};\n```\n\n<!--\nIntegrate with:\nFor the API part. Or maybe just the CRUD module?\nhttps://github.com/apiaryio/dredd\n\nhttps://apiblueprint.org/tools.html\n\nhttps://github.com/expressjs/vhost\n\nhttps://github.com/Pavel-Demidyuk/express-paginate-bacon/blob/master/index.js\n\nCreate responses:\nres.ok();\nres.send404();\nres.sendError();\n\nhttps://github.com/balderdashy/sails/blob/e7947170dd60a96fb5cdac2ab00de170d6854074/lib/hooks/responses/defaults/notFound.js\n\nhttps://github.com/selcukfatihsevinc/app.io\n\nexpress-paginate\nhttps://github.com/expressjs/express-paginate\nhttps://github.com/Pavel-Demidyuk/express-paginate-bacon/\n-->\n"
            ],
            "keywords": [
                "core.io",
                "express"
            ],
            "author": [
                "goliatone"
            ]
        }
    ],
    "total": 14,
    "from": 0
}
```

## npms.io

Using npms.io API:

```
fetch('https://api.npms.io/v2/search?q=core.io+author%3Agoliatone').then((res)=> res.json()).then(console.log)
```

```json
{
    "total": 10,
    "results": [
        {
            "package": {
                "name": "core.io",
                "scope": "unscoped",
                "version": "0.0.0",
                "description": "Application core utilities",
                "date": "2017-02-08T21:47:55.066Z",
                "links": {
                    "npm": "https://www.npmjs.com/package/core.io"
                },
                "author": {
                    "name": "goliatone"
                },
                "publisher": {
                    "username": "goliatone",
                    "email": "hello@goliatone.com"
                },
                "maintainers": [
                    {
                        "username": "goliatone",
                        "email": "hello@goliatone.com"
                    }
                ]
            },
            "flags": {
                "unstable": true
            },
            "score": {
                "final": 0.14534032628921423,
                "detail": {
                    "quality": 0.3040035008921923,
                    "popularity": 0.003268423953479799,
                    "maintenance": 0.151415221822396
                }
            },
            "searchScore": 100000.125
        },
        {
            "package": {
                "name": "core.io-cli-local-env",
                "scope": "unscoped",
                "version": "0.1.2",
                "description": "CLI utility to create local development environments",
                "date": "2017-10-29T23:18:26.381Z",
                "links": {
                    "npm": "https://www.npmjs.com/package/core.io-cli-local-env",
                    "homepage": "https://github.com/goliatone/core.io-cli-local-env#readme",
                    "repository": "https://github.com/goliatone/core.io-cli-local-env",
                    "bugs": "https://github.com/goliatone/core.io-cli-local-env/issues"
                },
                "author": {
                    "name": "goliatone",
                    "email": "hello@goliatone.com",
                    "username": "goliatone"
                },
                "publisher": {
                    "username": "goliatone",
                    "email": "hello@goliatone.com"
                },
                "maintainers": [
                    {
                        "username": "goliatone",
                        "email": "hello@goliatone.com"
                    }
                ]
            },
            "flags": {
                "unstable": true
            },
            "score": {
                "final": 0.5619963251226925,
                "detail": {
                    "quality": 0.6607587762951779,
                    "popularity": 0.04517786222652097,
                    "maintenance": 0.9941612584424482
                }
            },
            "searchScore": 0.0000342455
        },
        {
            "package": {
                "name": "core.io-pubsub-mqtt",
                "scope": "unscoped",
                "version": "0.0.8",
                "description": "core.io PubSub transport layer providing MQTT suppor",
                "keywords": [
                    "core.io"
                ],
                "date": "2017-09-19T19:59:34.893Z",
                "links": {
                    "npm": "https://www.npmjs.com/package/core.io-pubsub-mqtt",
                    "homepage": "https://github.com/goliatone/core.io-pubsub-mqtt#readme",
                    "repository": "https://github.com/goliatone/core.io-pubsub-mqtt",
                    "bugs": "https://github.com/goliatone/core.io-pubsub-mqtt/issues"
                },
                "author": {
                    "name": "goliatone",
                    "email": "hello@goliatone.com",
                    "username": "goliatone"
                },
                "publisher": {
                    "username": "goliatone",
                    "email": "hello@goliatone.com"
                },
                "maintainers": [
                    {
                        "username": "goliatone",
                        "email": "hello@goliatone.com"
                    }
                ]
            },
            "flags": {
                "unstable": true
            },
            "score": {
                "final": 0.4926720885846792,
                "detail": {
                    "quality": 0.4404629157596679,
                    "popularity": 0.030492288771238742,
                    "maintenance": 0.9996026079624152
                }
            },
            "searchScore": 0.000004555027
        },
        {
            "package": {
                "name": "core.io-data-manager",
                "scope": "unscoped",
                "version": "0.5.0",
                "description": "core.io data manager module",
                "keywords": [
                    "core.io",
                    "data-manager"
                ],
                "date": "2017-11-05T00:19:49.933Z",
                "links": {
                    "npm": "https://www.npmjs.com/package/core.io-data-manager",
                    "homepage": "https://github.com/goliatone/core.io-data-manager#readme",
                    "repository": "https://github.com/goliatone/core.io-data-manager",
                    "bugs": "https://github.com/goliatone/core.io-data-manager/issues"
                },
                "author": {
                    "name": "goliatone"
                },
                "publisher": {
                    "username": "goliatone",
                    "email": "hello@goliatone.com"
                },
                "maintainers": [
                    {
                        "username": "goliatone",
                        "email": "hello@goliatone.com"
                    }
                ]
            },
            "flags": {
                "unstable": true
            },
            "score": {
                "final": 0.47209367040943917,
                "detail": {
                    "quality": 0.38318722047809395,
                    "popularity": 0.026169093803532224,
                    "maintenance": 0.9942237755279277
                }
            },
            "searchScore": 0.0000021325704
        },
        {
            "package": {
                "name": "core.io-express-server",
                "scope": "unscoped",
                "version": "0.0.30",
                "description": "core.io Express server module",
                "keywords": [
                    "core.io",
                    "express"
                ],
                "date": "2017-09-22T18:27:54.958Z",
                "links": {
                    "npm": "https://www.npmjs.com/package/core.io-express-server",
                    "homepage": "https://github.com/goliatone/core.io-express-server#readme",
                    "repository": "https://github.com/goliatone/core.io-express-server",
                    "bugs": "https://github.com/goliatone/core.io-express-server/issues"
                },
                "author": {
                    "name": "goliatone"
                },
                "publisher": {
                    "username": "goliatone",
                    "email": "hello@goliatone.com"
                },
                "maintainers": [
                    {
                        "username": "goliatone",
                        "email": "hello@goliatone.com"
                    }
                ]
            },
            "flags": {
                "insecure": 2,
                "unstable": true
            },
            "score": {
                "final": 0.4605980230731355,
                "detail": {
                    "quality": 0.4302772243127331,
                    "popularity": 0.03792261744491815,
                    "maintenance": 0.909262684781698
                }
            },
            "searchScore": 0.0000016332694
        },
        {
            "package": {
                "name": "core.io-persistence",
                "scope": "unscoped",
                "version": "0.1.7",
                "description": "core.io persistence module",
                "keywords": [
                    "core.io",
                    "persistence",
                    "waterline"
                ],
                "date": "2017-08-11T16:06:52.744Z",
                "links": {
                    "npm": "https://www.npmjs.com/package/core.io-persistence",
                    "homepage": "https://github.com/goliatone/core.io-persistence#readme",
                    "repository": "https://github.com/goliatone/core.io-persistence",
                    "bugs": "https://github.com/goliatone/core.io-persistence/issues"
                },
                "author": {
                    "name": "goliatone"
                },
                "publisher": {
                    "username": "goliatone",
                    "email": "hello@goliatone.com"
                },
                "maintainers": [
                    {
                        "username": "goliatone",
                        "email": "hello@goliatone.com"
                    }
                ]
            },
            "flags": {
                "unstable": true
            },
            "score": {
                "final": 0.46270529506772096,
                "detail": {
                    "quality": 0.4404629157596679,
                    "popularity": 0.02271656402610556,
                    "maintenance": 0.9217589226590961
                }
            },
            "searchScore": 0.0000015935557
        },
        {
            "package": {
                "name": "core.io-view-generator",
                "scope": "unscoped",
                "version": "0.3.0",
                "description": "CRUD view generator",
                "keywords": [
                    "crud",
                    "generator",
                    "scaffold",
                    "ejs",
                    "views"
                ],
                "date": "2017-11-05T16:43:48.280Z",
                "links": {
                    "npm": "https://www.npmjs.com/package/core.io-view-generator",
                    "homepage": "https://github.com/goliatone/core.io-cli-view-generator#readme",
                    "repository": "https://github.com/goliatone/core.io-cli-view-generator",
                    "bugs": "https://github.com/goliatone/core.io-cli-view-generator/issues"
                },
                "author": {
                    "name": "goliatone",
                    "email": "hello@goliatone.com",
                    "url": "http://goliatone.com/",
                    "username": "goliatone"
                },
                "publisher": {
                    "username": "goliatone",
                    "email": "hello@goliatone.com"
                },
                "maintainers": [
                    {
                        "username": "goliatone",
                        "email": "hello@goliatone.com"
                    }
                ]
            },
            "flags": {
                "insecure": 1,
                "unstable": true
            },
            "score": {
                "final": 0.4476523083250531,
                "detail": {
                    "quality": 0.3278123561384556,
                    "popularity": 0.04667255892413505,
                    "maintenance": 0.9513520167430549
                }
            },
            "searchScore": 0.0000011455633
        },
        {
            "package": {
                "name": "core.io-cli",
                "scope": "unscoped",
                "version": "0.0.3",
                "description": "core.io CLI toolbelt manager",
                "date": "2017-10-29T21:53:18.338Z",
                "links": {
                    "npm": "https://www.npmjs.com/package/core.io-cli",
                    "homepage": "https://github.com/goliatone/core.io-cli#readme",
                    "repository": "https://github.com/goliatone/core.io-cli",
                    "bugs": "https://github.com/goliatone/core.io-cli/issues"
                },
                "author": {
                    "name": "goliatone",
                    "email": "hello@goliatone.com",
                    "username": "goliatone"
                },
                "publisher": {
                    "username": "goliatone",
                    "email": "hello@goliatone.com"
                },
                "maintainers": [
                    {
                        "username": "goliatone",
                        "email": "hello@goliatone.com"
                    }
                ]
            },
            "flags": {
                "insecure": 2,
                "unstable": true
            },
            "score": {
                "final": 0.4270783185791379,
                "detail": {
                    "quality": 0.4262194383314163,
                    "popularity": 0.0219866175270861,
                    "maintenance": 0.8329062027006655
                }
            },
            "searchScore": 5.0916566e-7
        },
        {
            "package": {
                "name": "core.io-filesync",
                "scope": "unscoped",
                "version": "0.1.9",
                "description": "core.io file sync module",
                "keywords": [
                    "core.io",
                    "s3",
                    "filesync"
                ],
                "date": "2017-06-12T18:02:40.866Z",
                "links": {
                    "npm": "https://www.npmjs.com/package/core.io-filesync",
                    "homepage": "https://github.com/goliatone/core.io-filesync#readme",
                    "repository": "https://github.com/goliatone/core.io-filesync",
                    "bugs": "https://github.com/goliatone/core.io-filesync/issues"
                },
                "author": {
                    "name": "goliatone"
                },
                "publisher": {
                    "username": "goliatone",
                    "email": "hello@goliatone.com"
                },
                "maintainers": [
                    {
                        "username": "goliatone",
                        "email": "hello@goliatone.com"
                    }
                ]
            },
            "flags": {
                "unstable": true
            },
            "score": {
                "final": 0.33125608628726333,
                "detail": {
                    "quality": 0.3840255951152965,
                    "popularity": 0.022821815828593897,
                    "maintenance": 0.5944593491790473
                }
            },
            "searchScore": 1.0705012e-8
        },
        {
            "package": {
                "name": "core.io-express-auth",
                "scope": "unscoped",
                "version": "0.2.2",
                "description": "Module providing Passport.js auth for express",
                "keywords": [
                    "core.io",
                    "passport",
                    "auth"
                ],
                "date": "2017-10-09T14:57:23.745Z",
                "links": {
                    "npm": "https://www.npmjs.com/package/core.io-express-auth"
                },
                "author": {
                    "name": "goliatone",
                    "email": "hello@goliatone.com",
                    "url": "http://goliatone.com/",
                    "username": "goliatone"
                },
                "publisher": {
                    "username": "goliatone",
                    "email": "hello@goliatone.com"
                },
                "maintainers": [
                    {
                        "username": "goliatone",
                        "email": "hello@goliatone.com"
                    }
                ]
            },
            "flags": {
                "unstable": true
            },
            "score": {
                "final": 0.25381102106922954,
                "detail": {
                    "quality": 0.44772911197864235,
                    "popularity": 0.008653682188094928,
                    "maintenance": 0.33275285345658173
                }
            },
            "searchScore": 2.0367816e-10
        }
    ]
}
```