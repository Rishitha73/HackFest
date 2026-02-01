// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3001,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            }
        }
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
    }
})

// NOTE: vite.config.js should live at the client root (/frontend/client/vite.config.js).
// This placeholder prevents Vite from reading a config inside src.
// Remove this file once the root config is in place.