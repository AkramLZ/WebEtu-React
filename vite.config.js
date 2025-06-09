import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    host: true,
  },
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Make sure this matches your file structure
  ],
  plugins: [
      react(),
      tailwindcss(),
  ],
  css: {
    modules: false,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/index.css";`
      }
    }
  }
});