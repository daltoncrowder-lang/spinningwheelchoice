import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served by a Cloudflare Worker on the route spinningwheelchoice.com/guides*.
// Everything else on the domain is the Base44 app.
export default defineConfig({
  site: 'https://spinningwheelchoice.com',
  base: '/guides',
  trailingSlash: 'always',
  outDir: './dist/guides',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
