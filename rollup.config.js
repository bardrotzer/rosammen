import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import postcss from 'rollup-plugin-postcss';
import purgecss from 'rollup-plugin-purgecss';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
		svelte({
			// opt in to v3 behaviour today
			skipIntroByDefault: true,
			nestedTransitions: true,

			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			emitCss: true,
			css: css => {
				css.write('public/bundle.css');
			}
		}),
		purgecss({
			content: ['App.html']
    }),
		postcss({
			extract: true
		}),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			module: true,
      jsnext: true,
			main: true,
    }),
		commonjs({
			include: 'node_modules/**',
			browser: true,
			preferBuiltins: false,
			// if true then uses of `global` won't be dealt with by this plugin
			ignoreGlobal: false,  // Default: false
		}),
		json(),
		builtins(),
		globals({
			process: true
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	]
};
