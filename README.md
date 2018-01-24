
### API

registerProcessor(fn, level)
    -> add plugin to collect, process, or output.

use: add plugins. Plugins can add processors 
run ->
    merge all plugins, run as single array.
    collect files
    process:
        -> context, config: You can modify either context or config
        -> context: files
        -> config: data
    output:
        -> create dirs
        -> write files
        -> zip content

### Context object:

* source
* destination
* metadata
* plugins

### File object:

* contents
* mode
* output
* stats



## Deploy

```
docker build -t goliatone/coreio.tech:v0.0.1 -t goliatone/core.iotech:latest .
```


docker tag 85b3813be77b goliatone/core.iotech:latest



```
docker run --name coreio \
    --network nginx-proxy \
    --restart always \
    --expose 80 \
    -e VIRTUAL_HOST=coreio.lan \
    -v $PWD/output:/usr/share/nginx/html:ro \
    -v $PWD/ops/nginx/conf.d:/etc/nginx/conf.d:ro \
    -d \
    goliatone/core.iotech:latest
```        