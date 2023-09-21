import { defineConfig } from 'vite';
import { resolve } from 'node:path';

import vue from '@vitejs/plugin-vue';
import { configSvgIconsPlugin } from './builds/plugins/svgSprite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
const root = process.cwd();
const pathResolve = (pathname: string) => resolve(root, '.', pathname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    configSvgIconsPlugin({ isBuild: false }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: [
      // @/xxxx => src/xxxx
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      },
      // #/xxxx => types/xxxx
      {
        find: /#\//,
        replacement: pathResolve('types') + '/',
      },
    ],
  },
});
