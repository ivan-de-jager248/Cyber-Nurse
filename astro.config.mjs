import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';

export default defineConfig({
  site: 'https://ivan-de-jager248.github.io',
  base: 'Cyber-Nurse',
  redirects: {
    '/Cyber-Nurse/login': '/Cyber-Nurse',
    '/Cyber-Nurse/register': '/Cyber-Nurse',
    '/Cyber-Nurse/hospitals/register': '/Cyber-Nurse/hospitals',
    '/Cyber-Nurse/nurses/register': '/Cyber-Nurse/nurses'
  },
  integrations: [
    tailwind(),
    vue({
      appEntrypoint: '/src/pages/_app'
    })
  ]
});