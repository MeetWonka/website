import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: '/wonkachat-preview/',
  publicDir: false,
  plugins: [react()],
  build: {
    // Dedicated, generated directory; never empty the site's public root.
    outDir: '../../public/wonkachat-preview',
    emptyOutDir: true,
    rollupOptions: { input: fileURLToPath(new URL('landing-preview.html', import.meta.url)) },
  },
});
