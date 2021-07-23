import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import commonjs from 'rollup-plugin-commonjs';
import ViteRequireContext from '@originjs/vite-plugin-require-context'
import {nodeResolve} from '@rollup/plugin-node-resolve';
import * as path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    nodeResolve(),
    commonjs(),
    ViteRequireContext()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'EASI-Utils',
      fileName: 'index',
      formats: ['umd']
    },
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
        format: 'umd',
        name: 'EASI-Utils',
      }
    }
  }
})
