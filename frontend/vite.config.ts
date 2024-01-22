import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import vuetify from 'vite-plugin-vuetify'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),   vuetify({
    styles: {
      configFile: 'src/styles/settings.scss',
    },
  })],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  }
})

