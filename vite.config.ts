import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import { babel } from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import ViteRequireContext from '@originjs/vite-plugin-require-context'
import ts2 from 'rollup-plugin-typescript2';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import * as path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    nodeResolve(),
    commonjs(),
    {
      ...ts2({
        check: true,
        tsconfig: path.resolve(__dirname, 'tsconfig.json'), // your tsconfig.json path
        tsconfigOverride: {
          compilerOptions: {
            sourceMap: false,
            declaration: true,
            declarationMap: false
          },
          exclude: ['src/main.ts']
        }
      }),
      enforce: 'pre'
    },
    babel({
      exclude: 'node_modules/**', // 只编译源代码
      extensions: ['.ts'],
      babelHelpers: 'runtime'
    }),
    ViteRequireContext()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'EASIUtils',
      fileName: 'index',
      formats: ['umd']
    },
    cssCodeSplit: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'js-cookie'],
      output: {
        exports: 'auto',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'js-cookie': 'Cookies',
        },
        entryFileNames: 'index.js',
        format: 'umd',
        name: 'EASIUtils',
      }
    }
  }
})
