import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';

import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';

// import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const extensions = ['.ts', '.tsx', '.json'];

export default {
  input: 'src',
  output: [
    // {
    //   file: 'dist/template.common.js',
    //   format: 'cjs',
    //   sourcemap: false,
    // },
    {
      file: 'dist/template.esm.js',
      format: 'esm',
      sourcemap: false,
    },
    {
      file: 'dist/template.min.js',
      format: 'iife',
      name: 'Template',
      sourcemap: false,
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    alias({
      entries: {
        '~': './src',
      },
      resolve: extensions,
    }),
    // eslint(),
    typescript({ rollupCommonJSResolveHack: true, clean: true }),
    babel({
      extensions,
      exclude: 'node_modules/**',
    }),
    resolve({
      extensions,
    }),
    commonjs(),
    terser(),
  ],
};
