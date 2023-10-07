import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import pages from 'vite-plugin-pages'
import compression from 'vite-plugin-compression2'
import eruda from 'vite-plugin-eruda'
import progress from 'vite-plugin-progress'
import unoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vitest/config'
import { extendRoute } from './build/extendRoute'
import { isProduction } from './build/env'

export default defineConfig(() => {
  return {
    base: './',

    lintOnSave: false,

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    server: {
      host: '0.0.0.0',
      port: 10086
    },

    build: {
      target: ['ios12']
    },

    esbuild: {
      drop: isProduction() ? ['console', 'debugger'] : []
    },

    test: {
      environment: 'jsdom',
      setupFiles: ['tests/setup.ts'],
      deps: {
        inline: ['@varlet/ui']
      }
    },

    plugins: [
      vue({
        template: {
          transformAssetUrls: {
            img: ['src'],
            video: ['src'],
            audio: ['src'],
            'var-image': ['src'],
            'var-avatar': ['src'],
            'var-card': ['src'],
            'var-app-bar': ['image']
          }
        }
      }),

      components({
        resolvers: [VarletUIResolver()]
      }),

      autoImport({
        imports: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
        resolvers: [VarletUIResolver({ autoImport: true })],
        eslintrc: { enabled: true }
      }),

      pages({
        extendRoute
      }),

      compression({
        include: [/\.html$/, /\.css$/, /\.js$/, /\.ttf$/],
        skipIfLargerOrEqual: true
      }),

      progress(),

      unoCSS()

      // Enable when debugging is needed
      // eruda()
    ]
  }
})
