
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