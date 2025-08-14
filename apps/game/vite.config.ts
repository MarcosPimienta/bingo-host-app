import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'app/renderer',
  base: '',
  server: { port: 5174, strictPort: true },
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'app/renderer/entries/main-display.html'),
        host: resolve(__dirname, 'app/renderer/entries/host-controller.html'),
        grid: resolve(__dirname, 'app/renderer/entries/numbers-grid.html')
      }
    }
  }
});