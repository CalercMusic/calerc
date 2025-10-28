import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This sets the base path for the built app.
  // It should match the repository name for GitHub Pages deployment.
  base: '/calerc/',
});