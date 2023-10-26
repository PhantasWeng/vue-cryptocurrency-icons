import { babel } from '@rollup/plugin-babel'
import vue from 'rollup-plugin-vue'
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: './src/index.js',
    output: {
      format: 'es',
      file: 'dist/index.esm.js',
			inlineDynamicImports: true
    },
    plugins: [
      vue({ css: false }),
      babel({
				babelHelpers: 'bundled',
				plugins: [
					'@babel/plugin-syntax-import-attributes'
				]
			}),
			image(),
			json(),
			dynamicImportVars()
    ],
    external: [
      'vue-cryptocurrency-icons'
    ]
  },
  // SSR build.
  {
    input: './src/index.js',
    output: {
      format: 'cjs',
      file: 'dist/index.ssr.js',
      exports: 'named',
			inlineDynamicImports: true
    },
    plugins: [
      vue({ css: false, optimizeSSR: true }),
      babel({
				babelHelpers: 'bundled',
				plugins: [
					'@babel/plugin-syntax-import-attributes'
				]
			}),
			image(),
			json(),
			dynamicImportVars()
    ],
    external: [
      'vue-cryptocurrency-icons'
    ]
  },
  // Browser build.
  {
    input: './src/index.js',
    output: {
      name: 'VueCryptocurrencyIcons',
      globals: {
        'vue-cryptocurrency-icons': 'VueCryptocurrencyIcons'
      },
      format: 'iife',
      file: 'dist/index.js',
      exports: 'named',
			inlineDynamicImports: true
    },
    plugins: [
      vue({ css: false, optimizeSSR: true }),
      babel({
				babelHelpers: 'bundled',
				plugins: [
					'@babel/plugin-syntax-import-attributes'
				]
			}),
			image(),
			json(),
			dynamicImportVars()
    ],
    external: [
      'vue-cryptocurrency-icons'
    ]
  }
]
