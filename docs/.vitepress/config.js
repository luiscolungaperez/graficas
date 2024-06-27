import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('./../../package.json')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'es-mx',
  title: 'sisdai-graficas',
  description: pkg.description,
  lastUpdated: true,
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://file.myfontastic.com/JS4TgqY9L4s8WsKQDkt5qA/icons.css',
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    sidebar: {
      '/documentacion/': sidebarDocumentacion('documentacion'),
    },

    // sidebar: {
    //   '/comienza/': sidebarComienza('comienza'),
    //   '/accesibilidad/': sidebarAccesibilidad('accesibilidad'),
    //   '/datos/': sidebarDatos('datos'),

    //   // visualizaciones: [
    //   //   {
    //   //     text: 'Visualizaciones',
    //   //     // collapsed: false,
    //   //     items: [
    //   //       { text: 'Símbolo único', link: '/visualizaciones/simbolo-unico' },
    //   //       {
    //   //         text: 'Discos/Símbolos graduados',
    //   //         link: '/visualizaciones/simbolos-graduados',
    //   //       },
    //   //       { text: 'Coropletas', link: '/visualizaciones/coropletas' },
    //   //       { text: 'Bivariante**', link: '/visualizaciones/bivariante' },
    //   //       { text: 'Mallas*', link: '/visualizaciones/mallas' },
    //   //       { text: 'Grupos (Clusters)*', link: '/visualizaciones/grupos' },
    //   //       {
    //   //         text: 'Puntos desplazados*',
    //   //         link: '/visualizaciones/puntos-desplazados',
    //   //       },
    //   //       { text: 'Mapa de calor**', link: '/visualizaciones/mapa-calor' },
    //   //     ],
    //   //   },
    //   // ],
    // },

    socialLinks: [
      {
        icon: 'github',
        link: pkg.repository.url || '',
        ariaLabel: '',
      },
    ],

    lastUpdated: {
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
        timeZone: 'America/Mexico_City',
      },
      text: 'Última actualización',
    },
  },
})

function nav() {
  return [
    {
      text: 'Sisdai',
      link: 'https://sisdai.conahcyt.mx/',
      rel: 'noopener noreferrer',
      target: '_blank',
    },
    { text: 'Inicio', link: '/' },
    {
      text: 'Documentación',
      link: '/documentacion/',
      activeMatch: '/documentacion/',
    },
    { text: `v${pkg.version}`, link: pkg.repository.url },
  ]
}

function sidebarDocumentacion(path) {
  return [
    { text: 'Introducción', link: `/${path}` },
    { text: 'SisdaiGraficas', link: `/${path}/graficas` },
    { text: 'SisdaiBarras', link: `/${path}/barras` },
    { text: 'SisdaiDona', link: `/${path}/dona` },
    { text: 'SisdaiCajasBigote', link: `/${path}/cajas-bigotes` },
    { text: 'SisdaiSeriesTiempo', link: `/${path}/series-tiempo` },
    { text: 'SisdaiAlluvial', link: `/${path}/alluvial` },
    { text: 'SisdaiAreasApiladas', link: `/${path}/areas-apiladas` },
    { text: 'SisdaiViolines', link: `/${path}/violines` },
    { text: 'Opciones avanzadas', link: `/${path}/opciones-avanzadas` },
  ]
}
