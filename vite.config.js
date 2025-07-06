import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // 👈 Required for proper routing in production
  server: {
    port: 5173, // 👈 Local dev server port (optional)
  },
});
