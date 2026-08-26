// @ts-check
import { defineConfig } from 'astro/config';

// Static Astro site. Deploy to Vercel with zero-config (Vercel auto-detects Astro).
// The verbatim Stitch screen HTML lives in /public/stitch-screens and is shown in iframes.
export default defineConfig({
  site: 'https://atunse-health-demo.vercel.app',
  output: 'static',
  trailingSlash: 'ignore',
  compressHTML: true,
  vite: {
    build: { minify: false },
    css: { devSourcemap: false },
    esbuild: { legalComments: 'none' },
  },
});
