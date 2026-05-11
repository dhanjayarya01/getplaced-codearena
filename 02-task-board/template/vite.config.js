import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    headers: {
      'X-Frame-Options': 'ALLOWALL',
      'Access-Control-Allow-Origin': '*',
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      clientPort: 443,
      protocol: 'wss',
    }
  },
});
