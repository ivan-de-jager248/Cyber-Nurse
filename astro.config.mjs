import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';

export default defineConfig({
  redirects: {
    '/login': '/',
    '/register': '/',
    '/hospitals/register': '/hospitals',
    '/nurses/register': '/nurses'
  },
  integrations: [
    tailwind(),
    vue({
      appEntrypoint: '/src/pages/_app'
    })
  ]
});