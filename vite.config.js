import { defineConfig } from 'vite';

export default defineConfig({
  // ...existing config...
  envPrefix: 'VITE_', // Ensure Vite uses the correct prefix for environment variables
});
