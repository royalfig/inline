import { resolve } from 'path';

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';

// CSS
import postcss from 'rollup-plugin-postcss';
import atImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';

const postcssConfig = postcss({
  include: 'src/css/app.css',
  extract:
    process.env.NODE_ENV === 'production'
      ? resolve('assets/built/app.min.css')
      : resolve('assets/built/app.css'),
  sourceMap: true,
  plugins: [
    atImport,
    postcssPresetEnv({
      features: {
        'custom-properties': false,
        'logical-properties-and-values': false,
      },
    }),
    process.env.NODE_ENV === 'production' && cssnano(),
  ],
});

const postcssConfigSyntax = postcss({
  include: 'src/css/syntax-highlighting.css',
  extract:
    process.env.NODE_ENV === 'production'
      ? resolve('assets/built/syntax-highlighting.min.css')
      : resolve('assets/built/syntax-highlighting.css'),
  sourceMap: true,
  plugins: [
    atImport,
    postcssPresetEnv({
      features: {
        'custom-properties': false,
        'logical-properties-and-values': false,
      },
    }),
    process.env.NODE_ENV === 'production' && cssnano(),
  ],
});

const postcssConfigGhost = postcss({
  include: 'src/css/ghost-cards.css',
  extract:
    process.env.NODE_ENV === 'production'
      ? resolve('assets/built/ghost-cards.min.css')
      : resolve('assets/built/ghost-cards.css'),
  sourceMap: true,
  plugins: [
    atImport,
    postcssPresetEnv({
      features: {
        'custom-properties': false,
        'logical-properties-and-values': false,
      },
    }),
    process.env.NODE_ENV === 'production' && cssnano(),
  ],
});

const plugins = [
  commonjs(),
  nodeResolve(),
  process.env.NODE_ENV === 'production' &&
    babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' }),
  process.env.NODE_ENV === 'production' && terser(),
  replace({
    ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
    'process.env.NODE_ENV': JSON.stringify('production'),
    preventAssignment: true,
  }),
];

export default [
  {
    input: 'src/js/app/index.js',
    output: {
      file:
        process.env.NODE_ENV === 'production'
          ? 'assets/built/app.min.js'
          : 'assets/built/app.js',
      format: 'iife',
      sourcemap: true,
    },
    plugins: [...plugins, postcssConfig],
  },
  {
    input: 'src/js/post/index.js',
    output: {
      file:
        process.env.NODE_ENV === 'production'
          ? 'assets/built/post.min.js'
          : 'assets/built/post.js',
      format: 'iife',
      sourcemap: true,
    },
    plugins,
  },
  {
    input: 'src/js/syntax-highlighting.js',
    output: {
      file:
        process.env.NODE_ENV === 'production'
          ? 'assets/built/syntax-highlighting.min.js'
          : 'assets/built/syntax-highlighting.js',
      format: 'iife',
      sourcemap: true,
    },
    plugins: [...plugins, postcssConfigSyntax],
  },
  {
    input: 'src/js/ghost-cards.js',
    output: {
      file:
        process.env.NODE_ENV === 'production'
          ? 'assets/built/ghost-cards.min.js'
          : 'assets/built/ghost-cards.js',
      format: 'es',
    },
    plugins: postcssConfigGhost,
  },
];
