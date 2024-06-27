// https://vitepress.dev/guide/custom-theme
import 'sisdai-css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
import 'vitepress/dist/client/theme-default/styles/icons.css'
import 'vitepress/dist/client/theme-default/styles/vars.css'
import Layout from './Layout.vue'
//import SisdaiMapas from './../../../src/index.js'
import './estilo/codigo.css'

// https://vitepress.dev/guide/custom-theme

/** @type {import('vitepress').Theme} */
export default {
  Layout,
  async enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      const SisdaiGraficas = await import('./../../../src/index.js')
      app.use(SisdaiGraficas.default)
    }
  },
}
