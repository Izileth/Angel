import { defineConfig } from 'vite';

export default defineConfig({
    optimizeDeps: {
        include: ['chart.js/auto']
    },
    ssr: {
        noExternal: ['chart.js']
    },
    define: {
        global: 'globalThis'
    }
});