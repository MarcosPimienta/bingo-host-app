import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'app/renderer',
  base: '',
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        configurator: resolve(__dirname, 'app/renderer/entries/configurator.html'),
        host: resolve(__dirname, 'app/renderer/entries/host-controller.html'),
        main: resolve(__dirname, 'app/renderer/entries/main-display.html'),
        grid: resolve(__dirname, 'app/renderer/entries/numbers-grid.html')
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true
  }
});
