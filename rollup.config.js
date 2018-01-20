import svelte from 'rollup-plugin-svelte';
import { babel, uglify } from 'rollup-plugin-bundleutils';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

let dev = process.env.NODE_ENV === 'development'; 

//use reshape for HTML rendering https://reshape.ml/
export default {
  input: 'output/js/app.js',
  output: {
    file: 'output/js/dist/main.js',
    format: 'iife',
  },
  plugins: [
    svelte({
      // By default, all .html and .svelte files are compiled
      extensions: ['.html'],

      // You can restrict which files are compiled
      // using `include` and `exclude`
      include: 'output/js/components/**.html',
    }),
    babel({
      include: ['./output/js/**/*.js'],
    }),
    uglify(),
    dev ? serve({
            contentBase: ['./output'],
            open: true
    }) : {},
    dev ? livereload() : {}
  ],
};
