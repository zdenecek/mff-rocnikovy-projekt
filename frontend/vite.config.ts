import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import vuetify from 'vite-plugin-vuetify'



// https://vitejs.dev/config/
export default defineConfig({
  server: {

  },
  plugins: [vue(),   vuetify({
    styles: {
      configFile: 'src/styles/settings.scss',
    },
  })],
  resolve: {
    extensions: ['.ts', '.vue', '.js'],
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  }
})

