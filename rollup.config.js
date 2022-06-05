import { defineConfig } from 'rollup';

export default defineConfig({
	input: './index.js',
	output: [
		{
			file: './index.cjs',
			format: 'cjs',
			exports: 'named',
		},
		{
			file: './index.js',
			format: 'es',
		},
		{
			file: './index.browser.js',
			format: 'iife',
			name: 'FetchPrefix',
		},
	],
});
